<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Clock, Phone } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { selectedReward } from '$lib/stores/rewardStores';
	import AlertDialog from '../alert/AlertDialog.svelte';
	import { browser } from '$app/environment';
	import type { Donators } from '../../../../../generated-zod';
	import { TRPCServerlessFunctionHandler } from '$lib/API/TRPC/trpc';
	export let open: boolean = false;
	export let onClose: () => void;

	let showConfirmRedeemDialog: boolean = false;
	export let donatorData: Donators;

	const handleRedeemReward = async () => {
		await TRPCServerlessFunctionHandler.reward.redeem
			.mutate({
				rewardId: $selectedReward?.rewardData.id || '',
				donatorId: donatorData.id
			})
			.then((res) => {
				alert('แลกของรางวัลวำเร็จ');
				goto('/reward/history/' + res.redemptionHistory.id);
			})
			.catch((error) => console.error(error));
	};
</script>

{#if $selectedReward}
	<AlertDialog
		open={showConfirmRedeemDialog}
		title="ยืนยันการแลกของรางวัลหรือไม่ ?"
		description={`แต้มสะสมของคุณจะถูกหักจำนวน: ${$selectedReward.rewardData.required_points.toLocaleString(
			'en'
		)} แต้ม เพื่อปลกของรางวัลชิ้นนี้ ยืนยันที่จะดำเนินการต่อหรือไม่ ?`}
		secondaryLabel="แลกของรางวัล"
		actionLabel="ยกเลิก"
		onSecondaryAction={handleRedeemReward}
		onAction={() => {
			showConfirmRedeemDialog = false;
		}}
	/>
{/if}

{#if $selectedReward && !showConfirmRedeemDialog}
	<div>
		<AlertDialog
			open={showConfirmRedeemDialog}
			title="ยืนยันการแลกของรางวัลหรือไม่ ?"
			description={`แต้มสะสมของคุณจะถูกหักจำนวน: ${$selectedReward.rewardData.required_points.toLocaleString(
				'en'
			)} แต้ม เพื่อแลกของรางวัลชิ้นนี้ ยืนยันที่จะดำเนินการต่อหรือไม่ ?`}
			actionLabel="แลกของรางวัล"
			secondaryLabel="ยกเลิก"
			onAction={() => {
				if (browser) {
					goto('/reward/history');
				}
			}}
			onSecondaryAction={() => {
				showConfirmRedeemDialog = false;
			}}
		/>
	</div>

	<Dialog.Root {open} closeOnEscape={false} closeOnOutsideClick={false} onOpenChange={onClose}>
		<Dialog.Content class="max-w-[90vw] rounded-xl p-0">
			<Dialog.Header>
				<img
					src={$selectedReward.rewardData.image_src}
					alt="palce_image"
					class="rounded-t-xl h-48 w-96 object-cover"
				/>
				<div class="px-6 text-left pt-4">
					<div class="flex flex-row items-center justify-between">
						<p class="font-bold text-lg">
							{$selectedReward.rewardData.name}
						</p>

						<p class=" text-[#F5222D] font-semibold">
							{$selectedReward.rewardData.required_points.toLocaleString('en')} แต้ม
						</p>
					</div>

					<p class="text-slate-500 text-sm mt-2">
						{$selectedReward.rewardData.description}
					</p>
					<div class="text-left relative mt-6">
						<p class="font-bold">{$selectedReward.placeData.name}</p>
						<p class="text-slate-500 text-sm max-w-[80%]">{$selectedReward.placeData.address}</p>

						<div class="flex flex-col gap-3 mt-2 text-sm">
							<div class="flex flex-row items-center gap-2">
								<Phone size={20} />
								<p class="text-sm">
									{`เบอร์โทรติดต่อ ${$selectedReward.placeData.phone_number}`}
								</p>
							</div>
						</div>

						<div class="flex flex-row items-center gap-2 text-sm mt-3">
							<Clock size={20} />
							<p class="text-sm">
								{`เปิดทำการเวลา ${$selectedReward.placeData.opening_time.toFixed(
									2
								)} น. - ${$selectedReward.placeData.closing_time.toFixed(2)} น.`}
							</p>
						</div>
					</div>
				</div>
			</Dialog.Header>

			<Dialog.Footer class="flex flex-col gap-4 w-full justify-end text-center p-4 pt-4">
				<Button
					disabled={!(donatorData.reward_point >= $selectedReward.rewardData.required_points)}
					on:click={() => {
						showConfirmRedeemDialog = true;
					}}
					class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600 w-full"
				>
					แลกของรางวัล
				</Button>
				<p class="text-slate-500 text-sm">
					เหลือของรางวัลอีก: {$selectedReward.rewardData.amount_left} ชิ้น
				</p>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}
