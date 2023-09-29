import { writable } from 'svelte/store';

export const currentRoute = writable<string>('');
export const isHomeRoute = writable<boolean>(true);
export const isHistoryRoute = writable<boolean>(false);
export const isRewardRoute = writable<boolean>(false);
export const isReservationRoute = writable<boolean>(false);
