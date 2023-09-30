import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from '../$types';

export const load = (async () => {
	const trpc = trpcOnServer(fetch);
	const places = await trpc.places.findAll.query();
	return {
		places
	};
}) satisfies PageLoad;

export const ssr = false;
