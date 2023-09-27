<script lang="ts">
	import { browser } from '$app/environment';
	import { ChevronLeft, History, Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import rewardImage from '$lib/images/reward/reward.png';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import RewardItemCard from '$lib/components/svelte/card/reward/RewardItemCard.svelte';
	import rewardMockImage from '$lib/images/reward/reward_mock.png';
	import { goto } from '$app/navigation';

	export let data: PageData;
</script>

<div class="bg-[#F5222D] min-h-screen">
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
		<p class="text-md font-bold">แลกของรางวัล</p>
	</div>

	<div class="pt-8">
		<div class="text-white font-bold px-8 flex flex-row items-center justify-between">
			<div>
				<p class="text-lg">คุณมีแต้มสะสมทั้งหมด</p>
				<p class="text-2xl font-bold mt-1">
					{Number(2500).toLocaleString('en')} <span class="text-xl">แต้ม</span>
				</p>
				<Button
					href="/reward/history"
					variant="outline"
					class="text-sm mt-2 rounded-xl font-bold flex items-center gap-2 bg-white text-[#F5222D] active:text-[#F5222D] hover:text-[#F5222D]"
				>
					<History size={20} />
					ประวัติการแลก
				</Button>
			</div>
			<img src={rewardImage} alt="reward_logo" class=" w-32" />
		</div>

		<div class="h-screen bg-[#F5F5F5] mt-6 p-6 rounded-t-[36px]">
			<div>
				<p class="text-lg font-bold">ของรางวัลทั้งหมด</p>

				<div class="flex flex-row items-center relative mt-2">
					<Search class="absolute ml-4 text-slate-400" />
					<Input
						type="text"
						class="w-full py-6 bg-[#FFFFFF] border-none shadow rounded-xl border-2 pl-12 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
						placeholder="ค้นหาของรางวัล"
					/>
				</div>
			</div>

			<div class="mt-4 flex flex-col gap-4">
				<a href="">
					<RewardItemCard
						name={'เงิน 10,000 บาท'}
						description="เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้"
						imageSrc={rewardMockImage}
						requirePoints={200}
					/>
				</a>

				<a href="">
					<RewardItemCard
						name={'เงิน 10,000 บาท'}
						description="เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้"
						imageSrc={rewardMockImage}
						requirePoints={200}
					/>
				</a>

				<a href="">
					<RewardItemCard
						name={'เงิน 10,000 บาท'}
						description="เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้"
						imageSrc={rewardMockImage}
						requirePoints={200}
					/>
				</a>

				<a href="">
					<RewardItemCard
						name={'เงิน 10,000 บาท'}
						description="เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้"
						imageSrc={rewardMockImage}
						requirePoints={200}
					/>
				</a>

				<a href="">
					<RewardItemCard
						name={'เงิน 10,000 บาท'}
						description="เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้"
						imageSrc={rewardMockImage}
						requirePoints={200}
					/>
				</a>
			</div>
		</div>
	</div>
</div>
