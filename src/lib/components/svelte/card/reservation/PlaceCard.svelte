<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Star } from 'lucide-svelte';

	export let name: string;
	export let address: string;
	export let rating: number = 0;
	export let ratingCount: number = 0;
	export let imageSrc: string = '';
	export let onClick: () => void;
</script>

<Card.Root class="rounded-xl shadow-xl border-0">
	<Card.Header class="p-4">
		<img src={imageSrc} class=" object-cover rounded-lg mx-auto" alt="place_image" />
	</Card.Header>
	<Card.Content class="p-4 px-6 pt-0 pb-0">
		<p class="font-bold break-normal">{name}</p>
		<p class=" text-slate-500 text-sm mt-1">{address}</p>
	</Card.Content>
	<Card.Footer class="flex flex-row justify-between p-4 px-6">
		<div class="flex flex-row gap-1">
			{#each new Array(5) as _, index}
				{#if index <= rating - 1}
					<Star class="text-yellow-500 fill-yellow-500 w-5" />
				{:else}
					<Star class="text-yellow-500 w-5" />
				{/if}
			{/each}
			<span>({ratingCount})</span>
		</div>
		<Button
			class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
			on:click={onClick}
		>
			รายละเอียด
		</Button>
	</Card.Footer>
</Card.Root>
