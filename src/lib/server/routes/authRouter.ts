import { createRouter } from '../context';
import { publicProcedure } from '../context';
import { z } from 'zod';
import prisma from '$lib/server/database';
import { TRPCError } from '@trpc/server';
import { sessionController } from '../database/controllers/sessionController';

export const authRouter = createRouter({
	getUser: publicProcedure.query(async ({ ctx }) => {
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
			console.log('donatorLogin()');

			// Get phone_number and password from user input
			const { phone_number, password } = input;

			console.log('encodePassword (input)', phone_number, password);

			// Get user with phone_number and password correct
			const user = await prisma.donators.findUnique({
				where: {
					phone_number: phone_number
				}
			});

			console.log('encodedPassword (user): ', user);

			if (!user) {
				throw new TRPCError({
					code: 'UNAUTHORIZED'
				});
			}

			// Create new session for user
			const session = await sessionController.createSessionToken({
				donator: { connect: { id: user.id } }
			});

			console.log('donatorLogin (ctx): ', ctx);
			console.log('donatorLogin (session): ', session);

			if (session.session_token && user) {
				//ctx.event.cookies.set('session-token', session.session_token);
				ctx.user = user;
			}

			// console.log('ctx: ', ctx);

			return { user, session };
		})
});
