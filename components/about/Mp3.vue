<template>
  <div class="relative aspect-[437/128]">
    <img
      src="@/assets/images/mp3.svg"
      class="absolute top-0 left-0 w-[101.5%] max-w-none h-auto"/>
    <div
      class="absolute left-[36.5%] top-[48%] -translate-y-1/2 -translate-x-1/2 w-[40%] h-[35%] rounded-[.3vw] text-gray-800 bg-gray-600 overflow-hidden"
    >
      <div :class="[
        'w-full h-full flex items-center  shadow-[inset_0_0_1.5vw_0.8vw_var(--colors-pink)] transition-opacity duration-500 ease-in-out',
        isOn ? 'opacity-100' : 'opacity-0'
      ]">
        <template
          v-for="(track, i) in tracks"
          :key="i"
        >
          <ul
            v-if="isOn && i === currentTrackIndex"
            class="list-none p-0 m-0 flex"
          >
            <li
              v-for="index in 3"
              :key="index"
              :class="[
                'marquee-text shrink-0 px-16',
                !isPlaying && 'paused'
              ]"
              :style="{ animationDuration: `${track.marqueeDuration}s` }"
            >
              {{ track.name }}
            </li>
          </ul>
        </template>
      </div>
    </div>
    <button
      class="absolute right-[9%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[8%] aspect-square rounded-full"
      @click="togglePlay">
    </button>
    <button
      class="absolute right-[19.3%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3%] h-[20%]"
      @click="prevTrack">
    </button>
    <button
      class="absolute right-[8.6%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3%] h-[20%]"
      @click="nextTrack">
    </button>
  </div>
</template>

<script setup lang="ts">
import { type Track as DeezerTrack, type Playlist } from 'types/Deezer';

type Track = {
  preview: string;
  name: string;
  marqueeDuration: number;
}

const { data } = await useFetch('https://api.deezer.com/playlist/13731949981');

const audio = ref<HTMLAudioElement | null>(null);
const currentTrackIndex = ref(0);
const isOn = ref(false);
const isPlaying = ref(false);

// TRACKS DATA

const getTrackName = (track: DeezerTrack) => {
  const title = track.title.replaceAll(" ", "_");
  const artist = track.artist.name.replaceAll(" ", "_");
  const explicit = track.explicit_lyrics ? "_(explicit)" : "";
  return `${title}${explicit}_${artist}_(preview).mp3`;
}

const tracks = (data.value as Playlist).tracks.data.reduce((acc: Track[], track: DeezerTrack) => {
    if (track.preview) {
      const name = getTrackName(track);
      acc.push({
        preview: track.preview,
        name,
        marqueeDuration: name.length * 0.3
      });
    }
    return acc;
  }, [] as Track[]);

// POWER ON (SETUP)

const powerOn = () => {
  if (isOn.value) return;
  isOn.value = true;
  audio.value = new Audio();
  audio.value.addEventListener("ended", nextTrack);
  changeTrack();
}

// PLAY/PAUSE

const togglePlay = () => {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
}

const play = () => {
  powerOn();
  isPlaying.value = true;
  audio.value?.play();
}

const pause = () => {
  if (!isOn.value) return;
  isPlaying.value = false;
  audio.value?.pause();
}

// TRACKS CHANGE

const changeTrack = () => {
  const currentTrack = tracks[currentTrackIndex.value];
  if (!audio.value || !currentTrack) return;
  audio.value.pause();
  audio.value.src = currentTrack.preview;
  audio.value.play();
}

const prevTrack = () => {
  if (tracks.length == 0 || !isOn.value) return;
  currentTrackIndex.value = (((currentTrackIndex.value - 1) % tracks.length) + tracks.length) % tracks.length;
  changeTrack();
}

const nextTrack = () => {
  if (tracks.length == 0 || !isOn.value) return;
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length;
  changeTrack();
}

// CLEAN-UP

onBeforeUnmount(() => {
  if (audio.value) {
    audio.value.pause();
    audio.value.removeEventListener("ended", nextTrack);
  }
  audio.value = null;
});
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  } to {
    transform: translateX(-100%);
  }
}

.marquee-text {
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.marquee-text.paused {
  animation-play-state: paused;
}
</style>