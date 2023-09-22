<script lang="ts">
	import { trpc } from '$lib/trpc';
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
		console.table(user);
		console.table(session);
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
</div>
