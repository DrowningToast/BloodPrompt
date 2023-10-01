<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import {
		CheckCircle2,
		ChevronLeft,
		ChevronRight,
		Info,
		MapPin,
		RefreshCcw,
		Star,
		XCircle
	} from 'lucide-svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { toDateTimeString } from '$lib/utils';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import { trpc } from '$lib/trpc';

	export let data: PageData;
	const { donationHistoryData, placeData, donationHistoryId, questions } = data;

	console.log(questions);

	interface Answers {
		[key: string]: {
			[key: string]: boolean;
		};
	}

	let answers: Answers = {
		...questions.reduce((prev, current) => {
			return {
				...prev,
				[current.id]: {
					...current.Survey_Choices.reduce((prev, current) => {
						return { ...prev, [current.id]: false };
					}, {})
				}
			};
		}, {})
	};

	let isAnswerAllQuestion: boolean = false;
	let isNormal = false;
	let showSurveyResultDialog: boolean = false;

	const handleAnswerChange = (questionId: string) => (event: string | undefined) => {
		if (!event) return;
		if (!event) return;
		answers = {
			...answers,
			[questionId]: {
				[event]: true
			}
		};
		// isAnswerAllQuestion = answers;
		isAnswerAllQuestion = Object.entries(answers).every((answer) => {
			const hasSelected = Object.values(answer[1]).some((value) => value === true);
			return hasSelected;
		});
	};

	const handleSubmit = async () => {
		const payload = Object.entries(answers).map((pair) => {
			const questionId = pair[0];
			const choiceId = Object.keys(pair[1])[0];
			return {
				question_id: questionId,
				choice_id: choiceId
			};
		});

		console.log(payload);

		// showSurveyResultDialog = true;
	};

	let rating: undefined | number = undefined;
	const handleOnChangeRating = (x: number) => {
		rating = x;
	};
</script>

{#if isNormal}
	<AlertDialog
		open={showSurveyResultDialog}
		title="ผลการทำแบบประเมินของคุณ: อาการปกติ"
		description="อาการหลังบริจาคเลือดของคุณอยู่ในเกณฑ์ปกติ อย่างไรก็ตามหากเกิดอาการผิดปกติ หรือน่าสงใจว่าจะเกิดมาจากการบริจาคเลือด โปรดติดต่อโรงพยาบาล หรือสถานที่ๆ คุณเข้ารับการบริจาคทันที"
		actionLabel="เสร็จสิ้น"
		onAction={() => {
			showSurveyResultDialog = false;
			goto('/history');
		}}
	/>
{:else}
	<AlertDialog
		open={showSurveyResultDialog}
		title="ผลการทำแบบประเมินของคุณ: มีอาการผิดปกติ น่ากังวล"
		description="อาการหลังบริจาคเลือดของคุณอยู่ในมีอาการผิดปกติ / น่ากังวล หากสังเกตุอาการแล้วยังไม่ดีขึ้น โปรดติดต่อโรงพยาบาล หรือสถานที่ๆ คุณเข้ารับการบริจาคทันที"
		actionLabel="เสร็จสิ้น"
		onAction={() => {
			showSurveyResultDialog = false;
			goto('/history');
		}}
	/>
{/if}

<div class="pb-24">
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
		<p class="text-md font-bold">แบบประเมินหลังการบริจาคเลือด</p>
	</div>

	<div class="p-6">
		<Card.Root class="w-full rounded-xl shadow">
			<Card.Content class="p-0 py-4">
				<div class="px-4 py-1 pb-0">
					<div class="flex flex-row items-center gap-2">
						<Info size={20} />
						<p class="text-sm font-bold">ข้อมูลการเข้ารับบริจาคเลือด</p>
					</div>

					<div class="mx-1">
						<div class="mt-4">
							<p class="text-slate-500 text-sm">การบริจาคเลือดเลชที่</p>
							<p class="font-bold text-sm">{donationHistoryId}</p>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">ทำการบริจาคเมื่อ</p>
							<p class="font-bold text-sm">{toDateTimeString(donationHistoryData?.created_at)}</p>
						</div>

						<div class="flex flex-row items-center gap-14">
							<div class="mt-4">
								<p class="text-slate-500 text-sm">สถานะการบริจาค</p>
								<p class="font-bold text-sm flex flex-row items-center gap-1">
									{#if donationHistoryData?.status === 'SUCCESS'}
										<p>บริจาคสำเร็จ</p>
										<CheckCircle2 size={16} />
									{:else if donationHistoryData?.status === 'FAILED'}
										<p>บริจาคไม่สำเร็จ</p>
										<XCircle size={16} />
									{:else if donationHistoryData?.status === 'WAIT_BLOOD_QUALITY'}
										<p>รอผลการบริจาค</p>
										<RefreshCcw size={16} />
									{/if}
								</p>
							</div>

							<div class="mt-4">
								<p class="text-slate-500 text-sm">ผลตรวจคุณภาพเลือด</p>
								<p class="font-bold text-sm flex flex-row items-center gap-1">
									{#if donationHistoryData.blood_quality_status === 'QUALIFY'}
										<p>ผ่าน</p>
										<CheckCircle2 size={16} />
									{:else if donationHistoryData.blood_quality_status === 'DISQUALIFY'}
										<p>ไม่ผ่าน</p>
										<XCircle size={16} />
									{:else}
										<p>รอผลการตรวจเลือด</p>
										<RefreshCcw size={16} />
									{/if}
								</p>
							</div>
						</div>

						<div class="mt-4">
							<p class="text-slate-500 text-sm">สถานที่</p>
							<p class="font-bold text-sm">{placeData.name}</p>
						</div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<div class="flex flex-col gap-4 mt-6">
			{#each questions as question}
				<div>
					<Card.Root class="mx-auto rounded-xl shadow">
						<Card.Content class="p-0 py-4">
							<div class="px-6 py-2">
								<p class="text-sm font-bold">{question.order}. {question.title}</p>
								<p class="text-sm font-semibold text-gray-400 mt-1">
									(โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่ ?)
								</p>

								<div class="mt-4">
									<RadioGroup.Root
										value="comfortable"
										onValueChange={handleAnswerChange(question.id)}
									>
										{#each question.Survey_Choices as choice}
											<div class="flex items-center space-x-2">
												<RadioGroup.Item value={choice.id} id={'r1-' + question.id} />
												<Label for={'r1-' + question.id}>ใช่</Label>
											</div>
										{/each}
										<RadioGroup.Input name="spacing" />
									</RadioGroup.Root>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			{/each}
		</div>

		<Card.Root class="w-full rounded-xl shadow mt-4">
			<Card.Content class="p-0 py-4">
				<div class="px-4 py-1 pb-0">
					<div class="flex flex-row items-center gap-2">
						<MapPin size={20} />
						<p class="text-sm font-bold">รีวิวสถานที่ๆ คุณเข้ารับการบริจาคเลือด</p>
					</div>

					<p class="text-slate-500 text-sm mx-1 mt-4">
						ให้คะแนนความพึงพอใจ เกี่ยวกับโรงพยาบาล หรือสถานที่ ๆ คุณเข้ารับบริการ
						(ข้อมูลการให้คะแนนของคุณจะถูกแสดงแก่ผู้ใช้คนอื่น ๆ ยกเว้นข้อมูลส่วนตัว)
					</p>

					<img
						src={placeData.image_src}
						class="w-full object-cover rounded-xl my-5 h-40"
						alt="place_image"
					/>

					<div class="mx-1">
						<div class="mt-4">
							<p class="text-slate-500 text-sm">สถานที่</p>
							<p class="font-bold text-sm">{placeData.name}</p>
						</div>
						<div class="mt-4">
							<p class="text-slate-500 text-sm">ที่อยู่</p>
							<p class="font-bold text-sm">{placeData.address}</p>
						</div>
					</div>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="mt-4 flex flex-row gap-2 justify-center items-center">
					<div class="flex flex-col items-center" on:click={() => handleOnChangeRating(1)}>
						<Star
							class={`${rating !== undefined && rating >= 1 && 'fill-yellow-500 text-yellow-500'}`}
						/>
						<p class={`text-slate-500 text-xs `}>1</p>
					</div>
					<div class="flex flex-col items-center" on:click={() => handleOnChangeRating(2)}>
						<Star
							class={`${rating !== undefined && rating >= 2 && 'fill-yellow-500 text-yellow-500'}`}
						/>
						<p class="text-slate-500 text-xs">2</p>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="flex flex-col items-center" id="3" on:click={() => handleOnChangeRating(3)}>
						<Star
							class={`${rating !== undefined && rating >= 3 && 'fill-yellow-500 text-yellow-500'}`}
						/>
						<p class="text-slate-500 text-xs">3</p>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="flex flex-col items-center" id="4" on:click={() => handleOnChangeRating(4)}>
						<Star
							class={`${rating !== undefined && rating >= 4 && 'fill-yellow-500 text-yellow-500'}`}
						/>
						<p class="text-slate-500 text-xs">4</p>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="flex flex-col items-center" on:click={() => handleOnChangeRating(5)}>
						<Star
							class={`${rating !== undefined && rating >= 5 && 'fill-yellow-500 text-yellow-500'}`}
						/>
						<p class="text-slate-500 text-xs">5</p>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
				</div>
				{#if rating !== undefined}
					<div class="grid place-items-center">
						<span
							on:keydown={() => {
								rating = undefined;
							}}
							on:click={() => {
								rating = undefined;
							}}
							class="text-sm text-center mx-auto text-gray-400 underline underline-offset-2"
							>รีเซ๊ตคะแนนการประเมิน</span
						>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>

		<div class="mt-6">
			<Button
				disabled={!isAnswerAllQuestion}
				on:click={handleSubmit}
				variant="secondary"
				class="w-full flex items-center gap-2 rounded-xl py-6 mt-8 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
			>
				ยืนยันการทำแบบประเมิน
				<ChevronRight />
			</Button>
		</div>
	</div>
</div>
