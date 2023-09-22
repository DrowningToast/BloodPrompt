// src/lib/server/router.ts
import { z } from 'zod';
import { createRouter } from './context';
import { publicProcedure } from './procedure';
import { debugRouter } from './routes/debugRouter';
import { authRouter } from './routes/authRouter';
import { donatorsRouter } from './routes/donatorsRouter';

export const appRouter = createRouter({
	greet: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.query(({ ctx, input }) => {
			return `Hello ${input.name}`;
		}),
	debug: debugRouter,
	auth: authRouter,
	donators: donatorsRouter
});

export type AppRouter = typeof appRouter;
