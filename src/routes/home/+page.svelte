<script lang="ts">
	import type { PageData } from './$types';
	import Banner from './Banner.svelte';
	import SpecialEvent from './SpecialEventHero.svelte';

	import Searchbar from './Searchbar.svelte';
	import Announcement from './Announcement.svelte';
	import AnnouncementList from './AnnouncementList.svelte';

	export let data: PageData;
</script>

<Banner />
<section class="px-10 py-8">
	<SpecialEvent />
</section>
<section class="px-8">
	<Searchbar />
</section>
<section>
	<AnnouncementList />
</section>
