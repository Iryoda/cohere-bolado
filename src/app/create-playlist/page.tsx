"use client";

import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";

import { AlbumArtwork } from "@/components/album-artwork";
import { madeForYouAlbums } from "@/data/albums";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Playlist() {
  const [songs, setSongs] = useState(madeForYouAlbums.filter((_, i) => i < 3));
  const remainingSongList = useRef(
    madeForYouAlbums.filter((s) => !songs.includes(s))
  );

  const handleClick = (i: number) => {
    const newAlbum = remainingSongList.current.shift();
    if (newAlbum)
      setSongs((songs) => {
        songs[i] = newAlbum;
        return [...songs];
      });
  };

  return (
    <div className="p-8 h-screen flex flex-col justify-center items-center">
      <div className="mt-6 space-y-1 items-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Select your music preferences
        </h2>
        <p className="text-sm text-muted-foreground">
          Sambify tailors its predictions on your playlist needs! Select what
          song you&apos;d like to drop
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4 justify-center">
            {songs.map((album, i) => (
              <AlbumArtwork
                key={album.name}
                onClick={() => handleClick(i)}
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {!remainingSongList.current.length ? (
          <Button>Generate playlist</Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
