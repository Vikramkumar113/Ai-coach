import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="container mx-auto py-20 px-4 space-y-6">
      <div>
        <Link href="/ai-cover-letter">
          <Button variant="outline" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Cover Letters
          </Button>
        </Link>
        <h1 className="text-5xl font-bold gradient-title">Create Cover Letter</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Generate a personalized cover letter tailored to your dream job.
        </p>
      </div>

      <CoverLetterGenerator />
    </div>
  );
}
