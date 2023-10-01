<script lang="ts">
	import type { Donation_History, Places } from '../../../../generated-zod';
	import * as Card from '$lib/components/ui/card';
	import { Calendar, History, CheckCircle2, Clock, RefreshCcw, XCircle } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { toDateString, toDateTimeString } from '$lib/utils';
	import { goto } from '$app/navigation';
	import type { DonationHistory } from './reservation/utils';

	export let donationHistoryData: DonationHistory[];
</script>

<div class="flex flex-col gap-6">
	{#if donationHistoryData}
		{#each donationHistoryData as { donationData, placeData }}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click={() => {
					goto('/history/donation/' + donationData.id);
				}}
			>
				<Card.Root class="w-full rounded-xl shadow">
					<Card.Content class="p-0 py-4">
						<div class="px-4 py-1 pb-0">
							<div class="flex flex-row items-center gap-1">
								<History size={18} />
								<p class="text-sm">
									ประวัติการบริจาคเลือดเลขที่: <span class="font-bold"
										>{donationData.id.slice(-5)}</span
									>
								</p>
							</div>

							<div class="mt-2">
								<p class="text-slate-500 text-sm">สถานที่</p>
								<p class="font-bold text-sm">
									{donationData.Reservation.Reservation_Slot.Place.name}
								</p>
							</div>
							<div class="mt-2">
								<p class="text-slate-500 text-sm">สถานะ</p>
								<p class="font-bold text-sm flex flex-row items-center gap-1">
									{#if donationData.status === 'SUCCESS'}
										<p>บริจาคสำเร็จ</p>
										<CheckCircle2 size={16} />
									{:else if donationData.status === 'FAILED'}
										<p>บริจาคไม่สำเร็จ</p>
										<XCircle size={16} />
									{:else if donationData.status === 'WAIT_BLOOD_QUALITY'}
										<p>รอผลการบริจาค</p>
										<RefreshCcw size={16} />
									{/if}
								</p>
							</div>
							<div class="mt-2">
								<p class="text-slate-500 text-sm">ผลการตรวจสอบคุณภาพเลือด</p>
								<p class="font-bold text-sm flex flex-row items-center gap-1">
									{#if donationData.blood_quality_status === 'QUALIFY'}
										<p>ผ่าน</p>
										<CheckCircle2 size={16} />
									{:else if donationData.blood_quality_status === 'DISQUALIFY'}
										<p>ไม่ผ่าน</p>
										<XCircle size={16} />
									{:else}
										<p>รอผลการตรวจเลือด</p>
										<RefreshCcw size={16} />
									{/if}
								</p>
							</div>

							<div class="mt-2">
								<p class="text-slate-500 text-sm">แต้มสะสมที่ได้รับ</p>
								<p class="font-bold text-sm">{donationData.rewarded_points} แต้ม</p>
							</div>

							<Separator class="my-4" />

							<div class="flex flex-row items-center justify-around">
								<div class="flex flex-row items-center gap-1">
									<Calendar size={16} />
									<p class="font-semibold text-sm">{toDateString(donationData.created_at)}</p>
								</div>

								<div class="flex flex-row items-center gap-1">
									<Clock size={16} />
									<p class="font-semibold text-sm">
										{new Date(donationData.Reservation.Reservation_Slot.reserve_time)
											.getHours()
											.toFixed(2) +
											' - ' +
											(
												new Date(
													donationData.Reservation.Reservation_Slot.reserve_time
												).getHours() + 1
											).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		{/each}
	{/if}
</div>
