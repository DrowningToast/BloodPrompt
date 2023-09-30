<script lang="ts">
	import type { PageData } from './$types';
	import Banner from './Banner.svelte';
	import SpecialEvent from './SpecialEventHero.svelte';

	import Searchbar from './Searchbar.svelte';
	import AnnouncementList from './AnnouncementList.svelte';
	import SurveyCard from '$lib/components/svelte/card/survey/SurveyCard.svelte';

	// TODO: Searchbar Functionality

	// let searchFilter = {
	// 	bloodType: 'A',
	// 	province: 'กรุงเทพมหานคร',
	// 	district: 'ทุ่งครุ',
	// 	subDistrict: 'บางมด',
	// 	placeName: 'โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร'
	// };

	export let data: PageData;
</script>

<div class="pb-24">
	<Banner name={data.user?.first_name + ' ' + data.user?.last_name} />

	<div class="px-8 pt-6">
		<SurveyCard
			donateDate={new Date()}
			donateTime={12.3}
			donationHistoryId={'001'}
			placeName="โรงพยาบาลพระจอมเกล้าเจ้าคุณทหาร"
		/>
	</div>

	<section class="px-8 py-8">
		<SpecialEvent />
	</section>
	<section class="px-8">
		<Searchbar />
	</section>
	<section>
		<AnnouncementList data={data.announcements} />
	</section>
</div>
