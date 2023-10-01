import { trpc, trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const moderator = await trpc.moderator.get.query();
	return {
		moderator
	};
}) satisfies PageServerLoad;
