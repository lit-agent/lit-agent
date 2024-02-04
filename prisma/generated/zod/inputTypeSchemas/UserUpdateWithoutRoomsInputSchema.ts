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
import { AccountUpdateManyWithoutUserNestedInputSchema } from './AccountUpdateManyWithoutUserNestedInputSchema';
import { SessionUpdateManyWithoutUserNestedInputSchema } from './SessionUpdateManyWithoutUserNestedInputSchema';
import { HonorUpdateManyWithoutUserNestedInputSchema } from './HonorUpdateManyWithoutUserNestedInputSchema';
import { MessageUpdateManyWithoutFromUserNestedInputSchema } from './MessageUpdateManyWithoutFromUserNestedInputSchema';
import { MessageUpdateManyWithoutToUsersNestedInputSchema } from './MessageUpdateManyWithoutToUsersNestedInputSchema';
import { TaskFromUpdateManyWithoutFromUserNestedInputSchema } from './TaskFromUpdateManyWithoutFromUserNestedInputSchema';
import { TaskToUpdateManyWithoutUserNestedInputSchema } from './TaskToUpdateManyWithoutUserNestedInputSchema';
import { ProductFromUpdateManyWithoutFromUserNestedInputSchema } from './ProductFromUpdateManyWithoutFromUserNestedInputSchema';
import { ProductToUpdateManyWithoutToUserNestedInputSchema } from './ProductToUpdateManyWithoutToUserNestedInputSchema';
import { BillUpdateManyWithoutUserNestedInputSchema } from './BillUpdateManyWithoutUserNestedInputSchema';
import { TaskChoiceUpdateOneWithoutUsersNestedInputSchema } from './TaskChoiceUpdateOneWithoutUsersNestedInputSchema';

export const UserUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoomsInput> = z.object({
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
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  sentMessages: z.lazy(() => MessageUpdateManyWithoutFromUserNestedInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageUpdateManyWithoutToUsersNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional(),
  TaskChoice: z.lazy(() => TaskChoiceUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export default UserUpdateWithoutRoomsInputSchema;
