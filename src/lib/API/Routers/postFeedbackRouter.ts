import { createRouter, publicProcedure } from '../TRPC/context';
import { postDonationFeedbackController } from '../../DatabaseController/postDonationFeedbackController';
import {
	DonatorsWhereUniqueInputSchema,
	Post_Donation_FeedbacksCreateArgsSchema
} from '$lib/generated-zod';

export const postFeedbackRouter = createRouter({
	checkPendingFeedback: publicProcedure
		.input(DonatorsWhereUniqueInputSchema)
		.query(async ({ ctx, input }) => {
			const pending = await postDonationFeedbackController.getPendingFeedback(input);
			return pending;
		}),
	getPostFeedbackQuestions: publicProcedure.query(async ({ ctx }) => {
		const questions = await postDonationFeedbackController.getPostSurveyQuestions();
		return questions;
	}),
	createFeedback: publicProcedure
		.input(Post_Donation_FeedbacksCreateArgsSchema)
		.mutation(async ({ input }) => {
			const feedback = await postDonationFeedbackController.createFeedback(input);
			return feedback;
		})
});
