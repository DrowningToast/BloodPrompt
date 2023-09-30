import type { PageLoad } from './$types';
import { trpc } from '$lib/trpc';

export const load = (async ({ params }) => {
	return {
		eachReward: await trpc.reward.findById.query(params.id)
	};
}) satisfies PageLoad;
