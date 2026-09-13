"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coverLetterSchema } from "@/app/lib/schema";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
    },
  });

  const {
    loading: isGenerating,
    fn: generateFn,
    data: generatedResult,
  } = useFetch(generateCoverLetter);

  const onSubmit = async (data) => {
    try {
      await generateFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  useEffect(() => {
    if (!isGenerating && generatedResult?.id) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedResult.id}`);
    }
  }, [isGenerating, generatedResult, router]);

  return (
    <Card className="max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Job Information
        </CardTitle>
        <CardDescription>
          Provide the details of the position you are applying for to generate a tailored cover letter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-semibold">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Senior Frontend Developer"
                {...register("jobTitle")}
              />
              {errors.jobTitle && (
                <p className="text-sm text-destructive">{errors.jobTitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="e.g. Acme Corp"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-sm font-semibold">
              Job Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the key responsibilities and requirements from the job posting..."
              className="h-44 resize-y"
              {...register("jobDescription")}
            />
            {errors.jobDescription && (
              <p className="text-sm text-destructive">{errors.jobDescription.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full gap-2" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Cover Letter...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" /> Generate Cover Letter
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
