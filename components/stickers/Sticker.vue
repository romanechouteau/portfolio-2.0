<template>
  <div
    ref="wrapper"
    :class="['hover:cursor-grab', invisible ? 'invisible' : '']"
    @mousedown="onMouseDown"
  >
    <img
      :src="`assets/stickers/${name}.png`"
      :class="['select-none w-full h-full', transformClass]"
      draggable="false"
    />
  </div>
</template>

<script setup lang="ts">
import { addSticker } from "~/store/Stickers";

const { name, transformClass } = defineProps(['name', 'transformClass']);

const invisible = ref(false);
const wrapper = ref<HTMLDivElement | null>(null);

// set sticker visibility
const setVisibility = (val: boolean) => {
  invisible.value = !val;
}

// send sticker data to global stickers
const onMouseDown = (evt: MouseEvent) => {
  if (!wrapper.value) return;

  // get sticker position & size
  const { x, y, width, height } = wrapper.value.getBoundingClientRect();

  // send all data
  addSticker({
    name,
    width,
    height,
    startX: x,
    startY: y,
    startEvt: evt,
    transformClass,
    setVisibility,
  });
};
</script>