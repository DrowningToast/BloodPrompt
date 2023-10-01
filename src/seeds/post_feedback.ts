import prisma from '$lib/server/database';

export const seed_postFeedback = async () => {
	await prisma.survey_Questions.createMany({
		data: [
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 1,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 2,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 3,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 4,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 5,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 6,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่'
			}
		]
	});

	await prisma.survey_Choices.createMany({
		data: [
			{
				label: 'ใช่',
				order: 1,
				survey_question_id: '1'
			},
			{
				label: 'ไม่ใช่',
				order: 2,
				survey_question_id: '1'
			},
			{
				label: 'ใช่',
				order: 1,
				survey_question_id: '2'
			},
			{
				label: 'ไม่ใช่',
				order: 2,
				survey_question_id: '2'
			},
			{
				label: 'ใช่',
				order: 1,
				survey_question_id: '3'
			},
			{
				label: 'ไม่ใช่',
				order: 2,
				survey_question_id: '3'
			},
			{
				label: 'ใช่',
				order: 1,
				survey_question_id: '4'
			},
			{
				label: 'ไม่ใช่',
				order: 2,
				survey_question_id: '4'
			},
			{
				label: 'ใช่',
				order: 1,
				survey_question_id: '5'
			},
			{
				label: 'ไม่ใช่',
				order: 2,
				survey_question_id: '5'
			},
			{
				label: 'ใช่',
				order: 1,
				survey_question_id: '6'
			},
			{
				label: 'ไม่ใช่',
				order: 2,
				survey_question_id: '6'
			}
		]
	});
};
