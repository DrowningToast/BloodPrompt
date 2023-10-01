import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();

	if (user?.type !== 'DONATOR') {
		throw new Error('User is not a donator');
	}

	// fetch announcemnet
	const announcements = await trpc.announcement.getAnnouncements.query();

	// fetch for post feedback status
	const pendingFeedback = await trpc.postFeedback.checkPendingFeedback.query();

	return { announcements, user: user.user, pendingFeedback: pendingFeedback ?? undefined };
};
