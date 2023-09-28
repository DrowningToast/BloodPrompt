<script>
    export let data;
    import cup from '$lib/images/staff/reward/reward1.png';
    let images = `$lib/images/staff/reward/reward1.png`
    
    console.log(data.img);
</script>

<div class="flex gap-7 p-4">
    <div class="w-5/12">
        <img src="" alt="">
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
    </div>
</div>