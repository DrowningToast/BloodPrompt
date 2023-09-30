import { trpcOnServer } from '$lib/trpc';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const trpcServer = trpcOnServer(fetch);

	console.log('get fucked');

	await trpcServer.auth.getUser.query().then((res) => {
		if (!res) {
			// alert('โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ...');
			throw redirect(307, '/login');
		}
	});

	return {};
}) satisfies LayoutServerLoad;
