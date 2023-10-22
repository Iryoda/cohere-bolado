import { Song } from "@/interfaces";

export type Music = {
  id: number;
  name: string;
};

export type MusicToChose = {
  name: string;
  url: string;
  emotions: Song["emotions"];
};
