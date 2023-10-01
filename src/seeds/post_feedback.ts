import prisma from '$lib/server/database';

export const seed_postFeedback = async () => {
	await prisma.survey_Questions.createMany({
		data: [
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 1,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่',
				id: '101'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 2,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่',
				id: '102'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 3,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่',
				id: '103'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 4,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่',
				id: '104'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 5,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่',
				id: '105'
			},
			{
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 6,
				type: 'POST_SURVEY',
				is_required: true,
				description: 'โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่',
				id: '106'
			}
		]
	});

	await prisma.survey_Choices.createMany({
		data: [
			{
				id: '101',
				survey_question_id: '101',
				label: 'ใช่',
				order: 1
			},
			{
				id: '102',
				survey_question_id: '101',
				label: 'ไม่ใช่',
				order: 2
			},
			{
				id: '103',
				survey_question_id: '102',
				label: 'ใช่',
				order: 1
			},
			{
				id: '104',
				survey_question_id: '102',
				label: 'ไม่ใช่',
				order: 2
			},
			{
				id: '105',
				survey_question_id: '103',
				label: 'ใช่',
				order: 1
			},
			{
				id: '106',
				survey_question_id: '103',
				label: 'ไม่ใช่',
				order: 2
			},
			{
				id: '107',
				survey_question_id: '104',
				label: 'ใช่',
				order: 1
			},
			{
				id: '108',
				survey_question_id: '104',
				label: 'ไม่ใช่',
				order: 2
			},
			{
				id: '109',
				survey_question_id: '105',
				label: 'ใช่',
				order: 1
			},
			{
				id: '110',
				survey_question_id: '105',
				label: 'ไม่ใช่',
				order: 2
			},
			{
				id: '111',
				survey_question_id: '106',
				label: 'ใช่',
				order: 1
			},
			{
				id: '112',
				survey_question_id: '106',
				label: 'ไม่ใช่',
				order: 2
			}
		]
	});
};
