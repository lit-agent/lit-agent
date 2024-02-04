import { z } from 'zod';

export const HonorScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId']);

export default HonorScalarFieldEnumSchema;
