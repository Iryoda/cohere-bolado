import { EmotionLevel, Emotions, Song } from "@/interfaces";

export const musicLabels = [
  "dating: ",
  " violence: ",
  " world/life: ",
  " night/time: ",
  " shake the audience: ",
  " family/gospel: ",
  " romantic: ",
  " communication: ",
  " obscene: ",
  " music: ",
  " movement/places: ",
  " light/visual perceptions: ",
  " family/spiritual: ",
  " like/girls: ",
  " sadness: ",
  " feelings: ",
  " danceability: ",
  " loudness: ",
  " acousticness: ",
  " instrumentalness: ",
  " valence: ",
  " energy: ",
];

export type MusicParams = `${EmotionLevel}`;

export function calculateSearchParams(
  vec1: Song["emotions"],
  vec2: Song["emotions"],
  vec3: Song["emotions"]
) {
  let result = "";

  Object.keys(vec1).forEach((k: Emotions) => {
    let a = 0;

    if (vec1[k] === "Very High") a = 5;
    else if (vec1[k] === "High") a = 2;
    else if (vec1[k] === "Medium") a = 0;
    else if (vec1[k] === "Low") a = -2;
    else if (vec1[k] === "Very Low") a = -5;

    let b = 0;

    if (vec2[k] === "Very High") b = 5;
    else if (vec2[k] === "High") b = 2;
    else if (vec2[k] === "Medium") b = 0;
    else if (vec2[k] === "Low") b = -2;
    else if (vec2[k] === "Very Low") b = -5;
    let c = 0;

    if (vec3[k] === "Very High") c = 5;
    else if (vec3[k] === "High") c = 2;
    else if (vec3[k] === "Medium") c = 0;
    else if (vec3[k] === "Low") c = -2;
    else if (vec3[k] === "Very Low") c = -5;

    const value = (a + b + c) / 3.0;

    if (value > 3.5) result += k + ": Very High ";
    else if (value > 1) result += k + ": High ";
    else if (value < -3.5) result += k + ": Very Low ";
    else if (value < -1) result += k + ": Low ";
    else result += k + ": Medium ";
  });

  return result;
}
