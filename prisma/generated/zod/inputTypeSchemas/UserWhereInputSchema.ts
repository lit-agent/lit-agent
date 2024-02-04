import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumUserStatusFilterSchema } from './EnumUserStatusFilterSchema';
import { UserStatusSchema } from './UserStatusSchema';
import { EnumUserTypeFilterSchema } from './EnumUserTypeFilterSchema';
import { UserTypeSchema } from './UserTypeSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { AccountListRelationFilterSchema } from './AccountListRelationFilterSchema';
import { SessionListRelationFilterSchema } from './SessionListRelationFilterSchema';
import { HonorListRelationFilterSchema } from './HonorListRelationFilterSchema';
import { RoomListRelationFilterSchema } from './RoomListRelationFilterSchema';
import { MessageListRelationFilterSchema } from './MessageListRelationFilterSchema';
import { TaskFromListRelationFilterSchema } from './TaskFromListRelationFilterSchema';
import { TaskToListRelationFilterSchema } from './TaskToListRelationFilterSchema';
import { ProductFromListRelationFilterSchema } from './ProductFromListRelationFilterSchema';
import { ProductToListRelationFilterSchema } from './ProductToListRelationFilterSchema';
import { BillListRelationFilterSchema } from './BillListRelationFilterSchema';
import { TaskChoiceNullableRelationFilterSchema } from './TaskChoiceNullableRelationFilterSchema';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  taskChoiceId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  honors: z.lazy(() => HonorListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional(),
  sentMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  receivedMessages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  fromTasks: z.lazy(() => TaskFromListRelationFilterSchema).optional(),
  toTasks: z.lazy(() => TaskToListRelationFilterSchema).optional(),
  fromProducts: z.lazy(() => ProductFromListRelationFilterSchema).optional(),
  toProducts: z.lazy(() => ProductToListRelationFilterSchema).optional(),
  bills: z.lazy(() => BillListRelationFilterSchema).optional(),
  TaskChoice: z.union([ z.lazy(() => TaskChoiceNullableRelationFilterSchema),z.lazy(() => TaskChoiceWhereInputSchema) ]).optional().nullable(),
}).strict();

export default UserWhereInputSchema;
