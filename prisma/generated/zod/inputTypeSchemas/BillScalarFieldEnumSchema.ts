import { z } from 'zod';

export const BillScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','productId']);

export default BillScalarFieldEnumSchema;
