import { trpcOnServer } from '$lib/server/API/TRPC/trpc';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();
	let currentUser;
	if (user) {
		currentUser = await trpc.donators.findById.query({
			donatorId: user?.user.id
		});
	}
	return {
		user: currentUser
	};
}) satisfies PageServerLoad;
