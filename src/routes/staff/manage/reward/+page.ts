import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';
export const load = (async () => {
	const trpc = trpcOnServer(fetch);
	const rewards = trpc.reward.getAllRewards.query();
	const filteredRewards = (await rewards).filter((reward) => {
		return reward.deleted_at === null;
	});
	return { filteredRewards };
}) satisfies PageLoad;

export const ssr = false;
