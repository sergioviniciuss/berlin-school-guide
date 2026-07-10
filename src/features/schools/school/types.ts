import type { z } from "zod";

import type { schoolSchema } from ".";

export type SchoolRecord = z.infer<typeof schoolSchema>;
