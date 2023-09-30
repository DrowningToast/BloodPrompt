import { createRouter, publicProcedure } from '../context';
import { z } from 'zod';
import { Medical_StaffCreateInputSchema } from '../database';
import prisma from '../database';
import { encodePassword } from '$lib/utils';

export const medicalStaffRouter = createRouter({
	create: publicProcedure
		.input(
			z.object({
				data: Medical_StaffCreateInputSchema,
				placeId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { data, placeId } = input;
			const medicalAccount = await prisma.medical_Staff.create({
				data: {
					...data,
					password: encodePassword(data.password),
					Place: {
						connect: {
							id: placeId
						}
					}
				},
				include: {
					Place: true
				}
			});
			return medicalAccount;
		}),
	createMany: publicProcedure
		.input(
			z.object({
				staffAccounts: z
					.object({
						first_name: z.string().min(1),
						last_name: z.string().min(1),
						email: z.string().email().min(1),
						password: z.string().min(1)
					})
					.array(),
				placeId: z.string().min(1)
			})
		)
		.mutation(async ({ input }) => {
			const { staffAccounts, placeId } = input;
			const data: {
				first_name: string;
				last_name: string;
				email: string;
				password: string;
				place_id: string;
			}[] = [];

			for (const obj of staffAccounts) {
				data.push({
					first_name: obj.first_name,
					last_name: obj.last_name,
					email: obj.email,
					password: encodePassword(obj.password),
					place_id: placeId
				});
			}

			const result = await prisma.medical_Staff.createMany({ data });
			return result;
		}),
	update: publicProcedure
		.input(
			z.object({
				data: z.object({
					first_name: z.string().optional(),
					last_name: z.string().optional(),
					email: z.string().email().optional(),
					password: z.string().optional()
				}),
				medicalStaffId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { data, medicalStaffId } = input;

			if (data.password) {
				data.password = await encodePassword(data.password);
			}

			const medicalStaff = await prisma.medical_Staff.update({
				where: {
					id: medicalStaffId
				},
				data: {
					...data
				},
				include: {
					Place: true
				}
			});
			return medicalStaff;
		}),
	findAll: publicProcedure.query(async () => {
		const medicalStaffs = await prisma.medical_Staff.findMany({ include: { Place: true } });
		return medicalStaffs;
	}),
	findById: publicProcedure
		.input(z.object({ medicalStaffId: z.string() }))
		.query(async ({ input }) => {
			const { medicalStaffId } = input;
			const medicalStaff = await prisma.medical_Staff.findUnique({
				where: {
					id: medicalStaffId
				},
				include: {
					Place: true
				}
			});
			return medicalStaff;
		})
});
