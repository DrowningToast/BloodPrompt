import { createRouter, publicProcedure } from '../context';
import prisma, { Post_Donation_FeedbacksCreateArgsSchema } from '../database';
import { postDonationFeedbackController } from '../database/controllers/postDonationFeedbackController';

export const postFeedbackRouter = createRouter({
	checkPendingFeedback: publicProcedure.query(async ({ ctx }) => {
		const pending = await postDonationFeedbackController.getPendingFeedback();
		return pending;
	}),
	getPostFeedbackQuestions: publicProcedure.query(async ({ ctx }) => {
		const questions = await postDonationFeedbackController.getPostSurveyQuestions();
		return questions;
	}),
	createFeedback: publicProcedure
		.input(Post_Donation_FeedbacksCreateArgsSchema)
		.mutation(async ({ input }) => {
			console.log(input);
			const feedback = await postDonationFeedbackController.createFeedback(input);
			return feedback;
		})
});
