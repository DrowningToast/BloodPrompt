import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();

	if (user?.type !== 'DONATOR') {
		throw redirect(307, '/login');
	}

	if (user.user?.id === undefined) {
		throw redirect(307, '/login');
	}

	// fetch announcemnet
	const announcements = await trpc.announcement.getAnnouncements.query();

	// fetch for post feedback status
	const pendingFeedback = await trpc.postFeedback.checkPendingFeedback.query({
		id: user.user.id
	});

	return { announcements, user: user.user, pendingFeedback: pendingFeedback ?? undefined };
};
