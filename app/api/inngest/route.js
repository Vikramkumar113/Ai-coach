import { serve } from "inngest/next";
import { inngest } from "@/lib/Inngest/client"
import { generateIndustryInsights } from "@/lib/Inngest/functions";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generateIndustryInsights
  ]
});
