<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { trpc } from '$lib/trpc';

	export let data: any;

	const deleteHandling = () => {
		trpc.reward.delete.mutate(data.id).then(() => {
			window.location.reload();
		});
	};
</script>

<div
	class="flex gap-7 p-4 border-black border-[1.5px] bg-white rounded-3xl shadow-2xl m-2 w-[490px] min-h-[25vh]"
>
	<div class="flex w-5/12 items-center">
		<img src={data.image_src} alt="" class="" />
	</div>
	<div class="flex flex-col w-7/12 gap-7">
		<!-- title + description -->
		<div class="flex flex-col gap-3">
			<p class="text-2xl font-bold">{data.name}</p>
			<p class="">{data.description}</p>
		</div>
		<!-- point+remain -->
		<div class="flex gap-8">
			<!-- point -->
			<div class="flex flex-col gap-1">
				<p class="font-bold">แต้มที่ต้องใช้</p>
				<p>{data.required_points} แต้ม</p>
			</div>
			<!-- remain -->
			<div class="flex flex-col gap-1">
				<p class="font-bold">สินค้าคงเหลือ</p>
				<p>{data.amount_left} ชิ้น</p>
			</div>
		</div>
		<div class="flex justify-start gap-6">
			<Button
				on:click={() => {
					if (browser) goto(`/staff/manage/reward/${data.id}/edit`);
				}}
				class="w-24 h-10 text-[#EF4444] border-[#EF4444] hover:bg-white border-2 gap-1 bg-white rounded-3xl"
				>แก้ไข</Button
			>
			<Button
				on:click={deleteHandling}
				class="w-24 h-10 text-white rounded-3xl bg-[#EF4444] hover:bg-[#EF4444] rounded-3xls"
				>ลบ</Button
			>
		</div>
	</div>
</div>
