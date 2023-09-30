import { createRouter, publicProcedure } from '../context';
import { AnnouncementsWhereInputSchema } from '../database';
import { announcementsController } from '../database/controllers/announcementController';

export const announcementsRouter = createRouter({
	getAnnouncements: publicProcedure
		.input(AnnouncementsWhereInputSchema.optional())
		.query(async ({ ctx, input }) => {
			return await announcementsController.getAnnouncements(input);
		})
});
