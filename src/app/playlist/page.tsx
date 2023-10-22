"use client";

import { Metadata } from "next";
import axios from "axios";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Music } from "@/interface/Music";

export default function MountedPlaylist() {
  const params = useParams();

  const [musics, setMusics] = useState<Music[]>([]);
  const [queryState, setQueryState] = useState({
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const handle = async () => {
      if (params) {
        try {
          const { data } = await axios.get<Music[]>(
            "https://localhost:3333/api",
            {
              params: {
                preferences: params.preferences,
              },
            }
          );

          setMusics(data);
        } catch (error) {
          setQueryState({
            isLoading: false,
            isError: true,
          });
        }
      }
    };

    handle();
  });

  return (
    <>
      <div className="h-full flex flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sua Playlist!</h2>
          </div>
        </div>

        {!queryState.isLoading && queryState.isError && (
          <div className="flex items-center justify-center h-full w-full">
            <h1>Algo deu Errado :^(</h1>
          </div>
        )}

        {!queryState.isLoading && !queryState.isError && (
          <table>
            {musics.map((m) => (
              <tr key={m.id}>{m.name}</tr>
            ))}
          </table>
        )}

        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  );
}
