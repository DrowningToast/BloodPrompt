import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';
export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();
	const medicalStaff = await trpc.medicalStaff.findById.query({
		medicalStaffId: user?.user.id || ' '
	});
	const rewards = await trpc.reward.getAllRewards.query();
	let filteredRewards = (await rewards).filter((reward) => {
		return reward.deleted_at === null;
	});
	filteredRewards = filteredRewards.filter((reward) => reward.place_id === medicalStaff?.Place.id);
	return { filteredRewards };
}) satisfies PageServerLoad;
