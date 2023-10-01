import prisma from '..';

export const postDonationFeedbackController = {
	getPendingFeedback: async () => {
		// get latest reservation
		const unfinsihed = await prisma.donation_History.findFirst({
			where: {
				Resevation: {
					status: 'COMPLETED'
				},
				post_donation_db_id: {
					equals: null
				}
			},
			include: {
				Resevation: {
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
	}
};
