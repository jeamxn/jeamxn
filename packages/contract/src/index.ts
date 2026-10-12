import { z } from "zod";

export const linkSchema = z.object({ label: z.string(), href: z.string() });
export const storySectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string()).min(1),
});
export type StorySection = z.infer<typeof storySectionSchema>;
export const projectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  period: z.string(),
  category: z.string(),
  role: z.string(),
  status: z.string(),
  tags: z.array(z.string()),
  image: z.string(),
  color: z.string(),
  overview: z.array(z.string()),
  highlights: z.array(z.object({ title: z.string(), body: z.string() })),
  links: z.array(linkSchema),
  featured: z.boolean(),
  sections: z.array(storySectionSchema).optional(),
  lead: z.string().optional(),
  cover: z
    .object({ width: z.number(), height: z.number(), caption: z.string(), alt: z.string() })
    .optional(),
});
export type Project = z.infer<typeof projectSchema>;
export const experienceSchema = z.object({
  company: z.string(),
  team: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
});
export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string(),
    nameEn: z.string(),
    headline: z.string(),
    intro: z.string(),
    email: z.string().email(),
    github: z.string().url(),
    portrait: z.string(),
    about: z.array(z.string()),
    interests: z.array(z.string()),
  }),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  education: z.array(
    z.object({ school: z.string(), major: z.string(), period: z.string(), note: z.string() }),
  ),
  activities: z.array(
    z.object({
      title: z.string(),
      organization: z.string(),
      period: z.string(),
      description: z.string(),
      slug: z.string().optional(),
      lead: z.string().optional(),
      sections: z.array(storySectionSchema).optional(),
    }),
  ),
  awards: z.array(
    z.object({
      title: z.string(),
      organization: z.string(),
      year: z.string(),
      kind: z.enum(["award", "participation", "certification"]),
    }),
  ),
});
export type Portfolio = z.infer<typeof portfolioSchema>;
export type Activity = Portfolio["activities"][number];
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1800),
});
export const chatRequestSchema = z
  .object({ messages: z.array(chatMessageSchema).min(1).max(10) })
  .strict();
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export const chatResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(linkSchema),
  mode: z.enum(["ai", "local"]),
});
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export const assistantStatusSchema = z.object({ mode: z.enum(["ai", "local"]), label: z.string() });
export type AssistantStatus = z.infer<typeof assistantStatusSchema>;
