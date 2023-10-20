import { createRouter, publicProcedure } from '../context';
import { z } from 'zod';
import prisma, {
	Place_Review_HistoryCreateArgsSchema,
	Place_Review_HistoryCreateInputSchema,
	PlacesUpdateInputSchema
} from '../database';
import { PlacesCreateInputSchema } from '../database';
import { placeReviewHistoryController } from '../database/controllers/placeReviewHistoryController';
import { placeController } from '../database/controllers/placeController';

export const placesRouter = createRouter({
	findAll: publicProcedure.query(async () => {
		const places = await placeController.getAll();
		return places;
	}),
	findById: publicProcedure.input(z.object({ placeId: z.string() })).query(async ({ input }) => {
		const { placeId } = input;
		const place = await placeController.get({
			where: {
				id: placeId
			},
			include: {
				Medical_Staff: true
			}
		});
		return place;
	}),
	create: publicProcedure.input(PlacesCreateInputSchema).mutation(async ({ input }) => {
		const place = await prisma.places.create({
			data: {
				...input
			}
		});
		return place;
	}),
	update: publicProcedure
		.input(
			z.object({
				data: PlacesUpdateInputSchema,
				placeId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { data, placeId } = input;
			const place = await prisma.places.update({
				where: {
					id: placeId
				},
				data: {
					...data
				}
			});
			return place;
		}),
	delete: publicProcedure.input(z.object({ placeId: z.string() })).mutation(async ({ input }) => {
		const { placeId } = input;
		const place = await prisma.places.update({
			where: {
				id: placeId
			},
			data: {
				deleted_at: new Date()
			}
		});
		await prisma.medical_Staff.deleteMany({
			where: {
				place_id: place.id
			}
		});
		return place;
	}),
	createReview: publicProcedure
		.input(Place_Review_HistoryCreateInputSchema)
		.mutation(async ({ input }) => {
			const review = await placeReviewHistoryController.createReview(input);
			return review;
		})
});
