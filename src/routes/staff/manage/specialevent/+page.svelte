<script lang="ts">
    import sEventImg from '$lib/images/staff/manage_specialevent/Rectangle 24.png';
    import { Home, LogOut, UserCircle, FileText, Gift, CalendarHeart, CalendarClock } from 'lucide-svelte';
    import bloodPromptLogo from '$lib/images/moderator/login/bloodprompt-logo.png';
    import { Button } from "$lib/components/ui/button";

</script>
<div class="flex flex-row w-full justify-between bg-gray-300 max-w-[100vw] min-h-[100vh]">
    <div class="flex flex-col bg-[#191F2F] w-3/12 h-full">
		<div class="flex flex-row px-8 py-16 justify-center">
			<img src={bloodPromptLogo} alt="" class="w-16" />
			<h1 class="translate-y-4 text-xl font-bold text-white px-3">BLOODPROMPT</h1>
		</div>
		<div class="flex flex-col px-5 w-full min-h-screen justify-between">
			<div class="flex flex-col gap-8 w-full">
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><Home class="w-5 h-5 " />หน้าหลัก</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#EF4444] hover:bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><FileText class="w-5 h-5" />การจองคิว</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><Gift class="w-5 h-5" />จัดการรางวัล</Button
				>
				<Button
					class="flex justify-start items-center gap-3 bg-[#191F2F] text-base  rounded-full text-start px-6 py-4 h-12 text-white"
					><CalendarHeart class="w-5 h-5" />จัดการกิจกรรมหรือแคมเปญ</Button
				>
			</div>
			<Button
				class="flex justify-start gap-2 text-white text-start px-6 py-3 items-center bg-[#191F2F] mb-9"
				><LogOut class="mr-2 h-5    w-5 stroke-white" />ออกจากระบบ</Button
			>
		</div>
	</div>
    <div class="flex flex-col items-center w-9/12">
        <div class="flex relative items-center bg-white px-14  w-full h-16 py-6 justify-center">
            <h1 class="flex font-bold text-lg">โรงพยาบาลลาดกระบัง</h1>
            <div class="flex gap-3 items-center absolute left-[929px]">
                <UserCircle class="fill-[#EF4444] stroke-white scale-150"/>
                <p>บุคคลากรทางการแพทย์</p>
            </div>
        </div>
        <div class="flex flex-col w-full justify-start pt-8 pl-20">
            <p class="text-black text-2xl font-bold">จัดการกิจกรรมพิเศษ</p>
            <p class="text-[#888]">สามารถจัดการกิจกรรมพิเศษจองสถานที่นั้นๆ</p>
        </div>
        <div class="flex w-[1100px] h-[524px] bg-white rounded-[20px] mt-12 justify-between p-4">
            <div class="w-1/2">
                <img src={sEventImg} alt="" class="w-[90%] h-full">
            </div>
            <div class="flex flex-col w-1/2 gap-7">
                <div>
                    <p class="text-3xl font-bold">เลือดแห่งชีวิต</p>
                    <p class="ml-7 mt-3">
                        ดีพาร์ทเมนต์สลัมจีดีพีทอล์คดยุค แอพพริคอทฮิปฮอป วัจนะควีนสปอต เบนโลคาร์ รันเวย์บรา แพนด้า โอเปอเรเตอร์โซน ซานตาคลอสเด้อกัมมันตะวอเตอร์ ซิ่งบิล หลวงตาชินบัญชรว้อดก้าซาบะบึ้ม นาฏยศาลาจิตพิสัยหลินจือ อันเดอร์จิตพิสัยสตรอเบอร์รี สไตรค์ไทยแลนด์แกสโซฮอล์หยวน คอนโดมิเนียม ทอล์คลอร์ดสันทนาการ โรแมนติคซะดีพาร์ตเมนท์บูติก
                        คอร์รัปชั่นฮิบรูศิรินทร์โยโย่ เที่ยงวันปาร์ตี้ออร์เดอร์ เจ๊าะแจ๊ะไมค์มาร์เก็ตติ้งไคลแม็กซ์ สหัชญาณ โคโยตีเวสต์คอรัปชัน สัมนาสถาปัตย์ดีเจล็อบบี้แอปเปิล โอเปอเรเตอร์แคร็กเกอร์เทคโนแครตยอมรับโอยัวะ เสกสรรค์แทกติคมอลล์เลสเบี้ยนผู้นำ เยนโยเกิร์ต ละอ่อนแกงค์บุ๋น เคลียร์สะกอมอุด้งแชมเปี้ยน อันตรกิริยาเวสต์เซฟตี้ กรีนคอนเทนเนอร์ยิมซาตานเอ็นจีโอ 
                    </p>
                </div>
                <div class="flex flex-col">
                    <p class="flex items-center gap-2 text-2xl font-bold"><CalendarClock />ระยะเวลาจัดกิจกรรม</p>
                    <p class="font-bold pl-8">01/08/2023 08:00 - 12/08/2023 16:00</p>
                </div>
                <div class="flex justify-end gap-6 mt-auto">
                    <Button class="flex self-center text-[#EF4444] border-[#EF4444] border-2 rounded-3xl w-32 h-10 gap-1 bg-white rounded-3xls hover:text-white hover:bg-[#EF4444]">แก้ไข</Button>
                    <Button class="flex self-center text-white rounded-3xl w-32 h-10 gap-1 bg-[#EF4444] rounded-3xls">ลบ</Button>
                </div>
            </div>
        </div>
    </div>
         </div>

