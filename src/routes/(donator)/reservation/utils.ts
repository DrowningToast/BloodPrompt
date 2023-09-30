import type { Places, Prisma } from '@prisma/client';

export interface HospitalWithReviews extends Places {
	review: {
		rating: number;
		count: number;
	};
}
