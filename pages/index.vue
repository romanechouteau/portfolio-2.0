<template>
  <div class="scale-100 pt-96">
    <div class="container grid grid-cols-12 gap-grid-gap py-32">
      <StickerSheet />
      <div class="col-span-4 bg-neutral-100"></div>
      <div class="col-span-3 flex flex-col gap-grid-gap">
        <div class="bg-neutral-200 aspect-square"></div>
        <div class="bg-neutral-300 h-full"></div>
      </div>
      <div class="col-span-12 aspect-[16/9]">
        <div class="w-full h-full bg-neutral-200"></div>
      </div>
    </div>
  </div>
</template>