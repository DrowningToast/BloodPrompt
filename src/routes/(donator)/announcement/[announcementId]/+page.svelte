<script lang="ts">
	import { browser } from '$app/environment';
	import { ChevronLeft, Verified } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { toDateTimeString } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let data: PageData;

	export let announcementData = data.announcement[0];
</script>

<div class="pb-24">
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
		<p class="text-md font-bold overflow-hidden truncate">
			โพสของ {data.announcement[0].Place.name}
		</p>
	</div>

	<div class="p-8 px-8">
		<div class="flex flex-row items-center gap-2">
			<img src={announcementData.Place.image_src} alt="place_image" class="w-14" />

			<div class="">
				<div class="flex flex-row items-center gap-2">
					<p class="font-bold text-sm">{announcementData.Place.name}</p>
					<Verified size={20} class="text-sm text-red-900 font-bold" />
				</div>
				<p class="text-gray-500 text-xs font-bold mt-1">
					{toDateTimeString(announcementData.created_at)}
				</p>
			</div>
		</div>

		<div class="mt-6 flex flex-col gap-4">
			<p class="font-bold">
				{announcementData.title}
			</p>

			<p class="text-sm">
				{announcementData.content}
			</p>
		</div>

		<img
			src="https://picsum.photos/1920/1080"
			alt="place_image"
			class=" rounded-xl h-60 w-full object-cover mt-6"
		/>
	</div>
</div>
