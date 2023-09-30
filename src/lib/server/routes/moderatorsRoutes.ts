import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma from '../database';
import { encodePassword } from '$lib/utils';

export const moderatorRoutes = createRouter({
	update: publicProcedure
		.input(
			z.object({
				data: z.object({
					first_name: z.string(),
					last_name: z.string(),
					phone_number: z.string(),
					email: z.string(),
					password: z.string()
				}),
				moderatorId: z.string().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const { data, moderatorId } = input;

			if (data.password) {
				data.password = encodePassword(data.password);
			}

			const res = await prisma.moderators.update({
				data: {
					...data
				},
				where: {
					id: moderatorId
				}
			});
			return res;
		}),
	get: publicProcedure.query(async () => {
		const moderator = await prisma.moderators.findMany();
		return moderator[0];
	})
});
