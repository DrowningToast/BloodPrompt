import { writable } from 'svelte/store';

export const page = writable<string>('');
export const isHomeRoute = writable<boolean>(false);
export const isHistoryRoute = writable<boolean>(false);
export const isRewardRoute = writable<boolean>(false);
export const isReservationRoute = writable<boolean>(false);
