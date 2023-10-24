import { placeController } from '$lib/server/DatabaseController/placeController';
import type { PageServerLoad } from './$types';
import type { HospitalWithReviews } from './utils';

export const load = (async () => {
	const { hospital, reviews } = await placeController.getAllWithReviews();

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
