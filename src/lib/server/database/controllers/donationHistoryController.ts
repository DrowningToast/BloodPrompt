import type { Prisma } from '@prisma/client';
import prisma from '..';

export const donationHistoryController = {
	getDonationHistory: async (filter: Prisma.Donation_HistoryWhereUniqueInput) => {
		const res = await prisma.donation_History.findUnique({
			where: filter,
			include: {
				Reservation: {
					include: {
						Reservation_Slot: {
							include: {
								Place: true
							}
						},
						Donator: true
					}
				}
			}
		});
		return res;
	},
	getDonationHistories: async (filter: Prisma.Donation_HistoryWhereInput) => {
		return await prisma.donation_History.findMany({
			where: filter,
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
	}
};
