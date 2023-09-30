<script lang="ts">
	import { browser } from '$app/environment';
	import { ArrowDownWideNarrow, ChevronLeft, Filter } from 'lucide-svelte';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';

	// Images
	import rewardBox from '$lib/images/reward/reward_box.png';
	import rewardleftImage from '$lib/images/reward/reward_history_left.png';
	import rewardRightImage from '$lib/images/reward/reward_history_right.png';
	import RewardHistoryCard from '$lib/components/svelte/card/reward/RewardHistoryCard.svelte';
	import { goto } from '$app/navigation';
	import { selectedRedemptionHistory, type RedemptionHistory } from '$lib/stores/rewardStores';
	import Button from '$lib/components/ui/button/button.svelte';

	const handleClickRewardHistoryItem = (data: any) => {
		selectedRedemptionHistory.set(data);
		goto('/reward/history/' + data.id);
	};

	export let data: PageData;
	const { redemptionHistories } = data;
</script>

<div class="bg-[#F5F5F5] min-h-screen pb-24">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					goto('/reward');
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">ประวัติการแลกของรางวัล</p>
	</div>

	<div class="p-6">
		<Card.Root class="] mx-auto rounded-xl shadow">
			<Card.Content class="p-0 py-4">
				<div>
					<p class="text-center font-bold text-lg">คุณแลกของรางวัลไปแล้วทั้งหมด</p>

					<div class="flex flex-row justify-around text-center items-center mt-2">
						<img src={rewardleftImage} alt="reward_image_left" class=" w-24" />
						<div class="flex flex-col items-center justify-center">
							<img src={rewardBox} alt="reward_image_left" class="w-12" />
							<p class="mt-2 font-bold text-xl">{redemptionHistories.length} ชิ้น</p>
						</div>
						<img src={rewardRightImage} alt="reward_image_right" class="w-24" />
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<div class="w-full mt-4">
			<Select.Root>
				<Select.Trigger
					class="w-full bg-white py-6 pl-12 relative flex items-center text-gray-500 rounded-xl"
				>
					<ArrowDownWideNarrow class="absolute left-4 " />
					<Select.Value placeholder="เรียงลำดับ: รายการใหม่ - เก่า" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="0" class="py-2">รายการใหม่ - เก่า</Select.Item>
					<Select.Item value="1" class="py-2">รายการใหม่ - เก่า</Select.Item>
					<Select.Item value="2" class="py-2">ใช้แต้มสะสมมาก - น้อย</Select.Item>
					<Select.Item value="3" class="py-2">ใช้แต้มสะสมน้อย - มาก</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>

		<div class="items-center flex flex-row justify-between mt-2 mx-2">
			<p>รายการของรางวัล</p>

			<Select.Root>
				<Select.Trigger class="border-none flex flex-row gap-2 w-3/2 pr-0">
					<Filter size={16} />
					<p>ตัวกรอง</p>
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="0" class="py-2">ทั้งหมด</Select.Item>
					<Select.Item value="1" class="py-2">ได้รับแล้ว</Select.Item>

					<Select.Item value="2" class="py-2">จัดส่งแล้ว</Select.Item>
					<Select.Item value="3" class="py-2">ยกเลิก</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>

		<div class="mt-2 flex flex-col gap-4">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#each redemptionHistories as data}
				<div on:click={() => handleClickRewardHistoryItem(data)}>
					<RewardHistoryCard
						name={data.Reward.name}
						description={data.Reward.description}
						imageSrc={data.Reward.image_src || ''}
						usedPoints={data.used_points}
						redeemDate={new Date(data.created_at)}
						status={data.status}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
