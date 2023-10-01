import { trpc } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const announcement = await trpc.announcement.getById.query({ announcementId: params.id });

	return { announcement };
}) satisfies PageLoad;

export const ssr = false;
