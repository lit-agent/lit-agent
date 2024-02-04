import { z } from 'zod';

export const HonorTypeSchema = z.enum(['NewUser','NewTask','GoodFriend','HotFriend','GoodFriendEver','HotFriendEver']);

export type HonorTypeType = `${z.infer<typeof HonorTypeSchema>}`

export default HonorTypeSchema;
