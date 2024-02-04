import { z } from 'zod';

export const MessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','text','fromUserId','roomId','type','taskId','taskFromId']);

export default MessageScalarFieldEnumSchema;
