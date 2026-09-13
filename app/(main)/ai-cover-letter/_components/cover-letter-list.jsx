"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Eye, Trash2, Plus, Sparkles, Building2, Briefcase } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useFetch from "@/hooks/use-fetch";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CoverLetterList({ coverLetters: initialCoverLetters }) {
  const router = useRouter();
  const [coverLetters, setCoverLetters] = useState(initialCoverLetters || []);
  const [deletingId, setDeletingId] = useState(null);

  const { loading: isDeleting, fn: deleteFn } = useFetch(deleteCoverLetter);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteFn(id);
      setCoverLetters((prev) => prev.filter((letter) => letter.id !== id));
      toast.success("Cover letter deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    } finally {
      setDeletingId(null);
    }
  };

  if (!coverLetters || coverLetters.length === 0) {
    return (
      <Card className="border-dashed border-2 text-center p-12 mt-6">
        <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl">No Cover Letters Yet</CardTitle>
          <CardDescription className="max-w-md mx-auto text-base">
            Create tailored, AI-powered cover letters optimized for any job position in seconds.
          </CardDescription>
          <Link href="/ai-cover-letter/new">
            <Button size="lg" className="mt-2 gap-2">
              <Plus className="h-5 w-5" /> Create Your First Cover Letter
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold line-clamp-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary shrink-0" />
                  {letter.jobTitle}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-1 font-medium text-foreground/80">
                  <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                  {letter.companyName}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-3 italic">
              &quot;{letter.content.replace(/[#*`_]/g, "").substring(0, 150)}...&quot;
            </p>
            <div className="text-xs text-muted-foreground border-t pt-3">
              Created on {format(new Date(letter.createdAt), "PPP")}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 pt-2 border-t">
            <Link href={`/ai-cover-letter/${letter.id}`} className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <Eye className="h-4 w-4" /> View
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" disabled={isDeleting && deletingId === letter.id}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this cover letter for {letter.jobTitle} at {letter.companyName}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(letter.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
