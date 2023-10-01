import { TRPCError } from '@trpc/server';
import { createRouter, publicProcedure } from '../context';
import {
	Donation_HistoryWhereInputSchema,
	Donation_HistoryWhereUniqueInputSchema
} from '../database';
import { donationHistoryController } from '../database/controllers/donationHistoryController';

export const donationHistoryRouter = createRouter({
	getDonationHistory: publicProcedure
		.input(Donation_HistoryWhereUniqueInputSchema)
		.query(async ({ ctx, input }) => {
			return await donationHistoryController.getDonationHistory(input);
		}),
	getDonationHistories: publicProcedure
		.input(Donation_HistoryWhereInputSchema.optional())
		.query(async ({ ctx, input }) => {
			if (input) {
				return await donationHistoryController.getDonationHistories(input);
			}

			if (ctx.userContext?.type !== 'DONATOR') {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You are not authorized to perform this action'
				});
			}

			return await donationHistoryController.getDonationHistories({
				Reservation: {
					Donator: {
						id: ctx.userContext.user.id
					}
				}
			});
		})
});
