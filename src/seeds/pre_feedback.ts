import prisma from '$lib/server/database';

export const init = async () => {
	await prisma.survey_Questions.createMany({
		data: [
			{
				id: '1',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 1,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '2',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 2,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '3',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 3,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '4',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 4,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '5',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 5,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '6',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 6,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '7',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 7,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '8',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 8,
				type: 'PRE_SURVEY',
				is_required: true
			},
			{
				id: '9',
				title: 'คุณมีอาการดังต่อไปนี้หรือไม่',
				order: 9,
				type: 'PRE_SURVEY',
				is_required: true
			}
		]
	});

	await prisma.survey_Choices.createMany({
		data: [
			{
				id: '1',
				label: 'ใช่',
				survey_question_id: '1',
				order: 1
			},
			{
				id: '2',
				label: 'ไม่ใช่',
				survey_question_id: '1',
				order: 2
			},
			{
				id: '3',
				label: 'ใช่',
				survey_question_id: '2',
				order: 1
			},
			{
				id: '4',
				label: 'ไม่ใช่',
				survey_question_id: '2',
				order: 2
			},
			{
				id: '5',
				label: 'ใช่',
				survey_question_id: '3',
				order: 1
			},
			{
				id: '6',
				label: 'ไม่ใช่',
				survey_question_id: '3',
				order: 2
			},
			{
				id: '7',
				label: 'ใช่',
				survey_question_id: '4',
				order: 1
			},
			{
				id: '8',
				label: 'ไม่ใช่',
				survey_question_id: '4',
				order: 2
			},
			{
				id: '9',
				label: 'ใช่',
				survey_question_id: '5',
				order: 1
			},
			{
				id: '10',
				label: 'ไม่ใช่',
				survey_question_id: '5',
				order: 2
			},
			{
				id: '11',
				label: 'ใช่',
				survey_question_id: '6',
				order: 1
			},
			{
				id: '12',
				label: 'ไม่ใช่',
				survey_question_id: '6',
				order: 2
			},
			{
				id: '13',
				label: 'ใช่',
				survey_question_id: '7',
				order: 1
			},
			{
				id: '14',
				label: 'ไม่ใช่',
				survey_question_id: '7',
				order: 2
			},
			{
				id: '15',
				label: 'ใช่',
				survey_question_id: '8',
				order: 1
			},
			{
				id: '16',
				label: 'ไม่ใช่',
				survey_question_id: '8',
				order: 2
			},
			{
				id: '17',
				label: 'ใช่',
				survey_question_id: '9',
				order: 1
			},
			{
				id: '18',
				label: 'ไม่ใช่',
				survey_question_id: '9',
				order: 2
			}
		]
	});
};
