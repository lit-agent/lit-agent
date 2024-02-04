import { z } from 'zod';
import { UserStatusSchema } from '../inputTypeSchemas/UserStatusSchema'
import { UserTypeSchema } from '../inputTypeSchemas/UserTypeSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * most important
 */
export const UserSchema = z.object({
  status: UserStatusSchema,
  type: UserTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  emailVerified: z.coerce.date().nullable(),
  phoneVerified: z.coerce.date().nullable(),
  validated: z.boolean().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  image: z.string().nullable(),
  currentBalance: z.number().int(),
  historyBalance: z.number().int(),
  taskChoiceId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
