import prisma, { Prisma } from '..';

export const postDonationFeedbackController = {
	getPendingFeedback: async (donator: Prisma.DonatorsWhereUniqueInput) => {
		// get latest reservation
		const unfinsihed = await prisma.donation_History.findFirst({
			where: {
				Reservation: {
					status: 'COMPLETED',
					Donator: donator
				},
				post_donation_db_id: {
					equals: null
				}
			},
			include: {
				Reservation: {
					include: {
						Reservation_Slot: {
							include: {
								Place: true
							}
						}
					}
				}
			}
		});
		return unfinsihed;
	},
	getPostSurveyQuestions: async () => {
		const questions = await prisma.survey_Questions.findMany({
			where: {
				type: 'POST_SURVEY'
			},
			include: {
				Survey_Choices: true
			},
			orderBy: {
				order: 'asc'
			}
		});
		return questions;
	},
	createFeedback: async (feedback: Prisma.Post_Donation_FeedbacksCreateArgs) => {
		return await prisma.post_Donation_Feedbacks.create({
			...feedback
		});
	}
};
