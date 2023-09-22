import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { injectSessionMiddleware } from '$lib/middlewares/injectSessionMiddleware';

export const handle: Handle = sequence();
