import { trpc, trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from '../../home/$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const [event, specialEventData] = await Promise.all([
		trpc.specialEvent.isEvent.query(),
		trpc.specialEvent.getEvent.query()
	]);

	return {
		isEventOnGoing: event,
		eventNow: specialEventData
	};
}) satisfies PageServerLoad;
