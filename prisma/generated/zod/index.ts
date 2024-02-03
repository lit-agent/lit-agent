import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const HonorScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','text','senderId','roomId']);

export const PostScalarFieldEnumSchema = z.enum(['id','name','text','source','createdAt','updatedAt']);

export const RoomScalarFieldEnumSchema = z.enum(['id','name']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const ProductScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','images','title','description','detail','price','total','isOnsite','isSelfOperating','isReturnable','isReservationRequired']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','validated','email','emailVerified','phone','phoneVerified','image','status','type','currentBalance','historyBalance']);

export const UserActionScalarFieldEnumSchema = z.enum(['id','createdAt','userId','type']);

export const UserProductBillScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','productId']);

export const UserProductActionScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','productId','actionType']);

export const UserTaskScalarFieldEnumSchema = z.enum(['id','createdAt','userId','taskId','action','status']);

export const TaskScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','type','content','value','ddl']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const HonorTypeSchema = z.enum(['NewUser','NewTask','GoodFriend','HotFriend','GoodFriendEver','HotFriendEver']);

export type HonorTypeType = `${z.infer<typeof HonorTypeSchema>}`

export const PosterSourceSchema = z.enum(['RAW','GITHUB']);

export type PosterSourceType = `${z.infer<typeof PosterSourceSchema>}`

export const UserActionTypeSchema = z.enum(['activate','deactivate','online','offline']);

export type UserActionTypeType = `${z.infer<typeof UserActionTypeSchema>}`

export const UserProductActionTypeSchema = z.enum(['on','off','pause','resume','favor','unfavor','clickCashBuy','clickVirtualBuy','buy','cancelBuy']);

export type UserProductActionTypeType = `${z.infer<typeof UserProductActionTypeSchema>}`

export const UserStatusSchema = z.enum(['online','busy','offline']);

export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const UserTaskStatusSchema = z.enum(['on','off','paused','goon','finished','cancelled']);

export type UserTaskStatusType = `${z.infer<typeof UserTaskStatusSchema>}`

export const UserTaskActionTypeSchema = z.enum(['on','off','pause','continue','comment','modifyComment','deleteComment','favorComment','replyComment','favorTask','unfavorTAsk']);

export type UserTaskActionTypeType = `${z.infer<typeof UserTaskActionTypeSchema>}`

export const UserTypeSchema = z.enum(['user','assistant','blogger']);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`

export const TaskTypeSchema = z.enum(['broadcast','textChoices','imageChoices']);

export type TaskTypeType = `${z.infer<typeof TaskTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

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
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  status: UserStatusSchema,
  type: UserTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().nullable(),
  validated: z.boolean().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  phone: z.string().nullable(),
  phoneVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  currentBalance: z.number().int(),
  historyBalance: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER ACTION SCHEMA
/////////////////////////////////////////

export const UserActionSchema = z.object({
  type: UserActionTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type UserAction = z.infer<typeof UserActionSchema>

/////////////////////////////////////////
// USER PRODUCT BILL SCHEMA
/////////////////////////////////////////

export const UserProductBillSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  productId: z.string(),
})

export type UserProductBill = z.infer<typeof UserProductBillSchema>

/////////////////////////////////////////
// USER PRODUCT ACTION SCHEMA
/////////////////////////////////////////

export const UserProductActionSchema = z.object({
  actionType: UserProductActionTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  productId: z.string(),
})

export type UserProductAction = z.infer<typeof UserProductActionSchema>

/////////////////////////////////////////
// USER TASK SCHEMA
/////////////////////////////////////////

export const UserTaskSchema = z.object({
  action: UserTaskActionTypeSchema,
  status: UserTaskStatusSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  taskId: z.string(),
})

export type UserTask = z.infer<typeof UserTaskSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  type: TaskTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
})

export type Task = z.infer<typeof TaskSchema>

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

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  userProductBills: z.union([z.boolean(),z.lazy(() => UserProductBillFindManyArgsSchema)]).optional(),
  userProductActions: z.union([z.boolean(),z.lazy(() => UserProductActionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  userProductBills: z.boolean().optional(),
  userProductActions: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
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
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  userProductBills: z.union([z.boolean(),z.lazy(() => UserProductBillFindManyArgsSchema)]).optional(),
  userProductActions: z.union([z.boolean(),z.lazy(() => UserProductActionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  room: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => UserActionFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  honors: z.union([z.boolean(),z.lazy(() => HonorFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  userProductActions: z.union([z.boolean(),z.lazy(() => UserProductActionFindManyArgsSchema)]).optional(),
  userProductBills: z.union([z.boolean(),z.lazy(() => UserProductBillFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  userTasks: z.union([z.boolean(),z.lazy(() => UserTaskFindManyArgsSchema)]).optional(),
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
  room: z.boolean().optional(),
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  actions: z.boolean().optional(),
  messages: z.boolean().optional(),
  honors: z.boolean().optional(),
  products: z.boolean().optional(),
  userProductActions: z.boolean().optional(),
  userProductBills: z.boolean().optional(),
  tasks: z.boolean().optional(),
  userTasks: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  validated: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  phone: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  status: z.boolean().optional(),
  type: z.boolean().optional(),
  currentBalance: z.boolean().optional(),
  historyBalance: z.boolean().optional(),
  room: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => UserActionFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  honors: z.union([z.boolean(),z.lazy(() => HonorFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  userProductActions: z.union([z.boolean(),z.lazy(() => UserProductActionFindManyArgsSchema)]).optional(),
  userProductBills: z.union([z.boolean(),z.lazy(() => UserProductBillFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  userTasks: z.union([z.boolean(),z.lazy(() => UserTaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER ACTION
//------------------------------------------------------

export const UserActionIncludeSchema: z.ZodType<Prisma.UserActionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserActionArgsSchema: z.ZodType<Prisma.UserActionDefaultArgs> = z.object({
  select: z.lazy(() => UserActionSelectSchema).optional(),
  include: z.lazy(() => UserActionIncludeSchema).optional(),
}).strict();

export const UserActionSelectSchema: z.ZodType<Prisma.UserActionSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER PRODUCT BILL
//------------------------------------------------------

export const UserProductBillIncludeSchema: z.ZodType<Prisma.UserProductBillInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

export const UserProductBillArgsSchema: z.ZodType<Prisma.UserProductBillDefaultArgs> = z.object({
  select: z.lazy(() => UserProductBillSelectSchema).optional(),
  include: z.lazy(() => UserProductBillIncludeSchema).optional(),
}).strict();

export const UserProductBillSelectSchema: z.ZodType<Prisma.UserProductBillSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  productId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// USER PRODUCT ACTION
//------------------------------------------------------

export const UserProductActionIncludeSchema: z.ZodType<Prisma.UserProductActionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

export const UserProductActionArgsSchema: z.ZodType<Prisma.UserProductActionDefaultArgs> = z.object({
  select: z.lazy(() => UserProductActionSelectSchema).optional(),
  include: z.lazy(() => UserProductActionIncludeSchema).optional(),
}).strict();

export const UserProductActionSelectSchema: z.ZodType<Prisma.UserProductActionSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  productId: z.boolean().optional(),
  actionType: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// USER TASK
//------------------------------------------------------

export const UserTaskIncludeSchema: z.ZodType<Prisma.UserTaskInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
}).strict()

export const UserTaskArgsSchema: z.ZodType<Prisma.UserTaskDefaultArgs> = z.object({
  select: z.lazy(() => UserTaskSelectSchema).optional(),
  include: z.lazy(() => UserTaskIncludeSchema).optional(),
}).strict();

export const UserTaskSelectSchema: z.ZodType<Prisma.UserTaskSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  taskId: z.boolean().optional(),
  action: z.boolean().optional(),
  status: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  userTasks: z.union([z.boolean(),z.lazy(() => UserTaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskCountOutputTypeArgsSchema: z.ZodType<Prisma.TaskCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TaskCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TaskCountOutputTypeSelectSchema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  userTasks: z.boolean().optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  value: z.boolean().optional(),
  ddl: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  userTasks: z.union([z.boolean(),z.lazy(() => UserTaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskCountOutputTypeArgsSchema)]).optional(),
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

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillListRelationFilterSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionListRelationFilterSchema).optional()
}).strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillOrderByRelationAggregateInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillListRelationFilterSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionListRelationFilterSchema).optional()
}).strict());

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  room: z.lazy(() => RoomListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  actions: z.lazy(() => UserActionListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  honors: z.lazy(() => HonorListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionListRelationFilterSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  userTasks: z.lazy(() => UserTaskListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  validated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional(),
  room: z.lazy(() => RoomOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  actions: z.lazy(() => UserActionOrderByRelationAggregateInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  honors: z.lazy(() => HonorOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionOrderByRelationAggregateInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskOrderByRelationAggregateInputSchema).optional()
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
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  room: z.lazy(() => RoomListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  actions: z.lazy(() => UserActionListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  honors: z.lazy(() => HonorListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionListRelationFilterSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  userTasks: z.lazy(() => UserTaskListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  validated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumUserStatusWithAggregatesFilterSchema),z.lazy(() => UserStatusSchema) ]).optional(),
  type: z.union([ z.lazy(() => EnumUserTypeWithAggregatesFilterSchema),z.lazy(() => UserTypeSchema) ]).optional(),
  currentBalance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  historyBalance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserActionWhereInputSchema: z.ZodType<Prisma.UserActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserActionWhereInputSchema),z.lazy(() => UserActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserActionWhereInputSchema),z.lazy(() => UserActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumUserActionTypeFilterSchema),z.lazy(() => UserActionTypeSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserActionOrderByWithRelationInputSchema: z.ZodType<Prisma.UserActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserActionWhereUniqueInputSchema: z.ZodType<Prisma.UserActionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserActionWhereInputSchema),z.lazy(() => UserActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserActionWhereInputSchema),z.lazy(() => UserActionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumUserActionTypeFilterSchema),z.lazy(() => UserActionTypeSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserActionMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserActionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserActionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumUserActionTypeWithAggregatesFilterSchema),z.lazy(() => UserActionTypeSchema) ]).optional(),
}).strict();

export const UserProductBillWhereInputSchema: z.ZodType<Prisma.UserProductBillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProductBillWhereInputSchema),z.lazy(() => UserProductBillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductBillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductBillWhereInputSchema),z.lazy(() => UserProductBillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict();

export const UserProductBillOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProductBillOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional()
}).strict();

export const UserProductBillWhereUniqueInputSchema: z.ZodType<Prisma.UserProductBillWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserProductBillWhereInputSchema),z.lazy(() => UserProductBillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductBillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductBillWhereInputSchema),z.lazy(() => UserProductBillWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict());

export const UserProductBillOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProductBillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserProductBillCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserProductBillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserProductBillMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserProductBillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProductBillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserProductBillScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProductBillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductBillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductBillScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProductBillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserProductActionWhereInputSchema: z.ZodType<Prisma.UserProductActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProductActionWhereInputSchema),z.lazy(() => UserProductActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductActionWhereInputSchema),z.lazy(() => UserProductActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actionType: z.union([ z.lazy(() => EnumUserProductActionTypeFilterSchema),z.lazy(() => UserProductActionTypeSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict();

export const UserProductActionOrderByWithRelationInputSchema: z.ZodType<Prisma.UserProductActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional()
}).strict();

export const UserProductActionWhereUniqueInputSchema: z.ZodType<Prisma.UserProductActionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserProductActionWhereInputSchema),z.lazy(() => UserProductActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductActionWhereInputSchema),z.lazy(() => UserProductActionWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actionType: z.union([ z.lazy(() => EnumUserProductActionTypeFilterSchema),z.lazy(() => UserProductActionTypeSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict());

export const UserProductActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserProductActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserProductActionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserProductActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserProductActionMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserProductActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserProductActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserProductActionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProductActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductActionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserProductActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  actionType: z.union([ z.lazy(() => EnumUserProductActionTypeWithAggregatesFilterSchema),z.lazy(() => UserProductActionTypeSchema) ]).optional(),
}).strict();

export const UserTaskWhereInputSchema: z.ZodType<Prisma.UserTaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTaskWhereInputSchema),z.lazy(() => UserTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTaskWhereInputSchema),z.lazy(() => UserTaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumUserTaskActionTypeFilterSchema),z.lazy(() => UserTaskActionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumUserTaskStatusFilterSchema),z.lazy(() => UserTaskStatusSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict();

export const UserTaskOrderByWithRelationInputSchema: z.ZodType<Prisma.UserTaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  task: z.lazy(() => TaskOrderByWithRelationInputSchema).optional()
}).strict();

export const UserTaskWhereUniqueInputSchema: z.ZodType<Prisma.UserTaskWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserTaskWhereInputSchema),z.lazy(() => UserTaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTaskWhereInputSchema),z.lazy(() => UserTaskWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumUserTaskActionTypeFilterSchema),z.lazy(() => UserTaskActionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumUserTaskStatusFilterSchema),z.lazy(() => UserTaskStatusSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  task: z.union([ z.lazy(() => TaskRelationFilterSchema),z.lazy(() => TaskWhereInputSchema) ]).optional(),
}).strict());

export const UserTaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserTaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserTaskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserTaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserTaskMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserTaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserTaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTaskScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumUserTaskActionTypeWithAggregatesFilterSchema),z.lazy(() => UserTaskActionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumUserTaskStatusWithAggregatesFilterSchema),z.lazy(() => UserTaskStatusSchema) ]).optional(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ddl: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  userTasks: z.lazy(() => UserTaskListRelationFilterSchema).optional()
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  ddl: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  ddl: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  userTasks: z.lazy(() => UserTaskListRelationFilterSchema).optional()
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  ddl: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeWithAggregatesFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  ddl: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUpdateInputSchema: z.ZodType<Prisma.RoomUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutRoomNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoomNestedInputSchema).optional(),
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

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutProductsInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutProductInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutProductsInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutProductsNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutProductNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutProductsNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
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

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
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

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
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

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
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
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserActionCreateInputSchema: z.ZodType<Prisma.UserActionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  type: z.lazy(() => UserActionTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutActionsInputSchema)
}).strict();

export const UserActionUncheckedCreateInputSchema: z.ZodType<Prisma.UserActionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  type: z.lazy(() => UserActionTypeSchema)
}).strict();

export const UserActionUpdateInputSchema: z.ZodType<Prisma.UserActionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutActionsNestedInputSchema).optional()
}).strict();

export const UserActionUncheckedUpdateInputSchema: z.ZodType<Prisma.UserActionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserActionCreateManyInputSchema: z.ZodType<Prisma.UserActionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  type: z.lazy(() => UserActionTypeSchema)
}).strict();

export const UserActionUpdateManyMutationInputSchema: z.ZodType<Prisma.UserActionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserActionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillCreateInputSchema: z.ZodType<Prisma.UserProductBillCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProductBillsInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutUserProductBillsInputSchema)
}).strict();

export const UserProductBillUncheckedCreateInputSchema: z.ZodType<Prisma.UserProductBillUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string()
}).strict();

export const UserProductBillUpdateInputSchema: z.ZodType<Prisma.UserProductBillUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProductBillsNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutUserProductBillsNestedInputSchema).optional()
}).strict();

export const UserProductBillUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillCreateManyInputSchema: z.ZodType<Prisma.UserProductBillCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string()
}).strict();

export const UserProductBillUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProductBillUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductActionCreateInputSchema: z.ZodType<Prisma.UserProductActionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  actionType: z.lazy(() => UserProductActionTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProductActionsInputSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutUserProductActionsInputSchema)
}).strict();

export const UserProductActionUncheckedCreateInputSchema: z.ZodType<Prisma.UserProductActionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string(),
  actionType: z.lazy(() => UserProductActionTypeSchema)
}).strict();

export const UserProductActionUpdateInputSchema: z.ZodType<Prisma.UserProductActionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProductActionsNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutUserProductActionsNestedInputSchema).optional()
}).strict();

export const UserProductActionUncheckedUpdateInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductActionCreateManyInputSchema: z.ZodType<Prisma.UserProductActionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string(),
  actionType: z.lazy(() => UserProductActionTypeSchema)
}).strict();

export const UserProductActionUpdateManyMutationInputSchema: z.ZodType<Prisma.UserProductActionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskCreateInputSchema: z.ZodType<Prisma.UserTaskCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutUserTasksInputSchema),
  task: z.lazy(() => TaskCreateNestedOneWithoutUserTasksInputSchema)
}).strict();

export const UserTaskUncheckedCreateInputSchema: z.ZodType<Prisma.UserTaskUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  taskId: z.string(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema)
}).strict();

export const UserTaskUpdateInputSchema: z.ZodType<Prisma.UserTaskUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserTasksNestedInputSchema).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutUserTasksNestedInputSchema).optional()
}).strict();

export const UserTaskUncheckedUpdateInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskCreateManyInputSchema: z.ZodType<Prisma.UserTaskCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  taskId: z.string(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema)
}).strict();

export const UserTaskUpdateManyMutationInputSchema: z.ZodType<Prisma.UserTaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
  users: z.lazy(() => UserCreateNestedManyWithoutTasksInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTasksInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutTasksNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTasksNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
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

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
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

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
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

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserProductBillListRelationFilterSchema: z.ZodType<Prisma.UserProductBillListRelationFilter> = z.object({
  every: z.lazy(() => UserProductBillWhereInputSchema).optional(),
  some: z.lazy(() => UserProductBillWhereInputSchema).optional(),
  none: z.lazy(() => UserProductBillWhereInputSchema).optional()
}).strict();

export const UserProductActionListRelationFilterSchema: z.ZodType<Prisma.UserProductActionListRelationFilter> = z.object({
  every: z.lazy(() => UserProductActionWhereInputSchema).optional(),
  some: z.lazy(() => UserProductActionWhereInputSchema).optional(),
  none: z.lazy(() => UserProductActionWhereInputSchema).optional()
}).strict();

export const UserProductBillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserProductBillOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProductActionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserProductActionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
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

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
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

export const RoomListRelationFilterSchema: z.ZodType<Prisma.RoomListRelationFilter> = z.object({
  every: z.lazy(() => RoomWhereInputSchema).optional(),
  some: z.lazy(() => RoomWhereInputSchema).optional(),
  none: z.lazy(() => RoomWhereInputSchema).optional()
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

export const UserActionListRelationFilterSchema: z.ZodType<Prisma.UserActionListRelationFilter> = z.object({
  every: z.lazy(() => UserActionWhereInputSchema).optional(),
  some: z.lazy(() => UserActionWhereInputSchema).optional(),
  none: z.lazy(() => UserActionWhereInputSchema).optional()
}).strict();

export const HonorListRelationFilterSchema: z.ZodType<Prisma.HonorListRelationFilter> = z.object({
  every: z.lazy(() => HonorWhereInputSchema).optional(),
  some: z.lazy(() => HonorWhereInputSchema).optional(),
  none: z.lazy(() => HonorWhereInputSchema).optional()
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const UserTaskListRelationFilterSchema: z.ZodType<Prisma.UserTaskListRelationFilter> = z.object({
  every: z.lazy(() => UserTaskWhereInputSchema).optional(),
  some: z.lazy(() => UserTaskWhereInputSchema).optional(),
  none: z.lazy(() => UserTaskWhereInputSchema).optional()
}).strict();

export const RoomOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoomOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserActionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserActionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HonorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HonorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserTaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  validated: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneVerified: z.lazy(() => SortOrderSchema).optional(),
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
  name: z.lazy(() => SortOrderSchema).optional(),
  validated: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneVerified: z.lazy(() => SortOrderSchema).optional(),
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
  name: z.lazy(() => SortOrderSchema).optional(),
  validated: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneVerified: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumUserActionTypeFilterSchema: z.ZodType<Prisma.EnumUserActionTypeFilter> = z.object({
  equals: z.lazy(() => UserActionTypeSchema).optional(),
  in: z.lazy(() => UserActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => NestedEnumUserActionTypeFilterSchema) ]).optional(),
}).strict();

export const UserActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserActionTypeSchema).optional(),
  in: z.lazy(() => UserActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => NestedEnumUserActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserActionTypeFilterSchema).optional()
}).strict();

export const ProductRelationFilterSchema: z.ZodType<Prisma.ProductRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const UserProductBillCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProductBillCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProductBillMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProductBillMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProductBillMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProductBillMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserProductActionTypeFilterSchema: z.ZodType<Prisma.EnumUserProductActionTypeFilter> = z.object({
  equals: z.lazy(() => UserProductActionTypeSchema).optional(),
  in: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => NestedEnumUserProductActionTypeFilterSchema) ]).optional(),
}).strict();

export const UserProductActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserProductActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProductActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserProductActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserProductActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserProductActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  actionType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserProductActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserProductActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserProductActionTypeSchema).optional(),
  in: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => NestedEnumUserProductActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserProductActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserProductActionTypeFilterSchema).optional()
}).strict();

export const EnumUserTaskActionTypeFilterSchema: z.ZodType<Prisma.EnumUserTaskActionTypeFilter> = z.object({
  equals: z.lazy(() => UserTaskActionTypeSchema).optional(),
  in: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => NestedEnumUserTaskActionTypeFilterSchema) ]).optional(),
}).strict();

export const EnumUserTaskStatusFilterSchema: z.ZodType<Prisma.EnumUserTaskStatusFilter> = z.object({
  equals: z.lazy(() => UserTaskStatusSchema).optional(),
  in: z.lazy(() => UserTaskStatusSchema).array().optional(),
  notIn: z.lazy(() => UserTaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => NestedEnumUserTaskStatusFilterSchema) ]).optional(),
}).strict();

export const TaskRelationFilterSchema: z.ZodType<Prisma.TaskRelationFilter> = z.object({
  is: z.lazy(() => TaskWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const UserTaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserTaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserTaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserTaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumUserTaskActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserTaskActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTaskActionTypeSchema).optional(),
  in: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => NestedEnumUserTaskActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTaskActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTaskActionTypeFilterSchema).optional()
}).strict();

export const EnumUserTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTaskStatusSchema).optional(),
  in: z.lazy(() => UserTaskStatusSchema).array().optional(),
  notIn: z.lazy(() => UserTaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => NestedEnumUserTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTaskStatusFilterSchema).optional()
}).strict();

export const EnumTaskTypeFilterSchema: z.ZodType<Prisma.EnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  ddl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  ddl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  ddl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
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

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
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

export const UserCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutRoomInputSchema),z.lazy(() => MessageCreateWithoutRoomInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => MessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => MessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
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

export const UserUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserCreateWithoutRoomInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
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

export const ProductCreateimagesInputSchema: z.ZodType<Prisma.ProductCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedManyWithoutProductsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserCreateWithoutProductsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema),z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutProductInputSchema),z.lazy(() => UserProductBillCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutProductInputSchema),z.lazy(() => UserProductActionCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutProductsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutProductsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserCreateWithoutProductsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema),z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutProductInputSchema),z.lazy(() => UserProductBillCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutProductInputSchema),z.lazy(() => UserProductActionCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateimagesInputSchema: z.ZodType<Prisma.ProductUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const UserUpdateManyWithoutProductsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserCreateWithoutProductsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema),z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutProductsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutProductsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutProductsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutProductsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutProductsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutProductsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.UserProductBillUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutProductInputSchema),z.lazy(() => UserProductBillCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductBillUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => UserProductBillUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductBillScalarWhereInputSchema),z.lazy(() => UserProductBillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.UserProductActionUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutProductInputSchema),z.lazy(() => UserProductActionCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductActionUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => UserProductActionUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductActionScalarWhereInputSchema),z.lazy(() => UserProductActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutProductsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserCreateWithoutProductsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema),z.lazy(() => UserCreateOrConnectWithoutProductsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutProductsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutProductsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutProductsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutProductsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutProductsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutProductsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutProductInputSchema),z.lazy(() => UserProductBillCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductBillUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => UserProductBillUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductBillScalarWhereInputSchema),z.lazy(() => UserProductBillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutProductInputSchema),z.lazy(() => UserProductActionCreateWithoutProductInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductActionUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => UserProductActionUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductActionScalarWhereInputSchema),z.lazy(() => UserProductActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoomCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
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

export const UserActionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserActionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserActionCreateWithoutUserInputSchema),z.lazy(() => UserActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HonorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HonorCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUsersInputSchema),z.lazy(() => ProductCreateWithoutUsersInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutUserInputSchema),z.lazy(() => UserProductActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutUserInputSchema),z.lazy(() => UserProductBillCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUsersInputSchema),z.lazy(() => TaskCreateWithoutUsersInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTaskCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserTaskCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutUserInputSchema),z.lazy(() => UserTaskCreateWithoutUserInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoomUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoomCreateWithoutUsersInputSchema),z.lazy(() => RoomCreateWithoutUsersInputSchema).array(),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoomUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoomCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoomWhereUniqueInputSchema),z.lazy(() => RoomWhereUniqueInputSchema).array() ]).optional(),
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

export const UserActionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserActionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserActionCreateWithoutUserInputSchema),z.lazy(() => UserActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSenderInputSchema),z.lazy(() => MessageCreateWithoutSenderInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HonorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUsersInputSchema),z.lazy(() => ProductCreateWithoutUsersInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutUserInputSchema),z.lazy(() => UserProductActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutUserInputSchema),z.lazy(() => UserProductBillCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUsersInputSchema),z.lazy(() => TaskCreateWithoutUsersInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTaskUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutUserInputSchema),z.lazy(() => UserTaskCreateWithoutUserInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnumUserStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserStatusSchema).optional()
}).strict();

export const EnumUserTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTypeSchema).optional()
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

export const UserActionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserActionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserActionCreateWithoutUserInputSchema),z.lazy(() => UserActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserActionScalarWhereInputSchema),z.lazy(() => UserActionScalarWhereInputSchema).array() ]).optional(),
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

export const ProductUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUsersInputSchema),z.lazy(() => ProductCreateWithoutUsersInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProductActionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutUserInputSchema),z.lazy(() => UserProductActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProductActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductActionScalarWhereInputSchema),z.lazy(() => UserProductActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProductBillUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutUserInputSchema),z.lazy(() => UserProductBillCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductBillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProductBillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductBillScalarWhereInputSchema),z.lazy(() => UserProductBillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUsersInputSchema),z.lazy(() => TaskCreateWithoutUsersInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTaskUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserTaskUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutUserInputSchema),z.lazy(() => UserTaskCreateWithoutUserInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTaskUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserTaskUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTaskScalarWhereInputSchema),z.lazy(() => UserTaskScalarWhereInputSchema).array() ]).optional(),
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

export const UserActionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserActionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserActionCreateWithoutUserInputSchema),z.lazy(() => UserActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserActionWhereUniqueInputSchema),z.lazy(() => UserActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserActionScalarWhereInputSchema),z.lazy(() => UserActionScalarWhereInputSchema).array() ]).optional(),
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

export const ProductUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUsersInputSchema),z.lazy(() => ProductCreateWithoutUsersInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema),z.lazy(() => ProductCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutUserInputSchema),z.lazy(() => UserProductActionCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductActionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductActionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductActionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductActionWhereUniqueInputSchema),z.lazy(() => UserProductActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductActionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductActionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProductActionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductActionScalarWhereInputSchema),z.lazy(() => UserProductActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutUserInputSchema),z.lazy(() => UserProductBillCreateWithoutUserInputSchema).array(),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserProductBillCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductBillUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserProductBillCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserProductBillWhereUniqueInputSchema),z.lazy(() => UserProductBillWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserProductBillUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserProductBillUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserProductBillUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserProductBillScalarWhereInputSchema),z.lazy(() => UserProductBillScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUsersInputSchema),z.lazy(() => TaskCreateWithoutUsersInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema),z.lazy(() => TaskCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutUserInputSchema),z.lazy(() => UserTaskCreateWithoutUserInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTaskUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserTaskUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTaskScalarWhereInputSchema),z.lazy(() => UserTaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutActionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutActionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumUserActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserActionTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutActionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutActionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutActionsInputSchema),z.lazy(() => UserUpdateWithoutActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserProductBillsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProductBillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProductCreateNestedOneWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutUserProductBillsInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutUserProductBillsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUserProductBillsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserProductBillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProductBillsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserProductBillsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUserProductBillsInputSchema),z.lazy(() => UserUpdateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProductBillsInputSchema) ]).optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutUserProductBillsNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutUserProductBillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutUserProductBillsInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutUserProductBillsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutUserProductBillsInputSchema),z.lazy(() => ProductUpdateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUserProductBillsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserProductActionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProductActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProductCreateNestedOneWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutUserProductActionsInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutUserProductActionsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const EnumUserProductActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserProductActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserProductActionTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUserProductActionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserProductActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserProductActionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserProductActionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUserProductActionsInputSchema),z.lazy(() => UserUpdateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProductActionsInputSchema) ]).optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutUserProductActionsNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutUserProductActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutUserProductActionsInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutUserProductActionsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutUserProductActionsInputSchema),z.lazy(() => ProductUpdateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUserProductActionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUserTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const TaskCreateNestedOneWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskCreateNestedOneWithoutUserTasksInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutUserTasksInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional()
}).strict();

export const EnumUserTaskActionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserTaskActionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTaskActionTypeSchema).optional()
}).strict();

export const EnumUserTaskStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserTaskStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTaskStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUserTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUserTasksInputSchema),z.lazy(() => UserUpdateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTasksInputSchema) ]).optional(),
}).strict();

export const TaskUpdateOneRequiredWithoutUserTasksNestedInputSchema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutUserTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutUserTasksInputSchema).optional(),
  upsert: z.lazy(() => TaskUpsertWithoutUserTasksInputSchema).optional(),
  connect: z.lazy(() => TaskWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TaskUpdateToOneWithWhereWithoutUserTasksInputSchema),z.lazy(() => TaskUpdateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserTasksInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserCreateWithoutTasksInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema),z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTaskCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutTaskInputSchema),z.lazy(() => UserTaskCreateWithoutTaskInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserCreateWithoutTasksInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema),z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTaskUncheckedCreateNestedManyWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUncheckedCreateNestedManyWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutTaskInputSchema),z.lazy(() => UserTaskCreateWithoutTaskInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyTaskInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumTaskTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskTypeSchema).optional()
}).strict();

export const UserUpdateManyWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserCreateWithoutTasksInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema),z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTasksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTaskUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.UserTaskUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutTaskInputSchema),z.lazy(() => UserTaskCreateWithoutTaskInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTaskUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => UserTaskUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTaskScalarWhereInputSchema),z.lazy(() => UserTaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserCreateWithoutTasksInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema),z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutTasksInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutTasksInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutTasksInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTaskUncheckedUpdateManyWithoutTaskNestedInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateManyWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTaskCreateWithoutTaskInputSchema),z.lazy(() => UserTaskCreateWithoutTaskInputSchema).array(),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema),z.lazy(() => UserTaskCreateOrConnectWithoutTaskInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => UserTaskUpsertWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTaskCreateManyTaskInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTaskWhereUniqueInputSchema),z.lazy(() => UserTaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutTaskInputSchema),z.lazy(() => UserTaskUpdateWithWhereUniqueWithoutTaskInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTaskUpdateManyWithWhereWithoutTaskInputSchema),z.lazy(() => UserTaskUpdateManyWithWhereWithoutTaskInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTaskScalarWhereInputSchema),z.lazy(() => UserTaskScalarWhereInputSchema).array() ]).optional(),
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

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
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

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
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

export const NestedEnumUserActionTypeFilterSchema: z.ZodType<Prisma.NestedEnumUserActionTypeFilter> = z.object({
  equals: z.lazy(() => UserActionTypeSchema).optional(),
  in: z.lazy(() => UserActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => NestedEnumUserActionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserActionTypeSchema).optional(),
  in: z.lazy(() => UserActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => NestedEnumUserActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserActionTypeFilterSchema).optional()
}).strict();

export const NestedEnumUserProductActionTypeFilterSchema: z.ZodType<Prisma.NestedEnumUserProductActionTypeFilter> = z.object({
  equals: z.lazy(() => UserProductActionTypeSchema).optional(),
  in: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => NestedEnumUserProductActionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserProductActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserProductActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserProductActionTypeSchema).optional(),
  in: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserProductActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => NestedEnumUserProductActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserProductActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserProductActionTypeFilterSchema).optional()
}).strict();

export const NestedEnumUserTaskActionTypeFilterSchema: z.ZodType<Prisma.NestedEnumUserTaskActionTypeFilter> = z.object({
  equals: z.lazy(() => UserTaskActionTypeSchema).optional(),
  in: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => NestedEnumUserTaskActionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserTaskStatusFilterSchema: z.ZodType<Prisma.NestedEnumUserTaskStatusFilter> = z.object({
  equals: z.lazy(() => UserTaskStatusSchema).optional(),
  in: z.lazy(() => UserTaskStatusSchema).array().optional(),
  notIn: z.lazy(() => UserTaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => NestedEnumUserTaskStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumUserTaskActionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserTaskActionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTaskActionTypeSchema).optional(),
  in: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  notIn: z.lazy(() => UserTaskActionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => NestedEnumUserTaskActionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTaskActionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTaskActionTypeFilterSchema).optional()
}).strict();

export const NestedEnumUserTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserTaskStatusSchema).optional(),
  in: z.lazy(() => UserTaskStatusSchema).array().optional(),
  notIn: z.lazy(() => UserTaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => NestedEnumUserTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserTaskStatusFilterSchema).optional()
}).strict();

export const NestedEnumTaskTypeFilterSchema: z.ZodType<Prisma.NestedEnumTaskTypeFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeFilterSchema) ]).optional(),
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

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutHonorsInputSchema: z.ZodType<Prisma.UserCreateWithoutHonorsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHonorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHonorsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHonorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHonorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMessagesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const RoomCreateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export const RoomUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
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
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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
  users: z.lazy(() => UserUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const RoomUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRoomInputSchema: z.ZodType<Prisma.UserCreateWithoutRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema) ]),
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

export const UserUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoomInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoomInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoomInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoomInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoomInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  validated: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
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

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutProductsInputSchema: z.ZodType<Prisma.UserCreateWithoutProductsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProductsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema) ]),
}).strict();

export const UserProductBillCreateWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProductBillsInputSchema)
}).strict();

export const UserProductBillUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const UserProductBillCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductBillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const UserProductBillCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.UserProductBillCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProductBillCreateManyProductInputSchema),z.lazy(() => UserProductBillCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserProductActionCreateWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  actionType: z.lazy(() => UserProductActionTypeSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutUserProductActionsInputSchema)
}).strict();

export const UserProductActionUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  actionType: z.lazy(() => UserProductActionTypeSchema)
}).strict();

export const UserProductActionCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const UserProductActionCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.UserProductActionCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProductActionCreateManyProductInputSchema),z.lazy(() => UserProductActionCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutProductsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProductsInputSchema),z.lazy(() => UserUncheckedCreateWithoutProductsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutProductsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutProductsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutProductsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProductsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutProductsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutProductsInputSchema) ]),
}).strict();

export const UserProductBillUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductBillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProductBillUpdateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const UserProductBillUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductBillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProductBillUpdateWithoutProductInputSchema),z.lazy(() => UserProductBillUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const UserProductBillUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductBillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProductBillUpdateManyMutationInputSchema),z.lazy(() => UserProductBillUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const UserProductBillScalarWhereInputSchema: z.ZodType<Prisma.UserProductBillScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProductBillScalarWhereInputSchema),z.lazy(() => UserProductBillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductBillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductBillScalarWhereInputSchema),z.lazy(() => UserProductBillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserProductActionUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProductActionUpdateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const UserProductActionUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProductActionUpdateWithoutProductInputSchema),z.lazy(() => UserProductActionUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const UserProductActionUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => UserProductActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProductActionUpdateManyMutationInputSchema),z.lazy(() => UserProductActionUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const UserProductActionScalarWhereInputSchema: z.ZodType<Prisma.UserProductActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserProductActionScalarWhereInputSchema),z.lazy(() => UserProductActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserProductActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserProductActionScalarWhereInputSchema),z.lazy(() => UserProductActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  actionType: z.union([ z.lazy(() => EnumUserProductActionTypeFilterSchema),z.lazy(() => UserProductActionTypeSchema) ]).optional(),
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

export const UserActionCreateWithoutUserInputSchema: z.ZodType<Prisma.UserActionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  type: z.lazy(() => UserActionTypeSchema)
}).strict();

export const UserActionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserActionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  type: z.lazy(() => UserActionTypeSchema)
}).strict();

export const UserActionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserActionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserActionCreateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserActionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserActionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserActionCreateManyUserInputSchema),z.lazy(() => UserActionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
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

export const ProductCreateWithoutUsersInputSchema: z.ZodType<Prisma.ProductCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutProductInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutProductInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserProductActionCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  actionType: z.lazy(() => UserProductActionTypeSchema),
  product: z.lazy(() => ProductCreateNestedOneWithoutUserProductActionsInputSchema)
}).strict();

export const UserProductActionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  actionType: z.lazy(() => UserProductActionTypeSchema)
}).strict();

export const UserProductActionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProductActionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserProductActionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProductActionCreateManyUserInputSchema),z.lazy(() => UserProductActionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserProductBillCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutUserProductBillsInputSchema)
}).strict();

export const UserProductBillUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string()
}).strict();

export const UserProductBillCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductBillWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProductBillCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserProductBillCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserProductBillCreateManyUserInputSchema),z.lazy(() => UserProductBillCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutUsersInputSchema: z.ZodType<Prisma.TaskCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutTaskInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserTaskCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTaskCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema),
  task: z.lazy(() => TaskCreateNestedOneWithoutUserTasksInputSchema)
}).strict();

export const UserTaskUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  taskId: z.string(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema)
}).strict();

export const UserTaskCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserTaskCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTaskCreateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserTaskCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserTaskCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserTaskCreateManyUserInputSchema),z.lazy(() => UserTaskCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
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

export const UserActionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserActionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserActionUpdateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserActionCreateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserActionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserActionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserActionUpdateWithoutUserInputSchema),z.lazy(() => UserActionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserActionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserActionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserActionUpdateManyMutationInputSchema),z.lazy(() => UserActionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserActionScalarWhereInputSchema: z.ZodType<Prisma.UserActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserActionScalarWhereInputSchema),z.lazy(() => UserActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserActionScalarWhereInputSchema),z.lazy(() => UserActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumUserActionTypeFilterSchema),z.lazy(() => UserActionTypeSchema) ]).optional(),
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

export const ProductUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutUsersInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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

export const UserProductActionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProductActionUpdateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserProductActionCreateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProductActionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProductActionUpdateWithoutUserInputSchema),z.lazy(() => UserProductActionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserProductActionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProductActionUpdateManyMutationInputSchema),z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserProductBillUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductBillWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserProductBillUpdateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserProductBillCreateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserProductBillUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductBillWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserProductBillUpdateWithoutUserInputSchema),z.lazy(() => UserProductBillUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserProductBillUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserProductBillScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserProductBillUpdateManyMutationInputSchema),z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutUsersInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  ddl: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserTaskUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTaskUpdateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserTaskCreateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserTaskUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTaskUpdateWithoutUserInputSchema),z.lazy(() => UserTaskUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserTaskUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserTaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTaskUpdateManyMutationInputSchema),z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserTaskScalarWhereInputSchema: z.ZodType<Prisma.UserTaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTaskScalarWhereInputSchema),z.lazy(() => UserTaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTaskScalarWhereInputSchema),z.lazy(() => UserTaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  action: z.union([ z.lazy(() => EnumUserTaskActionTypeFilterSchema),z.lazy(() => UserTaskActionTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumUserTaskStatusFilterSchema),z.lazy(() => UserTaskStatusSchema) ]).optional(),
}).strict();

export const UserCreateWithoutActionsInputSchema: z.ZodType<Prisma.UserCreateWithoutActionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutActionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutActionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutActionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutActionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutActionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutActionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutActionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutActionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutActionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutActionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutActionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutActionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserCreateWithoutUserProductBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserProductBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserProductBillsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductBillsInputSchema) ]),
}).strict();

export const ProductCreateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductCreateWithoutUserProductBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutProductsInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutUserProductBillsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutProductsInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutUserProductBillsInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductBillsInputSchema) ]),
}).strict();

export const UserUpsertWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserProductBillsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProductBillsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductBillsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserProductBillsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUserProductBillsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProductBillsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserProductBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserProductBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProductUpsertWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductUpsertWithoutUserProductBillsInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUserProductBillsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductBillsInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductUpdateToOneWithWhereWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutUserProductBillsInput> = z.object({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutUserProductBillsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUserProductBillsInputSchema) ]),
}).strict();

export const ProductUpdateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutUserProductBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutProductsNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutUserProductBillsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutUserProductBillsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutProductsNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserCreateWithoutUserProductActionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserProductActionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserProductActionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductActionsInputSchema) ]),
}).strict();

export const ProductCreateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductCreateWithoutUserProductActionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  users: z.lazy(() => UserCreateNestedManyWithoutProductsInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutUserProductActionsInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutProductsInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutUserProductActionsInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductActionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserProductActionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProductActionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserProductActionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserProductActionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUserProductActionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserProductActionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserProductActionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserProductActionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ProductUpsertWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductUpsertWithoutUserProductActionsInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUserProductActionsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutUserProductActionsInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductUpdateToOneWithWhereWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutUserProductActionsInput> = z.object({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutUserProductActionsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutUserProductActionsInputSchema) ]),
}).strict();

export const ProductUpdateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutUserProductActionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUpdateManyWithoutProductsNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutUserProductActionsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutUserProductActionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutProductsNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutUserTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutUserTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutUsersInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTasksInputSchema) ]),
}).strict();

export const TaskCreateWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskCreateWithoutUserTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
  users: z.lazy(() => UserCreateNestedManyWithoutTasksInputSchema).optional()
}).strict();

export const TaskUncheckedCreateWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutUserTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  ddl: z.coerce.date(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTasksInputSchema).optional()
}).strict();

export const TaskCreateOrConnectWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutUserTasksInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserTasksInputSchema) ]),
}).strict();

export const UserUpsertWithoutUserTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUserTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUserTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional()
}).strict();

export const TaskUpsertWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskUpsertWithoutUserTasksInput> = z.object({
  update: z.union([ z.lazy(() => TaskUpdateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserTasksInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedCreateWithoutUserTasksInputSchema) ]),
  where: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const TaskUpdateToOneWithWhereWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskUpdateToOneWithWhereWithoutUserTasksInput> = z.object({
  where: z.lazy(() => TaskWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TaskUpdateWithoutUserTasksInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutUserTasksInputSchema) ]),
}).strict();

export const TaskUpdateWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskUpdateWithoutUserTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutUserTasksInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutUserTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTasksNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillCreateNestedManyWithoutUserInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string().optional().nullable(),
  validated: z.boolean().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phone: z.string().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.lazy(() => UserStatusSchema).optional(),
  type: z.lazy(() => UserTypeSchema).optional(),
  currentBalance: z.number().int().optional(),
  historyBalance: z.number().int().optional(),
  room: z.lazy(() => RoomUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSenderInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const UserTaskCreateWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutUserTasksInputSchema)
}).strict();

export const UserTaskUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema)
}).strict();

export const UserTaskCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => UserTaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTaskCreateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const UserTaskCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.UserTaskCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserTaskCreateManyTaskInputSchema),z.lazy(() => UserTaskCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutTasksInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutTasksInputSchema) ]),
}).strict();

export const UserTaskUpsertWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUpsertWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => UserTaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTaskUpdateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => UserTaskCreateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export const UserTaskUpdateWithWhereUniqueWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUpdateWithWhereUniqueWithoutTaskInput> = z.object({
  where: z.lazy(() => UserTaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTaskUpdateWithoutTaskInputSchema),z.lazy(() => UserTaskUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export const UserTaskUpdateManyWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUpdateManyWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => UserTaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTaskUpdateManyMutationInputSchema),z.lazy(() => UserTaskUncheckedUpdateManyWithoutTaskInputSchema) ]),
}).strict();

export const MessageCreateManyRoomInputSchema: z.ZodType<Prisma.MessageCreateManyRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  senderId: z.string().optional().nullable()
}).strict();

export const UserUpdateWithoutRoomInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoomInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutRoomInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoomInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const UserProductBillCreateManyProductInputSchema: z.ZodType<Prisma.UserProductBillCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const UserProductActionCreateManyProductInputSchema: z.ZodType<Prisma.UserProductActionCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  actionType: z.lazy(() => UserProductActionTypeSchema)
}).strict();

export const UserUpdateWithoutProductsInputSchema: z.ZodType<Prisma.UserUpdateWithoutProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutProductsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillUpdateWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProductBillsNestedInputSchema).optional()
}).strict();

export const UserProductBillUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateManyWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductActionUpdateWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserProductActionsNestedInputSchema).optional()
}).strict();

export const UserProductActionUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductActionUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateManyWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const UserActionCreateManyUserInputSchema: z.ZodType<Prisma.UserActionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  type: z.lazy(() => UserActionTypeSchema)
}).strict();

export const MessageCreateManySenderInputSchema: z.ZodType<Prisma.MessageCreateManySenderInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  roomId: z.string()
}).strict();

export const HonorCreateManyUserInputSchema: z.ZodType<Prisma.HonorCreateManyUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserProductActionCreateManyUserInputSchema: z.ZodType<Prisma.UserProductActionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  actionType: z.lazy(() => UserProductActionTypeSchema)
}).strict();

export const UserProductBillCreateManyUserInputSchema: z.ZodType<Prisma.UserProductBillCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string()
}).strict();

export const UserTaskCreateManyUserInputSchema: z.ZodType<Prisma.UserTaskCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  taskId: z.string(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema)
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

export const UserActionUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserActionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserActionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserActionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserActionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserActionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserActionTypeSchema),z.lazy(() => EnumUserActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const ProductUpdateWithoutUsersInputSchema: z.ZodType<Prisma.ProductUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutProductNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  detail: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  total: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isOnsite: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isSelfOperating: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReturnable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isReservationRequired: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutProductNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
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

export const UserProductActionUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutUserProductActionsNestedInputSchema).optional()
}).strict();

export const UserProductActionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductActionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserProductActionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  actionType: z.union([ z.lazy(() => UserProductActionTypeSchema),z.lazy(() => EnumUserProductActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutUserProductBillsNestedInputSchema).optional()
}).strict();

export const UserProductBillUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserProductBillUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserProductBillUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TaskUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutTaskNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  ddl: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  task: z.lazy(() => TaskUpdateOneRequiredWithoutUserTasksNestedInputSchema).optional()
}).strict();

export const UserTaskUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskCreateManyTaskInputSchema: z.ZodType<Prisma.UserTaskCreateManyTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  action: z.lazy(() => UserTaskActionTypeSchema),
  status: z.lazy(() => UserTaskStatusSchema)
}).strict();

export const UserUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUpdateManyWithoutUserNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  room: z.lazy(() => RoomUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  actions: z.lazy(() => UserActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSenderNestedInputSchema).optional(),
  honors: z.lazy(() => HonorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  userProductActions: z.lazy(() => UserProductActionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userProductBills: z.lazy(() => UserProductBillUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userTasks: z.lazy(() => UserTaskUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  validated: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => EnumUserStatusFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => UserTypeSchema),z.lazy(() => EnumUserTypeFieldUpdateOperationsInputSchema) ]).optional(),
  currentBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  historyBalance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskUpdateWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserTasksNestedInputSchema).optional()
}).strict();

export const UserTaskUncheckedUpdateWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTaskUncheckedUpdateManyWithoutTaskInputSchema: z.ZodType<Prisma.UserTaskUncheckedUpdateManyWithoutTaskInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.lazy(() => UserTaskActionTypeSchema),z.lazy(() => EnumUserTaskActionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => UserTaskStatusSchema),z.lazy(() => EnumUserTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

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

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(),ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

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

export const UserActionFindFirstArgsSchema: z.ZodType<Prisma.UserActionFindFirstArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereInputSchema.optional(),
  orderBy: z.union([ UserActionOrderByWithRelationInputSchema.array(),UserActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserActionScalarFieldEnumSchema,UserActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserActionFindFirstOrThrowArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereInputSchema.optional(),
  orderBy: z.union([ UserActionOrderByWithRelationInputSchema.array(),UserActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserActionScalarFieldEnumSchema,UserActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserActionFindManyArgsSchema: z.ZodType<Prisma.UserActionFindManyArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereInputSchema.optional(),
  orderBy: z.union([ UserActionOrderByWithRelationInputSchema.array(),UserActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserActionScalarFieldEnumSchema,UserActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserActionAggregateArgsSchema: z.ZodType<Prisma.UserActionAggregateArgs> = z.object({
  where: UserActionWhereInputSchema.optional(),
  orderBy: z.union([ UserActionOrderByWithRelationInputSchema.array(),UserActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserActionGroupByArgsSchema: z.ZodType<Prisma.UserActionGroupByArgs> = z.object({
  where: UserActionWhereInputSchema.optional(),
  orderBy: z.union([ UserActionOrderByWithAggregationInputSchema.array(),UserActionOrderByWithAggregationInputSchema ]).optional(),
  by: UserActionScalarFieldEnumSchema.array(),
  having: UserActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserActionFindUniqueArgsSchema: z.ZodType<Prisma.UserActionFindUniqueArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereUniqueInputSchema,
}).strict() ;

export const UserActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserActionFindUniqueOrThrowArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereUniqueInputSchema,
}).strict() ;

export const UserProductBillFindFirstArgsSchema: z.ZodType<Prisma.UserProductBillFindFirstArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereInputSchema.optional(),
  orderBy: z.union([ UserProductBillOrderByWithRelationInputSchema.array(),UserProductBillOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductBillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProductBillScalarFieldEnumSchema,UserProductBillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProductBillFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProductBillFindFirstOrThrowArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereInputSchema.optional(),
  orderBy: z.union([ UserProductBillOrderByWithRelationInputSchema.array(),UserProductBillOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductBillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProductBillScalarFieldEnumSchema,UserProductBillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProductBillFindManyArgsSchema: z.ZodType<Prisma.UserProductBillFindManyArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereInputSchema.optional(),
  orderBy: z.union([ UserProductBillOrderByWithRelationInputSchema.array(),UserProductBillOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductBillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProductBillScalarFieldEnumSchema,UserProductBillScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProductBillAggregateArgsSchema: z.ZodType<Prisma.UserProductBillAggregateArgs> = z.object({
  where: UserProductBillWhereInputSchema.optional(),
  orderBy: z.union([ UserProductBillOrderByWithRelationInputSchema.array(),UserProductBillOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductBillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProductBillGroupByArgsSchema: z.ZodType<Prisma.UserProductBillGroupByArgs> = z.object({
  where: UserProductBillWhereInputSchema.optional(),
  orderBy: z.union([ UserProductBillOrderByWithAggregationInputSchema.array(),UserProductBillOrderByWithAggregationInputSchema ]).optional(),
  by: UserProductBillScalarFieldEnumSchema.array(),
  having: UserProductBillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProductBillFindUniqueArgsSchema: z.ZodType<Prisma.UserProductBillFindUniqueArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereUniqueInputSchema,
}).strict() ;

export const UserProductBillFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserProductBillFindUniqueOrThrowArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereUniqueInputSchema,
}).strict() ;

export const UserProductActionFindFirstArgsSchema: z.ZodType<Prisma.UserProductActionFindFirstArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereInputSchema.optional(),
  orderBy: z.union([ UserProductActionOrderByWithRelationInputSchema.array(),UserProductActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProductActionScalarFieldEnumSchema,UserProductActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProductActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserProductActionFindFirstOrThrowArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereInputSchema.optional(),
  orderBy: z.union([ UserProductActionOrderByWithRelationInputSchema.array(),UserProductActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProductActionScalarFieldEnumSchema,UserProductActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProductActionFindManyArgsSchema: z.ZodType<Prisma.UserProductActionFindManyArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereInputSchema.optional(),
  orderBy: z.union([ UserProductActionOrderByWithRelationInputSchema.array(),UserProductActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserProductActionScalarFieldEnumSchema,UserProductActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserProductActionAggregateArgsSchema: z.ZodType<Prisma.UserProductActionAggregateArgs> = z.object({
  where: UserProductActionWhereInputSchema.optional(),
  orderBy: z.union([ UserProductActionOrderByWithRelationInputSchema.array(),UserProductActionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserProductActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProductActionGroupByArgsSchema: z.ZodType<Prisma.UserProductActionGroupByArgs> = z.object({
  where: UserProductActionWhereInputSchema.optional(),
  orderBy: z.union([ UserProductActionOrderByWithAggregationInputSchema.array(),UserProductActionOrderByWithAggregationInputSchema ]).optional(),
  by: UserProductActionScalarFieldEnumSchema.array(),
  having: UserProductActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserProductActionFindUniqueArgsSchema: z.ZodType<Prisma.UserProductActionFindUniqueArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereUniqueInputSchema,
}).strict() ;

export const UserProductActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserProductActionFindUniqueOrThrowArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereUniqueInputSchema,
}).strict() ;

export const UserTaskFindFirstArgsSchema: z.ZodType<Prisma.UserTaskFindFirstArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereInputSchema.optional(),
  orderBy: z.union([ UserTaskOrderByWithRelationInputSchema.array(),UserTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserTaskScalarFieldEnumSchema,UserTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserTaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserTaskFindFirstOrThrowArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereInputSchema.optional(),
  orderBy: z.union([ UserTaskOrderByWithRelationInputSchema.array(),UserTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserTaskScalarFieldEnumSchema,UserTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserTaskFindManyArgsSchema: z.ZodType<Prisma.UserTaskFindManyArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereInputSchema.optional(),
  orderBy: z.union([ UserTaskOrderByWithRelationInputSchema.array(),UserTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserTaskScalarFieldEnumSchema,UserTaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserTaskAggregateArgsSchema: z.ZodType<Prisma.UserTaskAggregateArgs> = z.object({
  where: UserTaskWhereInputSchema.optional(),
  orderBy: z.union([ UserTaskOrderByWithRelationInputSchema.array(),UserTaskOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserTaskGroupByArgsSchema: z.ZodType<Prisma.UserTaskGroupByArgs> = z.object({
  where: UserTaskWhereInputSchema.optional(),
  orderBy: z.union([ UserTaskOrderByWithAggregationInputSchema.array(),UserTaskOrderByWithAggregationInputSchema ]).optional(),
  by: UserTaskScalarFieldEnumSchema.array(),
  having: UserTaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserTaskFindUniqueArgsSchema: z.ZodType<Prisma.UserTaskFindUniqueArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereUniqueInputSchema,
}).strict() ;

export const UserTaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserTaskFindUniqueOrThrowArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
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

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
}).strict() ;

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
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

export const UserActionCreateArgsSchema: z.ZodType<Prisma.UserActionCreateArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  data: z.union([ UserActionCreateInputSchema,UserActionUncheckedCreateInputSchema ]),
}).strict() ;

export const UserActionUpsertArgsSchema: z.ZodType<Prisma.UserActionUpsertArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereUniqueInputSchema,
  create: z.union([ UserActionCreateInputSchema,UserActionUncheckedCreateInputSchema ]),
  update: z.union([ UserActionUpdateInputSchema,UserActionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserActionCreateManyArgsSchema: z.ZodType<Prisma.UserActionCreateManyArgs> = z.object({
  data: z.union([ UserActionCreateManyInputSchema,UserActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserActionDeleteArgsSchema: z.ZodType<Prisma.UserActionDeleteArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  where: UserActionWhereUniqueInputSchema,
}).strict() ;

export const UserActionUpdateArgsSchema: z.ZodType<Prisma.UserActionUpdateArgs> = z.object({
  select: UserActionSelectSchema.optional(),
  include: UserActionIncludeSchema.optional(),
  data: z.union([ UserActionUpdateInputSchema,UserActionUncheckedUpdateInputSchema ]),
  where: UserActionWhereUniqueInputSchema,
}).strict() ;

export const UserActionUpdateManyArgsSchema: z.ZodType<Prisma.UserActionUpdateManyArgs> = z.object({
  data: z.union([ UserActionUpdateManyMutationInputSchema,UserActionUncheckedUpdateManyInputSchema ]),
  where: UserActionWhereInputSchema.optional(),
}).strict() ;

export const UserActionDeleteManyArgsSchema: z.ZodType<Prisma.UserActionDeleteManyArgs> = z.object({
  where: UserActionWhereInputSchema.optional(),
}).strict() ;

export const UserProductBillCreateArgsSchema: z.ZodType<Prisma.UserProductBillCreateArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  data: z.union([ UserProductBillCreateInputSchema,UserProductBillUncheckedCreateInputSchema ]),
}).strict() ;

export const UserProductBillUpsertArgsSchema: z.ZodType<Prisma.UserProductBillUpsertArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereUniqueInputSchema,
  create: z.union([ UserProductBillCreateInputSchema,UserProductBillUncheckedCreateInputSchema ]),
  update: z.union([ UserProductBillUpdateInputSchema,UserProductBillUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserProductBillCreateManyArgsSchema: z.ZodType<Prisma.UserProductBillCreateManyArgs> = z.object({
  data: z.union([ UserProductBillCreateManyInputSchema,UserProductBillCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserProductBillDeleteArgsSchema: z.ZodType<Prisma.UserProductBillDeleteArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  where: UserProductBillWhereUniqueInputSchema,
}).strict() ;

export const UserProductBillUpdateArgsSchema: z.ZodType<Prisma.UserProductBillUpdateArgs> = z.object({
  select: UserProductBillSelectSchema.optional(),
  include: UserProductBillIncludeSchema.optional(),
  data: z.union([ UserProductBillUpdateInputSchema,UserProductBillUncheckedUpdateInputSchema ]),
  where: UserProductBillWhereUniqueInputSchema,
}).strict() ;

export const UserProductBillUpdateManyArgsSchema: z.ZodType<Prisma.UserProductBillUpdateManyArgs> = z.object({
  data: z.union([ UserProductBillUpdateManyMutationInputSchema,UserProductBillUncheckedUpdateManyInputSchema ]),
  where: UserProductBillWhereInputSchema.optional(),
}).strict() ;

export const UserProductBillDeleteManyArgsSchema: z.ZodType<Prisma.UserProductBillDeleteManyArgs> = z.object({
  where: UserProductBillWhereInputSchema.optional(),
}).strict() ;

export const UserProductActionCreateArgsSchema: z.ZodType<Prisma.UserProductActionCreateArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  data: z.union([ UserProductActionCreateInputSchema,UserProductActionUncheckedCreateInputSchema ]),
}).strict() ;

export const UserProductActionUpsertArgsSchema: z.ZodType<Prisma.UserProductActionUpsertArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereUniqueInputSchema,
  create: z.union([ UserProductActionCreateInputSchema,UserProductActionUncheckedCreateInputSchema ]),
  update: z.union([ UserProductActionUpdateInputSchema,UserProductActionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserProductActionCreateManyArgsSchema: z.ZodType<Prisma.UserProductActionCreateManyArgs> = z.object({
  data: z.union([ UserProductActionCreateManyInputSchema,UserProductActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserProductActionDeleteArgsSchema: z.ZodType<Prisma.UserProductActionDeleteArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  where: UserProductActionWhereUniqueInputSchema,
}).strict() ;

export const UserProductActionUpdateArgsSchema: z.ZodType<Prisma.UserProductActionUpdateArgs> = z.object({
  select: UserProductActionSelectSchema.optional(),
  include: UserProductActionIncludeSchema.optional(),
  data: z.union([ UserProductActionUpdateInputSchema,UserProductActionUncheckedUpdateInputSchema ]),
  where: UserProductActionWhereUniqueInputSchema,
}).strict() ;

export const UserProductActionUpdateManyArgsSchema: z.ZodType<Prisma.UserProductActionUpdateManyArgs> = z.object({
  data: z.union([ UserProductActionUpdateManyMutationInputSchema,UserProductActionUncheckedUpdateManyInputSchema ]),
  where: UserProductActionWhereInputSchema.optional(),
}).strict() ;

export const UserProductActionDeleteManyArgsSchema: z.ZodType<Prisma.UserProductActionDeleteManyArgs> = z.object({
  where: UserProductActionWhereInputSchema.optional(),
}).strict() ;

export const UserTaskCreateArgsSchema: z.ZodType<Prisma.UserTaskCreateArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  data: z.union([ UserTaskCreateInputSchema,UserTaskUncheckedCreateInputSchema ]),
}).strict() ;

export const UserTaskUpsertArgsSchema: z.ZodType<Prisma.UserTaskUpsertArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereUniqueInputSchema,
  create: z.union([ UserTaskCreateInputSchema,UserTaskUncheckedCreateInputSchema ]),
  update: z.union([ UserTaskUpdateInputSchema,UserTaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserTaskCreateManyArgsSchema: z.ZodType<Prisma.UserTaskCreateManyArgs> = z.object({
  data: z.union([ UserTaskCreateManyInputSchema,UserTaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserTaskDeleteArgsSchema: z.ZodType<Prisma.UserTaskDeleteArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  where: UserTaskWhereUniqueInputSchema,
}).strict() ;

export const UserTaskUpdateArgsSchema: z.ZodType<Prisma.UserTaskUpdateArgs> = z.object({
  select: UserTaskSelectSchema.optional(),
  include: UserTaskIncludeSchema.optional(),
  data: z.union([ UserTaskUpdateInputSchema,UserTaskUncheckedUpdateInputSchema ]),
  where: UserTaskWhereUniqueInputSchema,
}).strict() ;

export const UserTaskUpdateManyArgsSchema: z.ZodType<Prisma.UserTaskUpdateManyArgs> = z.object({
  data: z.union([ UserTaskUpdateManyMutationInputSchema,UserTaskUncheckedUpdateManyInputSchema ]),
  where: UserTaskWhereInputSchema.optional(),
}).strict() ;

export const UserTaskDeleteManyArgsSchema: z.ZodType<Prisma.UserTaskDeleteManyArgs> = z.object({
  where: UserTaskWhereInputSchema.optional(),
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
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