import type { Donation_History, Places, Reservation_Slots, Reservations } from '@prisma/client';

export type DonationHistory = {
	donationData: Donation_History & {
		Reservation: {
			Reservation_Slot: {
				Place: Places;
			} & Reservation_Slots;
		} & Reservations;
	};
	placeData: Places;
};
