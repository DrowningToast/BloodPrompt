import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const rewards = await trpc.reward.getAllRewards.query();
	const currentUser = await trpc.auth.getUser.query();
	const donator = await trpc.donators.findById.query({ donatorId: currentUser?.user.id || '' });
	console.log(donator?.reward_point);
	return {
		rewards,
		donator
	};
}) satisfies PageLoad;

export const ssr = false;
