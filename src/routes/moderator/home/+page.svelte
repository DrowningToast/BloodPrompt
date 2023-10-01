<script lang="ts">
	import Dropdown from './dropdown.svelte';
	import AmountCard from './amount.svelte';
	import { Home, LogOut, UserCircle, UserCircle2, MapPin, Lock } from 'lucide-svelte';
	import bloodpromptlogo from '$lib/images/moderator/login/bloodprompt-logo.png';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';
	import type { PageData } from './$types';

	import {
		BarChartSimple,
		DonutChart,
		type BarChartOptions,
		type DonutChartOptions
	} from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data: PageData;

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

	const donutChartOptions: DonutChartOptions = {
		title: 'จำนวนเลือดในคลังทั้งหมด',
		resizable: false,
		legend: {
			alignment: 'center'
		},
		donut: {
			center: {
				label: 'จำนวนครั้งการบริจาคเลือด'
			},
			alignment: 'center'
		},
		height: '400px',

		width: '485px'
	};

	const barChartOptions: BarChartOptions = {
		title: 'สถิติการบริจาคเลือดย้อนหลัง',
		resizable: false,
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				mapsTo: 'group',
				scaleType: 'labels'
			}
		},
		height: '400px',
		width: '485px'
	};
</script>

<div class="flex w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh]">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-100%">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodpromptlogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full h-full justify-between">
			<div class="flex flex-col gap-8 w-full">
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/home');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><Home class="w-5 h-5 " />หน้าหลัก</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/donation-center');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><MapPin class="w-5 h-5" />จัดการสถานที่รับบริจาคเลือด</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/staff');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><UserCircle2 class="w-5 h-5" />จัดการบัญชีบุคลากรการเเพทย์</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/account');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><Lock class="w-5 h-5" />จัดการบัญชี / เปลี่ยนรหัสผ่าน</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"
				on:click={handleLogout}><LogOut class="mr-2 h-5 w-5 stroke-white" />ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="flex flex-col items-center w-9/12">
		<div class="flex items-center bg-white px-14 w-full h-16 py-6 flex-row justify-between">
			<h1 class=" text-xl font-bold">BloodPrompt (สำหรับผู้ดูเเลระบบ)</h1>
			<div class="flex gap-1 items-center">
				<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8"/>
                <h1 class="font-semibold">ผู้ดูเเลระบบ</h1>
				<Dropdown />
			</div>
		</div>
		<div class="flex flex-col gap-11 mt-11 w-full h-full items-center">
			<!-- active info -->
			<div class="flex gap-14 justify-center">
				<AmountCard title={'จำนวนบัญชีผู้ใช้ในระบบ'} amount={data.donators.length} person={true} />
				<AmountCard title={'จำนวนสถานที่ในระบบ'} amount={data.places.length} person={false} />
				<AmountCard
					title={'จำนวนบุคลากรการแพทย์ใช้ในระบบ'}
					amount={data.medicalAccounts.length}
					person={true}
				/>
			</div>
			<!-- graph -->
			<div class="flex flex-row justify-between gap-11">
				<!-- box1 -->

				<div class=" bg-white rounded-xl p-6">
					<DonutChart data={data.bloodTypeCount} options={donutChartOptions} />
				</div>

				<div class=" bg-white rounded-xl p-6">
					<BarChartSimple data={data.donationCount} options={barChartOptions} />
				</div>
				<!-- box2 -->
				<!-- <div class="w-[530px] h-[334px] bg-white rounded-xl">
					<p class="p-5 font-semibold">สถิติการบริจาคเลือดย้อนหลัง</p>
				</div> -->
			</div>
			<!-- place to donate -->
			<div class="flex flex-col bg-white w-[1103px] h-[350px] rounded-xl">
				<p class="pt-6 pl-6 font-semibold">สถานที่บริจาคเลือดในระบบ</p>
				<div class="flex justify-center bg-white rounded-3xl w-12/12 h-5/6 shadow-xl px-4 py-3">
					<Table.Root class="bg-white rounded-full">
						<Table.Caption>เพิ่มข้อมูลของคุณ</Table.Caption>
						<Table.Header>
							<Table.Row class=" hover:bg-white">
								<Table.Head class="font-bold text-black">หมายเลข</Table.Head>
								<Table.Head class="font-bold text-black">ชื่อสถานที่</Table.Head>
								<Table.Head class="font-bold text-black">คำอธิบาย</Table.Head>
								<Table.Head class="font-bold text-black">เบอร์โทร</Table.Head>
								<Table.Head class="font-bold text-black">เว็บไซต์</Table.Head>
								<Table.Head class="font-bold text-black">อีเมล</Table.Head>
								<Table.Head class="font-bold text-black">แก้ไขข้อมูล</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#if data.places}
								{#each data.places as place, index}
									<Table.Row>
										<Table.Cell class="text-center">{index + 1}</Table.Cell>
										<Table.Cell>{place.name}</Table.Cell>
										<Table.Cell>{place.address}</Table.Cell>
										<Table.Cell>{place.phone_number}</Table.Cell>
										<Table.Cell>{place.website_url}</Table.Cell>
										<Table.Cell>{place.email}</Table.Cell>
										<Table.Cell
											><Button
												on:click={() => {
													goto('/moderator/manage/donation-center/' + place.id + '/edit');
												}}>แก้ไข</Button
											></Table.Cell
										>
									</Table.Row>
								{/each}
							{/if}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</div>
	</div>
</div>
