<script lang="ts">
	import type { PageData } from './$types';
	import bloodPromptIconRedBg from '$lib/images/bloodprompt-logo-red-bg.png';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Eye, EyeOff, KeyRound, Smartphone } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	let showPassword: boolean = false;

	let data: PageData;

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};
</script>

<svelte:head>
	<title>เข้าสู่ระบบ | BloodPrompt</title>
</svelte:head>

<div class="p-10 px-8">
	<p class="text-[#EF4444] font-bold text-xl">ยินดีต้อนรับเข้าสู่ BloodPrompt</p>
	<p class="text-[#555555] mt-1">มีบัญชีผู้ใช้แล้ว ? เข้าสู่ระบบเลย...</p>

	<div class="my-10">
		<img src={bloodPromptIconRedBg} alt="bloodprompt icon" />
	</div>

	<div class="flex flex-col gap-6">
		<div class="flex flex-row items-center relative">
			<Smartphone class="absolute ml-4" />
			<Input
				type="number"
				class="w-full py-6 rounded-xl border-2 pl-12 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="เบอร์โทรศัพท์"
			/>
		</div>

		<div class="flex flex-row items-center relative">
			<KeyRound class="absolute ml-4 w-5" />
			<Input
				type={`${showPassword ? 'text' : 'password'}`}
				class="w-full py-6 rounded-xl border-2 pl-12 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="รหัสผ่าน"
			/>
			{#if !showPassword}
				<button class="absolute right-4" on:click={toggleShowPassword}>
					<EyeOff class=" w-6" />
				</button>
			{:else}
				<button class="absolute right-4" on:click={toggleShowPassword}>
					<Eye class=" w-6" />
				</button>
			{/if}
		</div>

		<p class="underline text-[#F5222D] w-full text-right pr-2">ลืมรหัสผ่าน ?</p>

		<Button
			variant="secondary"
			class="w-full rounded-xl py-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
		>
			เข้าสู่ระบบ
		</Button>
	</div>

	<div class="flex items-center my-6 gap-2">
		<hr class="flex-grow" />
		<span class="text-gray-600">หรือดำเนินการต่อด้วย</span>
		<hr class="flex-grow" />
	</div>

	<Button
		variant="secondary"
		class="w-full rounded-xl py-6 text-md font-bold flex flex-row items-center gap-2 bg-white border-[#E5E7EB] border-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="24"
			height="24"
			viewBox="0 0 48 48"
		>
			<path
				fill="#FFC107"
				d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
			/><path
				fill="#FF3D00"
				d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
			/><path
				fill="#4CAF50"
				d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
			/><path
				fill="#1976D2"
				d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
			/>
		</svg>
		เข้าสู่ระบบ Google Account
	</Button>

	<p class="w-full text-center mt-4 gap-2 flex items-center justify-center">
		ยังไม่มีบัญชีผู้ใช้ ? <a class="text-[#F5222D] underline p-0 text-md" href="/register">
			สมัครเข้าใช้งาน
		</a>
	</p>
</div>
