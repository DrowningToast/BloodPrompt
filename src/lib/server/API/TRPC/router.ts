import { z } from 'zod';
import { publicProcedure, createRouter } from './context';
import { donatorsRouter } from '../Routers/donatorsRouter';
import { authRouter } from '../Routers/authRouter';
import { placesRouter } from '../Routers/placesRouter';
import { medicalStaffRouter } from '../Routers/medicalStaffRouter';
import { specialEventRouter } from '../Routers/specialEventRouter';
import { preFeedBackRouter } from '../Routers/preFeedBackRouter';
import { rewardRouter } from '../Routers/rewardRouter';
import { moderatorRoutes } from '../Routers/moderatorsRoutes';
import { announcementsRouter } from '../Routers/announcementRouter';
import { postFeedbackRouter } from '../Routers/postFeedbackRouter';
import { donationHistoryRouter } from '../Routers/donationHistory';
import { reservationsRouter } from '../Routers/reservationsRouter';

export const appRouter = createRouter({
	greet: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.query(({ ctx, input }) => {
			return `Hello ${input.name}`;
		}),
	donators: donatorsRouter,
	auth: authRouter,
	places: placesRouter,
	medicalStaff: medicalStaffRouter,
	specialEvent: specialEventRouter,
	preFeedback: preFeedBackRouter,
	postFeedback: postFeedbackRouter,
	reservation: reservationsRouter,
	moderator: moderatorRoutes,
	reward: rewardRouter,
	announcement: announcementsRouter,
	donationHistory: donationHistoryRouter
});

export type AppRouter = typeof appRouter;
