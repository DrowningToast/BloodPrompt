import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const name = 'Server Alias';
	return { output: await trpc.greet.query({ name }), name };
}) satisfies PageLoad;
