import prisma, { Prisma } from '../ORM';

export const placeController = {
	getAll: async () => {
		const places = await prisma.places.findMany({
			where: {
				deleted_at: null
			}
		});
		return places;
	},
	get: async (args: Prisma.PlacesFindUniqueArgs) => {
		const place = await prisma.places.findUnique(args);
		return place;
	},
	getAllWithReviews: async () => {
		const [hospital, reviews] = await Promise.all([
			prisma.places.findMany({
				where: {
					deleted_at: null
				}
			}),
			prisma.place_Review_History.groupBy({
				by: ['place_id'],
				_sum: {
					rating: true
				},
				_count: {
					id: true
				}
			})
		]);

		return {
			hospital,
			reviews
		};
	}
};
