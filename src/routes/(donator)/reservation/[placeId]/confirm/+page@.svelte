<script lang="ts">
	import { CalendarIcon, ClockIcon, HotelIcon, MapPinIcon } from 'lucide-svelte';
	import ReservationHeader from '../../ReservationHeader.svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { get24HoursTimeString } from '../date/utils';

	export let data: PageData;
	const { dateTime, hospitalData } = data;
</script>

<div class="min-h-screen flex flex-col pb-8">
	<ReservationHeader href="/reservation">ยืนยันการจอง</ReservationHeader>
	<div class="w-full h-72"><img src={`/images/mock_hospital_bg.png`} alt="hospital bg" /></div>
	<div class="flex flex-col gap-y-6 relative px-8 py-8 font-semibold min-h-full">
		<div class="absolute inset-8 z-0">
			<a
				class="bg-red-600 text-white rounded-full w-10 h-10 grid place-items-center absolute top-0 right-0"
				href={`${hospitalData.googleMapUrl}`}
				target="_blank"
			>
				<MapPinIcon class="w-6 h-6 mx-auto" />
			</a>
		</div>
		<div class="flex gap-x-4 items-center">
			<HotelIcon class="w-6 h-6 text-red-600" />
			<div class="flex flex-col gap-y-0.5">
				<span class="text-gray-500">สถานที่ที่ต้องการจอง</span>
				<span>{hospitalData.name}</span>
			</div>
		</div>
		<div class="flex gap-x-4 items-center">
			<ClockIcon class="w-6 h-6 text-red-600" />
			<div class="flex flex-col gap-y-0.5">
				<span class="text-gray-500">เวลาที่ต้องการจอง</span>
				<span>{get24HoursTimeString(dateTime)} น.</span>
			</div>
		</div>
		<div class="flex gap-x-4 items-center">
			<CalendarIcon class="w-6 h-6 text-red-600" />
			<div class="flex flex-col gap-y-0.5">
				<span class="text-gray-500">วันที่ที่ต้องการจอง</span>
				<span
					>วันที่ {dateTime.toLocaleDateString('th-TH', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</span
				>
			</div>
		</div>
	</div>
	<Button href="" class="mx-24 mt-auto text-lg rounded-3xl px-4 py-8 bg-red-600 font-semibold"
		>ยืนยันการจอง</Button
	>
</div>
