<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let displayTime: Date;
	export let selectedDate: Date;
	export let selectedTime: Date | undefined;
	export let disabled: boolean;
</script>

<Button
	on:click={() => {
		selectedTime = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate(),
			displayTime.getHours(),
			displayTime.getMinutes()
		);
	}}
	{disabled}
	class="font-bold bg-white text-red-600 shadow-xl border-gray-100 border-[1px] active:bg-white active:border-red-600 acitve:border-2 hover:bg-white hover:border-red-600 hover:border-2 focus:bg-white "
>
	{displayTime.getHours()}:{(displayTime.getMinutes() < 10 ? '0' : '') + displayTime.getMinutes()}
</Button>
