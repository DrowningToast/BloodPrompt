<script lang="ts">
	import BottomNavBar from '$lib/components/svelte/navbar/BottomNavBar.svelte';
	import { trpc } from '$lib/trpc';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	trpc.auth.getUser
		.query()
		.then((res) => {
			console.log(res);
			if (!res) {
				alert('โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ...');
				goto('/login');
			}
		})
		.catch((error) => console.error(error));
</script>

<div>
	<main>
		<slot />
	</main>

	<div class="max-w-[90%] mx-auto">
		<BottomNavBar />
	</div>
</div>
