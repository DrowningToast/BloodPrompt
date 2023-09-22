import { NODE_ENV } from '$env/static/private';
import type { PrismaClient } from 'database';
import { dbClient } from 'database/db';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || dbClient;

if (NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
