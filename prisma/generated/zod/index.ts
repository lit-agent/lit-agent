import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','emailVerified','phoneVerified','validated','name','email','phone','image','status','type','currentBalance','historyBalance']);

export const AccountScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const BillScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','productId']);

export const HonorScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','text','senderId','roomId']);

export const PostScalarFieldEnumSchema = z.enum(['id','name','text','source','createdAt','updatedAt']);

export const ProductFromScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','fromUserId','images','title','description','detail','price','total','isOnsite','isSelfOperating','isReturnable','isReservationRequired']);

export const ProductToScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','fromUserId','toUserId','isFavored','inCar','bought']);

export const TaskFromScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','type','title','content','value','startTime','endTime','fromUserId','status']);

export const TaskToScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','taskId','status']);

export const RoomScalarFieldEnumSchema = z.enum(['id','name']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const HonorTypeSchema = z.enum(['NewUser','NewTask','GoodFriend','HotFriend','GoodFriendEver','HotFriendEver']);

export type HonorTypeType = `${z.infer<typeof HonorTypeSchema>}`

export const PosterSourceSchema = z.enum(['RAW','GITHUB']);

export type PosterSourceType = `${z.infer<typeof PosterSourceSchema>}`

export const TaskStatusSchema = z.enum(['wait','on','pause','cancelled','finished']);

export type TaskStatusType = `${z.infer<typeof TaskStatusSchema>}`

export const TaskToStatusSchema = z.enum(['goon','finished','cancelled']);

export type TaskToStatusType = `${z.infer<typeof TaskToStatusSchema>}`

export const TaskTypeSchema = z.enum(['broadcast','textChoices','imageChoices']);

export type TaskTypeType = `${z.infer<typeof TaskTypeSchema>}`

export const UserActionTypeSchema = z.enum(['activate','deactivate','online','offline','create','pause','continue','cancel','approve','reject','accept','submit','favor','unfavor','payByCash','payByFire']);

export type UserActionTypeType = `${z.infer<typeof UserActionTypeSchema>}`

export const UserStatusSchema = z.enum(['online','busy','offline']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const UserTypeSchema = z.enum(['user','assistant','blogger']);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * most important
 */
export const UserSchema = z.object({
  status: UserStatusSchema,
  type: UserTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  emailVerified: z.coerce.date().nullable(),
  phoneVerified: z.coerce.date().nullable(),
  validated: z.boolean().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  image: z.string().nullable(),
  currentBalance: z.number().int(),
  historyBalance: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// BILL SCHEMA
/////////////////////////////////////////

export const BillSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  productId: z.string(),
})

export type Bill = z.infer<typeof BillSchema>

/////////////////////////////////////////
// HONOR SCHEMA
/////////////////////////////////////////

export const HonorSchema = z.object({
  id: HonorTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Honor = z.infer<typeof HonorSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  text: z.string().nullable(),
  senderId: z.string().nullable(),
  roomId: z.string(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  source: PosterSourceSchema,
  id: z.string().uuid(),
  name: z.string(),
  text: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// PRODUCT FROM SCHEMA
/////////////////////////////////////////

export const ProductFromSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fromUserId: z.string(),
  images: z.string().array(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().nullable(),
  isSelfOperating: z.boolean().nullable(),
  isReturnable: z.boolean().nullable(),
  isReservationRequired: z.boolean().nullable(),
})

export type ProductFrom = z.infer<typeof ProductFromSchema>

/////////////////////////////////////////
// PRODUCT TO SCHEMA
/////////////////////////////////////////

export const ProductToSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  fromUserId: z.string(),
  toUserId: z.string(),
  isFavored: z.boolean(),
  inCar: z.number().int(),
  bought: z.number().int(),
})

export type ProductTo = z.infer<typeof ProductToSchema>

/////////////////////////////////////////
// TASK FROM SCHEMA
/////////////////////////////////////////

export const TaskFromSchema = z.object({
  type: TaskTypeSchema,
  status: TaskStatusSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
})

export type TaskFrom = z.infer<typeof TaskFromSchema>

/////////////////////////////////////////
// TASK TO SCHEMA
/////////////////////////////////////////

export const TaskToSchema = z.object({
  status: TaskToStatusSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  taskId: z.string(),
})

export type TaskTo = z.infer<typeof TaskToSchema>

/////////////////////////////////////////
// ROOM SCHEMA
/////////////////////////////////////////

export const RoomSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
})

export type Room = z.infer<typeof RoomSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  honors: z.union([z.boolean(),z.lazy(() => HonorFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  fromTasks: z.union([z.boolean(),z.lazy(() => TaskFromFindManyArgsSchema)]).optional(),
  toTasks: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  fromProducts: z.union([z.boolean(),z.lazy(() => ProductFromFindManyArgsSchema)]).optional(),
  toProducts: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  honors: z.boolean().optional(),
  rooms: z.boolean().optional(),
  messages: z.boolean().optional(),
  fromTasks: z.boolean().optional(),
  toTasks: z.boolean().optional(),
  fromProducts: z.boolean().optional(),
  toProducts: z.boolean().optional(),
  bills: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
  validated: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  image: z.boolean().optional(),
  status: z.boolean().optional(),
  type: z.boolean().optional(),
  currentBalance: z.boolean().optional(),
  historyBalance: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  honors: z.union([z.boolean(),z.lazy(() => HonorFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  fromTasks: z.union([z.boolean(),z.lazy(() => TaskFromFindManyArgsSchema)]).optional(),
  toTasks: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  fromProducts: z.union([z.boolean(),z.lazy(() => ProductFromFindManyArgsSchema)]).optional(),
  toProducts: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// BILL
//------------------------------------------------------

export const BillIncludeSchema: z.ZodType<Prisma.BillInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
}).strict()

export const BillArgsSchema: z.ZodType<Prisma.BillDefaultArgs> = z.object({
  select: z.lazy(() => BillSelectSchema).optional(),
  include: z.lazy(() => BillIncludeSchema).optional(),
}).strict();

export const BillSelectSchema: z.ZodType<Prisma.BillSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  productId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
}).strict()

// HONOR
//------------------------------------------------------

export const HonorIncludeSchema: z.ZodType<Prisma.HonorInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const HonorArgsSchema: z.ZodType<Prisma.HonorDefaultArgs> = z.object({
  select: z.lazy(() => HonorSelectSchema).optional(),
  include: z.lazy(() => HonorIncludeSchema).optional(),
}).strict();

export const HonorSelectSchema: z.ZodType<Prisma.HonorSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  text: z.boolean().optional(),
  senderId: z.boolean().optional(),
  roomId: z.boolean().optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  text: z.boolean().optional(),
  source: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// PRODUCT FROM
//------------------------------------------------------

export const ProductFromIncludeSchema: z.ZodType<Prisma.ProductFromInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductFromArgsSchema: z.ZodType<Prisma.ProductFromDefaultArgs> = z.object({
  select: z.lazy(() => ProductFromSelectSchema).optional(),
  include: z.lazy(() => ProductFromIncludeSchema).optional(),
}).strict();

export const ProductFromCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductFromCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductFromCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductFromCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductFromCountOutputTypeSelect> = z.object({
  toUsers: z.boolean().optional(),
  bills: z.boolean().optional(),
}).strict();

export const ProductFromSelectSchema: z.ZodType<Prisma.ProductFromSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  images: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  detail: z.boolean().optional(),
  price: z.boolean().optional(),
  total: z.boolean().optional(),
  isOnsite: z.boolean().optional(),
  isSelfOperating: z.boolean().optional(),
  isReturnable: z.boolean().optional(),
  isReservationRequired: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT TO
//------------------------------------------------------

export const ProductToIncludeSchema: z.ZodType<Prisma.ProductToInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
  toUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ProductToArgsSchema: z.ZodType<Prisma.ProductToDefaultArgs> = z.object({
  select: z.lazy(() => ProductToSelectSchema).optional(),
  include: z.lazy(() => ProductToIncludeSchema).optional(),
}).strict();

export const ProductToSelectSchema: z.ZodType<Prisma.ProductToSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  toUserId: z.boolean().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.boolean().optional(),
  bought: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
  toUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TASK FROM
//------------------------------------------------------

export const TaskFromIncludeSchema: z.ZodType<Prisma.TaskFromInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskFromArgsSchema: z.ZodType<Prisma.TaskFromDefaultArgs> = z.object({
  select: z.lazy(() => TaskFromSelectSchema).optional(),
  include: z.lazy(() => TaskFromIncludeSchema).optional(),
}).strict();

export const TaskFromCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskFromCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskFromCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskFromCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskFromCountOutputTypeSelect> = z.object({
  toUsers: z.boolean().optional(),
}).strict();

export const TaskFromSelectSchema: z.ZodType<Prisma.TaskFromSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  value: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  status: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK TO
//------------------------------------------------------

export const TaskToIncludeSchema: z.ZodType<Prisma.TaskToInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
}).strict()

export const TaskToArgsSchema: z.ZodType<Prisma.TaskToDefaultArgs> = z.object({
  select: z.lazy(() => TaskToSelectSchema).optional(),
  include: z.lazy(() => TaskToIncludeSchema).optional(),
}).strict();

export const TaskToSelectSchema: z.ZodType<Prisma.TaskToSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  taskId: z.boolean().optional(),
  status: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
}).strict()

// ROOM
//------------------------------------------------------

export const RoomIncludeSchema: z.ZodType<Prisma.RoomInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoomArgsSchema: z.ZodType<Prisma.RoomDefaultArgs> = z.object({
  select: z.lazy(() => RoomSelectSchema).optional(),
  include: z.lazy(() => RoomIncludeSchema).optional(),
}).strict();

export const RoomCountOutputTypeArgsSchema: z.ZodType<Prisma.RoomCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoomCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoomCountOutputTypeSelectSchema: z.ZodType<Prisma.RoomCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  messages: z.boolean().optional(),
}).strict();

export const RoomSelectSchema: z.ZodType<Prisma.RoomSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  honors: z.lazy(() => HonorListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  fromTasks: z.lazy(() => TaskFromListRelationFilterSchema).optional(),
  toTasks: z.lazy(() => TaskToListRelationFilterSchema).optional(),
  fromProducts: z.lazy(() => ProductFromListRelationFilterSchema).optional(),
  toProducts: z.lazy(() => ProductToListRelationFilterSchema).optional(),
  bills: z.lazy(() => BillListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  validated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  honors: z.lazy(() => HonorOrderByRelationAggregateInputSchema).optional(),
  rooms: z.lazy(() => RoomOrderByRelationAggregateInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromOrderByRelationAggregateInputSchema).optional(),
  toTasks: z.lazy(() => TaskToOrderByRelationAggregateInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromOrderByRelationAggregateInputSchema).optional(),
  toProducts: z.lazy(() => ProductToOrderByRelationAggregateInputSchema).optional(),
  bills: z.lazy(() => BillOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string(),
    phone: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    phone: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
    phone: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    phone: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  honors: z.lazy(() => HonorListRelationFilterSchema).optional(),
  rooms: z.lazy(() => RoomListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  fromTasks: z.lazy(() => TaskFromListRelationFilterSchema).optional(),
  toTasks: z.lazy(() => TaskToListRelationFilterSchema).optional(),
  fromProducts: z.lazy(() => ProductFromListRelationFilterSchema).optional(),
  toProducts: z.lazy(() => ProductToListRelationFilterSchema).optional(),
  bills: z.lazy(() => BillListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  validated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusWithAggregatesFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeWithAggregatesFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const BillWhereInputSchema: z.ZodType<Prisma.BillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BillWhereInputSchema),z.lazy(() => BillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillWhereInputSchema),z.lazy(() => BillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
}).strict();

export const BillOrderByWithRelationInputSchema: z.ZodType<Prisma.BillOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductFromOrderByWithRelationInputSchema).optional()
}).strict();

export const BillWhereUniqueInputSchema: z.ZodType<Prisma.BillWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => BillWhereInputSchema),z.lazy(() => BillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillWhereInputSchema),z.lazy(() => BillWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
}).strict());

export const BillOrderByWithAggregationInputSchema: z.ZodType<Prisma.BillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BillCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BillMinOrderByAggregateInputSchema).optional()
}).strict();

export const BillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BillScalarWhereWithAggregatesInputSchema),z.lazy(() => BillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillScalarWhereWithAggregatesInputSchema),z.lazy(() => BillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const HonorWhereInputSchema: z.ZodType<Prisma.HonorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HonorWhereInputSchema),z.lazy(() => HonorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorWhereInputSchema),z.lazy(() => HonorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumHonorTypeFilterSchema),z.lazy(() => HonorTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const HonorOrderByWithRelationInputSchema: z.ZodType<Prisma.HonorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const HonorWhereUniqueInputSchema: z.ZodType<Prisma.HonorWhereUniqueInput> = z.object({
  id: z.lazy(() => HonorTypeSchema)
})
.and(z.object({
  id: z.lazy(() => HonorTypeSchema).optional(),
  AND: z.union([ z.lazy(() => HonorWhereInputSchema),z.lazy(() => HonorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorWhereInputSchema),z.lazy(() => HonorWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const HonorOrderByWithAggregationInputSchema: z.ZodType<Prisma.HonorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HonorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HonorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HonorMinOrderByAggregateInputSchema).optional()
}).strict();

export const HonorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HonorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HonorScalarWhereWithAggregatesInputSchema),z.lazy(() => HonorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorScalarWhereWithAggregatesInputSchema),z.lazy(() => HonorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumHonorTypeWithAggregatesFilterSchema),z.lazy(() => HonorTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  senderId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sender: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  room: z.union([ z.lazy(() => RoomRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  senderId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  sender: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  room: z.lazy(() => RoomOrderByWithRelationInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  senderId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sender: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  room: z.union([ z.lazy(() => RoomRelationFilterSchema),z.lazy(() => RoomWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  senderId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  senderId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumPosterSourceFilterSchema),z.lazy(() => PosterSourceSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  }),
  z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
  }),
  z.object({
    id: z.string().uuid(),
    updatedAt: z.coerce.date(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
  z.object({
    createdAt: z.coerce.date(),
  }),
  z.object({
    updatedAt: z.coerce.date(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumPosterSourceFilterSchema),z.lazy(() => PosterSourceSchema) ]).optional(),
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumPosterSourceWithAggregatesFilterSchema),z.lazy(() => PosterSourceSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductFromWhereInputSchema: z.ZodType<Prisma.ProductFromWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductFromWhereInputSchema),z.lazy(() => ProductFromWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductFromWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductFromWhereInputSchema),z.lazy(() => ProductFromWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isOnsite: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isSelfOperating: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReturnable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReservationRequired: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => ProductToListRelationFilterSchema).optional(),
  bills: z.lazy(() => BillListRelationFilterSchema).optional()
}).strict();

export const ProductFromOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductFromOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  isOnsite: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isSelfOperating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isReturnable: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isReservationRequired: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fromUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  toUsers: z.lazy(() => ProductToOrderByRelationAggregateInputSchema).optional(),
  bills: z.lazy(() => BillOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProductFromWhereUniqueInputSchema: z.ZodType<Prisma.ProductFromWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProductFromWhereInputSchema),z.lazy(() => ProductFromWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductFromWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductFromWhereInputSchema),z.lazy(() => ProductFromWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  isOnsite: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isSelfOperating: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReturnable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReservationRequired: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => ProductToListRelationFilterSchema).optional(),
  bills: z.lazy(() => BillListRelationFilterSchema).optional()
}).strict());

export const ProductFromOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductFromOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  isOnsite: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isSelfOperating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isReturnable: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isReservationRequired: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ProductFromCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductFromAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductFromMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductFromMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductFromSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductFromScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductFromScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductFromScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductFromScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductFromScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductFromScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductFromScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  isOnsite: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  isSelfOperating: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  isReturnable: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  isReservationRequired: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const ProductToWhereInputSchema: z.ZodType<Prisma.ProductToWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromUser: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
  toUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ProductToOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductToOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional(),
  fromUser: z.lazy(() => ProductFromOrderByWithRelationInputSchema).optional(),
  toUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ProductToWhereUniqueInputSchema: z.ZodType<Prisma.ProductToWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  bought: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  fromUser: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
  toUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ProductToOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductToOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductToCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductToAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductToMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductToMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductToSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductToScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductToScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TaskFromWhereInputSchema: z.ZodType<Prisma.TaskFromWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskFromWhereInputSchema),z.lazy(() => TaskFromWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromWhereInputSchema),z.lazy(() => TaskFromWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToListRelationFilterSchema).optional()
}).strict();

export const TaskFromOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskFromOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  fromUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  toUsers: z.lazy(() => TaskToOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TaskFromWhereUniqueInputSchema: z.ZodType<Prisma.TaskFromWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TaskFromWhereInputSchema),z.lazy(() => TaskFromWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromWhereInputSchema),z.lazy(() => TaskFromWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToListRelationFilterSchema).optional()
}).strict());

export const TaskFromOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskFromOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskFromCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskFromAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskFromMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskFromMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskFromSumOrderByAggregateInputSchema).optional()
}).strict();

export const TaskFromScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskFromScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeWithAggregatesFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusWithAggregatesFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
}).strict();

export const TaskToWhereInputSchema: z.ZodType<Prisma.TaskToWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  task: z.union([ z.lazy(() => TaskFromRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
}).strict();

export const TaskToOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskToOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  task: z.lazy(() => TaskFromOrderByWithRelationInputSchema).optional()
}).strict();

export const TaskToWhereUniqueInputSchema: z.ZodType<Prisma.TaskToWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  task: z.union([ z.lazy(() => TaskFromRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
}).strict());

export const TaskToOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskToOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskToCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskToMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskToMinOrderByAggregateInputSchema).optional()
}).strict();

export const TaskToScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskToScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusWithAggregatesFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
}).strict();

export const RoomWhereInputSchema: z.ZodType<Prisma.RoomWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const RoomOrderByWithRelationInputSchema: z.ZodType<Prisma.RoomOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoomWhereUniqueInputSchema: z.ZodType<Prisma.RoomWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomWhereInputSchema),z.lazy(() => RoomWhereInputSchema).array() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const RoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoomOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RoomCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoomMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoomMinOrderByAggregateInputSchema).optional()
}).strict();

export const RoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoomScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),z.lazy(() => RoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BillCreateInputSchema: z.ZodType<Prisma.BillCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBillsInputSchema),
  product: z.lazy(() => ProductFromCreateNestedOneWithoutBillsInputSchema)
}).strict();

export const BillUncheckedCreateInputSchema: z.ZodType<Prisma.BillUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string()
}).strict();

export const BillUpdateInputSchema: z.ZodType<Prisma.BillUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBillsNestedInputSchema).optional(),
  product: z.lazy(() => ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema).optional()
}).strict();

export const BillUncheckedUpdateInputSchema: z.ZodType<Prisma.BillUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BillCreateManyInputSchema: z.ZodType<Prisma.BillCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string()
}).strict();

export const BillUpdateManyMutationInputSchema: z.ZodType<Prisma.BillUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BillUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HonorCreateInputSchema: z.ZodType<Prisma.HonorCreateInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutHonorsInputSchema)
}).strict();

export const HonorUncheckedCreateInputSchema: z.ZodType<Prisma.HonorUncheckedCreateInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const HonorUpdateInputSchema: z.ZodType<Prisma.HonorUpdateInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHonorsNestedInputSchema).optional()
}).strict();

export const HonorUncheckedUpdateInputSchema: z.ZodType<Prisma.HonorUncheckedUpdateInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HonorCreateManyInputSchema: z.ZodType<Prisma.HonorCreateManyInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const HonorUpdateManyMutationInputSchema: z.ZodType<Prisma.HonorUpdateManyMutationInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HonorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HonorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  sender: z.lazy(() => UserCreateNestedOneWithoutMessagesInputSchema).optional(),
  room: z.lazy(() => RoomCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  senderId: z.string().optional().nullable(),
  roomId: z.string()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sender: z.lazy(() => UserUpdateOneWithoutMessagesNestedInputSchema).optional(),
  room: z.lazy(() => RoomUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  senderId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  senderId: z.string().optional().nullable(),
  roomId: z.string()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  senderId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  text: z.string(),
  source: z.lazy(() => PosterSourceSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  text: z.string(),
  source: z.lazy(() => PosterSourceSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => EnumPosterSourceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => EnumPosterSourceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  text: z.string(),
  source: z.lazy(() => PosterSourceSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => EnumPosterSourceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => EnumPosterSourceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductFromCreateInputSchema: z.ZodType<Prisma.ProductFromCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutFromProductsInputSchema),
  toUsers: z.lazy(() => ProductToCreateNestedManyWithoutFromUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductFromUncheckedCreateInputSchema: z.ZodType<Prisma.ProductFromUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  toUsers: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductFromUpdateInputSchema: z.ZodType<Prisma.ProductFromUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutFromProductsNestedInputSchema).optional(),
  toUsers: z.lazy(() => ProductToUpdateManyWithoutFromUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductFromUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toUsers: z.lazy(() => ProductToUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductFromCreateManyInputSchema: z.ZodType<Prisma.ProductFromCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable()
}).strict();

export const ProductFromUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductFromUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductFromUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductToCreateInputSchema: z.ZodType<Prisma.ProductToCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional(),
  fromUser: z.lazy(() => ProductFromCreateNestedOneWithoutToUsersInputSchema),
  toUser: z.lazy(() => UserCreateNestedOneWithoutToProductsInputSchema)
}).strict();

export const ProductToUncheckedCreateInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  toUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export const ProductToUpdateInputSchema: z.ZodType<Prisma.ProductToUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromUser: z.lazy(() => ProductFromUpdateOneRequiredWithoutToUsersNestedInputSchema).optional(),
  toUser: z.lazy(() => UserUpdateOneRequiredWithoutToProductsNestedInputSchema).optional()
}).strict();

export const ProductToUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductToCreateManyInputSchema: z.ZodType<Prisma.ProductToCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  toUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export const ProductToUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductToUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductToUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskFromCreateInputSchema: z.ZodType<Prisma.TaskFromCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  status: z.lazy(() => TaskStatusSchema),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutFromTasksInputSchema),
  toUsers: z.lazy(() => TaskToCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskFromUncheckedCreateInputSchema: z.ZodType<Prisma.TaskFromUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
  status: z.lazy(() => TaskStatusSchema),
  toUsers: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskFromUpdateInputSchema: z.ZodType<Prisma.TaskFromUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutFromTasksNestedInputSchema).optional(),
  toUsers: z.lazy(() => TaskToUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskFromUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskFromCreateManyInputSchema: z.ZodType<Prisma.TaskFromCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
  status: z.lazy(() => TaskStatusSchema)
}).strict();

export const TaskFromUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskFromUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskFromUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToCreateInputSchema: z.ZodType<Prisma.TaskToCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => TaskToStatusSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutToTasksInputSchema),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutToUsersInputSchema)
}).strict();

export const TaskToUncheckedCreateInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  taskId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export const TaskToUpdateInputSchema: z.ZodType<Prisma.TaskToUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutToTasksNestedInputSchema).optional(),
  task: z.lazy(() => TaskFromUpdateOneRequiredWithoutToUsersNestedInputSchema).optional()
}).strict();

export const TaskToUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToCreateManyInputSchema: z.ZodType<Prisma.TaskToCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  taskId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export const TaskToUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskToUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomsInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomsInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUpdateInputSchema: z.ZodType<Prisma.RoomUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutRoomsNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoomsNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomCreateManyInputSchema: z.ZodType<Prisma.RoomCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable()
}).strict();

export const RoomUpdateManyMutationInputSchema: z.ZodType<Prisma.RoomUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumUserStatusFilterSchema: z.ZodType<Prisma.EnumUserStatusFilter> = z.object({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => NestedEnumUserStatusFilterSchema) ]).optional(),
}).strict();

export const EnumUserTypeFilterSchema: z.ZodType<Prisma.EnumUserTypeFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.lazy(() => UserTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const HonorListRelationFilterSchema: z.ZodType<Prisma.HonorListRelationFilter> = z.object({
  every: z.lazy(() => HonorWhereInputSchema).optional(),
  some: z.lazy(() => HonorWhereInputSchema).optional(),
  none: z.lazy(() => HonorWhereInputSchema).optional()
}).strict();

export const RoomListRelationFilterSchema: z.ZodType<Prisma.RoomListRelationFilter> = z.object({
  every: z.lazy(() => RoomWhereInputSchema).optional(),
  some: z.lazy(() => RoomWhereInputSchema).optional(),
  none: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const TaskFromListRelationFilterSchema: z.ZodType<Prisma.TaskFromListRelationFilter> = z.object({
  every: z.lazy(() => TaskFromWhereInputSchema).optional(),
  some: z.lazy(() => TaskFromWhereInputSchema).optional(),
  none: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export const TaskToListRelationFilterSchema: z.ZodType<Prisma.TaskToListRelationFilter> = z.object({
  every: z.lazy(() => TaskToWhereInputSchema).optional(),
  some: z.lazy(() => TaskToWhereInputSchema).optional(),
  none: z.lazy(() => TaskToWhereInputSchema).optional()
}).strict();

export const ProductFromListRelationFilterSchema: z.ZodType<Prisma.ProductFromListRelationFilter> = z.object({
  every: z.lazy(() => ProductFromWhereInputSchema).optional(),
  some: z.lazy(() => ProductFromWhereInputSchema).optional(),
  none: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export const ProductToListRelationFilterSchema: z.ZodType<Prisma.ProductToListRelationFilter> = z.object({
  every: z.lazy(() => ProductToWhereInputSchema).optional(),
  some: z.lazy(() => ProductToWhereInputSchema).optional(),
  none: z.lazy(() => ProductToWhereInputSchema).optional()
}).strict();

export const BillListRelationFilterSchema: z.ZodType<Prisma.BillListRelationFilter> = z.object({
  every: z.lazy(() => BillWhereInputSchema).optional(),
  some: z.lazy(() => BillWhereInputSchema).optional(),
  none: z.lazy(() => BillWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HonorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HonorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoomOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskFromOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskFromOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskToOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskToOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductFromOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductFromOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductToOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductToOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BillOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  phoneVerified: z.lazy(() => SortOrderSchema).optional(),
  validated: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  phoneVerified: z.lazy(() => SortOrderSchema).optional(),
  validated: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  phoneVerified: z.lazy(() => SortOrderSchema).optional(),
  validated: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional()
}).strict();

export const EnumUserTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.lazy(() => UserTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTypeFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const ProductFromRelationFilterSchema: z.ZodType<Prisma.ProductFromRelationFilter> = z.object({
  is: z.lazy(() => ProductFromWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export const BillCountOrderByAggregateInputSchema: z.ZodType<Prisma.BillCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BillMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BillMinOrderByAggregateInputSchema: z.ZodType<Prisma.BillMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumHonorTypeFilterSchema: z.ZodType<Prisma.EnumHonorTypeFilter> = z.object({
  equals: z.lazy(() => HonorTypeSchema).optional(),
  in: z.lazy(() => HonorTypeSchema).array().optional(),
  notIn: z.lazy(() => HonorTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => NestedEnumHonorTypeFilterSchema) ]).optional(),
}).strict();

export const HonorCountOrderByAggregateInputSchema: z.ZodType<Prisma.HonorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HonorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HonorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HonorMinOrderByAggregateInputSchema: z.ZodType<Prisma.HonorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumHonorTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumHonorTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => HonorTypeSchema).optional(),
  in: z.lazy(() => HonorTypeSchema).array().optional(),
  notIn: z.lazy(() => HonorTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => NestedEnumHonorTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumHonorTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumHonorTypeFilterSchema).optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const RoomRelationFilterSchema: z.ZodType<Prisma.RoomRelationFilter> = z.object({
  is: z.lazy(() => RoomWhereInputSchema).optional(),
  isNot: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPosterSourceFilterSchema: z.ZodType<Prisma.EnumPosterSourceFilter> = z.object({
  equals: z.lazy(() => PosterSourceSchema).optional(),
  in: z.lazy(() => PosterSourceSchema).array().optional(),
  notIn: z.lazy(() => PosterSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => NestedEnumPosterSourceFilterSchema) ]).optional(),
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPosterSourceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPosterSourceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PosterSourceSchema).optional(),
  in: z.lazy(() => PosterSourceSchema).array().optional(),
  notIn: z.lazy(() => PosterSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => NestedEnumPosterSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPosterSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPosterSourceFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const ProductFromCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  isOnsite: z.lazy(() => SortOrderSchema).optional(),
  isSelfOperating: z.lazy(() => SortOrderSchema).optional(),
  isReturnable: z.lazy(() => SortOrderSchema).optional(),
  isReservationRequired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductFromAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductFromMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  isOnsite: z.lazy(() => SortOrderSchema).optional(),
  isSelfOperating: z.lazy(() => SortOrderSchema).optional(),
  isReturnable: z.lazy(() => SortOrderSchema).optional(),
  isReservationRequired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductFromMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  isOnsite: z.lazy(() => SortOrderSchema).optional(),
  isSelfOperating: z.lazy(() => SortOrderSchema).optional(),
  isReturnable: z.lazy(() => SortOrderSchema).optional(),
  isReservationRequired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductFromSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ProductToCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductToAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToAvgOrderByAggregateInput> = z.object({
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductToMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductToMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductToSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToSumOrderByAggregateInput> = z.object({
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumTaskTypeFilterSchema: z.ZodType<Prisma.EnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
}).strict();

export const EnumTaskStatusFilterSchema: z.ZodType<Prisma.EnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export const TaskFromCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskFromAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskFromMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskFromMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskFromSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTaskTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional()
}).strict();

export const EnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export const EnumTaskToStatusFilterSchema: z.ZodType<Prisma.EnumTaskToStatusFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusFilterSchema) ]).optional(),
}).strict();

export const TaskFromRelationFilterSchema: z.ZodType<Prisma.TaskFromRelationFilter> = z.object({
  is: z.lazy(() => TaskFromWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export const TaskToCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskToCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskToMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskToMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskToMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskToMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTaskToStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskToStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskToStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskToStatusFilterSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoomCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoomMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HonorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HonorCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskFromCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskFromCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskToCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskToCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToCreateWithoutUserInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductFromCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductFromCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductToCreateNestedManyWithoutToUserInputSchema: z.ZodType<Prisma.ProductToCreateNestedManyWithoutToUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToCreateWithoutToUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyToUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BillCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BillCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillCreateWithoutUserInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutUserInputSchema),z.lazy(() => BillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HonorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUncheckedCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskFromCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskToUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToCreateWithoutUserInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUncheckedCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductFromCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductToUncheckedCreateNestedManyWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateNestedManyWithoutToUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToCreateWithoutToUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyToUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BillUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BillUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillCreateWithoutUserInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutUserInputSchema),z.lazy(() => BillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumUserStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserStatusSchema).optional()
}).strict();

export const EnumUserTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTypeSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HonorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HonorUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HonorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HonorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HonorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HonorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HonorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HonorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoomUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoomUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoomUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoomUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoomUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoomUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RoomUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskFromUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.TaskFromUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskFromCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskFromUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => TaskFromUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskToUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskToUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToCreateWithoutUserInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskToUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskToUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskToUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskToUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskToUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskToUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductFromUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ProductFromUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductFromCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductFromUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ProductFromUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductFromScalarWhereInputSchema),z.lazy(() => ProductFromScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductToUpdateManyWithoutToUserNestedInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithoutToUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToCreateWithoutToUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductToUpsertWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ProductToUpsertWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyToUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductToUpdateWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ProductToUpdateWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductToUpdateManyWithWhereWithoutToUserInputSchema),z.lazy(() => ProductToUpdateManyWithWhereWithoutToUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BillUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BillUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillCreateWithoutUserInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutUserInputSchema),z.lazy(() => BillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HonorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HonorUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HonorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HonorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HonorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HonorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HonorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HonorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoomUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoomUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoomUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoomUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoomUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RoomUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => TaskFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskFromCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskFromWhereUniqueInputSchema),z.lazy(() => TaskFromWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskFromUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => TaskFromUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskToUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToCreateWithoutUserInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskToUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskToUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskToUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TaskToUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskToUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TaskToUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductFromCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductFromUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ProductFromUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductFromScalarWhereInputSchema),z.lazy(() => ProductFromScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateManyWithoutToUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToCreateWithoutToUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductToUpsertWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ProductToUpsertWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyToUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductToUpdateWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ProductToUpdateWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductToUpdateManyWithWhereWithoutToUserInputSchema),z.lazy(() => ProductToUpdateManyWithWhereWithoutToUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BillUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BillUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillCreateWithoutUserInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutUserInputSchema),z.lazy(() => BillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutBillsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBillsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProductFromCreateNestedOneWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromCreateNestedOneWithoutBillsInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutBillsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBillsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBillsInputSchema),z.lazy(() => UserUpdateWithoutBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBillsInputSchema) ]).optional(),
}).strict();

export const ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema: z.ZodType<Prisma.ProductFromUpdateOneRequiredWithoutBillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutBillsInputSchema).optional(),
  upsert: z.lazy(() => ProductFromUpsertWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateToOneWithWhereWithoutBillsInputSchema),z.lazy(() => ProductFromUpdateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutBillsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutHonorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHonorsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHonorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumHonorTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumHonorTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => HonorTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutHonorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHonorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHonorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHonorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHonorsInputSchema),z.lazy(() => UserUpdateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHonorsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RoomCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => UserUpdateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const RoomUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoomCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => RoomUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoomUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => RoomUpdateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const EnumPosterSourceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPosterSourceFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PosterSourceSchema).optional()
}).strict();

export const ProductFromCreateimagesInputSchema: z.ZodType<Prisma.ProductFromCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutFromProductsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFromProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProductToCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BillCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.BillCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillCreateWithoutProductInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutProductInputSchema),z.lazy(() => BillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductToUncheckedCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BillUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.BillUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillCreateWithoutProductInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutProductInputSchema),z.lazy(() => BillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductFromUpdateimagesInputSchema: z.ZodType<Prisma.ProductFromUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFromProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFromProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFromProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFromProductsInputSchema),z.lazy(() => UserUpdateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromProductsInputSchema) ]).optional(),
}).strict();

export const ProductToUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductToUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ProductToUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BillUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.BillUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillCreateWithoutProductInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutProductInputSchema),z.lazy(() => BillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BillUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => BillUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BillUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => BillUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BillUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => BillUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductToUncheckedUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductToUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ProductToUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BillUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.BillUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillCreateWithoutProductInputSchema).array(),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BillCreateOrConnectWithoutProductInputSchema),z.lazy(() => BillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BillUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => BillUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BillCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BillWhereUniqueInputSchema),z.lazy(() => BillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BillUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => BillUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BillUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => BillUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductFromCreateNestedOneWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromCreateNestedOneWithoutToUsersInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutToProductsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutToProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ProductFromUpdateOneRequiredWithoutToUsersNestedInputSchema: z.ZodType<Prisma.ProductFromUpdateOneRequiredWithoutToUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  upsert: z.lazy(() => ProductFromUpsertWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema),z.lazy(() => ProductFromUpdateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutToUsersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutToProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutToProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToProductsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutToProductsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutToProductsInputSchema),z.lazy(() => UserUpdateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToProductsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFromTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFromTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskToCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskToCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskToUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumTaskTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskTypeSchema).optional()
}).strict();

export const EnumTaskStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutFromTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFromTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFromTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFromTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFromTasksInputSchema),z.lazy(() => UserUpdateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromTasksInputSchema) ]).optional(),
}).strict();

export const TaskToUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.TaskToUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskToUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskToUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskToUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskToUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskToUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => TaskToUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToCreateWithoutTaskInputSchema).array(),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema),z.lazy(() => TaskToCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskToUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskToUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskToCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskToWhereUniqueInputSchema),z.lazy(() => TaskToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskToUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => TaskToUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskToUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => TaskToUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutToTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutToTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskFromCreateNestedOneWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromCreateNestedOneWithoutToUsersInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional()
}).strict();

export const EnumTaskToStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskToStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskToStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutToTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutToTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutToTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutToTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutToTasksInputSchema),z.lazy(() => UserUpdateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToTasksInputSchema) ]).optional(),
}).strict();

export const TaskFromUpdateOneRequiredWithoutToUsersNestedInputSchema: z.ZodType<Prisma.TaskFromUpdateOneRequiredWithoutToUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  upsert: z.lazy(() => TaskFromUpsertWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => TaskFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema),z.lazy(() => TaskFromUpdateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutToUsersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoomsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserCreateWithoutRoomsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoomsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoomsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserCreateWithoutRoomsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoomsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserCreateWithoutRoomsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRoomsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoomsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserCreateWithoutRoomsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumUserStatusFilterSchema: z.ZodType<Prisma.NestedEnumUserStatusFilter> = z.object({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => NestedEnumUserStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserTypeFilterSchema: z.ZodType<Prisma.NestedEnumUserTypeFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.lazy(() => UserTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedEnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional()
}).strict();

export const NestedEnumUserTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTypeSchema).optional(),
  in: z.lazy(() => UserTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => NestedEnumUserTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTypeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumHonorTypeFilterSchema: z.ZodType<Prisma.NestedEnumHonorTypeFilter> = z.object({
  equals: z.lazy(() => HonorTypeSchema).optional(),
  in: z.lazy(() => HonorTypeSchema).array().optional(),
  notIn: z.lazy(() => HonorTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => NestedEnumHonorTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumHonorTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumHonorTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => HonorTypeSchema).optional(),
  in: z.lazy(() => HonorTypeSchema).array().optional(),
  notIn: z.lazy(() => HonorTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => NestedEnumHonorTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumHonorTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumHonorTypeFilterSchema).optional()
}).strict();

export const NestedEnumPosterSourceFilterSchema: z.ZodType<Prisma.NestedEnumPosterSourceFilter> = z.object({
  equals: z.lazy(() => PosterSourceSchema).optional(),
  in: z.lazy(() => PosterSourceSchema).array().optional(),
  notIn: z.lazy(() => PosterSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => NestedEnumPosterSourceFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPosterSourceWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPosterSourceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PosterSourceSchema).optional(),
  in: z.lazy(() => PosterSourceSchema).array().optional(),
  notIn: z.lazy(() => PosterSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => NestedEnumPosterSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPosterSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPosterSourceFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumTaskTypeFilterSchema: z.ZodType<Prisma.NestedEnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTaskStatusFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTaskTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional()
}).strict();

export const NestedEnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export const NestedEnumTaskToStatusFilterSchema: z.ZodType<Prisma.NestedEnumTaskToStatusFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTaskToStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskToStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskToStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskToStatusFilterSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HonorCreateWithoutUserInputSchema: z.ZodType<Prisma.HonorCreateWithoutUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HonorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedCreateWithoutUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HonorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.HonorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => HonorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HonorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.HonorCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HonorCreateManyUserInputSchema),z.lazy(() => HonorCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RoomCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const MessageCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateWithoutSenderInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  room: z.lazy(() => RoomCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutSenderInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  roomId: z.string()
}).strict();

export const MessageCreateOrConnectWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema) ]),
}).strict();

export const MessageCreateManySenderInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManySenderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManySenderInputSchema),z.lazy(() => MessageCreateManySenderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskFromCreateWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  status: z.lazy(() => TaskStatusSchema),
  toUsers: z.lazy(() => TaskToCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskFromUncheckedCreateWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUncheckedCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  status: z.lazy(() => TaskStatusSchema),
  toUsers: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskFromCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const TaskFromCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.TaskFromCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskFromCreateManyFromUserInputSchema),z.lazy(() => TaskFromCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskToCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskToCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => TaskToStatusSchema),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutToUsersInputSchema)
}).strict();

export const TaskToUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  taskId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export const TaskToCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TaskToCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskToCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TaskToCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskToCreateManyUserInputSchema),z.lazy(() => TaskToCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductFromCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  toUsers: z.lazy(() => ProductToCreateNestedManyWithoutFromUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductFromUncheckedCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUncheckedCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  toUsers: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductFromCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const ProductFromCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.ProductFromCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductFromCreateManyFromUserInputSchema),z.lazy(() => ProductFromCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductToCreateWithoutToUserInputSchema: z.ZodType<Prisma.ProductToCreateWithoutToUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional(),
  fromUser: z.lazy(() => ProductFromCreateNestedOneWithoutToUsersInputSchema)
}).strict();

export const ProductToUncheckedCreateWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateWithoutToUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export const ProductToCreateOrConnectWithoutToUserInputSchema: z.ZodType<Prisma.ProductToCreateOrConnectWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema) ]),
}).strict();

export const ProductToCreateManyToUserInputEnvelopeSchema: z.ZodType<Prisma.ProductToCreateManyToUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductToCreateManyToUserInputSchema),z.lazy(() => ProductToCreateManyToUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BillCreateWithoutUserInputSchema: z.ZodType<Prisma.BillCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductFromCreateNestedOneWithoutBillsInputSchema)
}).strict();

export const BillUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BillUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string()
}).strict();

export const BillCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BillCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BillCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BillCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BillCreateManyUserInputSchema),z.lazy(() => BillCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const HonorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HonorUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HonorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HonorUpdateWithoutUserInputSchema),z.lazy(() => HonorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HonorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HonorUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HonorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HonorUpdateWithoutUserInputSchema),z.lazy(() => HonorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const HonorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.HonorUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => HonorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HonorUpdateManyMutationInputSchema),z.lazy(() => HonorUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const HonorScalarWhereInputSchema: z.ZodType<Prisma.HonorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumHonorTypeFilterSchema),z.lazy(() => HonorTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RoomUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoomUpdateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const RoomUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RoomUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RoomScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoomUpdateManyMutationInputSchema),z.lazy(() => RoomUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const RoomScalarWhereInputSchema: z.ZodType<Prisma.RoomScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoomScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoomScalarWhereInputSchema),z.lazy(() => RoomScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutSenderInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutSenderInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutSenderInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutSenderInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  senderId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskFromUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskFromUpdateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const TaskFromUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskFromUpdateWithoutFromUserInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export const TaskFromUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => TaskFromScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskFromUpdateManyMutationInputSchema),z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export const TaskFromScalarWhereInputSchema: z.ZodType<Prisma.TaskFromScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
}).strict();

export const TaskToUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskToUpdateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TaskToCreateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TaskToUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateWithoutUserInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TaskToUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TaskToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateManyMutationInputSchema),z.lazy(() => TaskToUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TaskToScalarWhereInputSchema: z.ZodType<Prisma.TaskToScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToScalarWhereInputSchema),z.lazy(() => TaskToScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
}).strict();

export const ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductFromUpdateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductFromUpdateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export const ProductFromUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductFromUpdateManyMutationInputSchema),z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export const ProductFromScalarWhereInputSchema: z.ZodType<Prisma.ProductFromScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductFromScalarWhereInputSchema),z.lazy(() => ProductFromScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductFromScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductFromScalarWhereInputSchema),z.lazy(() => ProductFromScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isOnsite: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isSelfOperating: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReturnable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReservationRequired: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const ProductToUpsertWithWhereUniqueWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpsertWithWhereUniqueWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductToUpdateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutToUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema) ]),
}).strict();

export const ProductToUpdateWithWhereUniqueWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpdateWithWhereUniqueWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutToUserInputSchema) ]),
}).strict();

export const ProductToUpdateManyWithWhereWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithWhereWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateManyMutationInputSchema),z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserInputSchema) ]),
}).strict();

export const ProductToScalarWhereInputSchema: z.ZodType<Prisma.ProductToScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const BillUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BillUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BillUpdateWithoutUserInputSchema),z.lazy(() => BillUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BillCreateWithoutUserInputSchema),z.lazy(() => BillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BillUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BillUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BillUpdateWithoutUserInputSchema),z.lazy(() => BillUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BillUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BillUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BillUpdateManyMutationInputSchema),z.lazy(() => BillUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const BillScalarWhereInputSchema: z.ZodType<Prisma.BillScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutBillsInputSchema: z.ZodType<Prisma.UserCreateWithoutBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBillsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBillsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBillsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]),
}).strict();

export const ProductFromCreateWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromCreateWithoutBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutFromProductsInputSchema),
  toUsers: z.lazy(() => ProductToCreateNestedManyWithoutFromUserInputSchema).optional()
}).strict();

export const ProductFromUncheckedCreateWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUncheckedCreateWithoutBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  toUsers: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutFromUserInputSchema).optional()
}).strict();

export const ProductFromCreateOrConnectWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromCreateOrConnectWithoutBillsInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]),
}).strict();

export const UserUpsertWithoutBillsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBillsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBillsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBillsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBillsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBillsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBillsInputSchema) ]),
}).strict();

export const UserUpdateWithoutBillsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBillsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional()
}).strict();

export const ProductFromUpsertWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUpsertWithoutBillsInput> = z.object({
  update: z.union([ z.lazy(() => ProductFromUpdateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutBillsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]),
  where: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export const ProductFromUpdateToOneWithWhereWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUpdateToOneWithWhereWithoutBillsInput> = z.object({
  where: z.lazy(() => ProductFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductFromUpdateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutBillsInputSchema) ]),
}).strict();

export const ProductFromUpdateWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUpdateWithoutBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutFromProductsNestedInputSchema).optional(),
  toUsers: z.lazy(() => ProductToUpdateManyWithoutFromUserNestedInputSchema).optional()
}).strict();

export const ProductFromUncheckedUpdateWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateWithoutBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toUsers: z.lazy(() => ProductToUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutHonorsInputSchema: z.ZodType<Prisma.UserCreateWithoutHonorsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHonorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHonorsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHonorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHonorsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]),
}).strict();

export const UserUpsertWithoutHonorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutHonorsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHonorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHonorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHonorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHonorsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHonorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHonorsInputSchema) ]),
}).strict();

export const UserUpdateWithoutHonorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutHonorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHonorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHonorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const RoomCreateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomsInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomsInputSchema).optional()
}).strict();

export const RoomCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => RoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const UserUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const UserUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RoomUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => RoomUpdateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => RoomCreateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => RoomWhereInputSchema).optional()
}).strict();

export const RoomUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => RoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoomUpdateWithoutMessagesInputSchema),z.lazy(() => RoomUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const RoomUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutRoomsNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoomsNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFromProductsInputSchema: z.ZodType<Prisma.UserCreateWithoutFromProductsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFromProductsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFromProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFromProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]),
}).strict();

export const ProductToCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional(),
  toUser: z.lazy(() => UserCreateNestedOneWithoutToProductsInputSchema)
}).strict();

export const ProductToUncheckedCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  toUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export const ProductToCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const ProductToCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.ProductToCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductToCreateManyFromUserInputSchema),z.lazy(() => ProductToCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BillCreateWithoutProductInputSchema: z.ZodType<Prisma.BillCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBillsInputSchema)
}).strict();

export const BillUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.BillUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const BillCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.BillCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const BillCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.BillCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BillCreateManyProductInputSchema),z.lazy(() => BillCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUpsertWithoutFromProductsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromProductsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFromProductsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFromProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromProductsInputSchema) ]),
}).strict();

export const UserUpdateWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUpdateWithoutFromProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFromProductsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFromProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductToUpdateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export const ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export const ProductToUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateManyMutationInputSchema),z.lazy(() => ProductToUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export const BillUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.BillUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BillUpdateWithoutProductInputSchema),z.lazy(() => BillUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => BillCreateWithoutProductInputSchema),z.lazy(() => BillUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const BillUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.BillUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => BillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BillUpdateWithoutProductInputSchema),z.lazy(() => BillUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const BillUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.BillUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => BillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BillUpdateManyMutationInputSchema),z.lazy(() => BillUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const ProductFromCreateWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutFromProductsInputSchema),
  bills: z.lazy(() => BillCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductFromUncheckedCreateWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUncheckedCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductFromCreateOrConnectWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromCreateOrConnectWithoutToUsersInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]),
}).strict();

export const UserCreateWithoutToProductsInputSchema: z.ZodType<Prisma.UserCreateWithoutToProductsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutToProductsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutToProductsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutToProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutToProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]),
}).strict();

export const ProductFromUpsertWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUpsertWithoutToUsersInput> = z.object({
  update: z.union([ z.lazy(() => ProductFromUpdateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutToUsersInputSchema) ]),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]),
  where: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export const ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUpdateToOneWithWhereWithoutToUsersInput> = z.object({
  where: z.lazy(() => ProductFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductFromUpdateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutToUsersInputSchema) ]),
}).strict();

export const ProductFromUpdateWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUpdateWithoutToUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutFromProductsNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductFromUncheckedUpdateWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateWithoutToUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutToProductsInputSchema: z.ZodType<Prisma.UserUpsertWithoutToProductsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutToProductsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutToProductsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutToProductsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutToProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToProductsInputSchema) ]),
}).strict();

export const UserUpdateWithoutToProductsInputSchema: z.ZodType<Prisma.UserUpdateWithoutToProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutToProductsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutToProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutFromTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutFromTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFromTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFromTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFromTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]),
}).strict();

export const TaskToCreateWithoutTaskInputSchema: z.ZodType<Prisma.TaskToCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => TaskToStatusSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutToTasksInputSchema)
}).strict();

export const TaskToUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export const TaskToCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.TaskToCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const TaskToCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.TaskToCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskToCreateManyTaskInputSchema),z.lazy(() => TaskToCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutFromTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutFromTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFromTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFromTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFromTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutFromTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFromTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFromTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TaskToUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskToUpdateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => TaskToCreateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const TaskToUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateWithoutTaskInputSchema),z.lazy(() => TaskToUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const TaskToUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => TaskToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskToUpdateManyMutationInputSchema),z.lazy(() => TaskToUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const UserCreateWithoutToTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutToTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutToTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutToTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutToTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutToTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]),
}).strict();

export const TaskFromCreateWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  status: z.lazy(() => TaskStatusSchema),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutFromTasksInputSchema)
}).strict();

export const TaskFromUncheckedCreateWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUncheckedCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
  status: z.lazy(() => TaskStatusSchema)
}).strict();

export const TaskFromCreateOrConnectWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromCreateOrConnectWithoutToUsersInput> = z.object({
  where: z.lazy(() => TaskFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]),
}).strict();

export const UserUpsertWithoutToTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutToTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutToTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutToTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutToTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutToTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutToTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutToTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutToTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutToTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutToTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TaskFromUpsertWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUpsertWithoutToUsersInput> = z.object({
  update: z.union([ z.lazy(() => TaskFromUpdateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutToUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TaskFromCreateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedCreateWithoutToUsersInputSchema) ]),
  where: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export const TaskFromUpdateToOneWithWhereWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUpdateToOneWithWhereWithoutToUsersInput> = z.object({
  where: z.lazy(() => TaskFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskFromUpdateWithoutToUsersInputSchema),z.lazy(() => TaskFromUncheckedUpdateWithoutToUsersInputSchema) ]),
}).strict();

export const TaskFromUpdateWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUpdateWithoutToUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  fromUser: z.lazy(() => UserUpdateOneRequiredWithoutFromTasksNestedInputSchema).optional()
}).strict();

export const TaskFromUncheckedUpdateWithoutToUsersInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateWithoutToUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutRoomsInputSchema: z.ZodType<Prisma.UserCreateWithoutRoomsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRoomsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoomsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export const MessageCreateWithoutRoomInputSchema: z.ZodType<Prisma.MessageCreateWithoutRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  sender: z.lazy(() => UserCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export const MessageUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  senderId: z.string().optional().nullable()
}).strict();

export const MessageCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutRoomInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const MessageCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyRoomInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyRoomInputSchema),z.lazy(() => MessageCreateManyRoomInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoomsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoomsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoomsInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutRoomInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutRoomInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutRoomInputSchema) ]),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedCreateNestedManyWithoutToUserInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  rooms: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const HonorCreateManyUserInputSchema: z.ZodType<Prisma.HonorCreateManyUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MessageCreateManySenderInputSchema: z.ZodType<Prisma.MessageCreateManySenderInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  roomId: z.string()
}).strict();

export const TaskFromCreateManyFromUserInputSchema: z.ZodType<Prisma.TaskFromCreateManyFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  title: z.string(),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  status: z.lazy(() => TaskStatusSchema)
}).strict();

export const TaskToCreateManyUserInputSchema: z.ZodType<Prisma.TaskToCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  taskId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export const ProductFromCreateManyFromUserInputSchema: z.ZodType<Prisma.ProductFromCreateManyFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable()
}).strict();

export const ProductToCreateManyToUserInputSchema: z.ZodType<Prisma.ProductToCreateManyToUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export const BillCreateManyUserInputSchema: z.ZodType<Prisma.BillCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HonorUpdateWithoutUserInputSchema: z.ZodType<Prisma.HonorUpdateWithoutUserInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HonorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HonorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoomUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messages: z.lazy(() => MessageUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  room: z.lazy(() => RoomUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSenderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roomId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskFromUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskFromUncheckedUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskFromUncheckedUpdateManyWithoutFromUserInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateManyWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToUpdateWithoutUserInputSchema: z.ZodType<Prisma.TaskToUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskFromUpdateOneRequiredWithoutToUsersNestedInputSchema).optional()
}).strict();

export const TaskToUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductFromUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toUsers: z.lazy(() => ProductToUpdateManyWithoutFromUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductFromUncheckedUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toUsers: z.lazy(() => ProductToUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductFromUncheckedUpdateManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUncheckedUpdateManyWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductFromUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductToUpdateWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpdateWithoutToUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  fromUser: z.lazy(() => ProductFromUpdateOneRequiredWithoutToUsersNestedInputSchema).optional()
}).strict();

export const ProductToUncheckedUpdateWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateWithoutToUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductToUncheckedUpdateManyWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateManyWithoutToUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BillUpdateWithoutUserInputSchema: z.ZodType<Prisma.BillUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema).optional()
}).strict();

export const BillUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BillUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BillUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.BillUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductToCreateManyFromUserInputSchema: z.ZodType<Prisma.ProductToCreateManyFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  toUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export const BillCreateManyProductInputSchema: z.ZodType<Prisma.BillCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const ProductToUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  toUser: z.lazy(() => UserUpdateOneRequiredWithoutToProductsNestedInputSchema).optional()
}).strict();

export const ProductToUncheckedUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductToUncheckedUpdateManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateManyWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  toUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isFavored: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  inCar: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bought: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BillUpdateWithoutProductInputSchema: z.ZodType<Prisma.BillUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBillsNestedInputSchema).optional()
}).strict();

export const BillUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.BillUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BillUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.BillUncheckedUpdateManyWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToCreateManyTaskInputSchema: z.ZodType<Prisma.TaskToCreateManyTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export const TaskToUpdateWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutToTasksNestedInputSchema).optional()
}).strict();

export const TaskToUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskToUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyRoomInputSchema: z.ZodType<Prisma.MessageCreateManyRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  senderId: z.string().optional().nullable()
}).strict();

export const UserUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoomsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoomsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toTasks: z.lazy(() => TaskToUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserNestedInputSchema).optional(),
  toProducts: z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema).optional(),
  bills: z.lazy(() => BillUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutRoomsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoomsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUpdateWithoutRoomInputSchema: z.ZodType<Prisma.MessageUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sender: z.lazy(() => UserUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateWithoutRoomInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  senderId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateManyWithoutRoomInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutRoomInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  senderId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const BillFindFirstArgsSchema: z.ZodType<Prisma.BillFindFirstArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithRelationInputSchema.array(),BillOrderByWithRelationInputSchema ]).optional(),
  cursor: BillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BillScalarFieldEnumSchema,BillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BillFindFirstOrThrowArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithRelationInputSchema.array(),BillOrderByWithRelationInputSchema ]).optional(),
  cursor: BillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BillScalarFieldEnumSchema,BillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BillFindManyArgsSchema: z.ZodType<Prisma.BillFindManyArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithRelationInputSchema.array(),BillOrderByWithRelationInputSchema ]).optional(),
  cursor: BillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BillScalarFieldEnumSchema,BillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BillAggregateArgsSchema: z.ZodType<Prisma.BillAggregateArgs> = z.object({
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithRelationInputSchema.array(),BillOrderByWithRelationInputSchema ]).optional(),
  cursor: BillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BillGroupByArgsSchema: z.ZodType<Prisma.BillGroupByArgs> = z.object({
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithAggregationInputSchema.array(),BillOrderByWithAggregationInputSchema ]).optional(),
  by: BillScalarFieldEnumSchema.array(),
  having: BillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BillFindUniqueArgsSchema: z.ZodType<Prisma.BillFindUniqueArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereUniqueInputSchema,
}).strict() ;

export const BillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BillFindUniqueOrThrowArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereUniqueInputSchema,
}).strict() ;

export const HonorFindFirstArgsSchema: z.ZodType<Prisma.HonorFindFirstArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithRelationInputSchema.array(),HonorOrderByWithRelationInputSchema ]).optional(),
  cursor: HonorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HonorScalarFieldEnumSchema,HonorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HonorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HonorFindFirstOrThrowArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithRelationInputSchema.array(),HonorOrderByWithRelationInputSchema ]).optional(),
  cursor: HonorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HonorScalarFieldEnumSchema,HonorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HonorFindManyArgsSchema: z.ZodType<Prisma.HonorFindManyArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithRelationInputSchema.array(),HonorOrderByWithRelationInputSchema ]).optional(),
  cursor: HonorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HonorScalarFieldEnumSchema,HonorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HonorAggregateArgsSchema: z.ZodType<Prisma.HonorAggregateArgs> = z.object({
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithRelationInputSchema.array(),HonorOrderByWithRelationInputSchema ]).optional(),
  cursor: HonorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HonorGroupByArgsSchema: z.ZodType<Prisma.HonorGroupByArgs> = z.object({
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithAggregationInputSchema.array(),HonorOrderByWithAggregationInputSchema ]).optional(),
  by: HonorScalarFieldEnumSchema.array(),
  having: HonorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HonorFindUniqueArgsSchema: z.ZodType<Prisma.HonorFindUniqueArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereUniqueInputSchema,
}).strict() ;

export const HonorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HonorFindUniqueOrThrowArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereUniqueInputSchema,
}).strict() ;

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const ProductFromFindFirstArgsSchema: z.ZodType<Prisma.ProductFromFindFirstArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithRelationInputSchema.array(),ProductFromOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductFromScalarFieldEnumSchema,ProductFromScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFromFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFromFindFirstOrThrowArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithRelationInputSchema.array(),ProductFromOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductFromScalarFieldEnumSchema,ProductFromScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFromFindManyArgsSchema: z.ZodType<Prisma.ProductFromFindManyArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithRelationInputSchema.array(),ProductFromOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductFromScalarFieldEnumSchema,ProductFromScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFromAggregateArgsSchema: z.ZodType<Prisma.ProductFromAggregateArgs> = z.object({
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithRelationInputSchema.array(),ProductFromOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductFromGroupByArgsSchema: z.ZodType<Prisma.ProductFromGroupByArgs> = z.object({
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithAggregationInputSchema.array(),ProductFromOrderByWithAggregationInputSchema ]).optional(),
  by: ProductFromScalarFieldEnumSchema.array(),
  having: ProductFromScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductFromFindUniqueArgsSchema: z.ZodType<Prisma.ProductFromFindUniqueArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereUniqueInputSchema,
}).strict() ;

export const ProductFromFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFromFindUniqueOrThrowArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereUniqueInputSchema,
}).strict() ;

export const ProductToFindFirstArgsSchema: z.ZodType<Prisma.ProductToFindFirstArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithRelationInputSchema.array(),ProductToOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductToScalarFieldEnumSchema,ProductToScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductToFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductToFindFirstOrThrowArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithRelationInputSchema.array(),ProductToOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductToScalarFieldEnumSchema,ProductToScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductToFindManyArgsSchema: z.ZodType<Prisma.ProductToFindManyArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithRelationInputSchema.array(),ProductToOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductToScalarFieldEnumSchema,ProductToScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductToAggregateArgsSchema: z.ZodType<Prisma.ProductToAggregateArgs> = z.object({
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithRelationInputSchema.array(),ProductToOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductToGroupByArgsSchema: z.ZodType<Prisma.ProductToGroupByArgs> = z.object({
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithAggregationInputSchema.array(),ProductToOrderByWithAggregationInputSchema ]).optional(),
  by: ProductToScalarFieldEnumSchema.array(),
  having: ProductToScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductToFindUniqueArgsSchema: z.ZodType<Prisma.ProductToFindUniqueArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereUniqueInputSchema,
}).strict() ;

export const ProductToFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductToFindUniqueOrThrowArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereUniqueInputSchema,
}).strict() ;

export const TaskFromFindFirstArgsSchema: z.ZodType<Prisma.TaskFromFindFirstArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithRelationInputSchema.array(),TaskFromOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskFromScalarFieldEnumSchema,TaskFromScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFromFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFromFindFirstOrThrowArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithRelationInputSchema.array(),TaskFromOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskFromScalarFieldEnumSchema,TaskFromScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFromFindManyArgsSchema: z.ZodType<Prisma.TaskFromFindManyArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithRelationInputSchema.array(),TaskFromOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskFromScalarFieldEnumSchema,TaskFromScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFromAggregateArgsSchema: z.ZodType<Prisma.TaskFromAggregateArgs> = z.object({
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithRelationInputSchema.array(),TaskFromOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFromGroupByArgsSchema: z.ZodType<Prisma.TaskFromGroupByArgs> = z.object({
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithAggregationInputSchema.array(),TaskFromOrderByWithAggregationInputSchema ]).optional(),
  by: TaskFromScalarFieldEnumSchema.array(),
  having: TaskFromScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFromFindUniqueArgsSchema: z.ZodType<Prisma.TaskFromFindUniqueArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereUniqueInputSchema,
}).strict() ;

export const TaskFromFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFromFindUniqueOrThrowArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereUniqueInputSchema,
}).strict() ;

export const TaskToFindFirstArgsSchema: z.ZodType<Prisma.TaskToFindFirstArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithRelationInputSchema.array(),TaskToOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskToScalarFieldEnumSchema,TaskToScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskToFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskToFindFirstOrThrowArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithRelationInputSchema.array(),TaskToOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskToScalarFieldEnumSchema,TaskToScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskToFindManyArgsSchema: z.ZodType<Prisma.TaskToFindManyArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithRelationInputSchema.array(),TaskToOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskToScalarFieldEnumSchema,TaskToScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskToAggregateArgsSchema: z.ZodType<Prisma.TaskToAggregateArgs> = z.object({
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithRelationInputSchema.array(),TaskToOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskToGroupByArgsSchema: z.ZodType<Prisma.TaskToGroupByArgs> = z.object({
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithAggregationInputSchema.array(),TaskToOrderByWithAggregationInputSchema ]).optional(),
  by: TaskToScalarFieldEnumSchema.array(),
  having: TaskToScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskToFindUniqueArgsSchema: z.ZodType<Prisma.TaskToFindUniqueArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereUniqueInputSchema,
}).strict() ;

export const TaskToFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskToFindUniqueOrThrowArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereUniqueInputSchema,
}).strict() ;

export const RoomFindFirstArgsSchema: z.ZodType<Prisma.RoomFindFirstArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoomFindFirstOrThrowArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomFindManyArgsSchema: z.ZodType<Prisma.RoomFindManyArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoomScalarFieldEnumSchema,RoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoomAggregateArgsSchema: z.ZodType<Prisma.RoomAggregateArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithRelationInputSchema.array(),RoomOrderByWithRelationInputSchema ]).optional(),
  cursor: RoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoomGroupByArgsSchema: z.ZodType<Prisma.RoomGroupByArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
  orderBy: z.union([ RoomOrderByWithAggregationInputSchema.array(),RoomOrderByWithAggregationInputSchema ]).optional(),
  by: RoomScalarFieldEnumSchema.array(),
  having: RoomScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoomFindUniqueArgsSchema: z.ZodType<Prisma.RoomFindUniqueArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoomFindUniqueOrThrowArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const BillCreateArgsSchema: z.ZodType<Prisma.BillCreateArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  data: z.union([ BillCreateInputSchema,BillUncheckedCreateInputSchema ]),
}).strict() ;

export const BillUpsertArgsSchema: z.ZodType<Prisma.BillUpsertArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereUniqueInputSchema,
  create: z.union([ BillCreateInputSchema,BillUncheckedCreateInputSchema ]),
  update: z.union([ BillUpdateInputSchema,BillUncheckedUpdateInputSchema ]),
}).strict() ;

export const BillCreateManyArgsSchema: z.ZodType<Prisma.BillCreateManyArgs> = z.object({
  data: z.union([ BillCreateManyInputSchema,BillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BillDeleteArgsSchema: z.ZodType<Prisma.BillDeleteArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereUniqueInputSchema,
}).strict() ;

export const BillUpdateArgsSchema: z.ZodType<Prisma.BillUpdateArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  data: z.union([ BillUpdateInputSchema,BillUncheckedUpdateInputSchema ]),
  where: BillWhereUniqueInputSchema,
}).strict() ;

export const BillUpdateManyArgsSchema: z.ZodType<Prisma.BillUpdateManyArgs> = z.object({
  data: z.union([ BillUpdateManyMutationInputSchema,BillUncheckedUpdateManyInputSchema ]),
  where: BillWhereInputSchema.optional(),
}).strict() ;

export const BillDeleteManyArgsSchema: z.ZodType<Prisma.BillDeleteManyArgs> = z.object({
  where: BillWhereInputSchema.optional(),
}).strict() ;

export const HonorCreateArgsSchema: z.ZodType<Prisma.HonorCreateArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  data: z.union([ HonorCreateInputSchema,HonorUncheckedCreateInputSchema ]),
}).strict() ;

export const HonorUpsertArgsSchema: z.ZodType<Prisma.HonorUpsertArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereUniqueInputSchema,
  create: z.union([ HonorCreateInputSchema,HonorUncheckedCreateInputSchema ]),
  update: z.union([ HonorUpdateInputSchema,HonorUncheckedUpdateInputSchema ]),
}).strict() ;

export const HonorCreateManyArgsSchema: z.ZodType<Prisma.HonorCreateManyArgs> = z.object({
  data: z.union([ HonorCreateManyInputSchema,HonorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HonorDeleteArgsSchema: z.ZodType<Prisma.HonorDeleteArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  where: HonorWhereUniqueInputSchema,
}).strict() ;

export const HonorUpdateArgsSchema: z.ZodType<Prisma.HonorUpdateArgs> = z.object({
  select: HonorSelectSchema.optional(),
  include: HonorIncludeSchema.optional(),
  data: z.union([ HonorUpdateInputSchema,HonorUncheckedUpdateInputSchema ]),
  where: HonorWhereUniqueInputSchema,
}).strict() ;

export const HonorUpdateManyArgsSchema: z.ZodType<Prisma.HonorUpdateManyArgs> = z.object({
  data: z.union([ HonorUpdateManyMutationInputSchema,HonorUncheckedUpdateManyInputSchema ]),
  where: HonorWhereInputSchema.optional(),
}).strict() ;

export const HonorDeleteManyArgsSchema: z.ZodType<Prisma.HonorDeleteManyArgs> = z.object({
  where: HonorWhereInputSchema.optional(),
}).strict() ;

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const ProductFromCreateArgsSchema: z.ZodType<Prisma.ProductFromCreateArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  data: z.union([ ProductFromCreateInputSchema,ProductFromUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductFromUpsertArgsSchema: z.ZodType<Prisma.ProductFromUpsertArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereUniqueInputSchema,
  create: z.union([ ProductFromCreateInputSchema,ProductFromUncheckedCreateInputSchema ]),
  update: z.union([ ProductFromUpdateInputSchema,ProductFromUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductFromCreateManyArgsSchema: z.ZodType<Prisma.ProductFromCreateManyArgs> = z.object({
  data: z.union([ ProductFromCreateManyInputSchema,ProductFromCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductFromDeleteArgsSchema: z.ZodType<Prisma.ProductFromDeleteArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereUniqueInputSchema,
}).strict() ;

export const ProductFromUpdateArgsSchema: z.ZodType<Prisma.ProductFromUpdateArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  data: z.union([ ProductFromUpdateInputSchema,ProductFromUncheckedUpdateInputSchema ]),
  where: ProductFromWhereUniqueInputSchema,
}).strict() ;

export const ProductFromUpdateManyArgsSchema: z.ZodType<Prisma.ProductFromUpdateManyArgs> = z.object({
  data: z.union([ ProductFromUpdateManyMutationInputSchema,ProductFromUncheckedUpdateManyInputSchema ]),
  where: ProductFromWhereInputSchema.optional(),
}).strict() ;

export const ProductFromDeleteManyArgsSchema: z.ZodType<Prisma.ProductFromDeleteManyArgs> = z.object({
  where: ProductFromWhereInputSchema.optional(),
}).strict() ;

export const ProductToCreateArgsSchema: z.ZodType<Prisma.ProductToCreateArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  data: z.union([ ProductToCreateInputSchema,ProductToUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductToUpsertArgsSchema: z.ZodType<Prisma.ProductToUpsertArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereUniqueInputSchema,
  create: z.union([ ProductToCreateInputSchema,ProductToUncheckedCreateInputSchema ]),
  update: z.union([ ProductToUpdateInputSchema,ProductToUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductToCreateManyArgsSchema: z.ZodType<Prisma.ProductToCreateManyArgs> = z.object({
  data: z.union([ ProductToCreateManyInputSchema,ProductToCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductToDeleteArgsSchema: z.ZodType<Prisma.ProductToDeleteArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereUniqueInputSchema,
}).strict() ;

export const ProductToUpdateArgsSchema: z.ZodType<Prisma.ProductToUpdateArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  data: z.union([ ProductToUpdateInputSchema,ProductToUncheckedUpdateInputSchema ]),
  where: ProductToWhereUniqueInputSchema,
}).strict() ;

export const ProductToUpdateManyArgsSchema: z.ZodType<Prisma.ProductToUpdateManyArgs> = z.object({
  data: z.union([ ProductToUpdateManyMutationInputSchema,ProductToUncheckedUpdateManyInputSchema ]),
  where: ProductToWhereInputSchema.optional(),
}).strict() ;

export const ProductToDeleteManyArgsSchema: z.ZodType<Prisma.ProductToDeleteManyArgs> = z.object({
  where: ProductToWhereInputSchema.optional(),
}).strict() ;

export const TaskFromCreateArgsSchema: z.ZodType<Prisma.TaskFromCreateArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  data: z.union([ TaskFromCreateInputSchema,TaskFromUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskFromUpsertArgsSchema: z.ZodType<Prisma.TaskFromUpsertArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereUniqueInputSchema,
  create: z.union([ TaskFromCreateInputSchema,TaskFromUncheckedCreateInputSchema ]),
  update: z.union([ TaskFromUpdateInputSchema,TaskFromUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskFromCreateManyArgsSchema: z.ZodType<Prisma.TaskFromCreateManyArgs> = z.object({
  data: z.union([ TaskFromCreateManyInputSchema,TaskFromCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskFromDeleteArgsSchema: z.ZodType<Prisma.TaskFromDeleteArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereUniqueInputSchema,
}).strict() ;

export const TaskFromUpdateArgsSchema: z.ZodType<Prisma.TaskFromUpdateArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  data: z.union([ TaskFromUpdateInputSchema,TaskFromUncheckedUpdateInputSchema ]),
  where: TaskFromWhereUniqueInputSchema,
}).strict() ;

export const TaskFromUpdateManyArgsSchema: z.ZodType<Prisma.TaskFromUpdateManyArgs> = z.object({
  data: z.union([ TaskFromUpdateManyMutationInputSchema,TaskFromUncheckedUpdateManyInputSchema ]),
  where: TaskFromWhereInputSchema.optional(),
}).strict() ;

export const TaskFromDeleteManyArgsSchema: z.ZodType<Prisma.TaskFromDeleteManyArgs> = z.object({
  where: TaskFromWhereInputSchema.optional(),
}).strict() ;

export const TaskToCreateArgsSchema: z.ZodType<Prisma.TaskToCreateArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  data: z.union([ TaskToCreateInputSchema,TaskToUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskToUpsertArgsSchema: z.ZodType<Prisma.TaskToUpsertArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereUniqueInputSchema,
  create: z.union([ TaskToCreateInputSchema,TaskToUncheckedCreateInputSchema ]),
  update: z.union([ TaskToUpdateInputSchema,TaskToUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskToCreateManyArgsSchema: z.ZodType<Prisma.TaskToCreateManyArgs> = z.object({
  data: z.union([ TaskToCreateManyInputSchema,TaskToCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskToDeleteArgsSchema: z.ZodType<Prisma.TaskToDeleteArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereUniqueInputSchema,
}).strict() ;

export const TaskToUpdateArgsSchema: z.ZodType<Prisma.TaskToUpdateArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  data: z.union([ TaskToUpdateInputSchema,TaskToUncheckedUpdateInputSchema ]),
  where: TaskToWhereUniqueInputSchema,
}).strict() ;

export const TaskToUpdateManyArgsSchema: z.ZodType<Prisma.TaskToUpdateManyArgs> = z.object({
  data: z.union([ TaskToUpdateManyMutationInputSchema,TaskToUncheckedUpdateManyInputSchema ]),
  where: TaskToWhereInputSchema.optional(),
}).strict() ;

export const TaskToDeleteManyArgsSchema: z.ZodType<Prisma.TaskToDeleteManyArgs> = z.object({
  where: TaskToWhereInputSchema.optional(),
}).strict() ;

export const RoomCreateArgsSchema: z.ZodType<Prisma.RoomCreateArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  data: z.union([ RoomCreateInputSchema,RoomUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const RoomUpsertArgsSchema: z.ZodType<Prisma.RoomUpsertArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
  create: z.union([ RoomCreateInputSchema,RoomUncheckedCreateInputSchema ]),
  update: z.union([ RoomUpdateInputSchema,RoomUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoomCreateManyArgsSchema: z.ZodType<Prisma.RoomCreateManyArgs> = z.object({
  data: z.union([ RoomCreateManyInputSchema,RoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoomDeleteArgsSchema: z.ZodType<Prisma.RoomDeleteArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomUpdateArgsSchema: z.ZodType<Prisma.RoomUpdateArgs> = z.object({
  select: RoomSelectSchema.optional(),
  include: RoomIncludeSchema.optional(),
  data: z.union([ RoomUpdateInputSchema,RoomUncheckedUpdateInputSchema ]),
  where: RoomWhereUniqueInputSchema,
}).strict() ;

export const RoomUpdateManyArgsSchema: z.ZodType<Prisma.RoomUpdateManyArgs> = z.object({
  data: z.union([ RoomUpdateManyMutationInputSchema,RoomUncheckedUpdateManyInputSchema ]),
  where: RoomWhereInputSchema.optional(),
}).strict() ;

export const RoomDeleteManyArgsSchema: z.ZodType<Prisma.RoomDeleteManyArgs> = z.object({
  where: RoomWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;