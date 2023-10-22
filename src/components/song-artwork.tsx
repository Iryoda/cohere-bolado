import Image from "next/image";

import { cn } from "@/lib/utils";
import { MusicToChoose } from "@/interface/Music";
import youtubeIcon from "public/logo_youtube_icon.png";
import spotifyIcon from "public/logo_spotify_icon.png";
import { generateSpotifyUrl, generateYoutubeUrl } from "@/utils/generate-url";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  song: MusicToChoose;
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
  onClick,
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
          onClick={onClick}
          className={cn(
            `drop-shadow-md object-cover transition-all rounded-lg${
              !disabled
                ? " hover:scale-105 cursor-pointer"
                : " scale-95 opacity-80"
            }`,
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div>
        <div className="pt-4 relative">
          <h3 className="font-xl leading-none text-center">
            <b>{song.name}</b>
          </h3>
          <p className="text-xs text-muted-foreground text-center">
            {song.author}
          </p>
          <div className="flex top-4 right-2 absolute" >
            <a
              href={generateSpotifyUrl(`${song.name} ${song.author}`)}
              target="_blank"
            >
              <Image className="w-6 ml-1" src={spotifyIcon} alt="Spotify" />
            </a>
            <a
              href={generateYoutubeUrl(`${song.name} ${song.author}`)}
              target="_blank"
            >
              <Image className="w-6 ml-1" src={youtubeIcon} alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
