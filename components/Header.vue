<template>
  <div
    ref="header"
    class="container fixed h-80 pt-16 left-1/2 -translate-x-1/2 z-30"
  >
    <div class="w-full h-full bg-gray-300 flex items-center justify-between px-32">
      <span class="col-span-full">romane chouteau</span>
      <ul class="flex gap-32">
        <li>my work</li>
        <li>about me</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";

const header = ref<HTMLElement | null>(null);

const visible = ref(true);
const scrollY = ref(0);

// --SCROLL ANIMATION--

onMounted(async () => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const onScroll = () => {
  if (!header.value) return;

  const diff = window.scrollY - scrollY.value;
  scrollY.value = window.scrollY;

  if (diff > 0 && visible.value) {
    visible.value = false;
    gsap.to(header.value, {
      duration: 0.25,
      translateY: "-100%",
      ease: "power2.inOut",
    });
  } else if (diff < 0 && !visible.value) {
    visible.value = true;
    gsap.to(header.value, {
      duration: 0.5,
      translateY: "0",
      ease: "power2.inOut",
    });
  }
}
</script>