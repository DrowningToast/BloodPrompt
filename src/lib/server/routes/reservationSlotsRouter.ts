import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma, {
	DonatorsWhereInputSchema,
	type Donators,
	DonatorsWhereUniqueInputSchema
} from '../database';
import { TRPCError } from '@trpc/server';
import {
	DEFAULT_TIME_SLOT,
	MAX_SEAT_PER_TIME_SLOT
} from '../../../routes/(donator)/reservation/[placeId]/utils';
import { get24HoursTimeString } from '../../../routes/(donator)/reservation/[placeId]/date/utils';
import reservationController from '../database/controllers/reservationController';
import { validatePreDonationFeedback } from '$lib/stores/preFeedback';

export const reservationSlotsRouter = createRouter({
	findByDate: publicProcedure
		.input(
			z.object({
				date: z.coerce.date()
			})
		)
		.mutation(async ({ input }) => {
			const { date } = input;
			const reservationSlots = await prisma.reservation_Slots.findMany({
				where: {
					reserve_date: {
						equals: date
					}
				}
			});
			return reservationSlots;
		}),
	reserve: publicProcedure
		.input(
			z.object({
				placeId: z.string(),
				timeSlotInMillisecond: z.number(),
				preFeedback: validatePreDonationFeedback
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { placeId, timeSlotInMillisecond } = input;
			const { sessionToken } = ctx;

			const session = await prisma.session.findUnique({
				where: {
					session_token: sessionToken
				}
			});

			const timeSlot = new Date(timeSlotInMillisecond);

			// validate the place id
			const place = await prisma.places.findUnique({
				where: {
					id: placeId
				}
			});
			if (!place) {
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
			const alreadyReserved = await prisma.reservation_Slots.findMany({
				where: {
					Place: {
						id: placeId
					},
					reserve_date: timeSlot
				}
			});
			if (alreadyReserved.length >= MAX_SEAT_PER_TIME_SLOT) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Time slot is fully booked'
				});
			}

			const reservation = await reservationController.createReservation(
				{
					id: session?.donator_id!
				},
				{
					id: placeId
				},
				{
					Pre_Feedback_Answers: {
						createMany: {
							data: input.preFeedback.Pre_Feedback_Answers
						}
					}
				},
				timeSlot
			);
			return reservation;
		}),
	getLog: publicProcedure
		.input(DonatorsWhereUniqueInputSchema.optional())
		.query(async ({ ctx, input }) => {
			let donator: Donators | undefined | null;
			if (input) {
				donator = await prisma.donators.findUnique({
					where: input
				});
			} else {
				const { sessionToken } = ctx;
				const session = await prisma.session.findUnique({
					where: {
						session_token: sessionToken
					}
				});
				donator = await prisma.donators.findUnique({
					where: {
						id: session?.donator_id!
					}
				});
			}
			if (!donator) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Donator not found'
				});
			}
			const reservations = await reservationController.getAllReservations({
				id: donator?.id
			});

			return reservations;
		})
});
