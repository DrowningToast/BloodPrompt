import { writable } from 'svelte/store';

export const placeName = writable<string | null>(null);
export const medicalStaffName = writable<string | null>(null);
