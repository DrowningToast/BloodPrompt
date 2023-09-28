import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		redeemId: params.redeemId
	};
}) satisfies PageLoad;
