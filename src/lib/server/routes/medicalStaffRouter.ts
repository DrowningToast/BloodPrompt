import { createRouter, publicProcedure } from '../context';
import { z } from 'zod';
import { Medical_StaffCreateInputSchema, Medical_StaffUpdateInputSchema } from '../database';
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
					password: (await encodePassword(data.password)) || '',
					Place: {
						connect: {
							id: placeId
						}
					}
				}
			});
			return medicalAccount;
		}),
	createMany: publicProcedure
		.input(
			z
				.object({
					first_name: z.string().min(1),
					last_name: z.string().min(1),
					email: z.string().email().min(1),
					password: z.string().min(1),
					place_id: z.string().min(1)
				})
				.array()
		)
		.mutation(async ({ input }) => {
			const data: {
				first_name: string;
				last_name: string;
				email: string;
				password: string;
				place_id: string;
			}[] = [];

			for (const obj of input) {
				data.push({
					first_name: obj.first_name,
					last_name: obj.last_name,
					email: obj.email,
					password: (await encodePassword(obj.password)) || '',
					place_id: obj.place_id
				});
			}

			console.log(data);

			const result = await prisma.medical_Staff.createMany({ data });
			return result;
		}),
	update: publicProcedure
		.input(
			z.object({
				data: Medical_StaffUpdateInputSchema,
				medicalStaffId: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const { data, medicalStaffId } = input;
			const medicalStaff = await prisma.medical_Staff.update({
				where: {
					id: medicalStaffId
				},
				data: {
					...data
				}
			});
			return medicalStaff;
		}),
	findAll: publicProcedure.query(async () => {
		const medicalStaffs = await prisma.medical_Staff.findMany();
		return medicalStaffs;
	}),
	findById: publicProcedure
		.input(z.object({ medicalStaffId: z.string() }))
		.query(async ({ input }) => {
			const { medicalStaffId } = input;
			const medicalStaff = await prisma.medical_Staff.findUnique({
				where: {
					id: medicalStaffId
				}
			});
			return medicalStaff;
		})
});
