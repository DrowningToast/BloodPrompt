<script>
    export let title = "", amount = 0, person = true;
    import people from '$lib/images/staff/login/person.png';
    import location from '$lib/images/staff/login/location.png';
    
</script>

<div class="w-[330px] h-[130px] bg-white rounded-xl drop-shadow-lg">
    <!-- info -->
    <div class="flex justify-between p-5 w-full h-full items-center">
        <div class="flex flex-col gap-3">
            <p class="text-[#888] font-semibold">{title}</p>
            <p class="text-2xl font-semibold" >{amount} คน</p>
        </div>
        <div class="">
            {#if person}
            <img src={people} alt="" class="w-11">
            {:else}
            <img src={location} alt="" class="w-10 h-10">
            {/if}
        </div>
    </div>
</div>