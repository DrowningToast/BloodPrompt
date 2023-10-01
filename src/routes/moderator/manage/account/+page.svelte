<script lang="ts">
	import {
		Home,
		LogOut,
		Info,
		UserCircle,
		UserCircle2,
		KeyRound,
		MapPin,
		Lock
	} from 'lucide-svelte';
	import bloodpromptlogo from '$lib/images/staff/bloodprompt-logo.png';
	import { Input } from '$lib/components/ui/input';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import type { Moderators } from '../../../../../generated-zod';
	import { trpc } from '$lib/trpc';
	import Dropdown from '../../home/dropdown.svelte';

	export let data: PageData;
	const { moderator } = data;

	let moderatorData = {
		name: moderator.first_name + ' ' + moderator.last_name,
		phone_number: moderator.phone_number,
		email: moderator.email,
		password: '',
		newPassword: '',
		confirmNewPassword: ''
	};

	const handleUpdateModeratorData = async () => {
		const [first_name, last_name] = moderatorData.name.split(' ');
		trpc.moderator.update
			.mutate({
				data: {
					first_name: first_name,
					last_name: last_name,
					phone_number: moderatorData.phone_number,
					email: moderatorData.email,
					password: moderatorData.newPassword
				},
				moderatorId: moderator.id
			})
			.then((res) => {
				alert('ระบบบันทึกการเปลี่ยนแปลงของคุณแล้ว');
			})
			.catch((error) => {
				console.error(error);
			});

		const newModeratorData = await trpc.moderator.get.query();
		moderatorData = {
			name: newModeratorData.first_name + ' ' + newModeratorData.last_name,
			phone_number: newModeratorData.phone_number,
			email: newModeratorData.email,
			password: '',
			newPassword: '',
			confirmNewPassword: ''
		};
	};
</script>

<div class="flex flex-row w-full justify-between bg-gray-300 min-w-[100vw] min-h-[100vh]">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-100%">
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
							goto('/moderator/home');
						}
					}}><Home class="w-5 h-5 " />หน้าหลัก</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/donation-center');
						}
					}}><MapPin class="w-5 h-5" />จัดการสถานที่รับบริจาคเลือด</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/staff');
						}
					}}><UserCircle2 class="w-5 h-5" />จัดการบัญชีบุคลากรการเเพทย์</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/account');
						}
					}}><Lock class="w-5 h-5" />จัดการบัญชี / เปลี่ยนรหัสผ่าน</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start text-base px-6 py-3 items-center bg-[#191F2F] mb-9"
				><LogOut
					class="mr-2 h-5 w-5 stroke-white"
					on:click={() => {
						if (browser) {
							goto('/login');
						}
					}}
				/>ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="flex flex-col items-center w-9/12 h-full">
		<div class="flex items-center bg-white px-14 w-full py-6 justify-between h-16">
			<h1 class="items-center justify-center flex text-2xl font-semibold">
				BloodPrompt (สำหรับผู้ดูเเลระบบ)
			</h1>
			<div class="flex flex-row items-center gap-3">
				<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
				<h1 class="font-semibold">ศรุตา โทรัตน์</h1>
				<Dropdown />
			</div>
		</div>
		<!-- content -->
		<div class="flex flex-row items-center justify-between px-16 h-32 w-full">
			<div class="flex flex-col">
				<p class="font-bold text-xl">จัดการบัญชีเเละเปลี่ยนรหัสผ่าน</p>
				<p class="text-base text-gray-500">
					ในหน้านี้ผู้ดูเเลระบบสามารถจัดการข้อมูลบัญชี เเละเปลี่ยนรหัสผ่านได้
				</p>
			</div>
			<button
				on:click={handleUpdateModeratorData}
				class="flex justify-center items-center gap-2 bg-[#EF4444] rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white"
				>บันทึกข้อมูล</button
			>
		</div>
		<div class="flex flex-row justify-between bg-white rounded-3xl w-11/12 shadow-xl px-5 py-5">
			<div class="flex flex-col gap-4 w-8/12 px-5">
				<div class=" flex flex-row items-center gap-2">
					<Info class="w-6" />
					<h1 class="font-bold py-2">ข้อมูลสำหรับติดต่อผู้ดูเเลระบบ</h1>
				</div>
				<Input
					placeholder="ชื่อ-นามสกุล"
					class="rounded-lg border-2 border-gray-300 h-10 w-full px-4 py-4"
					bind:value={moderatorData.name}
				/>
				<Input
					placeholder="เบอร์โทรติดต่อ"
					class="rounded-lg border-2 border-gray-300 h-10 w-full px-4 py-4"
					bind:value={moderatorData.phone_number}
				/>
				<Input
					placeholder="อีเมล"
					class="rounded-lg border-2 border-gray-300 h-10 w-full px-4 py-4"
					bind:value={moderatorData.email}
				/>
			</div>
			<div class="flex flex-col gap-4 w-8/12 px-5">
				<div class=" flex flex-row items-center gap-2">
					<KeyRound class="w-6" />
					<h1 class="font-bold py-2">รหัสผ่านสำหรับเข้าสู่ระบบ</h1>
				</div>
				<Input
					placeholder="รหัสผ่านปัจจุบัน"
					class="rounded-lg border-2 border-gray-300 h-10 w-full px-4 py-4 "
					bind:value={moderatorData.password}
				/>
				<Input
					placeholder="รหัสผ่านใหม่"
					class="rounded-lg border-2 border-gray-300 h-10 w-full px-4 py-4 "
					bind:value={moderatorData.newPassword}
				/>
				<Input
					placeholder="ยืนยันรหัสผ่านใหม่"
					class="rounded-lg border-2 border-gray-300 h-10 w-full px-4 py-4 "
					bind:value={moderatorData.confirmNewPassword}
				/>
			</div>
		</div>
	</div>
</div>
