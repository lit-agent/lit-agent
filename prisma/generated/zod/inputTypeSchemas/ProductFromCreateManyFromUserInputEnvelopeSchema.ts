import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateManyFromUserInputSchema } from './ProductFromCreateManyFromUserInputSchema';

export const ProductFromCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.ProductFromCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductFromCreateManyFromUserInputSchema),z.lazy(() => ProductFromCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ProductFromCreateManyFromUserInputEnvelopeSchema;
