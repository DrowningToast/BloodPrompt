<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	export let rewardId: string = '';
	export let name: string;
	export let description: string;
	export let requirePoints: number;
	export let imageSrc: string = '';
</script>

<Card.Root class="rounded-2xl shadow">
	<Card.Content class="p-4">
		<div class="flex flex-row justify-between gap-2">
			<img src={imageSrc} alt="reward_picture" class="rounded-xl object-cover w-20 h-20" />

			<div class="max-w-[50%]">
				<p class="font-bold break-normal">{name}</p>
				<p class=" text-slate-500 text-sm">{description}</p>
			</div>

			<div class="flex items-end h-full">
				<p class="font-bold text-sm flex h-full">
					{requirePoints.toLocaleString('en')} pts
				</p>
			</div>
		</div>
	</Card.Content>
</Card.Root>
