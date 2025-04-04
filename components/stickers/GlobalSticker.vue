<template>
  <div
    ref="wrapper"
    :class="[
      'absolute',
      isGrabbing ? 'cursor-grabbing z-20': 'hover:cursor-grab z-10'
    ]"
    @mousedown="onMouseDown"
  >
    <img
      ref="sticker"
      :src="`assets/stickers/${name}.png`"
      :class="['select-none w-full h-full', transformClass]"
      draggable="false"
      @load="loaded"
    />
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { toFront } from "@/store/Stickers";

const { stickerData } = defineProps(['stickerData']);
const { name, width, height, startX, startY, startEvt, setVisibility, transformClass } = stickerData;

const wrapper = ref<HTMLDivElement | null>(null);
const sticker = ref<HTMLImageElement | null>(null);

const isGrabbing = ref<boolean>(false);
const position = ref({ x: 0, y: 0 });
const mousePosition = ref({ x: 0, y: 0 });

// wait for image to load to hide fixed sticker
const loaded = () => {
  setVisibility(false);
}

// setup sticker on mounted
onMounted(() => {
  position.value.x = startX;
  position.value.y = startY;

  if (wrapper.value) {
    wrapper.value.style.left = `${position.value.x}px`;
    wrapper.value.style.top = `${position.value.y}px`;
    wrapper.value.style.width = `${width}px`;
    wrapper.value.style.height = `${height}px`;
  }

  onMouseDown(startEvt);
})

const onMouseDown = (evt: MouseEvent) => {
  if (!wrapper.value) return;

  // set mouse position
  mousePosition.value.x = evt.clientX;
  mousePosition.value.y = evt.clientY + window.scrollY;

  // update grabbing state
  isGrabbing.value = true;

  // add event listeners
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  // animate sticker
  gsap.to(sticker.value, {
    scale: 1.1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    duration: 0.3,
    ease: 'bounce.in'
  });

  toFront(stickerData);
};

const onMouseMove = (evt: MouseEvent) => {
  if (!wrapper.value) return;

  // get mouse position
  const x = evt.clientX;
  const y = evt.clientY + window.scrollY;

  // compute movement
  const offsetX = x - mousePosition.value.x;
  const offsetY = y - mousePosition.value.y;

  // save mouse position
  mousePosition.value.x = x;
  mousePosition.value.y = y;

  // update elem position
  position.value.x += offsetX;
  position.value.y += offsetY;
  wrapper.value.style.left = `${position.value.x}px`;
  wrapper.value.style.top = `${position.value.y}px`;
}

const onMouseUp = () => {
  // update grabbing state
  isGrabbing.value = false;

  // remove event listeners
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('mousemove', onMouseMove);

  // animate sticker
  gsap.to(sticker.value, {
    scale: 1,
    rotate: Math.random() * 40 - 20,
    duration: 0.3,
    ease: 'bounce.out'
  });
}
</script>