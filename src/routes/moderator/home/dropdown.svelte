<script>
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { ChevronDown, LogOut } from "lucide-svelte";
    let position = "bottom";
</script>

<div>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
            <Button variant="outline" builders={[builder]} class="p-0 m-0 border-transparent bg-white hover:bg-white"><ChevronDown class="p-0 m-0 fill-black stroke-none"/></Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="flex flex-col">
            <DropdownMenu.Item class="justify-center cursor-pointer"><LogOut class="mr-2 h-5 w-5 stroke-black" />ออกจากระบบ</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
</div>