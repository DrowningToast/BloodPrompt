import { createRouter } from '../context';
import { publicProcedure } from '../context';
import { encodePassword } from '$lib/utils';
import { donatorsController } from '../database/controllers/donatorsController';
import { signUpRegister } from '$lib/zod/donatorRegister';
import { sessionController } from '../database/controllers/sessionController';
import { z } from 'zod';
import prisma from '../database';

export const donatorsRouter = createRouter({
	signUp: publicProcedure.input(signUpRegister).mutation(async ({ input, ctx }) => {
		const { donatorData, medicalAccountData } = input;

		const encodedPassword = encodePassword(donatorData.password);

		const donator = {
			image_src: donatorData.image_src,
			first_name: donatorData.first_name,
			last_name: donatorData.last_name,
			phone_number: donatorData.phone_number,
			gender: donatorData.gender,
			dob: donatorData.dob,
			address: donatorData.address,
			email: donatorData.email,
			password: encodedPassword,
			reward_point: 0
		};

		const medical_account = {
			blood_type: medicalAccountData.blood_type || 'A_POSITIVE',
			account_status: medicalAccountData.account_status || 'UNVERIFIED'
		};

		const res = await donatorsController.createDonatorAndMedicalAccount({
			donator,
			medical_account
		});

		// Create new session for user
		const session = await sessionController.createSessionToken({
			donator: { connect: { id: res.id } }
		});

		ctx.opts.resHeaders.append('Set-Cookie', `session-token=${session.session_token}`);

		return res;
	}),
	findById: publicProcedure
		.input(
			z.object({
				donatorId: z.string()
			})
		)
		.query(async ({ input }) => {
			const { donatorId } = input;
			const user = await donatorsController.getDonator({
				id: donatorId
			});
			return user;
		}),
	updateById: publicProcedure
		.input(
			z.object({
				donatorId: z.string(),
				data: z.object({
					address: z.string().optional(),
					email: z.string().optional(),
					password: z.string().optional()
				})
			})
		)
		.mutation(async ({ input }) => {
			const { donatorId, data } = input;
			if (data?.password) {
				data.password = encodePassword(data.password);
			}
			const result = await prisma.donators.update({
				data: {
					...data
				},
				where: {
					id: donatorId
				}
			});
			return result;
		}),
	findAll: publicProcedure.query(async () => {
		const donators = await prisma.donators.findMany();
		return donators;
	})
});
