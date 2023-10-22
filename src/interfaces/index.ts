export type Emotions =
  | "dating"
  | "violence"
  | "world/life"
  | "night/time"
  | "shake the audience"
  | "family/gospel"
  | "romantic"
  | "communication"
  | "obscene"
  | "music"
  | "movement/places"
  | "light/visual perceptions"
  | "family/spiritual"
  | "like/girls"
  | "sadness"
  | "feelings"
  | "danceability"
  | "loudness"
  | "acousticness"
  | "instrumentalness"
  | "valence"
  | "energy";

export type Song = {
  name: string;
  embedding: number[];
  emotions: { [key in Emotions]: number };
};
