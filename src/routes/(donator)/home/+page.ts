import type { PageLoad } from './$types';
import { trpcOnServer } from '$lib/trpc';

export const load = (async ({ fetch }) => {
	const trpc = trpcOnServer(fetch);
	const user = await trpc.auth.getUser.query();
	console.log('====', user);
	return {
		user: user?.user
	};
}) satisfies PageLoad;

export const ssr = false;
