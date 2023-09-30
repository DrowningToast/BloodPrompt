<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";

    type reward = {
        rewardId:string,
        point:number,
        remain:number,
        title:string,
        desc:string,
        img:string
    };
    export let data:reward;
    console.log(data);
</script>

<div class="flex gap-7 p-4 border-black border-[1.5px] bg-white rounded-3xl shadow-2xl m-2">
    <div class="flex w-5/12 items-center">
        <img src={data.img} alt="" class="">
    </div>
    <div class="flex flex-col w-7/12 gap-7">
        <!-- title + description -->
        <div class="flex flex-col gap-3">
            <p class="text-2xl font-bold">{data.title}</p>
            <p class="">{data.desc}</p>
        </div>
        <!-- point+remain -->
        <div class="flex gap-8">
            <!-- point -->
            <div class="flex flex-col gap-1">
                <p class="font-bold">แต้มที่ต้องใช้</p>
                <p>{data.point} แต้ม</p>
            </div>
            <!-- remain -->
            <div class="flex flex-col gap-1">
                <p class="font-bold">แต้มที่ต้องใช้</p>
                <p>{data.remain} ชิ้น</p>
            </div>
        
        </div>
        <div class="flex justify-start gap-6">
            <Button on:click={()=>{if(browser)goto(`/staff/manage/reward/${data.rewardId}/edit`)}} class="w-24 h-10 text-[#EF4444] border-[#EF4444] hover:bg-white border-2 gap-1 bg-white rounded-3xl">แก้ไข</Button>
            <Button class="w-24 h-10 text-white rounded-3xl bg-[#EF4444] hover:bg-[#EF4444] rounded-3xls">ลบ</Button>
        </div>
    </div>
</div>