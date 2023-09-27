<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		isReservationRoute,
		currentRoute,
		isHistoryRoute,
		isHomeRoute,
		isRewardRoute
	} from '$lib/stores/routeStores';
	import { CalendarClock, FileClock, Gift, Home } from 'lucide-svelte';

	const handleRouteChange = (route: string) => {
		currentRoute.set(route);
		goto(route);
	};
</script>

<div class="rounded-3xl bg-[#F5222D] fixed bottom-4 w-full max-w-[90%]">
	<div class="py-5 flex flex-row gap-4 items-center justify-between px-10 text-white">
		<button
			on:click={() => {
				handleRouteChange('/home');
			}}
		>
			<Home size={28} class={`${$isHomeRoute ? 'text-white' : 'opacity-50'}`} />
		</button>
		<button
			on:click={() => {
				handleRouteChange('/reservation');
			}}
		>
			<CalendarClock size={28} class={`${$isReservationRoute ? 'text-white' : 'opacity-40'}`} />
		</button>
		<button
			on:click={() => {
				handleRouteChange('/history');
			}}
		>
			<FileClock size={28} class={`${$isHistoryRoute ? 'text-white' : 'opacity-50'}`} />
		</button>
		<button
			on:click={() => {
				handleRouteChange('/reward');
			}}
		>
			<Gift size={28} class={`${$isRewardRoute ? 'text-white' : 'opacity-50'}`} />
		</button>
	</div>
</div>
