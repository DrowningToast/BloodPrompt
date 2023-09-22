<script lang="ts">
	import { trpc } from '$lib/trpc';

	let name: string = '';
	let output: string = '';
	$: name ? trpc.greet.query({ name }).then((value) => (output = value)) : (output = '');
</script>

<input bind:value={name} />
<p>{output}</p>
