<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent } from '$lib/components/ui/dialog';

	export let open: boolean;
	export let title: string;
	export let description: string;
	export let actionLabel: string;
	export let onAction: () => void;
	export let secondaryLabel: string;
	export let onSecondaryAction: () => void;
	export let dangerousAction: boolean = false;
</script>

<AlertDialog.Root {open}>
	<AlertDialog.Content class="max-w-[90vw]">
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>
				{description}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={onAction}>{actionLabel}</AlertDialog.Cancel>
			<AlertDialog.Action on:click={onSecondaryAction} class="bg-red-600 text-white"
				>{secondaryLabel}</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
