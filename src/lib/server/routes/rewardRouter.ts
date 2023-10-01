import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma from '../database';

export const rewardRouter = createRouter({
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
				description: z.string(),
				required_points: z.number(),
				amount_left: z.number(),
				image_src: z.string().optional()
			})
		)
		.mutation(async ({ input, ctx }) => {
			const sessionToken = ctx.sessionToken;
			const session = await prisma.session.findUnique({
				where: {
					session_token: sessionToken
				},
				include: {
					Medical_Staff: true
				}
			});
			const reward = await prisma.rewards.create({
				data: {
					...input,
					place_id: session?.Medical_Staff?.place_id || ''
				}
			});
			return reward;
		}),
	getAllRewards: publicProcedure.query(async () => {
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
	}),
	delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
		await prisma.rewards.update({
			where: {
				id: input
			},
			data: {
				deleted_at: new Date()
			}
		});
	}),
	update: publicProcedure
		.input(
			z.object({
				data: z.object({
					name: z.string().min(1),
					description: z.string(),
					required_points: z.number(),
					amount_left: z.number(),
					image_src: z.string().optional()
				}),
				rewardId: z.string().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const newData = input.data;
			await prisma.rewards.update({
				where: {
					id: input.rewardId
				},
				data: {
					name: newData.name,
					description: newData.description,
					required_points: newData.required_points,
					amount_left: newData.required_points,
					image_src: newData.image_src
				}
			});
		}),
	findById: publicProcedure.input(z.string().min(1)).query(async ({ input }) => {
		const currentReward = await prisma.rewards.findUnique({
			where: {
				id: input
			}
		});
		return currentReward;
	}),
	redeem: publicProcedure
		.input(
			z.object({
				rewardId: z.string().min(1),
				donatorId: z.string().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const { rewardId, donatorId } = input;
			const reward = await prisma.rewards.update({
				where: {
					id: rewardId
				},
				data: {
					amount_left: {
						decrement: 1
					}
				}
			});
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

			const rewardTransaction = await prisma.reward_Transactions.create({
				data: {
					donator_id: donatorId,
					points: reward?.required_points ? -reward.required_points : 0
				},
				include: {
					Donator: true
				}
			});

			const donator = await prisma.donators.update({
				where: {
					id: donatorId
				},
				data: {
					reward_point: {
						decrement: reward?.required_points
					}
				}
			});

			return {
				redemptionHistory,
				rewardTransaction,
				donator
			};
		}),
	getRedeemRewardsByDonatorId: publicProcedure
		.input(
			z.object({
				donatorId: z.string()
			})
		)
		.query(async ({ input }) => {
			const { donatorId } = input;
			const redemptionHistory = await prisma.redemption_History.findMany({
				where: {
					donator_id: donatorId
				},
				include: {
					Donator: true,
					Reward: true
				},
				orderBy: {
					created_at: 'desc'
				}
			});
			return redemptionHistory;
		}),
	getRedeemRewardsByRewardId: publicProcedure
		.input(
			z.object({
				rewardId: z.string()
			})
		)
		.query(async ({ input }) => {
			const { rewardId } = input;
			const redemptionHistory = await prisma.redemption_History.findMany({
				where: {
					reward_id: rewardId
				},
				include: {
					Donator: true,
					Reward: true
				}
			});
			return redemptionHistory;
		}),

	cancelRedeem: publicProcedure
		.input(
			z.object({
				donatorId: z.string(),
				rewardId: z.string(),
				redemptionHistoryId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { donatorId, rewardId, redemptionHistoryId } = input;
			const reward = await prisma.rewards.findUnique({
				where: {
					id: rewardId
				}
			});
			await prisma.$transaction([
				prisma.rewards.update({
					where: {
						id: rewardId
					},
					data: {
						amount_left: {
							increment: 1
						}
					}
				}),
				prisma.reward_Transactions.create({
					data: {
						donator_id: donatorId,
						points: reward?.required_points || 0
					}
				}),
				prisma.redemption_History.update({
					where: {
						id: redemptionHistoryId
					},
					data: {
						status: 'CANCELLED'
					}
				}),
				prisma.donators.update({
					where: {
						id: donatorId
					},
					data: {
						reward_point: {
							increment: reward?.required_points
						}
					}
				})
			]);
			return true;
		}),
	markAsReceived: publicProcedure
		.input(z.object({ redemptionHistoryId: z.string().min(1) }))
		.mutation(async ({ input }) => {
			const { redemptionHistoryId } = input;
			const res = await prisma.redemption_History.update({
				where: {
					id: redemptionHistoryId
				},
				data: {
					status: 'RECEIVED'
				}
			});
			return res;
		}),
	getRedemptionHistoryById: publicProcedure
		.input(z.object({ redemptionHistoryId: z.string() }))
		.query(async ({ input }) => {
			const redemptionHistory = await prisma.redemption_History.findUnique({
				where: {
					id: input.redemptionHistoryId
				},
				include: {
					Reward: true,
					Donator: true
				}
			});
			return redemptionHistory;
		}),
	getAllRedemptionHistory: publicProcedure.query(async () => {
		const redemptionHistories = await prisma.redemption_History.findMany({
			orderBy: {
				created_at: 'desc'
			},
			include: {
				Reward: true,
				Donator: true
			}
		});
		return redemptionHistories;
	})
});
