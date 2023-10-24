import { TRPCError } from '@trpc/server';
import { t } from '../context';

export const enforceDonator = t.middleware(({ ctx, next }) => {
	if (ctx.userContext?.type !== 'DONATOR') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Insufficient permissions'
		});
	}

	return next({
		ctx
	});
});

export const enforceMedicalStaff = t.middleware(({ ctx, next }) => {
	if (ctx.userContext?.type !== 'MEDICAL_STAFF') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Insufficient permissions'
		});
	}

	return next({
		ctx
	});
});

export const enforceModerator = t.middleware(({ ctx, next }) => {
	if (ctx.userContext?.type !== 'MODERATOR') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Insufficient permissions'
		});
	}

	return next({
		ctx
	});
});

export const enforceAuthenticated = t.middleware(({ ctx, next }) => {
	if (!ctx.userContext || !ctx.sessionToken || !ctx.session) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Insufficient permissions'
		});
	}

	return next({
		ctx
	});
});
