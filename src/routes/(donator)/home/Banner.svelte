<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { UserIcon } from 'lucide-svelte';
	import heroImage from '$lib/images/home/banner.png';
</script>

<section
	class="w-full h-52 bg-[#F5222D] flex flex-col justify-around items-start px-6 pt-6 pb-12 relative"
>
	<div class="flex gap-4 justify-start items-center">
		<div class="w-[44px] h-11 bg-white rounded-full grid place-items-center">
			<button
				on:click={() => {
					goto('/profile');
				}}
			>
				<UserIcon />
			</button>
		</div>
		<span class="text-white font-bold">ศิลา ภักดีวงษ์</span>
	</div>
	<Button
		variant="outline"
		class="rounded-full font-bold bg-white text-[#F5222D] active:text-[#F5222D] hover:text-[#F5222D] w-2/5 max-w-[150px] px-2 py-3 "
		href="/reservation">จองคิวเลย !</Button
	>
	<img class="absolute bottom-0 right-4 w-44 object-cover" src={heroImage} alt="hero" />
</section>
