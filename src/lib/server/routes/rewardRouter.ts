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
			console.log(input);
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
		})
});
