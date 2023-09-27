<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { FilterIcon, SearchIcon } from 'lucide-svelte';

	interface SearchFilter {
		bloodTypes: Record<BloodType['value'], boolean>;
	}

	interface BloodType {
		value: string;
		label: string;
	}

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
		}, {})
	};
</script>

<div class="relative flex items-center h-12 px-4 pr-6">
	<div class="absolute inset-0">
		<Input
			class="w-full rounded-3xl py-6 px-6 placeholder:text-gray-400 pl-12"
			placeholder="ค้นหารายชื่อผู้ต้องการรับบริจาคเลือด"
		/>
	</div>
	<SearchIcon class="text-gray-400" />
	<button on:click={handleExpand} class="ml-auto text-gray-800 z-10">
		<FilterIcon fill={`${expand ? '#F5222D' : '#ffffff'}`} />
	</button>
	{#if expand}
		<div
			class="absolute bg-white shadow-2xl rounded-2xl px-4 py-6 inset-x-0 -bottom-4 transform translate-y-full"
		>
			<h3 class="font-bold text-black text-lg">ตัวกรองในการค้นหา</h3>
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
