import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma from '../database';

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
		})
});
