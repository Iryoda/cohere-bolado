import Image from "next/image";

import { cn } from "@/lib/utils";
import { MusicToChose } from "@/interface/Music";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  song: MusicToChose;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  disabled?: boolean;
}

export function SongArtwork({
  song,
  aspectRatio = "portrait",
  width,
  height,
  className,
  disabled,
  ...props
}: AlbumArtworkProps) {
  return (
    <div {...props}>
      <div className={`rounded-lg${disabled ? " bg-green-300 m-0 p-0" : ""}`}>
        <Image
          src={song.url}
          alt={song.name}
          width={width}
          height={height}
          className={cn(
            `object-cover transition-all rounded-lg${
              !disabled
                ? " hover:scale-105 cursor-pointer"
                : " scale-95 opacity-80"
            }`,
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <a
        // href={`https://www.youtube.com/results?search_query=${`${song.name} ${song.artist}`.replace(
        //   /\s/g,
        //   "+"
        // )}`}
        href={`https://www.youtube.com/results?search_query=${`${song.name}`.replace(
          /\s/g,
          "+"
        )}`}
        target="_blank"
      >
        <div className="pt-4">
          <h3 className="font-xl leading-none text-center">
            <b>{song.name}</b>
          </h3>
          {/* <p className="text-xs text-muted-foreground text-center">
            {song.artist}
          </p> */}
        </div>
      </a>
    </div>
  );
}
