<script lang="ts">
	import { page } from '$app/stores';
	import { CalendarDays } from 'lucide-svelte';

	import specialEventMockImage from '$lib/images/home/special_event_banner.png';

	interface Poster {
		img_src: string | null;
	}

	$: selectID = $page.url.hash;
	export let sp_events: Poster[] = [];
</script>

<div class="flex flex-row items-center gap-2">
	<CalendarDays />
	<p class="font-bold">กิจกรรมพิเศษ (Special Event)</p>
</div>
<br class="my-10" />
<div>
	<div class="carousel w-full gap-x-6">
		{#each sp_events as poster, key}
			{#if poster.img_src}
				<div id={`slide${key}`} class="carousel-item relative w-full rounded-xl overflow-hidden">
					<!-- svelte-ignore a11y-missing-content -->
					<!-- <a class="absolute inset-0 inline-block" href={poster.href} /> -->
					<img
						src={specialEventMockImage}
						class="w-full h-64"
						alt={`${specialEventMockImage} poster image`}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>
<div class="flex justify-around w-full gap-2 items-center px-24 mt-6">
	{#each sp_events as _, key}
		<a
			href={`#slide${key}`}
			class={`${selectID === `#slide${key}` ? 'bg-gray-800' : 'bg-gray-200'} w-2 h-2 rounded-full`}
		/>
	{/each}
</div>
