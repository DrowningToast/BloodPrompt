<script lang="ts">
	import { goto } from '$app/navigation';
	import { TRPCServerlessFunctionHandler } from '$lib/API/TRPC/trpc';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	TRPCServerlessFunctionHandler.auth.getUser
		.query()
		.then((res) => {
			if (!res) {
				alert('โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ...');
				goto('/staff/login');
			}
		})
		.catch((error) => console.error(error));
</script>

<div>
	<main>
		<slot />
	</main>
</div>
