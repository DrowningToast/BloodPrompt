<script lang="ts">
	import type { PageData } from './$types';
	import bloodPromptLogo from '$lib/images/bloodprompt-logo.png';
	import {
		Home,
		LogOut,
		MapPin,
		UserCircle2,
		Lock,
		Gift,
		CalendarHeart,
		FileText,
		User,
		Search,
		Wallet,
		Heart,
		User2,
		Cake,
		Phone,
		Calendar,
		Clock,
		Syringe,
		FileCheck,
		UserCircle
	} from 'lucide-svelte';

	export let data: PageData;
	const { allReservation } = data;
	let filteredReservationData = allReservation;
	import { Input } from '$lib/components/ui/input';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	let position = 'bottom';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import wallet from '$lib/images/wallet.png';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';
	import Dropdown from '../../../moderator/home/dropdown.svelte';
	import { toDateString } from '$lib/utils';
	import { trpc } from '$lib/trpc';
	import type { Reservations } from '../../../../../generated-zod';
	import type { DonationStatus } from '@prisma/client';

	let selectedBloodQuality = '';
	let selectedDonationStatus = '';

	const handleBloodQualityChange = (event: any) => {
		selectedBloodQuality = event.value;
	};

	const handleDonationStatusChange = (event: any) => {
		selectedDonationStatus = event.value;
	};

	const handleUpdateDonationData = async (bloodType: any, reservationId: string) => {
		trpc.donationHistory.submitBloodDonation
			.mutate({
				data: {
					blood_quality_status: selectedBloodQuality,
					blood_type: bloodType,
					reservation_id: reservationId,
					rewarded_points: selectedDonationStatus === 'SUCCESS' ? 300 : 0,
					status: selectedDonationStatus as DonationStatus
				}
			})
			.then(() => {
				alert('บันทึกข้อมูลการบรืจาคเลือดสำเร็จ');
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleCancelReservation = async (reservationId: string) => {
		trpc.reservation.cancelReservation
			.query({ reservationId: reservationId })
			.then(() => {
				alert('ระบบยกเลิกการจองนี้เรียบร้อยแล้ว');
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	};
</script>

<div class="flex flex-row">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-full">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodPromptLogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full min-h-screen justify-between">
			<div class="flex flex-col gap-8 w-full">
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/home');
						}
					}}><Home class="w-5 h-5 " />หน้าหลัก</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#EF4444] hover:bg-[#ef4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reservation');
						}
					}}><FileText class="w-5 h-5" />การจองคิว</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reward');
						}
					}}><Gift class="w-5 h-5" />จัดการรางวัล</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/special-event');
						}
					}}><CalendarHeart class="w-5 h-5" />จัดการกิจกรรมหรือแคมเปญ</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"
				on:click={() => {
					if (browser) {
						goto('/staff/login');
					}
				}}><LogOut class="mr-2 h-5    w-5 stroke-white" />ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="w-9/12 h-100% bg-[#D9D9D9]">
		<div class="w-full bg-white grid grid-cols-3 items-center justify-center px-8 h-16">
			<div class="items-center justify-center flex" />
			<div class="items-center justify-center flex text-2xl font-semibold">{$placeName}</div>
			<div class="items-center justify-end flex gap-2">
				<div class="flex flex-row items-center gap-1">
					<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
					<h1 class="font-bold">
						{$medicalStaffName}
					</h1>
					<Dropdown />
				</div>
			</div>
		</div>
		<div class="px-8 py-8">
			<div class="text-2xl font-bold">รายการจองคิว</div>
			<div class="text-[#888] text-xl">รายการการจองคิวของผู้ที่ต้องเข้ารับบริจาคเลือด</div>

			<div class="flex flex-row gap-20 mt-8 items-center font-bold">
				<div>เเสดงข้อมูลทั้งหมด / เลือกเเสดงตามเวลาที่ต้องการ</div>
				<div>ค้นหาโดยใช้หมายเลขการจองคิว</div>
			</div>
			<div class="flex flex-row gap-8 items-center mt-2">
				<Select.Root>
					<Select.Trigger class="w-96 bg-white h-12 rounded-lg">
						<Select.Value placeholder="ทั้งหมด" />
					</Select.Trigger>
					<Select.Content class="py-2">
						<Select.Item value="all" class="py-2">ทั้งหมด</Select.Item>
						<Select.Item value="new" class="py-2">ใหม่สุด</Select.Item>
						<Select.Item value="old" class="py-2">เก่าสุด</Select.Item>
						<Select.Item value="thisDay" class="py-2">วันนี้</Select.Item>
						<Select.Item value="thisMonth" class="py-2">เดือนนี้</Select.Item>
						<Select.Item value="thisYear" class="py-2">ปีนี้</Select.Item>
					</Select.Content>
				</Select.Root>
				<Input placeholder="ระบุหมายเลขการจองคิว" class=" w-96 bg-white h-12 rounded-lg" />
				<button class="rounded-full bg-[#ef4444] flex items-center justify-center w-32 h-12 gap-2">
					<Search class="text-white" />
					<div class=" text-white">ค้นหา</div>
				</button>
			</div>
			<div class="bg-white w-auto h-[84vh] rounded-xl mt-8 px-8">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">ID</Table.Head>
							<Table.Head>First Name</Table.Head>
							<Table.Head>Last Name</Table.Head>
							<Table.Head>Gender</Table.Head>
							<Table.Head>DOB</Table.Head>
							<Table.Head>Blood Type</Table.Head>
							<Table.Head>Date</Table.Head>
							<Table.Head>Time</Table.Head>
							<Table.Head class="flex  items-center justify-center">รายละเอียด</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each filteredReservationData as reservation, index}
							<Table.Row>
								<Table.Cell class="font-medium">{index + 1}</Table.Cell>
								<Table.Cell>{reservation.Donator.first_name}</Table.Cell>
								<Table.Cell>{reservation.Donator.last_name}</Table.Cell>
								<Table.Cell>{reservation.Donator.gender === 'MALE' ? 'ชาย' : 'หญิง'}</Table.Cell>
								<Table.Cell>{toDateString(new Date(reservation.Donator.dob))}</Table.Cell>
								<Table.Cell>{reservation.Donator.Medical_Account.blood_type}</Table.Cell>
								<Table.Cell
									>{toDateString(new Date(reservation.Reservation_Slot.reserve_date))}</Table.Cell
								>
								<Table.Cell
									>{new Date(reservation.Reservation_Slot.reserve_time).getHours().toFixed(2) +
										' - ' +
										(new Date(reservation.Reservation_Slot.reserve_time).getHours() + 1).toFixed(
											2
										)}</Table.Cell
								>
								<Table.Cell
									><Dialog.Root>
										{#if reservation.status === 'BOOKED'}
											<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
												รายละเอียด
											</Dialog.Trigger>
										{:else}
											<Dialog.Trigger class={buttonVariants({ variant: 'outline' })} disabled>
												การจองถูกยกเลิก
											</Dialog.Trigger>
										{/if}
										<Dialog.Content class="sm:max-w-[1250px] sm:min-h-[700px] flex flex-col mx-10">
											<Dialog.Header class="h-1">
												<Dialog.Title class="text-3xl mx-5 mt-5"
													>รายละเอียดการจองคิวบริจาคเลือด</Dialog.Title
												>
												<div class=" text-base text-slate-500 mx-5">
													รายละเอียดเพิ่มเติมของจองคิวบริจาคเลือด
												</div>
											</Dialog.Header>
											<div class="flex flex-row mt-28 mx-5 gap-6">
												<div class=" basis-1/2 bg-white drop-shadow-md h-full">
													<div class="w-full flex flex-col items-center justify-center gap-8 my-6">
														<div class="text-2xl font-semibold">รายละเอียดผู้บริจาคเลือด</div>
														<div
															class="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center my-4 mt-2"
														>
															<User class="text-white" />
														</div>
														<div class="w-full flex flex-row justify-center items-center gap-16">
															<div class="w-44 h-52 flex flex-col gap-6">
																<div class="flex flex-row items-center gap-2">
																	<Heart />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">รหัสผู้บริจาค</div>
																		<div class="text-sm">{reservation.Donator.id}</div>
																	</div>
																</div>
																<div class="flex flex-row items-center gap-2">
																	<User2 />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">เพศ</div>
																		<div class="text-sm">
																			{reservation.Donator.gender === 'MALE' ? 'ชาย' : 'หญิง'}
																		</div>
																	</div>
																</div>
																<div class="flex flex-row items-center gap-2">
																	<Cake />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">วัน/เดือน/ปีเกิด</div>
																		<div>
																			{toDateString(new Date(reservation.Donator.dob))}
																		</div>
																	</div>
																</div>
															</div>
															<div class=" w-44 h-52">
																<div class="w-full flex flex-row justify-center items-center gap-6">
																	<div class="w-44 h-52 flex flex-col gap-2">
																		<div class="flex flex-row items-center gap-2">
																			<Phone />
																			<div class="flex flex-col">
																				<div class="text-sm text-gray-500">เบอร์โทรศัพท์</div>
																				<div>
																					{reservation.Donator.phone_number}
																				</div>
																			</div>
																		</div>
																		<div class="flex flex-row gap-2 justify-start items-start">
																			<div class="y-full flex justify-start items-start mt-2">
																				<Home />
																			</div>
																			<div class="flex flex-col">
																				<div class="text-sm text-gray-500">ที่อยู่</div>
																				<div>
																					{reservation.Donator.address}
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class=" basis-1/2 bg-white drop-shadow-md">
													<div class="w-full flex flex-col items-center justify-center gap-4 my-6">
														<div class="text-2xl font-semibold">รายละเอียดการจองคิวบริจาคเลือด</div>

														<div class="w-full flex flex-row justify-center items-center gap-6">
															<div class="w-44 h-52 flex flex-col gap-2">
																<div class="flex flex-row items-center gap-2">
																	<Calendar />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">วันที่จอง</div>
																		<div>
																			{toDateString(
																				new Date(reservation.Reservation_Slot.reserve_date)
																			)}
																		</div>
																	</div>
																</div>
																<div class="flex flex-row items-center gap-2">
																	<Clock />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">ช่วงเวลา</div>
																		<div>
																			{new Date(reservation.Reservation_Slot.reserve_time)
																				.getHours()
																				.toFixed(2) +
																				' - ' +
																				(
																					new Date(
																						reservation.Reservation_Slot.reserve_time
																					).getHours() + 1
																				).toFixed(2)}
																		</div>
																	</div>
																</div>
																<div class="flex flex-row items-center gap-2">
																	<Syringe />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">กรุ๊ปเลือด</div>
																		<div>{reservation.Donator.Medical_Account.blood_type}</div>
																	</div>
																</div>
																<div class="flex flex-row items-center gap-2">
																	<FileCheck />
																	<div class="flex flex-col">
																		<div class="text-sm text-gray-500">สถานะการทำแบบประเมิน</div>
																		<div>ผ่านการทดสอบ</div>
																	</div>
																</div>
															</div>
															<div class=" w-44 h-52">
																<div class="w-full flex flex-row justify-center items-center gap-6">
																	<div class="w-44 h-52 flex flex-col gap-2">
																		<div class="flex flex-row items-center gap-2">
																			<div class="flex flex-col">
																				<div class="text-sm text-gray-500">สถานะการบริจาคเลือด</div>
																				<Select.Root onSelectedChange={handleDonationStatusChange}>
																					<Select.Trigger class=" w-44">
																						<Select.Value placeholder="สถานะ" />
																					</Select.Trigger>
																					<Select.Content>
																						<Select.Item value="SUCCESS"
																							>บริจาคเลือดสำเร็จ</Select.Item
																						>
																						<Select.Item value="FAILED"
																							>บริจาคเลือดไม่่สำเร็จ</Select.Item
																						>
																					</Select.Content>
																				</Select.Root>
																			</div>
																		</div>
																		<div class="flex flex-row gap-2 justify-start items-start">
																			<div class="flex flex-col">
																				<div class="text-sm text-gray-500">สถานะคุณภาพเลือด</div>

																				<Select.Root onSelectedChange={handleBloodQualityChange}>
																					<Select.Trigger class=" w-44">
																						<Select.Value placeholder="สถานะ" />
																					</Select.Trigger>
																					<Select.Content>
																						<Select.Item value="QUALIFY">เลือดคุณภาพดี</Select.Item>
																						<Select.Item value="DISQUALIFY"
																							>เลือดไม่สามารถบริจาคได้</Select.Item
																						>
																					</Select.Content>
																				</Select.Root>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class=" w-96 h-16 flex justify-end items-center">
															<button
																class=" bg-[#191F2F] w-40 h-10 text-white rounded-full"
																on:click={() =>
																	handleUpdateDonationData(
																		reservation.Donator.Medical_Account.blood_type,
																		reservation.id
																	)}>บันทึกการแก้ไข</button
															>
														</div>
													</div>
												</div>
											</div>
											<div class=" w-auto h-16 flex justify-end items-center mx-14 mt-5">
												<button
													class=" w-40 h-10 text-white rounded-full bg-[#ef4444]"
													on:click={() => handleCancelReservation(reservation.id)}
													>ยกเลิกการจองคิว</button
												>
											</div></Dialog.Content
										>
									</Dialog.Root></Table.Cell
								>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	</div>
</div>
