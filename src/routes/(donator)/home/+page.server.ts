import { trpcOnServer } from '$lib/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);

	const announcements = await trpc.announcement.getAnnouncements.query().catch((err) => {
		console.log(err);
		return [];
	});
	const user = await trpc.auth.getUser.query();

	console.log(user);

	if (user?.type === 'DONATOR') {
		return { announcements, user: user.user };
	} else {
		throw new Error('User is not a donator');
	}
}) satisfies PageServerLoad;
