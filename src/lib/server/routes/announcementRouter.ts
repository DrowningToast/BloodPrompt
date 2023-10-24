import { z } from 'zod';
import { createRouter, publicProcedure } from '../context';
import prisma, {
	AnnouncementsWhereInputSchema,
	AnnouncementsWhereUniqueInputSchema,
	BloodType,
	type PostTypeType
} from '../database';
import { announcementsController } from '../database/controllers/announcementController';
import { medicalStaffProcedure } from '../procedures';
import { TRPCError } from '@trpc/server';

export const announcementsRouter = createRouter({
	getAnnouncements: publicProcedure
		.input(AnnouncementsWhereInputSchema.optional())
		.query(async ({ input }) => {
			return await announcementsController.getAnnouncements(input);
		}),

	getAnnouncement: publicProcedure
		.input(AnnouncementsWhereUniqueInputSchema)
		.query(async ({ input }) => {
			return await announcementsController.getAnnouncement(input);
		}),
	create: publicProcedure
		.input(
			z.object({
				data: z.object({
					blood_type: z.string().optional(),
					post_type: z.string(),
					title: z.string(),
					content: z.string(),
					image_src: z.string().optional()
				}),
				placeId: z.string().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const { data, placeId } = input;
			const announcement = await prisma.announcements.create({
				data: {
					content: data.content,
					post_type: data.post_type as PostTypeType,
					title: data.title,
					blood_type: data.blood_type as BloodType,
					image_src: data.image_src,
					place_id: placeId,
					created_at: new Date(new Date().getTime())
				},
				include: {
					Place: true
				}
			});
			return announcement;
		}),
	update: medicalStaffProcedure
		.input(
			z.object({
				data: z.object({
					blood_type: z.string().optional(),
					post_type: z.string().optional(),
					title: z.string().optional(),
					content: z.string().optional(),
					image_src: z.string().optional(),
					placeId: z.string().optional()
				}),
				announcementId: z.string().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const { data, announcementId } = input;

			try {
				const announcement = await announcementsController.update({
					filter: {
						id: announcementId
					},
					data: {
						content: data.content,
						post_type: data.post_type as PostTypeType,
						title: data.title,
						blood_type: data.blood_type as BloodType,
						image_src: data.image_src,
						created_at: new Date(new Date().getTime())
					},
					include: {
						Place: true
					}
				});

				return announcement;
			} catch (e) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					cause: e
				});
			}
		}),
	getById: publicProcedure
		.input(
			z.object({
				announcementId: z.string().min(1)
			})
		)
		.query(async ({ input }) => {
			const { announcementId } = input;
			const announcement = await prisma.announcements.findUnique({
				where: {
					id: announcementId
				},
				include: {
					Place: true
				}
			});
			return announcement;
		}),
	delete: publicProcedure
		.input(
			z.object({
				announcementId: z.string().min(1)
			})
		)
		.query(async ({ input }) => {
			const { announcementId } = input;
			const announcement = await prisma.announcements.delete({
				where: {
					id: announcementId
				},
				include: {
					Place: true
				}
			});
			return announcement;
		}),
	getAll: publicProcedure.query(async () => {
		const announcements = await prisma.announcements.findMany({
			where: {
				deleted_at: {
					equals: null
				}
			},
			orderBy: {
				created_at: 'desc'
			},
			include: {
				Place: true
			}
		});
		return announcements;
	})
});
