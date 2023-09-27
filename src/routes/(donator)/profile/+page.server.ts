import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		user: {
			id: '65070219',
			first_name: 'ศิลา',
			last_name: 'ภักดีวงษ์',
			phone_number: '0656526769',
			gender: 'MALE',
			dob: '18 ธันวาคม พ.ศ. 2546',
			address:
				'คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง 1 ฉลองกรุง ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพมหานคร 10400',
			email: '65070219@kmitl.ac.th'
		}
	};
}) satisfies PageServerLoad;
