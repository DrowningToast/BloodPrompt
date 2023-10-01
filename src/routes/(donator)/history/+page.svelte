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
	import { get24HoursTimeString } from '../reservation/[placeId]/date/utils';
	import type { DonationHistory } from './reservation/utils';

	export let data: PageData;
	const { pendingFeedback } = data;

	let currentTabIndex: number = 0;

	const handleTabChange = (event: any) => {
		if (event.target.id === '1') {
			currentTabIndex = 1;
		} else {
			currentTabIndex = 0;
		}
	};

	const donationHistoryData: DonationHistory[] = data.donationHistoryData.map((donation) => {
		return {
			donationData: donation,
			placeData: donation.Reservation.Reservation_Slot.Place
		};
	});

	let reservationData = data.reservationLog.map((reservation) => {
		return {
			placeData: reservation.Reservation_Slot.Place,
			reservationData: reservation
		};
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

	{#if pendingFeedback}
		<div class="px-6 pt-6">
			<SurveyCard
				donateDate={pendingFeedback.Reservation.Reservation_Slot.reserve_date}
				donateTime={+get24HoursTimeString(
					pendingFeedback.Reservation.Reservation_Slot.reserve_time
				).replace(':', '.')}
				donationHistoryId={pendingFeedback.id}
				placeName={pendingFeedback.Reservation.Reservation_Slot.Place.name}
			/>
		</div>
	{/if}

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
