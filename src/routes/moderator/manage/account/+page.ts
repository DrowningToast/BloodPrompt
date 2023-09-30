import { trpc } from '$lib/trpc';
import type { PageLoad } from './$types';

export const load = (async () => {
	const moderator = await trpc.moderator.get.query();
	return {
		moderator
	};
}) satisfies PageLoad;

export const ssr = false;
