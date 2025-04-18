<template>
  <div class="col-span-6">
    <div class="flex flex-col gap-grid-gap">
      <div class="relative w-full aspect-[42/23]">
        <img
          src="@/assets/images/ds.svg"
          class="absolute top-0 left-0 w-[100.7%] max-w-none h-auto"/>
      </div>
      <div class="grid grid-cols-6 gap-grid-gap">
        <Mp3 class="col-span-4" />
        <div class="col-span-2 bg-gray-50"></div>
      </div>
    </div>
  </div>
  <Polaroid
    class="col-span-4"
    :img-src="`assets/polaroid/thanos-${thanosIdx}.jpg`"
    text-src="assets/polaroid/thanos-text.svg"/>
  <div class="col-span-2 bg-gray-50"></div>
  <div class="col-span-2 bg-gray-50"></div>
  <Id class="col-span-5" />
  <div class="col-span-5 bg-gray-50"></div>
</template>

<script setup lang="ts">
const thanosIdx = useState('thanosIdx', () => Math.ceil(Math.random() * 7));
</script>