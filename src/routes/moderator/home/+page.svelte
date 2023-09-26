<script lang="ts">
    import Dropdown from './dropdown.svelte';
    import AmountCard from './amount.svelte';
    import { Home, LogOut, UserCircle, UserCircle2,MapPin, Lock } from 'lucide-svelte';
    import bloodpromptlogo from '$lib/images/moderator/login/bloodprompt-logo.png';
    import * as Table from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";

    const places = [
    {
      name: "INV001",
      status: "Paid",
      address: "$250.00",
      contact: "Credit Card"
    },
    {
      name: "INV002",
      status: "Pending",
      address: "$150.00",
      contact: "PayPal"
    },
    {
      name: "INV003",
      status: "Unpaid",
      address: "$350.00",
      contact: "Bank Transfer"
    },
    {
      name: "INV004",
      status: "Paid",
      address: "$450.00",
      contact: "Credit Card"
    },
    {
      name: "INV005",
      status: "Paid",
      address: "$550.00",
      contact: "PayPal"
    },
    {
      name: "INV006",
      status: "Pending",
      address: "$200.00",
      contact: "Bank Transfer"
    },
    {
      name: "INV007",
      status: "Unpaid",
      address: "$300.00",
      contact: "Credit Card"
    }
  ];
</script>
<div class="flex flex-row w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh]">
    <div class="flex flex-col bg-[#191F2F] w-3/12 h-auto">
        <div class="flex flex-row px-8 py-16 justify-center">
            <img src={bloodpromptlogo} alt="" class="w-16">
            <h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
        </div>
        <div class="flex flex-col px-5 w-full h-full justify-between">
            <div class="flex flex-col gap-8 w-full">
                <Button class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"><Home class="w-5 h-5 "/>หน้าหลัก</Button>
                <Button class="flex justify-start items-center gap-3 bg-[#EF4444] hover:bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"><MapPin class="w-5 h-5" />จัดการสถานที่รับบริจาคเลือด</Button>
                <Button class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"><UserCircle2 class="w-5 h-5"/>จัดการบัญชีบุคลากรการเเพทย์</Button>
                <Button class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"><Lock class="w-5 h-5" />จัดการบัญชี / เปลี่ยนรหัสผ่าน</Button>
            </div>
            <Button class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"><LogOut class="mr-2 h-5 w-5 stroke-white" />ออกจากระบบ</Button>
        </div>
    </div>
    <div class="flex flex-col items-center w-9/12">
        <div class="flex items-center bg-white px-14  w-full h-16  py-6 flex-row justify-between">
            <h1 class=" font-bold text-lg">BloodPrompt (สำหรับผู้ดูเเลระบบ)</h1>
            <div class="flex gap-3 items-center">
                <UserCircle class="fill-[#EF4444] stroke-white scale-150"/>
                <p>ผู้ดูแลระบบ</p>
                <Dropdown></Dropdown>
        </div>
    </div>
        <div class="flex flex-col gap-11 mt-11 w-full h-full items-center">
            <!-- active info -->
            <div class="flex gap-14 justify-center">
                <AmountCard title={"จำนวนบัญชีผู้ใช้ในระบบ"} amount={9999} person={true}/>
                <AmountCard title={"จำนวนสถานที่ในระบบ"} amount={9999} person={false}/>
                <AmountCard title={"จำนวนบัญชีผู้ใช้ในระบบ"} amount={9999} person={true}/>
            </div>
            <!-- graph -->
            <div class="flex flex-row justify-between gap-11">
                <!-- box1 -->
                <div class="w-[530px] h-[334px] bg-white rounded-xl">
                    <p class="p-5 font-semibold">จำนวนเลือดในคลังทั้งหมด</p>
                </div>
                <!-- box2 -->
                <div class="w-[530px] h-[334px] bg-white rounded-xl">
                    <p class="p-5 font-semibold">
                        สถิติการบริจาคเลือดย้อนหลัง
                    </p>
                </div>
            </div>
            <!-- place to donate -->
            <div class="flex flex-col bg-white w-[1103px] h-[274px] rounded-xl">
                <p class="pt-6 pl-6 font-semibold">สถานที่บริจาคเลือดในระบบ</p>
                <div class="flex justify-center bg-white rounded-3xl w-12/12 h-5/6 shadow-xl px-4 py-3">
                    <Table.Root class="bg-white rounded-full">
                        <Table.Header >
                            <Table.Row>
                                <Table.Head>ชื่อสถานบริจาค</Table.Head>
                                <Table.Head>สถานะ</Table.Head>
                                <Table.Head>ที่อยู่</Table.Head>
                                <Table.Head>ติดต่อ</Table.Head>
                            </Table.Row>
                        </Table.Header>
                    <Table.Body>
                        {#each places as place, i (i)}
                        <Table.Row>
                            <Table.Cell>{place.name}</Table.Cell>
                            <Table.Cell>{place.status}</Table.Cell>
                          <Table.Cell>{place.contact}</Table.Cell>
                          <Table.Cell>{place.address}</Table.Cell>
                        </Table.Row>
                        {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
                </div>
        </div>
    </div>
    
</div>