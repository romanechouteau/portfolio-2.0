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
import { addSticker } from "@/store/Stickers";

const { name, transformClass } = defineProps(['name', 'transformClass']);

const invisible = ref(false);
const wrapper = ref<HTMLDivElement | null>(null);

// set sticker visibility
const setVisibility = (val: boolean) => {
  invisible.value = !val;
}

// --MOUSE DOWN--

const onMouseDown = (evt: MouseEvent) => {
  if (!wrapper.value) return;

  // get sticker position & size
  const { x, y, width, height } = wrapper.value.getBoundingClientRect();

  // send data to global sticker store
  // a global sticker will be created to replace the local sticker
  addSticker({
    name,
    width,
    height,
    startX: x,
    startY: y + window.scrollY,
    startEvt: evt,
    transformClass,
    setVisibility,
  });
};
</script>