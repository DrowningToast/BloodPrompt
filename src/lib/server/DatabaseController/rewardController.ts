import type { RedemptionHistory } from '$lib/stores/rewardStores';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import prisma, { Prisma, type Donators, type Rewards } from '../ORM';
import { donatorsController } from './donatorsController';

export type RewardControllerCreateRewardArgs = {
	rewardData: Pick<
		Prisma.RewardsCreateInput,
		'name' | 'description' | 'required_points' | 'amount_left' | 'image_src'
	>;
	sessionToken: string;
};

export type RewardControllerRedeemRewardArgs = {
	rewardId: string;
	donatorId: string;
};

export type RewardControllerUpdateRewardArgs = {
	rewardId: string;
	data: Pick<
		Prisma.RewardsUpdateInput,
		'name' | 'description' | 'required_points' | 'amount_left' | 'image_src'
	>;
	sessionToken: string;
};

export type RewardControllerCancelRedeemRewardArgs = {
	redemptionHistoryFilter: Prisma.Redemption_HistoryWhereUniqueInput;
	donatorFilter: Prisma.DonatorsWhereInput;
};

export type RewardControllerRedeemCompleteArgs = {
	redemptionHistoryFilter: Prisma.Redemption_HistoryWhereUniqueInput;
};

export type RewardControllerGetAllRedeemRewardsHistoryArgs = {
	donatorFilter?: Prisma.DonatorsWhereInput;
};

export const rewardController = {
	create: async (args: RewardControllerCreateRewardArgs) => {
		const session = await prisma.session.findUnique({
			where: {
				session_token: args.sessionToken
			},
			include: {
				Medical_Staff: true
			}
		});

		if (!session) {
			throw new Error('SESSION_NOT_FOUND');
		}

		if (!session.medical_staff_id) {
			throw new Error('NOT_MEDICAL_STAFF');
		}

		const place = await prisma.places.findUnique({
			where: {
				id: session?.Medical_Staff?.place_id
			}
		});

		const reward = await prisma.rewards.create({
			data: {
				...args.rewardData,
				place_id: place?.id || ''
			}
		});
		return {
			reward,
			place
		};
	},
	getAllRewards: async () => {
		const allRewards = await prisma.rewards.findMany({
			include: {
				Place: true,
				Redemption_History: true
			},
			orderBy: {
				created_at: 'desc'
			},
			where: {
				deleted_at: {
					equals: null
				}
			}
		});
		return allRewards;
	},
	delete: async (rewardId: string) => {
		const deleted = await prisma.rewards.update({
			where: {
				id: rewardId
			},
			data: {
				deleted_at: new Date()
			}
		});

		return deleted;
	},
	updateReward: async (args: RewardControllerUpdateRewardArgs) => {
		const rewardExist = await prisma.rewards.findUnique({
			where: {
				id: args.rewardId
			}
		});

		if (!rewardExist) {
			throw new Error('REWARD_NOT_FOUND');
		}

		const session = await prisma.session.findUnique({
			where: {
				session_token: args.sessionToken
			},
			include: {
				Medical_Staff: true
			}
		});

		if (!session) {
			throw new Error('SESSION_NOT_FOUND');
		}

		const place = await prisma.places.findUnique({
			where: {
				id: session?.Medical_Staff?.place_id
			}
		});

		// check if place id match
		if (place?.id !== rewardExist.place_id) {
			throw new Error('PLACE_ID_NOT_MATCH');
		}

		const newData = args.data;
		const reward = await prisma.rewards.update({
			where: {
				id: args.rewardId
			},
			data: {
				name: newData.name,
				description: newData.description,
				required_points: newData.required_points,
				amount_left: newData.amount_left,
				image_src: newData.image_src
			}
		});
		return reward;
	},
	redeemReward: async (args: RewardControllerRedeemRewardArgs) => {
		const { rewardId, donatorId } = args;

		const reward = await prisma.rewards.findUnique({
			where: {
				id: rewardId
			}
		});

		// check if reward exists or not
		if (!reward) {
			throw new Error('REWARD_NOT_FOUND');
		}

		if (reward.amount_left <= 0) {
			throw new Error('REWARD_OUT_OF_STOCK');
		}

		const donator = await prisma.donators.findUnique({
			where: {
				id: donatorId
			}
		});

		// check if donator exists or not
		if (!donator) {
			throw new Error('DONATOR_NOT_FOUND');
		}

		// check if donator has enough points to redeem reward
		if (donator.reward_point < reward?.required_points) {
			throw new Error('INSUFFICIENT_POINTS');
		}

		const updatedReward = await prisma.rewards.update({
			where: {
				id: rewardId
			},
			data: {
				amount_left: {
					decrement: 1
				}
			}
		});

		const updatedDonator = await donatorsController.updatePoints(
			{
				id: donatorId
			},
			-reward?.required_points
		);

		const redemptionHistory = await prisma.redemption_History.create({
			data: {
				redeem_amount: 1,
				status: 'REDEEMED',
				used_points: reward?.required_points || 0,
				reward_id: rewardId,
				donator_id: donatorId
			},
			include: {
				Donator: true,
				Reward: true
			}
		});

		return {
			redemptionHistory,
			donator: updatedDonator,
			reward: updatedReward
		};
	},
	getRedeemRewardsHistory: async (args: {
		donatorFilter?: Prisma.DonatorsWhereUniqueInput;
		rewardsFilter?: Prisma.Redemption_HistoryWhereInput;
		include?: Prisma.Redemption_HistoryInclude;
	}) => {
		const { donatorFilter, rewardsFilter, include } = args;

		if (donatorFilter) {
			const donator = await prisma.donators.findUnique({
				where: donatorFilter
			});

			if (!donator) {
				throw new Error('DONATOR_NOT_FOUND');
			}
		}

		if (rewardsFilter) {
			const reward = await prisma.redemption_History.findMany({
				where: rewardsFilter
			});

			if (!reward) {
				throw new Error('REWARD_NOT_FOUND');
			}
		}

		const redeemedRewards = await prisma.redemption_History.findMany({
			where: {
				Donator: donatorFilter,
				...rewardsFilter
			},
			include: {
				Donator: true,
				Reward: true,
				...include
			},
			orderBy: {
				created_at: 'desc'
			}
		});
		return redeemedRewards;
	},
	cancelRedeem: async (args: RewardControllerCancelRedeemRewardArgs) => {
		const { redemptionHistoryFilter, donatorFilter } = args;

		const redemptionHistory = await prisma.redemption_History.findUnique({
			where: redemptionHistoryFilter
		});

		if (!redemptionHistory) {
			throw new Error('REDEMPTION_HISTORY_NOT_FOUND');
		}

		const reward = await prisma.rewards.findFirst({
			where: {
				Redemption_History: {
					some: {
						...redemptionHistory
					}
				}
			}
		});

		// check if reward exists
		if (!reward) {
			throw new Error('REWARD_NOT_FOUND');
		}

		const donator = await prisma.donators.findFirst({
			where: donatorFilter
		});

		if (!donator) {
			throw new Error('DONATOR_NOT_FOUND');
		}

		await prisma.$transaction([
			prisma.rewards.update({
				where: reward,
				data: {
					amount_left: {
						increment: 1
					}
				}
			}),
			prisma.redemption_History.update({
				where: {
					id: redemptionHistory.id
				},
				data: {
					status: 'CANCELLED'
				}
			}),
			prisma.donators.update({
				where: {
					id: donator.id
				},
				data: {
					reward_point: {
						increment: reward?.required_points
					}
				}
			})
		]);
	},
	redeemComplete: async (args: RewardControllerCancelRedeemRewardArgs) => {
		const { redemptionHistoryFilter } = args;

		const historyExist = await prisma.redemption_History.findUnique({
			where: {
				...redemptionHistoryFilter,
				status: 'REDEEMED'
			}
		});

		if (!historyExist) {
			throw new Error('REDEMPTION_HISTORY_NOT_FOUND');
		}

		const redemptionHistory = await prisma.redemption_History.update({
			where: { ...redemptionHistoryFilter },
			data: {
				status: 'RECEIVED'
			}
		});

		return redemptionHistory;
	},
	getAllRedeemRewardsHistory: async (args: RewardControllerGetAllRedeemRewardsHistoryArgs) => {
		const { donatorFilter } = args;

		const allRedeemedRewards = await prisma.redemption_History.findMany({
			where: {
				Donator: donatorFilter
			},
			include: {
				Donator: true,
				Reward: true
			},
			orderBy: {
				created_at: 'desc'
			}
		});
		return allRedeemedRewards;
	}
};
