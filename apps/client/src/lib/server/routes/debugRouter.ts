import { createRouter } from '../context';
import { protectedProcedure } from '../procedure';

export const debugRouter = createRouter({
	debug: protectedProcedure.query(async ({ ctx }) => {
		return ctx;
	})
});
