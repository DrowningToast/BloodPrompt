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

	let reservationData;
	let donationHistoryData = data.donationHistoryData;

	onMount(async () => {
		const reservationLog = await trpc.reservationSlot.getLog.query();

		reservationData = reservationLog.map((reservation) => {
			return {
				placeData: reservation.Reservation_Slot.Place,
				reservationData: { ...reservation },
				reservationSlot: reservation.Reservation_Slot
			};
		});
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
