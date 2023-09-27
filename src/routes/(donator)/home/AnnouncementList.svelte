<script lang="ts">
	import Announcement from './Announcement.svelte';
	import type { ComponentProps } from 'svelte';

	type AnnouncementProps = ComponentProps<Announcement>;
	const data: AnnouncementProps[] = [{}, { emergencyBloodType: 'A' }];
</script>

<div class="flex flex-col gap-y-4 pt-4">
	{#each data as announcement}
		<Announcement {...announcement} />
		{#if data.length > 1}
			<hr />
		{/if}
	{/each}
</div>
