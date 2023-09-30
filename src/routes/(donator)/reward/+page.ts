import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const rewards = await trpc.reward.getAllRewards.query();
	const donator = await trpc.auth.getUser.query();
	return {
		rewards,
		donator: donator?.user || null
	};
}) satisfies PageLoad;

export const ssr = false;
