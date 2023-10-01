<script lang="ts">
    import type { PageData } from './$types';
    import NotAvailable from './NotAvailable.svelte';
    import { Home,Megaphone, LogOut, UserCircle, FileText, Gift, CalendarHeart, CalendarClock } from 'lucide-svelte';
    import bloodPromptLogo from '$lib/images/bloodprompt-logo.png';
    import { Button } from "$lib/components/ui/button";
    import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
    import Dropdown from '../../../moderator/home/dropdown.svelte';
	import { trpc } from '$lib/trpc';
    export let data: PageData;
    const currentEvent = data.eventNow;

    const deleteEventHandler = async () => {
		await trpc.specialEvent.delete.mutate(data.eventNow?.id || '').then(() => {
			if (browser) {
				window.location.reload();
			}
		});
	};

</script>
{#if !data.isEventOnGoing}
    <NotAvailable/>
    {:else}
    <div class="flex flex-row w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh">
        <div class="flex flex-col bg-[#191F2F] w-3/12 h-100%">
            <div class="flex flex-row px-8 py-16 justify-center">
                <img src={bloodPromptLogo} alt="" class="w-16" />
                <h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
            </div>
            <div class="flex flex-col px-5 w-full min-h-screen justify-between">
                <div class="flex flex-col gap-8 w-full">
                    <Button
                        class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                        on:click={()=>{
                            if (browser) {
                            goto('/staff/home')
                        }}}
                    ><Home class="w-5 h-5 " />หน้าหลัก</Button>
                    <Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F]  text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                    on:click={()=>{
                        if (browser) {
                        goto('/staff/manage/announcement')
                    }}}
				    ><Megaphone  class="w-5 h-7 pb-[2px] " />จัดการประกาศประชาสัมพันธ์</Button
				    >
                    <Button
                        class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                        on:click={()=>{
                            if (browser) {
                            goto('/staff/manage/reservation')
                        }}}
                    ><FileText class="w-5 h-5" />การจองคิว</Button>
    
                    <Button
                        class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                        on:click={()=>{
                            if (browser) {
                                goto('/staff/manage/reward')
                            }
                        }}
                    ><Gift class="w-5 h-5" />จัดการรางวัล</Button>
    
                    <Button
                        class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
                        on:click={()=>{
                            if (browser) {
                            goto('/staff/manage/special-event')
                        }}}
                    ><CalendarHeart class="w-5 h-5" />จัดการกิจกรรมหรือแคมเปญ</Button>
    
                </div>
                <Button
                    class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"
                    on:click={()=>{
                        if (browser) {
                        goto('/staff/login')
                    }}}
                ><LogOut class="mr-2 h-5 w-5 stroke-white" />ออกจากระบบ</Button>
    
            </div>
        </div>
        <div class="flex flex-col items-center w-9/12 h-full">
            <div class="w-full h-16 bg-white grid grid-cols-3 items-center justify-center px-8">
                <div class="items-center justify-center flex" />
                <div class="items-center justify-center flex text-2xl font-semibold">โรงพยาบาลลาดกระบัง</div>
                <div class="items-center justify-end flex gap-2">
                    <div class="flex flex-row items-center gap-1">
                        <UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8"/>
                        <h1 class="font-bold ">ศรุตา โทรัตน์</h1>
                            <Dropdown/> 
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full justify-start pt-8 pl-20">
                <p class="text-black text-2xl font-bold">จัดการกิจกรรมพิเศษ</p>
                <p class="text-[#888]">สามารถจัดการกิจกรรมพิเศษจองสถานที่นั้นๆ</p>
            </div>
            <div class="flex w-[1100px] h-[524px] bg-white rounded-[20px] mt-12 justify-between p-4">
                <div class="w-1/2">
                    <img src={currentEvent?.img_src} alt="" class="w-[90%] h-full">
                </div>
                <div class="flex flex-col w-1/2 gap-7">
                    <div>
                        <p class="text-3xl font-bold">{currentEvent?.name}</p>
                        <p class="ml-7 mt-3">
                            {currentEvent?.description}
                        </p>
                    </div>
                    <div class="flex flex-col">
                        <p class="flex items-center gap-2 text-2xl font-bold"><CalendarClock />ระยะเวลาจัดกิจกรรม</p>
                        <p class="font-bold pl-8">01/08/2023 08:00 - 12/08/2023 16:00</p>
                    </div>
                    <div class="flex justify-end gap-6 mt-auto">
                        <Button on:click={()=>{if(browser)goto("/staff/manage/special-event/edit")}} class="flex self-center text-[#EF4444] border-[#EF4444] border-2 w-32 h-10 gap-1 bg-white hover:bg-white rounded-3xl">แก้ไข</Button>
                        <Button class="flex self-center text-white rounded-3xl w-32 h-10 gap-1 bg-[#EF4444] hover:bg-[#EF4444] rounded-3xls" 
                        on:click={deleteEventHandler}>ลบ</Button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    

{/if}

