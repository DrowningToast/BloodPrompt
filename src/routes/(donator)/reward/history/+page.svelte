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

	const handleClickRewardHistoryItem = () => {
		const data: RedemptionHistory = {
			rewardData: {
				amount_left: 100,
				created_at: new Date(),
				deleted_at: null,
				description: 'แก้วน้ำอัจฉริยะแห่งศตวรรษที่ 21',
				id: '001',
				image_src:
					'https://i.etsystatic.com/17455023/r/il/b3e17c/3605344456/il_fullxfull.3605344456_9y53.jpg',
				is_available: true,
				name: 'แก้วน้ำลิมิเต็ด',
				place_id: '01',
				required_points: 12000,
				updated_at: null
			},
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
			redemtionData: {
				created_at: new Date(),
				donator_id: '01',
				id: '000001',
				redeem_amount: 1,
				reward_id: '001',
				status: 'REDEEMED',
				updated_at: null,
				used_points: 12000
			}
		};
		selectedRedemptionHistory.set(data);
		goto('/reward/history/' + data.redemtionData.id);
	};
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
							<p class="mt-2 font-bold text-xl">99 ชิ้น</p>
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
			<div on:click={handleClickRewardHistoryItem}>
				<RewardHistoryCard
					name="แก้วน้ำลิมิเต็ด"
					description="แก้วน้ำอัจฉริยะแห่งศตวรรษที่ 21"
					imageSrc="https://i.etsystatic.com/17455023/r/il/b3e17c/3605344456/il_fullxfull.3605344456_9y53.jpg"
					usedPoints={12000}
					redeemDate={new Date()}
					status={'REDEEMED'}
				/>
			</div>
			<RewardHistoryCard
				name="แก้วน้ำลิมิเต็ด"
				description="แก้วน้ำอัจฉริยะแห่งศตวรรษที่ 21"
				imageSrc="https://i.etsystatic.com/17455023/r/il/b3e17c/3605344456/il_fullxfull.3605344456_9y53.jpg"
				usedPoints={12000}
				redeemDate={new Date()}
				status={'RECEIVED'}
			/>
		</div>
	</div>
</div>
