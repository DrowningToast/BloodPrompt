<script lang="ts">
	import {
		Home,
		LogOut,
		CalendarDays,
		UserCircle,
		UserCircle2,
		KeyRound,
		MapPin,
		Lock,
		PlusCircle,
		Image,
		Info,
		Eye,
		Trash2
	} from 'lucide-svelte';
	import bloodpromptlogo from '$lib/images/staff/bloodprompt-logo.png';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { TRPCServerlessFunctionHandler } from '$lib/trpc';

	const days = [
		{ value: 'MONDAY', label: 'วันจันทร์' },
		{ value: 'TUESDAY', label: 'วันอังคาร' },
		{ value: 'WEDNESDAY', label: 'วันพุธ' },
		{ value: 'THURSDAY', label: 'วันพฤหัสบดี' },
		{ value: 'FRIDAY', label: 'วันศุกร์' },
		{ value: 'SATURDAY', label: 'วันเสาร์' }
	];

	let fileInput: HTMLInputElement;
	let selectedImage: any;

	let placeData = {
		name: '',
		address: '',
		phone_number: '',
		website: '',
		email: '',
		opening_days: 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY',
		opening_time: '',
		closing_time: ''
	};

	let medicalAccountData = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	let staffAccounts: any[] = [];

	const onFileSelected = (e: any) => {
		if (e.target) {
			let image = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (e) => {
				selectedImage = e.target?.result;
			};
		}
	};

	const handleAddDonationPlace = async () => {
		const place = await TRPCServerlessFunctionHandler.places.create.mutate({
			address: placeData.address,
			closing_time: parseInt(placeData.closing_time),
			name: placeData.name,
			opening_time: parseInt(placeData.opening_time),
			opening_day: placeData.opening_days,
			phone_number: placeData.phone_number,
			website_url: placeData.website,
			email: placeData.email,
			image_src: selectedImage
		});

		TRPCServerlessFunctionHandler.medicalStaff.createMany
			.mutate({
				staffAccounts: staffAccounts,
				placeId: place.id
			})
			.then((res) => {
				alert('สร้างสถานที่รับบริจาคเลือดสำเร็จ !');
				goto('/moderator/manage/donation-center');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const addMedicalStaff = () => {
		const { email, password } = medicalAccountData;
		const [first_name, last_name] = medicalAccountData.name.split(' ');
		staffAccounts = [
			...staffAccounts,
			{
				id: staffAccounts.length === 0 ? 0 : staffAccounts.length,
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: password
			}
		];
		medicalAccountData = {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	};

	const deleteMedicalStaff = (index: number) => {
		const filteredArray = staffAccounts.filter((account) => account.id !== index);
		staffAccounts = [...filteredArray];
	};
</script>

<div class="flex justify-between bg-gray-300 min-w-screen min-h-[100vh] h-full w-full">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-auto">
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
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
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
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/account');
						}
					}}><Lock class="w-5 h-5" />จัดการบัญชี / เปลี่ยนรหัสผ่าน</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9 text-base"
				><LogOut class="mr-2 h-5    w-5 stroke-white" />ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center w-9/12 h-auto">
		<div class="flex items-center bg-white px-14 w-full py-6 justify-between h-16">
			<h1 class=" font-bold text-lg">BloodPrompt (สำหรับผู้ดูเเลระบบ)</h1>
			<div class="flex flex-row items-center gap-3">
				<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
				<h1 class="font-bold">ผู้ดูเเลระบบ</h1>
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
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Item>
								<LogOut class="mr-2 h-4 w-4" />
								<span>ออกจากระบบ</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>
		<!-- content -->
		<div class="flex flex-row items-center justify-between px-14 h-32 w-full">
			<div class="flex flex-col">
				<p class="font-bold text-xl">เพิ่มสถานที่รับบริจาคเลือดใหม่เข้าระบบ</p>
				<p class="text-base text-gray-500">
					โปรดกรอกรายละเอียดเเละข้อมูลเกี่ยวกับสถานที่ใหม่ เพื่อทำการเพิ่มเข้าระบบ
				</p>
			</div>
			<div class="flex justify-between items-center gap-4">
				<Button
					class="flex justify-center gap-2 bg-[#EF4444] rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white hover:bg-[#EF4444]"
					on:click={handleAddDonationPlace}
					><PlusCircle class="fill-white stroke-[#EF4444]" />เพิ่มสถานที่ใหม่</Button
				>
				<Button
					class="flex justify-center gap-2 bg-black rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white"
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/donation-center');
						}
					}}>ยกเลิกการเพิ่ม</Button
				>
			</div>
		</div>

		<div class="flex flex-col justify-center items-center gap-5 h-full w-full px-14">
			<div
				class="flex justify-between gap-20 bg-white w-full h-[581px] rounded-3xl shadow-2xl px-5 py-5"
			>
				<div class="flex flex-col gap-5 w-6/12">
					<div class="flex items-center gap-2">
						<Image class="w-5" />
						<h1 class="font-bold py-2">รูปภาพประกอบของสถานที่</h1>
					</div>

					<div class="flex items-center justify-center w-full h-[200px] rounded-3xl">
						{#if selectedImage}
							<img
								class="flex justify-center h-full w-fit rounded-xl"
								src={selectedImage}
								alt="d"
							/>
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
							class="hidden"
							accept=".jpg, .jpeg, .png"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileInput}
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
							on:click={() => (selectedImage = null)}>ลบรูปภาพ</Button
						>
					</div>

					<div class="flex items-center gap-2 mt-6">
						<CalendarDays class="w-5" />
						<h1 class="font-bold py-2">ข้อมูลการให้บริการของสถานที่</h1>
					</div>

					<Select.Root multiple>
						<Select.Trigger class="h-[50px] w-full border-2 border-gray-300 px-4 py-4 rounded-xl">
							<Select.Value placeholder="กรุณาเลือกวันเปิดทำการของสถานที่" />
						</Select.Trigger>
						<Select.Content>
							{#each days as day}
								<Select.Item value={day.value}>{day.label}</Select.Item>
							{/each}
						</Select.Content>
						<Select.Input name="select" multiple />
					</Select.Root>

					<div class="flex justify-start items-center gap-3">
						<h1 class="font-bold">เปิดตั้งเเต่</h1>
						<Input
							class="w-[166px] h-[50px] border-2 border-gray-300 px-4 py-4 rounded-xl"
							placeholder="เวลาเปิดทำการ"
							bind:value={placeData.opening_time}
						/>
						<h1 class="font-bold">ถึง</h1>
						<Input
							class="w-[166px] h-[50px] border-2 border-gray-300 px-4 py-4 rounded-xl"
							placeholder="เวลาเปิดทำการ"
							bind:value={placeData.closing_time}
						/>
					</div>
				</div>

				<div class="flex flex-col gap-5 w-6/12">
					<div class="flex items-center gap-2">
						<Info class="w-5" />
						<h1 class="font-bold py-2">ข้อมูลพื้นฐานของสถานที่รับบริจาคเลือด</h1>
					</div>
					<Input
						placeholder="ชื่อสถานที่รับบริจาคเลือด"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
						bind:value={placeData.name}
					/>
					<Textarea
						placeholder="ที่อยู่ของสถานที่"
						class="rounded-xl border-2 border-gray-300 h-[200px] w-full px-4 py-4 resize-none"
						bind:value={placeData.address}
					/>
					<Input
						placeholder="เบอร์โทรศัพท์"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
						bind:value={placeData.phone_number}
					/>
					<Input
						placeholder="เว็บไซต์ (ถ้ามี)"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
						bind:value={placeData.website}
					/>
					<Input
						placeholder="อีเมลติดต่อ (ถ้ามี)"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
						bind:value={placeData.email}
					/>
				</div>
			</div>

			<div
				class="flex justify-between gap-20 bg-white w-full h-[382px] rounded-3xl shadow-2xl px-5 py-5"
			>
				<div class="flex flex-col justify-between items-start gap-3 w-6/12 h-full pb-1">
					<div class=" flex flex-row items-center gap-2">
						<KeyRound class="w-6 stroke-2" />
						<h1 class="font-bold py-2">บัญชีบุคลากรการเเพทย์สำหรับจัดการสถานที่บริจาคเลือด</h1>
					</div>
					<Input
						placeholder="ชื่อ-นามสกุล"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
						bind:value={medicalAccountData.name}
					/>
					<Input
						placeholder="อีเมล"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
						bind:value={medicalAccountData.email}
					/>
					<div class="flex w-full justify-end items-center">
						<Input
							type="password"
							placeholder="รหัสผ่าน"
							class="flex flex-row rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4 relative"
							bind:value={medicalAccountData.password}
						/>
						<Eye class="absolute transform -translate-x-4" />
					</div>
					<div class="flex w-full justify-end items-center">
						<Input
							type="password"
							placeholder="ยืนยันรหัสผ่าน"
							class="flex flex-row rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4 relative"
							bind:value={medicalAccountData.confirmPassword}
						/>
						<Eye class="absolute transform -translate-x-4" />
					</div>
					<div class="flex justify-center items-center w-full mt-1">
						<Button class="px-14 py-3 rounded-full" on:click={addMedicalStaff}>เพิ่มบัญชี</Button>
					</div>
				</div>

				<div class="flex w-6/12 h-full rounded-3xl">
					<Table.Root class="bg-white rounded-3xl">
						<Table.Caption>รายการบัญชี</Table.Caption>
						<Table.Header>
							<Table.Row class=" hover:bg-white">
								<Table.Head class="font-bold text-black">หมายเลข</Table.Head>
								<Table.Head class="font-bold text-black">ชื่อ-นามสกุล</Table.Head>
								<Table.Head class=" font-bold text-black">อีเมล</Table.Head>
								<Table.Head class="flex items-center justify-center font-bold text-[#EF4444]"
									>ลบ</Table.Head
								>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each staffAccounts as account, index}
								<Table.Row>
									<Table.Cell>{index + 1}</Table.Cell>
									<Table.Cell>{account.first_name + ' ' + account.last_name}</Table.Cell>
									<Table.Cell>{account.email}</Table.Cell>

									<Table.Cell class="flex flex-row justify-center items-center">
										<Button
											class="flex justify-center items-center h-7 w-7 px-0 py-0 bg-[#EF4444]"
											on:click={() => {
												deleteMedicalStaff(index);
											}}><Trash2 class=" stroke-white h-5 w-5" /></Button
										>
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>
		</div>
	</div>
</div>
