<script lang="ts">
	import { goto } from '$app/navigation';
	import AnnouncementPost from './AnnouncementPost.svelte';
	import type { Announcements, Places } from '@prisma/client';

	interface AnnouncementsWithPlace extends Announcements {
		place: Places;
	}

	export let data: AnnouncementsWithPlace[] = [];

	console.log(data);
</script>

<div class="flex flex-col gap-y-4 pt-4">
	{#each data as announcement}
		<button
			class=" text-left"
			on:click={() => {
				goto('/announcement/' + announcement.id);
			}}
		>
			<AnnouncementPost
				title={announcement.title}
				desc={announcement.content}
				postedDate={announcement.created_at}
				emergencyBloodType={`${announcement.blood_type}`}
				post_type={announcement.post_type}
				post_img={announcement.image_src}
				icon_src={announcement.place.image_src}
			/>
		</button>
		{#if data.length > 1}
			<hr />
		{/if}
	{/each}
</div>
