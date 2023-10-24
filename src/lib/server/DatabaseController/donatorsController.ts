import type { Prisma } from '../ORM';
import prisma from '../ORM';

export interface createDonatorAccountArgs {
	donator: Prisma.DonatorsCreateWithoutMedical_AccountInput;
	medical_account: Prisma.Medical_AccountsCreateWithoutDonatorsInput;
}

export const donatorsController = {
	createDonatorAndMedicalAccount: async ({
		donator,
		medical_account
	}: createDonatorAccountArgs) => {
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
	},
	getDonator: async (args: Prisma.DonatorsWhereUniqueInput) => {
		const donator = await prisma.donators.findUnique({
			where: args,
			include: {
				Medical_Account: true
			}
		});
		return donator;
	},
	updatePoints: async (filter: Prisma.DonatorsWhereUniqueInput, points: number) => {
		const donator = await prisma.donators.update({
			where: filter,
			data: {
				reward_point: {
					increment: points
				}
			}
		});
		return donator;
	}
};
