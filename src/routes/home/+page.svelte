<script lang="ts">
	import type { PageData } from './$types';
	import Banner from './Banner.svelte';
	import SpecialEvent from './SpecialEventHero.svelte';

	import Searchbar from './Searchbar.svelte';

	export let data: PageData;
</script>

<Banner />
<section class="px-12 py-8">
	<SpecialEvent />
</section>
<section class="px-8">
	<Searchbar />
</section>
