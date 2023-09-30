import { createRouter, publicProcedure } from "../context";
import {z} from 'zod';
import prisma, { Special_EventsUncheckedCreateInputSchema } from "../database";
import { Special_EventsCreateInputSchema } from '../database'

export const specialEventRouter = createRouter({
    findAll: publicProcedure.query(async () => {
		const special_Event = await prisma.special_Events.findMany();
		return special_Event;
	}),
	findById: publicProcedure.input(z.object({ specialEventId: z.string() })).query(async ({ input }) => {
		const { specialEventId } = input;
		const special_Event = await prisma.special_Events.findUnique({
			where: {
				id: specialEventId
			}
		});
		return special_Event;
	}),
    create: publicProcedure.input(Special_EventsCreateInputSchema).mutation(async({input})=>{
        const specialEvent = await prisma.special_Events.create({
            data:{
                ...input
            }
        });
        return specialEvent;
    }),
    update: publicProcedure
    .input(
        z.object({
            data: Special_EventsUncheckedCreateInputSchema,
            specialEventId: z.string()
        })
    )
    .mutation(async({input})=>{
        const {data, specialEventId} = input;
        const special_Event = await prisma.special_Events.update({
            where:{
                id:specialEventId
            },
            data:{
                ...data
            }
        });
        return special_Event;
    }),
    delete: publicProcedure
    .input(z.object({ specialEventId: z.string() })).mutation(async({ input }) => {
        const {specialEventId} = input;
        const special_Event = await prisma.special_Events.update({
            where:{
                id: specialEventId
            },
            data:{
                deleted_at:new Date()
            }
        });
        return special_Event;
    })
});