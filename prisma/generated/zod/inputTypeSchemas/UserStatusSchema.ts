import { z } from 'zod';

export const UserStatusSchema = z.enum(['online','busy','offline']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export default UserStatusSchema;
