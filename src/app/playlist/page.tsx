"use client";

import { Metadata } from "next";
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Music } from "@/interface/Music";

export default function MountedPlaylist() {
  const { query } = useRouter();

  const [musics, setMusics] = useState<Music[]>([]);
  const [queryState, setQueryState] = useState({
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const handle = async () => {
      if (query) {
        try {
          const { data } = await axios.get<Music[]>(
            "https://localhost:3333/api",
            {
              params: {
                preferences: query.preferences,
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
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sua Playlist!</h2>
          </div>
        </div>

        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </>
  );
}
