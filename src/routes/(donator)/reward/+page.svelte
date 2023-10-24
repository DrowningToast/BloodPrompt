<script lang="ts">
	import { browser } from '$app/environment';
	import { ChevronLeft, History, Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import rewardImage from '$lib/images/reward/reward.png';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import RewardItemCard from '$lib/components/svelte/card/reward/RewardItemCard.svelte';
	import { goto } from '$app/navigation';
	import RewardDetails from '$lib/components/svelte/dialog/RewardDetails.svelte';
	import { selectedReward } from '$lib/stores/rewardStores';

	export let data: PageData;
	const { rewards, donator } = data;
	let showRewardDetailDialog: boolean = false;
	let filteredRewards = rewards;
	let searchKeyword = '';

	const handleSearchKeywordChange = (event: any) => {
		if (event.target.value) {
			filteredRewards = rewards.filter((reward) => reward.name.includes(event.target.value));
		} else {
			filteredRewards = rewards;
		}
	};
</script>

<div class="bg-[#F5222D] h-screen pb-32">
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
					{Number(donator?.reward_point).toLocaleString('en')}
					<span class="text-xl">แต้ม</span>
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

		<div class="min-h-screen bg-[#F5F5F5] mt-6 p-6 rounded-t-[36px] pb-32">
			<div>
				<p class="text-lg font-bold">ของรางวัลทั้งหมด</p>

				<div class="flex flex-row items-center relative mt-2">
					<Search class="absolute ml-4 text-slate-400" />
					<Input
						bind:value={searchKeyword}
						on:input={handleSearchKeywordChange}
						type="text"
						class="w-full py-6 bg-[#FFFFFF] border-none shadow rounded-xl border-2 pl-12 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
						placeholder="ค้นหาของรางวัล"
					/>
				</div>
			</div>

			<div class="mt-4 flex flex-col gap-4">
				{#each filteredRewards as reward}
					<button
						class="flex text-left"
						on:click={() => {
							selectedReward.set({
								placeData: {
									id: reward.Place.id,
									name: reward.Place.name,
									description: reward.Place.description,
									image_src: reward.Place.image_src,
									phone_number: reward.Place.phone_number,
									email: reward.Place.email,
									icon_src: reward.Place.icon_src,
									address: reward.Place.address,
									opening_day: reward.Place.opening_day,
									opening_time: reward.Place.opening_time,
									closing_time: reward.Place.closing_time,
									is_available: reward.Place.is_available,
									created_at: new Date(reward.Place.created_at),
									updated_at: new Date(reward.Place.updated_at || ''),
									deleted_at: new Date(reward.Place.deleted_at || ''),
									website_url: reward.Place.website_url
								},
								rewardData: {
									amount_left: reward.amount_left,
									created_at: new Date(reward.created_at),
									deleted_at: null,
									updated_at: new Date(reward.updated_at),
									name: reward.name,
									description: reward.description,
									id: reward.id,
									image_src: reward.image_src,
									is_available: reward.is_available,
									place_id: reward.place_id,
									required_points: reward.required_points
								}
							});
							showRewardDetailDialog = true;
						}}
					>
						<RewardItemCard
							name={reward.name}
							description={reward.description}
							imageSrc={reward.image_src || ''}
							requirePoints={reward.required_points}
							rewardId={reward.id}
						/>
					</button>

					<RewardDetails
						open={showRewardDetailDialog}
						onClose={() => {
							showRewardDetailDialog = false;
						}}
						donatorData={donator}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
