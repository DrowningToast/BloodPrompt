<script lang="ts">
	import sEventImg from '$lib/images/staff/manage_specialevent/Rectangle 24.png';
	import {
		Home,
		LogOut,
		UserCircle,
		FileText,
		Gift,
		CalendarHeart,
		CalendarClock
	} from 'lucide-svelte';
	import bloodPromptLogo from '$lib/images/moderator/login/bloodprompt-logo.png';
	import graph_mock from '$lib/images/staff/home/long_graph.png';
	import graphExample from '$lib/images/staff/home/grpah.png';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import Dropdown from '../../moderator/home/dropdown.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';
	const places = [
		{
			name: 'INV001',
			status: 'Paid',
			address: '$250.00',
			contact: 'Credit Card'
		},
		{
			name: 'INV002',
			status: 'Pending',
			address: '$150.00',
			contact: 'PayPal'
		},
		{
			name: 'INV003',
			status: 'Unpaid',
			address: '$350.00',
			contact: 'Bank Transfer'
		},
		{
			name: 'INV004',
			status: 'Paid',
			address: '$450.00',
			contact: 'Credit Card'
		},
		{
			name: 'INV005',
			status: 'Paid',
			address: '$550.00',
			contact: 'PayPal'
		},
		{
			name: 'INV006',
			status: 'Pending',
			address: '$200.00',
			contact: 'Bank Transfer'
		},
		{
			name: 'INV007',
			status: 'Unpaid',
			address: '$300.00',
			contact: 'Credit Card'
		}
	];

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
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/reservation');
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
			<div class="items-center justify-center flex text-2xl font-semibold">โรงพยาบาลลาดกระบัง</div>
			<div class="items-center justify-end flex gap-2">
				<div class="flex flex-row items-center gap-1">
					<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
					<h1 class="font-bold">ศรุตา โทรัตน์</h1>
					<Dropdown />
				</div>
			</div>
		</div>
		<div class="flex flex-col w-full h-full p-7 gap-9">
			<!-- 1 -->
			<div class="flex w-full h-4/12 gap-12">
				<div class="flex w-8/12 rounded-3xl p-11 justify-between items-center shadow-xl bg-white">
					<img src={graphExample} class="" alt="" />
					<div class="flex flex-col gap-8">
						<p class="text-2xl font-bold">จำนวนเลือดในคลังทั้งหมด</p>
						<div>
							<p class="font-semibold text-[#888]">จำนวนเลือดทั้งหมด</p>
							<p>4,444</p>
						</div>
						<div class="flex flex-col gap-11">
							<div class="flex gap-5">
								<p class="font-semibold text-[#888]">หมู่เลือด A :</p>
								<span class="text-xl font-semibold">1111</span>
								<p class="font-semibold text-[#888]">หมู่เลือด O :</p>
								<span class="text-xl font-semibold">1111</span>
							</div>
							<div class="flex gap-5">
								<p class="font-semibold text-[#888]">หมู่เลือด B :</p>
								<span class="text-xl font-semibold">1111</span>
								<p class="font-semibold text-[#888]">หมู่เลือด AB :</p>
								<span class="text-xl font-semibold">1111</span>
							</div>
						</div>
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
						<p class="text-2xl font-bold">สถิติการบริจาคเลือดย้อนหลัง</p>
						<p class="text-lg text-[#888] font-bold">จำนวนการบริจาคเลือดทั้งหมด : 9,999 ครั้ง</p>
					</div>
					<img class="w-full" src={graph_mock} alt="" />
				</div>
				<div class="flex flex-col shadow-xl w-4/12 rounded-3xl p-4 bg-white">
					<div class="pl-2">
						<p class="text-2xl font-bold">คิวการบริจาคเลือดวันนี้</p>
						<p class="text-lg text-[#888] font-bold">จำนวนวันนี้ 100 คิว</p>
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
								{#each places as place}
									<Table.Row>
										<Table.Cell>{place.status}</Table.Cell>
										<Table.Cell>{place.name}</Table.Cell>
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
