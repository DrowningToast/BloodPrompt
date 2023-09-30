<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import type { Donation_History, Places, Reservations } from '../../../../generated-zod';
	import DonationHistoryTabPanel from './DonationHistoryTabPanel.svelte';
	import ReservationTabPanel from './ReservationTabPanel.svelte';
	import SurveyCard from '$lib/components/svelte/card/survey/SurveyCard.svelte';
	import { trpc } from '$lib/trpc';
	import { onMount } from 'svelte';

	export let data: PageData;

	let currentTabIndex: number = 0;

	const handleTabChange = (event: any) => {
		if (event.target.id === '1') {
			currentTabIndex = 1;
		} else {
			currentTabIndex = 0;
		}
	};

	type DonationHistory = {
		donationData: Donation_History;
		placeData: Places;
	};

	type ReservationHistory = {
		reservationData: Omit<Reservations, 'pre_donation_fb_id'>;
		placeData: Places;
	};

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

	// MOCK
	const donationHistoryData: DonationHistory[] = [
		{
			donationData: {
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
			placeData: PLACE_DATA
		},
		{
			donationData: {
				id: '00002',
				blood_quality_status: 'DISQUALIFY',
				blood_type: 'B_POSITIVE',
				created_at: new Date(),
				deleted_at: null,
				post_donation_db_id: '002',
				reservation_id: '002',
				rewarded_points: 300,
				status: 'FAILED',
				updated_at: new Date()
			},
			placeData: PLACE_DATA
		},
		{
			donationData: {
				id: '00003',
				blood_quality_status: null,
				blood_type: 'B_POSITIVE',
				created_at: new Date(),
				deleted_at: null,
				post_donation_db_id: '0',
				reservation_id: '003',
				rewarded_points: 300,
				status: 'WAIT_BLOOD_QUALITY',
				updated_at: new Date()
			},
			placeData: PLACE_DATA
		}
	];

	let reservationData: ReservationHistory[] = [];

	onMount(async () => {
		const reservationLog = await trpc.reservation.getLog.query();

		reservationData = reservationLog.map((reservation) => {
			return {
				placeData: reservation.Reservation_Slot.Place,
				reservationData: { ...reservation }
			};
		});

		console.log(reservationData);
	});
</script>

<div class="pb-28">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					goto('/home');
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">ประวัติการจองคิวและบริจาคเลือด</p>
	</div>

	<div class="px-6 pt-6">
		<SurveyCard
			donateDate={new Date()}
			donateTime={12.3}
			donationHistoryId={'001'}
			placeName="โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร"
		/>
	</div>

	<div class="p-6">
		<div class="flex flex-row w-full border-2 justify-around p-1 rounded-xl">
			<Button
				variant={`${currentTabIndex === 0 ? 'destructive' : 'ghost'}`}
				id="0"
				on:click={handleTabChange}
				class="rounded-xl w-full"
			>
				การจองคิว
			</Button>

			<Button
				variant={`${currentTabIndex === 1 ? 'destructive' : 'ghost'}`}
				id="1"
				on:click={handleTabChange}
				class="rounded-xl w-full"
			>
				การบริจาคเลือด
			</Button>
		</div>

		<div class="mt-4">
			{#if currentTabIndex === 0}
				<ReservationTabPanel reservationHistoryData={reservationData} />
			{:else}
				<DonationHistoryTabPanel {donationHistoryData} />
			{/if}
		</div>
	</div>
</div>
