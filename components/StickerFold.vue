<template>
  <div
    ref="wrapper"
    :class="{
      'sticker-wrapper': true,
      'absolute left-0 top-0': !isMoved,
      'fixed': isMoved,
      'cursor-grabbing z-20': isGrabbing,
      'hover:cursor-grab z-10': !isGrabbing
    }"
      @mousedown="onMouseDown"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
    <div
      ref="sticker"
      :class="`${transformClass}`"
    >
      <img
        :src="`assets/stickers/${name}.png`"
        class="sticker-front select-none"
        draggable="false"
      />
      <div
        class="sticker-back absolute top-0 left-0 w-full h-full pointer-events-none"
        :style="{ '--url': `url(/assets/stickers/${name}.png)` }"
      >
      </div>
    </div>
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

const onMouseEnter = () => {
  if (!sticker.value) return;

  gsap.timeline()
    .to(sticker.value.querySelector('.sticker-back'), {
      translateX: '80%',
      "--width": '10%',
      duration: 0.3,
      ease: "power1.out"
    }, 0)
    .to(sticker.value.querySelector('.sticker-front'), {
      maskPosition: '10%',
      duration: 0.3,
      ease: "power1.out"
    }, 0)
}

const onMouseLeave = () => {
  if (!sticker.value) return;

  gsap.timeline()
    .to(sticker.value.querySelector('.sticker-back'), {
      translateX: '100%',
      "--width": 0,
      duration: 0.3,
    }, 0)
    .to(sticker.value.querySelector('.sticker-front'), {
      maskPosition: 0,
      duration: 0.3,
    }, 0);
}
</script>

<style scoped>
.sticker-front {
  mask-image: linear-gradient(90deg, black 49.9%, transparent 50%);
  mask-size: 200%;
  mask-position: 0%;
}

.sticker-back {
  --width: 0;
  --url: url('/assets/stickers/creative-developer.png');
  mask-image: var(--url);
  mask-mode: alpha;
  mask-repeat: no-repeat;
  mask-size: contain;
  transform: rotateY(180deg) translateX(-100%);
}

.sticker-back::after {
  content: '';
  display: block;
  margin-left: auto;
  width: var(--width);
  height: 100%;
  background-color: white;
}
</style>