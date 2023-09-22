import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createSvelteKitContext =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(locals: App.Locals) => (opts: FetchCreateContextFnOptions) => {
		console.log('createSvelteKitContext() locals ', locals.session);
		console.log(opts);
		return {
			...locals
		};
	};

const t = initTRPC.context<ReturnType<typeof createSvelteKitContext>>().create();
export const createRouter = t.router;
export const publicProcedure = t.procedure;
