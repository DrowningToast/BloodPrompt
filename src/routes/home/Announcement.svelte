<script lang="ts">
	import { AlertCircleIcon, Verified } from 'lucide-svelte';

	export let imgSrc = `/images/kmitl-logo.png`;
	export let isVerified = false;
	export let title = `โรงพยาบาลคลินิกสถาบันสจล.`;
	export let postedDate: Date | undefined = new Date(1695806865000);
	export let desc =
		'แล็บซาร์ดีนแรงผลักวอลล์ หงวนฟลุกวาซาบิ วิป เป่ายิงฉุบโซลาร์ไมค์ รันเวย์ โรแมนติคกีวีเพรสโพลารอยด์บรรพชนชินบัญชรป๊อก สตริงบอมบ์โบว์อยุติธรรมฟรังก์ เกรย์โรแมนติค เซี้ยวว้อดก้าซัพพลายสึนามิสตูดิโออุตสาหการเวเฟอร์ออร์แกนิก ชาร์ตฮอต ฮ็อตด็อกเวิร์ครอยัลตี้ แพนด้า สปอตเยอบีราการันตีเวเฟอร์ล็อตเมเปิลกรอบรูป';
	export let posterSrc = '/images/mock_announcement_poster.png';

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
	<div class="flex gap-x-4">
		<img class="w-14 h-14" src={imgSrc} alt={imgSrc} />
		<div class="flex flex-col justify-center gap-y-1 font-bold">
			<div class="flex gap-x-2 items-center">
				<h4>{title}</h4>
				<Verified size={20} class="text-sm text-red-900 font-bold" />
			</div>
			<div class="text-gray-500 text-sm">{displayedDate}</div>
		</div>
	</div>
	{#if emergencyBloodType}
		<div
			class="px-8 py-2 text-sm font-bold flex justify-center items-center gap-x-2 bg-red-300 rounded-lg w-full"
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
	<div>
		<img src={posterSrc} alt={posterSrc} />
	</div>
</div>
