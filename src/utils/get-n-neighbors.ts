import { Song } from "@/interfaces";
import euclideanDistance from "./euclidean-distance";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const getNNeighbors = (
  n: number,
  embedding: number[],
  maxDistance: number,
  options: Song[]
) => {
  if (!options.length) return [];

  const neighbors: Song[] = [];
  const unvisitedSongs: Song[] = [...options];

  while (neighbors.length < n) {
    const index = getRandomInt(unvisitedSongs.length);
    const [selectedSong] = unvisitedSongs.splice(index, 1);

    // If all songs visited, break
    if (!unvisitedSongs.length) {
      const notSelectedSongs = options.filter((o) => !neighbors.includes(o));
      const realMaxDistance = Math.max(
        ...notSelectedSongs.map((s) =>
          euclideanDistance(embedding, s.embedding)
        )
      );
      console.info(
        `Visited all songs, breaking (searched maxDistance = ${maxDistance}, real maxDistance = ${realMaxDistance})`
      );
      break;
    }

    const distance = euclideanDistance(embedding, selectedSong.embedding);
    if (distance > maxDistance) continue;

    neighbors.push(selectedSong);
  }

  return neighbors;
};

export default getNNeighbors;
