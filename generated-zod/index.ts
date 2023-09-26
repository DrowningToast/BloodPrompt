import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const Medical_AccountsScalarFieldEnumSchema = z.enum(['id','blood_type','account_status','is_activated','created_at','updated_at']);

export const DonatorsScalarFieldEnumSchema = z.enum(['id','medical_account_id','image_src','first_name','last_name','phone_number','gender','dob','address','email','password','reward_point','created_at','updated_at']);

export const Reward_TransactionsScalarFieldEnumSchema = z.enum(['id','donator_id','points','created_at','updated_at']);

export const Redemption_HistoryScalarFieldEnumSchema = z.enum(['id','status','used_points','redeem_amount','created_at','updated_at','donator_id','reward_id']);

export const RewardsScalarFieldEnumSchema = z.enum(['id','name','description','required_points','image_src','is_available','amount_left','created_at','updated_at','deleted_at','place_id']);

export const PlacesScalarFieldEnumSchema = z.enum(['id','name','description','image_src','icon_src','phone_number','email','website_url','address','opening_day','opening_time','closing_time','is_available','created_at','updated_at','deleted_at']);

export const Place_Review_HistoryScalarFieldEnumSchema = z.enum(['id','rating','created_at','place_id']);

export const AnnouncementsScalarFieldEnumSchema = z.enum(['id','blood_type','post_type','title','content','image_src','created_at','updated_at','deleted_at','place_id']);

export const Special_EventsScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at','deleted_at','place_id']);

export const Reservation_SlotsScalarFieldEnumSchema = z.enum(['id','reserve_date','reserve_time','created_at','updated_at','cancelled_at','place_id']);

export const Medical_StaffScalarFieldEnumSchema = z.enum(['id','first_name','last_name','email','password','created_at','updated_at','place_id']);

export const SessionScalarFieldEnumSchema = z.enum(['id','session_token','expires','created_at','updated_at','moderator_id','donator_id','medical_staff_id']);

export const ReservationsScalarFieldEnumSchema = z.enum(['id','status','created_at','cancelled_at','updated_at','reservation_slot_id','donator_id']);

export const Pre_Feedback_AnswersScalarFieldEnumSchema = z.enum(['id','reservation_id','question_id','choice_id']);

export const Survey_ChoicesScalarFieldEnumSchema = z.enum(['id','order','label','survey_question_id']);

export const Survey_QuestionsScalarFieldEnumSchema = z.enum(['id','order','type','title','description','is_required']);

export const Donation_HistoryScalarFieldEnumSchema = z.enum(['id','rewarded_points','blood_quality_status','blood_type','status','created_at','updated_at','deleted_at','reservation_id','post_donation_db_id']);

export const Post_Donation_FeedbacksScalarFieldEnumSchema = z.enum(['id','created_at']);

export const Post_Feedback_AnswersScalarFieldEnumSchema = z.enum(['id','feedback_id','question_id','choice_id']);

export const ModeratorsScalarFieldEnumSchema = z.enum(['id','first_name','last_name','phone_number','email','password','created_at','updated_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const BloodTypeSchema = z.enum(['A_POSITIVE','B_POSITIVE','O_POSITIVE','AB_POSITIVE','A_NEGATIVE','B_NEGATIVE','O_NEGATIVE','AB_NEGATIVE']);

export type BloodTypeType = `${z.infer<typeof BloodTypeSchema>}`

export const AccountStatusSchema = z.enum(['VERIFIED','UNVERIFIED']);

export type AccountStatusType = `${z.infer<typeof AccountStatusSchema>}`

export const GenderSchema = z.enum(['MALE','FEMALE']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const RedemptionStatusSchema = z.enum(['REDEEMED','RECEIVED','CANCELLED']);

export type RedemptionStatusType = `${z.infer<typeof RedemptionStatusSchema>}`

export const PostTypeSchema = z.enum(['NORMAL','EMERGENCY']);

export type PostTypeType = `${z.infer<typeof PostTypeSchema>}`

export const ReservationStatusSchema = z.enum(['BOOKED','COMPLETED','CANCELLED']);

export type ReservationStatusType = `${z.infer<typeof ReservationStatusSchema>}`

export const SurveyQuestionTypeSchema = z.enum(['PRE_SURVEY','POST_SURVEY']);

export type SurveyQuestionTypeType = `${z.infer<typeof SurveyQuestionTypeSchema>}`

export const DonationStatusSchema = z.enum(['WAIT_BLOOD_QUALITY','SUCCESS','FAILED']);

export type DonationStatusType = `${z.infer<typeof DonationStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// MEDICAL ACCOUNTS SCHEMA
/////////////////////////////////////////

export const Medical_AccountsSchema = z.object({
  blood_type: BloodTypeSchema,
  account_status: AccountStatusSchema,
  id: z.string().cuid(),
  is_activated: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
})

export type Medical_Accounts = z.infer<typeof Medical_AccountsSchema>

/////////////////////////////////////////
// DONATORS SCHEMA
/////////////////////////////////////////

export const DonatorsSchema = z.object({
  gender: GenderSchema,
  id: z.string().cuid(),
  medical_account_id: z.string(),
  image_src: z.string().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().nullable(),
  password: z.string(),
  reward_point: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
})

export type Donators = z.infer<typeof DonatorsSchema>

/////////////////////////////////////////
// REWARD TRANSACTIONS SCHEMA
/////////////////////////////////////////

export const Reward_TransactionsSchema = z.object({
  id: z.string().cuid(),
  donator_id: z.string(),
  points: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
})

export type Reward_Transactions = z.infer<typeof Reward_TransactionsSchema>

/////////////////////////////////////////
// REDEMPTION HISTORY SCHEMA
/////////////////////////////////////////

export const Redemption_HistorySchema = z.object({
  status: RedemptionStatusSchema,
  id: z.string().cuid(),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  donator_id: z.string(),
  reward_id: z.string(),
})

export type Redemption_History = z.infer<typeof Redemption_HistorySchema>

/////////////////////////////////////////
// REWARDS SCHEMA
/////////////////////////////////////////

export const RewardsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().nullable(),
  is_available: z.boolean().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  place_id: z.string(),
})

export type Rewards = z.infer<typeof RewardsSchema>

/////////////////////////////////////////
// PLACES SCHEMA
/////////////////////////////////////////

export const PlacesSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  image_src: z.string().nullable(),
  icon_src: z.string().nullable(),
  phone_number: z.string(),
  email: z.string().nullable(),
  website_url: z.string().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
})

export type Places = z.infer<typeof PlacesSchema>

/////////////////////////////////////////
// PLACE REVIEW HISTORY SCHEMA
/////////////////////////////////////////

export const Place_Review_HistorySchema = z.object({
  id: z.string().cuid(),
  rating: z.number().int().nullable(),
  created_at: z.coerce.date(),
  place_id: z.string(),
})

export type Place_Review_History = z.infer<typeof Place_Review_HistorySchema>

/////////////////////////////////////////
// ANNOUNCEMENTS SCHEMA
/////////////////////////////////////////

export const AnnouncementsSchema = z.object({
  blood_type: BloodTypeSchema.nullable(),
  post_type: PostTypeSchema,
  id: z.string().cuid(),
  title: z.string(),
  content: z.string(),
  image_src: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  place_id: z.string(),
})

export type Announcements = z.infer<typeof AnnouncementsSchema>

/////////////////////////////////////////
// SPECIAL EVENTS SCHEMA
/////////////////////////////////////////

export const Special_EventsSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  place_id: z.string(),
})

export type Special_Events = z.infer<typeof Special_EventsSchema>

/////////////////////////////////////////
// RESERVATION SLOTS SCHEMA
/////////////////////////////////////////

export const Reservation_SlotsSchema = z.object({
  id: z.string().cuid(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  cancelled_at: z.coerce.date().nullable(),
  place_id: z.string(),
})

export type Reservation_Slots = z.infer<typeof Reservation_SlotsSchema>

/////////////////////////////////////////
// MEDICAL STAFF SCHEMA
/////////////////////////////////////////

export const Medical_StaffSchema = z.object({
  id: z.string().cuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  place_id: z.string(),
})

export type Medical_Staff = z.infer<typeof Medical_StaffSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  session_token: z.string().cuid(),
  expires: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  moderator_id: z.string().nullable(),
  donator_id: z.string().nullable(),
  medical_staff_id: z.string().nullable(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// RESERVATIONS SCHEMA
/////////////////////////////////////////

export const ReservationsSchema = z.object({
  status: ReservationStatusSchema,
  id: z.string().cuid(),
  created_at: z.coerce.date(),
  cancelled_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  reservation_slot_id: z.string(),
  donator_id: z.string(),
})

export type Reservations = z.infer<typeof ReservationsSchema>

/////////////////////////////////////////
// PRE FEEDBACK ANSWERS SCHEMA
/////////////////////////////////////////

export const Pre_Feedback_AnswersSchema = z.object({
  id: z.string().cuid(),
  reservation_id: z.string(),
  question_id: z.string(),
  choice_id: z.string(),
})

export type Pre_Feedback_Answers = z.infer<typeof Pre_Feedback_AnswersSchema>

/////////////////////////////////////////
// SURVEY CHOICES SCHEMA
/////////////////////////////////////////

export const Survey_ChoicesSchema = z.object({
  id: z.string().cuid(),
  order: z.number().int(),
  label: z.string(),
  survey_question_id: z.string(),
})

export type Survey_Choices = z.infer<typeof Survey_ChoicesSchema>

/////////////////////////////////////////
// SURVEY QUESTIONS SCHEMA
/////////////////////////////////////////

export const Survey_QuestionsSchema = z.object({
  type: SurveyQuestionTypeSchema,
  id: z.string().cuid(),
  order: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  is_required: z.boolean(),
})

export type Survey_Questions = z.infer<typeof Survey_QuestionsSchema>

/////////////////////////////////////////
// DONATION HISTORY SCHEMA
/////////////////////////////////////////

export const Donation_HistorySchema = z.object({
  blood_type: BloodTypeSchema,
  status: DonationStatusSchema,
  id: z.string().cuid(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  reservation_id: z.string(),
  post_donation_db_id: z.string(),
})

export type Donation_History = z.infer<typeof Donation_HistorySchema>

/////////////////////////////////////////
// POST DONATION FEEDBACKS SCHEMA
/////////////////////////////////////////

export const Post_Donation_FeedbacksSchema = z.object({
  id: z.string().cuid(),
  created_at: z.coerce.date(),
})

export type Post_Donation_Feedbacks = z.infer<typeof Post_Donation_FeedbacksSchema>

/////////////////////////////////////////
// POST FEEDBACK ANSWERS SCHEMA
/////////////////////////////////////////

export const Post_Feedback_AnswersSchema = z.object({
  id: z.string().cuid(),
  feedback_id: z.string(),
  question_id: z.string(),
  choice_id: z.string(),
})

export type Post_Feedback_Answers = z.infer<typeof Post_Feedback_AnswersSchema>

/////////////////////////////////////////
// MODERATORS SCHEMA
/////////////////////////////////////////

export const ModeratorsSchema = z.object({
  id: z.string().cuid(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Moderators = z.infer<typeof ModeratorsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MEDICAL ACCOUNTS
//------------------------------------------------------

export const Medical_AccountsIncludeSchema: z.ZodType<Prisma.Medical_AccountsInclude> = z.object({
  Donators: z.union([z.boolean(),z.lazy(() => DonatorsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Medical_AccountsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Medical_AccountsArgsSchema: z.ZodType<Prisma.Medical_AccountsDefaultArgs> = z.object({
  select: z.lazy(() => Medical_AccountsSelectSchema).optional(),
  include: z.lazy(() => Medical_AccountsIncludeSchema).optional(),
}).strict();

export const Medical_AccountsCountOutputTypeArgsSchema: z.ZodType<Prisma.Medical_AccountsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Medical_AccountsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Medical_AccountsCountOutputTypeSelectSchema: z.ZodType<Prisma.Medical_AccountsCountOutputTypeSelect> = z.object({
  Donators: z.boolean().optional(),
}).strict();

export const Medical_AccountsSelectSchema: z.ZodType<Prisma.Medical_AccountsSelect> = z.object({
  id: z.boolean().optional(),
  blood_type: z.boolean().optional(),
  account_status: z.boolean().optional(),
  is_activated: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  Donators: z.union([z.boolean(),z.lazy(() => DonatorsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Medical_AccountsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DONATORS
//------------------------------------------------------

export const DonatorsIncludeSchema: z.ZodType<Prisma.DonatorsInclude> = z.object({
  Medical_Account: z.union([z.boolean(),z.lazy(() => Medical_AccountsArgsSchema)]).optional(),
  Reward_Transactions: z.union([z.boolean(),z.lazy(() => Reward_TransactionsFindManyArgsSchema)]).optional(),
  Redemption_History: z.union([z.boolean(),z.lazy(() => Redemption_HistoryFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Reservations: z.union([z.boolean(),z.lazy(() => ReservationsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DonatorsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DonatorsArgsSchema: z.ZodType<Prisma.DonatorsDefaultArgs> = z.object({
  select: z.lazy(() => DonatorsSelectSchema).optional(),
  include: z.lazy(() => DonatorsIncludeSchema).optional(),
}).strict();

export const DonatorsCountOutputTypeArgsSchema: z.ZodType<Prisma.DonatorsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DonatorsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DonatorsCountOutputTypeSelectSchema: z.ZodType<Prisma.DonatorsCountOutputTypeSelect> = z.object({
  Reward_Transactions: z.boolean().optional(),
  Redemption_History: z.boolean().optional(),
  Session: z.boolean().optional(),
  Reservations: z.boolean().optional(),
}).strict();

export const DonatorsSelectSchema: z.ZodType<Prisma.DonatorsSelect> = z.object({
  id: z.boolean().optional(),
  medical_account_id: z.boolean().optional(),
  image_src: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  gender: z.boolean().optional(),
  dob: z.boolean().optional(),
  address: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  reward_point: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  Medical_Account: z.union([z.boolean(),z.lazy(() => Medical_AccountsArgsSchema)]).optional(),
  Reward_Transactions: z.union([z.boolean(),z.lazy(() => Reward_TransactionsFindManyArgsSchema)]).optional(),
  Redemption_History: z.union([z.boolean(),z.lazy(() => Redemption_HistoryFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Reservations: z.union([z.boolean(),z.lazy(() => ReservationsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DonatorsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REWARD TRANSACTIONS
//------------------------------------------------------

export const Reward_TransactionsIncludeSchema: z.ZodType<Prisma.Reward_TransactionsInclude> = z.object({
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
}).strict()

export const Reward_TransactionsArgsSchema: z.ZodType<Prisma.Reward_TransactionsDefaultArgs> = z.object({
  select: z.lazy(() => Reward_TransactionsSelectSchema).optional(),
  include: z.lazy(() => Reward_TransactionsIncludeSchema).optional(),
}).strict();

export const Reward_TransactionsSelectSchema: z.ZodType<Prisma.Reward_TransactionsSelect> = z.object({
  id: z.boolean().optional(),
  donator_id: z.boolean().optional(),
  points: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
}).strict()

// REDEMPTION HISTORY
//------------------------------------------------------

export const Redemption_HistoryIncludeSchema: z.ZodType<Prisma.Redemption_HistoryInclude> = z.object({
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
  Reward: z.union([z.boolean(),z.lazy(() => RewardsArgsSchema)]).optional(),
}).strict()

export const Redemption_HistoryArgsSchema: z.ZodType<Prisma.Redemption_HistoryDefaultArgs> = z.object({
  select: z.lazy(() => Redemption_HistorySelectSchema).optional(),
  include: z.lazy(() => Redemption_HistoryIncludeSchema).optional(),
}).strict();

export const Redemption_HistorySelectSchema: z.ZodType<Prisma.Redemption_HistorySelect> = z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  used_points: z.boolean().optional(),
  redeem_amount: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  donator_id: z.boolean().optional(),
  reward_id: z.boolean().optional(),
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
  Reward: z.union([z.boolean(),z.lazy(() => RewardsArgsSchema)]).optional(),
}).strict()

// REWARDS
//------------------------------------------------------

export const RewardsIncludeSchema: z.ZodType<Prisma.RewardsInclude> = z.object({
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
  Redemption_History: z.union([z.boolean(),z.lazy(() => Redemption_HistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RewardsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RewardsArgsSchema: z.ZodType<Prisma.RewardsDefaultArgs> = z.object({
  select: z.lazy(() => RewardsSelectSchema).optional(),
  include: z.lazy(() => RewardsIncludeSchema).optional(),
}).strict();

export const RewardsCountOutputTypeArgsSchema: z.ZodType<Prisma.RewardsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RewardsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RewardsCountOutputTypeSelectSchema: z.ZodType<Prisma.RewardsCountOutputTypeSelect> = z.object({
  Redemption_History: z.boolean().optional(),
}).strict();

export const RewardsSelectSchema: z.ZodType<Prisma.RewardsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  required_points: z.boolean().optional(),
  image_src: z.boolean().optional(),
  is_available: z.boolean().optional(),
  amount_left: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  place_id: z.boolean().optional(),
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
  Redemption_History: z.union([z.boolean(),z.lazy(() => Redemption_HistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RewardsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLACES
//------------------------------------------------------

export const PlacesIncludeSchema: z.ZodType<Prisma.PlacesInclude> = z.object({
  Rewards: z.union([z.boolean(),z.lazy(() => RewardsFindManyArgsSchema)]).optional(),
  Announcements: z.union([z.boolean(),z.lazy(() => AnnouncementsFindManyArgsSchema)]).optional(),
  Special_Events: z.union([z.boolean(),z.lazy(() => Special_EventsFindManyArgsSchema)]).optional(),
  Medical_Staff: z.union([z.boolean(),z.lazy(() => Medical_StaffFindManyArgsSchema)]).optional(),
  Reservation_Slots: z.union([z.boolean(),z.lazy(() => Reservation_SlotsFindManyArgsSchema)]).optional(),
  Place_Review_History: z.union([z.boolean(),z.lazy(() => Place_Review_HistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlacesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PlacesArgsSchema: z.ZodType<Prisma.PlacesDefaultArgs> = z.object({
  select: z.lazy(() => PlacesSelectSchema).optional(),
  include: z.lazy(() => PlacesIncludeSchema).optional(),
}).strict();

export const PlacesCountOutputTypeArgsSchema: z.ZodType<Prisma.PlacesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PlacesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PlacesCountOutputTypeSelectSchema: z.ZodType<Prisma.PlacesCountOutputTypeSelect> = z.object({
  Rewards: z.boolean().optional(),
  Announcements: z.boolean().optional(),
  Special_Events: z.boolean().optional(),
  Medical_Staff: z.boolean().optional(),
  Reservation_Slots: z.boolean().optional(),
  Place_Review_History: z.boolean().optional(),
}).strict();

export const PlacesSelectSchema: z.ZodType<Prisma.PlacesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  image_src: z.boolean().optional(),
  icon_src: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  email: z.boolean().optional(),
  website_url: z.boolean().optional(),
  address: z.boolean().optional(),
  opening_day: z.boolean().optional(),
  opening_time: z.boolean().optional(),
  closing_time: z.boolean().optional(),
  is_available: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  Rewards: z.union([z.boolean(),z.lazy(() => RewardsFindManyArgsSchema)]).optional(),
  Announcements: z.union([z.boolean(),z.lazy(() => AnnouncementsFindManyArgsSchema)]).optional(),
  Special_Events: z.union([z.boolean(),z.lazy(() => Special_EventsFindManyArgsSchema)]).optional(),
  Medical_Staff: z.union([z.boolean(),z.lazy(() => Medical_StaffFindManyArgsSchema)]).optional(),
  Reservation_Slots: z.union([z.boolean(),z.lazy(() => Reservation_SlotsFindManyArgsSchema)]).optional(),
  Place_Review_History: z.union([z.boolean(),z.lazy(() => Place_Review_HistoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlacesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLACE REVIEW HISTORY
//------------------------------------------------------

export const Place_Review_HistoryIncludeSchema: z.ZodType<Prisma.Place_Review_HistoryInclude> = z.object({
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
}).strict()

export const Place_Review_HistoryArgsSchema: z.ZodType<Prisma.Place_Review_HistoryDefaultArgs> = z.object({
  select: z.lazy(() => Place_Review_HistorySelectSchema).optional(),
  include: z.lazy(() => Place_Review_HistoryIncludeSchema).optional(),
}).strict();

export const Place_Review_HistorySelectSchema: z.ZodType<Prisma.Place_Review_HistorySelect> = z.object({
  id: z.boolean().optional(),
  rating: z.boolean().optional(),
  created_at: z.boolean().optional(),
  place_id: z.boolean().optional(),
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
}).strict()

// ANNOUNCEMENTS
//------------------------------------------------------

export const AnnouncementsIncludeSchema: z.ZodType<Prisma.AnnouncementsInclude> = z.object({
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
}).strict()

export const AnnouncementsArgsSchema: z.ZodType<Prisma.AnnouncementsDefaultArgs> = z.object({
  select: z.lazy(() => AnnouncementsSelectSchema).optional(),
  include: z.lazy(() => AnnouncementsIncludeSchema).optional(),
}).strict();

export const AnnouncementsSelectSchema: z.ZodType<Prisma.AnnouncementsSelect> = z.object({
  id: z.boolean().optional(),
  blood_type: z.boolean().optional(),
  post_type: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  image_src: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  place_id: z.boolean().optional(),
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
}).strict()

// SPECIAL EVENTS
//------------------------------------------------------

export const Special_EventsIncludeSchema: z.ZodType<Prisma.Special_EventsInclude> = z.object({
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
}).strict()

export const Special_EventsArgsSchema: z.ZodType<Prisma.Special_EventsDefaultArgs> = z.object({
  select: z.lazy(() => Special_EventsSelectSchema).optional(),
  include: z.lazy(() => Special_EventsIncludeSchema).optional(),
}).strict();

export const Special_EventsSelectSchema: z.ZodType<Prisma.Special_EventsSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  place_id: z.boolean().optional(),
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
}).strict()

// RESERVATION SLOTS
//------------------------------------------------------

export const Reservation_SlotsIncludeSchema: z.ZodType<Prisma.Reservation_SlotsInclude> = z.object({
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
  Reservations: z.union([z.boolean(),z.lazy(() => ReservationsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Reservation_SlotsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Reservation_SlotsArgsSchema: z.ZodType<Prisma.Reservation_SlotsDefaultArgs> = z.object({
  select: z.lazy(() => Reservation_SlotsSelectSchema).optional(),
  include: z.lazy(() => Reservation_SlotsIncludeSchema).optional(),
}).strict();

export const Reservation_SlotsCountOutputTypeArgsSchema: z.ZodType<Prisma.Reservation_SlotsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Reservation_SlotsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Reservation_SlotsCountOutputTypeSelectSchema: z.ZodType<Prisma.Reservation_SlotsCountOutputTypeSelect> = z.object({
  Reservations: z.boolean().optional(),
}).strict();

export const Reservation_SlotsSelectSchema: z.ZodType<Prisma.Reservation_SlotsSelect> = z.object({
  id: z.boolean().optional(),
  reserve_date: z.boolean().optional(),
  reserve_time: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  cancelled_at: z.boolean().optional(),
  place_id: z.boolean().optional(),
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
  Reservations: z.union([z.boolean(),z.lazy(() => ReservationsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Reservation_SlotsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEDICAL STAFF
//------------------------------------------------------

export const Medical_StaffIncludeSchema: z.ZodType<Prisma.Medical_StaffInclude> = z.object({
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Medical_StaffCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Medical_StaffArgsSchema: z.ZodType<Prisma.Medical_StaffDefaultArgs> = z.object({
  select: z.lazy(() => Medical_StaffSelectSchema).optional(),
  include: z.lazy(() => Medical_StaffIncludeSchema).optional(),
}).strict();

export const Medical_StaffCountOutputTypeArgsSchema: z.ZodType<Prisma.Medical_StaffCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Medical_StaffCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Medical_StaffCountOutputTypeSelectSchema: z.ZodType<Prisma.Medical_StaffCountOutputTypeSelect> = z.object({
  Session: z.boolean().optional(),
}).strict();

export const Medical_StaffSelectSchema: z.ZodType<Prisma.Medical_StaffSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  place_id: z.boolean().optional(),
  Place: z.union([z.boolean(),z.lazy(() => PlacesArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Medical_StaffCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
  Medical_Staff: z.union([z.boolean(),z.lazy(() => Medical_StaffArgsSchema)]).optional(),
  Moderator: z.union([z.boolean(),z.lazy(() => ModeratorsArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  session_token: z.boolean().optional(),
  expires: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  moderator_id: z.boolean().optional(),
  donator_id: z.boolean().optional(),
  medical_staff_id: z.boolean().optional(),
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
  Medical_Staff: z.union([z.boolean(),z.lazy(() => Medical_StaffArgsSchema)]).optional(),
  Moderator: z.union([z.boolean(),z.lazy(() => ModeratorsArgsSchema)]).optional(),
}).strict()

// RESERVATIONS
//------------------------------------------------------

export const ReservationsIncludeSchema: z.ZodType<Prisma.ReservationsInclude> = z.object({
  Reservation_Slot: z.union([z.boolean(),z.lazy(() => Reservation_SlotsArgsSchema)]).optional(),
  Donation_History: z.union([z.boolean(),z.lazy(() => Donation_HistoryFindManyArgsSchema)]).optional(),
  Pre_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Pre_Feedback_AnswersFindManyArgsSchema)]).optional(),
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReservationsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ReservationsArgsSchema: z.ZodType<Prisma.ReservationsDefaultArgs> = z.object({
  select: z.lazy(() => ReservationsSelectSchema).optional(),
  include: z.lazy(() => ReservationsIncludeSchema).optional(),
}).strict();

export const ReservationsCountOutputTypeArgsSchema: z.ZodType<Prisma.ReservationsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ReservationsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReservationsCountOutputTypeSelectSchema: z.ZodType<Prisma.ReservationsCountOutputTypeSelect> = z.object({
  Donation_History: z.boolean().optional(),
  Pre_Feedback_Answers: z.boolean().optional(),
}).strict();

export const ReservationsSelectSchema: z.ZodType<Prisma.ReservationsSelect> = z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  created_at: z.boolean().optional(),
  cancelled_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  reservation_slot_id: z.boolean().optional(),
  donator_id: z.boolean().optional(),
  Reservation_Slot: z.union([z.boolean(),z.lazy(() => Reservation_SlotsArgsSchema)]).optional(),
  Donation_History: z.union([z.boolean(),z.lazy(() => Donation_HistoryFindManyArgsSchema)]).optional(),
  Pre_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Pre_Feedback_AnswersFindManyArgsSchema)]).optional(),
  Donator: z.union([z.boolean(),z.lazy(() => DonatorsArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReservationsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRE FEEDBACK ANSWERS
//------------------------------------------------------

export const Pre_Feedback_AnswersIncludeSchema: z.ZodType<Prisma.Pre_Feedback_AnswersInclude> = z.object({
  Survey_Question: z.union([z.boolean(),z.lazy(() => Survey_QuestionsArgsSchema)]).optional(),
  Survey_Choice: z.union([z.boolean(),z.lazy(() => Survey_ChoicesArgsSchema)]).optional(),
  Reservation: z.union([z.boolean(),z.lazy(() => ReservationsArgsSchema)]).optional(),
}).strict()

export const Pre_Feedback_AnswersArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersDefaultArgs> = z.object({
  select: z.lazy(() => Pre_Feedback_AnswersSelectSchema).optional(),
  include: z.lazy(() => Pre_Feedback_AnswersIncludeSchema).optional(),
}).strict();

export const Pre_Feedback_AnswersSelectSchema: z.ZodType<Prisma.Pre_Feedback_AnswersSelect> = z.object({
  id: z.boolean().optional(),
  reservation_id: z.boolean().optional(),
  question_id: z.boolean().optional(),
  choice_id: z.boolean().optional(),
  Survey_Question: z.union([z.boolean(),z.lazy(() => Survey_QuestionsArgsSchema)]).optional(),
  Survey_Choice: z.union([z.boolean(),z.lazy(() => Survey_ChoicesArgsSchema)]).optional(),
  Reservation: z.union([z.boolean(),z.lazy(() => ReservationsArgsSchema)]).optional(),
}).strict()

// SURVEY CHOICES
//------------------------------------------------------

export const Survey_ChoicesIncludeSchema: z.ZodType<Prisma.Survey_ChoicesInclude> = z.object({
  Survey_Question: z.union([z.boolean(),z.lazy(() => Survey_QuestionsArgsSchema)]).optional(),
  Pre_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Pre_Feedback_AnswersFindManyArgsSchema)]).optional(),
  Post_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Post_Feedback_AnswersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Survey_ChoicesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Survey_ChoicesArgsSchema: z.ZodType<Prisma.Survey_ChoicesDefaultArgs> = z.object({
  select: z.lazy(() => Survey_ChoicesSelectSchema).optional(),
  include: z.lazy(() => Survey_ChoicesIncludeSchema).optional(),
}).strict();

export const Survey_ChoicesCountOutputTypeArgsSchema: z.ZodType<Prisma.Survey_ChoicesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Survey_ChoicesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Survey_ChoicesCountOutputTypeSelectSchema: z.ZodType<Prisma.Survey_ChoicesCountOutputTypeSelect> = z.object({
  Pre_Feedback_Answers: z.boolean().optional(),
  Post_Feedback_Answers: z.boolean().optional(),
}).strict();

export const Survey_ChoicesSelectSchema: z.ZodType<Prisma.Survey_ChoicesSelect> = z.object({
  id: z.boolean().optional(),
  order: z.boolean().optional(),
  label: z.boolean().optional(),
  survey_question_id: z.boolean().optional(),
  Survey_Question: z.union([z.boolean(),z.lazy(() => Survey_QuestionsArgsSchema)]).optional(),
  Pre_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Pre_Feedback_AnswersFindManyArgsSchema)]).optional(),
  Post_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Post_Feedback_AnswersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Survey_ChoicesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SURVEY QUESTIONS
//------------------------------------------------------

export const Survey_QuestionsIncludeSchema: z.ZodType<Prisma.Survey_QuestionsInclude> = z.object({
  Survey_Choices: z.union([z.boolean(),z.lazy(() => Survey_ChoicesFindManyArgsSchema)]).optional(),
  Pre_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Pre_Feedback_AnswersFindManyArgsSchema)]).optional(),
  Post_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Post_Feedback_AnswersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Survey_QuestionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Survey_QuestionsArgsSchema: z.ZodType<Prisma.Survey_QuestionsDefaultArgs> = z.object({
  select: z.lazy(() => Survey_QuestionsSelectSchema).optional(),
  include: z.lazy(() => Survey_QuestionsIncludeSchema).optional(),
}).strict();

export const Survey_QuestionsCountOutputTypeArgsSchema: z.ZodType<Prisma.Survey_QuestionsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Survey_QuestionsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Survey_QuestionsCountOutputTypeSelectSchema: z.ZodType<Prisma.Survey_QuestionsCountOutputTypeSelect> = z.object({
  Survey_Choices: z.boolean().optional(),
  Pre_Feedback_Answers: z.boolean().optional(),
  Post_Feedback_Answers: z.boolean().optional(),
}).strict();

export const Survey_QuestionsSelectSchema: z.ZodType<Prisma.Survey_QuestionsSelect> = z.object({
  id: z.boolean().optional(),
  order: z.boolean().optional(),
  type: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  is_required: z.boolean().optional(),
  Survey_Choices: z.union([z.boolean(),z.lazy(() => Survey_ChoicesFindManyArgsSchema)]).optional(),
  Pre_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Pre_Feedback_AnswersFindManyArgsSchema)]).optional(),
  Post_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Post_Feedback_AnswersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Survey_QuestionsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DONATION HISTORY
//------------------------------------------------------

export const Donation_HistoryIncludeSchema: z.ZodType<Prisma.Donation_HistoryInclude> = z.object({
  Resevation: z.union([z.boolean(),z.lazy(() => ReservationsArgsSchema)]).optional(),
  Post_Donation_Feedback: z.union([z.boolean(),z.lazy(() => Post_Donation_FeedbacksArgsSchema)]).optional(),
}).strict()

export const Donation_HistoryArgsSchema: z.ZodType<Prisma.Donation_HistoryDefaultArgs> = z.object({
  select: z.lazy(() => Donation_HistorySelectSchema).optional(),
  include: z.lazy(() => Donation_HistoryIncludeSchema).optional(),
}).strict();

export const Donation_HistorySelectSchema: z.ZodType<Prisma.Donation_HistorySelect> = z.object({
  id: z.boolean().optional(),
  rewarded_points: z.boolean().optional(),
  blood_quality_status: z.boolean().optional(),
  blood_type: z.boolean().optional(),
  status: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  reservation_id: z.boolean().optional(),
  post_donation_db_id: z.boolean().optional(),
  Resevation: z.union([z.boolean(),z.lazy(() => ReservationsArgsSchema)]).optional(),
  Post_Donation_Feedback: z.union([z.boolean(),z.lazy(() => Post_Donation_FeedbacksArgsSchema)]).optional(),
}).strict()

// POST DONATION FEEDBACKS
//------------------------------------------------------

export const Post_Donation_FeedbacksIncludeSchema: z.ZodType<Prisma.Post_Donation_FeedbacksInclude> = z.object({
  Donation_History: z.union([z.boolean(),z.lazy(() => Donation_HistoryFindManyArgsSchema)]).optional(),
  Post_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Post_Feedback_AnswersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Post_Donation_FeedbacksCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const Post_Donation_FeedbacksArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksDefaultArgs> = z.object({
  select: z.lazy(() => Post_Donation_FeedbacksSelectSchema).optional(),
  include: z.lazy(() => Post_Donation_FeedbacksIncludeSchema).optional(),
}).strict();

export const Post_Donation_FeedbacksCountOutputTypeArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => Post_Donation_FeedbacksCountOutputTypeSelectSchema).nullish(),
}).strict();

export const Post_Donation_FeedbacksCountOutputTypeSelectSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCountOutputTypeSelect> = z.object({
  Donation_History: z.boolean().optional(),
  Post_Feedback_Answers: z.boolean().optional(),
}).strict();

export const Post_Donation_FeedbacksSelectSchema: z.ZodType<Prisma.Post_Donation_FeedbacksSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  Donation_History: z.union([z.boolean(),z.lazy(() => Donation_HistoryFindManyArgsSchema)]).optional(),
  Post_Feedback_Answers: z.union([z.boolean(),z.lazy(() => Post_Feedback_AnswersFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Post_Donation_FeedbacksCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST FEEDBACK ANSWERS
//------------------------------------------------------

export const Post_Feedback_AnswersIncludeSchema: z.ZodType<Prisma.Post_Feedback_AnswersInclude> = z.object({
  Survey_Question: z.union([z.boolean(),z.lazy(() => Survey_QuestionsArgsSchema)]).optional(),
  Survey_Choice: z.union([z.boolean(),z.lazy(() => Survey_ChoicesArgsSchema)]).optional(),
  Pre_Donation_Feedback: z.union([z.boolean(),z.lazy(() => Post_Donation_FeedbacksArgsSchema)]).optional(),
}).strict()

export const Post_Feedback_AnswersArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersDefaultArgs> = z.object({
  select: z.lazy(() => Post_Feedback_AnswersSelectSchema).optional(),
  include: z.lazy(() => Post_Feedback_AnswersIncludeSchema).optional(),
}).strict();

export const Post_Feedback_AnswersSelectSchema: z.ZodType<Prisma.Post_Feedback_AnswersSelect> = z.object({
  id: z.boolean().optional(),
  feedback_id: z.boolean().optional(),
  question_id: z.boolean().optional(),
  choice_id: z.boolean().optional(),
  Survey_Question: z.union([z.boolean(),z.lazy(() => Survey_QuestionsArgsSchema)]).optional(),
  Survey_Choice: z.union([z.boolean(),z.lazy(() => Survey_ChoicesArgsSchema)]).optional(),
  Pre_Donation_Feedback: z.union([z.boolean(),z.lazy(() => Post_Donation_FeedbacksArgsSchema)]).optional(),
}).strict()

// MODERATORS
//------------------------------------------------------

export const ModeratorsIncludeSchema: z.ZodType<Prisma.ModeratorsInclude> = z.object({
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ModeratorsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ModeratorsArgsSchema: z.ZodType<Prisma.ModeratorsDefaultArgs> = z.object({
  select: z.lazy(() => ModeratorsSelectSchema).optional(),
  include: z.lazy(() => ModeratorsIncludeSchema).optional(),
}).strict();

export const ModeratorsCountOutputTypeArgsSchema: z.ZodType<Prisma.ModeratorsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ModeratorsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ModeratorsCountOutputTypeSelectSchema: z.ZodType<Prisma.ModeratorsCountOutputTypeSelect> = z.object({
  Session: z.boolean().optional(),
}).strict();

export const ModeratorsSelectSchema: z.ZodType<Prisma.ModeratorsSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ModeratorsCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const Medical_AccountsWhereInputSchema: z.ZodType<Prisma.Medical_AccountsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Medical_AccountsWhereInputSchema),z.lazy(() => Medical_AccountsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_AccountsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_AccountsWhereInputSchema),z.lazy(() => Medical_AccountsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => EnumAccountStatusFilterSchema),z.lazy(() => AccountStatusSchema) ]).optional(),
  is_activated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Donators: z.lazy(() => DonatorsListRelationFilterSchema).optional()
}).strict();

export const Medical_AccountsOrderByWithRelationInputSchema: z.ZodType<Prisma.Medical_AccountsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  account_status: z.lazy(() => SortOrderSchema).optional(),
  is_activated: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Donators: z.lazy(() => DonatorsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Medical_AccountsWhereUniqueInputSchema: z.ZodType<Prisma.Medical_AccountsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Medical_AccountsWhereInputSchema),z.lazy(() => Medical_AccountsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_AccountsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_AccountsWhereInputSchema),z.lazy(() => Medical_AccountsWhereInputSchema).array() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => EnumAccountStatusFilterSchema),z.lazy(() => AccountStatusSchema) ]).optional(),
  is_activated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Donators: z.lazy(() => DonatorsListRelationFilterSchema).optional()
}).strict());

export const Medical_AccountsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Medical_AccountsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  account_status: z.lazy(() => SortOrderSchema).optional(),
  is_activated: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => Medical_AccountsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Medical_AccountsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Medical_AccountsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Medical_AccountsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Medical_AccountsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Medical_AccountsScalarWhereWithAggregatesInputSchema),z.lazy(() => Medical_AccountsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_AccountsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_AccountsScalarWhereWithAggregatesInputSchema),z.lazy(() => Medical_AccountsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeWithAggregatesFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => EnumAccountStatusWithAggregatesFilterSchema),z.lazy(() => AccountStatusSchema) ]).optional(),
  is_activated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const DonatorsWhereInputSchema: z.ZodType<Prisma.DonatorsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DonatorsWhereInputSchema),z.lazy(() => DonatorsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonatorsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonatorsWhereInputSchema),z.lazy(() => DonatorsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  medical_account_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  dob: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward_point: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Medical_Account: z.union([ z.lazy(() => Medical_AccountsRelationFilterSchema),z.lazy(() => Medical_AccountsWhereInputSchema) ]).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsListRelationFilterSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  Reservations: z.lazy(() => ReservationsListRelationFilterSchema).optional()
}).strict();

export const DonatorsOrderByWithRelationInputSchema: z.ZodType<Prisma.DonatorsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medical_account_id: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  dob: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reward_point: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Medical_Account: z.lazy(() => Medical_AccountsOrderByWithRelationInputSchema).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsOrderByRelationAggregateInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryOrderByRelationAggregateInputSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DonatorsWhereUniqueInputSchema: z.ZodType<Prisma.DonatorsWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    phone_number: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    phone_number: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    phone_number: z.string(),
    email: z.string(),
  }),
  z.object({
    phone_number: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => DonatorsWhereInputSchema),z.lazy(() => DonatorsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonatorsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonatorsWhereInputSchema),z.lazy(() => DonatorsWhereInputSchema).array() ]).optional(),
  medical_account_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  dob: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward_point: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Medical_Account: z.union([ z.lazy(() => Medical_AccountsRelationFilterSchema),z.lazy(() => Medical_AccountsWhereInputSchema) ]).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsListRelationFilterSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryListRelationFilterSchema).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  Reservations: z.lazy(() => ReservationsListRelationFilterSchema).optional()
}).strict());

export const DonatorsOrderByWithAggregationInputSchema: z.ZodType<Prisma.DonatorsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medical_account_id: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  dob: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reward_point: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => DonatorsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DonatorsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DonatorsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DonatorsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DonatorsSumOrderByAggregateInputSchema).optional()
}).strict();

export const DonatorsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DonatorsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DonatorsScalarWhereWithAggregatesInputSchema),z.lazy(() => DonatorsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonatorsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonatorsScalarWhereWithAggregatesInputSchema),z.lazy(() => DonatorsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  medical_account_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  dob: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reward_point: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const Reward_TransactionsWhereInputSchema: z.ZodType<Prisma.Reward_TransactionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Reward_TransactionsWhereInputSchema),z.lazy(() => Reward_TransactionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reward_TransactionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reward_TransactionsWhereInputSchema),z.lazy(() => Reward_TransactionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Donator: z.union([ z.lazy(() => DonatorsRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
}).strict();

export const Reward_TransactionsOrderByWithRelationInputSchema: z.ZodType<Prisma.Reward_TransactionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Donator: z.lazy(() => DonatorsOrderByWithRelationInputSchema).optional()
}).strict();

export const Reward_TransactionsWhereUniqueInputSchema: z.ZodType<Prisma.Reward_TransactionsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Reward_TransactionsWhereInputSchema),z.lazy(() => Reward_TransactionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reward_TransactionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reward_TransactionsWhereInputSchema),z.lazy(() => Reward_TransactionsWhereInputSchema).array() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Donator: z.union([ z.lazy(() => DonatorsRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
}).strict());

export const Reward_TransactionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Reward_TransactionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => Reward_TransactionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Reward_TransactionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Reward_TransactionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Reward_TransactionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Reward_TransactionsSumOrderByAggregateInputSchema).optional()
}).strict();

export const Reward_TransactionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Reward_TransactionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Reward_TransactionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Reward_TransactionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reward_TransactionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reward_TransactionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Reward_TransactionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const Redemption_HistoryWhereInputSchema: z.ZodType<Prisma.Redemption_HistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Redemption_HistoryWhereInputSchema),z.lazy(() => Redemption_HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Redemption_HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Redemption_HistoryWhereInputSchema),z.lazy(() => Redemption_HistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumRedemptionStatusFilterSchema),z.lazy(() => RedemptionStatusSchema) ]).optional(),
  used_points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  redeem_amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Donator: z.union([ z.lazy(() => DonatorsRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
  Reward: z.union([ z.lazy(() => RewardsRelationFilterSchema),z.lazy(() => RewardsWhereInputSchema) ]).optional(),
}).strict();

export const Redemption_HistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.Redemption_HistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  reward_id: z.lazy(() => SortOrderSchema).optional(),
  Donator: z.lazy(() => DonatorsOrderByWithRelationInputSchema).optional(),
  Reward: z.lazy(() => RewardsOrderByWithRelationInputSchema).optional()
}).strict();

export const Redemption_HistoryWhereUniqueInputSchema: z.ZodType<Prisma.Redemption_HistoryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Redemption_HistoryWhereInputSchema),z.lazy(() => Redemption_HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Redemption_HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Redemption_HistoryWhereInputSchema),z.lazy(() => Redemption_HistoryWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumRedemptionStatusFilterSchema),z.lazy(() => RedemptionStatusSchema) ]).optional(),
  used_points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  redeem_amount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Donator: z.union([ z.lazy(() => DonatorsRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
  Reward: z.union([ z.lazy(() => RewardsRelationFilterSchema),z.lazy(() => RewardsWhereInputSchema) ]).optional(),
}).strict());

export const Redemption_HistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.Redemption_HistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  reward_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Redemption_HistoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Redemption_HistoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Redemption_HistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Redemption_HistoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Redemption_HistorySumOrderByAggregateInputSchema).optional()
}).strict();

export const Redemption_HistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Redemption_HistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Redemption_HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Redemption_HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Redemption_HistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Redemption_HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Redemption_HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumRedemptionStatusWithAggregatesFilterSchema),z.lazy(() => RedemptionStatusSchema) ]).optional(),
  used_points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  redeem_amount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reward_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RewardsWhereInputSchema: z.ZodType<Prisma.RewardsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RewardsWhereInputSchema),z.lazy(() => RewardsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardsWhereInputSchema),z.lazy(() => RewardsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  required_points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_available: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  amount_left: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryListRelationFilterSchema).optional()
}).strict();

export const RewardsOrderByWithRelationInputSchema: z.ZodType<Prisma.RewardsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  required_points: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_available: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => PlacesOrderByWithRelationInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RewardsWhereUniqueInputSchema: z.ZodType<Prisma.RewardsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => RewardsWhereInputSchema),z.lazy(() => RewardsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardsWhereInputSchema),z.lazy(() => RewardsWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  required_points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_available: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  amount_left: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryListRelationFilterSchema).optional()
}).strict());

export const RewardsOrderByWithAggregationInputSchema: z.ZodType<Prisma.RewardsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  required_points: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_available: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RewardsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RewardsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RewardsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RewardsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RewardsSumOrderByAggregateInputSchema).optional()
}).strict();

export const RewardsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RewardsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RewardsScalarWhereWithAggregatesInputSchema),z.lazy(() => RewardsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardsScalarWhereWithAggregatesInputSchema),z.lazy(() => RewardsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  required_points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_available: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  amount_left: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PlacesWhereInputSchema: z.ZodType<Prisma.PlacesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlacesWhereInputSchema),z.lazy(() => PlacesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlacesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlacesWhereInputSchema),z.lazy(() => PlacesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icon_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opening_day: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opening_time: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  closing_time: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  is_available: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsListRelationFilterSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsListRelationFilterSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsListRelationFilterSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffListRelationFilterSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsListRelationFilterSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryListRelationFilterSchema).optional()
}).strict();

export const PlacesOrderByWithRelationInputSchema: z.ZodType<Prisma.PlacesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  icon_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  opening_day: z.lazy(() => SortOrderSchema).optional(),
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Rewards: z.lazy(() => RewardsOrderByRelationAggregateInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsOrderByRelationAggregateInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsOrderByRelationAggregateInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffOrderByRelationAggregateInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsOrderByRelationAggregateInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PlacesWhereUniqueInputSchema: z.ZodType<Prisma.PlacesWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PlacesWhereInputSchema),z.lazy(() => PlacesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlacesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlacesWhereInputSchema),z.lazy(() => PlacesWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icon_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  website_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opening_day: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  opening_time: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  closing_time: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  is_available: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsListRelationFilterSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsListRelationFilterSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsListRelationFilterSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffListRelationFilterSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsListRelationFilterSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryListRelationFilterSchema).optional()
}).strict());

export const PlacesOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlacesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  icon_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  website_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  opening_day: z.lazy(() => SortOrderSchema).optional(),
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PlacesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PlacesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlacesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlacesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PlacesSumOrderByAggregateInputSchema).optional()
}).strict();

export const PlacesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlacesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlacesScalarWhereWithAggregatesInputSchema),z.lazy(() => PlacesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlacesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlacesScalarWhereWithAggregatesInputSchema),z.lazy(() => PlacesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image_src: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  icon_src: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  website_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  opening_day: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  opening_time: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  closing_time: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  is_available: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const Place_Review_HistoryWhereInputSchema: z.ZodType<Prisma.Place_Review_HistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Place_Review_HistoryWhereInputSchema),z.lazy(() => Place_Review_HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Place_Review_HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Place_Review_HistoryWhereInputSchema),z.lazy(() => Place_Review_HistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
}).strict();

export const Place_Review_HistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.Place_Review_HistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => PlacesOrderByWithRelationInputSchema).optional()
}).strict();

export const Place_Review_HistoryWhereUniqueInputSchema: z.ZodType<Prisma.Place_Review_HistoryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Place_Review_HistoryWhereInputSchema),z.lazy(() => Place_Review_HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Place_Review_HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Place_Review_HistoryWhereInputSchema),z.lazy(() => Place_Review_HistoryWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
}).strict());

export const Place_Review_HistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.Place_Review_HistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Place_Review_HistoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Place_Review_HistoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Place_Review_HistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Place_Review_HistoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Place_Review_HistorySumOrderByAggregateInputSchema).optional()
}).strict();

export const Place_Review_HistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Place_Review_HistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Place_Review_HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Place_Review_HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Place_Review_HistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Place_Review_HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Place_Review_HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AnnouncementsWhereInputSchema: z.ZodType<Prisma.AnnouncementsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnnouncementsWhereInputSchema),z.lazy(() => AnnouncementsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementsWhereInputSchema),z.lazy(() => AnnouncementsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeNullableFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => EnumPostTypeFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
}).strict();

export const AnnouncementsOrderByWithRelationInputSchema: z.ZodType<Prisma.AnnouncementsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  post_type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => PlacesOrderByWithRelationInputSchema).optional()
}).strict();

export const AnnouncementsWhereUniqueInputSchema: z.ZodType<Prisma.AnnouncementsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => AnnouncementsWhereInputSchema),z.lazy(() => AnnouncementsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementsWhereInputSchema),z.lazy(() => AnnouncementsWhereInputSchema).array() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeNullableFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => EnumPostTypeFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
}).strict());

export const AnnouncementsOrderByWithAggregationInputSchema: z.ZodType<Prisma.AnnouncementsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  post_type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AnnouncementsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AnnouncementsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AnnouncementsMinOrderByAggregateInputSchema).optional()
}).strict();

export const AnnouncementsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AnnouncementsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AnnouncementsScalarWhereWithAggregatesInputSchema),z.lazy(() => AnnouncementsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementsScalarWhereWithAggregatesInputSchema),z.lazy(() => AnnouncementsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeNullableWithAggregatesFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => EnumPostTypeWithAggregatesFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Special_EventsWhereInputSchema: z.ZodType<Prisma.Special_EventsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Special_EventsWhereInputSchema),z.lazy(() => Special_EventsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Special_EventsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Special_EventsWhereInputSchema),z.lazy(() => Special_EventsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
}).strict();

export const Special_EventsOrderByWithRelationInputSchema: z.ZodType<Prisma.Special_EventsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => PlacesOrderByWithRelationInputSchema).optional()
}).strict();

export const Special_EventsWhereUniqueInputSchema: z.ZodType<Prisma.Special_EventsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Special_EventsWhereInputSchema),z.lazy(() => Special_EventsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Special_EventsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Special_EventsWhereInputSchema),z.lazy(() => Special_EventsWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
}).strict());

export const Special_EventsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Special_EventsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Special_EventsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Special_EventsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Special_EventsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Special_EventsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Special_EventsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Special_EventsScalarWhereWithAggregatesInputSchema),z.lazy(() => Special_EventsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Special_EventsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Special_EventsScalarWhereWithAggregatesInputSchema),z.lazy(() => Special_EventsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Reservation_SlotsWhereInputSchema: z.ZodType<Prisma.Reservation_SlotsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Reservation_SlotsWhereInputSchema),z.lazy(() => Reservation_SlotsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reservation_SlotsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reservation_SlotsWhereInputSchema),z.lazy(() => Reservation_SlotsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reserve_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reserve_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
  Reservations: z.lazy(() => ReservationsListRelationFilterSchema).optional()
}).strict();

export const Reservation_SlotsOrderByWithRelationInputSchema: z.ZodType<Prisma.Reservation_SlotsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reserve_date: z.lazy(() => SortOrderSchema).optional(),
  reserve_time: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cancelled_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => PlacesOrderByWithRelationInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Reservation_SlotsWhereUniqueInputSchema: z.ZodType<Prisma.Reservation_SlotsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Reservation_SlotsWhereInputSchema),z.lazy(() => Reservation_SlotsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reservation_SlotsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reservation_SlotsWhereInputSchema),z.lazy(() => Reservation_SlotsWhereInputSchema).array() ]).optional(),
  reserve_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reserve_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
  Reservations: z.lazy(() => ReservationsListRelationFilterSchema).optional()
}).strict());

export const Reservation_SlotsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Reservation_SlotsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reserve_date: z.lazy(() => SortOrderSchema).optional(),
  reserve_time: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cancelled_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Reservation_SlotsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Reservation_SlotsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Reservation_SlotsMinOrderByAggregateInputSchema).optional()
}).strict();

export const Reservation_SlotsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Reservation_SlotsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Reservation_SlotsScalarWhereWithAggregatesInputSchema),z.lazy(() => Reservation_SlotsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reservation_SlotsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reservation_SlotsScalarWhereWithAggregatesInputSchema),z.lazy(() => Reservation_SlotsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reserve_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  reserve_time: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Medical_StaffWhereInputSchema: z.ZodType<Prisma.Medical_StaffWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Medical_StaffWhereInputSchema),z.lazy(() => Medical_StaffWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_StaffWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_StaffWhereInputSchema),z.lazy(() => Medical_StaffWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const Medical_StaffOrderByWithRelationInputSchema: z.ZodType<Prisma.Medical_StaffOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  Place: z.lazy(() => PlacesOrderByWithRelationInputSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Medical_StaffWhereUniqueInputSchema: z.ZodType<Prisma.Medical_StaffWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => Medical_StaffWhereInputSchema),z.lazy(() => Medical_StaffWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_StaffWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_StaffWhereInputSchema),z.lazy(() => Medical_StaffWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Place: z.union([ z.lazy(() => PlacesRelationFilterSchema),z.lazy(() => PlacesWhereInputSchema) ]).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const Medical_StaffOrderByWithAggregationInputSchema: z.ZodType<Prisma.Medical_StaffOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Medical_StaffCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Medical_StaffMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Medical_StaffMinOrderByAggregateInputSchema).optional()
}).strict();

export const Medical_StaffScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Medical_StaffScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Medical_StaffScalarWhereWithAggregatesInputSchema),z.lazy(() => Medical_StaffScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_StaffScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_StaffScalarWhereWithAggregatesInputSchema),z.lazy(() => Medical_StaffScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  moderator_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  medical_staff_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Donator: z.union([ z.lazy(() => DonatorsNullableRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional().nullable(),
  Medical_Staff: z.union([ z.lazy(() => Medical_StaffNullableRelationFilterSchema),z.lazy(() => Medical_StaffWhereInputSchema) ]).optional().nullable(),
  Moderator: z.union([ z.lazy(() => ModeratorsNullableRelationFilterSchema),z.lazy(() => ModeratorsWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  moderator_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  donator_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  medical_staff_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Donator: z.lazy(() => DonatorsOrderByWithRelationInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffOrderByWithRelationInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    session_token: z.string().cuid()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    session_token: z.string().cuid(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  moderator_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  medical_staff_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Donator: z.union([ z.lazy(() => DonatorsNullableRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional().nullable(),
  Medical_Staff: z.union([ z.lazy(() => Medical_StaffNullableRelationFilterSchema),z.lazy(() => Medical_StaffWhereInputSchema) ]).optional().nullable(),
  Moderator: z.union([ z.lazy(() => ModeratorsNullableRelationFilterSchema),z.lazy(() => ModeratorsWhereInputSchema) ]).optional().nullable(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  moderator_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  donator_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  medical_staff_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  session_token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  moderator_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  medical_staff_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ReservationsWhereInputSchema: z.ZodType<Prisma.ReservationsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationsWhereInputSchema),z.lazy(() => ReservationsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationsWhereInputSchema),z.lazy(() => ReservationsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_slot_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Reservation_Slot: z.union([ z.lazy(() => Reservation_SlotsRelationFilterSchema),z.lazy(() => Reservation_SlotsWhereInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryListRelationFilterSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersListRelationFilterSchema).optional(),
  Donator: z.union([ z.lazy(() => DonatorsRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
}).strict();

export const ReservationsOrderByWithRelationInputSchema: z.ZodType<Prisma.ReservationsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reservation_slot_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsOrderByWithRelationInputSchema).optional(),
  Donation_History: z.lazy(() => Donation_HistoryOrderByRelationAggregateInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersOrderByRelationAggregateInputSchema).optional(),
  Donator: z.lazy(() => DonatorsOrderByWithRelationInputSchema).optional()
}).strict();

export const ReservationsWhereUniqueInputSchema: z.ZodType<Prisma.ReservationsWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    reservation_slot_id: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    reservation_slot_id: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  reservation_slot_id: z.string().optional(),
  AND: z.union([ z.lazy(() => ReservationsWhereInputSchema),z.lazy(() => ReservationsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationsWhereInputSchema),z.lazy(() => ReservationsWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Reservation_Slot: z.union([ z.lazy(() => Reservation_SlotsRelationFilterSchema),z.lazy(() => Reservation_SlotsWhereInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryListRelationFilterSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersListRelationFilterSchema).optional(),
  Donator: z.union([ z.lazy(() => DonatorsRelationFilterSchema),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
}).strict());

export const ReservationsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReservationsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reservation_slot_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReservationsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReservationsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReservationsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReservationsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReservationsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationsScalarWhereWithAggregatesInputSchema),z.lazy(() => ReservationsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationsScalarWhereWithAggregatesInputSchema),z.lazy(() => ReservationsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusWithAggregatesFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_slot_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersWhereInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reservation_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Survey_Question: z.union([ z.lazy(() => Survey_QuestionsRelationFilterSchema),z.lazy(() => Survey_QuestionsWhereInputSchema) ]).optional(),
  Survey_Choice: z.union([ z.lazy(() => Survey_ChoicesRelationFilterSchema),z.lazy(() => Survey_ChoicesWhereInputSchema) ]).optional(),
  Reservation: z.union([ z.lazy(() => ReservationsRelationFilterSchema),z.lazy(() => ReservationsWhereInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersOrderByWithRelationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsOrderByWithRelationInputSchema).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesOrderByWithRelationInputSchema).optional(),
  Reservation: z.lazy(() => ReservationsOrderByWithRelationInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersWhereUniqueInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  reservation_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Survey_Question: z.union([ z.lazy(() => Survey_QuestionsRelationFilterSchema),z.lazy(() => Survey_QuestionsWhereInputSchema) ]).optional(),
  Survey_Choice: z.union([ z.lazy(() => Survey_ChoicesRelationFilterSchema),z.lazy(() => Survey_ChoicesWhereInputSchema) ]).optional(),
  Reservation: z.union([ z.lazy(() => ReservationsRelationFilterSchema),z.lazy(() => ReservationsWhereInputSchema) ]).optional(),
}).strict());

export const Pre_Feedback_AnswersOrderByWithAggregationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Pre_Feedback_AnswersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Pre_Feedback_AnswersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Pre_Feedback_AnswersMinOrderByAggregateInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reservation_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Survey_ChoicesWhereInputSchema: z.ZodType<Prisma.Survey_ChoicesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Survey_ChoicesWhereInputSchema),z.lazy(() => Survey_ChoicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_ChoicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_ChoicesWhereInputSchema),z.lazy(() => Survey_ChoicesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  survey_question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Survey_Question: z.union([ z.lazy(() => Survey_QuestionsRelationFilterSchema),z.lazy(() => Survey_QuestionsWhereInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersListRelationFilterSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersListRelationFilterSchema).optional()
}).strict();

export const Survey_ChoicesOrderByWithRelationInputSchema: z.ZodType<Prisma.Survey_ChoicesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  survey_question_id: z.lazy(() => SortOrderSchema).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsOrderByWithRelationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersOrderByRelationAggregateInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Survey_ChoicesWhereUniqueInputSchema: z.ZodType<Prisma.Survey_ChoicesWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Survey_ChoicesWhereInputSchema),z.lazy(() => Survey_ChoicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_ChoicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_ChoicesWhereInputSchema),z.lazy(() => Survey_ChoicesWhereInputSchema).array() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  survey_question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Survey_Question: z.union([ z.lazy(() => Survey_QuestionsRelationFilterSchema),z.lazy(() => Survey_QuestionsWhereInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersListRelationFilterSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersListRelationFilterSchema).optional()
}).strict());

export const Survey_ChoicesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Survey_ChoicesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  survey_question_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Survey_ChoicesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Survey_ChoicesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Survey_ChoicesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Survey_ChoicesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Survey_ChoicesSumOrderByAggregateInputSchema).optional()
}).strict();

export const Survey_ChoicesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Survey_ChoicesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Survey_ChoicesScalarWhereWithAggregatesInputSchema),z.lazy(() => Survey_ChoicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_ChoicesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_ChoicesScalarWhereWithAggregatesInputSchema),z.lazy(() => Survey_ChoicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  survey_question_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Survey_QuestionsWhereInputSchema: z.ZodType<Prisma.Survey_QuestionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Survey_QuestionsWhereInputSchema),z.lazy(() => Survey_QuestionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_QuestionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_QuestionsWhereInputSchema),z.lazy(() => Survey_QuestionsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumSurveyQuestionTypeFilterSchema),z.lazy(() => SurveyQuestionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesListRelationFilterSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersListRelationFilterSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersListRelationFilterSchema).optional()
}).strict();

export const Survey_QuestionsOrderByWithRelationInputSchema: z.ZodType<Prisma.Survey_QuestionsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_required: z.lazy(() => SortOrderSchema).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesOrderByRelationAggregateInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersOrderByRelationAggregateInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Survey_QuestionsWhereUniqueInputSchema: z.ZodType<Prisma.Survey_QuestionsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Survey_QuestionsWhereInputSchema),z.lazy(() => Survey_QuestionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_QuestionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_QuestionsWhereInputSchema),z.lazy(() => Survey_QuestionsWhereInputSchema).array() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  type: z.union([ z.lazy(() => EnumSurveyQuestionTypeFilterSchema),z.lazy(() => SurveyQuestionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesListRelationFilterSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersListRelationFilterSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersListRelationFilterSchema).optional()
}).strict());

export const Survey_QuestionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.Survey_QuestionsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_required: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Survey_QuestionsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Survey_QuestionsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Survey_QuestionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Survey_QuestionsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Survey_QuestionsSumOrderByAggregateInputSchema).optional()
}).strict();

export const Survey_QuestionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Survey_QuestionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Survey_QuestionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Survey_QuestionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_QuestionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_QuestionsScalarWhereWithAggregatesInputSchema),z.lazy(() => Survey_QuestionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumSurveyQuestionTypeWithAggregatesFilterSchema),z.lazy(() => SurveyQuestionTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_required: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const Donation_HistoryWhereInputSchema: z.ZodType<Prisma.Donation_HistoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Donation_HistoryWhereInputSchema),z.lazy(() => Donation_HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Donation_HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Donation_HistoryWhereInputSchema),z.lazy(() => Donation_HistoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rewarded_points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  blood_quality_status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumDonationStatusFilterSchema),z.lazy(() => DonationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post_donation_db_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Resevation: z.union([ z.lazy(() => ReservationsRelationFilterSchema),z.lazy(() => ReservationsWhereInputSchema) ]).optional(),
  Post_Donation_Feedback: z.union([ z.lazy(() => Post_Donation_FeedbacksRelationFilterSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.Donation_HistoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rewarded_points: z.lazy(() => SortOrderSchema).optional(),
  blood_quality_status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  post_donation_db_id: z.lazy(() => SortOrderSchema).optional(),
  Resevation: z.lazy(() => ReservationsOrderByWithRelationInputSchema).optional(),
  Post_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksOrderByWithRelationInputSchema).optional()
}).strict();

export const Donation_HistoryWhereUniqueInputSchema: z.ZodType<Prisma.Donation_HistoryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Donation_HistoryWhereInputSchema),z.lazy(() => Donation_HistoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Donation_HistoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Donation_HistoryWhereInputSchema),z.lazy(() => Donation_HistoryWhereInputSchema).array() ]).optional(),
  rewarded_points: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  blood_quality_status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumDonationStatusFilterSchema),z.lazy(() => DonationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post_donation_db_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Resevation: z.union([ z.lazy(() => ReservationsRelationFilterSchema),z.lazy(() => ReservationsWhereInputSchema) ]).optional(),
  Post_Donation_Feedback: z.union([ z.lazy(() => Post_Donation_FeedbacksRelationFilterSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema) ]).optional(),
}).strict());

export const Donation_HistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.Donation_HistoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rewarded_points: z.lazy(() => SortOrderSchema).optional(),
  blood_quality_status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  post_donation_db_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Donation_HistoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Donation_HistoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Donation_HistoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Donation_HistoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Donation_HistorySumOrderByAggregateInputSchema).optional()
}).strict();

export const Donation_HistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Donation_HistoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Donation_HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Donation_HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Donation_HistoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Donation_HistoryScalarWhereWithAggregatesInputSchema),z.lazy(() => Donation_HistoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rewarded_points: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  blood_quality_status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeWithAggregatesFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumDonationStatusWithAggregatesFilterSchema),z.lazy(() => DonationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  post_donation_db_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const Post_Donation_FeedbacksWhereInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_Donation_FeedbacksWhereInputSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Donation_FeedbacksWhereInputSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryListRelationFilterSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersListRelationFilterSchema).optional()
}).strict();

export const Post_Donation_FeedbacksOrderByWithRelationInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  Donation_History: z.lazy(() => Donation_HistoryOrderByRelationAggregateInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersOrderByRelationAggregateInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksWhereUniqueInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Post_Donation_FeedbacksWhereInputSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Donation_FeedbacksWhereInputSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryListRelationFilterSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersListRelationFilterSchema).optional()
}).strict());

export const Post_Donation_FeedbacksOrderByWithAggregationInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Post_Donation_FeedbacksCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Post_Donation_FeedbacksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Post_Donation_FeedbacksMinOrderByAggregateInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Post_Feedback_AnswersWhereInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_Feedback_AnswersWhereInputSchema),z.lazy(() => Post_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Feedback_AnswersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Feedback_AnswersWhereInputSchema),z.lazy(() => Post_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedback_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Survey_Question: z.union([ z.lazy(() => Survey_QuestionsRelationFilterSchema),z.lazy(() => Survey_QuestionsWhereInputSchema) ]).optional(),
  Survey_Choice: z.union([ z.lazy(() => Survey_ChoicesRelationFilterSchema),z.lazy(() => Survey_ChoicesWhereInputSchema) ]).optional(),
  Pre_Donation_Feedback: z.union([ z.lazy(() => Post_Donation_FeedbacksRelationFilterSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersOrderByWithRelationInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedback_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsOrderByWithRelationInputSchema).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesOrderByWithRelationInputSchema).optional(),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksOrderByWithRelationInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersWhereUniqueInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => Post_Feedback_AnswersWhereInputSchema),z.lazy(() => Post_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Feedback_AnswersWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Feedback_AnswersWhereInputSchema),z.lazy(() => Post_Feedback_AnswersWhereInputSchema).array() ]).optional(),
  feedback_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Survey_Question: z.union([ z.lazy(() => Survey_QuestionsRelationFilterSchema),z.lazy(() => Survey_QuestionsWhereInputSchema) ]).optional(),
  Survey_Choice: z.union([ z.lazy(() => Survey_ChoicesRelationFilterSchema),z.lazy(() => Survey_ChoicesWhereInputSchema) ]).optional(),
  Pre_Donation_Feedback: z.union([ z.lazy(() => Post_Donation_FeedbacksRelationFilterSchema),z.lazy(() => Post_Donation_FeedbacksWhereInputSchema) ]).optional(),
}).strict());

export const Post_Feedback_AnswersOrderByWithAggregationInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedback_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Post_Feedback_AnswersCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Post_Feedback_AnswersMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Post_Feedback_AnswersMinOrderByAggregateInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  feedback_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ModeratorsWhereInputSchema: z.ZodType<Prisma.ModeratorsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ModeratorsWhereInputSchema),z.lazy(() => ModeratorsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModeratorsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModeratorsWhereInputSchema),z.lazy(() => ModeratorsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const ModeratorsOrderByWithRelationInputSchema: z.ZodType<Prisma.ModeratorsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  Session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ModeratorsWhereUniqueInputSchema: z.ZodType<Prisma.ModeratorsWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ModeratorsWhereInputSchema),z.lazy(() => ModeratorsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModeratorsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModeratorsWhereInputSchema),z.lazy(() => ModeratorsWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Session: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const ModeratorsOrderByWithAggregationInputSchema: z.ZodType<Prisma.ModeratorsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ModeratorsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ModeratorsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ModeratorsMinOrderByAggregateInputSchema).optional()
}).strict();

export const ModeratorsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ModeratorsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ModeratorsScalarWhereWithAggregatesInputSchema),z.lazy(() => ModeratorsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModeratorsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModeratorsScalarWhereWithAggregatesInputSchema),z.lazy(() => ModeratorsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Medical_AccountsCreateInputSchema: z.ZodType<Prisma.Medical_AccountsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema),
  account_status: z.lazy(() => AccountStatusSchema),
  is_activated: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donators: z.lazy(() => DonatorsCreateNestedManyWithoutMedical_AccountInputSchema).optional()
}).strict();

export const Medical_AccountsUncheckedCreateInputSchema: z.ZodType<Prisma.Medical_AccountsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema),
  account_status: z.lazy(() => AccountStatusSchema),
  is_activated: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donators: z.lazy(() => DonatorsUncheckedCreateNestedManyWithoutMedical_AccountInputSchema).optional()
}).strict();

export const Medical_AccountsUpdateInputSchema: z.ZodType<Prisma.Medical_AccountsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => EnumAccountStatusFieldUpdateOperationsInputSchema) ]).optional(),
  is_activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donators: z.lazy(() => DonatorsUpdateManyWithoutMedical_AccountNestedInputSchema).optional()
}).strict();

export const Medical_AccountsUncheckedUpdateInputSchema: z.ZodType<Prisma.Medical_AccountsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => EnumAccountStatusFieldUpdateOperationsInputSchema) ]).optional(),
  is_activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donators: z.lazy(() => DonatorsUncheckedUpdateManyWithoutMedical_AccountNestedInputSchema).optional()
}).strict();

export const Medical_AccountsCreateManyInputSchema: z.ZodType<Prisma.Medical_AccountsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema),
  account_status: z.lazy(() => AccountStatusSchema),
  is_activated: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Medical_AccountsUpdateManyMutationInputSchema: z.ZodType<Prisma.Medical_AccountsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => EnumAccountStatusFieldUpdateOperationsInputSchema) ]).optional(),
  is_activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Medical_AccountsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Medical_AccountsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => EnumAccountStatusFieldUpdateOperationsInputSchema) ]).optional(),
  is_activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DonatorsCreateInputSchema: z.ZodType<Prisma.DonatorsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsCreateNestedOneWithoutDonatorsInputSchema),
  Reward_Transactions: z.lazy(() => Reward_TransactionsCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUncheckedCreateInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  medical_account_id: z.string(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUpdateInputSchema: z.ZodType<Prisma.DonatorsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInputSchema).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medical_account_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsCreateManyInputSchema: z.ZodType<Prisma.DonatorsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  medical_account_id: z.string(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const DonatorsUpdateManyMutationInputSchema: z.ZodType<Prisma.DonatorsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DonatorsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medical_account_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsCreateInputSchema: z.ZodType<Prisma.Reward_TransactionsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutReward_TransactionsInputSchema)
}).strict();

export const Reward_TransactionsUncheckedCreateInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  donator_id: z.string(),
  points: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Reward_TransactionsUpdateInputSchema: z.ZodType<Prisma.Reward_TransactionsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutReward_TransactionsNestedInputSchema).optional()
}).strict();

export const Reward_TransactionsUncheckedUpdateInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsCreateManyInputSchema: z.ZodType<Prisma.Reward_TransactionsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  donator_id: z.string(),
  points: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Reward_TransactionsUpdateManyMutationInputSchema: z.ZodType<Prisma.Reward_TransactionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Redemption_HistoryCreateInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutRedemption_HistoryInputSchema),
  Reward: z.lazy(() => RewardsCreateNestedOneWithoutRedemption_HistoryInputSchema)
}).strict();

export const Redemption_HistoryUncheckedCreateInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string(),
  reward_id: z.string()
}).strict();

export const Redemption_HistoryUpdateInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutRedemption_HistoryNestedInputSchema).optional(),
  Reward: z.lazy(() => RewardsUpdateOneRequiredWithoutRedemption_HistoryNestedInputSchema).optional()
}).strict();

export const Redemption_HistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Redemption_HistoryCreateManyInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string(),
  reward_id: z.string()
}).strict();

export const Redemption_HistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Redemption_HistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RewardsCreateInputSchema: z.ZodType<Prisma.RewardsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutRewardsInputSchema),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutRewardInputSchema).optional()
}).strict();

export const RewardsUncheckedCreateInputSchema: z.ZodType<Prisma.RewardsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutRewardInputSchema).optional()
}).strict();

export const RewardsUpdateInputSchema: z.ZodType<Prisma.RewardsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutRewardsNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutRewardNestedInputSchema).optional()
}).strict();

export const RewardsUncheckedUpdateInputSchema: z.ZodType<Prisma.RewardsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutRewardNestedInputSchema).optional()
}).strict();

export const RewardsCreateManyInputSchema: z.ZodType<Prisma.RewardsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const RewardsUpdateManyMutationInputSchema: z.ZodType<Prisma.RewardsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RewardsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RewardsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlacesCreateInputSchema: z.ZodType<Prisma.PlacesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUpdateInputSchema: z.ZodType<Prisma.PlacesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesCreateManyInputSchema: z.ZodType<Prisma.PlacesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const PlacesUpdateManyMutationInputSchema: z.ZodType<Prisma.PlacesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PlacesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Place_Review_HistoryCreateInputSchema: z.ZodType<Prisma.Place_Review_HistoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutPlace_Review_HistoryInputSchema)
}).strict();

export const Place_Review_HistoryUncheckedCreateInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  place_id: z.string()
}).strict();

export const Place_Review_HistoryUpdateInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutPlace_Review_HistoryNestedInputSchema).optional()
}).strict();

export const Place_Review_HistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Place_Review_HistoryCreateManyInputSchema: z.ZodType<Prisma.Place_Review_HistoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional(),
  place_id: z.string()
}).strict();

export const Place_Review_HistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Place_Review_HistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnnouncementsCreateInputSchema: z.ZodType<Prisma.AnnouncementsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema).optional().nullable(),
  post_type: z.lazy(() => PostTypeSchema),
  title: z.string(),
  content: z.string(),
  image_src: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutAnnouncementsInputSchema)
}).strict();

export const AnnouncementsUncheckedCreateInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema).optional().nullable(),
  post_type: z.lazy(() => PostTypeSchema),
  title: z.string(),
  content: z.string(),
  image_src: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const AnnouncementsUpdateInputSchema: z.ZodType<Prisma.AnnouncementsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutAnnouncementsNestedInputSchema).optional()
}).strict();

export const AnnouncementsUncheckedUpdateInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AnnouncementsCreateManyInputSchema: z.ZodType<Prisma.AnnouncementsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema).optional().nullable(),
  post_type: z.lazy(() => PostTypeSchema),
  title: z.string(),
  content: z.string(),
  image_src: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const AnnouncementsUpdateManyMutationInputSchema: z.ZodType<Prisma.AnnouncementsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Special_EventsCreateInputSchema: z.ZodType<Prisma.Special_EventsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutSpecial_EventsInputSchema)
}).strict();

export const Special_EventsUncheckedCreateInputSchema: z.ZodType<Prisma.Special_EventsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const Special_EventsUpdateInputSchema: z.ZodType<Prisma.Special_EventsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutSpecial_EventsNestedInputSchema).optional()
}).strict();

export const Special_EventsUncheckedUpdateInputSchema: z.ZodType<Prisma.Special_EventsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Special_EventsCreateManyInputSchema: z.ZodType<Prisma.Special_EventsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const Special_EventsUpdateManyMutationInputSchema: z.ZodType<Prisma.Special_EventsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Special_EventsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Special_EventsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Reservation_SlotsCreateInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutReservation_SlotsInputSchema),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutReservation_SlotInputSchema).optional()
}).strict();

export const Reservation_SlotsUncheckedCreateInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  place_id: z.string(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutReservation_SlotInputSchema).optional()
}).strict();

export const Reservation_SlotsUpdateInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutReservation_SlotsNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutReservation_SlotNestedInputSchema).optional()
}).strict();

export const Reservation_SlotsUncheckedUpdateInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutReservation_SlotNestedInputSchema).optional()
}).strict();

export const Reservation_SlotsCreateManyInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const Reservation_SlotsUpdateManyMutationInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reservation_SlotsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Medical_StaffCreateInputSchema: z.ZodType<Prisma.Medical_StaffCreateInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutMedical_StaffInputSchema),
  Session: z.lazy(() => SessionCreateNestedManyWithoutMedical_StaffInputSchema).optional()
}).strict();

export const Medical_StaffUncheckedCreateInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  place_id: z.string(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutMedical_StaffInputSchema).optional()
}).strict();

export const Medical_StaffUpdateInputSchema: z.ZodType<Prisma.Medical_StaffUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutMedical_StaffNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutMedical_StaffNestedInputSchema).optional()
}).strict();

export const Medical_StaffUncheckedUpdateInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutMedical_StaffNestedInputSchema).optional()
}).strict();

export const Medical_StaffCreateManyInputSchema: z.ZodType<Prisma.Medical_StaffCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const Medical_StaffUpdateManyMutationInputSchema: z.ZodType<Prisma.Medical_StaffUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Medical_StaffUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutSessionInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedOneWithoutSessionInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsCreateNestedOneWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  moderator_id: z.string().optional().nullable(),
  donator_id: z.string().optional().nullable(),
  medical_staff_id: z.string().optional().nullable()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donator: z.lazy(() => DonatorsUpdateOneWithoutSessionNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateOneWithoutSessionNestedInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsUpdateOneWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  moderator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medical_staff_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  moderator_id: z.string().optional().nullable(),
  donator_id: z.string().optional().nullable(),
  medical_staff_id: z.string().optional().nullable()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  moderator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medical_staff_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReservationsCreateInputSchema: z.ZodType<Prisma.ReservationsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsCreateNestedOneWithoutReservationsInputSchema),
  Donation_History: z.lazy(() => Donation_HistoryCreateNestedManyWithoutResevationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutReservationInputSchema).optional(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationsUncheckedCreateInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  reservation_slot_id: z.string(),
  donator_id: z.string(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedCreateNestedManyWithoutResevationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutReservationInputSchema).optional()
}).strict();

export const ReservationsUpdateInputSchema: z.ZodType<Prisma.ReservationsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUpdateManyWithoutResevationNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutReservationNestedInputSchema).optional(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_slot_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutResevationNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationNestedInputSchema).optional()
}).strict();

export const ReservationsCreateManyInputSchema: z.ZodType<Prisma.ReservationsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  reservation_slot_id: z.string(),
  donator_id: z.string()
}).strict();

export const ReservationsUpdateManyMutationInputSchema: z.ZodType<Prisma.ReservationsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReservationsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_slot_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersCreateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema),
  Survey_Choice: z.lazy(() => Survey_ChoicesCreateNestedOneWithoutPre_Feedback_AnswersInputSchema),
  Reservation: z.lazy(() => ReservationsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema)
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reservation_id: z.string(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Pre_Feedback_AnswersUpdateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional(),
  Reservation: z.lazy(() => ReservationsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersCreateManyInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  reservation_id: z.string(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Pre_Feedback_AnswersUpdateManyMutationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Survey_ChoicesCreateInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutSurvey_ChoicesInputSchema),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedCreateInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  survey_question_id: z.string(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesUpdateInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutSurvey_ChoicesNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedUpdateInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  survey_question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesCreateManyInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  survey_question_id: z.string()
}).strict();

export const Survey_ChoicesUpdateManyMutationInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Survey_ChoicesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  survey_question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Survey_QuestionsCreateInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Survey_Choices: z.lazy(() => Survey_ChoicesCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedCreateInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsUpdateInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedUpdateInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsCreateManyInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean()
}).strict();

export const Survey_QuestionsUpdateManyMutationInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Survey_QuestionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryCreateInputSchema: z.ZodType<Prisma.Donation_HistoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Resevation: z.lazy(() => ReservationsCreateNestedOneWithoutDonation_HistoryInputSchema),
  Post_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksCreateNestedOneWithoutDonation_HistoryInputSchema)
}).strict();

export const Donation_HistoryUncheckedCreateInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  reservation_id: z.string(),
  post_donation_db_id: z.string()
}).strict();

export const Donation_HistoryUpdateInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Resevation: z.lazy(() => ReservationsUpdateOneRequiredWithoutDonation_HistoryNestedInputSchema).optional(),
  Post_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksUpdateOneRequiredWithoutDonation_HistoryNestedInputSchema).optional()
}).strict();

export const Donation_HistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post_donation_db_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryCreateManyInputSchema: z.ZodType<Prisma.Donation_HistoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  reservation_id: z.string(),
  post_donation_db_id: z.string()
}).strict();

export const Donation_HistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Donation_HistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post_donation_db_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Donation_FeedbacksCreateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  Donation_History: z.lazy(() => Donation_HistoryCreateNestedManyWithoutPost_Donation_FeedbackInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutPre_Donation_FeedbackInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUncheckedCreateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedCreateNestedManyWithoutPost_Donation_FeedbackInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutPre_Donation_FeedbackInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUpdateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUpdateManyWithoutPost_Donation_FeedbackNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutPre_Donation_FeedbackNestedInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUncheckedUpdateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackNestedInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksCreateManyInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const Post_Donation_FeedbacksUpdateManyMutationInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Donation_FeedbacksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersCreateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutPost_Feedback_AnswersInputSchema),
  Survey_Choice: z.lazy(() => Survey_ChoicesCreateNestedOneWithoutPost_Feedback_AnswersInputSchema),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksCreateNestedOneWithoutPost_Feedback_AnswersInputSchema)
}).strict();

export const Post_Feedback_AnswersUncheckedCreateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  feedback_id: z.string(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Post_Feedback_AnswersUpdateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional(),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersCreateManyInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  feedback_id: z.string(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Post_Feedback_AnswersUpdateManyMutationInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeratorsCreateInputSchema: z.ZodType<Prisma.ModeratorsCreateInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutModeratorInputSchema).optional()
}).strict();

export const ModeratorsUncheckedCreateInputSchema: z.ZodType<Prisma.ModeratorsUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutModeratorInputSchema).optional()
}).strict();

export const ModeratorsUpdateInputSchema: z.ZodType<Prisma.ModeratorsUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutModeratorNestedInputSchema).optional()
}).strict();

export const ModeratorsUncheckedUpdateInputSchema: z.ZodType<Prisma.ModeratorsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutModeratorNestedInputSchema).optional()
}).strict();

export const ModeratorsCreateManyInputSchema: z.ZodType<Prisma.ModeratorsCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const ModeratorsUpdateManyMutationInputSchema: z.ZodType<Prisma.ModeratorsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeratorsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ModeratorsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EnumBloodTypeFilterSchema: z.ZodType<Prisma.EnumBloodTypeFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional(),
  in: z.lazy(() => BloodTypeSchema).array().optional(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeFilterSchema) ]).optional(),
}).strict();

export const EnumAccountStatusFilterSchema: z.ZodType<Prisma.EnumAccountStatusFilter> = z.object({
  equals: z.lazy(() => AccountStatusSchema).optional(),
  in: z.lazy(() => AccountStatusSchema).array().optional(),
  notIn: z.lazy(() => AccountStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => NestedEnumAccountStatusFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const DonatorsListRelationFilterSchema: z.ZodType<Prisma.DonatorsListRelationFilter> = z.object({
  every: z.lazy(() => DonatorsWhereInputSchema).optional(),
  some: z.lazy(() => DonatorsWhereInputSchema).optional(),
  none: z.lazy(() => DonatorsWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DonatorsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DonatorsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_AccountsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Medical_AccountsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  account_status: z.lazy(() => SortOrderSchema).optional(),
  is_activated: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_AccountsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Medical_AccountsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  account_status: z.lazy(() => SortOrderSchema).optional(),
  is_activated: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_AccountsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Medical_AccountsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  account_status: z.lazy(() => SortOrderSchema).optional(),
  is_activated: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
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

export const EnumBloodTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBloodTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional(),
  in: z.lazy(() => BloodTypeSchema).array().optional(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBloodTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBloodTypeFilterSchema).optional()
}).strict();

export const EnumAccountStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAccountStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccountStatusSchema).optional(),
  in: z.lazy(() => AccountStatusSchema).array().optional(),
  notIn: z.lazy(() => AccountStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => NestedEnumAccountStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccountStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccountStatusFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
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

export const Medical_AccountsRelationFilterSchema: z.ZodType<Prisma.Medical_AccountsRelationFilter> = z.object({
  is: z.lazy(() => Medical_AccountsWhereInputSchema).optional(),
  isNot: z.lazy(() => Medical_AccountsWhereInputSchema).optional()
}).strict();

export const Reward_TransactionsListRelationFilterSchema: z.ZodType<Prisma.Reward_TransactionsListRelationFilter> = z.object({
  every: z.lazy(() => Reward_TransactionsWhereInputSchema).optional(),
  some: z.lazy(() => Reward_TransactionsWhereInputSchema).optional(),
  none: z.lazy(() => Reward_TransactionsWhereInputSchema).optional()
}).strict();

export const Redemption_HistoryListRelationFilterSchema: z.ZodType<Prisma.Redemption_HistoryListRelationFilter> = z.object({
  every: z.lazy(() => Redemption_HistoryWhereInputSchema).optional(),
  some: z.lazy(() => Redemption_HistoryWhereInputSchema).optional(),
  none: z.lazy(() => Redemption_HistoryWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const ReservationsListRelationFilterSchema: z.ZodType<Prisma.ReservationsListRelationFilter> = z.object({
  every: z.lazy(() => ReservationsWhereInputSchema).optional(),
  some: z.lazy(() => ReservationsWhereInputSchema).optional(),
  none: z.lazy(() => ReservationsWhereInputSchema).optional()
}).strict();

export const Reward_TransactionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Reward_TransactionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Redemption_HistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Redemption_HistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReservationsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsCountOrderByAggregateInputSchema: z.ZodType<Prisma.DonatorsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medical_account_id: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  dob: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reward_point: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DonatorsAvgOrderByAggregateInput> = z.object({
  reward_point: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DonatorsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medical_account_id: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  dob: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reward_point: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsMinOrderByAggregateInputSchema: z.ZodType<Prisma.DonatorsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  medical_account_id: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  dob: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reward_point: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsSumOrderByAggregateInputSchema: z.ZodType<Prisma.DonatorsSumOrderByAggregateInput> = z.object({
  reward_point: z.lazy(() => SortOrderSchema).optional()
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

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
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

export const DonatorsRelationFilterSchema: z.ZodType<Prisma.DonatorsRelationFilter> = z.object({
  is: z.lazy(() => DonatorsWhereInputSchema).optional(),
  isNot: z.lazy(() => DonatorsWhereInputSchema).optional()
}).strict();

export const Reward_TransactionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Reward_TransactionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reward_TransactionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Reward_TransactionsAvgOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reward_TransactionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Reward_TransactionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reward_TransactionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Reward_TransactionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reward_TransactionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.Reward_TransactionsSumOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRedemptionStatusFilterSchema: z.ZodType<Prisma.EnumRedemptionStatusFilter> = z.object({
  equals: z.lazy(() => RedemptionStatusSchema).optional(),
  in: z.lazy(() => RedemptionStatusSchema).array().optional(),
  notIn: z.lazy(() => RedemptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => NestedEnumRedemptionStatusFilterSchema) ]).optional(),
}).strict();

export const RewardsRelationFilterSchema: z.ZodType<Prisma.RewardsRelationFilter> = z.object({
  is: z.lazy(() => RewardsWhereInputSchema).optional(),
  isNot: z.lazy(() => RewardsWhereInputSchema).optional()
}).strict();

export const Redemption_HistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.Redemption_HistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  reward_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Redemption_HistoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Redemption_HistoryAvgOrderByAggregateInput> = z.object({
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Redemption_HistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Redemption_HistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  reward_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Redemption_HistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.Redemption_HistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  reward_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Redemption_HistorySumOrderByAggregateInputSchema: z.ZodType<Prisma.Redemption_HistorySumOrderByAggregateInput> = z.object({
  used_points: z.lazy(() => SortOrderSchema).optional(),
  redeem_amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRedemptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRedemptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RedemptionStatusSchema).optional(),
  in: z.lazy(() => RedemptionStatusSchema).array().optional(),
  notIn: z.lazy(() => RedemptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => NestedEnumRedemptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRedemptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRedemptionStatusFilterSchema).optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PlacesRelationFilterSchema: z.ZodType<Prisma.PlacesRelationFilter> = z.object({
  is: z.lazy(() => PlacesWhereInputSchema).optional(),
  isNot: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const RewardsCountOrderByAggregateInputSchema: z.ZodType<Prisma.RewardsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  required_points: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RewardsAvgOrderByAggregateInput> = z.object({
  required_points: z.lazy(() => SortOrderSchema).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RewardsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  required_points: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardsMinOrderByAggregateInputSchema: z.ZodType<Prisma.RewardsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  required_points: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RewardsSumOrderByAggregateInputSchema: z.ZodType<Prisma.RewardsSumOrderByAggregateInput> = z.object({
  required_points: z.lazy(() => SortOrderSchema).optional(),
  amount_left: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const RewardsListRelationFilterSchema: z.ZodType<Prisma.RewardsListRelationFilter> = z.object({
  every: z.lazy(() => RewardsWhereInputSchema).optional(),
  some: z.lazy(() => RewardsWhereInputSchema).optional(),
  none: z.lazy(() => RewardsWhereInputSchema).optional()
}).strict();

export const AnnouncementsListRelationFilterSchema: z.ZodType<Prisma.AnnouncementsListRelationFilter> = z.object({
  every: z.lazy(() => AnnouncementsWhereInputSchema).optional(),
  some: z.lazy(() => AnnouncementsWhereInputSchema).optional(),
  none: z.lazy(() => AnnouncementsWhereInputSchema).optional()
}).strict();

export const Special_EventsListRelationFilterSchema: z.ZodType<Prisma.Special_EventsListRelationFilter> = z.object({
  every: z.lazy(() => Special_EventsWhereInputSchema).optional(),
  some: z.lazy(() => Special_EventsWhereInputSchema).optional(),
  none: z.lazy(() => Special_EventsWhereInputSchema).optional()
}).strict();

export const Medical_StaffListRelationFilterSchema: z.ZodType<Prisma.Medical_StaffListRelationFilter> = z.object({
  every: z.lazy(() => Medical_StaffWhereInputSchema).optional(),
  some: z.lazy(() => Medical_StaffWhereInputSchema).optional(),
  none: z.lazy(() => Medical_StaffWhereInputSchema).optional()
}).strict();

export const Reservation_SlotsListRelationFilterSchema: z.ZodType<Prisma.Reservation_SlotsListRelationFilter> = z.object({
  every: z.lazy(() => Reservation_SlotsWhereInputSchema).optional(),
  some: z.lazy(() => Reservation_SlotsWhereInputSchema).optional(),
  none: z.lazy(() => Reservation_SlotsWhereInputSchema).optional()
}).strict();

export const Place_Review_HistoryListRelationFilterSchema: z.ZodType<Prisma.Place_Review_HistoryListRelationFilter> = z.object({
  every: z.lazy(() => Place_Review_HistoryWhereInputSchema).optional(),
  some: z.lazy(() => Place_Review_HistoryWhereInputSchema).optional(),
  none: z.lazy(() => Place_Review_HistoryWhereInputSchema).optional()
}).strict();

export const RewardsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RewardsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AnnouncementsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Special_EventsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Special_EventsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_StaffOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Medical_StaffOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reservation_SlotsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Reservation_SlotsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Place_Review_HistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Place_Review_HistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlacesCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlacesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  icon_src: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  website_url: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  opening_day: z.lazy(() => SortOrderSchema).optional(),
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlacesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PlacesAvgOrderByAggregateInput> = z.object({
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlacesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlacesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  icon_src: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  website_url: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  opening_day: z.lazy(() => SortOrderSchema).optional(),
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlacesMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlacesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  icon_src: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  website_url: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  opening_day: z.lazy(() => SortOrderSchema).optional(),
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional(),
  is_available: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlacesSumOrderByAggregateInputSchema: z.ZodType<Prisma.PlacesSumOrderByAggregateInput> = z.object({
  opening_time: z.lazy(() => SortOrderSchema).optional(),
  closing_time: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
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

export const Place_Review_HistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.Place_Review_HistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Place_Review_HistoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Place_Review_HistoryAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Place_Review_HistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Place_Review_HistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Place_Review_HistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.Place_Review_HistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Place_Review_HistorySumOrderByAggregateInputSchema: z.ZodType<Prisma.Place_Review_HistorySumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
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

export const EnumBloodTypeNullableFilterSchema: z.ZodType<Prisma.EnumBloodTypeNullableFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional().nullable(),
  in: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumPostTypeFilterSchema: z.ZodType<Prisma.EnumPostTypeFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeFilterSchema) ]).optional(),
}).strict();

export const AnnouncementsCountOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  post_type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  post_type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AnnouncementsMinOrderByAggregateInputSchema: z.ZodType<Prisma.AnnouncementsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  post_type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image_src: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBloodTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBloodTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional().nullable(),
  in: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBloodTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBloodTypeNullableFilterSchema).optional()
}).strict();

export const EnumPostTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPostTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPostTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPostTypeFilterSchema).optional()
}).strict();

export const Special_EventsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Special_EventsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Special_EventsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Special_EventsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Special_EventsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Special_EventsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reservation_SlotsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Reservation_SlotsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reserve_date: z.lazy(() => SortOrderSchema).optional(),
  reserve_time: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reservation_SlotsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Reservation_SlotsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reserve_date: z.lazy(() => SortOrderSchema).optional(),
  reserve_time: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Reservation_SlotsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Reservation_SlotsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reserve_date: z.lazy(() => SortOrderSchema).optional(),
  reserve_time: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_StaffCountOrderByAggregateInputSchema: z.ZodType<Prisma.Medical_StaffCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_StaffMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Medical_StaffMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Medical_StaffMinOrderByAggregateInputSchema: z.ZodType<Prisma.Medical_StaffMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsNullableRelationFilterSchema: z.ZodType<Prisma.DonatorsNullableRelationFilter> = z.object({
  is: z.lazy(() => DonatorsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DonatorsWhereInputSchema).optional().nullable()
}).strict();

export const Medical_StaffNullableRelationFilterSchema: z.ZodType<Prisma.Medical_StaffNullableRelationFilter> = z.object({
  is: z.lazy(() => Medical_StaffWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => Medical_StaffWhereInputSchema).optional().nullable()
}).strict();

export const ModeratorsNullableRelationFilterSchema: z.ZodType<Prisma.ModeratorsNullableRelationFilter> = z.object({
  is: z.lazy(() => ModeratorsWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ModeratorsWhereInputSchema).optional().nullable()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  moderator_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  medical_staff_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  moderator_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  medical_staff_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  moderator_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional(),
  medical_staff_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReservationStatusFilterSchema: z.ZodType<Prisma.EnumReservationStatusFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusFilterSchema) ]).optional(),
}).strict();

export const Reservation_SlotsRelationFilterSchema: z.ZodType<Prisma.Reservation_SlotsRelationFilter> = z.object({
  is: z.lazy(() => Reservation_SlotsWhereInputSchema).optional(),
  isNot: z.lazy(() => Reservation_SlotsWhereInputSchema).optional()
}).strict();

export const Donation_HistoryListRelationFilterSchema: z.ZodType<Prisma.Donation_HistoryListRelationFilter> = z.object({
  every: z.lazy(() => Donation_HistoryWhereInputSchema).optional(),
  some: z.lazy(() => Donation_HistoryWhereInputSchema).optional(),
  none: z.lazy(() => Donation_HistoryWhereInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersListRelationFilterSchema: z.ZodType<Prisma.Pre_Feedback_AnswersListRelationFilter> = z.object({
  every: z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).optional(),
  some: z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).optional(),
  none: z.lazy(() => Pre_Feedback_AnswersWhereInputSchema).optional()
}).strict();

export const Donation_HistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Donation_HistoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Pre_Feedback_AnswersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  reservation_slot_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  reservation_slot_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReservationsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReservationsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  cancelled_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  reservation_slot_id: z.lazy(() => SortOrderSchema).optional(),
  donator_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReservationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReservationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional()
}).strict();

export const Survey_QuestionsRelationFilterSchema: z.ZodType<Prisma.Survey_QuestionsRelationFilter> = z.object({
  is: z.lazy(() => Survey_QuestionsWhereInputSchema).optional(),
  isNot: z.lazy(() => Survey_QuestionsWhereInputSchema).optional()
}).strict();

export const Survey_ChoicesRelationFilterSchema: z.ZodType<Prisma.Survey_ChoicesRelationFilter> = z.object({
  is: z.lazy(() => Survey_ChoicesWhereInputSchema).optional(),
  isNot: z.lazy(() => Survey_ChoicesWhereInputSchema).optional()
}).strict();

export const ReservationsRelationFilterSchema: z.ZodType<Prisma.ReservationsRelationFilter> = z.object({
  is: z.lazy(() => ReservationsWhereInputSchema).optional(),
  isNot: z.lazy(() => ReservationsWhereInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersCountOrderByAggregateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Pre_Feedback_AnswersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Pre_Feedback_AnswersMinOrderByAggregateInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_Feedback_AnswersListRelationFilterSchema: z.ZodType<Prisma.Post_Feedback_AnswersListRelationFilter> = z.object({
  every: z.lazy(() => Post_Feedback_AnswersWhereInputSchema).optional(),
  some: z.lazy(() => Post_Feedback_AnswersWhereInputSchema).optional(),
  none: z.lazy(() => Post_Feedback_AnswersWhereInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_ChoicesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_ChoicesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  survey_question_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_ChoicesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_ChoicesAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_ChoicesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_ChoicesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  survey_question_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_ChoicesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_ChoicesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  survey_question_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_ChoicesSumOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_ChoicesSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSurveyQuestionTypeFilterSchema: z.ZodType<Prisma.EnumSurveyQuestionTypeFilter> = z.object({
  equals: z.lazy(() => SurveyQuestionTypeSchema).optional(),
  in: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => NestedEnumSurveyQuestionTypeFilterSchema) ]).optional(),
}).strict();

export const Survey_ChoicesListRelationFilterSchema: z.ZodType<Prisma.Survey_ChoicesListRelationFilter> = z.object({
  every: z.lazy(() => Survey_ChoicesWhereInputSchema).optional(),
  some: z.lazy(() => Survey_ChoicesWhereInputSchema).optional(),
  none: z.lazy(() => Survey_ChoicesWhereInputSchema).optional()
}).strict();

export const Survey_ChoicesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Survey_ChoicesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_QuestionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_QuestionsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_required: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_QuestionsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_QuestionsAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_QuestionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_QuestionsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_required: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_QuestionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_QuestionsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_required: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Survey_QuestionsSumOrderByAggregateInputSchema: z.ZodType<Prisma.Survey_QuestionsSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSurveyQuestionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSurveyQuestionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SurveyQuestionTypeSchema).optional(),
  in: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => NestedEnumSurveyQuestionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSurveyQuestionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSurveyQuestionTypeFilterSchema).optional()
}).strict();

export const EnumDonationStatusFilterSchema: z.ZodType<Prisma.EnumDonationStatusFilter> = z.object({
  equals: z.lazy(() => DonationStatusSchema).optional(),
  in: z.lazy(() => DonationStatusSchema).array().optional(),
  notIn: z.lazy(() => DonationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => NestedEnumDonationStatusFilterSchema) ]).optional(),
}).strict();

export const Post_Donation_FeedbacksRelationFilterSchema: z.ZodType<Prisma.Post_Donation_FeedbacksRelationFilter> = z.object({
  is: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).optional(),
  isNot: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).optional()
}).strict();

export const Donation_HistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.Donation_HistoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rewarded_points: z.lazy(() => SortOrderSchema).optional(),
  blood_quality_status: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  post_donation_db_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Donation_HistoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Donation_HistoryAvgOrderByAggregateInput> = z.object({
  rewarded_points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Donation_HistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Donation_HistoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rewarded_points: z.lazy(() => SortOrderSchema).optional(),
  blood_quality_status: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  post_donation_db_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Donation_HistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.Donation_HistoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rewarded_points: z.lazy(() => SortOrderSchema).optional(),
  blood_quality_status: z.lazy(() => SortOrderSchema).optional(),
  blood_type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  reservation_id: z.lazy(() => SortOrderSchema).optional(),
  post_donation_db_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Donation_HistorySumOrderByAggregateInputSchema: z.ZodType<Prisma.Donation_HistorySumOrderByAggregateInput> = z.object({
  rewarded_points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDonationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDonationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DonationStatusSchema).optional(),
  in: z.lazy(() => DonationStatusSchema).array().optional(),
  notIn: z.lazy(() => DonationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => NestedEnumDonationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDonationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDonationStatusFilterSchema).optional()
}).strict();

export const Post_Donation_FeedbacksCountOrderByAggregateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_Donation_FeedbacksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_Donation_FeedbacksMinOrderByAggregateInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_Feedback_AnswersCountOrderByAggregateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedback_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_Feedback_AnswersMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedback_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Post_Feedback_AnswersMinOrderByAggregateInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  feedback_id: z.lazy(() => SortOrderSchema).optional(),
  question_id: z.lazy(() => SortOrderSchema).optional(),
  choice_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ModeratorsCountOrderByAggregateInputSchema: z.ZodType<Prisma.ModeratorsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ModeratorsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ModeratorsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ModeratorsMinOrderByAggregateInputSchema: z.ZodType<Prisma.ModeratorsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonatorsCreateNestedManyWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsCreateNestedManyWithoutMedical_AccountInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema).array(),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonatorsCreateManyMedical_AccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DonatorsUncheckedCreateNestedManyWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateNestedManyWithoutMedical_AccountInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema).array(),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonatorsCreateManyMedical_AccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const EnumBloodTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBloodTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BloodTypeSchema).optional()
}).strict();

export const EnumAccountStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAccountStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AccountStatusSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const DonatorsUpdateManyWithoutMedical_AccountNestedInputSchema: z.ZodType<Prisma.DonatorsUpdateManyWithoutMedical_AccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema).array(),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DonatorsUpsertWithWhereUniqueWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUpsertWithWhereUniqueWithoutMedical_AccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonatorsCreateManyMedical_AccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DonatorsUpdateWithWhereUniqueWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUpdateWithWhereUniqueWithoutMedical_AccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DonatorsUpdateManyWithWhereWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUpdateManyWithWhereWithoutMedical_AccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DonatorsScalarWhereInputSchema),z.lazy(() => DonatorsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DonatorsUncheckedUpdateManyWithoutMedical_AccountNestedInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateManyWithoutMedical_AccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema).array(),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsCreateOrConnectWithoutMedical_AccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DonatorsUpsertWithWhereUniqueWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUpsertWithWhereUniqueWithoutMedical_AccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonatorsCreateManyMedical_AccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DonatorsWhereUniqueInputSchema),z.lazy(() => DonatorsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DonatorsUpdateWithWhereUniqueWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUpdateWithWhereUniqueWithoutMedical_AccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DonatorsUpdateManyWithWhereWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUpdateManyWithWhereWithoutMedical_AccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DonatorsScalarWhereInputSchema),z.lazy(() => DonatorsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Medical_AccountsCreateNestedOneWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsCreateNestedOneWithoutDonatorsInput> = z.object({
  create: z.union([ z.lazy(() => Medical_AccountsCreateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedCreateWithoutDonatorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Medical_AccountsCreateOrConnectWithoutDonatorsInputSchema).optional(),
  connect: z.lazy(() => Medical_AccountsWhereUniqueInputSchema).optional()
}).strict();

export const Reward_TransactionsCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema).array(),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reward_TransactionsCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Redemption_HistoryCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutDonatorInputSchema),z.lazy(() => SessionCreateWithoutDonatorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationsCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateWithoutDonatorInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema).array(),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reward_TransactionsCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutDonatorInputSchema),z.lazy(() => SessionCreateWithoutDonatorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationsUncheckedCreateNestedManyWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateNestedManyWithoutDonatorInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateWithoutDonatorInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyDonatorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInputSchema: z.ZodType<Prisma.Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Medical_AccountsCreateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedCreateWithoutDonatorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Medical_AccountsCreateOrConnectWithoutDonatorsInputSchema).optional(),
  upsert: z.lazy(() => Medical_AccountsUpsertWithoutDonatorsInputSchema).optional(),
  connect: z.lazy(() => Medical_AccountsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Medical_AccountsUpdateToOneWithWhereWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUpdateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedUpdateWithoutDonatorsInputSchema) ]).optional(),
}).strict();

export const Reward_TransactionsUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.Reward_TransactionsUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema).array(),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Reward_TransactionsUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reward_TransactionsCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Reward_TransactionsUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Reward_TransactionsUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Reward_TransactionsScalarWhereInputSchema),z.lazy(() => Reward_TransactionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Redemption_HistoryUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Redemption_HistoryScalarWhereInputSchema),z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutDonatorInputSchema),z.lazy(() => SessionCreateWithoutDonatorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationsUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.ReservationsUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateWithoutDonatorInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationsUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => ReservationsUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationsScalarWhereInputSchema),z.lazy(() => ReservationsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema).array(),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Reward_TransactionsUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reward_TransactionsCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),z.lazy(() => Reward_TransactionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Reward_TransactionsUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Reward_TransactionsUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Reward_TransactionsScalarWhereInputSchema),z.lazy(() => Reward_TransactionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Redemption_HistoryScalarWhereInputSchema),z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutDonatorInputSchema),z.lazy(() => SessionCreateWithoutDonatorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationsUncheckedUpdateManyWithoutDonatorNestedInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateManyWithoutDonatorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateWithoutDonatorInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutDonatorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyDonatorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutDonatorInputSchema),z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutDonatorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationsUpdateManyWithWhereWithoutDonatorInputSchema),z.lazy(() => ReservationsUpdateManyWithWhereWithoutDonatorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationsScalarWhereInputSchema),z.lazy(() => ReservationsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DonatorsCreateNestedOneWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsCreateNestedOneWithoutReward_TransactionsInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReward_TransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutReward_TransactionsInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional()
}).strict();

export const DonatorsUpdateOneRequiredWithoutReward_TransactionsNestedInputSchema: z.ZodType<Prisma.DonatorsUpdateOneRequiredWithoutReward_TransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReward_TransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutReward_TransactionsInputSchema).optional(),
  upsert: z.lazy(() => DonatorsUpsertWithoutReward_TransactionsInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DonatorsUpdateToOneWithWhereWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUpdateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutReward_TransactionsInputSchema) ]).optional(),
}).strict();

export const DonatorsCreateNestedOneWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsCreateNestedOneWithoutRedemption_HistoryInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutRedemption_HistoryInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional()
}).strict();

export const RewardsCreateNestedOneWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsCreateNestedOneWithoutRedemption_HistoryInput> = z.object({
  create: z.union([ z.lazy(() => RewardsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RewardsCreateOrConnectWithoutRedemption_HistoryInputSchema).optional(),
  connect: z.lazy(() => RewardsWhereUniqueInputSchema).optional()
}).strict();

export const EnumRedemptionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRedemptionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RedemptionStatusSchema).optional()
}).strict();

export const DonatorsUpdateOneRequiredWithoutRedemption_HistoryNestedInputSchema: z.ZodType<Prisma.DonatorsUpdateOneRequiredWithoutRedemption_HistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutRedemption_HistoryInputSchema).optional(),
  upsert: z.lazy(() => DonatorsUpsertWithoutRedemption_HistoryInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DonatorsUpdateToOneWithWhereWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUpdateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutRedemption_HistoryInputSchema) ]).optional(),
}).strict();

export const RewardsUpdateOneRequiredWithoutRedemption_HistoryNestedInputSchema: z.ZodType<Prisma.RewardsUpdateOneRequiredWithoutRedemption_HistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => RewardsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RewardsCreateOrConnectWithoutRedemption_HistoryInputSchema).optional(),
  upsert: z.lazy(() => RewardsUpsertWithoutRedemption_HistoryInputSchema).optional(),
  connect: z.lazy(() => RewardsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RewardsUpdateToOneWithWhereWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUpdateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedUpdateWithoutRedemption_HistoryInputSchema) ]).optional(),
}).strict();

export const PlacesCreateNestedOneWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesCreateNestedOneWithoutRewardsInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutRewardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutRewardsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional()
}).strict();

export const Redemption_HistoryCreateNestedManyWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateNestedManyWithoutRewardInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyRewardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Redemption_HistoryUncheckedCreateNestedManyWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedCreateNestedManyWithoutRewardInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyRewardInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const PlacesUpdateOneRequiredWithoutRewardsNestedInputSchema: z.ZodType<Prisma.PlacesUpdateOneRequiredWithoutRewardsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutRewardsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutRewardsInputSchema).optional(),
  upsert: z.lazy(() => PlacesUpsertWithoutRewardsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlacesUpdateToOneWithWhereWithoutRewardsInputSchema),z.lazy(() => PlacesUpdateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutRewardsInputSchema) ]).optional(),
}).strict();

export const Redemption_HistoryUpdateManyWithoutRewardNestedInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateManyWithoutRewardNestedInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutRewardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyRewardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutRewardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutRewardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Redemption_HistoryScalarWhereInputSchema),z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Redemption_HistoryUncheckedUpdateManyWithoutRewardNestedInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateManyWithoutRewardNestedInput> = z.object({
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema).array(),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryCreateOrConnectWithoutRewardInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUpsertWithWhereUniqueWithoutRewardInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Redemption_HistoryCreateManyRewardInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),z.lazy(() => Redemption_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUpdateWithWhereUniqueWithoutRewardInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUpdateManyWithWhereWithoutRewardInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Redemption_HistoryScalarWhereInputSchema),z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RewardsCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => RewardsCreateWithoutPlaceInputSchema),z.lazy(() => RewardsCreateWithoutPlaceInputSchema).array(),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnnouncementsCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema).array(),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnnouncementsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Special_EventsCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Special_EventsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Medical_StaffCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema).array(),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Medical_StaffCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reservation_SlotsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema).array(),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Place_Review_HistoryCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUncheckedCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => RewardsCreateWithoutPlaceInputSchema),z.lazy(() => RewardsCreateWithoutPlaceInputSchema).array(),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema).array(),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnnouncementsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUncheckedCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Special_EventsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema).array(),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Medical_StaffCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reservation_SlotsCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInput> = z.object({
  create: z.union([ z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema).array(),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Place_Review_HistoryCreateManyPlaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RewardsUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.RewardsUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => RewardsCreateWithoutPlaceInputSchema),z.lazy(() => RewardsCreateWithoutPlaceInputSchema).array(),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RewardsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => RewardsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RewardsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => RewardsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RewardsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => RewardsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RewardsScalarWhereInputSchema),z.lazy(() => RewardsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnnouncementsUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.AnnouncementsUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema).array(),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnnouncementsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnnouncementsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnnouncementsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnnouncementsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnnouncementsScalarWhereInputSchema),z.lazy(() => AnnouncementsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Special_EventsUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Special_EventsUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Special_EventsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Special_EventsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Special_EventsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Special_EventsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Special_EventsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Special_EventsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Special_EventsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Special_EventsScalarWhereInputSchema),z.lazy(() => Special_EventsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Medical_StaffUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Medical_StaffUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema).array(),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Medical_StaffUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Medical_StaffCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Medical_StaffUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Medical_StaffUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Medical_StaffScalarWhereInputSchema),z.lazy(() => Medical_StaffScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Reservation_SlotsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reservation_SlotsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Reservation_SlotsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Reservation_SlotsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Reservation_SlotsScalarWhereInputSchema),z.lazy(() => Reservation_SlotsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema).array(),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Place_Review_HistoryUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Place_Review_HistoryCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Place_Review_HistoryUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Place_Review_HistoryUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Place_Review_HistoryScalarWhereInputSchema),z.lazy(() => Place_Review_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.RewardsUncheckedUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => RewardsCreateWithoutPlaceInputSchema),z.lazy(() => RewardsCreateWithoutPlaceInputSchema).array(),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => RewardsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RewardsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => RewardsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RewardsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RewardsWhereUniqueInputSchema),z.lazy(() => RewardsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RewardsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => RewardsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RewardsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => RewardsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RewardsScalarWhereInputSchema),z.lazy(() => RewardsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema).array(),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => AnnouncementsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AnnouncementsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AnnouncementsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AnnouncementsWhereUniqueInputSchema),z.lazy(() => AnnouncementsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AnnouncementsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AnnouncementsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AnnouncementsScalarWhereInputSchema),z.lazy(() => AnnouncementsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Special_EventsUncheckedUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Special_EventsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Special_EventsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Special_EventsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Special_EventsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Special_EventsWhereUniqueInputSchema),z.lazy(() => Special_EventsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Special_EventsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Special_EventsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Special_EventsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Special_EventsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Special_EventsScalarWhereInputSchema),z.lazy(() => Special_EventsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema).array(),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Medical_StaffCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Medical_StaffUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Medical_StaffCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Medical_StaffWhereUniqueInputSchema),z.lazy(() => Medical_StaffWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Medical_StaffUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Medical_StaffUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Medical_StaffScalarWhereInputSchema),z.lazy(() => Medical_StaffScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema).array(),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Reservation_SlotsUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Reservation_SlotsCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Reservation_SlotsUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Reservation_SlotsUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Reservation_SlotsScalarWhereInputSchema),z.lazy(() => Reservation_SlotsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema).array(),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Place_Review_HistoryUpsertWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUpsertWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Place_Review_HistoryCreateManyPlaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Place_Review_HistoryUpdateWithWhereUniqueWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUpdateWithWhereUniqueWithoutPlaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Place_Review_HistoryUpdateManyWithWhereWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUpdateManyWithWhereWithoutPlaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Place_Review_HistoryScalarWhereInputSchema),z.lazy(() => Place_Review_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlacesCreateNestedOneWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesCreateNestedOneWithoutPlace_Review_HistoryInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutPlace_Review_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutPlace_Review_HistoryInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PlacesUpdateOneRequiredWithoutPlace_Review_HistoryNestedInputSchema: z.ZodType<Prisma.PlacesUpdateOneRequiredWithoutPlace_Review_HistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutPlace_Review_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutPlace_Review_HistoryInputSchema).optional(),
  upsert: z.lazy(() => PlacesUpsertWithoutPlace_Review_HistoryInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlacesUpdateToOneWithWhereWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUpdateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutPlace_Review_HistoryInputSchema) ]).optional(),
}).strict();

export const PlacesCreateNestedOneWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesCreateNestedOneWithoutAnnouncementsInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutAnnouncementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutAnnouncementsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional()
}).strict();

export const NullableEnumBloodTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumBloodTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BloodTypeSchema).optional().nullable()
}).strict();

export const EnumPostTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPostTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PostTypeSchema).optional()
}).strict();

export const PlacesUpdateOneRequiredWithoutAnnouncementsNestedInputSchema: z.ZodType<Prisma.PlacesUpdateOneRequiredWithoutAnnouncementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutAnnouncementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutAnnouncementsInputSchema).optional(),
  upsert: z.lazy(() => PlacesUpsertWithoutAnnouncementsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlacesUpdateToOneWithWhereWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUpdateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutAnnouncementsInputSchema) ]).optional(),
}).strict();

export const PlacesCreateNestedOneWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesCreateNestedOneWithoutSpecial_EventsInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutSpecial_EventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutSpecial_EventsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional()
}).strict();

export const PlacesUpdateOneRequiredWithoutSpecial_EventsNestedInputSchema: z.ZodType<Prisma.PlacesUpdateOneRequiredWithoutSpecial_EventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutSpecial_EventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutSpecial_EventsInputSchema).optional(),
  upsert: z.lazy(() => PlacesUpsertWithoutSpecial_EventsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlacesUpdateToOneWithWhereWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUpdateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutSpecial_EventsInputSchema) ]).optional(),
}).strict();

export const PlacesCreateNestedOneWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesCreateNestedOneWithoutReservation_SlotsInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutReservation_SlotsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutReservation_SlotsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional()
}).strict();

export const ReservationsCreateNestedManyWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsCreateNestedManyWithoutReservation_SlotInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyReservation_SlotInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReservationsUncheckedCreateNestedManyWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateNestedManyWithoutReservation_SlotInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyReservation_SlotInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlacesUpdateOneRequiredWithoutReservation_SlotsNestedInputSchema: z.ZodType<Prisma.PlacesUpdateOneRequiredWithoutReservation_SlotsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutReservation_SlotsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutReservation_SlotsInputSchema).optional(),
  upsert: z.lazy(() => PlacesUpsertWithoutReservation_SlotsInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlacesUpdateToOneWithWhereWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUpdateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutReservation_SlotsInputSchema) ]).optional(),
}).strict();

export const ReservationsUpdateManyWithoutReservation_SlotNestedInputSchema: z.ZodType<Prisma.ReservationsUpdateManyWithoutReservation_SlotNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutReservation_SlotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyReservation_SlotInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutReservation_SlotInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationsUpdateManyWithWhereWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUpdateManyWithWhereWithoutReservation_SlotInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationsScalarWhereInputSchema),z.lazy(() => ReservationsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationsUncheckedUpdateManyWithoutReservation_SlotNestedInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateManyWithoutReservation_SlotNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema).array(),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsCreateOrConnectWithoutReservation_SlotInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUpsertWithWhereUniqueWithoutReservation_SlotInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReservationsCreateManyReservation_SlotInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReservationsWhereUniqueInputSchema),z.lazy(() => ReservationsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUpdateWithWhereUniqueWithoutReservation_SlotInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReservationsUpdateManyWithWhereWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUpdateManyWithWhereWithoutReservation_SlotInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReservationsScalarWhereInputSchema),z.lazy(() => ReservationsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlacesCreateNestedOneWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesCreateNestedOneWithoutMedical_StaffInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutMedical_StaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutMedical_StaffInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutMedical_StaffInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyMedical_StaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutMedical_StaffInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyMedical_StaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlacesUpdateOneRequiredWithoutMedical_StaffNestedInputSchema: z.ZodType<Prisma.PlacesUpdateOneRequiredWithoutMedical_StaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlacesCreateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutMedical_StaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlacesCreateOrConnectWithoutMedical_StaffInputSchema).optional(),
  upsert: z.lazy(() => PlacesUpsertWithoutMedical_StaffInputSchema).optional(),
  connect: z.lazy(() => PlacesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlacesUpdateToOneWithWhereWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUpdateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutMedical_StaffInputSchema) ]).optional(),
}).strict();

export const SessionUpdateManyWithoutMedical_StaffNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutMedical_StaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutMedical_StaffInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutMedical_StaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyMedical_StaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutMedical_StaffInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutMedical_StaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutMedical_StaffInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutMedical_StaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutMedical_StaffNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutMedical_StaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema),z.lazy(() => SessionCreateOrConnectWithoutMedical_StaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutMedical_StaffInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutMedical_StaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyMedical_StaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutMedical_StaffInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutMedical_StaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutMedical_StaffInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutMedical_StaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DonatorsCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional()
}).strict();

export const Medical_StaffCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Medical_StaffCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => Medical_StaffWhereUniqueInputSchema).optional()
}).strict();

export const ModeratorsCreateNestedOneWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsCreateNestedOneWithoutSessionInput> = z.object({
  create: z.union([ z.lazy(() => ModeratorsCreateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ModeratorsCreateOrConnectWithoutSessionInputSchema).optional(),
  connect: z.lazy(() => ModeratorsWhereUniqueInputSchema).optional()
}).strict();

export const DonatorsUpdateOneWithoutSessionNestedInputSchema: z.ZodType<Prisma.DonatorsUpdateOneWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => DonatorsUpsertWithoutSessionInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DonatorsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DonatorsUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => DonatorsUpdateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export const Medical_StaffUpdateOneWithoutSessionNestedInputSchema: z.ZodType<Prisma.Medical_StaffUpdateOneWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Medical_StaffCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => Medical_StaffUpsertWithoutSessionInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => Medical_StaffWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => Medical_StaffWhereInputSchema) ]).optional(),
  connect: z.lazy(() => Medical_StaffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Medical_StaffUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => Medical_StaffUpdateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export const ModeratorsUpdateOneWithoutSessionNestedInputSchema: z.ZodType<Prisma.ModeratorsUpdateOneWithoutSessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ModeratorsCreateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedCreateWithoutSessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ModeratorsCreateOrConnectWithoutSessionInputSchema).optional(),
  upsert: z.lazy(() => ModeratorsUpsertWithoutSessionInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ModeratorsWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ModeratorsWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ModeratorsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ModeratorsUpdateToOneWithWhereWithoutSessionInputSchema),z.lazy(() => ModeratorsUpdateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedUpdateWithoutSessionInputSchema) ]).optional(),
}).strict();

export const Reservation_SlotsCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateNestedOneWithoutReservationsInput> = z.object({
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Reservation_SlotsCreateOrConnectWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).optional()
}).strict();

export const Donation_HistoryCreateNestedManyWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryCreateNestedManyWithoutResevationInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyResevationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersCreateNestedManyWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateNestedManyWithoutReservationInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManyReservationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DonatorsCreateNestedOneWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsCreateNestedOneWithoutReservationsInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional()
}).strict();

export const Donation_HistoryUncheckedCreateNestedManyWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedCreateNestedManyWithoutResevationInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyResevationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutReservationInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManyReservationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumReservationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReservationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReservationStatusSchema).optional()
}).strict();

export const Reservation_SlotsUpdateOneRequiredWithoutReservationsNestedInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateOneRequiredWithoutReservationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Reservation_SlotsCreateOrConnectWithoutReservationsInputSchema).optional(),
  upsert: z.lazy(() => Reservation_SlotsUpsertWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => Reservation_SlotsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Reservation_SlotsUpdateToOneWithWhereWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUpdateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedUpdateWithoutReservationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryUpdateManyWithoutResevationNestedInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateManyWithoutResevationNestedInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutResevationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyResevationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutResevationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutResevationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Donation_HistoryScalarWhereInputSchema),z.lazy(() => Donation_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpdateManyWithoutReservationNestedInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyWithoutReservationNestedInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutReservationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManyReservationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutReservationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutReservationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DonatorsUpdateOneRequiredWithoutReservationsNestedInputSchema: z.ZodType<Prisma.DonatorsUpdateOneRequiredWithoutReservationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReservationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DonatorsCreateOrConnectWithoutReservationsInputSchema).optional(),
  upsert: z.lazy(() => DonatorsUpsertWithoutReservationsInputSchema).optional(),
  connect: z.lazy(() => DonatorsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DonatorsUpdateToOneWithWhereWithoutReservationsInputSchema),z.lazy(() => DonatorsUpdateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutReservationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryUncheckedUpdateManyWithoutResevationNestedInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateManyWithoutResevationNestedInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutResevationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutResevationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyResevationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutResevationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutResevationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Donation_HistoryScalarWhereInputSchema),z.lazy(() => Donation_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationNestedInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationNestedInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutReservationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManyReservationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutReservationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutReservationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Survey_QuestionsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateNestedOneWithoutPre_Feedback_AnswersInput> = z.object({
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_QuestionsCreateOrConnectWithoutPre_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema).optional()
}).strict();

export const Survey_ChoicesCreateNestedOneWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateNestedOneWithoutPre_Feedback_AnswersInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_ChoicesCreateOrConnectWithoutPre_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).optional()
}).strict();

export const ReservationsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsCreateNestedOneWithoutPre_Feedback_AnswersInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReservationsCreateOrConnectWithoutPre_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => ReservationsWhereUniqueInputSchema).optional()
}).strict();

export const Survey_QuestionsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_QuestionsCreateOrConnectWithoutPre_Feedback_AnswersInputSchema).optional(),
  upsert: z.lazy(() => Survey_QuestionsUpsertWithoutPre_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Survey_QuestionsUpdateToOneWithWhereWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
}).strict();

export const Survey_ChoicesUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_ChoicesCreateOrConnectWithoutPre_Feedback_AnswersInputSchema).optional(),
  upsert: z.lazy(() => Survey_ChoicesUpsertWithoutPre_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateToOneWithWhereWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
}).strict();

export const ReservationsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema: z.ZodType<Prisma.ReservationsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReservationsCreateOrConnectWithoutPre_Feedback_AnswersInputSchema).optional(),
  upsert: z.lazy(() => ReservationsUpsertWithoutPre_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => ReservationsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReservationsUpdateToOneWithWhereWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]).optional(),
}).strict();

export const Survey_QuestionsCreateNestedOneWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateNestedOneWithoutSurvey_ChoicesInput> = z.object({
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutSurvey_ChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_QuestionsCreateOrConnectWithoutSurvey_ChoicesInputSchema).optional(),
  connect: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Survey_QuestionsUpdateOneRequiredWithoutSurvey_ChoicesNestedInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateOneRequiredWithoutSurvey_ChoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutSurvey_ChoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_QuestionsCreateOrConnectWithoutSurvey_ChoicesInputSchema).optional(),
  upsert: z.lazy(() => Survey_QuestionsUpsertWithoutSurvey_ChoicesInputSchema).optional(),
  connect: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Survey_QuestionsUpdateToOneWithWhereWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUpdateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutSurvey_ChoicesInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Survey_ChoicesCreateNestedManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateNestedManyWithoutSurvey_QuestionInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Survey_ChoicesCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Survey_ChoicesUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedCreateNestedManyWithoutSurvey_QuestionInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Survey_ChoicesCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSurveyQuestionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SurveyQuestionTypeSchema).optional()
}).strict();

export const Survey_ChoicesUpdateManyWithoutSurvey_QuestionNestedInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateManyWithoutSurvey_QuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Survey_ChoicesUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Survey_ChoicesCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Survey_ChoicesUpdateManyWithWhereWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUpdateManyWithWhereWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Survey_ChoicesScalarWhereInputSchema),z.lazy(() => Survey_ChoicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Survey_ChoicesUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Survey_ChoicesCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Survey_ChoicesUpdateManyWithWhereWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUpdateManyWithWhereWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Survey_ChoicesScalarWhereInputSchema),z.lazy(() => Survey_ChoicesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReservationsCreateNestedOneWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsCreateNestedOneWithoutDonation_HistoryInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonation_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReservationsCreateOrConnectWithoutDonation_HistoryInputSchema).optional(),
  connect: z.lazy(() => ReservationsWhereUniqueInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksCreateNestedOneWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateNestedOneWithoutDonation_HistoryInput> = z.object({
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutDonation_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_Donation_FeedbacksCreateOrConnectWithoutDonation_HistoryInputSchema).optional(),
  connect: z.lazy(() => Post_Donation_FeedbacksWhereUniqueInputSchema).optional()
}).strict();

export const EnumDonationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDonationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DonationStatusSchema).optional()
}).strict();

export const ReservationsUpdateOneRequiredWithoutDonation_HistoryNestedInputSchema: z.ZodType<Prisma.ReservationsUpdateOneRequiredWithoutDonation_HistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonation_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReservationsCreateOrConnectWithoutDonation_HistoryInputSchema).optional(),
  upsert: z.lazy(() => ReservationsUpsertWithoutDonation_HistoryInputSchema).optional(),
  connect: z.lazy(() => ReservationsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReservationsUpdateToOneWithWhereWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUpdateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutDonation_HistoryInputSchema) ]).optional(),
}).strict();

export const Post_Donation_FeedbacksUpdateOneRequiredWithoutDonation_HistoryNestedInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateOneRequiredWithoutDonation_HistoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutDonation_HistoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_Donation_FeedbacksCreateOrConnectWithoutDonation_HistoryInputSchema).optional(),
  upsert: z.lazy(() => Post_Donation_FeedbacksUpsertWithoutDonation_HistoryInputSchema).optional(),
  connect: z.lazy(() => Post_Donation_FeedbacksWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Post_Donation_FeedbacksUpdateToOneWithWhereWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUpdateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedUpdateWithoutDonation_HistoryInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryCreateNestedManyWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryCreateNestedManyWithoutPost_Donation_FeedbackInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyPost_Donation_FeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersCreateNestedManyWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateNestedManyWithoutPre_Donation_FeedbackInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Donation_HistoryUncheckedCreateNestedManyWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedCreateNestedManyWithoutPost_Donation_FeedbackInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyPost_Donation_FeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedCreateNestedManyWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateNestedManyWithoutPre_Donation_FeedbackInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Donation_HistoryUpdateManyWithoutPost_Donation_FeedbackNestedInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateManyWithoutPost_Donation_FeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyPost_Donation_FeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Donation_HistoryScalarWhereInputSchema),z.lazy(() => Donation_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUpdateManyWithoutPre_Donation_FeedbackNestedInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyWithoutPre_Donation_FeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackNestedInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema).array(),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUpsertWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Donation_HistoryCreateManyPost_Donation_FeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Donation_HistoryWhereUniqueInputSchema),z.lazy(() => Donation_HistoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUpdateWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUpdateManyWithWhereWithoutPost_Donation_FeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Donation_HistoryScalarWhereInputSchema),z.lazy(() => Donation_HistoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackNestedInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema).array(),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUpsertWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUpdateManyWithWhereWithoutPre_Donation_FeedbackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Survey_QuestionsCreateNestedOneWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateNestedOneWithoutPost_Feedback_AnswersInput> = z.object({
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_QuestionsCreateOrConnectWithoutPost_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema).optional()
}).strict();

export const Survey_ChoicesCreateNestedOneWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateNestedOneWithoutPost_Feedback_AnswersInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_ChoicesCreateOrConnectWithoutPost_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksCreateNestedOneWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateNestedOneWithoutPost_Feedback_AnswersInput> = z.object({
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_Donation_FeedbacksCreateOrConnectWithoutPost_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Post_Donation_FeedbacksWhereUniqueInputSchema).optional()
}).strict();

export const Survey_QuestionsUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_QuestionsCreateOrConnectWithoutPost_Feedback_AnswersInputSchema).optional(),
  upsert: z.lazy(() => Survey_QuestionsUpsertWithoutPost_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Survey_QuestionsUpdateToOneWithWhereWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
}).strict();

export const Survey_ChoicesUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Survey_ChoicesCreateOrConnectWithoutPost_Feedback_AnswersInputSchema).optional(),
  upsert: z.lazy(() => Survey_ChoicesUpsertWithoutPost_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateToOneWithWhereWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
}).strict();

export const Post_Donation_FeedbacksUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => Post_Donation_FeedbacksCreateOrConnectWithoutPost_Feedback_AnswersInputSchema).optional(),
  upsert: z.lazy(() => Post_Donation_FeedbacksUpsertWithoutPost_Feedback_AnswersInputSchema).optional(),
  connect: z.lazy(() => Post_Donation_FeedbacksWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => Post_Donation_FeedbacksUpdateToOneWithWhereWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutModeratorInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutModeratorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutModeratorInputSchema),z.lazy(() => SessionCreateWithoutModeratorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyModeratorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutModeratorInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutModeratorInputSchema),z.lazy(() => SessionCreateWithoutModeratorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyModeratorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutModeratorNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutModeratorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutModeratorInputSchema),z.lazy(() => SessionCreateWithoutModeratorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutModeratorInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutModeratorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyModeratorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutModeratorInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutModeratorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutModeratorInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutModeratorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutModeratorNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutModeratorNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutModeratorInputSchema),z.lazy(() => SessionCreateWithoutModeratorInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema),z.lazy(() => SessionCreateOrConnectWithoutModeratorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutModeratorInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutModeratorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyModeratorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutModeratorInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutModeratorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutModeratorInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutModeratorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
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

export const NestedEnumBloodTypeFilterSchema: z.ZodType<Prisma.NestedEnumBloodTypeFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional(),
  in: z.lazy(() => BloodTypeSchema).array().optional(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAccountStatusFilterSchema: z.ZodType<Prisma.NestedEnumAccountStatusFilter> = z.object({
  equals: z.lazy(() => AccountStatusSchema).optional(),
  in: z.lazy(() => AccountStatusSchema).array().optional(),
  notIn: z.lazy(() => AccountStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => NestedEnumAccountStatusFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const NestedEnumBloodTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBloodTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional(),
  in: z.lazy(() => BloodTypeSchema).array().optional(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBloodTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBloodTypeFilterSchema).optional()
}).strict();

export const NestedEnumAccountStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAccountStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccountStatusSchema).optional(),
  in: z.lazy(() => AccountStatusSchema).array().optional(),
  notIn: z.lazy(() => AccountStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => NestedEnumAccountStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccountStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccountStatusFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
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

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
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

export const NestedEnumRedemptionStatusFilterSchema: z.ZodType<Prisma.NestedEnumRedemptionStatusFilter> = z.object({
  equals: z.lazy(() => RedemptionStatusSchema).optional(),
  in: z.lazy(() => RedemptionStatusSchema).array().optional(),
  notIn: z.lazy(() => RedemptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => NestedEnumRedemptionStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRedemptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRedemptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RedemptionStatusSchema).optional(),
  in: z.lazy(() => RedemptionStatusSchema).array().optional(),
  notIn: z.lazy(() => RedemptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => NestedEnumRedemptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRedemptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRedemptionStatusFilterSchema).optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
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

export const NestedEnumBloodTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumBloodTypeNullableFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional().nullable(),
  in: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumPostTypeFilterSchema: z.ZodType<Prisma.NestedEnumPostTypeFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBloodTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBloodTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BloodTypeSchema).optional().nullable(),
  in: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => BloodTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NestedEnumBloodTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBloodTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBloodTypeNullableFilterSchema).optional()
}).strict();

export const NestedEnumPostTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPostTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPostTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPostTypeFilterSchema).optional()
}).strict();

export const NestedEnumReservationStatusFilterSchema: z.ZodType<Prisma.NestedEnumReservationStatusFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReservationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReservationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReservationStatusSchema).optional(),
  in: z.lazy(() => ReservationStatusSchema).array().optional(),
  notIn: z.lazy(() => ReservationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => NestedEnumReservationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReservationStatusFilterSchema).optional()
}).strict();

export const NestedEnumSurveyQuestionTypeFilterSchema: z.ZodType<Prisma.NestedEnumSurveyQuestionTypeFilter> = z.object({
  equals: z.lazy(() => SurveyQuestionTypeSchema).optional(),
  in: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => NestedEnumSurveyQuestionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSurveyQuestionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSurveyQuestionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SurveyQuestionTypeSchema).optional(),
  in: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => SurveyQuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => NestedEnumSurveyQuestionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSurveyQuestionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSurveyQuestionTypeFilterSchema).optional()
}).strict();

export const NestedEnumDonationStatusFilterSchema: z.ZodType<Prisma.NestedEnumDonationStatusFilter> = z.object({
  equals: z.lazy(() => DonationStatusSchema).optional(),
  in: z.lazy(() => DonationStatusSchema).array().optional(),
  notIn: z.lazy(() => DonationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => NestedEnumDonationStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDonationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDonationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DonationStatusSchema).optional(),
  in: z.lazy(() => DonationStatusSchema).array().optional(),
  notIn: z.lazy(() => DonationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => NestedEnumDonationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDonationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDonationStatusFilterSchema).optional()
}).strict();

export const DonatorsCreateWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsCreateWithoutMedical_AccountInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUncheckedCreateWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateWithoutMedical_AccountInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsCreateOrConnectWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsCreateOrConnectWithoutMedical_AccountInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema) ]),
}).strict();

export const DonatorsCreateManyMedical_AccountInputEnvelopeSchema: z.ZodType<Prisma.DonatorsCreateManyMedical_AccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DonatorsCreateManyMedical_AccountInputSchema),z.lazy(() => DonatorsCreateManyMedical_AccountInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DonatorsUpsertWithWhereUniqueWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUpsertWithWhereUniqueWithoutMedical_AccountInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DonatorsUpdateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutMedical_AccountInputSchema) ]),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutMedical_AccountInputSchema) ]),
}).strict();

export const DonatorsUpdateWithWhereUniqueWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUpdateWithWhereUniqueWithoutMedical_AccountInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DonatorsUpdateWithoutMedical_AccountInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutMedical_AccountInputSchema) ]),
}).strict();

export const DonatorsUpdateManyWithWhereWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUpdateManyWithWhereWithoutMedical_AccountInput> = z.object({
  where: z.lazy(() => DonatorsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DonatorsUpdateManyMutationInputSchema),z.lazy(() => DonatorsUncheckedUpdateManyWithoutMedical_AccountInputSchema) ]),
}).strict();

export const DonatorsScalarWhereInputSchema: z.ZodType<Prisma.DonatorsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DonatorsScalarWhereInputSchema),z.lazy(() => DonatorsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonatorsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonatorsScalarWhereInputSchema),z.lazy(() => DonatorsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  medical_account_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  dob: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward_point: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const Medical_AccountsCreateWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsCreateWithoutDonatorsInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema),
  account_status: z.lazy(() => AccountStatusSchema),
  is_activated: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Medical_AccountsUncheckedCreateWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsUncheckedCreateWithoutDonatorsInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema),
  account_status: z.lazy(() => AccountStatusSchema),
  is_activated: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Medical_AccountsCreateOrConnectWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsCreateOrConnectWithoutDonatorsInput> = z.object({
  where: z.lazy(() => Medical_AccountsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Medical_AccountsCreateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedCreateWithoutDonatorsInputSchema) ]),
}).strict();

export const Reward_TransactionsCreateWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Reward_TransactionsCreateOrConnectWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsCreateOrConnectWithoutDonatorInput> = z.object({
  where: z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const Reward_TransactionsCreateManyDonatorInputEnvelopeSchema: z.ZodType<Prisma.Reward_TransactionsCreateManyDonatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Reward_TransactionsCreateManyDonatorInputSchema),z.lazy(() => Reward_TransactionsCreateManyDonatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Redemption_HistoryCreateWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward: z.lazy(() => RewardsCreateNestedOneWithoutRedemption_HistoryInputSchema)
}).strict();

export const Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  reward_id: z.string()
}).strict();

export const Redemption_HistoryCreateOrConnectWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateOrConnectWithoutDonatorInput> = z.object({
  where: z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const Redemption_HistoryCreateManyDonatorInputEnvelopeSchema: z.ZodType<Prisma.Redemption_HistoryCreateManyDonatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Redemption_HistoryCreateManyDonatorInputSchema),z.lazy(() => Redemption_HistoryCreateManyDonatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutDonatorInputSchema: z.ZodType<Prisma.SessionCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedOneWithoutSessionInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsCreateNestedOneWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  moderator_id: z.string().optional().nullable(),
  medical_staff_id: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutDonatorInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutDonatorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const SessionCreateManyDonatorInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyDonatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyDonatorInputSchema),z.lazy(() => SessionCreateManyDonatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReservationsCreateWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsCreateNestedOneWithoutReservationsInputSchema),
  Donation_History: z.lazy(() => Donation_HistoryCreateNestedManyWithoutResevationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutReservationInputSchema).optional()
}).strict();

export const ReservationsUncheckedCreateWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateWithoutDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  reservation_slot_id: z.string(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedCreateNestedManyWithoutResevationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutReservationInputSchema).optional()
}).strict();

export const ReservationsCreateOrConnectWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsCreateOrConnectWithoutDonatorInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const ReservationsCreateManyDonatorInputEnvelopeSchema: z.ZodType<Prisma.ReservationsCreateManyDonatorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationsCreateManyDonatorInputSchema),z.lazy(() => ReservationsCreateManyDonatorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Medical_AccountsUpsertWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsUpsertWithoutDonatorsInput> = z.object({
  update: z.union([ z.lazy(() => Medical_AccountsUpdateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedUpdateWithoutDonatorsInputSchema) ]),
  create: z.union([ z.lazy(() => Medical_AccountsCreateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedCreateWithoutDonatorsInputSchema) ]),
  where: z.lazy(() => Medical_AccountsWhereInputSchema).optional()
}).strict();

export const Medical_AccountsUpdateToOneWithWhereWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsUpdateToOneWithWhereWithoutDonatorsInput> = z.object({
  where: z.lazy(() => Medical_AccountsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Medical_AccountsUpdateWithoutDonatorsInputSchema),z.lazy(() => Medical_AccountsUncheckedUpdateWithoutDonatorsInputSchema) ]),
}).strict();

export const Medical_AccountsUpdateWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsUpdateWithoutDonatorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => EnumAccountStatusFieldUpdateOperationsInputSchema) ]).optional(),
  is_activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Medical_AccountsUncheckedUpdateWithoutDonatorsInputSchema: z.ZodType<Prisma.Medical_AccountsUncheckedUpdateWithoutDonatorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  account_status: z.union([ z.lazy(() => AccountStatusSchema),z.lazy(() => EnumAccountStatusFieldUpdateOperationsInputSchema) ]).optional(),
  is_activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsUpsertWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUpsertWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Reward_TransactionsUpdateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedUpdateWithoutDonatorInputSchema) ]),
  create: z.union([ z.lazy(() => Reward_TransactionsCreateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const Reward_TransactionsUpdateWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUpdateWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => Reward_TransactionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Reward_TransactionsUpdateWithoutDonatorInputSchema),z.lazy(() => Reward_TransactionsUncheckedUpdateWithoutDonatorInputSchema) ]),
}).strict();

export const Reward_TransactionsUpdateManyWithWhereWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUpdateManyWithWhereWithoutDonatorInput> = z.object({
  where: z.lazy(() => Reward_TransactionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Reward_TransactionsUpdateManyMutationInputSchema),z.lazy(() => Reward_TransactionsUncheckedUpdateManyWithoutDonatorInputSchema) ]),
}).strict();

export const Reward_TransactionsScalarWhereInputSchema: z.ZodType<Prisma.Reward_TransactionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Reward_TransactionsScalarWhereInputSchema),z.lazy(() => Reward_TransactionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reward_TransactionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reward_TransactionsScalarWhereInputSchema),z.lazy(() => Reward_TransactionsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const Redemption_HistoryUpsertWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUpsertWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Redemption_HistoryUpdateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedUpdateWithoutDonatorInputSchema) ]),
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const Redemption_HistoryUpdateWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Redemption_HistoryUpdateWithoutDonatorInputSchema),z.lazy(() => Redemption_HistoryUncheckedUpdateWithoutDonatorInputSchema) ]),
}).strict();

export const Redemption_HistoryUpdateManyWithWhereWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateManyWithWhereWithoutDonatorInput> = z.object({
  where: z.lazy(() => Redemption_HistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Redemption_HistoryUpdateManyMutationInputSchema),z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutDonatorInputSchema) ]),
}).strict();

export const Redemption_HistoryScalarWhereInputSchema: z.ZodType<Prisma.Redemption_HistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Redemption_HistoryScalarWhereInputSchema),z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Redemption_HistoryScalarWhereInputSchema),z.lazy(() => Redemption_HistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumRedemptionStatusFilterSchema),z.lazy(() => RedemptionStatusSchema) ]).optional(),
  used_points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  redeem_amount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutDonatorInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutDonatorInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutDonatorInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutDonatorInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutDonatorInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  moderator_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  donator_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  medical_staff_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ReservationsUpsertWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUpsertWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationsUpdateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutDonatorInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonatorInputSchema) ]),
}).strict();

export const ReservationsUpdateWithWhereUniqueWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUpdateWithWhereUniqueWithoutDonatorInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationsUpdateWithoutDonatorInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutDonatorInputSchema) ]),
}).strict();

export const ReservationsUpdateManyWithWhereWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUpdateManyWithWhereWithoutDonatorInput> = z.object({
  where: z.lazy(() => ReservationsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationsUpdateManyMutationInputSchema),z.lazy(() => ReservationsUncheckedUpdateManyWithoutDonatorInputSchema) ]),
}).strict();

export const ReservationsScalarWhereInputSchema: z.ZodType<Prisma.ReservationsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReservationsScalarWhereInputSchema),z.lazy(() => ReservationsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReservationsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReservationsScalarWhereInputSchema),z.lazy(() => ReservationsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReservationStatusFilterSchema),z.lazy(() => ReservationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_slot_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  donator_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DonatorsCreateWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsCreateWithoutReward_TransactionsInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsCreateNestedOneWithoutDonatorsInputSchema),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUncheckedCreateWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateWithoutReward_TransactionsInput> = z.object({
  id: z.string().cuid().optional(),
  medical_account_id: z.string(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsCreateOrConnectWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsCreateOrConnectWithoutReward_TransactionsInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReward_TransactionsInputSchema) ]),
}).strict();

export const DonatorsUpsertWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsUpsertWithoutReward_TransactionsInput> = z.object({
  update: z.union([ z.lazy(() => DonatorsUpdateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutReward_TransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReward_TransactionsInputSchema) ]),
  where: z.lazy(() => DonatorsWhereInputSchema).optional()
}).strict();

export const DonatorsUpdateToOneWithWhereWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsUpdateToOneWithWhereWithoutReward_TransactionsInput> = z.object({
  where: z.lazy(() => DonatorsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DonatorsUpdateWithoutReward_TransactionsInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutReward_TransactionsInputSchema) ]),
}).strict();

export const DonatorsUpdateWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsUpdateWithoutReward_TransactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateWithoutReward_TransactionsInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateWithoutReward_TransactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medical_account_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsCreateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsCreateWithoutRedemption_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsCreateNestedOneWithoutDonatorsInputSchema),
  Reward_Transactions: z.lazy(() => Reward_TransactionsCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUncheckedCreateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateWithoutRedemption_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  medical_account_id: z.string(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsCreateOrConnectWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsCreateOrConnectWithoutRedemption_HistoryInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]),
}).strict();

export const RewardsCreateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsCreateWithoutRedemption_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutRewardsInputSchema)
}).strict();

export const RewardsUncheckedCreateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsUncheckedCreateWithoutRedemption_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const RewardsCreateOrConnectWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsCreateOrConnectWithoutRedemption_HistoryInput> = z.object({
  where: z.lazy(() => RewardsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RewardsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]),
}).strict();

export const DonatorsUpsertWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsUpsertWithoutRedemption_HistoryInput> = z.object({
  update: z.union([ z.lazy(() => DonatorsUpdateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutRedemption_HistoryInputSchema) ]),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]),
  where: z.lazy(() => DonatorsWhereInputSchema).optional()
}).strict();

export const DonatorsUpdateToOneWithWhereWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsUpdateToOneWithWhereWithoutRedemption_HistoryInput> = z.object({
  where: z.lazy(() => DonatorsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DonatorsUpdateWithoutRedemption_HistoryInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutRedemption_HistoryInputSchema) ]),
}).strict();

export const DonatorsUpdateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsUpdateWithoutRedemption_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInputSchema).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateWithoutRedemption_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medical_account_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const RewardsUpsertWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsUpsertWithoutRedemption_HistoryInput> = z.object({
  update: z.union([ z.lazy(() => RewardsUpdateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedUpdateWithoutRedemption_HistoryInputSchema) ]),
  create: z.union([ z.lazy(() => RewardsCreateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutRedemption_HistoryInputSchema) ]),
  where: z.lazy(() => RewardsWhereInputSchema).optional()
}).strict();

export const RewardsUpdateToOneWithWhereWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsUpdateToOneWithWhereWithoutRedemption_HistoryInput> = z.object({
  where: z.lazy(() => RewardsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RewardsUpdateWithoutRedemption_HistoryInputSchema),z.lazy(() => RewardsUncheckedUpdateWithoutRedemption_HistoryInputSchema) ]),
}).strict();

export const RewardsUpdateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsUpdateWithoutRedemption_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutRewardsNestedInputSchema).optional()
}).strict();

export const RewardsUncheckedUpdateWithoutRedemption_HistoryInputSchema: z.ZodType<Prisma.RewardsUncheckedUpdateWithoutRedemption_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlacesCreateWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesCreateWithoutRewardsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Announcements: z.lazy(() => AnnouncementsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateWithoutRewardsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Announcements: z.lazy(() => AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesCreateOrConnectWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesCreateOrConnectWithoutRewardsInput> = z.object({
  where: z.lazy(() => PlacesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlacesCreateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutRewardsInputSchema) ]),
}).strict();

export const Redemption_HistoryCreateWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateWithoutRewardInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutRedemption_HistoryInputSchema)
}).strict();

export const Redemption_HistoryUncheckedCreateWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedCreateWithoutRewardInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string()
}).strict();

export const Redemption_HistoryCreateOrConnectWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateOrConnectWithoutRewardInput> = z.object({
  where: z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema) ]),
}).strict();

export const Redemption_HistoryCreateManyRewardInputEnvelopeSchema: z.ZodType<Prisma.Redemption_HistoryCreateManyRewardInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Redemption_HistoryCreateManyRewardInputSchema),z.lazy(() => Redemption_HistoryCreateManyRewardInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PlacesUpsertWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesUpsertWithoutRewardsInput> = z.object({
  update: z.union([ z.lazy(() => PlacesUpdateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutRewardsInputSchema) ]),
  create: z.union([ z.lazy(() => PlacesCreateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutRewardsInputSchema) ]),
  where: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const PlacesUpdateToOneWithWhereWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesUpdateToOneWithWhereWithoutRewardsInput> = z.object({
  where: z.lazy(() => PlacesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlacesUpdateWithoutRewardsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutRewardsInputSchema) ]),
}).strict();

export const PlacesUpdateWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesUpdateWithoutRewardsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Announcements: z.lazy(() => AnnouncementsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateWithoutRewardsInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateWithoutRewardsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Announcements: z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const Redemption_HistoryUpsertWithWhereUniqueWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUpsertWithWhereUniqueWithoutRewardInput> = z.object({
  where: z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Redemption_HistoryUpdateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedUpdateWithoutRewardInputSchema) ]),
  create: z.union([ z.lazy(() => Redemption_HistoryCreateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedCreateWithoutRewardInputSchema) ]),
}).strict();

export const Redemption_HistoryUpdateWithWhereUniqueWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateWithWhereUniqueWithoutRewardInput> = z.object({
  where: z.lazy(() => Redemption_HistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Redemption_HistoryUpdateWithoutRewardInputSchema),z.lazy(() => Redemption_HistoryUncheckedUpdateWithoutRewardInputSchema) ]),
}).strict();

export const Redemption_HistoryUpdateManyWithWhereWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateManyWithWhereWithoutRewardInput> = z.object({
  where: z.lazy(() => Redemption_HistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Redemption_HistoryUpdateManyMutationInputSchema),z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutRewardInputSchema) ]),
}).strict();

export const RewardsCreateWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutRewardInputSchema).optional()
}).strict();

export const RewardsUncheckedCreateWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUncheckedCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutRewardInputSchema).optional()
}).strict();

export const RewardsCreateOrConnectWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsCreateOrConnectWithoutPlaceInput> = z.object({
  where: z.lazy(() => RewardsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RewardsCreateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const RewardsCreateManyPlaceInputEnvelopeSchema: z.ZodType<Prisma.RewardsCreateManyPlaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RewardsCreateManyPlaceInputSchema),z.lazy(() => RewardsCreateManyPlaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AnnouncementsCreateWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema).optional().nullable(),
  post_type: z.lazy(() => PostTypeSchema),
  title: z.string(),
  content: z.string(),
  image_src: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const AnnouncementsUncheckedCreateWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema).optional().nullable(),
  post_type: z.lazy(() => PostTypeSchema),
  title: z.string(),
  content: z.string(),
  image_src: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const AnnouncementsCreateOrConnectWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsCreateOrConnectWithoutPlaceInput> = z.object({
  where: z.lazy(() => AnnouncementsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const AnnouncementsCreateManyPlaceInputEnvelopeSchema: z.ZodType<Prisma.AnnouncementsCreateManyPlaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AnnouncementsCreateManyPlaceInputSchema),z.lazy(() => AnnouncementsCreateManyPlaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Special_EventsCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const Special_EventsUncheckedCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUncheckedCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const Special_EventsCreateOrConnectWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsCreateOrConnectWithoutPlaceInput> = z.object({
  where: z.lazy(() => Special_EventsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Special_EventsCreateManyPlaceInputEnvelopeSchema: z.ZodType<Prisma.Special_EventsCreateManyPlaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Special_EventsCreateManyPlaceInputSchema),z.lazy(() => Special_EventsCreateManyPlaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Medical_StaffCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutMedical_StaffInputSchema).optional()
}).strict();

export const Medical_StaffUncheckedCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutMedical_StaffInputSchema).optional()
}).strict();

export const Medical_StaffCreateOrConnectWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffCreateOrConnectWithoutPlaceInput> = z.object({
  where: z.lazy(() => Medical_StaffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Medical_StaffCreateManyPlaceInputEnvelopeSchema: z.ZodType<Prisma.Medical_StaffCreateManyPlaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Medical_StaffCreateManyPlaceInputSchema),z.lazy(() => Medical_StaffCreateManyPlaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Reservation_SlotsCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutReservation_SlotInputSchema).optional()
}).strict();

export const Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutReservation_SlotInputSchema).optional()
}).strict();

export const Reservation_SlotsCreateOrConnectWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateOrConnectWithoutPlaceInput> = z.object({
  where: z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Reservation_SlotsCreateManyPlaceInputEnvelopeSchema: z.ZodType<Prisma.Reservation_SlotsCreateManyPlaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Reservation_SlotsCreateManyPlaceInputSchema),z.lazy(() => Reservation_SlotsCreateManyPlaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Place_Review_HistoryCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedCreateWithoutPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const Place_Review_HistoryCreateOrConnectWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryCreateOrConnectWithoutPlaceInput> = z.object({
  where: z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Place_Review_HistoryCreateManyPlaceInputEnvelopeSchema: z.ZodType<Prisma.Place_Review_HistoryCreateManyPlaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Place_Review_HistoryCreateManyPlaceInputSchema),z.lazy(() => Place_Review_HistoryCreateManyPlaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RewardsUpsertWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUpsertWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => RewardsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RewardsUpdateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedUpdateWithoutPlaceInputSchema) ]),
  create: z.union([ z.lazy(() => RewardsCreateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const RewardsUpdateWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUpdateWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => RewardsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RewardsUpdateWithoutPlaceInputSchema),z.lazy(() => RewardsUncheckedUpdateWithoutPlaceInputSchema) ]),
}).strict();

export const RewardsUpdateManyWithWhereWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUpdateManyWithWhereWithoutPlaceInput> = z.object({
  where: z.lazy(() => RewardsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RewardsUpdateManyMutationInputSchema),z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceInputSchema) ]),
}).strict();

export const RewardsScalarWhereInputSchema: z.ZodType<Prisma.RewardsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RewardsScalarWhereInputSchema),z.lazy(() => RewardsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RewardsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RewardsScalarWhereInputSchema),z.lazy(() => RewardsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  required_points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_available: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  amount_left: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AnnouncementsUpsertWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUpsertWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => AnnouncementsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AnnouncementsUpdateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedUpdateWithoutPlaceInputSchema) ]),
  create: z.union([ z.lazy(() => AnnouncementsCreateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const AnnouncementsUpdateWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUpdateWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => AnnouncementsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AnnouncementsUpdateWithoutPlaceInputSchema),z.lazy(() => AnnouncementsUncheckedUpdateWithoutPlaceInputSchema) ]),
}).strict();

export const AnnouncementsUpdateManyWithWhereWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUpdateManyWithWhereWithoutPlaceInput> = z.object({
  where: z.lazy(() => AnnouncementsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AnnouncementsUpdateManyMutationInputSchema),z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceInputSchema) ]),
}).strict();

export const AnnouncementsScalarWhereInputSchema: z.ZodType<Prisma.AnnouncementsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AnnouncementsScalarWhereInputSchema),z.lazy(() => AnnouncementsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AnnouncementsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AnnouncementsScalarWhereInputSchema),z.lazy(() => AnnouncementsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeNullableFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => EnumPostTypeFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_src: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Special_EventsUpsertWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUpsertWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Special_EventsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Special_EventsUpdateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedUpdateWithoutPlaceInputSchema) ]),
  create: z.union([ z.lazy(() => Special_EventsCreateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Special_EventsUpdateWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUpdateWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Special_EventsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Special_EventsUpdateWithoutPlaceInputSchema),z.lazy(() => Special_EventsUncheckedUpdateWithoutPlaceInputSchema) ]),
}).strict();

export const Special_EventsUpdateManyWithWhereWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUpdateManyWithWhereWithoutPlaceInput> = z.object({
  where: z.lazy(() => Special_EventsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Special_EventsUpdateManyMutationInputSchema),z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceInputSchema) ]),
}).strict();

export const Special_EventsScalarWhereInputSchema: z.ZodType<Prisma.Special_EventsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Special_EventsScalarWhereInputSchema),z.lazy(() => Special_EventsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Special_EventsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Special_EventsScalarWhereInputSchema),z.lazy(() => Special_EventsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Medical_StaffUpsertWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUpsertWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Medical_StaffWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Medical_StaffUpdateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedUpdateWithoutPlaceInputSchema) ]),
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Medical_StaffUpdateWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUpdateWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Medical_StaffWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Medical_StaffUpdateWithoutPlaceInputSchema),z.lazy(() => Medical_StaffUncheckedUpdateWithoutPlaceInputSchema) ]),
}).strict();

export const Medical_StaffUpdateManyWithWhereWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUpdateManyWithWhereWithoutPlaceInput> = z.object({
  where: z.lazy(() => Medical_StaffScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Medical_StaffUpdateManyMutationInputSchema),z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceInputSchema) ]),
}).strict();

export const Medical_StaffScalarWhereInputSchema: z.ZodType<Prisma.Medical_StaffScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Medical_StaffScalarWhereInputSchema),z.lazy(() => Medical_StaffScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Medical_StaffScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Medical_StaffScalarWhereInputSchema),z.lazy(() => Medical_StaffScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Reservation_SlotsUpsertWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUpsertWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Reservation_SlotsUpdateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedUpdateWithoutPlaceInputSchema) ]),
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Reservation_SlotsUpdateWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Reservation_SlotsUpdateWithoutPlaceInputSchema),z.lazy(() => Reservation_SlotsUncheckedUpdateWithoutPlaceInputSchema) ]),
}).strict();

export const Reservation_SlotsUpdateManyWithWhereWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateManyWithWhereWithoutPlaceInput> = z.object({
  where: z.lazy(() => Reservation_SlotsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Reservation_SlotsUpdateManyMutationInputSchema),z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceInputSchema) ]),
}).strict();

export const Reservation_SlotsScalarWhereInputSchema: z.ZodType<Prisma.Reservation_SlotsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Reservation_SlotsScalarWhereInputSchema),z.lazy(() => Reservation_SlotsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Reservation_SlotsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Reservation_SlotsScalarWhereInputSchema),z.lazy(() => Reservation_SlotsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reserve_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reserve_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  cancelled_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Place_Review_HistoryUpsertWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpsertWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Place_Review_HistoryUpdateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedUpdateWithoutPlaceInputSchema) ]),
  create: z.union([ z.lazy(() => Place_Review_HistoryCreateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedCreateWithoutPlaceInputSchema) ]),
}).strict();

export const Place_Review_HistoryUpdateWithWhereUniqueWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateWithWhereUniqueWithoutPlaceInput> = z.object({
  where: z.lazy(() => Place_Review_HistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Place_Review_HistoryUpdateWithoutPlaceInputSchema),z.lazy(() => Place_Review_HistoryUncheckedUpdateWithoutPlaceInputSchema) ]),
}).strict();

export const Place_Review_HistoryUpdateManyWithWhereWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateManyWithWhereWithoutPlaceInput> = z.object({
  where: z.lazy(() => Place_Review_HistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Place_Review_HistoryUpdateManyMutationInputSchema),z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceInputSchema) ]),
}).strict();

export const Place_Review_HistoryScalarWhereInputSchema: z.ZodType<Prisma.Place_Review_HistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Place_Review_HistoryScalarWhereInputSchema),z.lazy(() => Place_Review_HistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Place_Review_HistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Place_Review_HistoryScalarWhereInputSchema),z.lazy(() => Place_Review_HistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PlacesCreateWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesCreateWithoutPlace_Review_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateWithoutPlace_Review_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesCreateOrConnectWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesCreateOrConnectWithoutPlace_Review_HistoryInput> = z.object({
  where: z.lazy(() => PlacesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlacesCreateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutPlace_Review_HistoryInputSchema) ]),
}).strict();

export const PlacesUpsertWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesUpsertWithoutPlace_Review_HistoryInput> = z.object({
  update: z.union([ z.lazy(() => PlacesUpdateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutPlace_Review_HistoryInputSchema) ]),
  create: z.union([ z.lazy(() => PlacesCreateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutPlace_Review_HistoryInputSchema) ]),
  where: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const PlacesUpdateToOneWithWhereWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesUpdateToOneWithWhereWithoutPlace_Review_HistoryInput> = z.object({
  where: z.lazy(() => PlacesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlacesUpdateWithoutPlace_Review_HistoryInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutPlace_Review_HistoryInputSchema) ]),
}).strict();

export const PlacesUpdateWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesUpdateWithoutPlace_Review_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateWithoutPlace_Review_HistoryInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateWithoutPlace_Review_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesCreateWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesCreateWithoutAnnouncementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateWithoutAnnouncementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesCreateOrConnectWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesCreateOrConnectWithoutAnnouncementsInput> = z.object({
  where: z.lazy(() => PlacesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlacesCreateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutAnnouncementsInputSchema) ]),
}).strict();

export const PlacesUpsertWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesUpsertWithoutAnnouncementsInput> = z.object({
  update: z.union([ z.lazy(() => PlacesUpdateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutAnnouncementsInputSchema) ]),
  create: z.union([ z.lazy(() => PlacesCreateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutAnnouncementsInputSchema) ]),
  where: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const PlacesUpdateToOneWithWhereWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesUpdateToOneWithWhereWithoutAnnouncementsInput> = z.object({
  where: z.lazy(() => PlacesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlacesUpdateWithoutAnnouncementsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutAnnouncementsInputSchema) ]),
}).strict();

export const PlacesUpdateWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesUpdateWithoutAnnouncementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateWithoutAnnouncementsInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateWithoutAnnouncementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesCreateWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesCreateWithoutSpecial_EventsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateWithoutSpecial_EventsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesCreateOrConnectWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesCreateOrConnectWithoutSpecial_EventsInput> = z.object({
  where: z.lazy(() => PlacesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlacesCreateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutSpecial_EventsInputSchema) ]),
}).strict();

export const PlacesUpsertWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesUpsertWithoutSpecial_EventsInput> = z.object({
  update: z.union([ z.lazy(() => PlacesUpdateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutSpecial_EventsInputSchema) ]),
  create: z.union([ z.lazy(() => PlacesCreateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutSpecial_EventsInputSchema) ]),
  where: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const PlacesUpdateToOneWithWhereWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesUpdateToOneWithWhereWithoutSpecial_EventsInput> = z.object({
  where: z.lazy(() => PlacesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlacesUpdateWithoutSpecial_EventsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutSpecial_EventsInputSchema) ]),
}).strict();

export const PlacesUpdateWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesUpdateWithoutSpecial_EventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateWithoutSpecial_EventsInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateWithoutSpecial_EventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesCreateWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesCreateWithoutReservation_SlotsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateWithoutReservation_SlotsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesCreateOrConnectWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesCreateOrConnectWithoutReservation_SlotsInput> = z.object({
  where: z.lazy(() => PlacesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlacesCreateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutReservation_SlotsInputSchema) ]),
}).strict();

export const ReservationsCreateWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsCreateWithoutReservation_SlotInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  Donation_History: z.lazy(() => Donation_HistoryCreateNestedManyWithoutResevationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutReservationInputSchema).optional(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationsUncheckedCreateWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateWithoutReservation_SlotInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedCreateNestedManyWithoutResevationInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutReservationInputSchema).optional()
}).strict();

export const ReservationsCreateOrConnectWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsCreateOrConnectWithoutReservation_SlotInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema) ]),
}).strict();

export const ReservationsCreateManyReservation_SlotInputEnvelopeSchema: z.ZodType<Prisma.ReservationsCreateManyReservation_SlotInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReservationsCreateManyReservation_SlotInputSchema),z.lazy(() => ReservationsCreateManyReservation_SlotInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PlacesUpsertWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesUpsertWithoutReservation_SlotsInput> = z.object({
  update: z.union([ z.lazy(() => PlacesUpdateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutReservation_SlotsInputSchema) ]),
  create: z.union([ z.lazy(() => PlacesCreateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutReservation_SlotsInputSchema) ]),
  where: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const PlacesUpdateToOneWithWhereWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesUpdateToOneWithWhereWithoutReservation_SlotsInput> = z.object({
  where: z.lazy(() => PlacesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlacesUpdateWithoutReservation_SlotsInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutReservation_SlotsInputSchema) ]),
}).strict();

export const PlacesUpdateWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesUpdateWithoutReservation_SlotsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateWithoutReservation_SlotsInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateWithoutReservation_SlotsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const ReservationsUpsertWithWhereUniqueWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUpsertWithWhereUniqueWithoutReservation_SlotInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReservationsUpdateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutReservation_SlotInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutReservation_SlotInputSchema) ]),
}).strict();

export const ReservationsUpdateWithWhereUniqueWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUpdateWithWhereUniqueWithoutReservation_SlotInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReservationsUpdateWithoutReservation_SlotInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutReservation_SlotInputSchema) ]),
}).strict();

export const ReservationsUpdateManyWithWhereWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUpdateManyWithWhereWithoutReservation_SlotInput> = z.object({
  where: z.lazy(() => ReservationsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReservationsUpdateManyMutationInputSchema),z.lazy(() => ReservationsUncheckedUpdateManyWithoutReservation_SlotInputSchema) ]),
}).strict();

export const PlacesCreateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesCreateWithoutMedical_StaffInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesUncheckedCreateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesUncheckedCreateWithoutMedical_StaffInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  image_src: z.string().optional().nullable(),
  icon_src: z.string().optional().nullable(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  address: z.string(),
  opening_day: z.string(),
  opening_time: z.number(),
  closing_time: z.number(),
  is_available: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedCreateNestedManyWithoutPlaceInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedCreateNestedManyWithoutPlaceInputSchema).optional()
}).strict();

export const PlacesCreateOrConnectWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesCreateOrConnectWithoutMedical_StaffInput> = z.object({
  where: z.lazy(() => PlacesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlacesCreateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutMedical_StaffInputSchema) ]),
}).strict();

export const SessionCreateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionCreateWithoutMedical_StaffInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutSessionInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsCreateNestedOneWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutMedical_StaffInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  moderator_id: z.string().optional().nullable(),
  donator_id: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutMedical_StaffInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema) ]),
}).strict();

export const SessionCreateManyMedical_StaffInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyMedical_StaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyMedical_StaffInputSchema),z.lazy(() => SessionCreateManyMedical_StaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PlacesUpsertWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesUpsertWithoutMedical_StaffInput> = z.object({
  update: z.union([ z.lazy(() => PlacesUpdateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutMedical_StaffInputSchema) ]),
  create: z.union([ z.lazy(() => PlacesCreateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedCreateWithoutMedical_StaffInputSchema) ]),
  where: z.lazy(() => PlacesWhereInputSchema).optional()
}).strict();

export const PlacesUpdateToOneWithWhereWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesUpdateToOneWithWhereWithoutMedical_StaffInput> = z.object({
  where: z.lazy(() => PlacesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlacesUpdateWithoutMedical_StaffInputSchema),z.lazy(() => PlacesUncheckedUpdateWithoutMedical_StaffInputSchema) ]),
}).strict();

export const PlacesUpdateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesUpdateWithoutMedical_StaffInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const PlacesUncheckedUpdateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.PlacesUncheckedUpdateWithoutMedical_StaffInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icon_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  website_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  opening_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  closing_time: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_available: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Rewards: z.lazy(() => RewardsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Announcements: z.lazy(() => AnnouncementsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Special_Events: z.lazy(() => Special_EventsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Reservation_Slots: z.lazy(() => Reservation_SlotsUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional(),
  Place_Review_History: z.lazy(() => Place_Review_HistoryUncheckedUpdateManyWithoutPlaceNestedInputSchema).optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutMedical_StaffInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutMedical_StaffInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedCreateWithoutMedical_StaffInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutMedical_StaffInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutMedical_StaffInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutMedical_StaffInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutMedical_StaffInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutMedical_StaffInputSchema) ]),
}).strict();

export const DonatorsCreateWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsCreateNestedOneWithoutDonatorsInputSchema),
  Reward_Transactions: z.lazy(() => Reward_TransactionsCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  medical_account_id: z.string(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const Medical_StaffCreateWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutMedical_StaffInputSchema)
}).strict();

export const Medical_StaffUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const Medical_StaffCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => Medical_StaffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const ModeratorsCreateWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const ModeratorsUncheckedCreateWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsUncheckedCreateWithoutSessionInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const ModeratorsCreateOrConnectWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsCreateOrConnectWithoutSessionInput> = z.object({
  where: z.lazy(() => ModeratorsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ModeratorsCreateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedCreateWithoutSessionInputSchema) ]),
}).strict();

export const DonatorsUpsertWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => DonatorsUpdateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => DonatorsWhereInputSchema).optional()
}).strict();

export const DonatorsUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => DonatorsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DonatorsUpdateWithoutSessionInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const DonatorsUpdateWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInputSchema).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medical_account_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const Medical_StaffUpsertWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => Medical_StaffUpdateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => Medical_StaffCreateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => Medical_StaffWhereInputSchema).optional()
}).strict();

export const Medical_StaffUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => Medical_StaffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Medical_StaffUpdateWithoutSessionInputSchema),z.lazy(() => Medical_StaffUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const Medical_StaffUpdateWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutMedical_StaffNestedInputSchema).optional()
}).strict();

export const Medical_StaffUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeratorsUpsertWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsUpsertWithoutSessionInput> = z.object({
  update: z.union([ z.lazy(() => ModeratorsUpdateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedUpdateWithoutSessionInputSchema) ]),
  create: z.union([ z.lazy(() => ModeratorsCreateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedCreateWithoutSessionInputSchema) ]),
  where: z.lazy(() => ModeratorsWhereInputSchema).optional()
}).strict();

export const ModeratorsUpdateToOneWithWhereWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsUpdateToOneWithWhereWithoutSessionInput> = z.object({
  where: z.lazy(() => ModeratorsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ModeratorsUpdateWithoutSessionInputSchema),z.lazy(() => ModeratorsUncheckedUpdateWithoutSessionInputSchema) ]),
}).strict();

export const ModeratorsUpdateWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ModeratorsUncheckedUpdateWithoutSessionInputSchema: z.ZodType<Prisma.ModeratorsUncheckedUpdateWithoutSessionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Reservation_SlotsCreateWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateWithoutReservationsInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  Place: z.lazy(() => PlacesCreateNestedOneWithoutReservation_SlotsInputSchema)
}).strict();

export const Reservation_SlotsUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedCreateWithoutReservationsInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable(),
  place_id: z.string()
}).strict();

export const Reservation_SlotsCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateOrConnectWithoutReservationsInput> = z.object({
  where: z.lazy(() => Reservation_SlotsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutReservationsInputSchema) ]),
}).strict();

export const Donation_HistoryCreateWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryCreateWithoutResevationInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Post_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksCreateNestedOneWithoutDonation_HistoryInputSchema)
}).strict();

export const Donation_HistoryUncheckedCreateWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedCreateWithoutResevationInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  post_donation_db_id: z.string()
}).strict();

export const Donation_HistoryCreateOrConnectWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryCreateOrConnectWithoutResevationInput> = z.object({
  where: z.lazy(() => Donation_HistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema) ]),
}).strict();

export const Donation_HistoryCreateManyResevationInputEnvelopeSchema: z.ZodType<Prisma.Donation_HistoryCreateManyResevationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Donation_HistoryCreateManyResevationInputSchema),z.lazy(() => Donation_HistoryCreateManyResevationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Pre_Feedback_AnswersCreateWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateWithoutReservationInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema),
  Survey_Choice: z.lazy(() => Survey_ChoicesCreateNestedOneWithoutPre_Feedback_AnswersInputSchema)
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateWithoutReservationInput> = z.object({
  id: z.string().cuid().optional(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Pre_Feedback_AnswersCreateOrConnectWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateOrConnectWithoutReservationInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersCreateManyReservationInputEnvelopeSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManyReservationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateManyReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateManyReservationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DonatorsCreateWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsCreateWithoutReservationsInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsCreateNestedOneWithoutDonatorsInputSchema),
  Reward_Transactions: z.lazy(() => Reward_TransactionsCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsUncheckedCreateWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsUncheckedCreateWithoutReservationsInput> = z.object({
  id: z.string().cuid().optional(),
  medical_account_id: z.string(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedCreateNestedManyWithoutDonatorInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutDonatorInputSchema).optional()
}).strict();

export const DonatorsCreateOrConnectWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsCreateOrConnectWithoutReservationsInput> = z.object({
  where: z.lazy(() => DonatorsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReservationsInputSchema) ]),
}).strict();

export const Reservation_SlotsUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsUpsertWithoutReservationsInput> = z.object({
  update: z.union([ z.lazy(() => Reservation_SlotsUpdateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedUpdateWithoutReservationsInputSchema) ]),
  create: z.union([ z.lazy(() => Reservation_SlotsCreateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedCreateWithoutReservationsInputSchema) ]),
  where: z.lazy(() => Reservation_SlotsWhereInputSchema).optional()
}).strict();

export const Reservation_SlotsUpdateToOneWithWhereWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateToOneWithWhereWithoutReservationsInput> = z.object({
  where: z.lazy(() => Reservation_SlotsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Reservation_SlotsUpdateWithoutReservationsInputSchema),z.lazy(() => Reservation_SlotsUncheckedUpdateWithoutReservationsInputSchema) ]),
}).strict();

export const Reservation_SlotsUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Place: z.lazy(() => PlacesUpdateOneRequiredWithoutReservation_SlotsNestedInputSchema).optional()
}).strict();

export const Reservation_SlotsUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryUpsertWithWhereUniqueWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUpsertWithWhereUniqueWithoutResevationInput> = z.object({
  where: z.lazy(() => Donation_HistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Donation_HistoryUpdateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedUpdateWithoutResevationInputSchema) ]),
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutResevationInputSchema) ]),
}).strict();

export const Donation_HistoryUpdateWithWhereUniqueWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateWithWhereUniqueWithoutResevationInput> = z.object({
  where: z.lazy(() => Donation_HistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Donation_HistoryUpdateWithoutResevationInputSchema),z.lazy(() => Donation_HistoryUncheckedUpdateWithoutResevationInputSchema) ]),
}).strict();

export const Donation_HistoryUpdateManyWithWhereWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateManyWithWhereWithoutResevationInput> = z.object({
  where: z.lazy(() => Donation_HistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Donation_HistoryUpdateManyMutationInputSchema),z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutResevationInputSchema) ]),
}).strict();

export const Donation_HistoryScalarWhereInputSchema: z.ZodType<Prisma.Donation_HistoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Donation_HistoryScalarWhereInputSchema),z.lazy(() => Donation_HistoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Donation_HistoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Donation_HistoryScalarWhereInputSchema),z.lazy(() => Donation_HistoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rewarded_points: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  blood_quality_status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => EnumBloodTypeFilterSchema),z.lazy(() => BloodTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumDonationStatusFilterSchema),z.lazy(() => DonationStatusSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  reservation_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post_donation_db_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutReservationInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateWithoutReservationInputSchema) ]),
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutReservationInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutReservationInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithoutReservationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateWithoutReservationInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersUpdateManyWithWhereWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyWithWhereWithoutReservationInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyMutationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersScalarWhereInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reservation_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DonatorsUpsertWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsUpsertWithoutReservationsInput> = z.object({
  update: z.union([ z.lazy(() => DonatorsUpdateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutReservationsInputSchema) ]),
  create: z.union([ z.lazy(() => DonatorsCreateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedCreateWithoutReservationsInputSchema) ]),
  where: z.lazy(() => DonatorsWhereInputSchema).optional()
}).strict();

export const DonatorsUpdateToOneWithWhereWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsUpdateToOneWithWhereWithoutReservationsInput> = z.object({
  where: z.lazy(() => DonatorsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DonatorsUpdateWithoutReservationsInputSchema),z.lazy(() => DonatorsUncheckedUpdateWithoutReservationsInputSchema) ]),
}).strict();

export const DonatorsUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Medical_Account: z.lazy(() => Medical_AccountsUpdateOneRequiredWithoutDonatorsNestedInputSchema).optional(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateWithoutReservationsInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateWithoutReservationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  medical_account_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsCreateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Survey_Choices: z.lazy(() => Survey_ChoicesCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedCreateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsCreateOrConnectWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateOrConnectWithoutPre_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_ChoicesCreateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutSurvey_ChoicesInputSchema),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedCreateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedCreateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  survey_question_id: z.string(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesCreateOrConnectWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateOrConnectWithoutPre_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]),
}).strict();

export const ReservationsCreateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsCreateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsCreateNestedOneWithoutReservationsInputSchema),
  Donation_History: z.lazy(() => Donation_HistoryCreateNestedManyWithoutResevationInputSchema).optional(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  reservation_slot_id: z.string(),
  donator_id: z.string(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedCreateNestedManyWithoutResevationInputSchema).optional()
}).strict();

export const ReservationsCreateOrConnectWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsCreateOrConnectWithoutPre_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_QuestionsUpsertWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUpsertWithoutPre_Feedback_AnswersInput> = z.object({
  update: z.union([ z.lazy(() => Survey_QuestionsUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]),
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]),
  where: z.lazy(() => Survey_QuestionsWhereInputSchema).optional()
}).strict();

export const Survey_QuestionsUpdateToOneWithWhereWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateToOneWithWhereWithoutPre_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_QuestionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Survey_QuestionsUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_QuestionsUpdateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedUpdateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUpsertWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUpsertWithoutPre_Feedback_AnswersInput> = z.object({
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]),
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]),
  where: z.lazy(() => Survey_ChoicesWhereInputSchema).optional()
}).strict();

export const Survey_ChoicesUpdateToOneWithWhereWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateToOneWithWhereWithoutPre_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Survey_ChoicesUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_ChoicesUpdateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutSurvey_ChoicesNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  survey_question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const ReservationsUpsertWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsUpsertWithoutPre_Feedback_AnswersInput> = z.object({
  update: z.union([ z.lazy(() => ReservationsUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutPre_Feedback_AnswersInputSchema) ]),
  where: z.lazy(() => ReservationsWhereInputSchema).optional()
}).strict();

export const ReservationsUpdateToOneWithWhereWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsUpdateToOneWithWhereWithoutPre_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => ReservationsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReservationsUpdateWithoutPre_Feedback_AnswersInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema) ]),
}).strict();

export const ReservationsUpdateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsUpdateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUpdateManyWithoutResevationNestedInputSchema).optional(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateWithoutPre_Feedback_AnswersInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateWithoutPre_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_slot_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutResevationNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsCreateWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateWithoutSurvey_ChoicesInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedCreateWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedCreateWithoutSurvey_ChoicesInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsCreateOrConnectWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateOrConnectWithoutSurvey_ChoicesInput> = z.object({
  where: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutSurvey_ChoicesInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema),
  Reservation: z.lazy(() => ReservationsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema)
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInput> = z.object({
  id: z.string().cuid().optional(),
  reservation_id: z.string(),
  question_id: z.string()
}).strict();

export const Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_ChoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutPost_Feedback_AnswersInputSchema),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksCreateNestedOneWithoutPost_Feedback_AnswersInputSchema)
}).strict();

export const Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInput> = z.object({
  id: z.string().cuid().optional(),
  feedback_id: z.string(),
  question_id: z.string()
}).strict();

export const Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateOrConnectWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelopeSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManySurvey_ChoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_Feedback_AnswersCreateManySurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersCreateManySurvey_ChoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Survey_QuestionsUpsertWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsUpsertWithoutSurvey_ChoicesInput> = z.object({
  update: z.union([ z.lazy(() => Survey_QuestionsUpdateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutSurvey_ChoicesInputSchema) ]),
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutSurvey_ChoicesInputSchema) ]),
  where: z.lazy(() => Survey_QuestionsWhereInputSchema).optional()
}).strict();

export const Survey_QuestionsUpdateToOneWithWhereWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateToOneWithWhereWithoutSurvey_ChoicesInput> = z.object({
  where: z.lazy(() => Survey_QuestionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Survey_QuestionsUpdateWithoutSurvey_ChoicesInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutSurvey_ChoicesInputSchema) ]),
}).strict();

export const Survey_QuestionsUpdateWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateWithoutSurvey_ChoicesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedUpdateWithoutSurvey_ChoicesInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedUpdateWithoutSurvey_ChoicesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInputSchema) ]),
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyMutationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInputSchema) ]),
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithoutSurvey_ChoiceInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_ChoiceInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyMutationInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersScalarWhereInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  feedback_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  choice_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateWithoutSurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateOrConnectWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Survey_ChoicesCreateManySurvey_QuestionInputEnvelopeSchema: z.ZodType<Prisma.Survey_ChoicesCreateManySurvey_QuestionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Survey_ChoicesCreateManySurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesCreateManySurvey_QuestionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesCreateNestedOneWithoutPre_Feedback_AnswersInputSchema),
  Reservation: z.lazy(() => ReservationsCreateNestedOneWithoutPre_Feedback_AnswersInputSchema)
}).strict();

export const Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  reservation_id: z.string(),
  choice_id: z.string()
}).strict();

export const Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManySurvey_QuestionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersCreateManySurvey_QuestionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateWithoutSurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesCreateNestedOneWithoutPost_Feedback_AnswersInputSchema),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksCreateNestedOneWithoutPost_Feedback_AnswersInputSchema)
}).strict();

export const Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  feedback_id: z.string(),
  choice_id: z.string()
}).strict();

export const Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateOrConnectWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersCreateManySurvey_QuestionInputEnvelopeSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManySurvey_QuestionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_Feedback_AnswersCreateManySurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersCreateManySurvey_QuestionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Survey_ChoicesUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUpsertWithWhereUniqueWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutSurvey_QuestionInputSchema) ]),
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Survey_ChoicesUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateWithWhereUniqueWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Survey_ChoicesUpdateWithoutSurvey_QuestionInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Survey_ChoicesUpdateManyWithWhereWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateManyWithWhereWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Survey_ChoicesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Survey_ChoicesUpdateManyMutationInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Survey_ChoicesScalarWhereInputSchema: z.ZodType<Prisma.Survey_ChoicesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Survey_ChoicesScalarWhereInputSchema),z.lazy(() => Survey_ChoicesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Survey_ChoicesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Survey_ChoicesScalarWhereInputSchema),z.lazy(() => Survey_ChoicesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  survey_question_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInputSchema) ]),
  create: z.union([ z.lazy(() => Pre_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateWithoutSurvey_QuestionInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Pre_Feedback_AnswersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Pre_Feedback_AnswersUpdateManyMutationInputSchema),z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpsertWithWhereUniqueWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInputSchema) ]),
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateWithWhereUniqueWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithoutSurvey_QuestionInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyWithWhereWithoutSurvey_QuestionInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyMutationInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionInputSchema) ]),
}).strict();

export const ReservationsCreateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsCreateWithoutDonation_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsCreateNestedOneWithoutReservationsInputSchema),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutReservationInputSchema).optional(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutReservationsInputSchema)
}).strict();

export const ReservationsUncheckedCreateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsUncheckedCreateWithoutDonation_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  reservation_slot_id: z.string(),
  donator_id: z.string(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutReservationInputSchema).optional()
}).strict();

export const ReservationsCreateOrConnectWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsCreateOrConnectWithoutDonation_HistoryInput> = z.object({
  where: z.lazy(() => ReservationsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonation_HistoryInputSchema) ]),
}).strict();

export const Post_Donation_FeedbacksCreateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateWithoutDonation_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersCreateNestedManyWithoutPre_Donation_FeedbackInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUncheckedCreateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedCreateWithoutDonation_HistoryInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedCreateNestedManyWithoutPre_Donation_FeedbackInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksCreateOrConnectWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateOrConnectWithoutDonation_HistoryInput> = z.object({
  where: z.lazy(() => Post_Donation_FeedbacksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutDonation_HistoryInputSchema) ]),
}).strict();

export const ReservationsUpsertWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsUpsertWithoutDonation_HistoryInput> = z.object({
  update: z.union([ z.lazy(() => ReservationsUpdateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutDonation_HistoryInputSchema) ]),
  create: z.union([ z.lazy(() => ReservationsCreateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedCreateWithoutDonation_HistoryInputSchema) ]),
  where: z.lazy(() => ReservationsWhereInputSchema).optional()
}).strict();

export const ReservationsUpdateToOneWithWhereWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsUpdateToOneWithWhereWithoutDonation_HistoryInput> = z.object({
  where: z.lazy(() => ReservationsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReservationsUpdateWithoutDonation_HistoryInputSchema),z.lazy(() => ReservationsUncheckedUpdateWithoutDonation_HistoryInputSchema) ]),
}).strict();

export const ReservationsUpdateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsUpdateWithoutDonation_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutReservationNestedInputSchema).optional(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateWithoutDonation_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_slot_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationNestedInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUpsertWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpsertWithoutDonation_HistoryInput> = z.object({
  update: z.union([ z.lazy(() => Post_Donation_FeedbacksUpdateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedUpdateWithoutDonation_HistoryInputSchema) ]),
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutDonation_HistoryInputSchema) ]),
  where: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUpdateToOneWithWhereWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateToOneWithWhereWithoutDonation_HistoryInput> = z.object({
  where: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Post_Donation_FeedbacksUpdateWithoutDonation_HistoryInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedUpdateWithoutDonation_HistoryInputSchema) ]),
}).strict();

export const Post_Donation_FeedbacksUpdateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateWithoutDonation_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutPre_Donation_FeedbackNestedInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUncheckedUpdateWithoutDonation_HistoryInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedUpdateWithoutDonation_HistoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackNestedInputSchema).optional()
}).strict();

export const Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryCreateWithoutPost_Donation_FeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  Resevation: z.lazy(() => ReservationsCreateNestedOneWithoutDonation_HistoryInputSchema)
}).strict();

export const Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  reservation_id: z.string()
}).strict();

export const Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryCreateOrConnectWithoutPost_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Donation_HistoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema) ]),
}).strict();

export const Donation_HistoryCreateManyPost_Donation_FeedbackInputEnvelopeSchema: z.ZodType<Prisma.Donation_HistoryCreateManyPost_Donation_FeedbackInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Donation_HistoryCreateManyPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryCreateManyPost_Donation_FeedbackInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutPost_Feedback_AnswersInputSchema),
  Survey_Choice: z.lazy(() => Survey_ChoicesCreateNestedOneWithoutPost_Feedback_AnswersInputSchema)
}).strict();

export const Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateOrConnectWithoutPre_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputEnvelopeSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Donation_HistoryUpsertWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUpsertWithWhereUniqueWithoutPost_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Donation_HistoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Donation_HistoryUpdateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedUpdateWithoutPost_Donation_FeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => Donation_HistoryCreateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedCreateWithoutPost_Donation_FeedbackInputSchema) ]),
}).strict();

export const Donation_HistoryUpdateWithWhereUniqueWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateWithWhereUniqueWithoutPost_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Donation_HistoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Donation_HistoryUpdateWithoutPost_Donation_FeedbackInputSchema),z.lazy(() => Donation_HistoryUncheckedUpdateWithoutPost_Donation_FeedbackInputSchema) ]),
}).strict();

export const Donation_HistoryUpdateManyWithWhereWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateManyWithWhereWithoutPost_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Donation_HistoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Donation_HistoryUpdateManyMutationInputSchema),z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpsertWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpsertWithWhereUniqueWithoutPre_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateWithoutPre_Donation_FeedbackInputSchema) ]),
  create: z.union([ z.lazy(() => Post_Feedback_AnswersCreateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedCreateWithoutPre_Donation_FeedbackInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpdateWithWhereUniqueWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateWithWhereUniqueWithoutPre_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateWithoutPre_Donation_FeedbackInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateWithoutPre_Donation_FeedbackInputSchema) ]),
}).strict();

export const Post_Feedback_AnswersUpdateManyWithWhereWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyWithWhereWithoutPre_Donation_FeedbackInput> = z.object({
  where: z.lazy(() => Post_Feedback_AnswersScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Post_Feedback_AnswersUpdateManyMutationInputSchema),z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackInputSchema) ]),
}).strict();

export const Survey_QuestionsCreateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Survey_Choices: z.lazy(() => Survey_ChoicesCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedCreateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedCreateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  type: z.lazy(() => SurveyQuestionTypeSchema),
  title: z.string(),
  description: z.string().optional().nullable(),
  is_required: z.boolean(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_QuestionInputSchema).optional()
}).strict();

export const Survey_QuestionsCreateOrConnectWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsCreateOrConnectWithoutPost_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_QuestionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_ChoicesCreateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  Survey_Question: z.lazy(() => Survey_QuestionsCreateNestedOneWithoutSurvey_ChoicesInputSchema),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedCreateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedCreateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string(),
  survey_question_id: z.string(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedCreateNestedManyWithoutSurvey_ChoiceInputSchema).optional()
}).strict();

export const Survey_ChoicesCreateOrConnectWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateOrConnectWithoutPost_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]),
}).strict();

export const Post_Donation_FeedbacksCreateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  Donation_History: z.lazy(() => Donation_HistoryCreateNestedManyWithoutPost_Donation_FeedbackInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUncheckedCreateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedCreateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.string().cuid().optional(),
  created_at: z.coerce.date().optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedCreateNestedManyWithoutPost_Donation_FeedbackInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksCreateOrConnectWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateOrConnectWithoutPost_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Post_Donation_FeedbacksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_QuestionsUpsertWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUpsertWithoutPost_Feedback_AnswersInput> = z.object({
  update: z.union([ z.lazy(() => Survey_QuestionsUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]),
  create: z.union([ z.lazy(() => Survey_QuestionsCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]),
  where: z.lazy(() => Survey_QuestionsWhereInputSchema).optional()
}).strict();

export const Survey_QuestionsUpdateToOneWithWhereWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateToOneWithWhereWithoutPost_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_QuestionsWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Survey_QuestionsUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_QuestionsUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_QuestionsUpdateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUpdateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_QuestionsUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_QuestionsUncheckedUpdateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SurveyQuestionTypeSchema),z.lazy(() => EnumSurveyQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choices: z.lazy(() => Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUpsertWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUpsertWithoutPost_Feedback_AnswersInput> = z.object({
  update: z.union([ z.lazy(() => Survey_ChoicesUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]),
  create: z.union([ z.lazy(() => Survey_ChoicesCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]),
  where: z.lazy(() => Survey_ChoicesWhereInputSchema).optional()
}).strict();

export const Survey_ChoicesUpdateToOneWithWhereWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateToOneWithWhereWithoutPost_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Survey_ChoicesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Survey_ChoicesUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Survey_ChoicesUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]),
}).strict();

export const Survey_ChoicesUpdateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutSurvey_ChoicesNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  survey_question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUpsertWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpsertWithoutPost_Feedback_AnswersInput> = z.object({
  update: z.union([ z.lazy(() => Post_Donation_FeedbacksUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]),
  create: z.union([ z.lazy(() => Post_Donation_FeedbacksCreateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedCreateWithoutPost_Feedback_AnswersInputSchema) ]),
  where: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUpdateToOneWithWhereWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateToOneWithWhereWithoutPost_Feedback_AnswersInput> = z.object({
  where: z.lazy(() => Post_Donation_FeedbacksWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => Post_Donation_FeedbacksUpdateWithoutPost_Feedback_AnswersInputSchema),z.lazy(() => Post_Donation_FeedbacksUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema) ]),
}).strict();

export const Post_Donation_FeedbacksUpdateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUpdateManyWithoutPost_Donation_FeedbackNestedInputSchema).optional()
}).strict();

export const Post_Donation_FeedbacksUncheckedUpdateWithoutPost_Feedback_AnswersInputSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUncheckedUpdateWithoutPost_Feedback_AnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackNestedInputSchema).optional()
}).strict();

export const SessionCreateWithoutModeratorInputSchema: z.ZodType<Prisma.SessionCreateWithoutModeratorInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  Donator: z.lazy(() => DonatorsCreateNestedOneWithoutSessionInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffCreateNestedOneWithoutSessionInputSchema).optional()
}).strict();

export const SessionUncheckedCreateWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutModeratorInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string().optional().nullable(),
  medical_staff_id: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutModeratorInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutModeratorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema) ]),
}).strict();

export const SessionCreateManyModeratorInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyModeratorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyModeratorInputSchema),z.lazy(() => SessionCreateManyModeratorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutModeratorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutModeratorInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedCreateWithoutModeratorInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutModeratorInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutModeratorInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutModeratorInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutModeratorInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutModeratorInputSchema) ]),
}).strict();

export const DonatorsCreateManyMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsCreateManyMedical_AccountInput> = z.object({
  id: z.string().cuid().optional(),
  image_src: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string(),
  gender: z.lazy(() => GenderSchema),
  dob: z.coerce.date(),
  address: z.string(),
  email: z.string().optional().nullable(),
  password: z.string(),
  reward_point: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const DonatorsUpdateWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUpdateWithoutMedical_AccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateWithoutMedical_AccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward_Transactions: z.lazy(() => Reward_TransactionsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutDonatorNestedInputSchema).optional()
}).strict();

export const DonatorsUncheckedUpdateManyWithoutMedical_AccountInputSchema: z.ZodType<Prisma.DonatorsUncheckedUpdateManyWithoutMedical_AccountInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  dob: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward_point: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsCreateManyDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsCreateManyDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  points: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Redemption_HistoryCreateManyDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateManyDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  reward_id: z.string()
}).strict();

export const SessionCreateManyDonatorInputSchema: z.ZodType<Prisma.SessionCreateManyDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  moderator_id: z.string().optional().nullable(),
  medical_staff_id: z.string().optional().nullable()
}).strict();

export const ReservationsCreateManyDonatorInputSchema: z.ZodType<Prisma.ReservationsCreateManyDonatorInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  reservation_slot_id: z.string()
}).strict();

export const Reward_TransactionsUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsUncheckedUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reward_TransactionsUncheckedUpdateManyWithoutDonatorInputSchema: z.ZodType<Prisma.Reward_TransactionsUncheckedUpdateManyWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Redemption_HistoryUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reward: z.lazy(() => RewardsUpdateOneRequiredWithoutRedemption_HistoryNestedInputSchema).optional()
}).strict();

export const Redemption_HistoryUncheckedUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Redemption_HistoryUncheckedUpdateManyWithoutDonatorInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateManyWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reward_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateOneWithoutSessionNestedInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsUpdateOneWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  moderator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medical_staff_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutDonatorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  moderator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medical_staff_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReservationsUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservation_Slot: z.lazy(() => Reservation_SlotsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUpdateManyWithoutResevationNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutReservationNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_slot_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutResevationNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateManyWithoutDonatorInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateManyWithoutDonatorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_slot_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Redemption_HistoryCreateManyRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryCreateManyRewardInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => RedemptionStatusSchema),
  used_points: z.number().int(),
  redeem_amount: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string()
}).strict();

export const Redemption_HistoryUpdateWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUpdateWithoutRewardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutRedemption_HistoryNestedInputSchema).optional()
}).strict();

export const Redemption_HistoryUncheckedUpdateWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateWithoutRewardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Redemption_HistoryUncheckedUpdateManyWithoutRewardInputSchema: z.ZodType<Prisma.Redemption_HistoryUncheckedUpdateManyWithoutRewardInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => RedemptionStatusSchema),z.lazy(() => EnumRedemptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  used_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  redeem_amount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RewardsCreateManyPlaceInputSchema: z.ZodType<Prisma.RewardsCreateManyPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  required_points: z.number().int(),
  image_src: z.string().optional().nullable(),
  is_available: z.boolean().optional().nullable(),
  amount_left: z.number().int(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const AnnouncementsCreateManyPlaceInputSchema: z.ZodType<Prisma.AnnouncementsCreateManyPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  blood_type: z.lazy(() => BloodTypeSchema).optional().nullable(),
  post_type: z.lazy(() => PostTypeSchema),
  title: z.string(),
  content: z.string(),
  image_src: z.string().optional().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const Special_EventsCreateManyPlaceInputSchema: z.ZodType<Prisma.Special_EventsCreateManyPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const Medical_StaffCreateManyPlaceInputSchema: z.ZodType<Prisma.Medical_StaffCreateManyPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const Reservation_SlotsCreateManyPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsCreateManyPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  reserve_date: z.coerce.date(),
  reserve_time: z.coerce.date(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  cancelled_at: z.coerce.date().optional().nullable()
}).strict();

export const Place_Review_HistoryCreateManyPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryCreateManyPlaceInput> = z.object({
  id: z.string().cuid().optional(),
  rating: z.number().int().optional().nullable(),
  created_at: z.coerce.date().optional()
}).strict();

export const RewardsUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Redemption_History: z.lazy(() => Redemption_HistoryUpdateManyWithoutRewardNestedInputSchema).optional()
}).strict();

export const RewardsUncheckedUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUncheckedUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Redemption_History: z.lazy(() => Redemption_HistoryUncheckedUpdateManyWithoutRewardNestedInputSchema).optional()
}).strict();

export const RewardsUncheckedUpdateManyWithoutPlaceInputSchema: z.ZodType<Prisma.RewardsUncheckedUpdateManyWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_available: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  amount_left: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementsUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementsUncheckedUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AnnouncementsUncheckedUpdateManyWithoutPlaceInputSchema: z.ZodType<Prisma.AnnouncementsUncheckedUpdateManyWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => NullableEnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_type: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_src: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Special_EventsUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Special_EventsUncheckedUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUncheckedUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Special_EventsUncheckedUpdateManyWithoutPlaceInputSchema: z.ZodType<Prisma.Special_EventsUncheckedUpdateManyWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Medical_StaffUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionUpdateManyWithoutMedical_StaffNestedInputSchema).optional()
}).strict();

export const Medical_StaffUncheckedUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Session: z.lazy(() => SessionUncheckedUpdateManyWithoutMedical_StaffNestedInputSchema).optional()
}).strict();

export const Medical_StaffUncheckedUpdateManyWithoutPlaceInputSchema: z.ZodType<Prisma.Medical_StaffUncheckedUpdateManyWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Reservation_SlotsUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservations: z.lazy(() => ReservationsUpdateManyWithoutReservation_SlotNestedInputSchema).optional()
}).strict();

export const Reservation_SlotsUncheckedUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Reservations: z.lazy(() => ReservationsUncheckedUpdateManyWithoutReservation_SlotNestedInputSchema).optional()
}).strict();

export const Reservation_SlotsUncheckedUpdateManyWithoutPlaceInputSchema: z.ZodType<Prisma.Reservation_SlotsUncheckedUpdateManyWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reserve_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Place_Review_HistoryUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Place_Review_HistoryUncheckedUpdateWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedUpdateWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Place_Review_HistoryUncheckedUpdateManyWithoutPlaceInputSchema: z.ZodType<Prisma.Place_Review_HistoryUncheckedUpdateManyWithoutPlaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReservationsCreateManyReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsCreateManyReservation_SlotInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => ReservationStatusSchema),
  created_at: z.coerce.date().optional(),
  cancelled_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string()
}).strict();

export const ReservationsUpdateWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUpdateWithoutReservation_SlotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donation_History: z.lazy(() => Donation_HistoryUpdateManyWithoutResevationNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutReservationNestedInputSchema).optional(),
  Donator: z.lazy(() => DonatorsUpdateOneRequiredWithoutReservationsNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateWithoutReservation_SlotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Donation_History: z.lazy(() => Donation_HistoryUncheckedUpdateManyWithoutResevationNestedInputSchema).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationNestedInputSchema).optional()
}).strict();

export const ReservationsUncheckedUpdateManyWithoutReservation_SlotInputSchema: z.ZodType<Prisma.ReservationsUncheckedUpdateManyWithoutReservation_SlotInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReservationStatusSchema),z.lazy(() => EnumReservationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cancelled_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyMedical_StaffInputSchema: z.ZodType<Prisma.SessionCreateManyMedical_StaffInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  moderator_id: z.string().optional().nullable(),
  donator_id: z.string().optional().nullable()
}).strict();

export const SessionUpdateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUpdateWithoutMedical_StaffInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donator: z.lazy(() => DonatorsUpdateOneWithoutSessionNestedInputSchema).optional(),
  Moderator: z.lazy(() => ModeratorsUpdateOneWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutMedical_StaffInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  moderator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutMedical_StaffInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutMedical_StaffInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  moderator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Donation_HistoryCreateManyResevationInputSchema: z.ZodType<Prisma.Donation_HistoryCreateManyResevationInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  post_donation_db_id: z.string()
}).strict();

export const Pre_Feedback_AnswersCreateManyReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManyReservationInput> = z.object({
  id: z.string().cuid().optional(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Donation_HistoryUpdateWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateWithoutResevationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Post_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksUpdateOneRequiredWithoutDonation_HistoryNestedInputSchema).optional()
}).strict();

export const Donation_HistoryUncheckedUpdateWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateWithoutResevationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_donation_db_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryUncheckedUpdateManyWithoutResevationInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateManyWithoutResevationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  post_donation_db_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpdateWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateWithoutReservationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyWithoutReservationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersCreateManySurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManySurvey_ChoiceInput> = z.object({
  id: z.string().cuid().optional(),
  reservation_id: z.string(),
  question_id: z.string()
}).strict();

export const Post_Feedback_AnswersCreateManySurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManySurvey_ChoiceInput> = z.object({
  id: z.string().cuid().optional(),
  feedback_id: z.string(),
  question_id: z.string()
}).strict();

export const Pre_Feedback_AnswersUpdateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateWithoutSurvey_ChoiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional(),
  Reservation: z.lazy(() => ReservationsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUpdateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateWithoutSurvey_ChoiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional(),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_ChoiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Survey_ChoicesCreateManySurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesCreateManySurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  order: z.number().int(),
  label: z.string()
}).strict();

export const Pre_Feedback_AnswersCreateManySurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManySurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  reservation_id: z.string(),
  choice_id: z.string()
}).strict();

export const Post_Feedback_AnswersCreateManySurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManySurvey_QuestionInput> = z.object({
  id: z.string().cuid().optional(),
  feedback_id: z.string(),
  choice_id: z.string()
}).strict();

export const Survey_ChoicesUpdateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUpdateWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedUpdateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Pre_Feedback_Answers: z.lazy(() => Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional(),
  Post_Feedback_Answers: z.lazy(() => Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_ChoiceNestedInputSchema).optional()
}).strict();

export const Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Survey_ChoicesUncheckedUpdateManyWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUpdateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional(),
  Reservation: z.lazy(() => ReservationsUpdateOneRequiredWithoutPre_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUpdateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional(),
  Pre_Donation_Feedback: z.lazy(() => Post_Donation_FeedbacksUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyWithoutSurvey_QuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  feedback_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryCreateManyPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryCreateManyPost_Donation_FeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  rewarded_points: z.number().int(),
  blood_quality_status: z.string().optional().nullable(),
  blood_type: z.lazy(() => BloodTypeSchema),
  status: z.lazy(() => DonationStatusSchema),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  reservation_id: z.string()
}).strict();

export const Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManyPre_Donation_FeedbackInput> = z.object({
  id: z.string().cuid().optional(),
  question_id: z.string(),
  choice_id: z.string()
}).strict();

export const Donation_HistoryUpdateWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUpdateWithoutPost_Donation_FeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Resevation: z.lazy(() => ReservationsUpdateOneRequiredWithoutDonation_HistoryNestedInputSchema).optional()
}).strict();

export const Donation_HistoryUncheckedUpdateWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateWithoutPost_Donation_FeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackInputSchema: z.ZodType<Prisma.Donation_HistoryUncheckedUpdateManyWithoutPost_Donation_FeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rewarded_points: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  blood_quality_status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blood_type: z.union([ z.lazy(() => BloodTypeSchema),z.lazy(() => EnumBloodTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => DonationStatusSchema),z.lazy(() => EnumDonationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reservation_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUpdateWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateWithoutPre_Donation_FeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Survey_Question: z.lazy(() => Survey_QuestionsUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional(),
  Survey_Choice: z.lazy(() => Survey_ChoicesUpdateOneRequiredWithoutPost_Feedback_AnswersNestedInputSchema).optional()
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateWithoutPre_Donation_FeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackInputSchema: z.ZodType<Prisma.Post_Feedback_AnswersUncheckedUpdateManyWithoutPre_Donation_FeedbackInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  choice_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyModeratorInputSchema: z.ZodType<Prisma.SessionCreateManyModeratorInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().cuid().optional(),
  expires: z.coerce.date().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  donator_id: z.string().optional().nullable(),
  medical_staff_id: z.string().optional().nullable()
}).strict();

export const SessionUpdateWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUpdateWithoutModeratorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Donator: z.lazy(() => DonatorsUpdateOneWithoutSessionNestedInputSchema).optional(),
  Medical_Staff: z.lazy(() => Medical_StaffUpdateOneWithoutSessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutModeratorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medical_staff_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutModeratorInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutModeratorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donator_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  medical_staff_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const Medical_AccountsFindFirstArgsSchema: z.ZodType<Prisma.Medical_AccountsFindFirstArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereInputSchema.optional(),
  orderBy: z.union([ Medical_AccountsOrderByWithRelationInputSchema.array(),Medical_AccountsOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_AccountsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Medical_AccountsScalarFieldEnumSchema,Medical_AccountsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Medical_AccountsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Medical_AccountsFindFirstOrThrowArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereInputSchema.optional(),
  orderBy: z.union([ Medical_AccountsOrderByWithRelationInputSchema.array(),Medical_AccountsOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_AccountsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Medical_AccountsScalarFieldEnumSchema,Medical_AccountsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Medical_AccountsFindManyArgsSchema: z.ZodType<Prisma.Medical_AccountsFindManyArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereInputSchema.optional(),
  orderBy: z.union([ Medical_AccountsOrderByWithRelationInputSchema.array(),Medical_AccountsOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_AccountsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Medical_AccountsScalarFieldEnumSchema,Medical_AccountsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Medical_AccountsAggregateArgsSchema: z.ZodType<Prisma.Medical_AccountsAggregateArgs> = z.object({
  where: Medical_AccountsWhereInputSchema.optional(),
  orderBy: z.union([ Medical_AccountsOrderByWithRelationInputSchema.array(),Medical_AccountsOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_AccountsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Medical_AccountsGroupByArgsSchema: z.ZodType<Prisma.Medical_AccountsGroupByArgs> = z.object({
  where: Medical_AccountsWhereInputSchema.optional(),
  orderBy: z.union([ Medical_AccountsOrderByWithAggregationInputSchema.array(),Medical_AccountsOrderByWithAggregationInputSchema ]).optional(),
  by: Medical_AccountsScalarFieldEnumSchema.array(),
  having: Medical_AccountsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Medical_AccountsFindUniqueArgsSchema: z.ZodType<Prisma.Medical_AccountsFindUniqueArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereUniqueInputSchema,
}).strict()

export const Medical_AccountsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Medical_AccountsFindUniqueOrThrowArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereUniqueInputSchema,
}).strict()

export const DonatorsFindFirstArgsSchema: z.ZodType<Prisma.DonatorsFindFirstArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereInputSchema.optional(),
  orderBy: z.union([ DonatorsOrderByWithRelationInputSchema.array(),DonatorsOrderByWithRelationInputSchema ]).optional(),
  cursor: DonatorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DonatorsScalarFieldEnumSchema,DonatorsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DonatorsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DonatorsFindFirstOrThrowArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereInputSchema.optional(),
  orderBy: z.union([ DonatorsOrderByWithRelationInputSchema.array(),DonatorsOrderByWithRelationInputSchema ]).optional(),
  cursor: DonatorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DonatorsScalarFieldEnumSchema,DonatorsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DonatorsFindManyArgsSchema: z.ZodType<Prisma.DonatorsFindManyArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereInputSchema.optional(),
  orderBy: z.union([ DonatorsOrderByWithRelationInputSchema.array(),DonatorsOrderByWithRelationInputSchema ]).optional(),
  cursor: DonatorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DonatorsScalarFieldEnumSchema,DonatorsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DonatorsAggregateArgsSchema: z.ZodType<Prisma.DonatorsAggregateArgs> = z.object({
  where: DonatorsWhereInputSchema.optional(),
  orderBy: z.union([ DonatorsOrderByWithRelationInputSchema.array(),DonatorsOrderByWithRelationInputSchema ]).optional(),
  cursor: DonatorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DonatorsGroupByArgsSchema: z.ZodType<Prisma.DonatorsGroupByArgs> = z.object({
  where: DonatorsWhereInputSchema.optional(),
  orderBy: z.union([ DonatorsOrderByWithAggregationInputSchema.array(),DonatorsOrderByWithAggregationInputSchema ]).optional(),
  by: DonatorsScalarFieldEnumSchema.array(),
  having: DonatorsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DonatorsFindUniqueArgsSchema: z.ZodType<Prisma.DonatorsFindUniqueArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereUniqueInputSchema,
}).strict()

export const DonatorsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DonatorsFindUniqueOrThrowArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereUniqueInputSchema,
}).strict()

export const Reward_TransactionsFindFirstArgsSchema: z.ZodType<Prisma.Reward_TransactionsFindFirstArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereInputSchema.optional(),
  orderBy: z.union([ Reward_TransactionsOrderByWithRelationInputSchema.array(),Reward_TransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reward_TransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Reward_TransactionsScalarFieldEnumSchema,Reward_TransactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Reward_TransactionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Reward_TransactionsFindFirstOrThrowArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereInputSchema.optional(),
  orderBy: z.union([ Reward_TransactionsOrderByWithRelationInputSchema.array(),Reward_TransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reward_TransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Reward_TransactionsScalarFieldEnumSchema,Reward_TransactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Reward_TransactionsFindManyArgsSchema: z.ZodType<Prisma.Reward_TransactionsFindManyArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereInputSchema.optional(),
  orderBy: z.union([ Reward_TransactionsOrderByWithRelationInputSchema.array(),Reward_TransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reward_TransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Reward_TransactionsScalarFieldEnumSchema,Reward_TransactionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Reward_TransactionsAggregateArgsSchema: z.ZodType<Prisma.Reward_TransactionsAggregateArgs> = z.object({
  where: Reward_TransactionsWhereInputSchema.optional(),
  orderBy: z.union([ Reward_TransactionsOrderByWithRelationInputSchema.array(),Reward_TransactionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reward_TransactionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Reward_TransactionsGroupByArgsSchema: z.ZodType<Prisma.Reward_TransactionsGroupByArgs> = z.object({
  where: Reward_TransactionsWhereInputSchema.optional(),
  orderBy: z.union([ Reward_TransactionsOrderByWithAggregationInputSchema.array(),Reward_TransactionsOrderByWithAggregationInputSchema ]).optional(),
  by: Reward_TransactionsScalarFieldEnumSchema.array(),
  having: Reward_TransactionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Reward_TransactionsFindUniqueArgsSchema: z.ZodType<Prisma.Reward_TransactionsFindUniqueArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereUniqueInputSchema,
}).strict()

export const Reward_TransactionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Reward_TransactionsFindUniqueOrThrowArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereUniqueInputSchema,
}).strict()

export const Redemption_HistoryFindFirstArgsSchema: z.ZodType<Prisma.Redemption_HistoryFindFirstArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Redemption_HistoryOrderByWithRelationInputSchema.array(),Redemption_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Redemption_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Redemption_HistoryScalarFieldEnumSchema,Redemption_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Redemption_HistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Redemption_HistoryFindFirstOrThrowArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Redemption_HistoryOrderByWithRelationInputSchema.array(),Redemption_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Redemption_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Redemption_HistoryScalarFieldEnumSchema,Redemption_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Redemption_HistoryFindManyArgsSchema: z.ZodType<Prisma.Redemption_HistoryFindManyArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Redemption_HistoryOrderByWithRelationInputSchema.array(),Redemption_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Redemption_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Redemption_HistoryScalarFieldEnumSchema,Redemption_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Redemption_HistoryAggregateArgsSchema: z.ZodType<Prisma.Redemption_HistoryAggregateArgs> = z.object({
  where: Redemption_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Redemption_HistoryOrderByWithRelationInputSchema.array(),Redemption_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Redemption_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Redemption_HistoryGroupByArgsSchema: z.ZodType<Prisma.Redemption_HistoryGroupByArgs> = z.object({
  where: Redemption_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Redemption_HistoryOrderByWithAggregationInputSchema.array(),Redemption_HistoryOrderByWithAggregationInputSchema ]).optional(),
  by: Redemption_HistoryScalarFieldEnumSchema.array(),
  having: Redemption_HistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Redemption_HistoryFindUniqueArgsSchema: z.ZodType<Prisma.Redemption_HistoryFindUniqueArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereUniqueInputSchema,
}).strict()

export const Redemption_HistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Redemption_HistoryFindUniqueOrThrowArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereUniqueInputSchema,
}).strict()

export const RewardsFindFirstArgsSchema: z.ZodType<Prisma.RewardsFindFirstArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereInputSchema.optional(),
  orderBy: z.union([ RewardsOrderByWithRelationInputSchema.array(),RewardsOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RewardsScalarFieldEnumSchema,RewardsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RewardsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RewardsFindFirstOrThrowArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereInputSchema.optional(),
  orderBy: z.union([ RewardsOrderByWithRelationInputSchema.array(),RewardsOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RewardsScalarFieldEnumSchema,RewardsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RewardsFindManyArgsSchema: z.ZodType<Prisma.RewardsFindManyArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereInputSchema.optional(),
  orderBy: z.union([ RewardsOrderByWithRelationInputSchema.array(),RewardsOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RewardsScalarFieldEnumSchema,RewardsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RewardsAggregateArgsSchema: z.ZodType<Prisma.RewardsAggregateArgs> = z.object({
  where: RewardsWhereInputSchema.optional(),
  orderBy: z.union([ RewardsOrderByWithRelationInputSchema.array(),RewardsOrderByWithRelationInputSchema ]).optional(),
  cursor: RewardsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RewardsGroupByArgsSchema: z.ZodType<Prisma.RewardsGroupByArgs> = z.object({
  where: RewardsWhereInputSchema.optional(),
  orderBy: z.union([ RewardsOrderByWithAggregationInputSchema.array(),RewardsOrderByWithAggregationInputSchema ]).optional(),
  by: RewardsScalarFieldEnumSchema.array(),
  having: RewardsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RewardsFindUniqueArgsSchema: z.ZodType<Prisma.RewardsFindUniqueArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereUniqueInputSchema,
}).strict()

export const RewardsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RewardsFindUniqueOrThrowArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereUniqueInputSchema,
}).strict()

export const PlacesFindFirstArgsSchema: z.ZodType<Prisma.PlacesFindFirstArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereInputSchema.optional(),
  orderBy: z.union([ PlacesOrderByWithRelationInputSchema.array(),PlacesOrderByWithRelationInputSchema ]).optional(),
  cursor: PlacesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlacesScalarFieldEnumSchema,PlacesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PlacesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlacesFindFirstOrThrowArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereInputSchema.optional(),
  orderBy: z.union([ PlacesOrderByWithRelationInputSchema.array(),PlacesOrderByWithRelationInputSchema ]).optional(),
  cursor: PlacesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlacesScalarFieldEnumSchema,PlacesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PlacesFindManyArgsSchema: z.ZodType<Prisma.PlacesFindManyArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereInputSchema.optional(),
  orderBy: z.union([ PlacesOrderByWithRelationInputSchema.array(),PlacesOrderByWithRelationInputSchema ]).optional(),
  cursor: PlacesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlacesScalarFieldEnumSchema,PlacesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PlacesAggregateArgsSchema: z.ZodType<Prisma.PlacesAggregateArgs> = z.object({
  where: PlacesWhereInputSchema.optional(),
  orderBy: z.union([ PlacesOrderByWithRelationInputSchema.array(),PlacesOrderByWithRelationInputSchema ]).optional(),
  cursor: PlacesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PlacesGroupByArgsSchema: z.ZodType<Prisma.PlacesGroupByArgs> = z.object({
  where: PlacesWhereInputSchema.optional(),
  orderBy: z.union([ PlacesOrderByWithAggregationInputSchema.array(),PlacesOrderByWithAggregationInputSchema ]).optional(),
  by: PlacesScalarFieldEnumSchema.array(),
  having: PlacesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PlacesFindUniqueArgsSchema: z.ZodType<Prisma.PlacesFindUniqueArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereUniqueInputSchema,
}).strict()

export const PlacesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlacesFindUniqueOrThrowArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereUniqueInputSchema,
}).strict()

export const Place_Review_HistoryFindFirstArgsSchema: z.ZodType<Prisma.Place_Review_HistoryFindFirstArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Place_Review_HistoryOrderByWithRelationInputSchema.array(),Place_Review_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Place_Review_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Place_Review_HistoryScalarFieldEnumSchema,Place_Review_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Place_Review_HistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Place_Review_HistoryFindFirstOrThrowArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Place_Review_HistoryOrderByWithRelationInputSchema.array(),Place_Review_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Place_Review_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Place_Review_HistoryScalarFieldEnumSchema,Place_Review_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Place_Review_HistoryFindManyArgsSchema: z.ZodType<Prisma.Place_Review_HistoryFindManyArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Place_Review_HistoryOrderByWithRelationInputSchema.array(),Place_Review_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Place_Review_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Place_Review_HistoryScalarFieldEnumSchema,Place_Review_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Place_Review_HistoryAggregateArgsSchema: z.ZodType<Prisma.Place_Review_HistoryAggregateArgs> = z.object({
  where: Place_Review_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Place_Review_HistoryOrderByWithRelationInputSchema.array(),Place_Review_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Place_Review_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Place_Review_HistoryGroupByArgsSchema: z.ZodType<Prisma.Place_Review_HistoryGroupByArgs> = z.object({
  where: Place_Review_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Place_Review_HistoryOrderByWithAggregationInputSchema.array(),Place_Review_HistoryOrderByWithAggregationInputSchema ]).optional(),
  by: Place_Review_HistoryScalarFieldEnumSchema.array(),
  having: Place_Review_HistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Place_Review_HistoryFindUniqueArgsSchema: z.ZodType<Prisma.Place_Review_HistoryFindUniqueArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereUniqueInputSchema,
}).strict()

export const Place_Review_HistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Place_Review_HistoryFindUniqueOrThrowArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereUniqueInputSchema,
}).strict()

export const AnnouncementsFindFirstArgsSchema: z.ZodType<Prisma.AnnouncementsFindFirstArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementsOrderByWithRelationInputSchema.array(),AnnouncementsOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnnouncementsScalarFieldEnumSchema,AnnouncementsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AnnouncementsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AnnouncementsFindFirstOrThrowArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementsOrderByWithRelationInputSchema.array(),AnnouncementsOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnnouncementsScalarFieldEnumSchema,AnnouncementsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AnnouncementsFindManyArgsSchema: z.ZodType<Prisma.AnnouncementsFindManyArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementsOrderByWithRelationInputSchema.array(),AnnouncementsOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnnouncementsScalarFieldEnumSchema,AnnouncementsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AnnouncementsAggregateArgsSchema: z.ZodType<Prisma.AnnouncementsAggregateArgs> = z.object({
  where: AnnouncementsWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementsOrderByWithRelationInputSchema.array(),AnnouncementsOrderByWithRelationInputSchema ]).optional(),
  cursor: AnnouncementsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AnnouncementsGroupByArgsSchema: z.ZodType<Prisma.AnnouncementsGroupByArgs> = z.object({
  where: AnnouncementsWhereInputSchema.optional(),
  orderBy: z.union([ AnnouncementsOrderByWithAggregationInputSchema.array(),AnnouncementsOrderByWithAggregationInputSchema ]).optional(),
  by: AnnouncementsScalarFieldEnumSchema.array(),
  having: AnnouncementsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AnnouncementsFindUniqueArgsSchema: z.ZodType<Prisma.AnnouncementsFindUniqueArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereUniqueInputSchema,
}).strict()

export const AnnouncementsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AnnouncementsFindUniqueOrThrowArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereUniqueInputSchema,
}).strict()

export const Special_EventsFindFirstArgsSchema: z.ZodType<Prisma.Special_EventsFindFirstArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereInputSchema.optional(),
  orderBy: z.union([ Special_EventsOrderByWithRelationInputSchema.array(),Special_EventsOrderByWithRelationInputSchema ]).optional(),
  cursor: Special_EventsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Special_EventsScalarFieldEnumSchema,Special_EventsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Special_EventsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Special_EventsFindFirstOrThrowArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereInputSchema.optional(),
  orderBy: z.union([ Special_EventsOrderByWithRelationInputSchema.array(),Special_EventsOrderByWithRelationInputSchema ]).optional(),
  cursor: Special_EventsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Special_EventsScalarFieldEnumSchema,Special_EventsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Special_EventsFindManyArgsSchema: z.ZodType<Prisma.Special_EventsFindManyArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereInputSchema.optional(),
  orderBy: z.union([ Special_EventsOrderByWithRelationInputSchema.array(),Special_EventsOrderByWithRelationInputSchema ]).optional(),
  cursor: Special_EventsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Special_EventsScalarFieldEnumSchema,Special_EventsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Special_EventsAggregateArgsSchema: z.ZodType<Prisma.Special_EventsAggregateArgs> = z.object({
  where: Special_EventsWhereInputSchema.optional(),
  orderBy: z.union([ Special_EventsOrderByWithRelationInputSchema.array(),Special_EventsOrderByWithRelationInputSchema ]).optional(),
  cursor: Special_EventsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Special_EventsGroupByArgsSchema: z.ZodType<Prisma.Special_EventsGroupByArgs> = z.object({
  where: Special_EventsWhereInputSchema.optional(),
  orderBy: z.union([ Special_EventsOrderByWithAggregationInputSchema.array(),Special_EventsOrderByWithAggregationInputSchema ]).optional(),
  by: Special_EventsScalarFieldEnumSchema.array(),
  having: Special_EventsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Special_EventsFindUniqueArgsSchema: z.ZodType<Prisma.Special_EventsFindUniqueArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereUniqueInputSchema,
}).strict()

export const Special_EventsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Special_EventsFindUniqueOrThrowArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereUniqueInputSchema,
}).strict()

export const Reservation_SlotsFindFirstArgsSchema: z.ZodType<Prisma.Reservation_SlotsFindFirstArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereInputSchema.optional(),
  orderBy: z.union([ Reservation_SlotsOrderByWithRelationInputSchema.array(),Reservation_SlotsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reservation_SlotsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Reservation_SlotsScalarFieldEnumSchema,Reservation_SlotsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Reservation_SlotsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Reservation_SlotsFindFirstOrThrowArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereInputSchema.optional(),
  orderBy: z.union([ Reservation_SlotsOrderByWithRelationInputSchema.array(),Reservation_SlotsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reservation_SlotsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Reservation_SlotsScalarFieldEnumSchema,Reservation_SlotsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Reservation_SlotsFindManyArgsSchema: z.ZodType<Prisma.Reservation_SlotsFindManyArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereInputSchema.optional(),
  orderBy: z.union([ Reservation_SlotsOrderByWithRelationInputSchema.array(),Reservation_SlotsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reservation_SlotsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Reservation_SlotsScalarFieldEnumSchema,Reservation_SlotsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Reservation_SlotsAggregateArgsSchema: z.ZodType<Prisma.Reservation_SlotsAggregateArgs> = z.object({
  where: Reservation_SlotsWhereInputSchema.optional(),
  orderBy: z.union([ Reservation_SlotsOrderByWithRelationInputSchema.array(),Reservation_SlotsOrderByWithRelationInputSchema ]).optional(),
  cursor: Reservation_SlotsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Reservation_SlotsGroupByArgsSchema: z.ZodType<Prisma.Reservation_SlotsGroupByArgs> = z.object({
  where: Reservation_SlotsWhereInputSchema.optional(),
  orderBy: z.union([ Reservation_SlotsOrderByWithAggregationInputSchema.array(),Reservation_SlotsOrderByWithAggregationInputSchema ]).optional(),
  by: Reservation_SlotsScalarFieldEnumSchema.array(),
  having: Reservation_SlotsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Reservation_SlotsFindUniqueArgsSchema: z.ZodType<Prisma.Reservation_SlotsFindUniqueArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereUniqueInputSchema,
}).strict()

export const Reservation_SlotsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Reservation_SlotsFindUniqueOrThrowArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereUniqueInputSchema,
}).strict()

export const Medical_StaffFindFirstArgsSchema: z.ZodType<Prisma.Medical_StaffFindFirstArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereInputSchema.optional(),
  orderBy: z.union([ Medical_StaffOrderByWithRelationInputSchema.array(),Medical_StaffOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_StaffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Medical_StaffScalarFieldEnumSchema,Medical_StaffScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Medical_StaffFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Medical_StaffFindFirstOrThrowArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereInputSchema.optional(),
  orderBy: z.union([ Medical_StaffOrderByWithRelationInputSchema.array(),Medical_StaffOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_StaffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Medical_StaffScalarFieldEnumSchema,Medical_StaffScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Medical_StaffFindManyArgsSchema: z.ZodType<Prisma.Medical_StaffFindManyArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereInputSchema.optional(),
  orderBy: z.union([ Medical_StaffOrderByWithRelationInputSchema.array(),Medical_StaffOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_StaffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Medical_StaffScalarFieldEnumSchema,Medical_StaffScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Medical_StaffAggregateArgsSchema: z.ZodType<Prisma.Medical_StaffAggregateArgs> = z.object({
  where: Medical_StaffWhereInputSchema.optional(),
  orderBy: z.union([ Medical_StaffOrderByWithRelationInputSchema.array(),Medical_StaffOrderByWithRelationInputSchema ]).optional(),
  cursor: Medical_StaffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Medical_StaffGroupByArgsSchema: z.ZodType<Prisma.Medical_StaffGroupByArgs> = z.object({
  where: Medical_StaffWhereInputSchema.optional(),
  orderBy: z.union([ Medical_StaffOrderByWithAggregationInputSchema.array(),Medical_StaffOrderByWithAggregationInputSchema ]).optional(),
  by: Medical_StaffScalarFieldEnumSchema.array(),
  having: Medical_StaffScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Medical_StaffFindUniqueArgsSchema: z.ZodType<Prisma.Medical_StaffFindUniqueArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereUniqueInputSchema,
}).strict()

export const Medical_StaffFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Medical_StaffFindUniqueOrThrowArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const ReservationsFindFirstArgsSchema: z.ZodType<Prisma.ReservationsFindFirstArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereInputSchema.optional(),
  orderBy: z.union([ ReservationsOrderByWithRelationInputSchema.array(),ReservationsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationsScalarFieldEnumSchema,ReservationsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ReservationsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReservationsFindFirstOrThrowArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereInputSchema.optional(),
  orderBy: z.union([ ReservationsOrderByWithRelationInputSchema.array(),ReservationsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationsScalarFieldEnumSchema,ReservationsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ReservationsFindManyArgsSchema: z.ZodType<Prisma.ReservationsFindManyArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereInputSchema.optional(),
  orderBy: z.union([ ReservationsOrderByWithRelationInputSchema.array(),ReservationsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReservationsScalarFieldEnumSchema,ReservationsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ReservationsAggregateArgsSchema: z.ZodType<Prisma.ReservationsAggregateArgs> = z.object({
  where: ReservationsWhereInputSchema.optional(),
  orderBy: z.union([ ReservationsOrderByWithRelationInputSchema.array(),ReservationsOrderByWithRelationInputSchema ]).optional(),
  cursor: ReservationsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ReservationsGroupByArgsSchema: z.ZodType<Prisma.ReservationsGroupByArgs> = z.object({
  where: ReservationsWhereInputSchema.optional(),
  orderBy: z.union([ ReservationsOrderByWithAggregationInputSchema.array(),ReservationsOrderByWithAggregationInputSchema ]).optional(),
  by: ReservationsScalarFieldEnumSchema.array(),
  having: ReservationsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ReservationsFindUniqueArgsSchema: z.ZodType<Prisma.ReservationsFindUniqueArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereUniqueInputSchema,
}).strict()

export const ReservationsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReservationsFindUniqueOrThrowArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereUniqueInputSchema,
}).strict()

export const Pre_Feedback_AnswersFindFirstArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersFindFirstArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Pre_Feedback_AnswersOrderByWithRelationInputSchema.array(),Pre_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Pre_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Pre_Feedback_AnswersScalarFieldEnumSchema,Pre_Feedback_AnswersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Pre_Feedback_AnswersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersFindFirstOrThrowArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Pre_Feedback_AnswersOrderByWithRelationInputSchema.array(),Pre_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Pre_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Pre_Feedback_AnswersScalarFieldEnumSchema,Pre_Feedback_AnswersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Pre_Feedback_AnswersFindManyArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersFindManyArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Pre_Feedback_AnswersOrderByWithRelationInputSchema.array(),Pre_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Pre_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Pre_Feedback_AnswersScalarFieldEnumSchema,Pre_Feedback_AnswersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Pre_Feedback_AnswersAggregateArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersAggregateArgs> = z.object({
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Pre_Feedback_AnswersOrderByWithRelationInputSchema.array(),Pre_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Pre_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Pre_Feedback_AnswersGroupByArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersGroupByArgs> = z.object({
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Pre_Feedback_AnswersOrderByWithAggregationInputSchema.array(),Pre_Feedback_AnswersOrderByWithAggregationInputSchema ]).optional(),
  by: Pre_Feedback_AnswersScalarFieldEnumSchema.array(),
  having: Pre_Feedback_AnswersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Pre_Feedback_AnswersFindUniqueArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersFindUniqueArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Pre_Feedback_AnswersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersFindUniqueOrThrowArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Survey_ChoicesFindFirstArgsSchema: z.ZodType<Prisma.Survey_ChoicesFindFirstArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereInputSchema.optional(),
  orderBy: z.union([ Survey_ChoicesOrderByWithRelationInputSchema.array(),Survey_ChoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_ChoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Survey_ChoicesScalarFieldEnumSchema,Survey_ChoicesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Survey_ChoicesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Survey_ChoicesFindFirstOrThrowArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereInputSchema.optional(),
  orderBy: z.union([ Survey_ChoicesOrderByWithRelationInputSchema.array(),Survey_ChoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_ChoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Survey_ChoicesScalarFieldEnumSchema,Survey_ChoicesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Survey_ChoicesFindManyArgsSchema: z.ZodType<Prisma.Survey_ChoicesFindManyArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereInputSchema.optional(),
  orderBy: z.union([ Survey_ChoicesOrderByWithRelationInputSchema.array(),Survey_ChoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_ChoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Survey_ChoicesScalarFieldEnumSchema,Survey_ChoicesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Survey_ChoicesAggregateArgsSchema: z.ZodType<Prisma.Survey_ChoicesAggregateArgs> = z.object({
  where: Survey_ChoicesWhereInputSchema.optional(),
  orderBy: z.union([ Survey_ChoicesOrderByWithRelationInputSchema.array(),Survey_ChoicesOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_ChoicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Survey_ChoicesGroupByArgsSchema: z.ZodType<Prisma.Survey_ChoicesGroupByArgs> = z.object({
  where: Survey_ChoicesWhereInputSchema.optional(),
  orderBy: z.union([ Survey_ChoicesOrderByWithAggregationInputSchema.array(),Survey_ChoicesOrderByWithAggregationInputSchema ]).optional(),
  by: Survey_ChoicesScalarFieldEnumSchema.array(),
  having: Survey_ChoicesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Survey_ChoicesFindUniqueArgsSchema: z.ZodType<Prisma.Survey_ChoicesFindUniqueArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereUniqueInputSchema,
}).strict()

export const Survey_ChoicesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Survey_ChoicesFindUniqueOrThrowArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereUniqueInputSchema,
}).strict()

export const Survey_QuestionsFindFirstArgsSchema: z.ZodType<Prisma.Survey_QuestionsFindFirstArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereInputSchema.optional(),
  orderBy: z.union([ Survey_QuestionsOrderByWithRelationInputSchema.array(),Survey_QuestionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_QuestionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Survey_QuestionsScalarFieldEnumSchema,Survey_QuestionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Survey_QuestionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Survey_QuestionsFindFirstOrThrowArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereInputSchema.optional(),
  orderBy: z.union([ Survey_QuestionsOrderByWithRelationInputSchema.array(),Survey_QuestionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_QuestionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Survey_QuestionsScalarFieldEnumSchema,Survey_QuestionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Survey_QuestionsFindManyArgsSchema: z.ZodType<Prisma.Survey_QuestionsFindManyArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereInputSchema.optional(),
  orderBy: z.union([ Survey_QuestionsOrderByWithRelationInputSchema.array(),Survey_QuestionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_QuestionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Survey_QuestionsScalarFieldEnumSchema,Survey_QuestionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Survey_QuestionsAggregateArgsSchema: z.ZodType<Prisma.Survey_QuestionsAggregateArgs> = z.object({
  where: Survey_QuestionsWhereInputSchema.optional(),
  orderBy: z.union([ Survey_QuestionsOrderByWithRelationInputSchema.array(),Survey_QuestionsOrderByWithRelationInputSchema ]).optional(),
  cursor: Survey_QuestionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Survey_QuestionsGroupByArgsSchema: z.ZodType<Prisma.Survey_QuestionsGroupByArgs> = z.object({
  where: Survey_QuestionsWhereInputSchema.optional(),
  orderBy: z.union([ Survey_QuestionsOrderByWithAggregationInputSchema.array(),Survey_QuestionsOrderByWithAggregationInputSchema ]).optional(),
  by: Survey_QuestionsScalarFieldEnumSchema.array(),
  having: Survey_QuestionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Survey_QuestionsFindUniqueArgsSchema: z.ZodType<Prisma.Survey_QuestionsFindUniqueArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereUniqueInputSchema,
}).strict()

export const Survey_QuestionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Survey_QuestionsFindUniqueOrThrowArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereUniqueInputSchema,
}).strict()

export const Donation_HistoryFindFirstArgsSchema: z.ZodType<Prisma.Donation_HistoryFindFirstArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Donation_HistoryOrderByWithRelationInputSchema.array(),Donation_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Donation_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Donation_HistoryScalarFieldEnumSchema,Donation_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Donation_HistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Donation_HistoryFindFirstOrThrowArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Donation_HistoryOrderByWithRelationInputSchema.array(),Donation_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Donation_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Donation_HistoryScalarFieldEnumSchema,Donation_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Donation_HistoryFindManyArgsSchema: z.ZodType<Prisma.Donation_HistoryFindManyArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Donation_HistoryOrderByWithRelationInputSchema.array(),Donation_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Donation_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Donation_HistoryScalarFieldEnumSchema,Donation_HistoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Donation_HistoryAggregateArgsSchema: z.ZodType<Prisma.Donation_HistoryAggregateArgs> = z.object({
  where: Donation_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Donation_HistoryOrderByWithRelationInputSchema.array(),Donation_HistoryOrderByWithRelationInputSchema ]).optional(),
  cursor: Donation_HistoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Donation_HistoryGroupByArgsSchema: z.ZodType<Prisma.Donation_HistoryGroupByArgs> = z.object({
  where: Donation_HistoryWhereInputSchema.optional(),
  orderBy: z.union([ Donation_HistoryOrderByWithAggregationInputSchema.array(),Donation_HistoryOrderByWithAggregationInputSchema ]).optional(),
  by: Donation_HistoryScalarFieldEnumSchema.array(),
  having: Donation_HistoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Donation_HistoryFindUniqueArgsSchema: z.ZodType<Prisma.Donation_HistoryFindUniqueArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereUniqueInputSchema,
}).strict()

export const Donation_HistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Donation_HistoryFindUniqueOrThrowArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereUniqueInputSchema,
}).strict()

export const Post_Donation_FeedbacksFindFirstArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksFindFirstArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
  orderBy: z.union([ Post_Donation_FeedbacksOrderByWithRelationInputSchema.array(),Post_Donation_FeedbacksOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Donation_FeedbacksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Post_Donation_FeedbacksScalarFieldEnumSchema,Post_Donation_FeedbacksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Post_Donation_FeedbacksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksFindFirstOrThrowArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
  orderBy: z.union([ Post_Donation_FeedbacksOrderByWithRelationInputSchema.array(),Post_Donation_FeedbacksOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Donation_FeedbacksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Post_Donation_FeedbacksScalarFieldEnumSchema,Post_Donation_FeedbacksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Post_Donation_FeedbacksFindManyArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksFindManyArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
  orderBy: z.union([ Post_Donation_FeedbacksOrderByWithRelationInputSchema.array(),Post_Donation_FeedbacksOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Donation_FeedbacksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Post_Donation_FeedbacksScalarFieldEnumSchema,Post_Donation_FeedbacksScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Post_Donation_FeedbacksAggregateArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksAggregateArgs> = z.object({
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
  orderBy: z.union([ Post_Donation_FeedbacksOrderByWithRelationInputSchema.array(),Post_Donation_FeedbacksOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Donation_FeedbacksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_Donation_FeedbacksGroupByArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksGroupByArgs> = z.object({
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
  orderBy: z.union([ Post_Donation_FeedbacksOrderByWithAggregationInputSchema.array(),Post_Donation_FeedbacksOrderByWithAggregationInputSchema ]).optional(),
  by: Post_Donation_FeedbacksScalarFieldEnumSchema.array(),
  having: Post_Donation_FeedbacksScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_Donation_FeedbacksFindUniqueArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksFindUniqueArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereUniqueInputSchema,
}).strict()

export const Post_Donation_FeedbacksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksFindUniqueOrThrowArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereUniqueInputSchema,
}).strict()

export const Post_Feedback_AnswersFindFirstArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersFindFirstArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Post_Feedback_AnswersOrderByWithRelationInputSchema.array(),Post_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Post_Feedback_AnswersScalarFieldEnumSchema,Post_Feedback_AnswersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Post_Feedback_AnswersFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersFindFirstOrThrowArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Post_Feedback_AnswersOrderByWithRelationInputSchema.array(),Post_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Post_Feedback_AnswersScalarFieldEnumSchema,Post_Feedback_AnswersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Post_Feedback_AnswersFindManyArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersFindManyArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Post_Feedback_AnswersOrderByWithRelationInputSchema.array(),Post_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Post_Feedback_AnswersScalarFieldEnumSchema,Post_Feedback_AnswersScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const Post_Feedback_AnswersAggregateArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersAggregateArgs> = z.object({
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Post_Feedback_AnswersOrderByWithRelationInputSchema.array(),Post_Feedback_AnswersOrderByWithRelationInputSchema ]).optional(),
  cursor: Post_Feedback_AnswersWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_Feedback_AnswersGroupByArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersGroupByArgs> = z.object({
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
  orderBy: z.union([ Post_Feedback_AnswersOrderByWithAggregationInputSchema.array(),Post_Feedback_AnswersOrderByWithAggregationInputSchema ]).optional(),
  by: Post_Feedback_AnswersScalarFieldEnumSchema.array(),
  having: Post_Feedback_AnswersScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const Post_Feedback_AnswersFindUniqueArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersFindUniqueArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Post_Feedback_AnswersFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersFindUniqueOrThrowArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const ModeratorsFindFirstArgsSchema: z.ZodType<Prisma.ModeratorsFindFirstArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereInputSchema.optional(),
  orderBy: z.union([ ModeratorsOrderByWithRelationInputSchema.array(),ModeratorsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeratorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ModeratorsScalarFieldEnumSchema,ModeratorsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ModeratorsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ModeratorsFindFirstOrThrowArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereInputSchema.optional(),
  orderBy: z.union([ ModeratorsOrderByWithRelationInputSchema.array(),ModeratorsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeratorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ModeratorsScalarFieldEnumSchema,ModeratorsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ModeratorsFindManyArgsSchema: z.ZodType<Prisma.ModeratorsFindManyArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereInputSchema.optional(),
  orderBy: z.union([ ModeratorsOrderByWithRelationInputSchema.array(),ModeratorsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeratorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ModeratorsScalarFieldEnumSchema,ModeratorsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ModeratorsAggregateArgsSchema: z.ZodType<Prisma.ModeratorsAggregateArgs> = z.object({
  where: ModeratorsWhereInputSchema.optional(),
  orderBy: z.union([ ModeratorsOrderByWithRelationInputSchema.array(),ModeratorsOrderByWithRelationInputSchema ]).optional(),
  cursor: ModeratorsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ModeratorsGroupByArgsSchema: z.ZodType<Prisma.ModeratorsGroupByArgs> = z.object({
  where: ModeratorsWhereInputSchema.optional(),
  orderBy: z.union([ ModeratorsOrderByWithAggregationInputSchema.array(),ModeratorsOrderByWithAggregationInputSchema ]).optional(),
  by: ModeratorsScalarFieldEnumSchema.array(),
  having: ModeratorsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ModeratorsFindUniqueArgsSchema: z.ZodType<Prisma.ModeratorsFindUniqueArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereUniqueInputSchema,
}).strict()

export const ModeratorsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ModeratorsFindUniqueOrThrowArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereUniqueInputSchema,
}).strict()

export const Medical_AccountsCreateArgsSchema: z.ZodType<Prisma.Medical_AccountsCreateArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  data: z.union([ Medical_AccountsCreateInputSchema,Medical_AccountsUncheckedCreateInputSchema ]),
}).strict()

export const Medical_AccountsUpsertArgsSchema: z.ZodType<Prisma.Medical_AccountsUpsertArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereUniqueInputSchema,
  create: z.union([ Medical_AccountsCreateInputSchema,Medical_AccountsUncheckedCreateInputSchema ]),
  update: z.union([ Medical_AccountsUpdateInputSchema,Medical_AccountsUncheckedUpdateInputSchema ]),
}).strict()

export const Medical_AccountsCreateManyArgsSchema: z.ZodType<Prisma.Medical_AccountsCreateManyArgs> = z.object({
  data: z.union([ Medical_AccountsCreateManyInputSchema,Medical_AccountsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Medical_AccountsDeleteArgsSchema: z.ZodType<Prisma.Medical_AccountsDeleteArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  where: Medical_AccountsWhereUniqueInputSchema,
}).strict()

export const Medical_AccountsUpdateArgsSchema: z.ZodType<Prisma.Medical_AccountsUpdateArgs> = z.object({
  select: Medical_AccountsSelectSchema.optional(),
  include: Medical_AccountsIncludeSchema.optional(),
  data: z.union([ Medical_AccountsUpdateInputSchema,Medical_AccountsUncheckedUpdateInputSchema ]),
  where: Medical_AccountsWhereUniqueInputSchema,
}).strict()

export const Medical_AccountsUpdateManyArgsSchema: z.ZodType<Prisma.Medical_AccountsUpdateManyArgs> = z.object({
  data: z.union([ Medical_AccountsUpdateManyMutationInputSchema,Medical_AccountsUncheckedUpdateManyInputSchema ]),
  where: Medical_AccountsWhereInputSchema.optional(),
}).strict()

export const Medical_AccountsDeleteManyArgsSchema: z.ZodType<Prisma.Medical_AccountsDeleteManyArgs> = z.object({
  where: Medical_AccountsWhereInputSchema.optional(),
}).strict()

export const DonatorsCreateArgsSchema: z.ZodType<Prisma.DonatorsCreateArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  data: z.union([ DonatorsCreateInputSchema,DonatorsUncheckedCreateInputSchema ]),
}).strict()

export const DonatorsUpsertArgsSchema: z.ZodType<Prisma.DonatorsUpsertArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereUniqueInputSchema,
  create: z.union([ DonatorsCreateInputSchema,DonatorsUncheckedCreateInputSchema ]),
  update: z.union([ DonatorsUpdateInputSchema,DonatorsUncheckedUpdateInputSchema ]),
}).strict()

export const DonatorsCreateManyArgsSchema: z.ZodType<Prisma.DonatorsCreateManyArgs> = z.object({
  data: z.union([ DonatorsCreateManyInputSchema,DonatorsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DonatorsDeleteArgsSchema: z.ZodType<Prisma.DonatorsDeleteArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  where: DonatorsWhereUniqueInputSchema,
}).strict()

export const DonatorsUpdateArgsSchema: z.ZodType<Prisma.DonatorsUpdateArgs> = z.object({
  select: DonatorsSelectSchema.optional(),
  include: DonatorsIncludeSchema.optional(),
  data: z.union([ DonatorsUpdateInputSchema,DonatorsUncheckedUpdateInputSchema ]),
  where: DonatorsWhereUniqueInputSchema,
}).strict()

export const DonatorsUpdateManyArgsSchema: z.ZodType<Prisma.DonatorsUpdateManyArgs> = z.object({
  data: z.union([ DonatorsUpdateManyMutationInputSchema,DonatorsUncheckedUpdateManyInputSchema ]),
  where: DonatorsWhereInputSchema.optional(),
}).strict()

export const DonatorsDeleteManyArgsSchema: z.ZodType<Prisma.DonatorsDeleteManyArgs> = z.object({
  where: DonatorsWhereInputSchema.optional(),
}).strict()

export const Reward_TransactionsCreateArgsSchema: z.ZodType<Prisma.Reward_TransactionsCreateArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  data: z.union([ Reward_TransactionsCreateInputSchema,Reward_TransactionsUncheckedCreateInputSchema ]),
}).strict()

export const Reward_TransactionsUpsertArgsSchema: z.ZodType<Prisma.Reward_TransactionsUpsertArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereUniqueInputSchema,
  create: z.union([ Reward_TransactionsCreateInputSchema,Reward_TransactionsUncheckedCreateInputSchema ]),
  update: z.union([ Reward_TransactionsUpdateInputSchema,Reward_TransactionsUncheckedUpdateInputSchema ]),
}).strict()

export const Reward_TransactionsCreateManyArgsSchema: z.ZodType<Prisma.Reward_TransactionsCreateManyArgs> = z.object({
  data: z.union([ Reward_TransactionsCreateManyInputSchema,Reward_TransactionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Reward_TransactionsDeleteArgsSchema: z.ZodType<Prisma.Reward_TransactionsDeleteArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  where: Reward_TransactionsWhereUniqueInputSchema,
}).strict()

export const Reward_TransactionsUpdateArgsSchema: z.ZodType<Prisma.Reward_TransactionsUpdateArgs> = z.object({
  select: Reward_TransactionsSelectSchema.optional(),
  include: Reward_TransactionsIncludeSchema.optional(),
  data: z.union([ Reward_TransactionsUpdateInputSchema,Reward_TransactionsUncheckedUpdateInputSchema ]),
  where: Reward_TransactionsWhereUniqueInputSchema,
}).strict()

export const Reward_TransactionsUpdateManyArgsSchema: z.ZodType<Prisma.Reward_TransactionsUpdateManyArgs> = z.object({
  data: z.union([ Reward_TransactionsUpdateManyMutationInputSchema,Reward_TransactionsUncheckedUpdateManyInputSchema ]),
  where: Reward_TransactionsWhereInputSchema.optional(),
}).strict()

export const Reward_TransactionsDeleteManyArgsSchema: z.ZodType<Prisma.Reward_TransactionsDeleteManyArgs> = z.object({
  where: Reward_TransactionsWhereInputSchema.optional(),
}).strict()

export const Redemption_HistoryCreateArgsSchema: z.ZodType<Prisma.Redemption_HistoryCreateArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  data: z.union([ Redemption_HistoryCreateInputSchema,Redemption_HistoryUncheckedCreateInputSchema ]),
}).strict()

export const Redemption_HistoryUpsertArgsSchema: z.ZodType<Prisma.Redemption_HistoryUpsertArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereUniqueInputSchema,
  create: z.union([ Redemption_HistoryCreateInputSchema,Redemption_HistoryUncheckedCreateInputSchema ]),
  update: z.union([ Redemption_HistoryUpdateInputSchema,Redemption_HistoryUncheckedUpdateInputSchema ]),
}).strict()

export const Redemption_HistoryCreateManyArgsSchema: z.ZodType<Prisma.Redemption_HistoryCreateManyArgs> = z.object({
  data: z.union([ Redemption_HistoryCreateManyInputSchema,Redemption_HistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Redemption_HistoryDeleteArgsSchema: z.ZodType<Prisma.Redemption_HistoryDeleteArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  where: Redemption_HistoryWhereUniqueInputSchema,
}).strict()

export const Redemption_HistoryUpdateArgsSchema: z.ZodType<Prisma.Redemption_HistoryUpdateArgs> = z.object({
  select: Redemption_HistorySelectSchema.optional(),
  include: Redemption_HistoryIncludeSchema.optional(),
  data: z.union([ Redemption_HistoryUpdateInputSchema,Redemption_HistoryUncheckedUpdateInputSchema ]),
  where: Redemption_HistoryWhereUniqueInputSchema,
}).strict()

export const Redemption_HistoryUpdateManyArgsSchema: z.ZodType<Prisma.Redemption_HistoryUpdateManyArgs> = z.object({
  data: z.union([ Redemption_HistoryUpdateManyMutationInputSchema,Redemption_HistoryUncheckedUpdateManyInputSchema ]),
  where: Redemption_HistoryWhereInputSchema.optional(),
}).strict()

export const Redemption_HistoryDeleteManyArgsSchema: z.ZodType<Prisma.Redemption_HistoryDeleteManyArgs> = z.object({
  where: Redemption_HistoryWhereInputSchema.optional(),
}).strict()

export const RewardsCreateArgsSchema: z.ZodType<Prisma.RewardsCreateArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  data: z.union([ RewardsCreateInputSchema,RewardsUncheckedCreateInputSchema ]),
}).strict()

export const RewardsUpsertArgsSchema: z.ZodType<Prisma.RewardsUpsertArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereUniqueInputSchema,
  create: z.union([ RewardsCreateInputSchema,RewardsUncheckedCreateInputSchema ]),
  update: z.union([ RewardsUpdateInputSchema,RewardsUncheckedUpdateInputSchema ]),
}).strict()

export const RewardsCreateManyArgsSchema: z.ZodType<Prisma.RewardsCreateManyArgs> = z.object({
  data: z.union([ RewardsCreateManyInputSchema,RewardsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RewardsDeleteArgsSchema: z.ZodType<Prisma.RewardsDeleteArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  where: RewardsWhereUniqueInputSchema,
}).strict()

export const RewardsUpdateArgsSchema: z.ZodType<Prisma.RewardsUpdateArgs> = z.object({
  select: RewardsSelectSchema.optional(),
  include: RewardsIncludeSchema.optional(),
  data: z.union([ RewardsUpdateInputSchema,RewardsUncheckedUpdateInputSchema ]),
  where: RewardsWhereUniqueInputSchema,
}).strict()

export const RewardsUpdateManyArgsSchema: z.ZodType<Prisma.RewardsUpdateManyArgs> = z.object({
  data: z.union([ RewardsUpdateManyMutationInputSchema,RewardsUncheckedUpdateManyInputSchema ]),
  where: RewardsWhereInputSchema.optional(),
}).strict()

export const RewardsDeleteManyArgsSchema: z.ZodType<Prisma.RewardsDeleteManyArgs> = z.object({
  where: RewardsWhereInputSchema.optional(),
}).strict()

export const PlacesCreateArgsSchema: z.ZodType<Prisma.PlacesCreateArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  data: z.union([ PlacesCreateInputSchema,PlacesUncheckedCreateInputSchema ]),
}).strict()

export const PlacesUpsertArgsSchema: z.ZodType<Prisma.PlacesUpsertArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereUniqueInputSchema,
  create: z.union([ PlacesCreateInputSchema,PlacesUncheckedCreateInputSchema ]),
  update: z.union([ PlacesUpdateInputSchema,PlacesUncheckedUpdateInputSchema ]),
}).strict()

export const PlacesCreateManyArgsSchema: z.ZodType<Prisma.PlacesCreateManyArgs> = z.object({
  data: z.union([ PlacesCreateManyInputSchema,PlacesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PlacesDeleteArgsSchema: z.ZodType<Prisma.PlacesDeleteArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  where: PlacesWhereUniqueInputSchema,
}).strict()

export const PlacesUpdateArgsSchema: z.ZodType<Prisma.PlacesUpdateArgs> = z.object({
  select: PlacesSelectSchema.optional(),
  include: PlacesIncludeSchema.optional(),
  data: z.union([ PlacesUpdateInputSchema,PlacesUncheckedUpdateInputSchema ]),
  where: PlacesWhereUniqueInputSchema,
}).strict()

export const PlacesUpdateManyArgsSchema: z.ZodType<Prisma.PlacesUpdateManyArgs> = z.object({
  data: z.union([ PlacesUpdateManyMutationInputSchema,PlacesUncheckedUpdateManyInputSchema ]),
  where: PlacesWhereInputSchema.optional(),
}).strict()

export const PlacesDeleteManyArgsSchema: z.ZodType<Prisma.PlacesDeleteManyArgs> = z.object({
  where: PlacesWhereInputSchema.optional(),
}).strict()

export const Place_Review_HistoryCreateArgsSchema: z.ZodType<Prisma.Place_Review_HistoryCreateArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  data: z.union([ Place_Review_HistoryCreateInputSchema,Place_Review_HistoryUncheckedCreateInputSchema ]),
}).strict()

export const Place_Review_HistoryUpsertArgsSchema: z.ZodType<Prisma.Place_Review_HistoryUpsertArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereUniqueInputSchema,
  create: z.union([ Place_Review_HistoryCreateInputSchema,Place_Review_HistoryUncheckedCreateInputSchema ]),
  update: z.union([ Place_Review_HistoryUpdateInputSchema,Place_Review_HistoryUncheckedUpdateInputSchema ]),
}).strict()

export const Place_Review_HistoryCreateManyArgsSchema: z.ZodType<Prisma.Place_Review_HistoryCreateManyArgs> = z.object({
  data: z.union([ Place_Review_HistoryCreateManyInputSchema,Place_Review_HistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Place_Review_HistoryDeleteArgsSchema: z.ZodType<Prisma.Place_Review_HistoryDeleteArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  where: Place_Review_HistoryWhereUniqueInputSchema,
}).strict()

export const Place_Review_HistoryUpdateArgsSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateArgs> = z.object({
  select: Place_Review_HistorySelectSchema.optional(),
  include: Place_Review_HistoryIncludeSchema.optional(),
  data: z.union([ Place_Review_HistoryUpdateInputSchema,Place_Review_HistoryUncheckedUpdateInputSchema ]),
  where: Place_Review_HistoryWhereUniqueInputSchema,
}).strict()

export const Place_Review_HistoryUpdateManyArgsSchema: z.ZodType<Prisma.Place_Review_HistoryUpdateManyArgs> = z.object({
  data: z.union([ Place_Review_HistoryUpdateManyMutationInputSchema,Place_Review_HistoryUncheckedUpdateManyInputSchema ]),
  where: Place_Review_HistoryWhereInputSchema.optional(),
}).strict()

export const Place_Review_HistoryDeleteManyArgsSchema: z.ZodType<Prisma.Place_Review_HistoryDeleteManyArgs> = z.object({
  where: Place_Review_HistoryWhereInputSchema.optional(),
}).strict()

export const AnnouncementsCreateArgsSchema: z.ZodType<Prisma.AnnouncementsCreateArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  data: z.union([ AnnouncementsCreateInputSchema,AnnouncementsUncheckedCreateInputSchema ]),
}).strict()

export const AnnouncementsUpsertArgsSchema: z.ZodType<Prisma.AnnouncementsUpsertArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereUniqueInputSchema,
  create: z.union([ AnnouncementsCreateInputSchema,AnnouncementsUncheckedCreateInputSchema ]),
  update: z.union([ AnnouncementsUpdateInputSchema,AnnouncementsUncheckedUpdateInputSchema ]),
}).strict()

export const AnnouncementsCreateManyArgsSchema: z.ZodType<Prisma.AnnouncementsCreateManyArgs> = z.object({
  data: z.union([ AnnouncementsCreateManyInputSchema,AnnouncementsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AnnouncementsDeleteArgsSchema: z.ZodType<Prisma.AnnouncementsDeleteArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  where: AnnouncementsWhereUniqueInputSchema,
}).strict()

export const AnnouncementsUpdateArgsSchema: z.ZodType<Prisma.AnnouncementsUpdateArgs> = z.object({
  select: AnnouncementsSelectSchema.optional(),
  include: AnnouncementsIncludeSchema.optional(),
  data: z.union([ AnnouncementsUpdateInputSchema,AnnouncementsUncheckedUpdateInputSchema ]),
  where: AnnouncementsWhereUniqueInputSchema,
}).strict()

export const AnnouncementsUpdateManyArgsSchema: z.ZodType<Prisma.AnnouncementsUpdateManyArgs> = z.object({
  data: z.union([ AnnouncementsUpdateManyMutationInputSchema,AnnouncementsUncheckedUpdateManyInputSchema ]),
  where: AnnouncementsWhereInputSchema.optional(),
}).strict()

export const AnnouncementsDeleteManyArgsSchema: z.ZodType<Prisma.AnnouncementsDeleteManyArgs> = z.object({
  where: AnnouncementsWhereInputSchema.optional(),
}).strict()

export const Special_EventsCreateArgsSchema: z.ZodType<Prisma.Special_EventsCreateArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  data: z.union([ Special_EventsCreateInputSchema,Special_EventsUncheckedCreateInputSchema ]),
}).strict()

export const Special_EventsUpsertArgsSchema: z.ZodType<Prisma.Special_EventsUpsertArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereUniqueInputSchema,
  create: z.union([ Special_EventsCreateInputSchema,Special_EventsUncheckedCreateInputSchema ]),
  update: z.union([ Special_EventsUpdateInputSchema,Special_EventsUncheckedUpdateInputSchema ]),
}).strict()

export const Special_EventsCreateManyArgsSchema: z.ZodType<Prisma.Special_EventsCreateManyArgs> = z.object({
  data: z.union([ Special_EventsCreateManyInputSchema,Special_EventsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Special_EventsDeleteArgsSchema: z.ZodType<Prisma.Special_EventsDeleteArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  where: Special_EventsWhereUniqueInputSchema,
}).strict()

export const Special_EventsUpdateArgsSchema: z.ZodType<Prisma.Special_EventsUpdateArgs> = z.object({
  select: Special_EventsSelectSchema.optional(),
  include: Special_EventsIncludeSchema.optional(),
  data: z.union([ Special_EventsUpdateInputSchema,Special_EventsUncheckedUpdateInputSchema ]),
  where: Special_EventsWhereUniqueInputSchema,
}).strict()

export const Special_EventsUpdateManyArgsSchema: z.ZodType<Prisma.Special_EventsUpdateManyArgs> = z.object({
  data: z.union([ Special_EventsUpdateManyMutationInputSchema,Special_EventsUncheckedUpdateManyInputSchema ]),
  where: Special_EventsWhereInputSchema.optional(),
}).strict()

export const Special_EventsDeleteManyArgsSchema: z.ZodType<Prisma.Special_EventsDeleteManyArgs> = z.object({
  where: Special_EventsWhereInputSchema.optional(),
}).strict()

export const Reservation_SlotsCreateArgsSchema: z.ZodType<Prisma.Reservation_SlotsCreateArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  data: z.union([ Reservation_SlotsCreateInputSchema,Reservation_SlotsUncheckedCreateInputSchema ]),
}).strict()

export const Reservation_SlotsUpsertArgsSchema: z.ZodType<Prisma.Reservation_SlotsUpsertArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereUniqueInputSchema,
  create: z.union([ Reservation_SlotsCreateInputSchema,Reservation_SlotsUncheckedCreateInputSchema ]),
  update: z.union([ Reservation_SlotsUpdateInputSchema,Reservation_SlotsUncheckedUpdateInputSchema ]),
}).strict()

export const Reservation_SlotsCreateManyArgsSchema: z.ZodType<Prisma.Reservation_SlotsCreateManyArgs> = z.object({
  data: z.union([ Reservation_SlotsCreateManyInputSchema,Reservation_SlotsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Reservation_SlotsDeleteArgsSchema: z.ZodType<Prisma.Reservation_SlotsDeleteArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  where: Reservation_SlotsWhereUniqueInputSchema,
}).strict()

export const Reservation_SlotsUpdateArgsSchema: z.ZodType<Prisma.Reservation_SlotsUpdateArgs> = z.object({
  select: Reservation_SlotsSelectSchema.optional(),
  include: Reservation_SlotsIncludeSchema.optional(),
  data: z.union([ Reservation_SlotsUpdateInputSchema,Reservation_SlotsUncheckedUpdateInputSchema ]),
  where: Reservation_SlotsWhereUniqueInputSchema,
}).strict()

export const Reservation_SlotsUpdateManyArgsSchema: z.ZodType<Prisma.Reservation_SlotsUpdateManyArgs> = z.object({
  data: z.union([ Reservation_SlotsUpdateManyMutationInputSchema,Reservation_SlotsUncheckedUpdateManyInputSchema ]),
  where: Reservation_SlotsWhereInputSchema.optional(),
}).strict()

export const Reservation_SlotsDeleteManyArgsSchema: z.ZodType<Prisma.Reservation_SlotsDeleteManyArgs> = z.object({
  where: Reservation_SlotsWhereInputSchema.optional(),
}).strict()

export const Medical_StaffCreateArgsSchema: z.ZodType<Prisma.Medical_StaffCreateArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  data: z.union([ Medical_StaffCreateInputSchema,Medical_StaffUncheckedCreateInputSchema ]),
}).strict()

export const Medical_StaffUpsertArgsSchema: z.ZodType<Prisma.Medical_StaffUpsertArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereUniqueInputSchema,
  create: z.union([ Medical_StaffCreateInputSchema,Medical_StaffUncheckedCreateInputSchema ]),
  update: z.union([ Medical_StaffUpdateInputSchema,Medical_StaffUncheckedUpdateInputSchema ]),
}).strict()

export const Medical_StaffCreateManyArgsSchema: z.ZodType<Prisma.Medical_StaffCreateManyArgs> = z.object({
  data: z.union([ Medical_StaffCreateManyInputSchema,Medical_StaffCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Medical_StaffDeleteArgsSchema: z.ZodType<Prisma.Medical_StaffDeleteArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  where: Medical_StaffWhereUniqueInputSchema,
}).strict()

export const Medical_StaffUpdateArgsSchema: z.ZodType<Prisma.Medical_StaffUpdateArgs> = z.object({
  select: Medical_StaffSelectSchema.optional(),
  include: Medical_StaffIncludeSchema.optional(),
  data: z.union([ Medical_StaffUpdateInputSchema,Medical_StaffUncheckedUpdateInputSchema ]),
  where: Medical_StaffWhereUniqueInputSchema,
}).strict()

export const Medical_StaffUpdateManyArgsSchema: z.ZodType<Prisma.Medical_StaffUpdateManyArgs> = z.object({
  data: z.union([ Medical_StaffUpdateManyMutationInputSchema,Medical_StaffUncheckedUpdateManyInputSchema ]),
  where: Medical_StaffWhereInputSchema.optional(),
}).strict()

export const Medical_StaffDeleteManyArgsSchema: z.ZodType<Prisma.Medical_StaffDeleteManyArgs> = z.object({
  where: Medical_StaffWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]).optional(),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const ReservationsCreateArgsSchema: z.ZodType<Prisma.ReservationsCreateArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  data: z.union([ ReservationsCreateInputSchema,ReservationsUncheckedCreateInputSchema ]),
}).strict()

export const ReservationsUpsertArgsSchema: z.ZodType<Prisma.ReservationsUpsertArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereUniqueInputSchema,
  create: z.union([ ReservationsCreateInputSchema,ReservationsUncheckedCreateInputSchema ]),
  update: z.union([ ReservationsUpdateInputSchema,ReservationsUncheckedUpdateInputSchema ]),
}).strict()

export const ReservationsCreateManyArgsSchema: z.ZodType<Prisma.ReservationsCreateManyArgs> = z.object({
  data: z.union([ ReservationsCreateManyInputSchema,ReservationsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ReservationsDeleteArgsSchema: z.ZodType<Prisma.ReservationsDeleteArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  where: ReservationsWhereUniqueInputSchema,
}).strict()

export const ReservationsUpdateArgsSchema: z.ZodType<Prisma.ReservationsUpdateArgs> = z.object({
  select: ReservationsSelectSchema.optional(),
  include: ReservationsIncludeSchema.optional(),
  data: z.union([ ReservationsUpdateInputSchema,ReservationsUncheckedUpdateInputSchema ]),
  where: ReservationsWhereUniqueInputSchema,
}).strict()

export const ReservationsUpdateManyArgsSchema: z.ZodType<Prisma.ReservationsUpdateManyArgs> = z.object({
  data: z.union([ ReservationsUpdateManyMutationInputSchema,ReservationsUncheckedUpdateManyInputSchema ]),
  where: ReservationsWhereInputSchema.optional(),
}).strict()

export const ReservationsDeleteManyArgsSchema: z.ZodType<Prisma.ReservationsDeleteManyArgs> = z.object({
  where: ReservationsWhereInputSchema.optional(),
}).strict()

export const Pre_Feedback_AnswersCreateArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  data: z.union([ Pre_Feedback_AnswersCreateInputSchema,Pre_Feedback_AnswersUncheckedCreateInputSchema ]),
}).strict()

export const Pre_Feedback_AnswersUpsertArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpsertArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereUniqueInputSchema,
  create: z.union([ Pre_Feedback_AnswersCreateInputSchema,Pre_Feedback_AnswersUncheckedCreateInputSchema ]),
  update: z.union([ Pre_Feedback_AnswersUpdateInputSchema,Pre_Feedback_AnswersUncheckedUpdateInputSchema ]),
}).strict()

export const Pre_Feedback_AnswersCreateManyArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersCreateManyArgs> = z.object({
  data: z.union([ Pre_Feedback_AnswersCreateManyInputSchema,Pre_Feedback_AnswersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Pre_Feedback_AnswersDeleteArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersDeleteArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  where: Pre_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Pre_Feedback_AnswersUpdateArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateArgs> = z.object({
  select: Pre_Feedback_AnswersSelectSchema.optional(),
  include: Pre_Feedback_AnswersIncludeSchema.optional(),
  data: z.union([ Pre_Feedback_AnswersUpdateInputSchema,Pre_Feedback_AnswersUncheckedUpdateInputSchema ]),
  where: Pre_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Pre_Feedback_AnswersUpdateManyArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersUpdateManyArgs> = z.object({
  data: z.union([ Pre_Feedback_AnswersUpdateManyMutationInputSchema,Pre_Feedback_AnswersUncheckedUpdateManyInputSchema ]),
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
}).strict()

export const Pre_Feedback_AnswersDeleteManyArgsSchema: z.ZodType<Prisma.Pre_Feedback_AnswersDeleteManyArgs> = z.object({
  where: Pre_Feedback_AnswersWhereInputSchema.optional(),
}).strict()

export const Survey_ChoicesCreateArgsSchema: z.ZodType<Prisma.Survey_ChoicesCreateArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  data: z.union([ Survey_ChoicesCreateInputSchema,Survey_ChoicesUncheckedCreateInputSchema ]),
}).strict()

export const Survey_ChoicesUpsertArgsSchema: z.ZodType<Prisma.Survey_ChoicesUpsertArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereUniqueInputSchema,
  create: z.union([ Survey_ChoicesCreateInputSchema,Survey_ChoicesUncheckedCreateInputSchema ]),
  update: z.union([ Survey_ChoicesUpdateInputSchema,Survey_ChoicesUncheckedUpdateInputSchema ]),
}).strict()

export const Survey_ChoicesCreateManyArgsSchema: z.ZodType<Prisma.Survey_ChoicesCreateManyArgs> = z.object({
  data: z.union([ Survey_ChoicesCreateManyInputSchema,Survey_ChoicesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Survey_ChoicesDeleteArgsSchema: z.ZodType<Prisma.Survey_ChoicesDeleteArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  where: Survey_ChoicesWhereUniqueInputSchema,
}).strict()

export const Survey_ChoicesUpdateArgsSchema: z.ZodType<Prisma.Survey_ChoicesUpdateArgs> = z.object({
  select: Survey_ChoicesSelectSchema.optional(),
  include: Survey_ChoicesIncludeSchema.optional(),
  data: z.union([ Survey_ChoicesUpdateInputSchema,Survey_ChoicesUncheckedUpdateInputSchema ]),
  where: Survey_ChoicesWhereUniqueInputSchema,
}).strict()

export const Survey_ChoicesUpdateManyArgsSchema: z.ZodType<Prisma.Survey_ChoicesUpdateManyArgs> = z.object({
  data: z.union([ Survey_ChoicesUpdateManyMutationInputSchema,Survey_ChoicesUncheckedUpdateManyInputSchema ]),
  where: Survey_ChoicesWhereInputSchema.optional(),
}).strict()

export const Survey_ChoicesDeleteManyArgsSchema: z.ZodType<Prisma.Survey_ChoicesDeleteManyArgs> = z.object({
  where: Survey_ChoicesWhereInputSchema.optional(),
}).strict()

export const Survey_QuestionsCreateArgsSchema: z.ZodType<Prisma.Survey_QuestionsCreateArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  data: z.union([ Survey_QuestionsCreateInputSchema,Survey_QuestionsUncheckedCreateInputSchema ]),
}).strict()

export const Survey_QuestionsUpsertArgsSchema: z.ZodType<Prisma.Survey_QuestionsUpsertArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereUniqueInputSchema,
  create: z.union([ Survey_QuestionsCreateInputSchema,Survey_QuestionsUncheckedCreateInputSchema ]),
  update: z.union([ Survey_QuestionsUpdateInputSchema,Survey_QuestionsUncheckedUpdateInputSchema ]),
}).strict()

export const Survey_QuestionsCreateManyArgsSchema: z.ZodType<Prisma.Survey_QuestionsCreateManyArgs> = z.object({
  data: z.union([ Survey_QuestionsCreateManyInputSchema,Survey_QuestionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Survey_QuestionsDeleteArgsSchema: z.ZodType<Prisma.Survey_QuestionsDeleteArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  where: Survey_QuestionsWhereUniqueInputSchema,
}).strict()

export const Survey_QuestionsUpdateArgsSchema: z.ZodType<Prisma.Survey_QuestionsUpdateArgs> = z.object({
  select: Survey_QuestionsSelectSchema.optional(),
  include: Survey_QuestionsIncludeSchema.optional(),
  data: z.union([ Survey_QuestionsUpdateInputSchema,Survey_QuestionsUncheckedUpdateInputSchema ]),
  where: Survey_QuestionsWhereUniqueInputSchema,
}).strict()

export const Survey_QuestionsUpdateManyArgsSchema: z.ZodType<Prisma.Survey_QuestionsUpdateManyArgs> = z.object({
  data: z.union([ Survey_QuestionsUpdateManyMutationInputSchema,Survey_QuestionsUncheckedUpdateManyInputSchema ]),
  where: Survey_QuestionsWhereInputSchema.optional(),
}).strict()

export const Survey_QuestionsDeleteManyArgsSchema: z.ZodType<Prisma.Survey_QuestionsDeleteManyArgs> = z.object({
  where: Survey_QuestionsWhereInputSchema.optional(),
}).strict()

export const Donation_HistoryCreateArgsSchema: z.ZodType<Prisma.Donation_HistoryCreateArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  data: z.union([ Donation_HistoryCreateInputSchema,Donation_HistoryUncheckedCreateInputSchema ]),
}).strict()

export const Donation_HistoryUpsertArgsSchema: z.ZodType<Prisma.Donation_HistoryUpsertArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereUniqueInputSchema,
  create: z.union([ Donation_HistoryCreateInputSchema,Donation_HistoryUncheckedCreateInputSchema ]),
  update: z.union([ Donation_HistoryUpdateInputSchema,Donation_HistoryUncheckedUpdateInputSchema ]),
}).strict()

export const Donation_HistoryCreateManyArgsSchema: z.ZodType<Prisma.Donation_HistoryCreateManyArgs> = z.object({
  data: z.union([ Donation_HistoryCreateManyInputSchema,Donation_HistoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Donation_HistoryDeleteArgsSchema: z.ZodType<Prisma.Donation_HistoryDeleteArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  where: Donation_HistoryWhereUniqueInputSchema,
}).strict()

export const Donation_HistoryUpdateArgsSchema: z.ZodType<Prisma.Donation_HistoryUpdateArgs> = z.object({
  select: Donation_HistorySelectSchema.optional(),
  include: Donation_HistoryIncludeSchema.optional(),
  data: z.union([ Donation_HistoryUpdateInputSchema,Donation_HistoryUncheckedUpdateInputSchema ]),
  where: Donation_HistoryWhereUniqueInputSchema,
}).strict()

export const Donation_HistoryUpdateManyArgsSchema: z.ZodType<Prisma.Donation_HistoryUpdateManyArgs> = z.object({
  data: z.union([ Donation_HistoryUpdateManyMutationInputSchema,Donation_HistoryUncheckedUpdateManyInputSchema ]),
  where: Donation_HistoryWhereInputSchema.optional(),
}).strict()

export const Donation_HistoryDeleteManyArgsSchema: z.ZodType<Prisma.Donation_HistoryDeleteManyArgs> = z.object({
  where: Donation_HistoryWhereInputSchema.optional(),
}).strict()

export const Post_Donation_FeedbacksCreateArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  data: z.union([ Post_Donation_FeedbacksCreateInputSchema,Post_Donation_FeedbacksUncheckedCreateInputSchema ]).optional(),
}).strict()

export const Post_Donation_FeedbacksUpsertArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpsertArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereUniqueInputSchema,
  create: z.union([ Post_Donation_FeedbacksCreateInputSchema,Post_Donation_FeedbacksUncheckedCreateInputSchema ]),
  update: z.union([ Post_Donation_FeedbacksUpdateInputSchema,Post_Donation_FeedbacksUncheckedUpdateInputSchema ]),
}).strict()

export const Post_Donation_FeedbacksCreateManyArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksCreateManyArgs> = z.object({
  data: z.union([ Post_Donation_FeedbacksCreateManyInputSchema,Post_Donation_FeedbacksCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Post_Donation_FeedbacksDeleteArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksDeleteArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  where: Post_Donation_FeedbacksWhereUniqueInputSchema,
}).strict()

export const Post_Donation_FeedbacksUpdateArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateArgs> = z.object({
  select: Post_Donation_FeedbacksSelectSchema.optional(),
  include: Post_Donation_FeedbacksIncludeSchema.optional(),
  data: z.union([ Post_Donation_FeedbacksUpdateInputSchema,Post_Donation_FeedbacksUncheckedUpdateInputSchema ]),
  where: Post_Donation_FeedbacksWhereUniqueInputSchema,
}).strict()

export const Post_Donation_FeedbacksUpdateManyArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksUpdateManyArgs> = z.object({
  data: z.union([ Post_Donation_FeedbacksUpdateManyMutationInputSchema,Post_Donation_FeedbacksUncheckedUpdateManyInputSchema ]),
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
}).strict()

export const Post_Donation_FeedbacksDeleteManyArgsSchema: z.ZodType<Prisma.Post_Donation_FeedbacksDeleteManyArgs> = z.object({
  where: Post_Donation_FeedbacksWhereInputSchema.optional(),
}).strict()

export const Post_Feedback_AnswersCreateArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  data: z.union([ Post_Feedback_AnswersCreateInputSchema,Post_Feedback_AnswersUncheckedCreateInputSchema ]),
}).strict()

export const Post_Feedback_AnswersUpsertArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpsertArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereUniqueInputSchema,
  create: z.union([ Post_Feedback_AnswersCreateInputSchema,Post_Feedback_AnswersUncheckedCreateInputSchema ]),
  update: z.union([ Post_Feedback_AnswersUpdateInputSchema,Post_Feedback_AnswersUncheckedUpdateInputSchema ]),
}).strict()

export const Post_Feedback_AnswersCreateManyArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersCreateManyArgs> = z.object({
  data: z.union([ Post_Feedback_AnswersCreateManyInputSchema,Post_Feedback_AnswersCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const Post_Feedback_AnswersDeleteArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersDeleteArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  where: Post_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Post_Feedback_AnswersUpdateArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateArgs> = z.object({
  select: Post_Feedback_AnswersSelectSchema.optional(),
  include: Post_Feedback_AnswersIncludeSchema.optional(),
  data: z.union([ Post_Feedback_AnswersUpdateInputSchema,Post_Feedback_AnswersUncheckedUpdateInputSchema ]),
  where: Post_Feedback_AnswersWhereUniqueInputSchema,
}).strict()

export const Post_Feedback_AnswersUpdateManyArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersUpdateManyArgs> = z.object({
  data: z.union([ Post_Feedback_AnswersUpdateManyMutationInputSchema,Post_Feedback_AnswersUncheckedUpdateManyInputSchema ]),
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
}).strict()

export const Post_Feedback_AnswersDeleteManyArgsSchema: z.ZodType<Prisma.Post_Feedback_AnswersDeleteManyArgs> = z.object({
  where: Post_Feedback_AnswersWhereInputSchema.optional(),
}).strict()

export const ModeratorsCreateArgsSchema: z.ZodType<Prisma.ModeratorsCreateArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  data: z.union([ ModeratorsCreateInputSchema,ModeratorsUncheckedCreateInputSchema ]),
}).strict()

export const ModeratorsUpsertArgsSchema: z.ZodType<Prisma.ModeratorsUpsertArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereUniqueInputSchema,
  create: z.union([ ModeratorsCreateInputSchema,ModeratorsUncheckedCreateInputSchema ]),
  update: z.union([ ModeratorsUpdateInputSchema,ModeratorsUncheckedUpdateInputSchema ]),
}).strict()

export const ModeratorsCreateManyArgsSchema: z.ZodType<Prisma.ModeratorsCreateManyArgs> = z.object({
  data: z.union([ ModeratorsCreateManyInputSchema,ModeratorsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ModeratorsDeleteArgsSchema: z.ZodType<Prisma.ModeratorsDeleteArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  where: ModeratorsWhereUniqueInputSchema,
}).strict()

export const ModeratorsUpdateArgsSchema: z.ZodType<Prisma.ModeratorsUpdateArgs> = z.object({
  select: ModeratorsSelectSchema.optional(),
  include: ModeratorsIncludeSchema.optional(),
  data: z.union([ ModeratorsUpdateInputSchema,ModeratorsUncheckedUpdateInputSchema ]),
  where: ModeratorsWhereUniqueInputSchema,
}).strict()

export const ModeratorsUpdateManyArgsSchema: z.ZodType<Prisma.ModeratorsUpdateManyArgs> = z.object({
  data: z.union([ ModeratorsUpdateManyMutationInputSchema,ModeratorsUncheckedUpdateManyInputSchema ]),
  where: ModeratorsWhereInputSchema.optional(),
}).strict()

export const ModeratorsDeleteManyArgsSchema: z.ZodType<Prisma.ModeratorsDeleteManyArgs> = z.object({
  where: ModeratorsWhereInputSchema.optional(),
}).strict()