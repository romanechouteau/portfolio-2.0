<template>
  <div class="relative grid grid-cols-1 grid-rows-[min-content_0fr] has-[:checked]:grid-rows-[min-content_1fr] last:grid-rows-[auto_1fr] cursor-pointer transition-[grid-template-rows] duration-300 ease-in-out">
    <div class="relative w-full flex justify-end">
      <div :class="`py-8 px-24 bg-${color}`">{{ name }}</div>
      <input type="radio" name="project" class="absolute inset-0 opacity-0 cursor-pointer"></input>
    </div>
    <div class="aspect-[16/9] w-full h-full overflow-hidden">
      <div :class="`absolute w-full aspect-[16/9] bg-${color}`"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps(['name', 'color']);
</script>