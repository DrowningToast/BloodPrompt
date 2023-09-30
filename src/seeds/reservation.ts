import prisma from '$lib/server/database';

await prisma.reservations.create({
	data: {
		status: 'BOOKED',
		Donator: {
			connect: {
				id: 'cln5teeba00009u00cmgg20op'
			}
		},
		Reservation_Slot: {
			create: {
				reserve_date: new Date('2023-10-01T07:10:00.000Z'),
				reserve_time: new Date('2023-10-01T07:10:00.000Z'),
				Place: {
					connect: {
						id: 'cln5sr4c70004erwv12mzhaw1'
					}
				}
			}
		}
	}
});
