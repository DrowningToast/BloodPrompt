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
		const allRewards = await prisma.rewards.findMany();
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
	})
});
