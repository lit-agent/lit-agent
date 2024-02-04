import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToCreateManyFromUserInputSchema } from './ProductToCreateManyFromUserInputSchema';

export const ProductToCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.ProductToCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductToCreateManyFromUserInputSchema),z.lazy(() => ProductToCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ProductToCreateManyFromUserInputEnvelopeSchema;
