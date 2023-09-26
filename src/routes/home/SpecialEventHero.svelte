<script lang="ts">
	import { page } from '$app/stores';

	interface Poster {
		img: string;
		href: string;
	}

	console.log($page.url);

	const mock_data: Poster[] = [
		{
			img: '/images/mock_carousel.png',
			href: 'www.google.com'
		},
		{
			img: '/images/mock_carousel.png',
			href: 'www.google.com'
		},
		{
			img: '/images/mock_carousel.png',
			href: 'www.google.com'
		}
	];

	$: selectID = $page.url.hash;
</script>

<section class="px-12 py-8">
	<h2 class="text-2xl font-semibold">Special Event</h2>
	<br class="my-10" />
	<div class="h-96">
		<div class="carousel w-full gap-x-6">
			{#each mock_data as poster, key}
				<div id={`slide${key}`} class="carousel-item relative w-full rounded-2xl overflow-hidden">
					<!-- svelte-ignore a11y-missing-content -->
					<a class="absolute inset-0 inline-block" href={poster.href} />
					<img src={poster.img} class="w-full" alt={`${poster.img} poster image`} />
				</div>
			{/each}
		</div>
	</div>
	<div class="flex justify-around w-full gap-2 items-center px-24">
		{#each mock_data as _, key}
			<a
				href={`#slide${key}`}
				class={`${
					selectID === `#slide${key}` ? 'bg-gray-800' : 'bg-gray-200'
				} w-3 h-3 rounded-full`}
			/>
		{/each}
	</div>
</section>
