import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const PLACE_DATA = {
		id: '01',
		name: 'โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร',
		description:
			"สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (King Mongkut's Institute of Technology Ladkrabang) เป็นมหาวิทยาลัยในกำกับของรัฐ ก่อตั้งด้วยความช่วยเหลือของรัฐบาลญี่ปุ่น (มหาวิทยาลัยโตไก) โดยเน้นการเรียนการสอนด้านวิทยาศาสตร์และเทคโนโลยี ตั้งอยู่เขตลาดกระบัง กรุงเทพมหานคร",
		image_src:
			'https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.6435-9/75625360_2708828382511763_3205029120262012928_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGOqQxnGM18lHXUfqJyW9DEOBRkihhNDX44FGSKGE0NfjS7uhqfp3lMIjdWkpXnd6iyNHxq0ifH0GfTFlfA0PPh&_nc_ohc=j9h9QLsMYgIAX_jfuFK&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfA-v_P2xu40hWBwbC0ZnItdEstjeWUU1JqjvTZFtO4IKg&oe=6539C618',
		phone_number: '0656526769',
		email: '65070219@kmitl.ac.th',
		icon_src: '',
		address: 'ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520, ประเทศไทย',
		opening_day: 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY',
		opening_time: 9,
		closing_time: 16.3,
		is_available: true,
		created_at: new Date(new Date().getTime()),
		updated_at: new Date(new Date().getTime()),
		deleted_at: null,
		website_url: 'https://www.it.kmitl.ac.th'
	};

	return {
		donationHistoryId: params.id,
		placeData: PLACE_DATA,
		donationHistoryData: {
			id: '00001',
			blood_quality_status: 'QUALIFY',
			blood_type: 'B_POSITIVE',
			created_at: new Date(),
			deleted_at: null,
			post_donation_db_id: '001',
			reservation_id: '001',
			rewarded_points: 300,
			status: 'SUCCESS',
			updated_at: new Date()
		},
		questions: [
			{
				id: '1',
				label: 'คุณมีอาการผิดปกติหรือปวดบวมในบริเวณที่มีการให้เลือด'
			},
			{
				id: '2',
				label: 'คุณมีอาการเวียนหัว หรือรู้สึกหน้ามืด'
			},
			{
				id: '3',
				label: 'คุณมีอาการรู้สึกคล้ายจะคลื่นใส้อาเจียน'
			},
			{
				id: '4',
				label: 'คุณมีอาการวิงเวียนศีรษะ'
			},
			{
				id: '5',
				label: 'คุณรู้สึกอ่อนเพลียหรือสูญเสียความรู้สึก'
			}
		]
	};
}) satisfies PageServerLoad;
