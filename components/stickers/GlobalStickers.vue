<template>
  <GlobalSticker
    v-for="sticker of stickerList"
    :key="sticker.id"
    :stickerData="sticker"
  />
</template>

<script setup lang="ts">
import { Stickers, resetStickers } from "@/store/Stickers";

const stickerList = computed(() => {
  return Stickers.list;
})

// --WINDOW RESIZE--

onMounted(() => {
  window.addEventListener('resize', onResize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
})

const onResize = () => {
  // all stickers go back to their original position
  resetStickers();
}
</script>