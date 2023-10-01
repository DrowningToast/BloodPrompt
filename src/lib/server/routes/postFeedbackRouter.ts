import { createRouter, publicProcedure } from '../context';
import prisma from '../database';
import { postDonationFeedbackController } from '../database/controllers/postDonationFeedbackController';

export const postFeedbackRouter = createRouter({
	checkPendingFeedback: publicProcedure.query(async ({ ctx }) => {
		const pending = await postDonationFeedbackController.getPendingFeedback();
		return pending;
	})
});
