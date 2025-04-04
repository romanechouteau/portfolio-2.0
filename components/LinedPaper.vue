<template>
  <div class="relative flex justify-center items-center bg-gray-50 lined-paper">
    <div class="h-[80%] w-full absolute top-[10%] left-0 lines"></div>
    <div class="w-[70%] rotate-[-8deg]"><slot/></div>
  </div>
</template>

<script setup lang="ts">
defineProps(['text']);
</script>

<style scoped>
.lined-paper {
  background-image: linear-gradient(90deg, var(--colors-gray-200) 1px, transparent 1px);
  background-position: 15% 0;
  background-size: 2px 120%;
  background-repeat: no-repeat;
}
.lines {
  background-image: linear-gradient(0deg, var(--colors-gray-100) 1px, transparent 1px);
  background-size: 100% 7%;
  background-repeat: repeat-y;
}
</style>