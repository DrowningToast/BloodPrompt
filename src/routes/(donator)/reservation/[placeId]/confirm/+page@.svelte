<script lang="ts">
	import ReservationHeader from '../../ReservationHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ReservationHeader href="/reservation">ยืนยันการจอง</ReservationHeader>
<img src={``} />
