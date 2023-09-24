<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import bloodPromptLogo from '$lib/images/bloodprompt-logo.png';
</script>

<div class="bg-[#F5222D] min-h-[100vh] px-10">
	<div class="pt-12 text-white font-bold text-2xl flex flex-col gap-2">
		<p>ยินดีต้อนรับสู่</p>
		<p>BLOODPROMPT</p>
	</div>

	<div class="mt-16">
		<img src={bloodPromptLogo} alt="BloodPrompt Logo" />
	</div>

	<p class="text-white font-semibold mt-16 text-center">
		บริจาคเลือดเพื่อช่วยคนในความจำเป็น! ร่วมเป็นบริจาคเลือดและเสริมทางการแพทย์ ช่วยสังคม
		ให้เลือดที่คุณมีค่าต่อชีวิต
	</p>

	<Button
		href="/login"
		variant="outline"
		class="w-full mt-16 rounded-xl py-6 text-md font-bold bg-white text-[#F5222D]"
	>
		เริ่มต้นใช้งาน
	</Button>
</div>
