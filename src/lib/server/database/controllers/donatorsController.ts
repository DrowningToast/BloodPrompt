import type { Prisma } from '..';
import prisma from '..';

export interface createDonatorAccountArgs {
	donator: Prisma.DonatorsCreateWithoutMedical_AccountInput;
	medical_account: Prisma.Medical_AccountsCreateWithoutDonatorsInput;
}

export const donatorsController = {
	createDonatorAndMedicalAccount: async ({
		donator,
		medical_account
	}: createDonatorAccountArgs) => {
		console.log('createDonatorAccount()');
		const res = await prisma.donators.create({
			data: {
				...donator,
				Medical_Account: {
					create: {
						...medical_account
					}
				}
			},
			include: {
				Medical_Account: true
			}
		});
		return res;
	}
};
