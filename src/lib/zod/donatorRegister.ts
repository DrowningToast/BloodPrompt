import {
	DonatorsCreateWithoutMedical_AccountInputSchema,
	Medical_AccountsCreateInputSchema
} from '$lib/generated-zod';
import { z } from 'zod';

export const signUpRegister = z.object({
	donatorData: DonatorsCreateWithoutMedical_AccountInputSchema,
	medicalAccountData: Medical_AccountsCreateInputSchema
});

export type SignUpRegister = z.infer<typeof signUpRegister>;
