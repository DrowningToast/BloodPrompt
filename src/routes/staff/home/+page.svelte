<script lang="ts">
	import sEventImg from '$lib/images/staff/manage_specialevent/Rectangle 24.png';
	import {
		Home,
		LogOut,
		UserCircle,
		FileText,
		Gift,
		CalendarHeart,
		Megaphone
	} from 'lucide-svelte';
	import bloodPromptLogo from '$lib/images/bloodprompt-logo.png';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import Dropdown from '../../moderator/home/dropdown.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';

	import {
		BarChartSimple,
		DonutChart,
		type BarChartOptions,
		type DonutChartOptions
	} from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import type { PageData } from './$types';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';

	export let data: PageData;

	placeName.set(data.currentStaff?.Place.name || '');
	medicalStaffName.set(data.currentStaff?.first_name + ' ' + data.currentStaff?.last_name);

	const donutChartOptions: DonutChartOptions = {
		title: 'จำนวนเลือดในคลังทั้งหมด',
		resizable: true,
		legend: {
			alignment: 'center' // Potential Bug
		},
		donut: {
			center: {
				label: 'จำนวนครั้งการบริจาคเลือด'
			},
			alignment: 'center' // Potential Bug
		},
		height: '400px',
		width: '325px'
	};

	const barChartOptions: BarChartOptions = {
		title: 'สถิติการบริจาคเลือดย้อนหลัง',
		resizable: true,
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				mapsTo: 'group',
				scaleType: 'labels' // Potential Bug
			}
		},
		height: '400px',
		width: '350px'
	};

	const handleLogout = async () => {
		await trpc.auth.logout
			.mutate()
			.then((res) => {
				goto('/staff/login');
			})
			.catch((error) => {
				console.error(error);
			});
	};
</script>

<div class="flex flex-row justify-between bg-gray-300 h-full w-full max-w-[100vw] min-h-[100vh]">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-100%">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodPromptLogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full h-full justify-between">
			<div class="flex flex-col gap-8 w-full">
				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reservation');
						}
					}}><FileText class="w-5 h-5" />การจองคิว</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reward');
						}
					}}><Gift class="w-5 h-5" />จัดการรางวัล</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F]s text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
				}}><LogOut class="mr-2 h-5 w-5 stroke-white" on:click={handleLogout} />ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="flex flex-col w-9/12 items-center h-full">
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
		<div class="flex flex-col w-full h-full p-7 gap-9">
			<!-- 1 -->
			<div class="flex w-full h-4/12 gap-12">
				<div
					class="flex flex-row w-8/12 rounded-3xl justify-between items-center shadow-xl gap-4 bg-white"
				>
					<div class=" bg-white rounded-xl p-6">
						<DonutChart data={data.bloodTypeCount} options={donutChartOptions} />
					</div>
					<div class=" bg-white rounded-xl p-6">
						<BarChartSimple data={data.donationCount} options={barChartOptions} />
					</div>
				</div>
				<div class="flex shadow-xl w-4/12 rounded-3xl p-4 bg-white">
					<div class="flex flex-col justify-center items-center m-auto gap-5">
						<img class="w-[80%] h-[80%]" src={sEventImg} alt="" />
						<p class="text-center font-bold text-2xl">Special event now</p>
					</div>
				</div>
			</div>
			<!-- 2 -->
			<div class="flex w-full h-[50%] gap-12">
				<div class="flex flex-col w-8/12 rounded-3xl p-11 gap-10 shadow-xl bg-white">
					<div>
						<div class=" bg-white rounded-xl p-6">
							<BarChartSimple data={data.donationCount} options={barChartOptions} />
						</div>
					</div>
				</div>
				<div class="flex flex-col shadow-xl w-4/12 rounded-3xl p-4 bg-white">
					<div class="pl-2">
						<p class="text-2xl font-bold">คิวการบริจาคเลือด</p>
						<p class="text-lg text-[#888] font-bold">
							จำนวนคิดทั้งหมด: {data.allReservation.length}
						</p>
					</div>
					<div class="flex bg-white rounded-3xl h-5/6 w-[305px] px-4 py-4">
						<Table.Root class="bg-white rounded-full">
							<Table.Header>
								<Table.Row>
									<Table.Head>คิวบริจาคที่</Table.Head>
									<Table.Head>ชื่อ-นามสกุล</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each data.allReservation as reservation}
									<Table.Row>
										<Table.Cell>{reservation.id.slice(-5)}</Table.Cell>
										<Table.Cell
											>{reservation.Donator.first_name +
												' ' +
												reservation.Donator.last_name}</Table.Cell
										>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
