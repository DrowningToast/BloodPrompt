<script lang="ts">
	import { Camera, ChevronLeft, Loader2 } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let videoSource: any = null;
	$: step = 1;

	const obtenerVideoCamara = async () => {
		navigator.mediaDevices
			.getUserMedia({
				audio: false,
				video: {
					facingMode: 'environment'
				}
			})
			.then((stream) => {
				videoSource.srcObject = stream;
				videoSource.play();
			})
			.catch(console.error);
	};

	onMount(() => {
		obtenerVideoCamara();
	});
</script>

<div class="bg-red-200 min-h-screen">
	<div class="bg-white shadow-md p-5 flex flex-row items-center justify-start gap-4">
		<button
			on:click={() => {
				if (browser) {
					window.history.back();
				}
			}}
		>
			<ChevronLeft />
		</button>
		<p class="text-md font-bold">ยืนยันตัวตน</p>
	</div>

	<div>
		<div class="p-10 px-8 py-6">
			<div class="text-center mx-auto mt-8">
				<p class="font-bold text-lg mb-2">{step}/2</p>
				<p>
					กรุณาวางบัตร <span class="font-bold">{step == 1 ? 'ด้านหน้า' : 'ด้านหลัง'}</span> ให้อยู่ในกรอบที่กำหนด
				</p>
				<p>โดยเห็นตัวอักษรและข้อมูลบนหน้าบัตรชัดเจน</p>
			</div>

			<div class="min-h-[25vh] bg-white rounded-xl max-w-[90vw] w-full mt-12">
				<!-- svelte-ignore a11y-media-has-caption -->
				<video class="object-cover rounded-xl w-full h-52" bind:this={videoSource} />
			</div>

			<button
				class="bg-[#F5222D] rounded-full w-14 h-14 flex items-center justify-center mx-auto mt-8"
				on:click={() => {
					if (step == 1) {
						step++;
					} else if (step == 2) {
						goto('/verification/success');
					}
				}}
			>
				<Camera class="w-8 h-8 text-white" />
			</button>

			{#if step == 2}
				<div class="mt-8 w-full">
					<a href="/verification/success">
						<Button
							variant="secondary"
							class="w-full rounded-xl py-6 mt-6 text-md font-bold bg-[#F5222D] text-white hover:bg-red-600 active:bg-red-600"
						>
							เสร็จสิ้น
						</Button>
					</a>

					<button
						class="text-[##F5222D] underline text-center w-full text-sm mt-4 text-slate-500"
						on:click={() => {
							if (step == 2) {
								step -= 1;
							}
						}}
					>
						ย้อนกลับ
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
