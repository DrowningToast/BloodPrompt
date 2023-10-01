import type { Prisma } from '@prisma/client';
import prisma from '..';

export const preFeedbackController = {
	createFeedback: async (feedback: Prisma.Pre_Donation_FeedbacksCreateArgs) => {
		return await prisma.pre_Donation_Feedbacks.create({
			data: feedback
		});
	}
};
