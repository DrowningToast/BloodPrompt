<script lang="ts">
	import { goto } from '$app/navigation';
	import Announcement from './Announcement.svelte';
	import type { ComponentProps } from 'svelte';

	type AnnouncementProps = ComponentProps<Announcement>;
	const data: AnnouncementProps[] = [{}, { emergencyBloodType: 'A' }];
</script>

<div class="flex flex-col gap-y-4 pt-4">
	{#each data as announcement}
		<button
			class=" text-left"
			on:click={() => {
				goto('/announcement/' + '01');
			}}
		>
			<Announcement {...announcement} />
		</button>
		{#if data.length > 1}
			<hr />
		{/if}
	{/each}
</div>
