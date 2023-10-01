import { trpc } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async () => {
	const event = await trpc.specialEvent.isEvent.query();
	const specialEventData = await trpc.specialEvent.getEvent.query();

	return {
		isEventOnGoing: event,
		eventNow: specialEventData
	};
}) satisfies PageLoad;

export const ssr = false;
