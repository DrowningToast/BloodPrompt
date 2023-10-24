import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';
export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const [user, rewards] = await Promise.all([
		trpc.auth.getUser.query(),
		trpc.reward.getAllRewards.query()
	]);

	const medicalStaff = await trpc.medicalStaff.findById.query({
		medicalStaffId: user?.user.id || ' '
	});
	let filteredRewards = rewards.filter((reward) => {
		return reward.deleted_at === null;
	});
	filteredRewards = filteredRewards.filter((reward) => reward.place_id === medicalStaff?.Place.id);
	return { filteredRewards };
}) satisfies PageServerLoad;
