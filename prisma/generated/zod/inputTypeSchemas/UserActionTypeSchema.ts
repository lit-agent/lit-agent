import { z } from 'zod';

export const UserActionTypeSchema = z.enum(['activate','deactivate','online','offline','create','pause','continue','cancel','approve','reject','accept','submit','favor','unfavor','payByCash','payByFire']);

export type UserActionTypeType = `${z.infer<typeof UserActionTypeSchema>}`

export default UserActionTypeSchema;
