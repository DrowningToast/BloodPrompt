<script lang="ts">
	import DayButton from './DayButton.svelte';
	import { ArrayRange, daysInMonth } from './utils';

	const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
	export let date = new Date();
	export let month = date.getMonth();
	const currentYear = new Date().getFullYear();
	const whichDay = new Date(date.setDate(1)).getDay();
	export let availableDates: number[] = [];

	export let selectedDate: Date | undefined = undefined;

	const handleClick = (day: number) => () => {
		selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
	};
</script>

<h1 class="w-full text-2xl font-bold mt-8 mb-2">
	เดือน{date.toLocaleString('th-TH', { month: 'long' })}
	{date.getFullYear()}
</h1>
<div class="w-full grid grid-cols-7 gap-x-2 gap-y-2">
	{#each days as day, i}
		<div class="text-center">{day}</div>
	{/each}
	<!-- Reserve Space -->
	{#each Array(whichDay).fill(0) as _, i}
		<div class="w-12 h-12" />
	{/each}
	<!-- End Reserve Space -->
	{#each ArrayRange(1, daysInMonth(month + 1, currentYear), 1) as day, i}
		<DayButton on:click={handleClick(day)} {day} available={availableDates.includes(day)} />
	{/each}
</div>
