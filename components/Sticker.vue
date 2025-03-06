<template>
  <div
    ref="wrapper"
    :class="{
      'absolute left-0 top-0': !isMoved,
      'fixed': isMoved,
      'cursor-grabbing z-20': isGrabbing,
      'hover:cursor-grab z-10': !isGrabbing
    }"
    @mousedown="onMouseDown"
  >
    <img
      ref="sticker"
      :src="`assets/stickers/${name}.png`"
      :class="`select-none ${transformClass}`"
      draggable="false"
    />
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";

defineProps(['name', 'transformClass']);

const wrapper = ref<HTMLDivElement | null>(null);
const sticker = ref<HTMLImageElement | null>(null);

const isGrabbing = ref<boolean>(false);
const isMoved = ref<boolean>(false);
const position = ref({ x: 0, y: 0 });
const mousePosition = ref({ x: 0, y: 0 });

const onMouseDown = (evt: MouseEvent) => {
  if (!wrapper.value) return;

  // set mouse position
  mousePosition.value.x = evt.clientX;
  mousePosition.value.y = evt.clientY + window.scrollY;

  // set elem position
  const { x, y } = wrapper.value.getBoundingClientRect();
  position.value.x = x;
  position.value.y = y + window.scrollY;
  wrapper.value.style.left = `${position.value.x / window.innerWidth * 100}vw`;
  wrapper.value.style.top = `${position.value.y}px`;

  // update state
  isMoved.value = true;
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
  wrapper.value.style.left = `${position.value.x / window.innerWidth * 100}vw`;
  wrapper.value.style.top = `${position.value.y}px`;
}

const onMouseUp = () => {
  // update state
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