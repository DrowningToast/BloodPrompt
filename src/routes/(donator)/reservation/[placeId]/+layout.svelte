<script lang="ts">
	import { goto } from '$app/navigation';
	import { preFeedbackStore } from '$lib/stores/preFeedback';
	import { onMount } from 'svelte';

	// Validate if the user has already done the pre feedback questions or not
	// If the user has already done the pre feedback questions, redirect to the next page
	// Otherwise, redirect to the pre feedback questions page

	onMount(async () => {
		console.log($preFeedbackStore.Pre_Feedback_Answers.length);
		if ($preFeedbackStore.Pre_Feedback_Answers.length > 0) {
		} else {
			await goto('/donator/reservation/survey/start');
		}
	});
</script>
