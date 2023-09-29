<script lang="ts">
	import { CalendarClock, ChevronLeft, ChevronRight, Info } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let isAccepted: boolean = false;
</script>

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
		<p class="text-md font-bold">แบบประเมินก่อนการบริจาคเลือด</p>
	</div>

	<div class="pt-8 px-6">
		<Card.Root class="mx-auto rounded-sxl shadow">
			<Card.Content class="p-0 py-4">
				<div class="px-6 py-2">
					<div class="flex flex-row items-center gap-2">
						<CalendarClock />
						<p class="font-bold">ระบบจองคิวเข้ารับการบริจาคเลือด</p>
					</div>
					<p class="mt-4 text-sm">
						คุณต้องทำแบบประเมินอาการ และความพร้อมก่อนจึงจะสามารถดำเนินการจองคิวเข้ารับบริการได้
						โปรดกรอกข้อมูลตามความจริง
					</p>

					<div class="flex flex-row items-center gap-2 mt-6">
						<Info size={22} />
						<p class="font-bold">เกี่ยวกับการเก็บข้อมูล</p>
					</div>
					<p class="mt-4 text-sm">
						ข้อมูลที่คุณกำลังจะกรอกเป็นข้อมูลด้านการแพทย์ และมีความละเอียดอ่อน
						มีเพียงคุณและบุคลากรการแพทย์สถานที่ปลายทางเท่านั้นที่จะเห็นคำตอบของคุณ
						โปรกรอกข้อมูลตามจริง
						บุคลากรการแพทย์อาจพิจารณายกเลิกการจองของคุณได้ตามดุลยพินิจของเจ้าหน้าที่
					</p>

					<div class="justify-start mt-6 items-top flex space-x-2">
						<Checkbox bind:checked={isAccepted} />
						<div class="grid gap-1.5">
							<Label for="terms1" class="text-sm font-medium leading-none mt-1">
								ข้าพเจ้า <span class="underline text-[#F5222D]">ยินยอมให้ระบบเก็บข้อมูล</span>
							</Label>
							<p class="text-sm text-muted-foreground">
								และหากข้าพเจ้ากรอกข้อมูลอันเป็นเท็จ
								ข้าพเจ้ายินยอมให้บุคลากรการแพทย์สามารถยกเลิกการจองได้ทันที
							</p>
						</div>
					</div>

					<Button
						disabled={!isAccepted}
						on:click={() => {
							goto('/reservation/survey/start');
						}}
						variant="secondary"
						class="w-full flex items-center gap-2 rounded-xl py-6 mt-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
					>
						เริ่มการทำแบบประเมิน
						<ChevronRight />
					</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
