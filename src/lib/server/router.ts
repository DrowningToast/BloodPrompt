import { z } from 'zod';
import { publicProcedure, createRouter } from './context';
import { donatorsRouter } from './routes/donatorsRouter';

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
	donators: donatorsRouter
});

export type AppRouter = typeof appRouter;
