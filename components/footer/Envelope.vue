<template>
  <div
    ref="envelope"
    class="aspect-[32/27] grid grid-rows-3"
  >
    <div class="relative mx-32">
      <div
        ref="paper"
        class="absolute w-full h-[200%] p-32 bg-gray-50 translate-y-1/2"
      >
        <div class="w-full h-full flex flex-col items-center justify-center">
          <a>hello@romanechoutau.fr</a>
        </div>
      </div>
    </div>
    <div class="bg-gray-600 pointer-events-none">
      <div class="relative w-full h-full">
        <div class="absolute w-full h-full envelope-opening"></div>
      </div>
    </div>
    <div class="relative bg-gray-500 pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";

const envelope = ref<HTMLDivElement | null>(null);
const paper = ref<HTMLDivElement | null>(null);

onMounted(() => {
  gsap.fromTo(paper.value, {
      translateY: "50%"
    }, {
      translateY: "0",
      duration: 1,
      scrollTrigger: {
        trigger: envelope.value,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        once: true,
      },
    });
  });
</script>

<style>
.envelope-opening {
  background-image: linear-gradient(to bottom left, transparent 50%, var(--colors-gray-500) 50.5%),
    linear-gradient(to bottom right, transparent 50%, var(--colors-gray-500) 50.5%);
  background-size: 50% 100%;
  background-repeat: no-repeat;
  background-position: top left, top right;
}
</style>