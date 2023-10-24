import { TRPCError } from '@trpc/server';
import prisma, { Prisma, type Reservations } from '..';
import {
	checkEquivalenceDate,
	get24HoursTimeString
} from '../../../../routes/(donator)/reservation/[placeId]/date/utils';
import {
	DEFAULT_TIME_SLOT,
	getDatesFrom,
	MAX_SEAT_PER_TIME_SLOT,
	type HospitalAvailability
} from '../../../../routes/(donator)/reservation/[placeId]/utils';
import { placeController } from './placeController';
import { sessionController } from './sessionController';

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
		placeFilter: Prisma.PlacesWhereUniqueInput,
		preFeedback: Prisma.Pre_Donation_FeedbacksCreateInput,
		timeSlot: Date
	): Promise<Reservations> => {
		// validate the place id
		const place = await placeController.get({
			where: placeFilter
		});
		if (!placeFilter) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Place not found'
			});
		}

		// validate the time slot
		const validateSlot = DEFAULT_TIME_SLOT.find((slot) => {
			return slot.time === get24HoursTimeString(timeSlot);
		});
		if (!validateSlot) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Time slot not found'
			});
		}

		// check if the slot is still free or not
		const alreadyReserved = await reservationController.getReservationSlots({
			Place: {
				id: place?.id
			},
			reserve_date: timeSlot
		});

		if (alreadyReserved.length >= MAX_SEAT_PER_TIME_SLOT) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Time slot is fully booked'
			});
		}

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
							connect: placeFilter
						}
					}
				},
				Pre_Donation_Feedbacks: {
					create: preFeedback
				}
			}
		});
	},

	getAvailbleTimeSlots: async (placeId: string) => {
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
	},
	getReservation: async (reservation: Prisma.ReservationsWhereUniqueInput) => {
		return await prisma.reservations.findUnique({
			where: reservation,
			include: {
				Donator: true,
				Reservation_Slot: {
					include: {
						Place: true
					}
				}
			}
		});
	},
	getReservations: async (reservation: Prisma.ReservationsWhereInput) => {
		return await prisma.reservations.findMany({
			where: reservation,
			include: {
				Donator: true,
				Reservation_Slot: {
					include: {
						Place: true
					}
				}
			}
		});
	},
	getReservationSlots: async (reservationSlot: Prisma.Reservation_SlotsWhereInput) => {
		return await prisma.reservation_Slots.findMany({
			where: reservationSlot,
			include: {
				Place: true
			}
		});
	},
	getAllReservations: async (donator: Prisma.DonatorsWhereInput) => {
		return await prisma.reservations.findMany({
			where: {
				Donator: donator
			},
			include: {
				Donator: true,
				Reservation_Slot: {
					include: {
						Place: true
					}
				}
			},
			orderBy: {
				created_at: 'desc'
			}
		});
	},
	completeReservation: async (reservationId: string) => {
		const reservation = await prisma.reservations.update({
			where: {
				id: reservationId
			},
			data: {
				status: 'COMPLETED'
			}
		});

		return reservation;
	}
};
export default reservationController;
