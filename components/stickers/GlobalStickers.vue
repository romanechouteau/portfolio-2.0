<template>
  <GlobalSticker
    v-for="sticker of stickerList"
    :key="sticker.name"
    :stickerData="sticker"
  />
</template>

<script setup lang="ts">
import { Stickers, resetStickers } from "~/store/Stickers";

const stickerList = computed(() => {
  return Stickers.list;
})

const onResize = () => {
  resetStickers();
}

onMounted(() => {
  window.addEventListener('resize', onResize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
})
</script>