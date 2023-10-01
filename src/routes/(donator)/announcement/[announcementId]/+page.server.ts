import type { PageServerLoad } from './$types';
import kmitlLogo from '$lib/images/home/kmitl_logo.png';
import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, fetch }) => {
	const announcementId = params.announcementId;
	if (!announcementId) {
		throw redirect(307, '/home');
	}

	const trpc = trpcOnServer(fetch);

	const announcement = await trpc.announcement.getAnnouncement.query({
		id: announcementId
	});
	if (!announcement) {
		throw redirect(307, '/home');
	}

	return {
		announcement
	};
}) satisfies PageServerLoad;
