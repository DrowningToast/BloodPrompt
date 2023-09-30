import { z } from 'zod';
import { publicProcedure, createRouter } from './context';
import { donatorsRouter } from './routes/donatorsRouter';
import { authRouter } from './routes/authRouter';
import { placesRouter } from './routes/placesRouter';
import { medicalStaffRouter } from './routes/medicalStaffRouter';
import { preFeedBackRouter } from './routes/preFeedBackRouter';
import { reservationSlotsRouter } from './routes/reservationSlotsRouter';

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
	preFeedback: preFeedBackRouter,
	reservation: reservationSlotsRouter
});

export type AppRouter = typeof appRouter;
