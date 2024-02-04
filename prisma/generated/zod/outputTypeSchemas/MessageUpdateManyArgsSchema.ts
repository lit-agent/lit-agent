import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageUpdateManyMutationInputSchema } from '../inputTypeSchemas/MessageUpdateManyMutationInputSchema'
import { MessageUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/MessageUncheckedUpdateManyInputSchema'
import { MessageWhereInputSchema } from '../inputTypeSchemas/MessageWhereInputSchema'

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict()

export default MessageUpdateManyArgsSchema;
