import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma, {
	Donation_HistoryWhereInputSchema,
	Donation_HistoryWhereUniqueInputSchema
} from '../database';
import { donationHistoryController } from '../database/controllers/donationHistoryController';

export const donationHistoryRouter = createRouter({
	submitBloodDonation: publicProcedure
		.input(
			z.object({
				data: z.object({
					rewarded_points: z.coerce.number(),
					blood_type: z.enum([
						'A_POSITIVE',
						'B_POSITIVE',
						'O_POSITIVE',
						'AB_POSITIVE',
						'A_NEGATIVE',
						'B_NEGATIVE',
						'O_NEGATIVE',
						'AB_NEGATIVE'
					]),
					blood_quality_status: z.string(),
					status: z.enum(['WAIT_BLOOD_QUALITY', 'SUCCESS', 'FAILED']),
					reservation_id: z.string().min(1)
				})
			})
		)
		.mutation(async ({ input }) => {
			const { data } = input;

			// Update Status to success
			const reservation = await prisma.reservations.update({
				where: {
					id: data.reservation_id
				},
				data: {
					status: 'COMPLETED'
				}
			});

			// Create new donation history
			const donationHistory = await prisma.donation_History.create({
				data: {
					blood_type: data.blood_type,
					rewarded_points: data.rewarded_points,
					status: data.status,
					blood_quality_status: data.blood_quality_status,
					Reservation: {
						connect: {
							id: reservation.id
						}
					}
				},
				include: {
					Post_Donation_Feedback: true,
					Reservation: true
				}
			});
			return donationHistory;
		}),
	getAllDonationHistoryByDonatorId: publicProcedure
		.input(
			z.object({
				donatorId: z.string().min(1)
			})
		)
		.query(async ({ input }) => {
			const { donatorId } = input;
			const allDonationHistory = await prisma.donation_History.findMany({
				where: {
					Reservation: {
						donator_id: donatorId
					}
				},
				include: {
					Post_Donation_Feedback: true,
					Reservation: {
						include: {
							Reservation_Slot: {
								include: {
									Place: true
								}
							}
						}
					}
				},
				orderBy: {
					created_at: 'desc'
				}
			});
			return allDonationHistory;
		}),
	getDonationHistory: publicProcedure
		.input(Donation_HistoryWhereUniqueInputSchema)
		.query(async ({ input }) => {
			return await donationHistoryController.getDonationHistory(input);
		}),
	getDonationHistories: publicProcedure
		.input(Donation_HistoryWhereInputSchema)
		.query(async ({ input }) => {
			return await donationHistoryController.getDonationHistories(input);
		})
});
