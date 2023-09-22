<script lang="ts">
	import { trpc } from '$lib/trpc';
	import type { Prisma } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;

	let phoneNumberValue: string = '0656526769';
	let passwordValue: string = '65070219';

	// MOCK LOGIN

	const handleCreateAccount = async () => {
		console.log('handleCreateAccount()');
		const donator = await trpc.donators.signUp.mutate({
			donatorData: {
				image_src: '',
				first_name: 'Sila',
				last_name: 'Pakdeewong',
				phone_number: phoneNumberValue,
				gender: 'MALE',
				dob: new Date('2003-18-12'),
				address: 'KMITL',
				email: '65070219@kmitl.ac.th',
				password: passwordValue,
				reward_point: 0
			},
			medicalAccountData: {
				blood_type: 'B_POSITIVE',
				account_status: 'UNVERIFIED'
			}
		});
		console.table(donator);
	};

	const handleLogin = async () => {
		console.log('handleLogin()');
		const { user, session } = await trpc.auth.donatorLogin.mutate({
			phone_number: phoneNumberValue,
			password: passwordValue
		});

		const uu = await trpc.auth.getUser.query();
		console.log(uu);
	};

	const handleClick = async () => {
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

		const medicalStaffs = [
			{
				first_name: 'Sila',
				last_name: 'Pakdeewong',
				email: '65070219@kmitl.ac.th',
				password: '1234567',
				place_id: 'clmuxi9d10000er2jjo8g6dwq'
			},
			{
				first_name: 'Focus',
				last_name: 'Pakdeewong',
				email: '65070220@kmitl.ac.th',
				password: '1234567',
				place_id: 'clmuxi9d10000er2jjo8g6dwq'
			}
		];

		//const place = await trpc.places.create.mutate(placeData);
		const res = await trpc.medicalStaff.createMany.mutate(medicalStaffs);
		console.log('new mds: ', res);
	};
</script>

<div class="flex flex-col items-center justify-center gap-4 mt-6">
	<button on:click={handleCreateAccount} class="rounded-lg text-white py-2 w-60 text-sm bg-red-500"
		>Create (Mock) Account</button
	>

	<input
		bind:value={phoneNumberValue}
		class="border-2 border-slate-300 p-2 rounded-lg w-60"
		placeholder="phoneNumber"
	/>
	<input
		bind:value={passwordValue}
		class="border-2 border-slate-300 p-2 rounded-lg w-60"
		placeholder="password"
	/>

	<button on:click={handleLogin} class="rounded-lg text-white py-2 w-60 text-sm bg-red-500"
		>handleLogin</button
	>

	<button on:click={handleClick} class="rounded-lg text-white py-2 w-60 text-sm bg-red-500"
		>RUNNNNNN !</button
	>
</div>
