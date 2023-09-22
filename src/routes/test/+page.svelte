<script lang="ts">
	import { browser } from '$app/environment';
	import { trpc } from '$lib/trpc';

	export let data;
	let name: string = data.name;
	let output: string = data.output;

	$: if (browser) {
		name && trpc.greet.query({ name }).then((value) => (output = value));
	}
</script>

<input bind:value={name} />
<p>{output}</p>
