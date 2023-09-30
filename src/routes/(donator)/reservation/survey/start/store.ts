import { writable } from 'svelte/store';

export const preFeedbackAnswersStore = writable<Record<string, Record<string, string>>>({});
