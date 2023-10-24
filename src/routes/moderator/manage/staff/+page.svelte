<script lang="ts">
	import bloodpromptlogo from '$lib/images/moderator/login/bloodprompt-logo.png';
	import Dropdown from '../../home/dropdown.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Home, LogOut, UserCircle, UserCircle2, MapPin, Lock, Search } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { TRPCServerlessFunctionHandler } from '$lib/trpc';

	const handleLogout = async () => {
		await TRPCServerlessFunctionHandler.auth.logout
			.mutate()
			.then((res) => {
				goto('/staff/login');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	import type { PageData } from './$types';

	export let data: PageData;
	const { places, medicalAccounts } = data;
	let filteredAccounts = medicalAccounts;

	let selectedStaff = {
		id: '',
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const handleEditStaffAccount = () => {
		const [first_name, last_name] = selectedStaff.name.split(' ');
		TRPCServerlessFunctionHandler.medicalStaff.update
			.mutate({
				medicalStaffId: selectedStaff.id,
				data: {
					first_name,
					last_name,
					password: selectedStaff.password,
					email: selectedStaff.email
				}
			})
			.then((res) => {
				alert('บันทึกการแก้ไขข้อมูลของคุณแล้ว');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	let placeNameValue = '';
</script>

<div class="flex flex-row w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh]">
	<div class="flex flex-col bg-[#191F2F] w-3/12 h-auto">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodpromptlogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full h-full justify-between">
			<div class="flex flex-col gap-8 w-full">
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/home');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><Home class="w-5 h-5 " />หน้าหลัก</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/donation-center');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><MapPin class="w-5 h-5" />จัดการสถานที่รับบริจาคเลือด</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/staff');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><UserCircle2 class="w-5 h-5" />จัดการบัญชีบุคลากรการเเพทย์</Button
				>
				<Button
					on:click={() => {
						if (browser) {
							goto('/moderator/manage/account');
						}
					}}
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><Lock class="w-5 h-5" />จัดการบัญชี / เปลี่ยนรหัสผ่าน</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"
				><LogOut class="mr-2 h-5    w-5 stroke-white" on:click={handleLogout} />ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="flex flex-col items-center w-9/12">
		<div class="flex items-center bg-white px-14 w-full py-6 justify-between h-16">
			<h1 class=" font-bold text-xl">BloodPrompt (สำหรับผู้ดูเเลระบบ)</h1>
			<div class="flex flex-row items-center gap-1">
				<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
				<h1 class="font-semibold">ผู้ดูเเลระบบ</h1>
				<Dropdown />
			</div>
		</div>
		<div class="flex flex-col gap-8 mt-10 w-full h-full items-center">
			<!-- #1 text-1 -->
			<div class="pl-14 flex flex-col gap-2 self-start">
				<p class="text-xl font-bold">จัดการบัญชีบุคลากรการเเพทย์</p>
				<p class="text-[#888] font-semibold">
					จัดการบัญชีบุคลากรการเเพทย์ที่ดูเเลรับผิดชอบในเเต่ละสถานที่รับบริจาคเลือดได้
				</p>
			</div>
			<!-- #2 filter -->
			<div class="flex gap-5 self-start pl-14 justify-between">
				<!-- drop down -->
				<div class="flex flex-col gap-1">
					<p class="font-bold">เเสดงข้อมูลทั้งหมด / เลือกเเสดงตามโรงพยาบาล</p>
					<!-- selector -->
					<Select.Root
						onSelectedChange={(event) => {
							if (!event) {
								return;
							}
							if (event.value && event.value != 'All') {
								filteredAccounts = medicalAccounts.filter((x) => x.Place.name === event.value);
							} else {
								filteredAccounts = medicalAccounts.filter((x) => x.Place.name !== '');
							}
						}}
					>
						<Select.Trigger class="w-[475px] h-[50px] bg-white rounded-xl text-[#888]">
							<Select.Value
								class="text-base"
								placeholder="เเสดงบัญชีบุคลากรการเเพทย์ในระบบทั้งหมด"
							/>
						</Select.Trigger>
						<Select.Content>
							<Select.Item value={'All'}>แสดงทั้งหมด</Select.Item>
							{#each places as place}
								<Select.Item value={place.name}>{place.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<!-- seach -->
				<div>
					<!-- search -->
					<div class="flex flex-col gap-1">
						<p class="font-bold">ค้นหาโดยใช้ชื่อของบุคลากรการเเพทย์</p>
						<!-- search-bar + button -->
						<div class="flex gap-6">
							<input
								type="text"
								placeholder="ระบุชื่อของบุคลากรการเเพทย์เพื่อทำการค้นหา"
								class="bg-white w-[425px] h-[50px] p-5 rounded-xl"
								bind:value={placeNameValue}
							/>
							<!-- button -->
							<Button
								on:click={() => {
									if (placeNameValue) {
										filteredAccounts = medicalAccounts.filter(
											(account) =>
												account.first_name.includes(placeNameValue) ||
												account.first_name.includes(placeNameValue)
										);
									} else {
										filteredAccounts = medicalAccounts;
									}
								}}
								class="flex self-center gap-1 w-[107px] h-11 bg-[#EF4444] hover:bg-[#EF4444] rounded-3xls"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-search"
									><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
								</svg>
								ค้นหา
							</Button>
						</div>
					</div>
				</div>
			</div>
			<!-- Table -->
			<div class="flex justify-center bg-white rounded-3xl w-11/12 h-4/6 shadow-xl px-5 py-5">
				<Table.Root class="bg-white rounded-full">
					<Table.Header>
						<Table.Row>
							<Table.Head class="text-center">รหัสพนักงาน</Table.Head>
							<Table.Head class="text-center">ชื่อ-นามสกุล</Table.Head>
							<Table.Head class="w-[300px] text-center">อีเมลล์</Table.Head>
							<Table.Head class="text-center">สถานบริจาค</Table.Head>
							<Table.Head class="text-center">ข้อมูลเพิ่มเติม</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<!-- Record -->
						{#each filteredAccounts as account}
							<Table.Row class="text-center">
								<Table.Cell>{account.id}</Table.Cell>
								<Table.Cell>{account.first_name + ' ' + account.last_name}</Table.Cell>
								<Table.Cell>{account.email}</Table.Cell>
								<Table.Cell>{account.Place.name}</Table.Cell>
								<Table.Cell class="flex justify-center">
									<!-- Dialog Popup -->
									<Dialog.Root>
										<Dialog.Trigger>
											<button
												on:click={() => {
													const selected = medicalAccounts.find((a) => a.id === account.id);
													if (selected) {
														selectedStaff = {
															id: selected.id,
															name: selected.first_name + ' ' + selected.last_name,
															email: selected.email,
															confirmPassword: '',
															password: ''
														};
													}
												}}
											>
												<Search class="cursor-pointer self-center hover:stroke-[#EF4444]" />
											</button>
										</Dialog.Trigger>
										<Dialog.Content class="w-[805px] h-[545px]">
											<Dialog.Header class="p-0 m-0">
												<Dialog.Title class="flex text-xl gap-1"
													><svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="lucide lucide-settings"
														><path
															d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
														/><circle cx="12" cy="12" r="3" /></svg
													>
													ดูข้อมูล / เเก้ไขบัญชีบุคลากรการเเพทย์</Dialog.Title
												>
											</Dialog.Header>
											<div class="flex flex-col gap-4">
												<Label class="text-left font-bold">ข้อมูลส่วนตัวของบุคลากรการเเพทย์</Label>
												<div class="flex flex-col gap-[10px]">
													<Input
														id="name"
														bind:value={selectedStaff.name}
														class="border-2 rounded-xl"
													/>
													<Input
														id="email"
														bind:value={selectedStaff.email}
														class="border-2 rounded-xl"
													/>
												</div>
												<div class="flex flex-col gap-4 mt-4">
													<Label class="text-left font-bold"
														>ข้อมูลการเข้าสู่ระบบของบุคลากรการเเพทย์</Label
													>
													<div class="flex flex-col gap-[10px]">
														<Input
															id="name"
															type="password"
															class="border-2 rounded-xl"
															bind:value={selectedStaff.password}
														/>
														<Input
															id="username"
															type="password"
															class="border-2 rounded-xl"
															bind:value={selectedStaff.confirmPassword}
														/>
													</div>
												</div>
											</div>
											<Dialog.Footer>
												<Button
													on:click={handleEditStaffAccount}
													type="submit"
													class="rounded-3xl bg-[#EF4444] hover:bg-[#EF4444] text-base font-semibold text-white w-[140px] h-11 "
													>บันทึกข้อมูล</Button
												>
											</Dialog.Footer>
										</Dialog.Content>
									</Dialog.Root>
								</Table.Cell>
							</Table.Row>
						{/each}
						<!-- Finish column information showing -->
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	</div>
</div>
