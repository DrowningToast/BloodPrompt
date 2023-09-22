import type { Donators, Medical_Staff, Moderators, Session } from 'database';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | null;
			user: Donators | Medical_Staff | Moderators | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
