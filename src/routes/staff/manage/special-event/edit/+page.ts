import type { PageLoad } from './$types';
import { trpc } from '$lib/trpc';

export const load = (async () => {
	const currentEvent = await trpc.specialEvent.getEvent.query();
	return {
		currentEvent
	};
}) satisfies PageLoad;
export const ssr = false;
