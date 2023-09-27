<script lang="ts">
	import BottomNavBar from '$lib/components/svelte/navbar/BottomNavBar.svelte';
	import type { LayoutData } from './$types';

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
