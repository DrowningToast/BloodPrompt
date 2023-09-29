<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';

	export let href: string;
</script>

<div class="bg-white shadow-md p-5 grid relative gap-4">
	<a class="absolute left-5 top-1/2 transform -translate-y-1/2" {href}>
		<ChevronLeft />
	</a>
	<p class="text-md font-bold text-center w-full">
		<slot />
	</p>
</div>
