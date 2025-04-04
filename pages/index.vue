<template>
  <div class="container grid grid-cols-12 gap-grid-gap pt-128 pb-32">
    <StickerSheet class="col-span-5"/>
    <LinedPaper class="col-span-4">
      <p>hi! i'm romane chouteau, a 23 year old french developer :)</p>
    </LinedPaper>
    <div class="col-span-3 flex flex-col gap-grid-gap">
      <PostIt class="aspect-square" />
      <Tray class="h-full" />
    </div>
    <div class="col-span-12 aspect-[16/9]">
      <div class="w-full h-full bg-gray-100"></div>
    </div>
  </div>
  <GlobalStickers />
</template>