<script lang="ts">
    import sEventImg from '$lib/images/staff/reward/reward1.png';
    import { Home,Megaphone, LogOut, UserCircle, FileText, Gift, CalendarHeart, PlusCircle, History } from 'lucide-svelte';
    import bloodPromptLogo from '$lib/images/bloodprompt-logo.png';
    import { Button } from "$lib/components/ui/button";
	import Reward from './reward.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Dropdown from '../../../moderator/home/dropdown.svelte';
	import type { PageData } from './$types';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';
	export let data: PageData;
	let rewards = data.filteredRewards;
</script>

<div class="flex flex-row w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh]">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-100%">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodPromptLogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full min-h-screen justify-between h-full">
			<div class="flex flex-col gap-8 w-full">
				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                    on:click={()=>{
                        if (browser) {
                        goto('/staff/home')
                    }}}
				><Home class="w-5 h-5 " />หน้าหลัก</Button>
				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                    on:click={()=>{
                        if (browser) {
                        goto('/staff/manage/announcement')
                    }}}
				><Megaphone  class="w-5 h-7 pb-[2px] " />จัดการประกาศประชาสัมพันธ์</Button>
				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reservation');
						}
					}}><FileText class="w-5 h-5" />การจองคิว</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reward');
						}
					}}><Gift class="w-5 h-5" />จัดการรางวัล</Button
				>

				<Button
					class="flex justify-start items-center gap-3 text-base hover:bg-[#191F2F] bg-[#191F2F] rounded-full text-start px-6 py-4 h-12 text-white"
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
	<div class="flex flex-col items-center w-9/12 h-full">
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
		<div class="flex w-full justify-between px-9">
			<div class="flex flex-col gap-3 mt-10">
				<p class="text-2xl font-bold">จัดการของรางวัล</p>
				<p class="text-xl text-[#888]">สามารถจัดการของรางวัล รายละเอียด แต้มที่ใช้แลก</p>
			</div>
			<div class="flex gap-4 mt-16">
				<Button
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reward/history');
						}
					}}
					class="flex gap-2 w-60 h-12 bg-[#000] hover:bg-[#000] rounded-3xl font-semibold"
					><History />ประวัติการแลกของรางวัล</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reward/add');
						}
					}}
					class="flex gap-2 w-60 h-12 bg-[#EF4444] hover:bg-[#EF4444] rounded-3xl font-semibold"
					><PlusCircle />เพิ่มของรางวัล</Button
				>
			</div>
		</div>
		<div class="w-full h-full px-9">
			<div class="flex gap-8 w-full bg-white mt-4 rounded-3xl p-6 flex-wrap">
				<!-- #each -->
				<div class="flex w-full h-1/2 justify-between flex-wrap">
					{#each rewards as eachReward, i (i)}
						<div class="flex w-1/2">
							<Reward data={eachReward} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>