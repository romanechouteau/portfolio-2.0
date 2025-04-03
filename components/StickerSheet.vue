<template>
  <div class="col-span-5 bg-neutral-200 aspect-square">
    <div class="w-full h-[20%] bg-neutral-300"></div>
    <div class="h-[80%] p-24 flex flex-wrap gap-x-40 items-center">
      <div class="w-full">
        <StickerGroup
          name="creative-developer"
          class="ml-24"
          sizeClass="w-[min(22vw,340px)]"
          stickerTransform="translate-x-[-3%] translate-y-[5%] rotate-[-5deg]" />
      </div>
      <StickerGroup
        name="2001"
        sizeClass="w-[min(8vw,120px)]"
        stickerTransform="translate-x-[5%] translate-y-[8%] rotate-[10deg]" />
      <StickerGroup
        name="french"
        sizeClass="w-[min(10vw,200px)]"
        stickerTransform="translate-x-[-4%] translate-y-[-6%] rotate-[8deg]" />
    </div>
  </div>
</template>