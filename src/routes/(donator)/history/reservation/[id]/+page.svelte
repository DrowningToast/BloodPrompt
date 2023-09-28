<script lang="ts">
	import { CheckCircle2, ChevronLeft, History, MapPin, RefreshCcw, XCircle } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import * as Card from '$lib/components/ui/card';
	import { getFormattedOpeningDate, toDateTimeString, toDateString } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import QRCode from '@castlenine/svelte-qrcode';

	export let data: PageData;
	const { reservationData, donatorData, placeData } = data;
	let showCancelConfirmDialog: boolean = false;
</script>

<AlertDialog
	title="ยืนยันยกเลิกการจองหรือไม่ ?"
	description="รายการจองคิวนี้จะถูกยกเลิก และอาจเสียสิทธิ์การจองที่ทำไว้แล้วได้ ยืนยันยกเลิกหรือไม่"
	actionLabel="ยืนยันและยกเลิกรายการ"
	onAction={() => {}}
	secondaryLabel={'ยกเลิก'}
	onSecondaryAction={() => {
		showCancelConfirmDialog = false;
	}}
	open={showCancelConfirmDialog}
/>

<div class="pb-28">
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
				<div class="px-4 py-1 pb-0">
					<div class="flex flex-row items-center gap-1">
						<History />
						<p class="text-sm font-bold">รายละเอียดการจองคิว</p>
					</div>

					<div class="mx-1">
						<div class="mt-4">
							<p class="text-slate-500 text-sm">สถานะการบริจาค</p>
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

						<div class="mt-4 flex flex-row items-center gap-16">
							<div>
								<p class="text-slate-500 text-sm">วันที่</p>
								<p class="font-bold text-sm">{toDateString(reservationData.created_at)}</p>
							</div>

							<div>
								<p class="text-slate-500 text-sm">เวลา</p>
								<p class="font-bold text-sm">{'10.00 - 11.00'}</p>
							</div>
						</div>

						<div class="flex items-center justify-center my-2">
							<QRCode content="http://www.google.com" size={175} />
						</div>

						<Button
							on:click={() => {
								showCancelConfirmDialog = true;
							}}
							class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600 w-full"
						>
							ยกเลิกการจอง
						</Button>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="w-full rounded-xl shadow mt-6">
			<Card.Content class="p-0 py-4">
				<div class="px-4 py-1 pb-0">
					<div class="flex flex-row items-center gap-1">
						<MapPin />
						<p class="text-sm font-bold">รายละเอียดสถานที่</p>
					</div>

					<img
						src={placeData.image_src}
						class="w-full object-cover rounded-xl my-5 h-40"
						alt="place_image"
					/>

					<div class="mx-1">
						<div class="mt-4">
							<p class="text-slate-500 text-sm">สถานที่</p>
							<p class="font-bold text-sm">{placeData.name}</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">ที่อยู่</p>
							<p class="font-bold text-sm">{placeData.address}</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">วันเปิดทำการ</p>
							<p class="font-bold text-sm">
								เปิดทำการทุกวัน {getFormattedOpeningDate(placeData.opening_day)}
							</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">เวลาเปิดทำการ</p>
							<p class="font-bold text-sm">
								{`${placeData.opening_time.toFixed(2)} - ${placeData.closing_time.toFixed(2)}`}
							</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">เบอร์โทรติดต่อ</p>
							<p class="font-bold text-sm">
								{placeData.phone_number}
							</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">อีเมล</p>
							<p class="font-bold text-sm">
								{placeData.email}
							</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">เว็บไซต์</p>
							<p class="font-bold text-sm">
								{placeData.website_url}
							</p>
						</div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
