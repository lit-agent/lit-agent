import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserStatusSchema } from './UserStatusSchema';
import { UserTypeSchema } from './UserTypeSchema';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { HonorCreateNestedManyWithoutUserInputSchema } from './HonorCreateNestedManyWithoutUserInputSchema';
import { RoomCreateNestedManyWithoutUsersInputSchema } from './RoomCreateNestedManyWithoutUsersInputSchema';
import { MessageCreateNestedManyWithoutFromUserInputSchema } from './MessageCreateNestedManyWithoutFromUserInputSchema';
import { MessageCreateNestedManyWithoutToUsersInputSchema } from './MessageCreateNestedManyWithoutToUsersInputSchema';
import { TaskFromCreateNestedManyWithoutFromUserInputSchema } from './TaskFromCreateNestedManyWithoutFromUserInputSchema';
import { TaskToCreateNestedManyWithoutUserInputSchema } from './TaskToCreateNestedManyWithoutUserInputSchema';
import { ProductFromCreateNestedManyWithoutFromUserInputSchema } from './ProductFromCreateNestedManyWithoutFromUserInputSchema';
import { ProductToCreateNestedManyWithoutToUserInputSchema } from './ProductToCreateNestedManyWithoutToUserInputSchema';
import { TaskChoiceCreateNestedOneWithoutUsersInputSchema } from './TaskChoiceCreateNestedOneWithoutUsersInputSchema';

export const UserCreateWithoutBillsInputSchema: z.ZodType<Prisma.UserCreateWithoutBillsInput> = z.object({
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
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  sentMessages: z.lazy(() => MessageCreateNestedManyWithoutFromUserInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageCreateNestedManyWithoutToUsersInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  TaskChoice: z.lazy(() => TaskChoiceCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export default UserCreateWithoutBillsInputSchema;
