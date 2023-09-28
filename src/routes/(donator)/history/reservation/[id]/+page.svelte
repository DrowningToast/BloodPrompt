<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;
	let showCancelConfirmDialog: boolean = false;
</script>

<AlertDialog
	open={showCancelConfirmDialog}
	title="ยกเลิกรายการจองนี้หรือไม่ ?"
	description="คุณแน่ใจหรือไม่ ว่าต้องการยกเลิกรายการจองนี้"
	actionLabel="ยืนยันและยกเลิกการจอง"
	onAction={() => {
		showCancelConfirmDialog = false;
	}}
	secondaryLabel="ยกเลิก"
	onSecondaryAction={() => {
		showCancelConfirmDialog = false;
	}}
/>

<div>
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					goto('/history');
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">ประวัติการจองคิว</p>
	</div>

	<div class="pt-8 px-6">
		<Card.Root class="mx-auto rounded-xl shadow">
			<Card.Content class="p-0 py-4">
				<div class="px-4 py-2">Hello</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
