<script lang="ts">
	import {
		CheckCircle2,
		ChevronLeft,
		History,
		MapPin,
		RefreshCcw,
		User,
		XCircle
	} from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import * as Card from '$lib/components/ui/card';
	import { getFormattedOpeningDate, toDateTimeString } from '$lib/utils';

	export let data: PageData;
	const { donationData, donatorData, placeData } = data;
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
		<p class="text-md font-bold">รายละเอียดการบริจาคเลือด</p>
	</div>

	<div class="pt-8 px-6">
		<Card.Root class="mx-auto rounded-xl shadow">
			<Card.Content class="p-0 py-4">
				<div class="px-4 py-1 pb-0">
					<div class="flex flex-row items-center gap-1">
						<History />
						<p class="text-sm font-bold">รายละเอียดการบริจาคเลือด</p>
					</div>

					<div class="mx-1">
						<div class="mt-4">
							<p class="text-slate-500 text-sm">ทำการบริจาคเมื่อ</p>
							<p class="font-bold text-sm">{toDateTimeString(donationData.created_at)}</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">สถานะการบริจาค</p>
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

						<div class="mt-4">
							<p class="text-slate-500 text-sm">ผลตรวจคุณภาพเลือด</p>
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

						<div class="mt-4">
							<p class="text-slate-500 text-sm">อัพเดทสถานะเมื่อ</p>
							<p class="font-bold text-sm">{toDateTimeString(donationData.updated_at)}</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">แต้มสะสมที่ได้รับ</p>
							<p class="font-bold text-sm">{donationData.rewarded_points} แต้ม</p>
						</div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="mx-auto rounded-xl shadow mt-6">
			<Card.Content class="p-0 py-4">
				<div class="px-4 py-1 pb-0">
					<div class="flex flex-row items-center gap-1">
						<User />
						<p class="text-sm font-bold">ข้อมูลผู้บริจาคเลือด</p>
					</div>

					<div class="mx-1">
						<div class="flex flex-row items-center gap-20">
							<div class="mt-4">
								<p class="text-slate-500 text-sm">ชื่อ</p>
								<p class="font-bold text-sm">
									{donatorData.first_name + ' ' + donatorData.last_name}
								</p>
							</div>
							<div class="mt-4">
								<p class="text-slate-500 text-sm">กรุ๊ปเลือด</p>
								<p class="font-bold text-sm">B</p>
							</div>
						</div>
						<div class="mt-4">
							<p class="text-slate-500 text-sm">วัน/เดือน/ปีเกิด</p>
							<p class="font-bold text-sm">18 ธันวาคม พ.ศ. 2546</p>
						</div>
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
