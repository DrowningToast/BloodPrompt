import { trpcOnServer } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const announcements = await trpc.announcement.getAll.query();
	return { announcements };
}) satisfies PageLoad;

export const ssr = false;
