export type Artist = {
  id: number;
  name: string;
};

export type Track = {
  id: number;
  title: string;
  artist: Artist;
  preview: string;
  explicit_lyrics: boolean;
};

export type Playlist = {
  id: number;
  tracks: {
    data: Track[];
  };
};