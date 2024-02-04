import { z } from 'zod';

export const ProductFromScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','fromUserId','images','title','description','detail','price','total','isOnsite','isSelfOperating','isReturnable','isReservationRequired']);

export default ProductFromScalarFieldEnumSchema;
