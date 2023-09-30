import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const trpc = trpcOnServer(fetch);
	const place = await trpc.places.findById.query({ placeId: params.id });
	return {
		place,
		placeId: params.id
	};
}) satisfies PageLoad;

export const ssr = false;
