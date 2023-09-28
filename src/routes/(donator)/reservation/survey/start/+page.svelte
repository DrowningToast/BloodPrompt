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

	export let data: PageData;
	const { questions } = data;

	let answers = {
		q1: null,
		q2: null,
		q3: null,
		q4: null,
		q5: null,
		q6: null,
		q7: null,
		q8: null,
		q9: null,
		q10: null,
		q11: null
	};

	let isAnswerAllQuestion: boolean = false;
	let isQualified = false;
	let showSurveyResultDialog: boolean = false;

	const handleAnswerChange = (event: any) => {
		const key = 'q' + event.split('_')[0];
		const value = event.split('_')[1];
		console.log(value);
		answers = {
			...answers,
			[key]: value
		};
		let isAnswerAll = true;
		for (const [key, value] of Object.entries(answers)) {
			console.log(key, value);
			if (value === null || value === false) {
				isAnswerAll = false;
			}
		}
		isAnswerAllQuestion = isAnswerAll;
	};

	const handleSubmit = () => {
		for (const [key, value] of Object.entries(answers)) {
			console.log(key, value);
			if (value === 'false') {
				isQualified = false;
				break;
			}

			if (key === 'q11' && value === 'true') {
				isQualified = true;
			}
		}
		showSurveyResultDialog = true;
	};
</script>

{#if isQualified}
	<AlertDialog
		open={showSurveyResultDialog}
		title="ผลการทำแบบประเมินของคุณ: ผ่าน"
		description="คุณผ่านการประเมินความพร้อม และอาการเบื้องต้นก่อนการบริจาคเลือด และสามารถดำเนินการต่อเพื่อจองคิวเพื่อเข้ารับการบริจาคเลือดได้"
		actionLabel="ดำเนินการต่อ"
		onAction={() => {
			goto('/reservation');
		}}
		secondaryLabel={'ยกเลิก'}
		onSecondaryAction={() => {
			showSurveyResultDialog = false;
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

	{#each questions as question}
		<div class="pt-8 px-6">
			<Card.Root class="mx-auto rounded-xl shadow">
				<Card.Content class="p-0 py-4">
					<div class="px-6 py-2">
						<p class="text-sm font-bold">{question.id}. {question.label}</p>
						<p class="text-sm font-semibold text-gray-400 mt-1">
							(โปรดเลือกคำตอบตามจริง ใช่ หรือ ไม่ ?)
						</p>

						<div class="mt-4">
							<RadioGroup.Root value="comfortable" onValueChange={handleAnswerChange}>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value={question.id + '_true'} id={'r1-' + question.id} />
									<Label for={'r1-' + question.id}>ใช่</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value={question.id + '_false'} id={'r2-' + question.id} />
									<Label for={'r2-' + question.id}>ไม่ใช่</Label>
								</div>
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
