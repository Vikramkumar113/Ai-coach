import React from "react";
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetters } from "@/actions/cover-letter";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterMainPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-bold gradient-title">AI Cover Letters</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Create tailored, ATS-optimized cover letters for any position.
          </p>
        </div>
        <Link href="/ai-cover-letter/new">
          <Button size="lg" className="gap-2 shadow-md">
            <Plus className="h-5 w-5" /> Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
