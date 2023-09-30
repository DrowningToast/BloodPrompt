import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		rewardId: params.id
	};
}) satisfies PageServerLoad;
