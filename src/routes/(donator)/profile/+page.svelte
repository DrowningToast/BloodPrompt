<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { ChevronLeft, Edit, Loader2, UserIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Button } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import { TRPCServerlessFunctionHandler } from '$lib/trpc';
	import { encodePassword, toDateString } from '$lib/utils';

	export let data: PageData;
	let isLoading: boolean = false;
	let showLogoutConfirmDialog: boolean = false;
	let showEditConfirmDialog: boolean = false;

	let donatorData = {
		...data.user
	};

	let oldPassword = '';
	let newPassword = '';
	let confirmNewPassword = '';

	type UpdateData = {
		address: string;
		email: string;
		password: string | null;
	};

	const handleUpdateUserProfile = async () => {
		showEditConfirmDialog = false;
		isLoading = true;

		if (oldPassword) {
			if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
				await TRPCServerlessFunctionHandler.donators.updateById.mutate({
					data: {
						address: donatorData.address!,
						email: donatorData.email!,
						password: confirmNewPassword
					},
					donatorId: donatorData.id!
				});
			} else {
				isLoading = false;
				return alert('ไม่สามารถเปลี่ยนรหัสผ่านได้ เนื่องจากคุณกรอกรหัสผ่านไม่ครบ หรือไม่ถูกต้อง');
			}
		} else {
			await TRPCServerlessFunctionHandler.donators.updateById.mutate({
				data: {
					address: donatorData.address!,
					email: donatorData.email!
				},
				donatorId: donatorData.id!
			});
		}
		isLoading = false;
		alert('ระบบบันทึกการแก้ไขข้อมูลของคุณแล้ว');
		goto('/home');
	};
</script>

<AlertDialog
	open={showLogoutConfirmDialog}
	title="ออกจากระบบหรือไม่ ?"
	description="ยืนยันที่จะออกจากระบบหรือไม่ คุณสามารถเข้าสู่ระบบใหม่ได้โดยใช้เบอร์โทรศัพท์และรหัสผ่าน"
	actionLabel="ยกเลิก"
	onAction={() => {
		showLogoutConfirmDialog = false;
	}}
	secondaryLabel="ออกจากระบบ"
	onSecondaryAction={() => {
		TRPCServerlessFunctionHandler.auth.logout
			.mutate()
			.then(() => {
				goto('/login');
			})
			.catch((error) => {
				alert('ไม่สามารถออกจากระบบ โปรดลองใหม่อีกครั้ง');
				console.log(error);
			});
	}}
/>

<AlertDialog
	open={showEditConfirmDialog}
	title="บันทึกการแก้ไขหรือไม่ ?"
	description="บันทึกการแก้ไขข้อมูลของคุณหรือไม่"
	actionLabel="ยืนยันการแก้ไขและบันทึก"
	onAction={handleUpdateUserProfile}
	secondaryLabel="ยกเลิก"
	onSecondaryAction={() => {
		showEditConfirmDialog = false;
	}}
/>

<div class=" pb-32">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					goto('/home');
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold overflow-hidden truncate">แก้ไขข้อมูลส่วนตัว</p>
	</div>

	{#if data.user}
		<div class="pt-8 px-6">
			<Card.Root class="mx-auto rounded-xl shadow">
				<Card.Content class="p-0 py-4">
					<div class="px-4 py-2">
						<div class="flex flex-row gap-2 items-center">
							<UserIcon size={20} />
							<p class="font-bold">ข้อมูลส่วนตัวของฉัน</p>
						</div>

						<div class="mt-6 px-1 flex flex-row items-center gap-24">
							<div>
								<p class="text-slate-500">ชื่อ</p>
								<p class="font-bold">{data.user.first_name + ' ' + data.user.last_name}</p>
							</div>

							<div>
								<p class="text-slate-500">เพศ</p>
								<p class="font-bold">{data.user.gender === 'MALE' ? 'ชาย' : 'หญิง'}</p>
							</div>
						</div>

						<div class="mt-4 px-1">
							<p class="text-slate-500">เบอร์โทรศัพท์ (ใช้ในการเข้าสู่ระบบ)</p>
							<p class="font-bold">{data.user.phone_number}</p>
						</div>

						<div class="mt-4 px-1">
							<p class="text-slate-500">วันเดือนปีเกิด</p>
							<p class="font-bold">{toDateString(new Date(data.user.dob))}</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="mt-6 mx-auto rounded-xl shadow">
				<Card.Content class="p-0 py-4">
					<div class="px-4 py-2">
						<div class="flex flex-row gap-2 items-center">
							<Edit size={20} />
							<p class="font-bold">แก้ไขข้อมูลส่วนตัว</p>
						</div>

						<div class="mt-6 px-1 flex flex-col gap-3">
							<p class="text-slate-500">ที่อยู่ (ใช้ในการติดต่อ / ส่งของรางวัล)</p>
							<Textarea rows={5} bind:value={donatorData.address} />
						</div>

						<div class="mt-4 px-1 flex flex-col gap-3">
							<p class="text-slate-500">อีเมล</p>
							<Input bind:value={donatorData.email} />
						</div>

						<div class="mt-4 px-1 flex flex-col gap-3">
							<p class="text-slate-500">รหัสผ่านในการเข้าสู่ระบบ</p>
							<Input placeholder="รหัสผ่านเก่า" bind:value={oldPassword} />
							<Input placeholder="รหัสผ่านใหม่" bind:value={newPassword} />
							<Input placeholder="ยืนยันรหัสผ่านใหม่" bind:value={confirmNewPassword} />
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Button
				on:click={() => {
					showEditConfirmDialog = true;
				}}
				variant="secondary"
				class="w-full rounded-xl py-6 mt-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
			>
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				บันทึกการแก้ไข
			</Button>

			<button
				class="mt-4 text-center underline mx-auto w-full"
				on:click={() => {
					showLogoutConfirmDialog = true;
				}}
			>
				ออกจากระบบ
			</button>
		</div>
	{/if}
</div>
