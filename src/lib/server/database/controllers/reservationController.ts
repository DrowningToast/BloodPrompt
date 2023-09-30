import prisma, { Prisma } from '..';
import { checkEquivalenceDate } from '../../../../routes/(donator)/reservation/[placeId]/date/utils';
import {
	DEFAULT_TIME_SLOT,
	getDatesFrom,
	MAX_SEAT_PER_TIME_SLOT,
	type HospitalAvailability
} from '../../../../routes/(donator)/reservation/[placeId]/utils';

const reservationController = {
	getLastReservation: async () => {
		return await prisma.reservation_Slots.findMany({
			take: 1,
			orderBy: {
				reserve_date: 'desc'
			}
		});
	},
	/**
	 * Create a reservation, **doesn't check for business rules validation**
	 * @returns
	 */
	createReservation: async (
		donator: Prisma.DonatorsWhereUniqueInput,
		place: Prisma.PlacesWhereUniqueInput,
		timeSlot: Date
	) => {
		return await prisma.reservations.create({
			data: {
				status: 'BOOKED',
				Donator: {
					connect: donator
				},
				Reservation_Slot: {
					create: {
						reserve_date: timeSlot,
						reserve_time: timeSlot,
						Place: {
							connect: place
						}
					}
				}
			}
		});
	},
	getAvailbleTimeSlots: async (placeId: string, date: Date) => {
		// validate place id
		const place = await prisma.places.findUnique({
			where: {
				id: placeId
			}
		});

		if (!place) {
			throw new Error('Place not found');
		}

		const alreadyReserved = await prisma.reservation_Slots.findMany({
			where: {
				Place: {
					id: placeId
				},
				reserve_date: {
					gt: new Date()
				}
			}
		});

		const availableDates = getDatesFrom(new Date(), 14).map((date) => ({
			date,
			periods: DEFAULT_TIME_SLOT.map((time) => ({
				...time,
				available:
					alreadyReserved.filter(
						(reservation) =>
							checkEquivalenceDate(reservation.reserve_date, date) &&
							reservation.reserve_time.toTimeString().split(' ')[0] === time.time
					).length < MAX_SEAT_PER_TIME_SLOT && time.available
			}))
		}));

		return availableDates;
	}
};
export default reservationController;
