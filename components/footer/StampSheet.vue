<template>
  <div class="bg-gray-100 p-16 grid grid-cols-2 gap-16">
    <StickerWBack
      v-for="index in 6"
      :key="index"
      :name="`stamp-${index % 2 == 0 ? '1' : '2'}`"
      class="col-span-1"
      ratio="136/102" />
  </div>
</template>