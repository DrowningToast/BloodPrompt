<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, LogOut } from 'lucide-svelte';
	import { trpc } from '$lib/trpc';
	import { goto } from '$app/navigation';

	const handleLogout = async () => {
		await trpc.auth.logout
			.mutate()
			.then((res) => {
				goto('/staff/login');
			})
			.catch((error) => {
				console.error(error);
			});
	};
</script>

<div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				variant="outline"
				builders={[builder]}
				class="p-0 m-0 border-transparent bg-white hover:bg-white"
				><ChevronDown class="p-0 m-0 w-5 fill-black stroke-none" /></Button
			>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="flex flex-col">
			<DropdownMenu.Item class="justify-center cursor-pointer" on:click={handleLogout}
				><LogOut class="mr-2 h-5 w-5 stroke-black" />ออกจากระบบ</DropdownMenu.Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
