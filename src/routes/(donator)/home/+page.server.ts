import { trpcOnServer } from '$lib/API/TRPC/trpc';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const [user, announcements, sp_events] = await Promise.all([
		trpc.auth.getUser.query(),
		trpc.announcement.getAnnouncements.query(),
		trpc.specialEvent.getEvents.query()
	]);

	if (user?.type !== 'DONATOR') {
		throw redirect(307, '/login');
	}

	if (user.user?.id === undefined) {
		throw redirect(307, '/login');
	}
	// fetch for post feedback status
	const pendingFeedback = await trpc.postFeedback.checkPendingFeedback.query({
		id: user.user.id
	});

	return {
		announcements,
		user: user.user,
		pendingFeedback: pendingFeedback ?? undefined,
		sp_events
	};
};
