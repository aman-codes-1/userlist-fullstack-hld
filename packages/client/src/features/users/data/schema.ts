import { z } from "zod";

const InterestItemSchema = z.object({
  name: z.string(),
  badgeColor: z.string(),
});

const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  age: z.number(),
  mobile: z.string(),
  interests: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UserListSchema = z.array(UserSchema);

export type InterestItem = z.infer<typeof InterestItemSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserList = z.infer<typeof UserListSchema>;
