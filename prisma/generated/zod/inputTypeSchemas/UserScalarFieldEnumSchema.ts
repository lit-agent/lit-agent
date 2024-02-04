import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','emailVerified','phoneVerified','validated','name','email','phone','image','status','type','currentBalance','historyBalance','taskChoiceId']);

export default UserScalarFieldEnumSchema;
