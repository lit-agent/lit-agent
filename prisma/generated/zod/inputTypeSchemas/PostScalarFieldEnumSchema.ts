import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id','name','text','source','createdAt','updatedAt']);

export default PostScalarFieldEnumSchema;
