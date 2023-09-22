import { z } from 'zod';
import { publicProcedure, router } from './context';

export const appRouter = router({
	greet: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.query(({ ctx, input }) => {
			return `Hello ${input.name}`;
		})
});

export type AppRouter = typeof appRouter;
