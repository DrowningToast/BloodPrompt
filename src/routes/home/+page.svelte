<script lang="ts">
	import type { PageData } from './$types';
	import Banner from './Banner.svelte';
	import SpecialEvent from './SpecialEvent.svelte';

	import { browser } from '$app/environment';

	export let data: PageData;
</script>

<Banner />
<SpecialEvent />
