import prisma, { Survey_ChoicesSchema } from '$lib/server/database';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { preFeedbackController } from '$lib/server/database/controllers/preDonationFeedbackController';

const validatePreSurveyQuestion = z.object({
	id: z.string(),
	label: z.string(),
	is_required: z.boolean(),
	description: z.string().nullable(),
	choices: z.array(Survey_ChoicesSchema)
});

export type PreSurveyQuestion = z.infer<typeof validatePreSurveyQuestion>;

export const load = (async () => {
	const surveyQuestion = await preFeedbackController.getAllQuestions();

	const preSurveyQuestion = surveyQuestion
		.filter((question) => question.type === 'PRE_SURVEY')
		.sort((q1, q2) => q1.order - q2.order)
		.map((questions) => ({
			...questions,
			choices: questions.Survey_Choices.sort((a, b) => a.order - b.order)
		}));

	const questions: PreSurveyQuestion[] = preSurveyQuestion.map((question) => ({
		id: question.id,
		label: question.title,
		is_required: question.is_required,
		title: question.title,
		description: question.description,
		choices: question.Survey_Choices
	}));

	return {
		questions
	};
}) satisfies PageServerLoad;
