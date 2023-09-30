import type { PageLoad } from './$types';
import { trpcOnServer } from '$lib/trpc';

export const load = (async () => {
	const trpc = trpcOnServer(fetch);
	const places = await trpc.places.findAll.query();
	const medicalAccounts = await trpc.medicalStaff.findAll.query();
	return {
		places,
		medicalAccounts
	};
}) satisfies PageLoad;

export const ssr = false;
