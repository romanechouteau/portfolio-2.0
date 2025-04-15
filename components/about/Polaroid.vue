<template>
  <div class="relative bg-gray-50 p-[6%]">
    <img :src="imgSrc" class="aspect-square w-full"/>
    <img v-if="textSrc" :src="textSrc" class="absolute w-[98%] h-auto bottom-[1%] left-1/2 -translate-x-1/2" />
  </div>
</template>

<script setup lang="ts">
defineProps(['imgSrc', 'textSrc']);
</script>