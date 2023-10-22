"use client";

import { Separator } from "@/registry/new-york/ui/separator";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Main() {
  return (
    <div className="flex">
      <section className="bg-cyan-200 h-screen w-1/6">
        <ul className="w-full p-4">
          <li>Playlist Generator</li>
        </ul>
      </section>
      <section className="flex flex-col h-screen w-5/6 justify-center items-center bg-slate-50">
        <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome to Sambify
          </h2>
          <p className="text-sm text-muted-foreground">
            The plaform that chooses the right playlist for you, with AI
          </p>
        </div>
        <Separator className="my-4" />
        <Link href="/create-playlist">
          <Button>Generate new playlist</Button>
        </Link>
      </section>
    </div>
  );
}
