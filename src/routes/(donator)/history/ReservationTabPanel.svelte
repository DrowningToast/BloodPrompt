<script lang="ts">
	import type { Places, Reservation_Slots, Reservations } from '../../../../generated-zod';
	import * as Card from '$lib/components/ui/card';
	import { Calendar, CheckCircle2, Clock, History, XCircle } from 'lucide-svelte';
	import { toDateString } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { goto } from '$app/navigation';

	type ReservationHistory = {
		reservationData: Omit<Reservations, 'pre_donation_fb_id'>;
		placeData: Places;
	};

	export let reservationHistoryData: ReservationHistory[] | null = null;
</script>

<div class="flex flex-col gap-6">
	{#if reservationHistoryData}
		{#each reservationHistoryData as { reservationData, placeData, reservationSlot }}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click={() => {
					goto('/history/reservation/' + reservationData.id);
				}}
			>
				<Card.Root class="w-full rounded-xl shadow">
					<Card.Content class="p-0 py-4">
						<div class="px-4 py-1 pb-0">
							<div class="flex flex-row items-center gap-1">
								<History size={18} />
								<p class="text-sm">
									ประวัติการจองเลขที่: <span class="font-bold">{reservationData.id.slice(-5)}</span>
								</p>
							</div>
							<div class="mt-2">
								<p class="text-slate-500 text-sm">สถานที่</p>
								<p class="font-bold text-sm">{placeData.name}</p>
							</div>
							<div class="mt-2">
								<p class="text-slate-500 text-sm">สถานะ</p>
								<p class="font-bold text-sm flex flex-row items-center gap-1">
									{#if reservationData.status === 'BOOKED'}
										<p>จองสำเร็จ</p>
										<CheckCircle2 size={16} />
									{:else if reservationData.status === 'CANCELLED'}
										<p>การจองถูกยกเลิก</p>
										<XCircle size={16} />
									{:else if reservationData.status === 'COMPLETED'}
										<p>เสร็จสิ้น / เข้ารับบริการแล้ว</p>
										<CheckCircle2 size={16} />
									{/if}
								</p>
							</div>

							<Separator class="my-4" />

							<div class="flex flex-row items-center justify-around">
								<div class="flex flex-row items-center gap-1">
									<Calendar size={16} />
									<p class="font-semibold text-sm">{toDateString(reservationData.created_at)}</p>
								</div>

								<div class="flex flex-row items-center gap-1">
									<Clock size={16} />
									<p class="font-semibold text-sm">
										{new Date(reservationSlot.reserve_time).getHours().toFixed(2) +
											' - ' +
											(new Date(reservationSlot.reserve_time).getHours() + 1).toFixed(2)}
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
