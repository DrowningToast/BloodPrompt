<script lang="ts">
	import BottomNavBar from '$lib/components/svelte/navbar/BottomNavBar.svelte';
	import { trpc } from '$lib/trpc';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;
</script>

<div>
	<main>
		<slot />
	</main>

	<div class="max-w-[90%] mx-auto">
		<BottomNavBar />
	</div>
</div>
