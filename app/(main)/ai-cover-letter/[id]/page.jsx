import React from "react";
import { notFound } from "next/navigation";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function CoverLetterDetailPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  if (!coverLetter) {
    notFound();
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <CoverLetterPreview coverLetter={coverLetter} />
    </div>
  );
}
