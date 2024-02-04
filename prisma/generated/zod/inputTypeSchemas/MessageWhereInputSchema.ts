import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumMessageTypeFilterSchema } from './EnumMessageTypeFilterSchema';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserListRelationFilterSchema } from './UserListRelationFilterSchema';
import { RoomNullableRelationFilterSchema } from './RoomNullableRelationFilterSchema';
import { RoomWhereInputSchema } from './RoomWhereInputSchema';
import { TaskFromNullableRelationFilterSchema } from './TaskFromNullableRelationFilterSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumMessageTypeFilterSchema),z.lazy(() => MessageTypeSchema) ]).optional(),
  taskId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  taskFromId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => UserListRelationFilterSchema).optional(),
  room: z.union([ z.lazy(() => RoomNullableRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional().nullable(),
  task: z.union([ z.lazy(() => TaskFromNullableRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional().nullable(),
}).strict();

export default MessageWhereInputSchema;
