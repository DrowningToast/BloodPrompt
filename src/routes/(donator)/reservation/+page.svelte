<script lang="ts">
	import PlaceCard from '$lib/components/svelte/card/reservation/PlaceCard.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import PlaceDetails from '$lib/components/svelte/dialog/PlaceDetails.svelte';
	import type { Places } from '../../../../generated-zod';
	import ReservationHeader from './ReservationHeader.svelte';
	export let data: PageData;

	let isShowPlaceDetailsDialog: boolean = false;
	const selectedPlace: Places | null = {
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

	const handleShowPlaceDetailsDialog = () => {
		isShowPlaceDetailsDialog = true;
	};
</script>

<div>
	<ReservationHeader href="/home">จองคิวรับบริจาคเลือด</ReservationHeader>
	<PlaceDetails
		open={isShowPlaceDetailsDialog}
		placeData={selectedPlace}
		onClose={() => {
			isShowPlaceDetailsDialog = false;
		}}
	/>

	<div class="p-10 px-10 flex flex-col gap-6">
		{#each new Array(5) as _, index}
			<PlaceCard
				name="โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร (คลินิคเวชกรรม สจล.)"
				address="สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
				ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520, ประเทศไทย"
				rating={5}
				imageSrc="https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.6435-9/75625360_2708828382511763_3205029120262012928_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGOqQxnGM18lHXUfqJyW9DEOBRkihhNDX44FGSKGE0NfjS7uhqfp3lMIjdWkpXnd6iyNHxq0ifH0GfTFlfA0PPh&_nc_ohc=j9h9QLsMYgIAX_jfuFK&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfA-v_P2xu40hWBwbC0ZnItdEstjeWUU1JqjvTZFtO4IKg&oe=6539C618"
				onClick={handleShowPlaceDetailsDialog}
			/>
		{/each}
	</div>
</div>
