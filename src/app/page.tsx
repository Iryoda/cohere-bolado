"use client";

import { SongArtwork } from "@/components/song-artwork";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { calculateSearchParams } from "@/utils/calculate-search-params";
import { initialSongs } from "../../config/data";
import { MusicToChose } from "@/interface/Music";

export default function Playlist() {
  const [songs, setSongs] = useState<MusicToChose[]>(() => {
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

    const newSongs = remainingSongList.current.shift();

    counter.current++;

    if (newSongs)
      setSongs((songs) => {
        songs[i] = newSongs;
        return [...songs];
      });
  };

  const endedSelection = counter.current >= 4 && !isCalculating;

  return (
    <div className="p-8 h-screen flex flex-col justify-between">
      <div className="mt-6 space-y-1 items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Select your music preferences
        </h2>
        <p className="text-sm text-muted-foreground">
          Sambify tailors its predictions on your playlist needs! Select what
          song you&apos;d like to drop
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

      <div className="pt-4 flex items-center justify-center">
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
