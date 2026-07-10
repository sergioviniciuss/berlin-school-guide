import { z } from "zod";

export const exampleGuideSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
});

export type ExampleGuide = z.infer<typeof exampleGuideSchema>;

export function parseExampleGuide(input: unknown) {
  return exampleGuideSchema.parse(input);
}
