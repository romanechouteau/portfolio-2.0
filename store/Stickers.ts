import { reactive } from "vue";

export type Sticker = {
  id: number,
  name: string,
  width: number,
  height: number,
  startX: number,
  startY: number,
  startEvt: MouseEvent,
  transformClass: string,
  setVisibility: (visible: boolean) => void,
}

export const Stickers: {
  list: Sticker[]
} = reactive({
  list: [],
});

export function addSticker(sticker: Sticker) {
  Stickers.list.push(sticker);
}

export function toFront(sticker: Sticker) {
  const index = Stickers.list.indexOf(sticker);
  if (index > -1) {
    Stickers.list.splice(index, 1);
    Stickers.list.push(sticker);
  }
}

export function resetStickers() {
  Stickers.list.forEach(sticker => {
    sticker.setVisibility(true);
  });
  Stickers.list = [];
}