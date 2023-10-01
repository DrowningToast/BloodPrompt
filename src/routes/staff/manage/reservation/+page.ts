import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const allReservation = await trpc.reservation.findAll.query();
	return {
		allReservation
	};
}) satisfies PageLoad;

export const ssr = false;
