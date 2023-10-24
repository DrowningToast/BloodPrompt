<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { TRPCServerlessFunctionHandler } from '$lib/API/TRPC/trpc';
	import { onMount } from 'svelte';
	import ReservationHeader from '../../ReservationHeader.svelte';
	import type { PageData } from './$types';
	import ReservationCalendar from './ReservationCalendar.svelte';
	import TimeButton from './TimeButton.svelte';
	import { ArrayRange, get24HoursTimeString, getAvilableDays } from './utils';
	import { Steps } from 'svelte-steps';
	import { preFeedbackStore } from '$lib/stores/preFeedback';

	export let data: PageData;
	const thisMonthAvailableDates = getAvilableDays(data.hospitalData, new Date().getMonth());
	const nextMonthAvilableDates = getAvilableDays(data.hospitalData, new Date().getMonth() + 1);
	const today = new Date();
	const nextMonth = new Date(
		`${today.getFullYear() + Math.floor((today.getMonth() + 1) / 12)}-${
			(today.getMonth() + 2) % 12
		}-01`
	);
	$: availableTimeSlotsInTheSelectedDay = data.hospitalData.availableDates
		.find((date) => selectedDate?.getDate() === date.date.getDate())
		?.periods?.filter((period) => period.available)
		.map(
			(period) =>
				new Date(
					selectedDate!.getFullYear(),
					selectedDate!.getMonth(),
					selectedDate!.getDate(),
					+period.time.split(':')[0],
					+period.time.split(':')[1]
				)
		)
		.map((time) => {
			return get24HoursTimeString(time);
		});

	let selectedDate: Date | undefined = undefined;
	let selectedTime: Date | undefined = undefined;

	$: steps = [
		{ text: `สถานที่ ${data.hospitalData.name}` },
		{
			text: `วันที่ ${(selectedDate as unknown as Date)?.toLocaleDateString('th-TH', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}`
		},
		{ text: 'เลือกเวลาที่จอง' }
	];

	const timeSlots = ArrayRange(9, 17, 1).map((hour) => {
		return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, 0);
	});

	onMount(async () => {
		if ($preFeedbackStore.Pre_Feedback_Answers.length > 0) {
		} else {
			await goto('/reservation/survey');
		}
	});

	const handleConfirm = async () => {
		if (!selectedDate) return;
		if (!selectedTime) return;
		try {
			await goto(`/reservation/${data.hospitalData.id}/confirm?date=${selectedTime.getTime()}`);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<ReservationHeader href="/reservation">จองคิวรับบริจาคเลือด</ReservationHeader>
<div class="px-4 py-2 gap-y-4 relative">
	<h5 class="mt-2 underline underline-offset-2">เลือกวันที่ต้องการจอง</h5>
	<ReservationCalendar bind:selectedDate availableDates={thisMonthAvailableDates} />
	<ReservationCalendar bind:selectedDate date={nextMonth} availableDates={nextMonthAvilableDates} />
	<Sheet.Root
		onOpenChange={(isOpen) => {
			if (!isOpen) selectedDate = undefined;
			selectedTime = undefined;
		}}
		open={!!selectedDate}
	>
		<Sheet.Content class="rounded-t-3xl" side="bottom">
			<Sheet.Header>
				<Sheet.Title class="font-bold text-2xl text-left my-4">เลือกเวลาที่ต้องการจอง</Sheet.Title>
			</Sheet.Header>

			<Steps
				clickable={false}
				line="0.4rem"
				primary={`#C9C9C9`}
				secondary="#F5222D"
				current={1.4}
				vertical
				{steps}
			/>
			<br />
			{#if selectedDate}
				<div class="grid grid-cols-3 gap-x-4 gap-y-4">
					{#each timeSlots as timeSlot}
						<TimeButton
							disabled={!availableTimeSlotsInTheSelectedDay?.includes(
								get24HoursTimeString(timeSlot)
							)}
							displayTime={timeSlot}
							{selectedDate}
							bind:selectedTime
						/>
					{/each}
				</div>
			{/if}
			<div class="grid place-items-center w-full mt-8">
				<Button
					on:click={handleConfirm}
					disabled={!selectedTime}
					class="rounded-3 xl bg-red-600 text-white text-lg py-6 px-10">เลือก</Button
				>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</div>
