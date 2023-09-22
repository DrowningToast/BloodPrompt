import { prisma } from '$lib/serverUtils';
import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC } from '@trpc/server';
import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { PrismaClient } from 'database';
import { dbClient } from 'database/db';

export const createSvelteKitContext =
	(locals: App.Locals) => async (opts: FetchCreateContextFnOptions, event: RequestEvent) => {
		try {
			const token = event.cookies.get('session-token');

			if (token) {
				const session = await prisma.session.findFirst({
					where: {
						session_token: token,
						expires: {
							gt: new Date()
						}
					},
					include: {
						Donator: true,
						Medical_Staff: true,
						Moderator: true
					}
				});

				let user: 'DONATOR' | 'MODERATOR' | 'MEDICAL_STAFF' = 'DONATOR';
				if (session?.moderator_id) {
					user = 'MODERATOR';
				} else if (session?.medical_staff_id) {
					user = 'MEDICAL_STAFF';
				} else {
					user = 'DONATOR';
				}

				return {
					...locals,
					prisma: dbClient,
					session,
					role: user,
					user: session?.Medical_Staff || session?.Donator || session?.Moderator
				};
			}

			return {
				...locals,
				prisma: dbClient,
				session: null,
				role: 'NONE',
				user: null
			};
		} catch {
			return {
				...locals,
				prisma: PrismaClient
			};
		}
	};
// {
// 	console.log('createSvelteKitContext: ', event.cookies);
// 	try {
// 		const token = event.cookies.get('jwt');
// 		const { id } = jwt.verify(token || '', JWT_SECRET) as { id: string };

// 		const session = await prisma.session.findUnique({
// 			where: {
// 				id: id
// 			},
// 			include: {
// 				Donator: true,
// 				Medical_Staff: true,
// 				Moderator: true
// 			}
// 		});

// 		return {
// 			...locals,
// 			prisma: PrismaClient,
// 			session,
// 			user: session?.Medical_Staff || session?.Donator || session?.Moderator
// 		};
// 	} catch {
// 		return {
// 			...locals,
// 			prisma: PrismaClient
// 		};
// 	}
// };

export type Context = inferAsyncReturnType<ReturnType<typeof createSvelteKitContext>>;

export const t = initTRPC.context<Context>().create();

export const createRouter = t.router;
