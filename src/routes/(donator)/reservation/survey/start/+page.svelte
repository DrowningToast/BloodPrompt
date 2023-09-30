<script lang="ts">
	import { browser } from '$app/environment';
	import { CalendarClock, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import AlertDialog from '$lib/components/svelte/alert/AlertDialog.svelte';
	import { trpc } from '$lib/trpc';

	export let data: PageData;
	const { questions } = data;

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
					...current.choices.reduce((prev, current) => {
						return { ...prev, [current.id]: false };
					}, {})
				}
			};
		}, {})
	};

	let isAnswerAllQuestion: boolean = false;
	let isQualified = false;
	let showSurveyResultDialog: boolean = false;

	const handleAnswerChange = (questionId: string) => (event: string | undefined) => {
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
				questionId,
				choiceId
			};
		});

		const pass = await trpc.preFeedback.checkFeedBack.query(payload);

		isQualified = pass;

		showSurveyResultDialog = true;
	};
</script>

{#if isQualified}
	<AlertDialog
		open={showSurveyResultDialog}
		title="ผลการทำแบบประเมินของคุณ: ผ่าน"
		description="คุณผ่านการประเมินความพร้อม และอาการเบื้องต้นก่อนการบริจาคเลือด และสามารถดำเนินการต่อเพื่อจองคิวเพื่อเข้ารับการบริจาคเลือดได้"
		actionLabel="ยกเลิก"
		onAction={() => {
			showSurveyResultDialog = false;
		}}
		secondaryLabel={'ดำเนินการต่อ'}
		onSecondaryAction={() => {
			goto('/reservation');
		}}
	/>
{:else}
	<AlertDialog
		open={showSurveyResultDialog}
		title="ผลการทำแบบประเมินของคุณ: ไม่ผ่าน"
		description="คุณไม่ผ่านการประเมินความพร้อม และอาการเบื้องต้นก่อนการบริจาคเลือด คุณสามารถประเมินอาการเป็นระยะ ๆ หรือทิ้งช่วงอย่างน้อย 3-6 เดือน ก่อนการบริจาคเลือดครั้งถัดไป"
		actionLabel="กลับหน้าหลัก"
		onAction={() => {
			showSurveyResultDialog = false;
			goto('/home');
		}}
	/>
{/if}

<div class="pb-32">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					goto('/reservation/survey');
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">แบบประเมินก่อนการบริจาคเลือด</p>
	</div>

	{#each questions as question, index}
		<div class="pt-8 px-6">
			<Card.Root class="mx-auto rounded-xl shadow">
				<Card.Content class="p-0 py-4">
					<div class="px-6 py-2">
						<p class="text-sm font-bold">{index + 1}. {question.label}</p>
						<p class="text-sm font-semibold text-gray-400 mt-1">
							(โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่ ?)
						</p>

						<div class="mt-4">
							<RadioGroup.Root value="comfortable" onValueChange={handleAnswerChange(question.id)}>
								{#each question.choices as choice}
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value={choice.id} id={'r1-' + choice.id} />
										<Label for={'r1-' + choice.id}>{choice.label}</Label>
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

	<div class="px-6">
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
