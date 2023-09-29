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
	import RewardDetails from '$lib/components/svelte/dialog/RewardDetails.svelte';
	import { selectedReward } from '$lib/stores/rewardStores';

	export let data: PageData;
	let showRewardDetailDialog: boolean = false;
</script>

<RewardDetails
	open={showRewardDetailDialog}
	onClose={() => {
		showRewardDetailDialog = false;
	}}
/>

<div class="bg-[#F5222D] h-screen pb-24">
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
				<button
					class="flex text-left"
					on:click={() => {
						selectedReward.set({
							placeData: {
								id: '01',
								name: 'โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร',
								description:
									"สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (King Mongkut's Institute of Technology Ladkrabang) เป็นมหาวิทยาลัยในกำกับของรัฐ ก่อตั้งด้วยความช่วยเหลือของรัฐบาลญี่ปุ่น (มหาวิทยาลัยโตไก) โดยเน้นการเรียนการสอนด้านวิทยาศาสตร์และเทคโนโลยี ตั้งอยู่เขตลาดกระบัง กรุงเทพมหานคร",
								image_src:
									'https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.6435-9/75625360_2708828382511763_3205029120262012928_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeGOqQxnGM18lHXUfqJyW9DEOBRkihhNDX44FGSKGE0NfjS7uhqfp3lMIjdWkpXnd6iyNHxq0ifH0GfTFlfA0PPh&_nc_ohc=j9h9QLsMYgIAX_jfuFK&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfA-v_P2xu40hWBwbC0ZnItdEstjeWUU1JqjvTZFtO4IKg&oe=6539C618',
								phone_number: '0656526769',
								email: '65070219@kmitl.ac.th',
								icon_src: '',
								address: 'ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520, ประเทศไทย',
								opening_day: 'MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY',
								opening_time: 9,
								closing_time: 16.3,
								is_available: true,
								created_at: new Date(new Date().getTime()),
								updated_at: new Date(new Date().getTime()),
								deleted_at: null,
								website_url: 'https://www.it.kmitl.ac.th'
							},
							rewardData: {
								amount_left: 100,
								created_at: new Date(),
								deleted_at: null,
								updated_at: null,
								name: 'เงิน 10,000 บาท',
								description: 'เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้',
								id: '001',
								image_src: 'https://picsum.photos/200/300',
								is_available: true,
								place_id: '01',
								required_points: 200
							}
						});
						showRewardDetailDialog = true;
					}}
				>
					<RewardItemCard
						name={'เงิน 10,000 บาท'}
						description="เงินดิจิตอลจากพรรคเพื่อเธอคนไทยมีกินมีใช้"
						imageSrc={rewardMockImage}
						requirePoints={200}
						rewardId="001"
					/>
				</button>

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
