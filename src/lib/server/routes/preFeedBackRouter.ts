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
		.query(async ({ input }) => {
			const allQuestions = await prisma.survey_Questions.findMany({
				include: {
					Survey_Choices: true
				},
				where: {
					type: 'PRE_SURVEY'
				}
			});

			let hasAll: boolean = true;

			allQuestions.forEach((question, index) => {
				const a = question.Survey_Choices.find((q) => q.id === input[index].choice_id);
				if (a?.label === 'ไม่ใช่') {
					hasAll = false;
				}
			});

			// The user doesn't update the database pre feedback answers right now
			return hasAll;
		})
});
