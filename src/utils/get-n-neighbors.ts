import { Song } from "@/interfaces";
import euclideanDistance from "./euclidean-distance";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const getNNeighbors = (
  n: number,
  embedding: number[],
  searchedMaxDistance: number,
  options: Song[]
) => {
  if (!options.length) return [];

  const neighbors: Song[] = [];
  const unvisitedSongs: Song[] = [...options];

  let lowestUnreachedDistance = -Infinity;

  while (neighbors.length < n) {
    const index = getRandomInt(unvisitedSongs.length);
    const [selectedSong] = unvisitedSongs.splice(index, 1);

    // If all songs visited, break
    if (!unvisitedSongs.length) {
      console.info(
        `Visited all songs, breaking (searchedMaxDistance = ${searchedMaxDistance}, lowestUnreachedDistance = ${lowestUnreachedDistance}, searched ${n} but found ${neighbors.length})`
      );
      break;
    }

    const distance = euclideanDistance(embedding, selectedSong.embedding);

    if (distance > searchedMaxDistance) {
      if (distance < lowestUnreachedDistance)
        lowestUnreachedDistance = distance;
      continue;
    }

    neighbors.push(selectedSong);
  }

  return neighbors;
};

export default getNNeighbors;
