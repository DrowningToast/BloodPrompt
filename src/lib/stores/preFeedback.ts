// Temporary store pre-feedback before creating them with reservation

import { writable } from 'svelte/store';
import { z } from 'zod';

export const validatePreDonationFeedback = z.object({
	Pre_Feedback_Answers: z.array(
		z.object({
			question_id: z.string(),
			choice_id: z.string()
		})
	)
});

export type PreDonationFeedback = z.infer<typeof validatePreDonationFeedback>;

export const preFeedbackStore = writable<PreDonationFeedback>({
	Pre_Feedback_Answers: []
});
