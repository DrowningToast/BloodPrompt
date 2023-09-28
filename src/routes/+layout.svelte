<script>
	import './styles.css';

	import { navigating } from '$app/stores';
	import {
		currentRoute,
		isHistoryRoute,
		isHomeRoute,
		isReservationRoute,
		isRewardRoute
	} from '$lib/stores/routeStores';

	$: if ($navigating) handleRouteChange();

	const handleRouteChange = () => {
		const pathname = $navigating?.to?.url.pathname;
		currentRoute.set(pathname || '/home');
		if (pathname?.includes('home')) {
			isHomeRoute.set(true);
			isReservationRoute.set(false);
			isHistoryRoute.set(false);
			isRewardRoute.set(false);
		} else if (pathname?.includes('reservation') && !pathname?.includes('history')) {
			isHomeRoute.set(false);
			isReservationRoute.set(true);
			isHistoryRoute.set(false);
			isRewardRoute.set(false);
		} else if (pathname?.includes('history') && !pathname?.includes('reward')) {
			isHomeRoute.set(false);
			isReservationRoute.set(false);
			isHistoryRoute.set(true);
			isRewardRoute.set(false);
		} else if (pathname?.includes('reward')) {
			isHomeRoute.set(false);
			isReservationRoute.set(false);
			isHistoryRoute.set(false);
			isRewardRoute.set(true);
		}
	};
</script>

<div>
	<!-- <Header /> -->

	<main class="min-h-screen relative">
		<slot />
	</main>

	<!-- <footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
</div>
