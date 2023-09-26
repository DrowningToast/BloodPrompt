<script lang="ts">
	import { CalendarClock, FileClock, Gift, Home } from 'lucide-svelte';
</script>

<div class="rounded-3xl bg-[#F5222D] fixed bottom-4 w-full max-w-[90%]">
	<div class="py-5 flex flex-row gap-4 items-center justify-between px-10 text-white">
		<button>
			<Home size={28} />
		</button>
		<button>
			<CalendarClock size={28} />
		</button>
		<button>
			<FileClock size={28} />
		</button>
		<button>
			<Gift size={28} />
		</button>
	</div>
</div>
