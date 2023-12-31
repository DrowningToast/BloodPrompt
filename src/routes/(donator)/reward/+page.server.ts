import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const rewards = await trpc.reward.getAllRewards.query();
	const currentUser = await trpc.auth.getUser.query();
	const donator = await trpc.donators.findById.query({ donatorId: currentUser?.user.id || '' });

	if (currentUser?.type !== 'DONATOR') {
		throw redirect(307, '/login');
	}

	if (!donator) {
		throw redirect(307, '/login');
	}

	return {
		rewards,
		donator
	};
};
