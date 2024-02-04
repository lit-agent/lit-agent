import { z } from 'zod';

export const ProductToScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','fromUserId','toUserId','isFavored','inCar','bought']);

export default ProductToScalarFieldEnumSchema;
