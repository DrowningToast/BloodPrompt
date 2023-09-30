import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const currentUser = await trpc.auth.getUser.query();
	const redemptionHistories = await trpc.reward.getRedeemRewardsByDonatorId.query({
		donatorId: currentUser?.user.id || ''
	});
	return {
		redemptionHistories
	};
}) satisfies PageLoad;

export const ssr = false;
