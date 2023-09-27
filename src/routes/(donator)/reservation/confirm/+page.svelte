<script lang="ts">
	import { CalendarClock, ChevronLeft, Clock, Hotel, MapPin } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { selectedPlace, selectedDate, selectedTime } from '$lib/stores/reservationStores';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;
</script>

<div>
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					window.history.back();
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">ยืนยันการจอง</p>
	</div>

	{#if $selectedPlace}
		<img src={$selectedPlace?.image_src} alt="place_image" />

		<div class="p-6 text-sm flex flex-col gap-4">
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row gap-3 items-center">
					<Hotel class="text-[#F5222D]" size={28} />
					<div class="flex flex-col">
						<p class="text-slate-500 font-semibold">สถานที่ที่ต้องการจอง</p>
						<p class="font-bold">{$selectedPlace.name}</p>
					</div>
				</div>
				<a
					href={`https://www.google.com/maps/search/${$selectedPlace.name}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<button class="bg-[#F5222D] rounded-full w-10 h-10 flex items-center justify-center">
						<MapPin class="w-6 h-6 text-white" />
					</button>
				</a>
			</div>

			<div class="flex flex-row gap-3 items-center">
				<Clock class="text-[#F5222D]" size={28} />
				<div class="flex flex-col">
					<p class="text-slate-500 font-semibold">เวลาที่ต้องการจอง</p>
					<p class="font-bold">{$selectedTime || '13:00 น.'}</p>
				</div>
			</div>

			<div class="flex flex-row gap-3 items-center">
				<CalendarClock class="text-[#F5222D]" size={28} />
				<div class="flex flex-col">
					<p class="text-slate-500 font-semibold">วันที่ที่ต้องการจอง</p>
					<p class="font-bold">{$selectedDate || '21 กันยายน พ.ศ. 2566'}</p>
				</div>
			</div>

			<Button
				class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600 w-60 py-6 mx-auto mt-10"
			>
				ยืนยันการจอง
			</Button>
		</div>
	{/if}
</div>
