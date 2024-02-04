import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserStatusSchema } from './UserStatusSchema';
import { UserTypeSchema } from './UserTypeSchema';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { HonorUncheckedCreateNestedManyWithoutUserInputSchema } from './HonorUncheckedCreateNestedManyWithoutUserInputSchema';
import { RoomUncheckedCreateNestedManyWithoutUsersInputSchema } from './RoomUncheckedCreateNestedManyWithoutUsersInputSchema';
import { MessageUncheckedCreateNestedManyWithoutFromUserInputSchema } from './MessageUncheckedCreateNestedManyWithoutFromUserInputSchema';
import { MessageUncheckedCreateNestedManyWithoutToUsersInputSchema } from './MessageUncheckedCreateNestedManyWithoutToUsersInputSchema';
import { TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema } from './TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema';
import { TaskToUncheckedCreateNestedManyWithoutUserInputSchema } from './TaskToUncheckedCreateNestedManyWithoutUserInputSchema';
import { ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema } from './ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema';
import { ProductToUncheckedCreateNestedManyWithoutToUserInputSchema } from './ProductToUncheckedCreateNestedManyWithoutToUserInputSchema';
import { BillUncheckedCreateNestedManyWithoutUserInputSchema } from './BillUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  taskChoiceId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutToUsersInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutSessionsInputSchema;
