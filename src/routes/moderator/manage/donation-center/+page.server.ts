import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const places = await trpc.places.findAll.query();
	return {
		places
	};
}) satisfies PageServerLoad;
