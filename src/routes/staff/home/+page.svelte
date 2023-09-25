<script lang="ts">
    // import { Button } from "@/components/ui/button"
    import Dropdown from './dropdown.svelte';
    import AmountCard from './amount.svelte';
    import { Home, LogOut, Info, UserCircle, UserCircle2, KeyRound ,MapPin, Lock, PlusCircle } from 'lucide-svelte';
    import bloodpromptlogo from '$lib/images/staff/login/bloodprompt-logo.png';
    import * as Table from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";
    
    let position = "bottom";


    const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card"
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal"
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer"
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card"
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal"
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer"
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card"
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
        <div class="flex items-center bg-white px-14  w-full  py-6 flex-row justify-between">
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
                                <Table.Head>Invoice</Table.Head>
                                <Table.Head>Status</Table.Head>
                                <Table.Head>Method</Table.Head>
                                <Table.Head>Amount</Table.Head>
                            </Table.Row>
                        </Table.Header>
                    <Table.Body>
                        {#each invoices as invoice, i (i)}
                        <Table.Row>
                            <Table.Cell>{invoice.invoice}</Table.Cell>
                            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
                          <Table.Cell>{invoice.paymentMethod}</Table.Cell>
                          <Table.Cell>{invoice.totalAmount}</Table.Cell>
                        </Table.Row>
                        {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
                </div>
        </div>
    </div>
    
</div>