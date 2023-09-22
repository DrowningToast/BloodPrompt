import { prisma } from '$lib/serverUtils';
import type { Handle } from '@sveltejs/kit';

export const injectSessionMiddleware: Handle = async ({ event, resolve }) => {
	const session = await event.locals.session;
	const isDonator = session?.donator_id ? true : false;

	if (isDonator && session) {
		const donator = await prisma.donators.findUnique({
			where: {
				id: session.donator_id || ''
			},
			include: {
				Medical_Account: true
			}
		});
		event.locals.user = donator;
	} else if (!isDonator && session) {
		const medicalStaff = await prisma.medical_Staff.findUnique({
			where: {
				id: session.medical_staff_id || ''
			},
			include: {
				Place: true
			}
		});
		event.locals.user = medicalStaff;
	}

	const response = resolve(event);
	return response;
};
