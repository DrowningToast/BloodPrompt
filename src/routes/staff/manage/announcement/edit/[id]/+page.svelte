<script lang="ts">
	import {
		Home,
		LogOut,
		CalendarHeart,
		FileText,
		UserCircle,
		Gift,
		PlusCircle,
		Image,
		Info,
		Megaphone
	} from 'lucide-svelte';
	import bloodpromptlogo from '$lib/images/bloodprompt-logo.png';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';
	import Dropdown from '../../../../../moderator/home/dropdown.svelte';
	import { medicalStaffName, placeName } from '$lib/stores/staffStores';
	import type { PageData } from './$types';

	export let data: PageData;
	const { announcement } = data;

	let fileInput: HTMLInputElement;
	let imageSeleceted: any = announcement?.image_src;
	const onFileSelected = (e: any) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			imageSeleceted = e.target?.result;
		};
	};

	let name = announcement?.title;
	let description = announcement?.content;
	let image_src = announcement?.image_src;

	let selctedRhValue = announcement?.blood_type?.split('_')[1].toLowerCase();
	let selectedBloodType = announcement?.blood_type?.split('_')[0].toLowerCase();

	const types = [
		{ value: 'normal', label: 'แบบทั่วไป' },
		{ value: 'emergency', label: 'แบบฉุกเฉิน' }
	];
	let isEmergency: boolean;
	isEmergency = announcement?.post_type === 'EMERGENCY' ? true : false;

	let bloodRhValue: string | undefined | any = selctedRhValue;
	let bloodTypesValue = {
		a: selectedBloodType === 'a' ? true : false,
		b: selectedBloodType === 'b' ? true : false,
		o: selectedBloodType === 'o' ? true : false,
		ab: selectedBloodType === 'ab' ? true : false
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

	const handleDeleteAnnouncement = async () => {
		trpc.announcement.delete
			.query({ announcementId: announcement?.id || '' })
			.then(() => {
				alert('ระบบลบประกาศของคุณแล้ว');
				goto('/staff/manage/announcement');
			})
			.catch((error) => console.error(error));
	};

	const handleUpdateAnnouncement = async () => {
		if (!isEmergency) {
			await trpc.announcement.update
				.mutate({
					data: {
						post_type: 'NORMAL',
						title: name,
						content: description,
						image_src: imageSeleceted
					},
					announcementId: announcement?.id || ''
				})
				.then(() => {
					alert('แก้ไขประกาศเรียบร้อยแล้ว');
					goto('/staff/manage/announcement');
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			await trpc.announcement.update
				.mutate({
					data: {
						blood_type: (selectedBloodType + '_' + bloodRhValue).toUpperCase(),
						post_type: 'EMERGENCY',
						title: name,
						content: description,
						image_src: imageSeleceted
					},
					announcementId: announcement?.id || ''
				})
				.then(() => {
					alert('แก้ไขประกาศเรียบร้อยแล้ว');
					goto('/staff/manage/announcement');
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
</script>

<div class="flex justify-between bg-gray-300 max-w-[100vw] min-h-[100vh] w-full">
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
							goto('/staff/home');
						}
					}}><Home class="w-5 h-5 " />หน้าหลัก</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/announcement');
						}
					}}><Megaphone class="w-5 h-7 pb-[2px] " />จัดการประกาศประชาสัมพันธ์</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reservation');
						}
					}}><FileText class="w-5 h-5" />การจองคิว</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/reward');
						}
					}}><Gift class="w-5 h-5" />จัดการรางวัล</Button
				>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={() => {
						if (browser) {
							goto('/staff/manage/special-event');
						}
					}}><CalendarHeart class="w-5 h-5" />จัดการกิจกรรมหรือแคมเปญ</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"
				on:click={() => {
					if (browser) {
						goto('/staff/login');
					}
				}}><LogOut class="mr-2 h-5    w-5 stroke-white" />ออกจากระบบ</Button
			>
		</div>
	</div>
	<div class="flex flex-col w-9/12 items-center h-full">
		<div class="w-full bg-white grid grid-cols-3 items-center justify-center px-8 h-16">
			<div class="items-center justify-center flex" />
			<div class="items-center justify-center flex text-2xl font-semibold">{$placeName}</div>
			<div class="items-center justify-end flex gap-2">
				<div class="flex flex-row items-center gap-1">
					<UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
					<h1 class="font-semibold">{$medicalStaffName}</h1>
					<Dropdown />
				</div>
			</div>
		</div>
		<!-- content -->
		<div class="flex flex-row items-center justify-between px-14 h-32 w-full">
			<div class="flex flex-col">
				<p class="font-bold text-xl">การแก้ไขประกาศประชาสัมพันธ์</p>
				<p class="text-base text-gray-500">สามารถแก้ข้อมูลของการประกาศประชาสัมพันธ์</p>
			</div>
			<div class="flex justify-between items-center gap-4">
				<Button
					on:click={handleUpdateAnnouncement}
					class="flex justify-center gap-2 bg-[#EF4444] rounded-full text-center h-12 w-52 px-4 py-4 text-base font-bold text-white hover:bg-[#EF4444]"
				>
					บันทึกข้อมูล
				</Button>

				<Button
					on:click={() => {
						goto('/staff/manage/announcement');
					}}
					class="flex justify-center gap-2 bg-black rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white"
					>ยกเลิกการแก้ไข</Button
				>

				<Button
					on:click={handleDeleteAnnouncement}
					class="flex justify-center gap-2 bg-black rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white"
					>ลบ</Button
				>
			</div>
		</div>
		<div class="flex flex-col justify-start items-center h-full w-full px-14 py-2">
			<div
				class="flex justify-between gap-20 bg-white w-full h-fit rounded-3xl shadow-2xl px-5 py-5"
			>
				<div class="flex flex-col gap-5 w-6/12">
					<div class="flex items-center gap-2">
						<Image class="w-5" />
						<h1 class="font-bold py-2">รูปภาพประกอบของประกาศประชาสัมพันธ์</h1>
					</div>

					<div class="flex flex-col items-center justify-center w-full h-5/6 rounded-3xl">
						{#if imageSeleceted}
							<img
								class="flex justify-center h-fit w-full rounded-xl"
								src={imageSeleceted}
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
							on:change={(e) => onFileSelected(e)}
							bind:this={fileInput}
							class="hidden"
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
							on:click={() => (imageSeleceted = null)}>ลบรูปภาพ</Button
						>
					</div>
				</div>
				<div class="flex flex-col gap-5 w-6/12">
					<div class="flex items-center gap-2">
						<Info class="w-5" />
						<h1 class="font-bold py-2">ข้อมูลของประกาศประชาสัมพันธ์</h1>
					</div>
					<Select.Root selected={{ value: isEmergency ? 'emergency' : 'normal' }} disabled>
						<Select.Trigger class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4">
							<Select.Value placeholder={isEmergency ? 'แบบฉุกเฉิน' : 'แบบทั่วไป'} />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>ประเภทประกาศประชาสัมพันธ์</Select.Label>
								<Select.Item
									value={'normal'}
									on:click={() => {
										isEmergency = false;
									}}
								>
									{types[0].label}
								</Select.Item>
								<Select.Item
									value={'emergency'}
									on:click={() => {
										isEmergency = true;
									}}
								>
									{types[1].label}
								</Select.Item>
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteFruit" />
					</Select.Root>
					<Input
						bind:value={name}
						placeholder="ชื่อของประกาศประชาสัมพันธ์"
						class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"
					/>
					<Textarea
						bind:value={description}
						placeholder="เนื้อหาของประกาศประชาสัมพันธ์"
						class="rounded-xl border-2 border-gray-300 h-[200px] w-full px-4 py-4 resize-none"
					/>
					{#if isEmergency}
						<div class="flex flex-col gap-5 w-full">
							<div class="flex flex-row w-full border-2 justify-around p-1 rounded-xl gap-1">
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
							<Select.Root
								selected={{ value: selctedRhValue }}
								onSelectedChange={(event) => (bloodRhValue = event?.value || 'positive')}
							>
								<Select.Trigger
									class="h-[50px] w-full py-3 rounded-xl border-2"
									value={bloodRhValue}
								>
									<Select.Value
										class={`${bloodRhValue ? 'text-black' : 'text-gray-400'}`}
										placeholder={selctedRhValue === 'pisitive'
											? 'เลือดบวก (Positive)'
											: 'เลือดลบ (Negative)'}
									/>
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="positive" class="py-4 text-black"
										>เลือดบวก (Positive)</Select.Item
									>
									<Select.Item value="negative" class="py-4 text-black"
										>เลือดลบ (Negative)</Select.Item
									>
								</Select.Content>
							</Select.Root>
						</div>
					{:else}
						<div class="rounded-xl h-[50px] w-full px-4 py-4 bg-white" />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
