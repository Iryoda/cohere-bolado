"use client";

import { SongArtwork } from "@/components/song-artwork";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { calculateSearchParams } from "@/utils/calculate-search-params";
import { initialSongs } from "../../config/data";
import { MusicToChoose } from "@/interface/Music";
import { getRandomInt } from "@/utils/get-n-neighbors";

export default function Playlist() {
  const [songs, setSongs] = useState<MusicToChoose[]>(() => {
    const array = [...initialSongs];

    array.sort((a, b) => 0.5 - Math.random());

    return array.slice(0, 3);
  });
  const [preferences, setPreferences] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const remainingSongList = useRef(
    initialSongs.filter((s) => !songs.includes(s))
  );

  const counter = useRef(0);

  useEffect(() => {
    if (counter.current >= 4) {
      setIsCalculating(true);

      const pref = calculateSearchParams(
        songs[0].emotions,
        songs[1].emotions,
        songs[2].emotions
      );

      console.log(pref);

      setPreferences(pref);

      setIsCalculating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSongList, counter.current]);

  const handleClick = (i: number) => {
    if (counter.current >= 4) return;

    const [newSong] = remainingSongList.current.splice(
      getRandomInt(remainingSongList.current.length),
      1
    );

    counter.current++;

    if (newSong)
      setSongs((songs) => {
        songs[i] = newSong;
        return [...songs];
      });
  };

  const endedSelection = counter.current >= 4 && !isCalculating;

  return (
    <div className="p-8 h-screen flex flex-col justify-between">
      <div className="mt-6 space-y-1 items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Remove the music that you dislike the most!
        </h2>

        <p className="text-md text-muted-foreground">
          and we will make a nice playlist for you
        </p>
      </div>

      <div className="relative flex flex-col items-center w-full h-full justify-center">
        <div className="flex space-x-24 justify-center">
          {songs.map((song, i) => (
            <div
              key={song.name}
              className={
                i
                  ? i > 1
                    ? "rotate-12 -translate-x-10 translate-y-10 z-2"
                    : "z-1"
                  : "-rotate-12 translate-x-10 translate-y-10"
              }
            >
              <SongArtwork
                onClick={() => handleClick(i)}
                song={song}
                aspectRatio="portrait"
                width={300}
                height={300}
                disabled={endedSelection}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex flex-col items-center justify-center">
        <p className="pb-4">
          <strong>Round</strong>: {counter.current + 1 + "/" + 5}
        </p>

        {!endedSelection ? (
          <Button className="text-large text-white p-4 " disabled={true}>
            Generate playlist
          </Button>
        ) : (
          <Link
            href={{
              pathname: "playlist",
              query: { preferences: preferences as any },
            }}
          >
            <Button className="text-large text-white p-4">
              Generate playlist
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
