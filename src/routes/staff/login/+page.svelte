<script lang="ts">
	import login_background from '$lib/images/moderator/login/login_bacground.png';
	import logo from '$lib/images/moderator/login/bloodprompt-logo.png';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { trpc } from '$lib/trpc';
	import { goto } from '$app/navigation';
	let checked = false;

	let email: string = '';
	let password: string = '';

	const handleLogin = async () => {
		await trpc.auth.staffLogin
			.mutate({ email: email, password: password })
			.then((res) => {
				if (res.session.medical_staff_id) {
					goto('/staff/home');
				} else if (res.session.moderator_id) {
					goto('/moderator/home');
				}
			})
			.catch((error) => {
				alert('ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง');
				console.error(error);
			});
	};
</script>

<div class=" h-[100dvh] flex justify-between">
	<div class="w-1/2">
		<img src={login_background} alt="" class="h-full w-full object-cover" />
	</div>
	<div class="w-1/2 flex items-center justify-center">
		<div class="">
			<div class="flex gap-4 items-center">
				<img src={logo} alt="" class="w-[91px]" />
				<p class="font-bold text-xl">BLOODPROMPT</p>
			</div>
			<!-- section 2 -->
			<div class="flex flex-col pt-12 gap-3">
				<p class="text-xl font-bold">เข้าสู่ระบบ (สำหรับบุคลากรการเเพทย์ เเละผู้ดูเเลระบบ)</p>
				<p class="text-[#555] text-base">
					สำหรับบุคลากรการเเพทย์ กรุณาล็อกอินโดยใช้บัญชีผู้ใช้เเละรหัสผ่าน<br /> ของสถานที่บริจาคเลือดที่ท่านรับผิดชอบ
				</p>
			</div>
			<!-- login -->
			<div class="w-[500px]">
				<!-- username -->
				<div class="pt-16 flex flex-col gap-3">
					<p class="text-base font-bold pl-2">อีเมล (Email)</p>
					<Input type="email" class="w-[500px] border-[3px] rounded-xl h-14" bind:value={email} />
				</div>
				<div class="pt-7 flex flex-col gap-3">
					<p class="text-base font-bold pl-2">รหัสผ่าน (Password)</p>
					<Input
						type="password"
						class="w-[500px] border-[3px] rounded-xl h-14"
						bind:value={password}
					/>
				</div>
				<!-- saved and forget -->
				<div class="flex justify-between pl-2 pt-5 items-center">
					<!-- saved -->
					<div class="flex items-center space-x-2">
						<Checkbox
							id="terms"
							bind:checked
							aria-labelledby="terms-label"
							class="w-8 h-8 flex items-center justify-center rounded-md border-[3px] border-[#e4e4e4]"
						/>
						<Label id="terms-label" for="terms" class="text-base font-bold">
							จดจำการเข้าสู่ระบบ
						</Label>
					</div>
					<div>
						<a href="/moderator/login" class="underline text-[#EF4444]">ลืมรหัสผ่าน ?</a>
					</div>
				</div>
				<button
					on:click={handleLogin}
					class="mt-14 py-4 px-10 w-full text-xl font-bold rounded-3xl bg-[#EF4444] text-[#fff]"
					>เข้าสู่ระบบ</button
				>
			</div>
		</div>
	</div>
</div>
