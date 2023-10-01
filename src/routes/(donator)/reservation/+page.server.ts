import prisma from '$lib/server/database';
import type { PageServerLoad } from './$types';
import type { HospitalWithReviews } from './utils';

export const load = (async () => {
	// fetch hospital
	const hospital = await prisma.places.findMany({
		where: {
			deleted_at: null
		}
	});

	const reviews = await prisma.place_Review_History.groupBy({
		by: ['place_id'],
		_sum: {
			rating: true
		},
		_count: {
			id: true
		}
	});

	const hospitalWithReviews: HospitalWithReviews[] = hospital.map((hospital) => {
		const review = reviews.find((review) => review.place_id === hospital.id);
		return {
			...hospital,
			review: {
				rating: review?._sum?.rating || 0,
				count: review?._count?.id || 0
			}
		};
	});

	return { hospitals: hospitalWithReviews };
}) satisfies PageServerLoad;
