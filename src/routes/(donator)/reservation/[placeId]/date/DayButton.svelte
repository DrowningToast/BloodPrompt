<script lang="ts">
	export let day: number;
	export let available: boolean;
</script>

<button
	disabled={!available}
	on:click
	class={`w-12 h-12 ${
		available ? '' : 'opacity-[0.3]'
	} bg-gray-300 font-bold grid place-items-center rounded-full`}
>
	<span>{day}</span>
</button>
