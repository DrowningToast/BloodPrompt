import { JWT_SECRET } from '$env/static/private';
import { prisma } from '$lib/serverUtils';
import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC } from '@trpc/server';
import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { PrismaClient } from 'database';
import jwt from 'jsonwebtoken';

export const createSvelteKitContext =
	(locals: App.Locals) => async (opts: FetchCreateContextFnOptions, event: RequestEvent) =>
		locals;
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
