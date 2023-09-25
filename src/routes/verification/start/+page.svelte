<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';

	export let data: PageData;
</script>

<div>
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					window.history.back();
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">ยืนยันตัวตน</p>
	</div>

	<div class="p-10 px-8 py-6" />
</div>
