import { createRouter, publicProcedure } from '../TRPC/context';
import prisma from '../../ORM';
import { z } from 'zod';
import { preFeedbackController } from '../../DatabaseController/preDonationFeedbackController';

export const preFeedbackSurveySelectionSchema = z.array(
	z.object({
		question_id: z.string(),
		choice_id: z.string()
	})
);

export type PreFeedbackSurveySelectionType = z.infer<typeof preFeedbackSurveySelectionSchema>;

export const preFeedBackRouter = createRouter({
	checkFeedBack: publicProcedure
		.input(preFeedbackSurveySelectionSchema)
		.query(async ({ input }) => {
			const hasAll = await preFeedbackController.checkFeedback(input);
			// The user doesn't update the database pre feedback answers right now
			return hasAll;
		})
});
