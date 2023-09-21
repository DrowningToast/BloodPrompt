import { TRPCError } from '@trpc/server';
import { t } from './context';

export const publicProcedure = t.procedure;

/**
 * Ensure the user is authenticated
 */
const enforcedAuth = t.middleware(({ ctx, next }) => {
	const { user } = ctx;

	if (!user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

const enforcedDonator = t.middleware(({ ctx, next }) => {
	if (!ctx.session?.donator_id) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

const enforcedMedicalStaff = t.middleware(({ ctx, next }) => {
	if (!ctx.session?.medical_staff_id) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

const enforcedModerator = t.middleware(({ ctx, next }) => {
	if (!ctx.session?.moderator_id) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx
	});
});

export const protectedProcedure = t.procedure.use(enforcedAuth);
export const donatorProcedure = t.procedure.use(enforcedDonator);
export const medicalStaffProcedure = t.procedure.use(enforcedMedicalStaff);
export const moderatorProcedure = t.procedure.use(enforcedModerator);
