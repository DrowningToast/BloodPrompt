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
		<div class="flex flex-row items-end justify-between gap-2">
			<img src={imageSrc} alt="reward_picture" class="object-cover w-14" />

			<div class="max-w-[50%]">
				<p class="font-bold break-normal">{name}</p>
				<p class=" text-slate-500 text-sm">{description}</p>
			</div>

			<p class="font-bold text-sm">
				{requirePoints.toLocaleString('en')} pts
			</p>
		</div>
	</Card.Content>
</Card.Root>
