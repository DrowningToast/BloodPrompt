import { createRouter, publicProcedure } from '../context';
import { z } from 'zod';
import prisma from '../database';

export const specialEventRouter = createRouter({
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
				description: z.string().min(1),
				img_src: z.string().optional()
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { sessionToken } = ctx;
			const session = await prisma.session.findUnique({
				where: {
					session_token: sessionToken
				},
				include: {
					Medical_Staff: true
				}
			});
			const specialEvent = await prisma.special_Events.create({
				data: {
					...input,
					Place: {
						connect: {
							id: session?.Medical_Staff?.place_id || ''
						}
					}
				}
			});
			return specialEvent;
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string().min(1),
				name: z.string(),
				description: z.string(),
				img_src: z.string().optional()
			})
		)
		.mutation(async ({ input }) => {
			await prisma.special_Events.update({
				where: {
					id: input.id
				},
				data: {
					name: input.name,
					description: input.description,
					img_src: input.img_src
				}
			});
		}),
	delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
		const special_Events = await prisma.special_Events.delete({
			where: {
				id: input
			}
		});
		return special_Events;
	}),
	getEvent: publicProcedure.query(async () => {
		const sp_event = await prisma.special_Events.findFirst();
		return sp_event;
	}),

	isEvent: publicProcedure.query(async ({ ctx }) => {
		const sessionToken = ctx.sessionToken;
		const session = await prisma.session.findUnique({
			where: {
				session_token: sessionToken
			},
			include: {
				Medical_Staff: true
			}
		});
		const onEventAvailable = await prisma.special_Events.findFirst({
			where: { place_id: session?.Medical_Staff?.place_id }
		});
		return onEventAvailable === null ? false : true;
	})
});
