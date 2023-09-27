<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { FilterIcon, SearchIcon } from 'lucide-svelte';
	import type { BloodType, SearchFilter } from './utils';

	let expand = false;
	const handleExpand = () => {
		expand = !expand;
	};

	export let bloodTypes: BloodType[] = [
		{
			value: 'O',
			label: 'กรุ๊ปเลือด O'
		},
		{
			value: 'A',
			label: 'กรุ๊ปเลือด A'
		},
		{
			value: 'B',
			label: 'กรุ๊ปเลือด B'
		},
		{
			value: 'AB',
			label: 'กรุ๊ปเลือด AB'
		}
	];

	export const searchFilter: SearchFilter = {
		bloodTypes: bloodTypes.reduce((prev, bloodType) => {
			return {
				...prev,
				[bloodType.value]: false
			};
		}, {}),
		searchQuery: ''
	};
</script>

<div class="relative flex items-center h-12 px-4 pr-6">
	<div class="absolute inset-0">
		<Input
			on:change
			class="w-full rounded-2xl shadow py-6 px-6 placeholder:text-slate-400 pl-12"
			placeholder="ค้นหาชื่อผู้ต้องการรับบริจาคเลือด"
			bind:value={searchFilter['searchQuery']}
		/>
	</div>
	<SearchIcon class="text-gray-400" />
	<button on:click={handleExpand} class="ml-auto text-gray-800 z-10">
		<FilterIcon fill={`${expand ? '#F5222D' : '#ffff'}`} color={'#F5222D'} />
	</button>
	{#if expand}
		<div
			class="absolute bg-white shadow-2xl rounded-2xl px-4 py-6 inset-x-0 -bottom-4 transform translate-y-full"
		>
			<h6 class="font-bold text-black">ตัวกรองในการค้นหา</h6>
			<hr class="my-4" />
			<div class="flex flex-col gap-y-3">
				<h3 class="text-sm font-medium text-gray-500">กรุ๊ปเลือด</h3>
				{#each bloodTypes as bloodType}
					<div class="flex gap-x-2 items-center">
						<Checkbox bind:checked={searchFilter['bloodTypes'][bloodType.value]} />
						<span>{bloodType.label}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
