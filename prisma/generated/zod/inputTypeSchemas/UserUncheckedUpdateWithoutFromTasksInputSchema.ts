import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { NullableBoolFieldUpdateOperationsInputSchema } from './NullableBoolFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { UserStatusSchema } from './UserStatusSchema';
import { EnumUserStatusFieldUpdateOperationsInputSchema } from './EnumUserStatusFieldUpdateOperationsInputSchema';
import { UserTypeSchema } from './UserTypeSchema';
import { EnumUserTypeFieldUpdateOperationsInputSchema } from './EnumUserTypeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { AccountUncheckedUpdateManyWithoutUserNestedInputSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInputSchema';
import { SessionUncheckedUpdateManyWithoutUserNestedInputSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInputSchema';
import { HonorUncheckedUpdateManyWithoutUserNestedInputSchema } from './HonorUncheckedUpdateManyWithoutUserNestedInputSchema';
import { RoomUncheckedUpdateManyWithoutUsersNestedInputSchema } from './RoomUncheckedUpdateManyWithoutUsersNestedInputSchema';
import { MessageUncheckedUpdateManyWithoutFromUserNestedInputSchema } from './MessageUncheckedUpdateManyWithoutFromUserNestedInputSchema';
import { MessageUncheckedUpdateManyWithoutToUsersNestedInputSchema } from './MessageUncheckedUpdateManyWithoutToUsersNestedInputSchema';
import { TaskToUncheckedUpdateManyWithoutUserNestedInputSchema } from './TaskToUncheckedUpdateManyWithoutUserNestedInputSchema';
import { ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema } from './ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema';
import { ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema } from './ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema';
import { BillUncheckedUpdateManyWithoutUserNestedInputSchema } from './BillUncheckedUpdateManyWithoutUserNestedInputSchema';

export const UserUncheckedUpdateWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFromTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  taskChoiceId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUncheckedUpdateManyWithoutToUsersNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export default UserUncheckedUpdateWithoutFromTasksInputSchema;
