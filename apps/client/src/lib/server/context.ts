import { prisma } from '$lib/serverUtils';
import { initTRPC } from '@trpc/server';
import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { PrismaClient } from 'database';

function getCookie(cookiesString: string, name: string) {
	const match = cookiesString.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2];
}

export const createSvelteKitContext =
	(locals: App.Locals) => async (opts: FetchCreateContextFnOptions) => {
		const cookies = opts.req.headers.get('Cookie');
		let sessionTokenCookie: string | undefined;

		// If authenticated request
		if (cookies) {
			sessionTokenCookie = getCookie(cookies, 'next-auth.session-token');

			if (sessionTokenCookie) {
				const user = (
					await prisma.session.findUnique({
						where: {
							sessionToken: sessionTokenCookie
						},
						select: {
							user: {
								include: {
									faction: true,
									sophomoreDetails: true,
									freshmenDetails: true
								}
							}
						}
					})
				)?.user;

				return {
					...locals,
					prisma: PrismaClient,
					user
				};
			}
		}

		return {
			...locals,
			prisma: PrismaClient
		};
	};

export type Context = inferAsyncReturnType<ReturnType<typeof createSvelteKitContext>>;

export const t = initTRPC.context<Context>().create();

export const createRouter = t.router;
