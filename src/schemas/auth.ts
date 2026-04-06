import z from "zod";

export const authSchema = z.strictObject({
  userId: z.string().min(1, "User ID is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  authHash: z.string().min(1, "Auth hash is required")
})

export type AuthInput = z.infer<typeof authSchema>;