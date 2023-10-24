import type { Places, Redemption_History, Rewards } from '@prisma/client';
import { writable } from 'svelte/store';

export type RedemptionHistory = {
	redemtionData: Redemption_History;
	rewardData: Rewards;
	placeData: Places;
};

export type Reward = {
	rewardData: Rewards;
	placeData: Places;
};

export const selectedRedemptionHistory = writable<RedemptionHistory | null>(null);

export const selectedReward = writable<Reward | null>(null);
