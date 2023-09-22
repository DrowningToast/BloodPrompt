import type { PrismaClient } from "../";
import { SessionCreateInputSchema } from "../";
export const SessionController = (prisma: PrismaClient) => {
  const create = (
    session: typeof SessionCreateInputSchema,
    accountType: "donator" | "moderator" | "medical_staff"
  ) => {
    return prisma.session.create({
      data: {
        ...session,
        session_token: "",
        expires: "",
      },
    });
  };
};
