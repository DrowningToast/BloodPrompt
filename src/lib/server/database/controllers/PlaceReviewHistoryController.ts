import type { Prisma } from '@prisma/client';
import prisma from '..';

export const PlaceReviewHistoryController = {
	createReview: async (input: Prisma.Place_Review_HistoryCreateInput) => {
		const review = await prisma.place_Review_History.create({
			data: input
		});
		return review;
	}
};
