import { Song } from "@/interfaces";

export type Music = {
  id: number;
  name: string;
};

export type MusicToChoose = {
  name: string;
  author: string;
  url: string;
  emotions: Song["emotions"];
};
