<script lang="ts">
	import {
		Home,
		LogOut,
		CalendarDays,
		UserCircle,
		FileText,
		Gift,
		CalendarHeart,
		PlusCircle,
		Image,
		Info,
		Megaphone
	} from 'lucide-svelte';
	import bloodpromptlogo from '$lib/images/bloodprompt-logo.png';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Dropdown from '../../../moderator/home/dropdown.svelte';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';
	import type { PageData } from './$types';
	import { toDateTimeString } from '$lib/utils';

	export let data: PageData;
	const { announcements } = data;
</script>

<div class="flex justify-between bg-gray-300 h-full w-full max-w-[100vw] min-h-screen">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-auto">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodpromptlogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full h-full justify-between">
			<div class="flex flex-col gap-8 w-full">
				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/home');
						}
					}}><Home class="w-5 h-5 " />หน้าหลัก</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
				}}><LogOut class="mr-2 h-5 w-5 stroke-white" />ออกจากระบบ</Button
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
					<h1 class="font-semibold">{$medicalStaffName}</h1>
					<Dropdown />
				</div>
			</div>
		</div>
		<!-- content -->
		<div class="flex flex-row items-center justify-between px-14 h-32 w-full">
			<div class="flex flex-col">
				<p class="font-bold text-xl">ประกาศประชาสัมพันธ์</p>
				<p class="text-base text-gray-500">สามารถจัดการประกาศประชาสัมพันธ์</p>
			</div>
			<div class="flex justify-between items-center gap-4">
				<Button
					class="flex justify-center gap-1 bg-[#EF4444] rounded-full text-center h-12 w-72 px-4 py-4 pl-2 text-base font-bold text-white hover:bg-[#EF4444]"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/announcement/add');
						}
					}}><PlusCircle class="fill-white stroke-[#EF4444]" />เพิ่มประกาศประชาสัมพันธ์</Button
				>
			</div>
		</div>

		<div class="flex justify-center items-start h-full w-full flex-wrap gap-8">
			{#each announcements as announcement}
				<div class="flex flex-col justify-start items-center h-full max-w-[45%]">
					<div
						class="flex flex-col justify-start gap-6 bg-white w-full h-fit rounded-3xl shadow-2xl px-10 py-10"
					>
						<div class="flex justify-between items-center w-full gap-5">
							<div class="flex justify-start items-center gap-5">
								<img
									src={announcement.Place.icon_src}
									alt=""
									class="h-14 w-14 border-2 border-gray-100 rounded-lg px-1 py-1"
								/>
								<div class="flex-col justify-between items-start gap-2">
									<h1 class="text-black text-lg font-semibold">{announcement.Place.name}</h1>
									<p class="text-black text-sm">
										{toDateTimeString(new Date(announcement.created_at))}
									</p>
								</div>
							</div>
							{#if announcement.Place.name === $placeName}
								<Button
									class="flex justify-center items-center gap-1 bg-white rounded-full text-center h-10 w-20 px-4 py-4 text-base font-bold text-[#EF4444] hover:bg-white border-[#EF4444] border-2"
									on:click={() => {
										if (browser) {
											goto('/staff/manage/announcement/edit/' + announcement.id);
										}
									}}>แก้ไข</Button
								>
							{/if}
						</div>
						<p class="flex justify-start items-start text-base font-normal">
							{announcement.content}
						</p>
						<div class="flex rounded-xl justify-center">
							<img src={announcement.image_src} alt="" class="max-h-60 object-cover rounded-2xl" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
