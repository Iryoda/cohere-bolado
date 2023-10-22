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

  let lowestUnreachedDistance = Infinity;

  while (neighbors.length < n) {
    // If all songs visited, break
    if (!unvisitedSongs.length) {
      console.info(
        `Visited all songs, breaking (searchedMaxDistance = ${maxDistance}, lowestUnreachedDistance = ${lowestUnreachedDistance}, searched ${n} but found ${neighbors.length})`
      );
      break;
    }

    const index = getRandomInt(unvisitedSongs.length);
    const [selectedSong] = unvisitedSongs.splice(index, 1);

    const distance = euclideanDistance(embedding, selectedSong.embedding);

    if (distance > maxDistance) {
      if (distance < lowestUnreachedDistance)
        lowestUnreachedDistance = distance;
      continue;
    }

    neighbors.push(selectedSong);
  }

  return neighbors;
};

export default getNNeighbors;
