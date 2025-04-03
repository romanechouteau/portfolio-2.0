<template>
  <div class="relative flex justify-center items-center bg-neutral-100 lined-paper">
    <div class="h-[80%] w-full absolute top-[10%] left-0 lines"></div>
    <div class="w-[70%] rotate-[-8deg]"><slot/></div>
  </div>
</template>

<script setup lang="ts">
defineProps(['text']);
</script>

<style scoped>
.lined-paper {
  background-image: linear-gradient(90deg, #B3B3B3 1px, transparent 1px);
  background-position: 15% 0;
  background-size: 2px 120%;
  background-repeat: no-repeat;
}
.lines {
  background-image: linear-gradient(0deg, #CCCCCC 1px, transparent 1px);
  background-size: 100% 7%;
  background-repeat: repeat-y;
}
</style>