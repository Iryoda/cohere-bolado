"use client";

import { Separator } from "@/registry/new-york/ui/separator";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome to Sambify
        </h2>
        <p className="text-sm text-muted-foreground">
          The plaform that chooses the right playlist for you, with AI
        </p>
      </div>
      <Separator className="my-4" />
      <Link href="/playlist">
        <Button>Generate new playlist</Button>
      </Link>
    </>
  );
}
