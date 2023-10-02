<script lang="ts">
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
		Megaphone
	} from 'lucide-svelte';

	import { Input } from '$lib/components/ui/input';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { toDateString, toDateTimeString } from '$lib/utils';
	import { trpc } from '$lib/trpc';
	import type { Redemption_History } from '../../../../../../generated-zod';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';

	export let data: PageData;
	let { redemptionData } = data;
	let filteredRedemptionData = redemptionData;
	$: searchKeyword = '';

	const handleCancelRedeemReward = async (data: Redemption_History) => {
		await trpc.reward.cancelRedeem
			.mutate({
				donatorId: data.donator_id,
				redemptionHistoryId: data.id,
				rewardId: data.reward_id
			})
			.then(() => {
				alert('ระบบยกเลิกการแลกของรางวัล และคืนแต้มสะสมไปยังผู้ใช้ที่ทำการแลกแล้ว');
				window.location.reload();
			})
			.catch((error) => console.error(error));
	};

	const handleUpdateRedemtionStatus = async (data: Redemption_History) => {
		await trpc.reward.markAsReceived
			.mutate({ redemptionHistoryId: data.id })
			.then(() => {
				alert('ระบบบันทึกการอัพเดทสถานะของคุณแล้ว');
				window.location.reload();
			})
			.catch((error) => console.error(error));
	};

	const handleFilterStatusChange = (event: any) => {
		if (event.value == 0) {
			filteredRedemptionData = redemptionData;
		} else if (event.value == 1) {
			filteredRedemptionData = redemptionData.filter((data) => data.status === 'REDEEMED');
		} else if (event.value == 2) {
			filteredRedemptionData = redemptionData.filter((data) => data.status === 'RECEIVED');
		} else if (event.value == 3) {
			filteredRedemptionData = redemptionData.filter((data) => data.status === 'CANCELLED');
		}
	};
</script>

<div class="flex flex-row h-full">
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
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/announcement');
						}
					}}><Megaphone class="w-5 h-7 pb-[2px] " />จัดการประกาศประชาสัมพันธ์</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reservation');
						}
					}}><FileText class="w-5 h-5" />การจองคิว</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#EF4444] hover:bg-[#ac3232] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
		<div class="w-full h-16 bg-white grid grid-cols-3 items-center justify-center px-8">
			<div class="items-center justify-center flex" />
			<div class="items-center justify-center flex text-2xl font-semibold">{$placeName}</div>
			<div class="items-center justify-end flex gap-2">
				<div class="bg-[#EF4444] w-9 h-8 rounded-full flex items-center justify-center">
					<User class="text-white" />
				</div>

				<div class=" text-base">{$medicalStaffName}</div>
			</div>
		</div>
		<div class="px-8 py-8">
			<div class="text-2xl font-bold">ประวัติการแลกของรางวัล</div>
			<div class="text-[#888] text-xl">
				สามารถดูประวัติการแลกของรางวัลที่มาแลก ณ สถานบริจาคเลือดนี้
			</div>

			<div class="flex flex-row gap-20 mt-8 items-center font-bold">
				<div>เเสดงข้อมูลทั้งหมด / เลือกเเสดงตามเวลาที่ต้องการ</div>
				<div>ค้นหาโดยใช้หมายเลขของรางวัล</div>
			</div>
			<div class="flex flex-row gap-8 items-center mt-2">
				<Select.Root onSelectedChange={handleFilterStatusChange}>
					<Select.Trigger class="w-96 bg-white h-12 rounded-lg">
						<Select.Value placeholder="ทั้งหมด" />
					</Select.Trigger>
					<Select.Content class="py-2">
						<Select.Item value="0" class="py-2">แสดงทั้งหมด</Select.Item>
						<Select.Item value="1" class="py-2">ทำการแลกของรางวัลแล้ว</Select.Item>
						<Select.Item value="2" class="py-2">ได้รับของรางวัลแล้ว</Select.Item>
						<Select.Item value="3" class="py-2">ยกเลิกรายการแล้ว</Select.Item>
					</Select.Content>
				</Select.Root>
				<Input
					placeholder="ค้นหาโดยใช้หมายเลขการแลกของรางวัล"
					class=" w-96 bg-white h-12 rounded-lg"
					bind:value={searchKeyword}
					on:input={() => {
						if (searchKeyword) {
							filteredRedemptionData = redemptionData.filter((data) =>
								data.id.includes(searchKeyword)
							);
						} else {
							filteredRedemptionData = redemptionData;
						}
					}}
				/>
				<button class="rounded-full bg-[#ef4444] flex items-center justify-center w-32 h-12 gap-2">
					<Search class="text-white" />
					<div class=" text-white">ค้นหา</div>
				</button>
			</div>
			<div class="bg-white w-auto h-[84vh] rounded-xl mt-8 px-8">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[50px]">ID</Table.Head>
							<Table.Head>Donator ID</Table.Head>
							<Table.Head>First Name</Table.Head>
							<Table.Head>Last Name</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head>Reward Name</Table.Head>
							<Table.Head>Used Point</Table.Head>
							<Table.Head>Date / Time</Table.Head>
							<Table.Head class="flex  items-center justify-center">รายละเอียด</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each filteredRedemptionData as data, index}
							<Table.Row>
								<Table.Cell class="font-medium">{index + 1}</Table.Cell>
								<Table.Cell>{data.Donator.id}</Table.Cell>
								<Table.Cell>{data.Donator.first_name}</Table.Cell>
								<Table.Cell>{data.Donator.last_name}</Table.Cell>
								<Table.Cell class="underline">{data.status}</Table.Cell>
								<Table.Cell>{data.Reward.name}</Table.Cell>
								<Table.Cell>{data.used_points}</Table.Cell>
								<Table.Cell>{toDateTimeString(data.created_at)}</Table.Cell>
								<Table.Cell
									><Dialog.Root>
										<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
											รายละเอียด
										</Dialog.Trigger>
										<Dialog.Content class="sm:max-w-[1000px] sm:min-h-[700px] flex flex-col mx-10">
											<Dialog.Header class="h-1">
												<Dialog.Title class="text-3xl mx-5 mt-5"
													>รายละเอียดการแลกของรางวัล</Dialog.Title
												>
												<div class=" text-base text-slate-500 mx-5">
													รายละเอียดเพิ่มเติมของการแลกของรางวัลของผู้บริจาคเลือด
												</div>
											</Dialog.Header>
											<div class="flex flex-row mt-28 mx-5 gap-2">
												<div class=" basis-1/3 bg-white drop-shadow-md">
													<div class="text-xl font-semibold flex items-center justify-center mt-5">
														ข้อมูลผู้บริจาค
													</div>
													<div class="flex flex-col items-center justify-center mx-2 gap-3 mt-5">
														<div
															class="rounded-full bg-[#ef4444] w-24 h-24 flex items-center justify-center my-4"
														>
															<User class="w-32 h-32 text-white " />
														</div>
														<div class=" flex items-center text-xl font-semibold">
															{data.Donator.first_name + ' ' + data.Donator.last_name}
														</div>
														<div class="text-sm">
															Donator ID: <span class="font-semibold">{data.Donator.id}</span>
														</div>
														<div class="flex flex-row gap-4">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none"
															>
																<path
																	d="M21.9994 16.9201V19.9201C22.0006 20.1986 21.9435 20.4743 21.832 20.7294C21.7204 20.9846 21.5567 21.2137 21.3515 21.402C21.1463 21.5902 20.904 21.7336 20.6402 21.8228C20.3764 21.912 20.0968 21.9452 19.8194 21.9201C16.7423 21.5857 13.7864 20.5342 11.1894 18.8501C8.77327 17.3148 6.72478 15.2663 5.18945 12.8501C3.49942 10.2413 2.44769 7.27109 2.11944 4.1801C2.09446 3.90356 2.12732 3.62486 2.21595 3.36172C2.30457 3.09859 2.44702 2.85679 2.63421 2.65172C2.82141 2.44665 3.04925 2.28281 3.30324 2.17062C3.55722 2.05843 3.83179 2.00036 4.10945 2.0001H7.10945C7.59475 1.99532 8.06524 2.16718 8.43321 2.48363C8.80118 2.80008 9.04152 3.23954 9.10944 3.7201C9.23607 4.68016 9.47089 5.62282 9.80945 6.5301C9.94399 6.88802 9.97311 7.27701 9.89335 7.65098C9.8136 8.02494 9.62831 8.36821 9.35944 8.6401L8.08945 9.9101C9.513 12.4136 11.5859 14.4865 14.0894 15.9101L15.3594 14.6401C15.6313 14.3712 15.9746 14.1859 16.3486 14.1062C16.7225 14.0264 17.1115 14.0556 17.4694 14.1901C18.3767 14.5286 19.3194 14.7635 20.2794 14.8901C20.7652 14.9586 21.2088 15.2033 21.526 15.5776C21.8431 15.9519 22.0116 16.4297 21.9994 16.9201Z"
																	stroke="black"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
															</svg>
															<div class="text-sm font-semibold">{data.Donator.phone_number}</div>
														</div>
														<div class="flex flex-row gap-4">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none"
															>
																<path
																	d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
																	stroke="black"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
																<path
																	d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
																	stroke="black"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
															</svg>
															<div class="text-sm font-semibold">{data.Donator.email}</div>
														</div>
													</div>
												</div>
												<div class=" basis-2/3 bg-white drop-shadow-md">
													<div class="flex items-center justify-center">
														<div class="text-xl font-semibold">ข้อมูลการแลกของรางวัล</div>
													</div>
													<div class=" mx-8 my-8 flex">
														<div class="flex flex-col items-start justify-center w-1/2 gap-2">
															<img
																src={data.Reward.image_src}
																alt="reward_image"
																class=" w-36 object-cover rounded-xl my-4 mx-auto"
															/>
															<div class=" flex items-center text-xl font-semibold mt-1">
																{data.Reward.name}
															</div>
															<div class="">
																รหัสรางวัล: <span class="font-semibold">{data.Reward.id}</span>
															</div>
															<div>
																รายละเอียด:<span class="font-semibold"
																	>{data.Reward.description}</span
																>
															</div>
															<div>
																จำนวนคะแนนที่ใช้แลก:<span class="font-semibold">
																	{data.used_points} แต้ม</span
																>
															</div>
														</div>
														<div class="flex flex-col items-start justify-start w-1/2 gap-3">
															<div class="text-lg font-semibold">ที่อยู่ในการจัดส่ง</div>
															<div class=" text-sm">
																{data.Donator.address}
															</div>
															<div class="text-lg font-semibold">สถานะการจัดส่ง</div>
															<div>
																<Select.Root>
																	<Select.Trigger class=" w-64">
																		<Select.Value placeholder="สถานะการจัดส่ง" />
																	</Select.Trigger>
																	<Select.Content>
																		<Select.Item value="status1">จัดส่งแล้ว</Select.Item>
																		<Select.Item value="status2">ได้รับของรางวัลแล้ว</Select.Item>
																	</Select.Content>
																</Select.Root>
															</div>
															<div class=" items-end flex justify-end w-full">
																<Button
																	class=" w-28 h-12 text-base mt-10 rounded-full"
																	on:click={() => {
																		handleUpdateRedemtionStatus(data);
																	}}>ยืนยัน</Button
																>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="flex items-center justify-end my-auto mx-5">
												<button
													on:click={() => {
														handleCancelRedeemReward(data);
													}}
													class="bg-[#ef4444] flex items-center justify-center w-48 h-12 rounded-full text-white mt-4"
													>ยกเลิกการแลกของรางวัล</button
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
