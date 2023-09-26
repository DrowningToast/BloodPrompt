import { z } from 'zod';
import {
	DonatorsCreateWithoutMedical_AccountInputSchema,
	Medical_AccountsCreateInputSchema
} from '../../../generated-zod';

export const signUpRegister = z.object({
	donatorData: DonatorsCreateWithoutMedical_AccountInputSchema,
	medicalAccountData: Medical_AccountsCreateInputSchema
});

export type SignUpRegister = z.infer<typeof signUpRegister>;
