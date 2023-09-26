import { createRouter } from '../context';
import { publicProcedure } from '../context';
import { encodePassword } from '$lib/utils';
import { donatorsController } from '../database/controllers/donatorsController';
import { signUpRegister } from '$lib/zod/donatorRegister';

export const donatorsRouter = createRouter({
	signUp: publicProcedure.input(signUpRegister).mutation(async ({ input }) => {
		console.log('signUp()');
		const { donatorData, medicalAccountData } = input;

		const donator = {
			image_src: donatorData.image_src,
			first_name: donatorData.first_name,
			last_name: donatorData.last_name,
			phone_number: donatorData.phone_number,
			gender: donatorData.gender,
			dob: donatorData.dob,
			address: donatorData.address,
			email: donatorData.email,
			password: (await encodePassword(donatorData.password)) || '',
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

		return res;
	})
});
