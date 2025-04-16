<template>
  <div class="relative aspect-[437/128]">
    <img
      src="@/assets/images/mp3.svg"
      class="absolute top-0 left-0 w-[101.5%] max-w-none h-auto"/>
    <div
      class="absolute left-[36.5%] top-[48%] -translate-y-1/2 -translate-x-1/2 w-[40%] h-[35%] rounded-[.3vw] bg-gray-600 text-white overflow-hidden flex items-center"
    >
      <span :class="isOn ? '' : 'opacity-0'">{{ text }}</span>
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
import { type Track, type Playlist } from 'types/Deezer';

const { data } = await useFetch('https://api.deezer.com/playlist/13731949981');

const audio = ref<HTMLAudioElement | null>(null);
const currentTrackIndex = ref(0);
const isOn = ref(false);
const isPlaying = ref(false);

// DATA

const tracks = (data.value as Playlist).tracks.data.reduce((acc: Track[], track: Track) => {
    if (track.preview) {
      acc.push(track);
    }
    return acc;
  }, [] as Track[]);

const currentTrack = computed(() => {
  if (tracks.length == 0) return null;
  return tracks[currentTrackIndex.value];
})

const text = computed(() => {
  if (!currentTrack.value) return " ";
  const title = currentTrack.value.title.replaceAll(" ", "_");
  const artist = currentTrack.value.artist.name.replaceAll(" ", "_");
  const explicit = currentTrack.value.explicit_lyrics ? "_(explicit)" : "";
  return `${title}${explicit}_${artist}_(preview).mp3`;
})

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
  if (!audio.value || !currentTrack.value) return;
  audio.value.pause();
  audio.value.src = currentTrack.value.preview;
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