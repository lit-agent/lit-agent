import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToCreateManyToUserInputSchema } from './ProductToCreateManyToUserInputSchema';

export const ProductToCreateManyToUserInputEnvelopeSchema: z.ZodType<Prisma.ProductToCreateManyToUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductToCreateManyToUserInputSchema),z.lazy(() => ProductToCreateManyToUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ProductToCreateManyToUserInputEnvelopeSchema;
