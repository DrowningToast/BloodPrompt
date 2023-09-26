// import type { Places } from '@prisma/client';
import { writable } from 'svelte/store';
import type { Places } from '../../../generated-zod';

export const selectedPlaceId = writable<number | null>(0);
export const selectedDate = writable(null);
export const selectedTime = writable(null);

// MOCK
export const selectedPlace = writable<Places | null>(null);
