import { DonatorsCreateWithoutMedical_AccountInputSchema as DonatorCreateInputSchema } from 'database';
import { createRouter } from '../context';
import { publicProcedure } from '../procedure';
import { prisma } from '$lib/serverUtils';
import { encodePassword } from '$lib/utils';
import { z } from 'zod';

export const donatorsRouter = createRouter({
	signUp: publicProcedure.input(DonatorCreateInputSchema).mutation(async ({ input, ctx }) => {
		// 1. Create new medical account
		const medicalAccount = await prisma.medical_Accounts.create({
			data: {
				blood_type: 'B_POSITIVE',
				account_status: 'VERIFIED',
				is_activated: true
			}
		});

		const donatorData = {
			...input,
			password: (await encodePassword(input.password)) || ''
		};

		// 2. Create new donator account
		const donator = await prisma.donators.create({
			data: {
				...donatorData,
				Medical_Account: {
					connect: {
						id: medicalAccount.id
					}
				}
			},
			include: {
				Medical_Account: true
			}
		});

		return donator;
	})
});
