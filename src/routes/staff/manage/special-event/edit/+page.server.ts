import type { PageServerLoad } from './$types';
import { trpcOnServer } from '$lib/trpc';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const currentEvent = await trpc.specialEvent.getEvent.query();
	return {
		currentEvent
	};
}) satisfies PageServerLoad;
