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

	export let data: PageData;

	let showCancelConfirmDialog: boolean = false;
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

	{#if $selectedRedemptionHistory}
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
								{#if $selectedRedemptionHistory.redemtionData.status === 'RECEIVED'}
									<span class="font-bold text-green-600">ได้รับของแล้ว</span>
								{:else if $selectedRedemptionHistory.redemtionData.status === 'REDEEMED'}
									<p class="font-bold text-blue-600">แลกของรางวัลแล้ว</p>
								{:else if $selectedRedemptionHistory.redemtionData.status === 'CANCELLED'}
									<p class="font-bold text-red-600">ยกเลิกการแลก</p>
								{/if}
							</p>
							<p>
								แลกของรางวัลเมื่อ: <span class="font-bold text-sm">
									{$selectedRedemptionHistory.redemtionData.created_at.toLocaleDateString('th')}
								</span>
							</p>
							<p>
								จำนวนของรางวัลที่ถูกแลก: <span class="font-bold text-sm">
									{$selectedRedemptionHistory.redemtionData.redeem_amount} ชิ้น
								</span>
							</p>
							<p>
								แต้มสะสมที่ใช้: <span class="font-bold text-sm">
									{$selectedRedemptionHistory.redemtionData.used_points.toLocaleString('en')} แต้ม
								</span>
							</p>
						</div>

						<Button
							on:click={() => {
								showCancelConfirmDialog = true;
							}}
							class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600 w-full mt-4"
						>
							ยกเลิกรายการ
						</Button>

						<AlertDialog
							title="ยืนยันยกเลิกการแลกนี้หรือไม่ ?"
							description="รายการนี้จะถูกยกเลิก และคุณจะได้รับแต้มที่ใช้ไปคืน ยืนยันที่จะยกเลิกหรือไม่ ?"
							actionLabel="ยืนยันและยกเลิกรายการ"
							onAction={() => {}}
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
								src={$selectedRedemptionHistory.rewardData.image_src}
								alt="reward_image"
								class=" object-cover w-32 mx-auto rounded-lg"
							/>

							<div class="mt-4">
								<p class="font-bold">
									{$selectedRedemptionHistory.rewardData.name}
								</p>
								<p class=" text-slate-400 text-sm mt-1">
									{$selectedRedemptionHistory.rewardData.description}
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
								href={`https://www.google.com/maps/search/${$selectedRedemptionHistory.placeData.name}`}
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
								{$selectedRedemptionHistory.placeData.name}
							</p>

							<div class="flex flex-col gap-3 mt-4">
								<div class="flex flex-row items-center gap-2">
									<Clock size={20} />
									<p class="text-sm">
										{`เปิดทำการเวลา ${$selectedRedemptionHistory.placeData.opening_time.toFixed(
											2
										)} น. - ${$selectedRedemptionHistory.placeData.closing_time.toFixed(2)} น.`}
									</p>
								</div>

								<div class="flex flex-row items-center gap-2">
									<CalendarClock size={28} />
									<p class="text-sm">
										{`เปิดทำการทุกวัน ${getFormattedOpeningDate(
											$selectedRedemptionHistory.placeData.opening_day
										)}`}
									</p>
								</div>

								<div class="flex flex-row items-center gap-2">
									<Phone size={20} />
									<p class="text-sm">
										{`เบอร์โทรติดต่อ ${$selectedRedemptionHistory.placeData.phone_number}`}
									</p>
								</div>

								{#if $selectedRedemptionHistory.placeData.email}
									<div class="flex flex-row items-center gap-2">
										<Mail size={20} />
										<p class="text-sm">
											{`อีเมล ${$selectedRedemptionHistory.placeData.email}`}
										</p>
									</div>
								{/if}

								{#if $selectedRedemptionHistory.placeData.website_url}
									<div class="flex flex-row items-center gap-2">
										<Globe size={20} />
										<p class="text-sm">
											{`เว็บไซต์ ${$selectedRedemptionHistory.placeData.website_url}`}
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
