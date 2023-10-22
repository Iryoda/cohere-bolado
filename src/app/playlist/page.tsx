"use client";

import { Metadata } from "next";
import axios from "axios";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Music } from "@/interface/Music";

export default function MountedPlaylist() {
  const searchParams = useSearchParams();

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
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sua Playlist!</h2>
          </div>
        </div>

        {!queryState.isLoading &&
          (!queryState.isError ? (
            <table>
              {musics.map((m) => (
                <tr key={m.id}>{m.name}</tr>
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
