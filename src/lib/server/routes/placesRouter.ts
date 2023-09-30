import { createRouter, publicProcedure } from '../context';
import { z } from 'zod';
import prisma, { PlacesUpdateInputSchema } from '../database';
import { PlacesCreateInputSchema } from '../database';

export const placesRouter = createRouter({
	findAll: publicProcedure.query(async () => {
		const places = await prisma.places.findMany({
			where: {
				deleted_at: {
					equals: null
				}
			}
		});
		return places;
	}),
	findById: publicProcedure.input(z.object({ placeId: z.string() })).query(async ({ input }) => {
		const { placeId } = input;
		const place = await prisma.places.findUnique({
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
	})
});
