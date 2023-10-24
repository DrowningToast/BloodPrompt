import { trpcOnServer } from '$lib/server/API/TRPC/trpc';
import type { PageServerLoad } from '../$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const [currentUser, redemptionHistories] = await Promise.all([
		trpc.auth.getUser.query(),
		trpc.reward.getAllRedemptionHistoryByPlaceId.query()
	]);

	const medicalStaff = await trpc.medicalStaff.findById.query({
		medicalStaffId: currentUser?.user.id || ''
	});
	const redemptionData = [];
	for (const data of redemptionHistories) {
		if (data.Reward.place_id === medicalStaff?.place_id) {
			redemptionData.push(data);
		}
	}

	console.log(redemptionData);

	return {
		redemptionData
	};
}) satisfies PageServerLoad;
