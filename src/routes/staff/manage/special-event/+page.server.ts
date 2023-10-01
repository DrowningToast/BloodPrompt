import { trpc, trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from '../../home/$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const event = await trpc.specialEvent.isEvent.query();
	const specialEventData = await trpc.specialEvent.getEvent.query();

	return {
		isEventOnGoing: event,
		eventNow: specialEventData
	};
}) satisfies PageServerLoad;
