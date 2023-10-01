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
		})
});
