import { t } from '../context';
import {
	enforceAuthenticated,
	enforceDonator,
	enforceMedicalStaff,
	enforceModerator
} from '../Middlewares/middlewares';

export const donatorProcedure = t.procedure.use(enforceDonator);
export const medicalStaffProcedure = t.procedure.use(enforceMedicalStaff);
export const moderatorProcedure = t.procedure.use(enforceModerator);
export const protectedProcedure = t.procedure.use(enforceAuthenticated);
