<script lang="ts">
	import type { PageData } from './$types';
	import success from '$lib/images/verification/success.png';
	import { Button } from '$lib/components/ui/button';
	export let data: PageData;
</script>

<div class="bg-[#F5222D] h-screen">
	<div class="p-10 px-8 pt-12 flex flex-col gap-4">
		<p class="text-center font-bold text-white text-2xl">ยืนยันตัวตนสำเร็จ !</p>
		<img src={success} alt="verification_success" class="mt-8 ml-6" />
		<p class="text-white font-semibold text-center mt-8">
			ยืนยันตัวตนสำเร็จ คุณสามารถเข้าใช้งานเว็บแอปพลิเคชั่นได้อย่างเต็มประสิทธิภาพ
		</p>
		<Button
			href="/home"
			variant="outline"
			class="w-full mt-16 rounded-xl py-6 text-md font-bold bg-white text-[#F5222D] active:text-[#F5222D] hover:text-[#F5222D]"
		>
			เริ่มต้นใช้งาน
		</Button>
	</div>
</div>
