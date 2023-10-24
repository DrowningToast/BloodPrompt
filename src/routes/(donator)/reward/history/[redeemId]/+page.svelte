<script lang="ts">
	import { browser } from '$app/environment';
	import {
		CalendarClock,
		ChevronLeft,
		Clock,
		Gift,
		Globe,
		Info,
		Mail,
		MapPin,
		Phone
	} from 'lucide-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { selectedRedemptionHistory } from '$lib/stores/rewardStores';
	import * as Card from '$lib/components/ui/card';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { getFormattedOpeningDate } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import { TRPCServerlessFunctionHandler } from '$lib/API/TRPC/trpc';

	export let data: PageData;
	const { redemptionHistory, place } = data;

	let showCancelConfirmDialog: boolean = false;

	const handleCancelRedeem = async () => {
		if (redemptionHistory) {
			await TRPCServerlessFunctionHandler.reward.cancelRedeem
				.mutate({
					donatorId: redemptionHistory?.donator_id,
					redemptionHistoryId: redemptionHistory?.id
				})
				.then(() => {
					alert('ระบบยกเลิกรายการแลกของรางวัลของคุณแล้ว');
					goto('/reward/history');
				})
				.catch((error) => console.error(error));
		}
	};
</script>

<div class="bg-[#F5F5F5] min-h-screen">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					goto('/reward/history');
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">รายละเอียดการแลกของรางวัล</p>
	</div>

	{#if redemptionHistory && place}
		<div class="p-6">
			<Card.Root class="rounded-xl shadow">
				<Card.Content class="p-0">
					<div class="p-4">
						<div class="flex flex-row items-center gap-2">
							<Info size={20} />
							<p class="font-bold">ข้อมูลการแลกของรางวัล</p>
						</div>

						<div class="mt-2">
							<p class="flex flex-row items-center gap-1">
								สถานะการแลก:
								{#if redemptionHistory.status === 'RECEIVED'}
									<span class="font-bold text-green-600">ได้รับของแล้ว</span>
								{:else if redemptionHistory.status === 'REDEEMED'}
									<p class="font-bold text-blue-600">แลกของรางวัลแล้ว</p>
								{:else if redemptionHistory.status === 'CANCELLED'}
									<p class="font-bold text-red-600">ยกเลิกการแลก</p>
								{/if}
							</p>
							<p>
								หมายเลขการแลก: <span class="font-bold text-sm">
									{redemptionHistory.id.slice(-5)}
								</span>
							</p>
							<p>
								แลกของรางวัลเมื่อ: <span class="font-bold text-sm">
									{new Date(redemptionHistory.created_at).toLocaleDateString('th')}
								</span>
							</p>
							<p>
								จำนวนของรางวัลที่ถูกแลก: <span class="font-bold text-sm">
									{redemptionHistory.redeem_amount} ชิ้น
								</span>
							</p>
							<p>
								แต้มสะสมที่ใช้: <span class="font-bold text-sm">
									{redemptionHistory.used_points.toLocaleString('en')} แต้ม
								</span>
							</p>
						</div>

						{#if redemptionHistory.status === 'REDEEMED'}
							<Button
								on:click={() => {
									showCancelConfirmDialog = true;
								}}
								class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600 w-full mt-4"
							>
								ยกเลิกรายการ
							</Button>
						{/if}

						<AlertDialog
							title="ยืนยันยกเลิกการแลกนี้หรือไม่ ?"
							description="รายการนี้จะถูกยกเลิก และคุณจะได้รับแต้มที่ใช้ไปคืน ยืนยันที่จะยกเลิกหรือไม่ ?"
							actionLabel="ยืนยันและยกเลิกรายการ"
							onAction={handleCancelRedeem}
							secondaryLabel={'ยกเลิก'}
							onSecondaryAction={() => {
								showCancelConfirmDialog = false;
							}}
							open={showCancelConfirmDialog}
						/>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-xl shadow mt-4">
				<Card.Content class="p-0">
					<div class="p-4">
						<div class="flex flex-row items-center gap-2">
							<Gift size={20} />
							<p class="font-bold">ข้อมูลของรางวัล</p>
						</div>
						<div class="mt-4">
							<img
								src={redemptionHistory.Reward.image_src}
								alt="reward_image"
								class=" object-cover w-32 mx-auto rounded-lg"
							/>

							<div class="mt-4">
								<p class="font-bold">
									{redemptionHistory.Reward.name}
								</p>
								<p class=" text-slate-400 text-sm mt-1">
									{redemptionHistory.Reward.description}
								</p>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="rounded-xl shadow mt-4 mb-24">
				<Card.Content class="p-0">
					<div class="p-4">
						<div class="flex flex-row justify-between items-stretch mt-2 relative">
							<a
								href={`https://www.google.com/maps/search/${place.name}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<button
									class="bg-[#F5222D] rounded-full w-10 h-10 flex items-center absolute right-2 justify-center"
								>
									<MapPin class="w-6 h-6 text-white" />
								</button>
							</a>
						</div>

						<p class="font-bold">ข้อมูลการสถานที่รับของรางวัล</p>
						<div class="mt-2">
							<p class="text-sm font-bold">
								{place.name}
							</p>

							<div class="flex flex-col gap-3 mt-4">
								<div class="flex flex-row items-center gap-2">
									<Clock size={20} />
									<p class="text-sm">
										{`เปิดทำการเวลา ${place.opening_time.toFixed(
											2
										)} น. - ${place.closing_time.toFixed(2)} น.`}
									</p>
								</div>

								<div class="flex flex-row items-center gap-2">
									<CalendarClock size={28} />
									<p class="text-sm">
										{`เปิดทำการทุกวัน ${getFormattedOpeningDate(place.opening_day)}`}
									</p>
								</div>

								<div class="flex flex-row items-center gap-2">
									<Phone size={20} />
									<p class="text-sm">
										{`เบอร์โทรติดต่อ ${place.phone_number}`}
									</p>
								</div>

								{#if place.email}
									<div class="flex flex-row items-center gap-2">
										<Mail size={20} />
										<p class="text-sm">
											{`อีเมล ${place.email}`}
										</p>
									</div>
								{/if}

								{#if place.website_url}
									<div class="flex flex-row items-center gap-2">
										<Globe size={20} />
										<p class="text-sm">
											{`เว็บไซต์ ${place.website_url}`}
										</p>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>
