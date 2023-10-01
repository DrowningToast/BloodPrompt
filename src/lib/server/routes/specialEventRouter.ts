import { createRouter, publicProcedure } from '../context';
import { z } from 'zod';
import prisma, { Special_EventsUpdateInputSchema, Special_EventsCreateInputSchema, Special_EventsCreateWithoutPlaceInputSchema } from '../database';

export const specialEventRouter = createRouter({
	create: publicProcedure
    .input(
        z.object({
            name:z.string(),
            description: z.string()
    }))
    .mutation(async ({ input,ctx }) => {
        const sessionToken = ctx.sessionToken;
        const session = await prisma.session.findUnique({
            where:{
                session_token: sessionToken
            },
            include:{
                Medical_Staff:true
            }
        });
        const specialEvent = await prisma.special_Events.create({
            data:{
                ...input,
                place_id:session?.Medical_Staff?.place_id || ''
            }
        });
        return specialEvent;
	}),
	update: publicProcedure
		.input(
			z.object({
				name:z.string(),
                description: z.string(),
			})
		)
		.mutation(async ({ input,ctx }) => {
        const sessionToken = ctx.sessionToken;
        const session = await prisma.session.findUnique({
            where:{
                session_token: sessionToken
            },
            include:{
                Medical_Staff:true
            }
        });
        // const placeId = session?.Medical_Staff?.place_id || '';
		// 	const special_Events = await prisma.special_Events.update({
		// 		// where: {
		// 		// 	place_id:placeId
		// 		// },
		// 		data: {
		// 			...input
		// 		}
		// 	});
		// 	return special_Events;
		}),
	delete: publicProcedure.input(z.object({ specialEventId: z.string() })).mutation(async ({ input, ctx }) => {
		const { specialEventId } = input;

		const special_Events = await prisma.special_Events.delete({
			where: {
				id: specialEventId
			},
		});
		return special_Events;
	}),
    getEvent: publicProcedure.query(async()=>{
        const sp_event = await prisma.special_Events.findFirst();
        return sp_event;
    })

});
