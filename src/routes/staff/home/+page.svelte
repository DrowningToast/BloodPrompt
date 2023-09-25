<script lang="ts">
    // import { Button } from "@/components/ui/button"
    import bloodpromptlogo from '$lib/images/staff/login/bloodprompt-logo.png';
    import { UserCircle } from 'lucide-svelte'
    import * as Table from "$lib/components/ui/table";
    import Dropdown from './dropdown.svelte';
    import AmountCard from './amount.svelte';
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
    <div class="flex flex-col bg-[#191F2F] w-3/12">
        <div class="flex px-8 py-16 justify-center">
            <img src={bloodpromptlogo} alt="" class="w-16">
            <h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
        </div>
        <div class="flex flex-col  w-full h-[72%] justify-between">
            <div class="flex flex-col w-full px-5 gap-8 object-cover">
                <button class="bg-[#EF4444]  rounded-3xl text-start text-base px-11 py-3 text-white w-full">หน้าหลัก</button>
                <button class="bg-[#191F2F]  rounded-3xl text-start  text-base px-11 py-3 text-white">จัดการสถานที่รับบริจาคเลือด</button>
                <button class="bg-[#191F2F]  rounded-3xl text-start px-11 py-3 text-white">จัดการบัญชีบุคลากรการเเพทย์</button>
                <button class="bg-[#191F2F]  rounded-3xl text-start px-11 py-3 text-white">จัดการบัญชี / เปลี่ยนรหัสผ่าน</button></div>
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
            <div class="flex flex-col bg-white w-[1103px] h-[274px] rounded-xl justify-between">
                <p class="pt-6 pl-6 font-semibold">สถานที่บริจาคเลือดในระบบ</p>
                    <Table.Root>
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