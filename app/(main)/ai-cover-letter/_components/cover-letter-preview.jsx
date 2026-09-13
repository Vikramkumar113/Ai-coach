"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Copy, Check, Trash2, ArrowLeft, Building2, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { deleteCoverLetter } from "@/actions/cover-letter";
import Link from "next/link";

export default function CoverLetterPreview({ coverLetter }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const { loading: isDeleting, fn: deleteFn } = useFetch(deleteCoverLetter);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter.content);
      setCopied(true);
      toast.success("Cover letter copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFn(coverLetter.id);
      toast.success("Cover letter deleted");
      router.push("/ai-cover-letter");
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href="/ai-cover-letter">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Cover Letters
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCopy} className="gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy Content
              </>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2" disabled={isDeleting}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this cover letter.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card className="shadow-lg border-primary/20">
        <CardHeader className="border-b bg-muted/30 pb-6">
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-3xl font-extrabold flex items-center gap-3 text-primary">
              <Briefcase className="h-7 w-7" />
              {coverLetter.jobTitle}
            </CardTitle>
            <CardDescription className="text-lg flex items-center gap-2 text-foreground/80 font-medium">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {coverLetter.companyName}
            </CardDescription>
            <span className="text-xs text-muted-foreground pt-1">
              Generated on {format(new Date(coverLetter.createdAt), "PPP")}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-8 sm:p-12">
          <div className="bg-background border rounded-xl p-6 sm:p-10 whitespace-pre-wrap font-sans text-base leading-relaxed text-foreground space-y-4 shadow-inner">
            {coverLetter.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
