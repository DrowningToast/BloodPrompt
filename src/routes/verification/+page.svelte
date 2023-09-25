<script lang="ts">
	import type { PageData } from './$types';
	import verificationAnimation from '$lib/images/verification/identity_verification.gif';
	import { Button } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let openSkipVerificationDialog: boolean = false;
</script>

<svelte:head>
	<title>ยืนยันตัวตน | BloodPrompt</title>
</svelte:head>

<div class="w-full flex justify-center">
	<AlertDialog
		open={openSkipVerificationDialog}
		title="ข้ามการยืนยันตัวตนหรือไม่ ?"
		description="ยืนยันที่จะข้ามขั้นตอนการยืนยันตัวตนหรือไม่ หากไม่ได้ยืนยันตัวตนคุณอาจใช้งานได้บางคุณสมบัติเท่านั้น"
		actionLabel="ยกเลิก"
		secondaryLabel="ข้ามการยืนยันตัวตน"
		onAction={() => {
			openSkipVerificationDialog = false;
		}}
		onSecondaryAction={() => {
			goto('/home');
		}}
	/>
</div>

<div class="h-full absolute flex flex-col">
	<div class="bg-white shadow-lg p-5 flex items-center justify-center border-b-1">
		<p class="text-md font-bold">ยืนยันตัวตน</p>
	</div>

	<div class="bg-gradient-to-b from-red-300">
		<img src={verificationAnimation} alt="verification_process" class="mx-auto" />
	</div>

	<div class="p-10 px-8 py-6 flex flex-col">
		<div class="flex flex-col gap-4 text-center w-full">
			<p class="text-xl font-bold mb-2">ยืนยันตัวตนด้วยบัตรประชาชน</p>
			<p class="text-sm">
				ยืนยันตัวตนด้วยการแสกนบัตรประชาชนโดยการสแกน
				รูปภาพบัตรประชาชนเพื่อยืนยันตัวตนของผู้ใช้ก่อนที่จะทำ การจองคิวเพื่อรับบริจาคเลือด
			</p>
			<p class="text-sm">
				เพิ่มความถูกต้องและความปลอดภัยในกระบวนการ บริจาคเลือดและเพื่อป้องกันการปลอมแปลงตัวตนของ
				บุคคลที่ไม่มีสิทธิ์ในการบริจาคเลือด
			</p>
		</div>
	</div>
	<div class="mt-auto px-8 pb-20">
		<a href="/verification/start" class="w-full">
			<Button
				variant="secondary"
				class="w-full rounded-xl py-6 mt-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
			>
				เปิดกล้องเพื่อสแกน
			</Button>
		</a>

		<button
			class="underline text-center w-full text-sm mt-4 text-slate-500"
			on:click={() => {
				openSkipVerificationDialog = true;
			}}
		>
			ข้ามขั้นตอนการยืนยันตัวตน
		</button>
	</div>
</div>
