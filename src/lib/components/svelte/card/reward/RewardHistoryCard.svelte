<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import rewardImage from '$lib/images/reward/reward.png';
	import { Separator } from '$lib/components/ui/separator';

	export let redeemHistoryId: string = '';
	export let imageSrc: string = '';
	export let name: string;
	export let description: string = '';
	export let redeemDate: Date | null = null;
	export let usedPoints: number = 0;
	export let status: string = '';
</script>

<Card.Root>
	<Card.Content class="p-4 rounded-xl shadow">
		<div>
			<div class="flex flex-row gap-6">
				<img src={imageSrc} alt="reward_image" class=" object-cover w-16 h-16" />
				<div>
					<p class="font-bold">{name}</p>
					<p class="text-sm text-gray-500">{description}</p>
					<div class="flex flex-row items-center gap-1 mt-1">
						<img src={rewardImage} alt="reward_icon_image" class="w-6" />
						<p class="text-sm text-gray-500">{usedPoints} แต้ม</p>
					</div>
				</div>
			</div>

			<Separator class="mt-2" />

			<div class="py-4 px-2 pb-0 flex flex-row justify-between text-sm">
				<div>
					<p>สถานะ</p>
					{#if status === 'RECEIVED'}
						<p class="font-bold text-green-600">ได้รับของแล้ว</p>
					{:else if status === 'SHIPPED'}
						<p class="font-bold text-blue-600">จัดส่งของแล้ว</p>
					{:else if status === 'REDEEMED'}
						<p class="font-bold text-blue-600">แลกของรางวัลแล้ว</p>
					{:else if status === 'CANCELLED'}
						<p class="font-bold text-red-600">ยกเลิกการแลก</p>
					{/if}
				</div>

				<div>
					<p>วันที่ทำรายการ</p>
					<p class="font-bold">{redeemDate?.toLocaleDateString('th')}</p>
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
