import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const trpc = trpcOnServer(fetch);

	return {
		eachReward: await trpc.reward.findById.query(params.id)
	};
}) satisfies PageServerLoad;
