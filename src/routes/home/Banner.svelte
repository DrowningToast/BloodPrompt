<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { UserIcon } from 'lucide-svelte';
</script>

<section
	class="w-full h-64 bg-[#F5222D] flex flex-col justify-around items-start px-6 pt-7 pb-12 relative"
>
	<div class="flex gap-4 justify-start items-center">
		<div class="w-[44px] h-11 bg-white rounded-full grid place-items-center">
			<UserIcon />
		</div>
		<span class="text-white font-bold">Hi, Saruta Torat</span>
	</div>
	<Button
		class="rounded-full bg-white text-[#F5222D] w-2/5 max-w-[150px] text-xl px-2 py-3 h-auto"
		href="/donate">จองคิวเลย!</Button
	>
	<img class="absolute bottom-0 right-4" src="/images/hero.svg" alt="hero" />
</section>
