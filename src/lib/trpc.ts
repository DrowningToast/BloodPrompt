import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { FetchEsque } from '@trpc/client/dist/internals/types';
import type { AppRouter } from './server/router';
import SuperJSON from 'superjson';

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [httpBatchLink({ url: '/api/trpc' })],
	transformer: SuperJSON
});

export const trpcOnServer = (fetch: FetchEsque) =>
	createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: '/api/trpc',
				fetch
			})
		],
		transformer: SuperJSON
	});
