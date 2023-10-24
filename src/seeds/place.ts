import prisma from '$lib/ORM';

export const init = async () => {
	await prisma.places.upsert({
		create: {
			name: 'โรงพยาบาลราชวิถี',
			address: 'ถนนราชวิถี ตำบลในเมือง อำเภอเมือง จังหวัดนครศรีธรรมราช 80000',
			closing_time: 17,
			opening_time: 8.3,
			phone_number: '075 355 0000',
			opening_day: 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY'
		},
		where: {
			id: '1'
		},
		update: {}
	});
};
