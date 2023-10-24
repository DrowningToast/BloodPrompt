import type { Prisma, Survey_Choices, Survey_Questions } from '@prisma/client';
import prisma from '../ORM';
import type { PreFeedbackSurveySelectionType } from '$lib/server/API/Routers/preFeedBackRouter';

export const preFeedbackController = {
	createFeedback: async (feedback: Prisma.Pre_Donation_FeedbacksCreateArgs) => {
		return await prisma.pre_Donation_Feedbacks.create({
			data: feedback
		});
	},
	getAllQuestions: async () => {
		return await prisma.survey_Questions.findMany({
			include: {
				Survey_Choices: true
			},
			where: {
				type: 'PRE_SURVEY'
			}
		});
	},
	checkFeedback: async (args: PreFeedbackSurveySelectionType) => {
		const questions = await preFeedbackController.getAllQuestions();

		let hasAll: boolean = true;

		questions.forEach((question, index) => {
			const a = question.Survey_Choices.find((q) => q.id === args[index].choice_id);
			if (a?.label === 'ไม่ใช่') {
				hasAll = false;
			}
		});

		return hasAll;
	}
};
