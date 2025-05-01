import { z } from 'zod'

const InterestItemSchema = z.object({
  name: z.string(),
  badgeColor: z.string(),
});

const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  age: z.number(),
  mobile: z.string(),
  interests: z.array(InterestItemSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
