// ONLY CLIENT SIDE CODE HERE

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import argon2 from 'argon2';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function encodePassword(password: string) {
	try {
		const hash = await argon2.hash(password);
		return hash;
	} catch (error) {
		console.log(error);
	}
}

export async function comparePassword(encodePassword: string, password: string) {
	try {
		if (await argon2.verify(encodePassword, password)) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
}
