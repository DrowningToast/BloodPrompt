import { createRouter } from '../context';
import { protectedProcedure, publicProcedure } from '../procedure';
import { z } from 'zod';
import { prisma } from '$lib/serverUtils';
import { TRPCError } from '@trpc/server';

import { comparePassword, encodePassword } from '$lib/utils';

export const authRouter = createRouter({
	getUser: protectedProcedure.query(async ({ ctx }) => {
		const user = { ctx };
		return user;
	}),
	donatorLogin: publicProcedure
		.input(
			z.object({
				phone_number: z.string().min(1),
				password: z.string().min(1)
			})
		)
		.mutation(async ({ input, ctx }) => {
			// Get phone_number and password from user input
			const { phone_number, password } = input;

			console.log('encodePassword (input)', phone_number, password);

			// Get user with phone_number and password correct
			const user = await prisma.donators.findUnique({
				where: {
					phone_number: phone_number
				}
			});

			if (!user) {
				throw new TRPCError({
					code: 'UNAUTHORIZED'
				});
			}

			console.log('encodePassword: ', (await comparePassword(user?.password, password)) + '');
			console.log('donatorLogin: ', user?.id);

			// Create new session for user
			const session = await prisma.session.create({
				data: {
					Donator: {
						connect: {
							id: user.id,
							phone_number: user.phone_number
						}
					}
				}
			});

			console.log('Session: ', session);

			ctx.session = session;
			ctx.user = user;

			console.log('ctx: ', ctx);

			return { user, session };
		})
});
