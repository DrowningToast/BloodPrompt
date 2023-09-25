<script lang="ts">
    import type { PageData } from './$types';
    import bloodpromptlogo from '$lib/images/staff/login/bloodprompt-logo.png';
    import { Target, UserCircle } from 'lucide-svelte'
    import Dropdown from '../home/dropdown.svelte';
    import * as Table from "$lib/components/ui/table";
    import { Button, buttonVariants } from '$lib/components/ui/button';
    import * as Select from "$lib/components/ui/select";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    export let data: PageData;

    let placeholder = "เเสดงบัญชีบุคลากรการเเพทย์ในระบบทั้งหมด";
    type personalInfo = {
        name : String,
        email : String
    }
    const showPersonalInfo = (eachPerson : personalInfo) => {
    
    }

</script>

<div class="flex flex-row w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh]">
    <div class="flex flex-col bg-[#191F2F] w-3/12">
        <div class="flex px-8 py-16 justify-center">
            <img src={bloodpromptlogo} alt="" class="w-16">
            <h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
        </div>
        <div class="flex flex-col  w-full h-[72%] justify-between">
            <div class="flex flex-col w-full px-5 gap-8 object-cover">
                <button class="bg-[#191F2F]  rounded-3xl text-start text-base px-11 py-3 text-white w-full">หน้าหลัก</button>
                <button class="bg-[#191F2F]  rounded-3xl text-start  text-base px-11 py-3 text-white">จัดการสถานที่รับบริจาคเลือด</button>
                <button class="bg-[#EF4444]  rounded-3xl text-start px-11 py-3 text-white">จัดการบัญชีบุคลากรการเเพทย์</button>
                <button class="bg-[#191F2F]  rounded-3xl text-start px-11 py-3 text-white">จัดการบัญชี / เปลี่ยนรหัสผ่าน</button></div>
                <!-- Dialog Test -->
                <Dialog.Root>
                    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
                      Edit Profile
                    </Dialog.Trigger>
                    <Dialog.Content class="w-[805px] h-[545px]">
                      <Dialog.Header>
                        <Dialog.Title class="flex text-xl gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                            ดูข้อมูล / เเก้ไขบัญชีบุคลากรการเเพทย์</Dialog.Title>
                      </Dialog.Header>
                      <div class="flex flex-col gap-8">
                          <div class="flex flex-col gap-4">
                              <Label class="text-left">ข้อมูลส่วนตัวของบุคลากรการเเพทย์</Label>
                              <div class="flex flex-col gap-[10px]">
                            <Input id="name"  class="" />
                            <Input id="name" class="" />
                        </div>
                        <div class="flex flex-col gap-4">
                            <Label class="text-left">ข้อมูลการเข้าสู่ระบบของบุคลากรการเเพทย์</Label>
                            <div class="flex flex-col gap-[10px]">
                                <Input id="name"  class="" />
                                <Input id="username" class="" />
                            </div>
                        </div>
                    </div>
                      </div>
                      <Dialog.Footer>
                        <Button type="submit">Save changes</Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Root>
            <div class="px-5">
                <button class=" text-white text-start px-11 py-3">ออกจากระบบ</button>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center w-9/12">
        <div class="flex items-center bg-white px-14  w-full  py-6 flex-row justify-between">
            <h1 class=" font-bold text-lg">BloodPrompt (สำหรับผู้ดูเเลระบบ)</h1>
            <div class="flex gap-3 items-center">
                <UserCircle class="fill-[#EF4444] stroke-white scale-150"/>
                <p>ผู้ดูแลระบบ</p>
                <Dropdown></Dropdown>
        </div>
    </div>
        <div class="flex flex-col gap-8 mt-10 w-full h-full items-center">
            <!-- #1 text-1 -->
            <div class="pl-14 flex flex-col gap-2 self-start">
                <p class="text-xl font-bold">จัดการบัญชีบุคลากรการเเพทย์</p>
                <p class="text-[#888] font-semibold">จัดการบัญชีบุคลากรการเเพทย์ที่ดูเเลรับผิดชอบในเเต่ละสถานที่รับบริจาคเลือดได้</p>
            </div>
            <!-- #2 filter -->
            <div class="flex gap-5 self-start pl-14 justify-between">
                <!-- drop down -->
                <div class="flex flex-col gap-1">
                    <p class="font-bold">เเสดงข้อมูลทั้งหมด / เลือกเเสดงตามโรงพยาบาล</p>
                    <!-- selecttor -->
                    <Select.Root>
                        <Select.Trigger class="w-[475px] h-[50px] bg-white rounded-xl text-[#888]">
                          <Select.Value placeholder="เเสดงบัญชีบุคลากรการเเพทย์ในระบบทั้งหมด" />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="light">Light</Select.Item>
                          <Select.Item value="dark">Dark</Select.Item>
                          <Select.Item value="system">System</Select.Item>
                        </Select.Content>
                      </Select.Root>
                </div>
                <!-- seach -->
                <div>
                    <!-- search -->
                    <div class="flex flex-col gap-1">
                        <p class="font-bold">ค้นหาโดยใช้ชื่อของบุคลากรการเเพทย์</p>
                        <!-- search-bar + button -->
                        <div class="flex gap-6">
                            <input type="text" placeholder="ระบุชื่อของบุคลากรการเเพทย์เพื่อทำการค้นหา" class="w-[425px] h-[50px] p-5 rounded-xl">
                            <!-- button -->
                            <Button class="flex self-center gap-1 w-[107px] h-11 bg-[#EF4444] rounded-3xl font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                            </svg>
                            ค้นหา
                        </Button>
                        </div>
                       
                    </div>
              
                </div>
            </div>
            <div class="flex flex-row justify-center bg-white rounded-3xl w-11/12 h-4/6 shadow-xl px-5 py-5">
                <Table.Root class="bg-white rounded-full" >
                    <Table.Header>
                      <Table.Row>
                        <Table.Head class="text-center">หมายเลข</Table.Head>
                        <Table.Head class="text-center">ชื่อสถานที่</Table.Head>
                        <Table.Head class="w-[300px] text-center">คำอธิบาย</Table.Head>
                        <Table.Head class="text-center">เบอร์โทร</Table.Head>
                        <Table.Head class="text-center">เว็บไซต์</Table.Head>
                        <Table.Head class="text-center">อีเมล</Table.Head>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <!-- #each -->
                        <Table.Row >
                            <Table.Cell on:click={()=> alert(123)}>1</Table.Cell>
                            <Table.Cell>โรงพยาบาลลาดกระบังกรุงเทพมหานคร</Table.Cell>
                            <Table.Cell class="text-center">ตึกคลินิกพิเศษ</Table.Cell>
                            <Table.Cell>024548128</Table.Cell>
                            <Table.Cell>www.pornhub.org</Table.Cell>
                            <Table.Cell>pornhub@gmail.com</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </div>
    </div>
    
</div>
</div>


