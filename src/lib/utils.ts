import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import Cryptr from 'cryptr';
const cryptr = new Cryptr('myTotallySecretKey');

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const encodePassword = (password: string): string => {
	return cryptr.encrypt(password);
};

export function comparePassword(password: string) {
	return cryptr.decrypt(password);
}

export const getFormattedOpeningDate = (opening_day: string) => {
	if (opening_day) {
		const result: string[] = [];
		const openingDays = opening_day.split(',');
		for (const day of openingDays) {
			if (day === 'SUNDAY') {
				result.push('วันอาทิตย์');
			} else if (day === 'MONDAY') {
				result.push('วันจันทร์');
			} else if (day === 'TUESDAY') {
				result.push('วันอังคาร');
			} else if (day === 'WEDNESDAY') {
				result.push('วันพุธ');
			} else if (day === 'THURSDAY') {
				result.push('วันพฤหัสบดี');
			} else if (day === 'FRIDAY') {
				result.push('วันศุกร์​');
			} else if (day === 'SATURDAY') {
				result.push('วันเสาร์');
			}
		}
		const lastDay = result.pop();
		let temp = result.join(', ');
		temp += ` และ${lastDay}`;
		return temp;
	}
};

export const toDateTimeString = (date: Date) => {
	return date?.toLocaleDateString('th-TH', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};

export const toDateString = (date: Date) => {
	return date?.toLocaleDateString('th-TH', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
