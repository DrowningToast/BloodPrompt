<script lang="ts">
	import { AlertCircleIcon, Verified } from 'lucide-svelte';
	import kmitlLogo from '$lib/images/home/kmitl_logo.png';
	import bannerMockImage from '$lib/images/home/annoucement_banner_mock.png';
	import type { PostTypeType } from '../../../../generated-zod';

	export let title: string;
	export let postedDate: Date;
	export let desc: string;
	export let post_type: PostTypeType;
	export let post_img: string | null | undefined = '';
	export let icon_src: string | null | undefined;

	$: displayedDate = postedDate?.toLocaleDateString('th-TH', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	export let emergencyBloodType: undefined | string = undefined;
</script>

<div class="flex flex-col gap-y-6 px-6 py-6">
	<div class="flex gap-x-2">
		<img class="w-12 h-12" src={icon_src ?? ''} alt={`${icon_src} alt`} />
		<div class="flex flex-col justify-center gap-y-1 font-bold">
			<div class="flex gap-x-2 items-center">
				<p class=" font-bold text-sm">{title}</p>
				<Verified size={20} class="text-sm text-red-900 font-bold" />
			</div>
			<div class="text-gray-500 text-xs">{displayedDate}</div>
		</div>
	</div>
	{#if post_type === 'EMERGENCY'}
		<div
			class="px-2 py-3 text-sm font-bold flex justify-center items-center gap-x-2 bg-red-300 rounded-lg w-full"
		>
			<AlertCircleIcon />
			<span>
				ประกาศความต้องการเลือดด่วน: กรุ๊ปเลือด {emergencyBloodType}
			</span>
		</div>
	{/if}
	<p class="text-sm">
		{desc}
	</p>
	{#if post_img?.length}
		<div><img src={post_img} alt={post_img} /></div>
	{/if}
</div>
