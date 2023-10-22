"use client";

import axios from "axios";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Music } from "@/interface/Music";
import { getRandomInt } from "@/utils/get-n-neighbors";

import backChevron from "public/back_chevron.png";
import youtubeIcon from "public/logo_youtube_icon.png";
import spotifyIcon from "public/logo_spotify_icon.png";
import Image from "next/image";
import { generateYoutubeUrl, generateSpotifyUrl } from "@/utils/generate-url";
import Link from "next/link";

const emojiList = ["😳", "❤️", "🎧", "🎶"];

export default function MountedPlaylist() {
  const searchParams = useSearchParams();

  const emoji = useRef(emojiList[getRandomInt(emojiList.length)]);

  const [musics, setMusics] = useState<Music[]>([]);
  const [queryState, setQueryState] = useState({
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const handle = async () => {
      if (searchParams) {
        try {
          const { data } = await axios.get<Music[]>(
            `http://localhost:3000/api?preferences=${searchParams.get(
              "preferences"
            )}`
          );

          setMusics(data);

          setQueryState({
            isLoading: false,
            isError: false,
          });
        } catch (error) {
          setQueryState({ isLoading: false, isError: true });
        }
      }
    };

    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="h-full flex flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center space-y-2">
          <Link href="/">
            <Image className="w-7 mr-4" src={backChevron} alt="Go back" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Your Playlist!
            </h2>
            <p className="text-sm text-muted-foreground">
              With much care {emoji.current}
            </p>
          </div>
        </div>

        {!queryState.isLoading &&
          (!queryState.isError ? (
            <table>
              <tr className="text-lg bg-blue-50 border-b-slate-200 border-b-2 leading-loose">
                <td></td>
                <td>
                  <strong>Name</strong>
                </td>
                <td>
                  <strong>Author</strong>
                </td>
                <td>
                  <strong>Year</strong>
                </td>
                <td className="text-center">
                  <strong>Links</strong>
                </td>
              </tr>

              {musics.map((m, i) => (
                <tr
                  className="text-lg hover:bg-blue-50 border-b-slate-200 border-b-2 leading-loose"
                  key={m.id}
                >
                  <td className="pl-4">
                    <b className="text-gray-500">{i + 1}</b>
                  </td>
                  <td className="capitalize">{m.name}</td>
                  <td className="capitalize text-gray-700">{m.author}</td>
                  <td className="text-gray-400">{m.year}</td>
                  <td className="flex flex-row justify-center items-center px-2 pt-1">
                    <a
                      href={generateSpotifyUrl(`${m.name} ${m.author}`)}
                      target="_blank"
                    >
                      <Image className="w-7" src={spotifyIcon} alt="Spotify" />
                    </a>
                    <a
                      href={generateYoutubeUrl(`${m.name} ${m.author}`)}
                      target="_blank"
                    >
                      <Image
                        className="w-7 ml-4"
                        src={youtubeIcon}
                        alt="YouTube"
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <h1>Algo deu Errado :^(</h1>
            </div>
          ))}

        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  );
}
