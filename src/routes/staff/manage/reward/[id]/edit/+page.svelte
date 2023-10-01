<script lang="ts">
    import type { PageData } from './$types';
    import { Home,Megaphone, LogOut, CalendarHeart,FileText , UserCircle, Gift, Save , Image, Info} from 'lucide-svelte';
    import bloodpromptlogo from '$lib/images/staff/bloodprompt-logo.png';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { ChevronDown } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { trpc } from '$lib/trpc';
	import Dropdown from '../../../../../moderator/home/dropdown.svelte';
    export let data: PageData;
    let fileInput:HTMLInputElement;
    let rewardImg:any;

    let currentReward = data.eachReward; 

    let name_value = currentReward?.name;
    let description_value = currentReward?.description;
    let required_points_value = currentReward?.required_points;
    let amount_left_value = currentReward?.amount_left;
    let image_src_value = currentReward?.image_src;

    const saveDataHandler = async() => {
        await trpc.reward.update.mutate({data: {
           name : name_value || "",
           amount_left : amount_left_value || 0,
           description : description_value || "",
           required_points : required_points_value || 0,
           image_src: image_src_value || "" 
        }, rewardId: currentReward?.id || "1"}).then(()=>{goto("/staff/manage/reward")})
    }
    const onFileSelected =(e:Event|null)=>{
        let image = e?.target?.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
     	    rewardImg = e?.target?.result
        };
    }
   
</script>

<div class="flex justify-between bg-gray-300 min-w-screen min-h-[100vh] h-full w-full">
    <div class="flex flex-col bg-[#191F2F] w-3/12 h-auto">
        <div class="flex flex-row px-8 py-16 justify-center">
            <img src={bloodpromptlogo} alt="" class="w-16">
            <h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
        </div>
        <div class="flex flex-col px-5 w-full h-full justify-between">
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
					class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white" 
                    on:click={()=>{
                        if (browser) {
                        goto('/staff/manage/reward')
                    }}}
				><Gift class="w-5 h-5" />จัดการรางวัล</Button>

				<Button
					class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					on:click={()=>{
                        if (browser) {
                        goto('/staff/manage/special-event')
                    }}}
                ><CalendarHeart class="w-5 h-5" />จัดการกิจกรรมหรือแคมเปญ</Button>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9" on:click={()=>{
                    if(browser){
                        goto('/staff/login')
                    }
                }}
				><LogOut class="mr-2 h-5    w-5 stroke-white" />ออกจากระบบ</Button>

		</div>
    </div>
    <div class="flex flex-col justify-center items-center w-9/12 h-auto">
        <div class="w-full h-20 bg-white grid grid-cols-3 items-center justify-center px-8">
			<div class="items-center justify-center flex" />
			<div class="items-center justify-center flex text-2xl font-semibold">โรงพยาบาลลาดกระบัง</div>
			<div class="items-center justify-end flex gap-2">
				<div class="flex flex-row items-center gap-1">
                    <UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8" />
					<h1 class="font-semibold">ศรุตา โทรัตน์</h1>
					<Dropdown />
                </div>
			</div>
        </div>
        <!-- content -->
        <div class="flex flex-row items-center justify-between px-14 h-32 w-full">
            <div class="flex flex-col">
                <p class="font-bold text-xl">การแก้ไขของรางวัล</p>
                <p class="text-base text-gray-500">สามารถแก้ไขข้อมูลของรางวัล</p>
            </div>
            <div class="flex justify-between items-center gap-4">
                <Button on:click={saveDataHandler} class="flex justify-center gap-2 bg-[#EF4444] rounded-full text-center h-12 w-60 px-4 py-4 text-base font-bold text-white hover:bg-[#EF4444]"><Save  class=" stroke-white w-5" />บันทึกข้อมูล</Button>
                <Button class="flex justify-center gap-2 bg-black rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white" on:click={()=>{
                    if (browser) {
                        goto('/staff/manage/reward')
                    }
                }}>ยกเลิกการแก้ไข</Button>
            </div>
        </div>
        <div class="flex flex-col justify-start items-center h-full w-full px-14 py-2">
            <div class="flex justify-between gap-20 bg-white w-full h-fit rounded-3xl shadow-2xl px-5 py-5">
                <div class="flex flex-col gap-5 w-6/12">
                    <div class="flex items-center gap-2">
                        <Image class="w-5"/>
                        <h1 class="font-bold py-2">รูปภาพประกอบของของรางวัล</h1>
                    </div>

                    <div class="flex flex-col items-center justify-center w-full h-5/6 rounded-3xl">
                        {#if rewardImg}
                            <img class="flex justify-center h-fit w-full rounded-xl" src="{rewardImg}" alt="d" />
                        {:else}
                            <div class="flex flex-col items-center justify-center bg-gray-200 w-full h-full rounded-3xl">
                                <p>ยังไม่ได้เลือกรูปภาพ</p>
                                <p>(โปรดเลือกอย่างน้อย 1 รูปภาพ)</p>
                            </div>
                        {/if}
                    </div>

                    <div class="flex flex-row justify-center items-center w-full gap-5">
                        <input type="file" id="file" on:change={(e)=>onFileSelected(e)} bind:this={fileInput} class="hidden">
                        <Button class="flex justify-center gap-2 bg-black rounded-full text-center h-[40px] w-[200px] px-10 py-4 text-base font-bold text-white" on:click={() =>{fileInput.click();}}>เลือกรูปภาพ</Button>
                        <Button variant="link" class="flex justify-center gap-2 rounded-full text-center h-[40px] w-[84px] px-5 py-4 text-base font-bold text-[#EF4444]" on:click={() => rewardImg=null}>ลบรูปภาพ</Button>
                    </div>
                </div>
                <div class="flex flex-col gap-5 w-6/12">
                    <div class="flex items-center gap-2">
                        <Info class="w-5"/>
                        <h1 class="font-bold py-2">ข้อมูลพื้นฐานของของรางวัล</h1>
                    </div>
                    <Input bind:value={name_value} placeholder="ชื่อของรางวัล" class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"/>
                    <Textarea bind:value={description_value} placeholder="รายละเอียดเบื้องต้นของของรางวัล" class="rounded-xl border-2 border-gray-300 h-[200px] w-full px-4 py-4 resize-none"/>
                    <Input bind:value={required_points_value} placeholder="แต้มที่ต้องใช้แลกของรางวัล" class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"/>
                    <Input bind:value={amount_left_value} placeholder="จำนวน" class="rounded-xl border-2 border-gray-300 h-[50px] w-full px-4 py-4"/>
                </div>
            </div>
        </div>
    </div>
</div>