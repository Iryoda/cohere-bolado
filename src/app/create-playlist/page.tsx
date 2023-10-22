"use client";

import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";

import { AlbumArtwork } from "@/components/album-artwork";
import { madeForYouAlbums } from "@/data/albums";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  calculateSearchParams,
  musicParams,
} from "@/utils/calculate-search-params";

const initialValues: { [key: musicLabels]: musicParams } = {
  "dating:": "Very Low",
  " violence:": "Very Low",
  " world/life:": "Very Low",
  " night/time:": "Very Low",
  " shake the audience:": "Very Low",
  " family/gospel:": "Very Low",
  " romantic:": "Very Low",
  " communication:": "Very Low",
  " obscene:": "Very Low",
  " music:": "Very Low",
  " movement/places:": "Very Low",
  " light/visual perceptions:": "Very Low",
  " family/spiritual:": "Very Low",
  " like/girls:": "Very Low",
  " sadness:": "Very Low",
  " feelings:": "Very Low",
  " danceability:": "Very Low",
  " loudness:": "Very Low",
  " acousticness:": "Very Low",
  " instrumentalness:": "Very Low",
  " valence:": "Very Low",
  " energy:": "Very Low",
};

export default function Playlist() {
  const [songs, setSongs] = useState(madeForYouAlbums.filter((_, i) => i < 3));
  const [preferences, setPreferences] = useState(initialValues);
  const [isCalculating, setIsCalculating] = useState(false);

  const remainingSongList = useRef(
    madeForYouAlbums.filter((s) => !songs.includes(s))
  );

  useEffect(() => {
    if (!remainingSongList.current.length) {
      setPreferences(calculateSearchParams(songs[0], songs[1], songs[2]));

      setIsCalculating(true);
    }
  }, [remainingSongList]);

  const handleClick = (i: number) => {
    const newAlbum = remainingSongList.current.shift();

    if (newAlbum)
      setSongs((songs) => {
        songs[i] = newAlbum;
        return [...songs];
      });
  };

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
        <ScrollArea>
          <div className="flex space-x-24 justify-center">
            {songs.map((album, i) => (
              <AlbumArtwork
                key={album.name}
                onClick={() => handleClick(i)}
                album={album}
                aspectRatio="portrait"
                width={300}
                height={300}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="pt-4 flex items-center justify-center">
        {isCalculating && remainingSongList.current.length && (
          <Button disabled={true}>Generate playlist</Button>
        )}

        {!remainingSongList.current.length && !isCalculating && (
          <Link href={{ pathname: "playlist", query: { type: preferences } }}>
            <Button>Generate playlist</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
