import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/new-york/ui/context-menu";

import { Album } from "../data/albums";
import { playlists } from "../data/playlists";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  console.log(album.cover);
  return (
    <div className={className} {...props}>
      <Image
        src={album.cover}
        alt={album.name}
        width={width}
        height={height}
        className={cn(
          "object-cover transition-all hover:scale-105",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      />

      <div className="pt-4">
        <h3 className="font-xl leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div>
    </div>
  );
}
