import { z } from 'zod';

export const UserTypeSchema = z.enum(['user','assistant','blogger']);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`

export default UserTypeSchema;
