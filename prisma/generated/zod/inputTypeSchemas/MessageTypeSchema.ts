import { z } from 'zod';

export const MessageTypeSchema = z.enum(['Plain','NewTask']);

export type MessageTypeType = `${z.infer<typeof MessageTypeSchema>}`

export default MessageTypeSchema;
