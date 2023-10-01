import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const currentUser = await trpc.auth.getUser.query();
	const medicalStaff = await trpc.medicalStaff.findById.query({
		medicalStaffId: currentUser?.user.id || ''
	});
	const redemptionHistories = await trpc.reward.getAllRedemptionHistory.query();
	const redemptionData = [];
	for (const data of redemptionHistories) {
		if (data.Reward.place_id === medicalStaff?.place_id) {
			redemptionData.push(data);
		}
	}
	return {
		redemptionData
	};
}) satisfies PageLoad;

export const ssr = false;
