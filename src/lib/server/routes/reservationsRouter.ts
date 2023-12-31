import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma, { type PrismaPromise, type Pre_Feedback_Answers } from '../database';

export const reservationsRouter = createRouter({
	changeReservationSlot: publicProcedure
		.input(
			z.object({
				data: z.object({
					reserve_time: z.coerce.date(),
					reserve_date: z.coerce.date()
				}),
				reservationId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { data, reservationId } = input;

			// Delete current reservation slot
			const currentReservation = await prisma.reservations.findUnique({
				where: {
					id: reservationId
				},
				include: {
					Reservation_Slot: true
				}
			});
			await prisma.reservation_Slots.updateMany({
				where: {
					id: currentReservation?.reservation_slot_id
				},
				data: {
					cancelled_at: new Date(new Date().getTime())
				}
			});

			// Create new reservation slot and add to reservation data
			const reservation = await prisma.reservations.update({
				where: {
					id: reservationId
				},
				data: {
					Reservation_Slot: {
						create: {
							reserve_date: data.reserve_date,
							reserve_time: data.reserve_time,
							Place: {
								connect: {
									id: currentReservation?.Reservation_Slot.id
								}
							}
						}
					}
				}
			});

			return reservation;
		}),
	findAll: publicProcedure.query(async () => {
		const reservations = await prisma.reservations.findMany({
			include: {
				Donation_History: true,
				Donator: {
					include: {
						Medical_Account: true
					}
				},
				Pre_Donation_Feedbacks: true,
				Reservation_Slot: true
			},
			orderBy: {
				created_at: 'desc'
			}
		});
		return reservations;
	}),
	findById: publicProcedure
		.input(
			z.object({
				reservationId: z.string()
			})
		)
		.query(async ({ input }) => {
			const { reservationId } = input;
			const reservation = await prisma.reservations.findFirst({
				where: {
					id: reservationId
				}
			});
			return reservation;
		}),
	cancelReservation: publicProcedure
		.input(
			z.object({
				reservationId: z.string()
			})
		)
		.query(async ({ input }) => {
			const { reservationId } = input;

			const reservation = await prisma.reservations.update({
				where: {
					id: reservationId
				},
				data: {
					status: 'CANCELLED',
					cancelled_at: new Date(new Date().getTime())
				},
				include: {
					Reservation_Slot: true,
					Donator: true,
					Donation_History: true,
					Pre_Donation_Feedbacks: true
				}
			});

			prisma.reservation_Slots.delete({
				where: {
					id: reservation.reservation_slot_id
				}
			});
			return { reservation };
		})
});
