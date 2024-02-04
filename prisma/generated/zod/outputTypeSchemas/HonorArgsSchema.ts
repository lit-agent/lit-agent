import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorSelectSchema } from '../inputTypeSchemas/HonorSelectSchema';
import { HonorIncludeSchema } from '../inputTypeSchemas/HonorIncludeSchema';

export const HonorArgsSchema: z.ZodType<Prisma.HonorDefaultArgs> = z.object({
  select: z.lazy(() => HonorSelectSchema).optional(),
  include: z.lazy(() => HonorIncludeSchema).optional(),
}).strict();

export default HonorArgsSchema;
