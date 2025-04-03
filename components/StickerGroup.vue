<template>
  <div :class="`relative ${sizeClass}`">
    <div
      class="bg-neutral-50 w-full sticker-back-mask"
      :style="{ '--url': `url(/assets/stickers/${name}.png)` }"
    >
      <img :src="`/assets/stickers/${name}.png`" class="invisible" />
    </div>
    <Sticker
      :name="name"
      :class="sizeClass"
      :transformClass="stickerTransform"
    />
  </div>
</template>

<script setup lang="ts">
defineProps(['name', 'sizeClass', 'stickerTransform']);
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