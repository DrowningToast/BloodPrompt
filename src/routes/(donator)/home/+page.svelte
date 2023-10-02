<script lang="ts">
	import Banner from './Banner.svelte';
	import SpecialEvent from './SpecialEventHero.svelte';

	import Searchbar from './Searchbar.svelte';
	import AnnouncementList from './AnnouncementList.svelte';
	import SurveyCard from '$lib/components/svelte/card/survey/SurveyCard.svelte';
	import { get24HoursTimeString } from '../reservation/[placeId]/date/utils';
	import type { PageData } from './$types';

	// TODO: Searchbar Functionality

	// let searchFilter = {
	// 	bloodType: 'A',
	// 	province: 'กรุงเทพมหานคร',
	// 	district: 'ทุ่งครุ',
	// 	subDistrict: 'บางมด',
	// 	placeName: 'โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร'
	// };

	export let data: PageData;

	const pendingPostFeedback = data.pendingFeedback;
</script>

<div class="pb-24">
	<Banner name={data.user?.first_name + ' ' + data.user?.last_name} />

	<!-- Still unfinished post survey -->
	{#if pendingPostFeedback?.reservation_id}
		<div class="px-8 pt-6">
			<SurveyCard
				donateDate={pendingPostFeedback.Reservation.Reservation_Slot.reserve_date}
				donateTime={+get24HoursTimeString(
					pendingPostFeedback.Reservation.Reservation_Slot.reserve_time
				).replace(':', '.')}
				donationHistoryId={pendingPostFeedback.id}
				placeName={pendingPostFeedback.Reservation.Reservation_Slot.Place.name}
			/>
		</div>
	{/if}

	<section class="px-8 py-8">
		<SpecialEvent sp_events={data.sp_events} />
	</section>
	<section class="px-8">
		<Searchbar />
	</section>
	<section>
		<AnnouncementList data={data.announcements} />
	</section>
</div>
