<script lang="ts">
	import { trpc } from '$lib/trpc';
	import type { Prisma } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const handleOnClick = async () => {
		const placeData: Prisma.PlacesCreateInput = {
			name: "King Mongkut's Institute of Technology Ladkrabang",
			description:
				"King Mongkut's Institute of Technology Ladkrabang is a research and educational institution in Thailand. It is situated in Lat Krabang District, Bangkok approximately 30 km east of the city center.",
			image_src: '',
			icon_src: '',
			phone_number: '023298000',
			email: '65070219@kmitl.ac.th',
			address: '1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520',
			opening_day: 'SUNDAY,MONDAY,TUESDAY',
			opening_time: 9.0,
			closing_time: 16.3,
			is_available: true
		};

		const place = await trpc.places.create.mutate(placeData);

		const medicalStaffs = [
			{
				first_name: 'Sila',
				last_name: 'Pakdeewong',
				email: '65070219@kmitl.ac.th',
				password: 'sila',
				place_id: place.id
			},
			{
				first_name: 'Focus',
				last_name: 'Pakdeewong',
				email: '65070220@kmitl.ac.th',
				password: 'admin',
				place_id: place.id
			}
		];

		const res = await trpc.medicalStaff.createMany.mutate(medicalStaffs);
	};

	const handleOnUpdate = async () => {
		const placeData: Prisma.PlacesCreateInput = {
			name: 'KMITL',
			description:
				"King Mongkut's Institute of Technology Ladkrabang is a research and educational institution in Thailand. It is situated in Lat Krabang District, Bangkok approximately 30 km east of the city center.",
			image_src: '',
			icon_src: '',
			phone_number: '023298000',
			email: '65070219@kmitl.ac.th',
			address: '1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520',
			opening_day: 'SUNDAY,MONDAY,TUESDAY',
			opening_time: 9.0,
			closing_time: 16.3,
			is_available: true
		};
		const res = await trpc.places.update.mutate({
			data: placeData,
			placeId: 'clmv42gzp000rer2jfv7frme7'
		});
		console.log(res);
	};

	const handleOnUpdateMedicalStaff = async () => {
		const medicalStaffData = {
			first_name: 'Focus',
			last_name: 'Pakdeewong',
			email: '65070220@kmitl.ac.th'
			// password: 'focus'
		};
		const res = await trpc.medicalStaff.update.mutate({
			data: medicalStaffData,
			medicalStaffId: 'clmv42h35000ter2jwxnalwve'
		});
		console.log(res);
	};
</script>

<div class="flex flex-col items-center justify-center gap-4 mt-6">
	<button on:click={handleOnClick} class="rounded-lg text-white py-2 w-60 text-sm bg-red-500"
		>Create</button
	>
	<button on:click={handleOnUpdate} class="rounded-lg text-white py-2 w-60 text-sm bg-red-500"
		>Update</button
	>

	<button
		on:click={handleOnUpdateMedicalStaff}
		class="rounded-lg text-white py-2 w-60 text-sm bg-red-500">Update (MedicalStaff)</button
	>
</div>
