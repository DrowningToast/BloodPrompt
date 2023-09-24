<script lang="ts">
	import type { PageData } from './$types';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ChevronLeft, Eye, EyeOff, Loader2, Plus, User } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { th } from 'date-fns/locale';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { Label } from '$lib/components/ui/label';
	import { browser } from '$app/environment';
	import { trpc } from '$lib/trpc';
	import type { BloodType, Gender } from '$lib/server/database';

	let locale = localeFromDateFnsLocale(th);

	let showPassword: boolean = false;
	let isAcceptedTerms: boolean = false;
	let bloodRhValue: string | undefined | any = '';
	let genderButtonsValue = {
		isMale: true,
		isFemale: false
	};
	let bloodTypesValue = {
		a: true,
		b: false,
		o: false,
		ab: false
	};

	let date: any;

	let data: PageData;

	const gender: Gender = 'MALE';
	const blood_type: BloodType = 'A_POSITIVE';
	const donatorData = {
		first_name: '',
		last_name: '',
		dob: '',
		address: '',
		phone_number: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};

	const handleGenderChange = (event: any) => {
		if (event.target.id === 'male') {
			genderButtonsValue = {
				isFemale: false,
				isMale: true
			};
		} else {
			genderButtonsValue = {
				isFemale: true,
				isMale: false
			};
		}
	};

	const handleBloodTypeChange = (event: any) => {
		const target = event.target;
		if (target.id === 'a') {
			bloodTypesValue = {
				a: true,
				b: false,
				o: false,
				ab: false
			};
		} else if (target.id === 'b') {
			bloodTypesValue = {
				a: false,
				b: true,
				o: false,
				ab: false
			};
		} else if (target.id === 'o') {
			bloodTypesValue = {
				a: false,
				b: false,
				o: true,
				ab: false
			};
		} else {
			bloodTypesValue = {
				a: false,
				b: false,
				o: false,
				ab: true
			};
		}
	};

	let isLoading: boolean = false;

	const handleRegister = async () => {
		isLoading = true;

		let selectedBloodType = '';
		if (bloodTypesValue.a) {
			selectedBloodType = 'a';
		} else if (bloodTypesValue.b) {
			selectedBloodType = 'b';
		} else if (bloodTypesValue.o) {
			selectedBloodType = 'c';
		} else if (bloodTypesValue.ab) {
			selectedBloodType = 'ab';
		}

		const blood_type =
			((selectedBloodType + '_' + bloodRhValue).toUpperCase() as BloodType) || 'A_POSITIVE';

		await trpc.donators.signUp
			.mutate({
				donatorData: {
					image_src: '',
					first_name: donatorData.first_name,
					last_name: donatorData.last_name,
					phone_number: donatorData.phone_number,
					gender: gender,
					dob: new Date(date),
					address: donatorData.address,
					email: donatorData.email,
					password: donatorData.password,
					reward_point: 0
				},
				medicalAccountData: {
					blood_type: blood_type,
					account_status: 'UNVERIFIED'
				}
			})
			.then((res) => {
				alert(
					'สมัครสมาชิกสำเร็จ คุณสามารถทำการเข้าสู่ระบบโดยใช้หมายเลขโทรศัพท์ และรหัสผ่านที่ได้ทำการสมัครสมาชิก'
				);
				console.log(res);
			})
			.catch((error) => {
				alert('ไม่สามารถสมัครสมาชิกได้ โปรดตรวจสอบข้อมูลการสมัคร');
				console.log(error);
			})
			.finally(() => {
				isLoading = false;
			});
	};

	const SHEET_SIDES = ['bottom'] as const;
</script>

<div class=" pt-0">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					window.history.back();
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">สร้างบัญชี BloodPrompt</p>
	</div>

	<div class="p-10 px-8 py-6">
		<!-- <div class="text-center flex flex-col gap-2">
			<p>
				ในการเข้าใช้งานแอปพลิเคชั่น จำเป็นต้องมีบัญชีผู้ใช้และข้อมูลในระบบก่อน
				โปรดสร้างบัญชีใหม่เพื่อดำเนินการต่อ
			</p>
		</div> -->

		<div class="flex flex-col justify-center w-full py-6 pt-2 gap-6">
			<div
				class="relative rounded-full w-24 h-24 bg-[#F5222D] mx-auto flex items-center justify-center"
			>
				<User class="w-14 h-14 text-white" />
				<div
					class="absolute bottom-[-0px] right-0 rounded-full w-7 h-7 bg-[#191F2F] flex items-center justify-center"
				>
					<Plus class="w-5 h-5 text-white" />
				</div>
			</div>
			<Input
				type="text"
				class="w-full mt-2 py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="ชื่อ"
				bind:value={donatorData.first_name}
			/>
			<Input
				type="text"
				class="w-full py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="นามสกุล"
				bind:value={donatorData.last_name}
			/>

			<div class="flex flex-row w-full border-2 justify-around p-1 rounded-xl">
				<Button
					variant={`${genderButtonsValue.isMale ? 'destructive' : 'ghost'}`}
					id="male"
					on:click={handleGenderChange}
					class="rounded-xl w-full"
				>
					ชาย
				</Button>

				<Button
					variant={`${genderButtonsValue.isFemale ? 'destructive' : 'ghost'}`}
					id="female"
					on:click={handleGenderChange}
					class="rounded-xl w-full"
				>
					หญิง
				</Button>
			</div>

			<div class="items-center flex flex-row gap-4 w-full justify-around">
				<p>วัน/เดือน/ปีเกิด :</p>
				<DateInput
					bind:value={date}
					{locale}
					closeOnSelection
					format="dd/MM/yyyy"
					placeholder="เลือกวันเกิดของคุณ"
				/>
			</div>

			<div class="flex flex-row w-full border-2 justify-around p-1 rounded-xl">
				<Button
					variant={`${bloodTypesValue.a ? 'destructive' : 'ghost'}`}
					id="a"
					on:click={handleBloodTypeChange}
					class="rounded-xl w-full"
				>
					A
				</Button>

				<Button
					variant={`${bloodTypesValue.b ? 'destructive' : 'ghost'}`}
					id="b"
					on:click={handleBloodTypeChange}
					class="rounded-xl w-full"
				>
					B
				</Button>
				<Button
					variant={`${bloodTypesValue.o ? 'destructive' : 'ghost'}`}
					id="o"
					on:click={handleBloodTypeChange}
					class="rounded-xl w-full"
				>
					O
				</Button>
				<Button
					variant={`${bloodTypesValue.ab ? 'destructive' : 'ghost'}`}
					id="ab"
					on:click={handleBloodTypeChange}
					class="rounded-xl w-full"
				>
					AB
				</Button>
			</div>

			<Select.Root onSelectedChange={(event) => (bloodRhValue = event?.value || 'positive')}>
				<Select.Trigger class="w-full py-6 rounded-xl border-2" value={bloodRhValue}>
					<Select.Value placeholder="กลุ่มหมู่เลือด Rh" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="positive">เลือดบวก (Positive)</Select.Item>
					<Select.Item value="negative">เลือดลบ (Negative)</Select.Item>
				</Select.Content>
			</Select.Root>

			<Textarea
				class="w-full py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="ที่อยู่"
				bind:value={donatorData.address}
			/>

			<Input
				type="text"
				class="w-full py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="เบอร์โทรศัพท์"
				bind:value={donatorData.phone_number}
			/>

			<Input
				type="text"
				class="w-full py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
				placeholder="อีเมล"
				bind:value={donatorData.email}
			/>

			<div class="flex flex-row items-center relative">
				<Input
					type={`${showPassword ? 'text' : 'password'}`}
					class="w-full py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
					placeholder="รหัสผ่าน"
					bind:value={donatorData.password}
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

			<div class="flex flex-row items-center relative">
				<Input
					type={`${showPassword ? 'text' : 'password'}`}
					class="w-full py-6 rounded-xl border-2 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
					placeholder="ยินยันรหัสผ่าน"
					bind:value={donatorData.confirmPassword}
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
		</div>

		<div class="pl-1 justify-start mt-2 items-top flex space-x-2">
			<Checkbox bind:checked={isAcceptedTerms} />
			<div class="grid gap-1.5">
				<Label for="terms1" class="text-sm font-medium leading-none">
					ยอมรับ <span class="underline text-[#F5222D]">เงื่อนไขและข้อตกลงการใช้งาน</span>
				</Label>
				<p class="text-sm text-muted-foreground">
					ข้าพเจ้ายอมรับเงื่อนไขและข้อตกลงทุกประการ และยอมรับว่าเป็นข้อมูลที่ถูกต้องและเป็นความจริง
				</p>
			</div>
		</div>

		<Button
			variant="secondary"
			class="w-full rounded-xl py-6 mt-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
			disabled={!isAcceptedTerms || isLoading}
			on:click={handleRegister}
		>
			{#if isLoading}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			สมัครบัญชีใหม่
		</Button>
		<p class="mt-6 text-center">
			มีบัญชีผู้ใช้แล้ว ? <a href="/login" class="text-[#F5222D] underline"> เข้าสู่ระบบ </a>
		</p>
	</div>
</div>
