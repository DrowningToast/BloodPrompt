<script lang="ts">
	import PlaceCard from '$lib/components/svelte/card/reservation/PlaceCard.svelte';
	import type { PageData } from './$types';
	import PlaceDetails from '$lib/components/svelte/dialog/PlaceDetails.svelte';
	import type { Places } from '../../../../generated-zod';
	import ReservationHeader from './ReservationHeader.svelte';
	import type { HospitalWithReviews } from './utils';
	export let data: PageData;

	const hospitals = data.hospitals;

	let isShowPlaceDetailsDialog: boolean = false;
	let selectedPlace: HospitalWithReviews | undefined = undefined;

	const handleShowPlaceDetailsDialog = (hospital: HospitalWithReviews) => () => {
		selectedPlace = hospital;
	};

	$: console.log(selectedPlace);
</script>

<div class="pb-24">
	<ReservationHeader href="/home">จองคิวรับบริจาคเลือด</ReservationHeader>
	<!-- Dialog -->
	<PlaceDetails
		placeData={selectedPlace}
		onClose={() => {
			isShowPlaceDetailsDialog = false;
		}}
	/>

	<div class="p-10 px-10 pt-8 flex flex-col gap-6">
		{#each hospitals as hospital, index}
			<PlaceCard
				name={hospital.name}
				address={hospital.address ?? ''}
				rating={hospital.review.rating}
				ratingCount={hospital.review.count}
				imageSrc={hospital?.image_src ?? ''}
				onClick={handleShowPlaceDetailsDialog(hospital)}
			/>
		{/each}
	</div>
</div>
