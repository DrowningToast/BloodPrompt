import { trpc, trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const trpc = trpcOnServer(fetch);

	const announcement = await trpc.announcement.getById.query({ announcementId: params.id });

	return { announcement };
}) satisfies PageServerLoad;
