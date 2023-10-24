import { trpcOnServer } from '$lib/API/TRPC/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const trpc = trpcOnServer(fetch);
	const place = await trpc.places.findById.query({ placeId: params.id });

	if (!place) {
		throw redirect(307, '/home');
	}

	return {
		place,
		placeId: params.id
	};
}) satisfies PageServerLoad;
