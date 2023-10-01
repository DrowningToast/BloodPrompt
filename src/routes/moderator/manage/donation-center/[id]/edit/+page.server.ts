import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const trpc = trpcOnServer(fetch);
	const place = await trpc.places.findById.query({ placeId: params.id });
	return {
		place,
		placeId: params.id
	};
}) satisfies PageServerLoad;
