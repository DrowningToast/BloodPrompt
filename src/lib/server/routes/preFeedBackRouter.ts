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

			console.log(input);

			allQuestions.forEach((question, index) => {
				const a = question.Survey_Choices.find((q) => q.id === input[index].choice_id);
				if (a?.label === 'ไม่ใช่') {
					hasAll = false;
				}
			});

			console.log(hasAll);

			// const hasAll = allQuestions.every((question, index) => {
			// 	console.log(question.Survey_Choices.find((c) => c.id === input[index].choice_id));
			// 	input.find((answer) => {
			// 		return (
			// 			answer.question_id === question.id &&
			// 			question.Survey_Choices.find((choice) => choice.id === answer.choice_id)?.label ===
			// 				'ใช่'
			// 		);
			// 	});
			// });

			// The user doesn't update the database pre feedback answers right now
			return hasAll;
		})
});
