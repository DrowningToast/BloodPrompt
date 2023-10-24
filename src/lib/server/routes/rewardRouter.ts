import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma from '../database';
import { rewardController } from '../database/controllers/rewardController';
import { TRPCError } from '@trpc/server';

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

			try {
				const { reward } = await rewardController.create({
					rewardData: input,
					sessionToken
				});

				return reward;
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: error
				});
			}
		}),
	getAllRewards: publicProcedure.query(async () => {
		try {
			const allRewards = await rewardController.getAllRewards();
			return allRewards;
		} catch (e) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: e
			});
		}
	}),
	delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
		const deleted = await rewardController.delete(input);
		return deleted;
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
		.mutation(async ({ input, ctx }) => {
			try {
				const updated = await rewardController.updateReward({
					...input,
					sessionToken: ctx.sessionToken
				});
				return updated;
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: error
				});
			}
		}),
	findById: publicProcedure.input(z.string().min(1)).query(async ({ input }) => {
		try {
			const currentReward = await prisma.rewards.findUnique({
				where: {
					id: input
				}
			});
			return currentReward;
		} catch (e) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: e
			});
		}
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

			try {
				const { redemptionHistory, donator } = await rewardController.redeemReward({
					rewardId,
					donatorId
				});

				return {
					redemptionHistory,

					donator
				};
			} catch (e) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: e
				});
			}
		}),
	getRedeemRewardsByDonatorId: publicProcedure
		.input(
			z.object({
				donatorId: z.string()
			})
		)
		.query(async ({ input }) => {
			const { donatorId } = input;

			try {
				const redemptionHistory = await rewardController.getRedeemRewardsHistory({
					donatorFilter: {
						id: donatorId
					}
				});
				return redemptionHistory;
			} catch (e) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: e
				});
			}
		}),
	getRedeemRewardsByRewardId: publicProcedure
		.input(
			z.object({
				rewardId: z.string()
			})
		)
		.query(async ({ input }) => {
			try {
				const { rewardId } = input;

				const redemptionHistory = await rewardController.getRedeemRewardsHistory({
					rewardsFilter: { id: rewardId }
				});

				return redemptionHistory;
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: error
				});
			}
		}),
	cancelRedeem: publicProcedure
		.input(
			z.object({
				donatorId: z.string(),
				redemptionHistoryId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { redemptionHistoryId, donatorId } = input;

			try {
				await rewardController.cancelRedeem({
					redemptionHistoryFilter: {
						id: redemptionHistoryId
					},
					donatorFilter: {
						id: donatorId
					}
				});
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: error
				});
			}

			return true;
		}),
	markAsReceived: publicProcedure
		.input(z.object({ redemptionHistoryId: z.string().min(1) }))
		.mutation(async ({ input, ctx }) => {
			const { redemptionHistoryId } = input;
			try {
				const res = await rewardController.redeemComplete({
					redemptionHistoryFilter: {
						id: redemptionHistoryId
					},
					donatorFilter: {
						Session: {
							some: {
								session_token: ctx.sessionToken
							}
						}
					}
				});
				return res;
			} catch (e) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: e
				});
			}
		}),
	getRedemptionHistoryById: publicProcedure
		.input(z.object({ redemptionHistoryId: z.string() }))
		.query(async ({ input }) => {
			try {
				const redemptionHistory = await rewardController.getRedeemRewardsHistory({
					rewardsFilter: {
						id: input.redemptionHistoryId
					}
				});
				return redemptionHistory[0];
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: error
				});
			}
		}),
	getAllRedemptionHistory: publicProcedure.query(async ({ ctx }) => {
		const { sessionToken } = ctx;

		try {
			const redemptionHistories = await rewardController.getAllRedeemRewardsHistory({
				donatorFilter: {
					Session: {
						some: {
							session_token: sessionToken
						}
					}
				}
			});
			return redemptionHistories;
		} catch (e) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				cause: e
			});
		}
	})
});
