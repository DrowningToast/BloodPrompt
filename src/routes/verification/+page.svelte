<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import verificationAnimation from '$lib/images/verification/identity_verification.gif';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;
</script>

<svelte:head>
	<title>ยืนยันตัวตน | BloodPrompt</title>
</svelte:head>

<div>
	<div class="bg-white shadow-md p-5 flex items-center justify-center">
		<p class="text-md font-bold">ยืนยันตัวตน</p>
	</div>

	<div class="bg-gradient-to-b from-red-300">
		<img src={verificationAnimation} alt="verification_process" />
	</div>

	<div class="p-10 px-8 py-6">
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

		<div class="mt-24">
			<a href="/verification/start">
				<Button
					variant="secondary"
					class="w-full rounded-xl py-6 mt-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
				>
					เปิดกล้องเพื่อแสกน
				</Button>
			</a>

			<a href="/verification/start">
				<p class="text-[##F5222D] underline text-center w-full text-sm mt-6 text-[#F5222D]">
					ข้ามขั้นตอนการยืนยันตัวตน
				</p>
			</a>
		</div>
	</div>
</div>
