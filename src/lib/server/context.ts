import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import prisma, { type Donators, type Medical_Staff, type Moderators } from './database';
import superjson from 'superjson';

type UserContext = DonatorContext | MedicalStaffContext | ModeratorContext | undefined;

interface DonatorContext {
	user: Donators;
	type: 'DONATOR';
}

interface MedicalStaffContext {
	user: Medical_Staff;
	type: 'MEDICAL_STAFF';
}

interface ModeratorContext {
	user: Moderators;
	type: 'MODERATOR';
}

function getCookie(cookiesString: string, name: string) {
	const match = cookiesString.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return match[2];
}

export const createSvelteKitContext =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(locals: App.Locals) => async (opts: FetchCreateContextFnOptions) => {
		const cookie = opts.req.headers.get('Cookie');

		let userContext: UserContext;

		if (cookie) {
			const sessionToken = getCookie(cookie, 'session-token');

			if (sessionToken) {
				// validate session token
				const session = await prisma.session.findUnique({
					where: {
						session_token: sessionToken,
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
				if (session) {
					if (session.Donator) {
						userContext = {
							type: 'DONATOR',
							user: session.Donator!
						};
					} else if (session.Medical_Staff) {
						userContext = {
							type: 'MEDICAL_STAFF',
							user: session.Medical_Staff
						};
					} else if (session.Moderator) {
						userContext = {
							type: 'MODERATOR',
							user: session.Moderator
						};
					}
					return {
						...locals,
						opts,
						sessionToken,
						userContext
					};
				}
			}
		}

		return {
			...locals,
			opts,
			userContext: undefined
		};
	};

export const t = initTRPC.context<ReturnType<typeof createSvelteKitContext>>().create({
	transformer: superjson
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;
