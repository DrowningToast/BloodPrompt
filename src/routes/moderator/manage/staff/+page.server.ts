import { trpcOnServer } from '$lib/trpc';

export const load: any = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const places = await trpc.places.findAll.query();
	const medicalAccounts = await trpc.medicalStaff.findAll.query();
	return {
		places,
		medicalAccounts
	};
};
