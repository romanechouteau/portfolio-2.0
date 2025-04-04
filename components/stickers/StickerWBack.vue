<template>
  <div
    :class="`relative max-w-full max-h-full`"
    :style="{ 'aspect-ratio': ratio }"
  >
    <div
      class="absolute bg-gray-50 w-full h-full sticker-back-mask"
      :style="{ '--url': `url(/assets/stickers/${name}.png)` }"
    ></div>
    <Sticker
      class="relative"
      :name="name"
      :transformClass="stickerTransform" />
  </div>
</template>

<script setup lang="ts">
const { ratio = '1/1' } = defineProps(['name', 'ratio', 'center', 'stickerTransform']);
</script>

<style scoped>
.sticker-back-mask {
  --url: url('/assets/stickers/creative-developer.png');
  mask-image: var(--url);
  mask-mode: alpha;
  mask-repeat: no-repeat;
  mask-size: contain;
}
</style>