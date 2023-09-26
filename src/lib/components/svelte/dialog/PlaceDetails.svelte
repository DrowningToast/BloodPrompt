<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { CalendarClock, Clock, Globe, Mail, MapPin, Phone, Star } from 'lucide-svelte';
	import type { Places } from '../../../../../generated-zod';
	import { Button } from '$lib/components/ui/button';

	export let rating: number = 5.0;
	export let open: boolean = false;
	export let placeData: Places | null = null;
	export let onClose: () => void;

	const getFormattedOpeningDate = () => {
		if (placeData?.opening_day) {
			const result: string[] = [];
			const openingDays = placeData?.opening_day.split(',');
			for (let day of openingDays) {
				if (day === 'SUNDAY') {
					result.push('วันอาทิตย์');
				} else if (day === 'MONDAY') {
					result.push('วันจันทร์');
				} else if (day === 'TUESDAY') {
					result.push('วันอังคาร');
				} else if (day === 'WEDNESDAY') {
					result.push('วันพุธ');
				} else if (day === 'THURSDAY') {
					result.push('วันพฤหัสบดี');
				} else if (day === 'FRIDAY') {
					result.push('วันศุกร์​');
				} else if (day === 'SATURDAY') {
					result.push('วันเสาร์');
				}
			}
			const lastDay = result.pop();
			let temp = result.join(', ');
			temp += ` และ${lastDay}`;
			return temp;
		}
	};
</script>

{#if placeData}
	<Dialog.Root {open} closeOnEscape={false} closeOnOutsideClick={false} onOpenChange={onClose}>
		<Dialog.Content class="max-w-[90vw] rounded-xl p-0">
			<Dialog.Header>
				<img src={placeData.image_src} alt="palce_image" class=" rounded-t-xl" />
				<div class="px-6">
					<div class="flex flex-row justify-between items-stretch mt-2">
						<div class="flex flex-col gap-1 max-w-[75%] text-start">
							<p class="font-bold text-lg">{placeData.name}</p>
							<p class="text-slate-500 text-sm mt-1">{placeData.address}</p>
						</div>
						<a
							href={`https://www.google.com/maps/search/${placeData.name}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<button
								class="bg-[#F5222D] rounded-full w-10 h-10 flex items-center justify-center mt-2"
							>
								<MapPin class="w-6 h-6 text-white" />
							</button>
						</a>
					</div>

					<div class="flex flex-row items-center gap-2 mt-2">
						<div class="flex flex-row gap-1 items-center">
							{#each new Array(5) as _, index}
								{#if index <= rating - 1}
									<Star class="text-yellow-500 fill-yellow-500 w-5" />
								{:else}
									<Star class="text-yellow-500 w-5" />
								{/if}
							{/each}
							<p class="text-slate-500 text-xs">
								<span class="text-[#F5222D] font-bold m-1">{rating}</span> (1933 รีวิว)
							</p>
						</div>
					</div>

					<div class="text-left mt-2">
						<p class="font-bold text-lg">รายละเอียดสถานที่</p>

						<div class="flex flex-col gap-3 mt-2">
							<div class="flex flex-row items-center gap-2">
								<Clock size={20} />
								<p class="text-sm">
									{`เปิดทำการเวลา ${placeData.opening_time.toFixed(
										2
									)} น. - ${placeData.closing_time.toFixed(2)} น.`}
								</p>
							</div>

							<div class="flex flex-row items-center gap-2">
								<CalendarClock size={28} />
								<p class="text-sm">
									{`เปิดทำการทุกวัน ${getFormattedOpeningDate()}`}
								</p>
							</div>

							<div class="flex flex-row items-center gap-2">
								<Phone size={20} />
								<p class="text-sm">
									{`เบอร์โทรติดต่อ ${placeData.phone_number}`}
								</p>
							</div>

							{#if placeData.email}
								<div class="flex flex-row items-center gap-2">
									<Mail size={20} />
									<p class="text-sm">
										{`อีเมล ${placeData.email}`}
									</p>
								</div>
							{/if}

							{#if placeData.website_url}
								<div class="flex flex-row items-center gap-2">
									<Globe size={20} />
									<p class="text-sm">
										{`เว็บไซต์ ${placeData.website_url}`}
									</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</Dialog.Header>

			<Dialog.Footer class="flex w-full justify-end  flex-row p-4">
				<Button class="rounded-2xl bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600 w-24">
					จอง
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}
