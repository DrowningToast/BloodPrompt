import { browser } from '$app/environment';
import { trpc } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async () => {
	// if place already has special event
	const event = await trpc.specialEvent.isEvent.query();
	const specialEventData = await trpc.specialEvent.getEvent.query();
	const deleteEvent = async () => {
		await trpc.specialEvent.delete.mutate(specialEventData?.id || '').then(() => {
			if (browser) {
				window.location.reload();
			}
		});
	};
	return {
		isEventOnGoing: event,
		eventNow: specialEventData,
		deleteEventHandler: deleteEvent
	};
}) satisfies PageLoad;

export const ssr = false;
