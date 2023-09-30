<script lang="ts">

    import { Home, LogOut, Info, UserCircle, UserCircle2, KeyRound,MapPin, Lock, PlusCircle } from 'lucide-svelte';
    import bloodpromptlogo from '$lib/images/staff/bloodprompt-logo.png';
    import * as Table from "$lib/components/ui/table";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { ChevronDown } from "lucide-svelte";
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

</script>

<div class="flex flex-row w-full justify-between bg-gray-300 min-w-[100vw] min-h-[100vh]">
    <div class="flex flex-col bg-[#191F2F] w-3/12 h-screen">
        <div class="flex flex-row px-8 py-16 justify-center">
            <img src={bloodpromptlogo} alt="" class="w-16">
            <h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
        </div>
        <div class="flex flex-col px-5 w-full h-full justify-between">
            <div class="flex flex-col gap-8 w-full">
                <Button class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white" on:click={()=>{
                    if(browser){
                        goto('/moderator/home')
                    }
                }}><Home class="w-5 h-5 "/>หน้าหลัก</Button>

                <Button class="flex justify-start items-center gap-3 hover:bg-[#EF4444] bg-[#EF4444] text-base  rounded-full text-start px-6 py-4 h-12 text-white" on:click={()=>{
                    if(browser){
                        goto('/moderator/manage/donation-center')
                    }
                }}><MapPin class="w-5 h-5" />จัดการสถานที่รับบริจาคเลือด</Button>

                <Button class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white" on:click={()=>{
                    if(browser){
                        goto('/moderator/manage/staff')
                    }
                }}><UserCircle2 class="w-5 h-5"/>จัดการบัญชีบุคลากรการเเพทย์</Button>
                
                <Button class="flex justify-start items-center gap-3 hover:bg-[#191F2F] bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white" on:click={()=>{
                    if(browser){
                        goto('/moderator/manage/account')
                    }
                }}><Lock class="w-5 h-5" />จัดการบัญชี / เปลี่ยนรหัสผ่าน</Button>

            </div>
            <Button class="flex justify-start gap-2 text-white text-start text-base px-6 py-3 items-center bg-[#191F2F] mb-9"><LogOut class="mr-2 h-5 w-5 stroke-white" />ออกจากระบบ</Button>
        </div>
    </div>
    <div class="flex flex-col items-center w-9/12 h-screen">
        <div class="flex items-center bg-white px-14  w-full  py-6 justify-between h-16">
            <h1 class=" font-bold text-lg">BloodPrompt (สำหรับผู้ดูเเลระบบ)</h1>
            <div class="flex flex-row items-center gap-1">
                <UserCircle class="fill-[#EF4444] rounded-full stroke-2 stroke-white w-8 h-8"/>
                <h1 class="font-semibold">ผู้ดูเเลระบบ</h1>
                <div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild let:builder>
                            <Button variant="outline" builders={[builder]} class="p-0 m-0 border-transparent bg-white hover:bg-white"><ChevronDown class="p-0 m-0 fill-black stroke-none"/></Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content class="w-56">
                          <DropdownMenu.Item>
                            <LogOut class="mr-2 h-4 w-4" />
                            <div on:click={()=>{
                                if (browser) {
                                    goto('/staff/login')
                                }}
                            }>ออกจากระบบ</div>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </div>
        </div>
        <!-- content -->
        <div class="flex flex-row items-center justify-between px-16 h-32 w-full">
            <div class="flex flex-col">
                <p class="font-bold text-xl">จัดการสถานที่รับบริจาคเลือด</p>
                <p class="text-base text-gray-500">ในหน้านี้ผู้ดูเเลระบบสามารถจัดการเกี่ยวกับสถานที่รับบริจาคเลือด (Manage Blood Donation Center)  </p>
            </div>
            <Button  class="flex justify-center gap-2 bg-[#EF4444] rounded-full text-center h-12 w-60 px-12 py-4 text-base font-bold text-white hover:bg-[#EF4444]"
                on:click = {()=>{
                    if (browser) {
                        goto('donation-center/add')
                    }
                }} 
            ><PlusCircle class="fill-white stroke-[#EF4444]" />เพิ่มสถานที่ใหม่</Button>
        </div>
        <div class="flex flex-row justify-center bg-white rounded-3xl w-11/12 h-4/6 shadow-xl px-5 py-5">
            <Table.Root class="bg-white rounded-full">
                <Table.Caption>เพิ่มข้อมูลของคุณ</Table.Caption>
                <Table.Header>
                  <Table.Row class=" hover:bg-white">
                    <Table.Head class="font-bold text-black">หมายเลข</Table.Head>
                    <Table.Head class="font-bold text-black">ชื่อสถานที่</Table.Head>
                    <Table.Head class="w-[300px] font-bold text-black">คำอธิบาย</Table.Head>
                    <Table.Head class="font-bold text-black">เบอร์โทร</Table.Head>
                    <Table.Head class="font-bold text-black">เว็บไซต์</Table.Head>
                    <Table.Head class="font-bold text-black">อีเมล</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each {length:10} as _, i}
                    <Table.Row>
                        <Table.Cell class="text-center">{i+1}</Table.Cell>
                        <Table.Cell>โรงพยาบาลลาดกระบังกรุงเทพมหานคร</Table.Cell>
                        <Table.Cell>ตึกคลินิกพิเศษ ชั้น 1 ซอยลาดกระบัง 15 ถนนอ่อนนุช-ลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520</Table.Cell>
                        <Table.Cell>024548128</Table.Cell>
                        <Table.Cell>www.pornhub.org</Table.Cell>
                        <Table.Cell>pornhub@gmail.com</Table.Cell>
                    </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </div>
    </div>
</div>