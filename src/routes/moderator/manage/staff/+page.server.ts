import { trpcOnServer } from '$lib/API/TRPC/trpc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const [places, medicalAccounts] = await Promise.all([
		trpc.places.findAll.query(),
		trpc.medicalStaff.findAll.query()
	]);

	return {
		places,
		medicalAccounts
	};
};
