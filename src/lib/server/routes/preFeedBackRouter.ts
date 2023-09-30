import { createRouter, publicProcedure } from '../context';
import prisma from '../database';
import { z } from 'zod';

export const preFeedBackRouter = createRouter({
	checkFeedBack: publicProcedure
		.input(
			z.array(
				z.object({
					question_id: z.string(),
					choice_id: z.string()
				})
			)
		)
		.query(async ({ ctx, input }) => {
			const allQuestions = await prisma.survey_Questions.findMany({
				include: {
					Survey_Choices: true
				},
				where: {
					type: 'PRE_SURVEY'
				}
			});
			const hasAll = allQuestions.every((question) =>
				input.find((answer) => {
					return (
						answer.question_id === question.id &&
						question.Survey_Choices.find((choice) => choice.id === answer.choice_id)?.label ===
							'ใช่'
					);
				})
			);

			// The user doesn't update the database pre feedback answers right now
			return hasAll;
		})
});
