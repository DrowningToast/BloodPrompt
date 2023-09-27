<script lang="ts">
	import { onMount } from 'svelte';
	import ReservationHeader from '../../ReservationHeader.svelte';
	import type { PageData } from './$types';
	import ReservationCalendar from './ReservationCalendar.svelte';
	import { getAvilableDays } from './utils';

	export let data: PageData;
	const thisMonthAvailableDates = getAvilableDays(data.hospitalData, new Date().getMonth());
	const nextMonthAvilableDates = getAvilableDays(data.hospitalData, new Date().getMonth() + 1);
	const today = new Date();
	const nextMonth = new Date(
		`${today.getFullYear() + Math.floor((today.getMonth() + 1) / 12)}-${
			(today.getMonth() + 2) % 12
		}-01`
	);

	let selectedDate: Date | undefined = undefined;
</script>

<ReservationHeader href="/reservation">จองคิวรับบริจาคเลือด</ReservationHeader>
<div class="px-4 py-2 gap-y-4 relative">
	<h5 class="mt-2 underline underline-offset-2">เลือกวันที่ต้องการจอง</h5>
	<ReservationCalendar bind:selectedDate availableDates={thisMonthAvailableDates} />
	<ReservationCalendar bind:selectedDate date={nextMonth} availableDates={nextMonthAvilableDates} />
</div>
