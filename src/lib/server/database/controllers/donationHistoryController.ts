import type { Prisma } from '@prisma/client';
import prisma from '..';

export const donationHistoryController = {
	create: async (args: Prisma.Donation_HistoryCreateArgs) => {
		const donationHistory = await prisma.donation_History.create(args);
		return donationHistory;
	},
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
