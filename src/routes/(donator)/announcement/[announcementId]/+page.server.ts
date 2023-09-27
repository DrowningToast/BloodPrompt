import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		announcementId: params.announcementId,
		// MOCK
		announcement: [
			{
				id: '01',
				post_type: 'NORMAL',
				title: 'ขอเชิญร่วม บริจาคโลหิต ในกิจกรรมเฉลิมพระเกียรติ เพื่อถวายเป็นพระราชกุศล',
				content:
					'เนื่องในโอกาสฉลองพระชนมายุ 8 รอบสมเด็จพระอริยวงศาคตญาณ สมเด็จพระสังฆราช สกลมหาสังฆปรินายก  ในวันพฤหัสบดีที่ 29 มิถุนายน 2566 เวลา 09.30 – 14.30 น.  ณ ลานอเนกประสงค์ ชั้น 1 อาคารกรมหลวงนราธิวาสราชนครินทร์',
				created_at: new Date(),
				Place: {
					name: `โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร`,
					image_src: '/images/kmitl-logo.png'
				}
			}
		]
	};
}) satisfies PageServerLoad;
