<template>
  <div class="aspect-[42/23]">
    <div class="bg-gray-50 h-[8%] rounded-full"></div>
    <div class="bg-gray-50 h-[92%] rounded-[1vw] flex flex-col gap-[0.2vw] justify-center items-center">
      <div
        v-for="index in 2"
        :key="index"
        class="w-[10%] aspect-[10/7] rounded-[0.8vw] border-[0.4vw] border-white">
      </div>
    </div>
  </div>
</template>