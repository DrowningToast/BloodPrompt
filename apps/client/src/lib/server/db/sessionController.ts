import type { Prisma } from 'database';
import { dbClient } from 'database/db';

export interface CreateSessionTokenArgs {
	donator?: Prisma.DonatorsCreateNestedOneWithoutSessionInput;
	medical_staff?: Prisma.Medical_StaffCreateNestedOneWithoutSessionInput;
	moderator?: Prisma.ModeratorsCreateNestedOneWithoutSessionInput;
}

export const sessionController = {
	createSessionToken: async ({ donator, medical_staff, moderator }: CreateSessionTokenArgs) => {
		const res = await dbClient.session.create({
			data: {
				// default expires in 7 days
				expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
				Donator: donator,
				Medical_Staff: medical_staff,
				Moderator: moderator
			}
		});
		return res;
	}
};
