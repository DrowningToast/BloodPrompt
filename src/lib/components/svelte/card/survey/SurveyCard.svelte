<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { toDateString } from '$lib/utils';
	import { BellRing, ChevronRight } from 'lucide-svelte';

	export let donateDate: Date;
	export let donateTime: number;
	export let placeName: string;
	export let donationHistoryId: string;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => {
		goto('/history/donation/' + donationHistoryId + '/survey');
	}}
>
	<Card.Root class="rounded-xl shadow">
		<Card.Content class="p-4">
			<div class="flex flex-row items-center gap-2">
				<BellRing size={18} />
				<p class="text-sm font-bold">คุณมีแบบประเมินหลังบริจาคที่ยังไม่ได้ทำ</p>
			</div>

			<p class="text-sm mt-2">
				รายการบริจาคเลือดของคุณเมื่อ วันที่ <span class="font-semibold"
					>{toDateString(donateDate)}</span
				>
				เวลา
				<span class="font-semibold">{donateTime}</span>
				ที่ <span class="font-semibold">{placeName}</span>
			</p>

			<p
				class="mt-4 text-red-500 text-sm text-center flex items-center gap-2 justify-center font-semibold"
			>
				กดเพื่อทำแบบประเมินหลังการบริจาค <ChevronRight size={16} />
			</p>
		</Card.Content>
	</Card.Root>
</div>
