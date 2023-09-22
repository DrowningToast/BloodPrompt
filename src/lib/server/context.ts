import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSvelteKitContext = (locals: App.Locals) => (opts: FetchCreateContextFnOptions) =>
	locals;

const t = initTRPC.context<ReturnType<typeof createSvelteKitContext>>().create();
export const createRouter = t.router;
export const publicProcedure = t.procedure;
