import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';
export const load = (async () => {
	const trpc = trpcOnServer(fetch);
	const rewards = trpc.reward.getAllRewards.query();
	return { rewards };
}) satisfies PageLoad;

export const ssr = false;
