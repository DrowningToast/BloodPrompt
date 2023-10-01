<script lang="ts">
	import {
		Home,
		LogOut,
		CalendarDays,
		UserCircle,
		FileText,
		Gift,
		CalendarHeart,
		Lock,
		PlusCircle,
		Image,
		Info,
		Eye,
		Trash2
	} from 'lucide-svelte';
	import bloodpromptlogo from '$lib/images/bloodprompt-logo.png';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';

	let fileInput: HTMLInputElement;
	let sp_event;
	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			sp_event = e.target.result;
		};
	};
</script>

<div class="flex justify-between bg-gray-300 min-w-screen min-h-[100vh] h-screen w-full">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-full">
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
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
	<div class="flex flex-col justify-center items-center w-9/12 h-auto">
		<div class="w-full h-20 bg-white grid grid-cols-3 items-center justify-center px-8">
			<div class="items-center justify-center flex" />
			<div class="items-center justify-center flex text-2xl font-semibold">{$placeName}</div>
			<div class="items-center justify-end flex gap-2">
				<div class="flex flex-row items-center gap-3">
					<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
					<h1 class="font-bold">{$medicalStaffName}</h1>
					<div>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button
									variant="outline"
									builders={[builder]}
									class="p-0 m-0 border-transparent bg-white hover:bg-white"
									><ChevronDown class="p-0 m-0 fill-black stroke-none" /></Button
								>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="">
								<DropdownMenu.Item class="cursor-pointer">
									<LogOut class="mr-2 h-4 w-4" />
									<div
										on:click={() => {
											if (browser) {
												goto('/staff/login');
											}
										}}
									>
										ออกจากระบบ
									</div>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</div>
			</div>
		</div>
		<!-- content -->
		<div class="flex flex-row items-center justify-between px-14 h-32 w-full">
			<div class="flex flex-col">
				<p class="font-bold text-xl">แก้ไขข้อมูลกิจกรรมพิเศษ</p>
				<p class="text-base text-gray-500">สามารถแก้ไขข้อมูลของกิจกรรมพิเศษจองสถานที่นั้นๆ</p>
			</div>
			<div class="flex justify-between items-center gap-4">
				<Button
					class="flex justify-center gap-2 bg-[#EF4444] rounded-full text-center h-12 w-60 px-10 py-4 text-base font-bold text-white hover:bg-[#EF4444]"
					>บันทึกข้อมูล</Button
				>
				<Button
					class="flex justify-center gap-2 bg-black rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white"
					>ยกเลิกการแก้ไข</Button
				>
			</div>
		</div>
		<div class="flex flex-col justify-start items-center h-full w-full px-14 py-2">
			<div
				class="flex justify-between gap-20 bg-white w-full h-fit rounded-3xl shadow-2xl px-5 py-5"
			>
				<div class="flex flex-col gap-5 w-6/12">
					<div class="flex items-center gap-2">
						<Image class="w-5" />
						<h1 class="font-bold py-2">รูปภาพประกอบ</h1>
					</div>

					<div class="flex flex-col items-center justify-center w-full h-5/6 rounded-3xl">
						{#if sp_event}
							<img class="flex justify-center h-fit w-full rounded-xl" src={sp_event} alt="d" />
						{:else}
							<div
								class="flex flex-col items-center justify-center bg-gray-200 w-full h-full rounded-3xl"
							>
								<p>ยังไม่ได้เลือกรูปภาพ</p>
								<p>(โปรดเลือกอย่างน้อย 1 รูปภาพ)</p>
							</div>
						{/if}
					</div>

					<div class="flex flex-row justify-center items-center w-full gap-5">
						<input
							type="file"
							id="file"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileInput}
							class="hidden"
						/>
						<Button
							class="flex justify-center gap-2 bg-black rounded-full text-center h-[40px] w-[200px] px-10 py-4 text-base font-bold text-white"
							on:click={() => {
								fileInput.click();
							}}>เลือกรูปภาพ</Button
						>
						<Button
							variant="link"
							class="flex justify-center gap-2 rounded-full text-center h-[40px] w-[84px] px-5 py-4 text-base font-bold text-[#EF4444]"
							on:click={() => (sp_event = null)}>ลบรูปภาพ</Button
						>
					</div>
				</div>

				<div class="flex flex-col gap-5 w-6/12">
					<div class="flex items-center gap-2">
						<Info class="w-5" />
						<h1 class="font-bold py-2">ข้อมูลพื้นฐานของกิจกรรมพิเศษนี้</h1>
					</div>
					<Input
						placeholder="ชื่อกิจกรรมพิเศษ"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
					/>
					<Textarea
						placeholder="รายละเอียดกิจกรรมพิเศษ"
						class="rounded-xl border-2 border-gray-300 h-[200px] w-full px-4 py-4 resize-none"
					/>
					<div class="flex gap-3 items-center">
						<CalendarDays class="w-5" />
						<h1 class="font-bold py-2">ระยะเวลากิจกรรม</h1>
					</div>
					<div class="flex items-center gap-2">
						<h1 class="font-bold py-2 w-2/12">ตั้งเเต่</h1>
						<Input
							placeholder="วันเริ่มกิจกกรม"
							class="rounded-xl border-2 border-gray-300 h-[50px] w-6/12 px-4 py-4"
						/>
						<Input
							placeholder="เวลาเริ่มกิจกรรม"
							class="rounded-xl border-2 border-gray-300 h-[50px] w-5/12  /12 px-4 py-4"
						/>
					</div>
					<div class="flex items-center gap-2 justify-start">
						<h1 class="font-bold py-2 w-2/12">จนถึง</h1>
						<Input
							placeholder="วันสิ้นสุดกิจกรรม"
							class="rounded-xl border-2 border-gray-300 h-[50px] w-6/12 px-4 py-4"
						/>
						<Input
							placeholder="เวลาสิ้นสุดกิจกรรม"
							class="rounded-xl border-2 border-gray-300 h-[50px] w-5/12 px-4 py-4"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
