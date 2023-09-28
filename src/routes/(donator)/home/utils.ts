export interface SearchFilter {
	bloodTypes: Record<BloodType['value'], boolean>;
	searchQuery: string;
}

export interface BloodType {
	value: string;
	label: string;
}
