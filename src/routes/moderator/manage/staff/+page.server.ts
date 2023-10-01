import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const places = await trpc.places.findAll.query();
	const medicalAccounts = await trpc.medicalStaff.findAll.query();
	return {
		places,
		medicalAccounts
	};
};
