import z from "zod";

export const authSchema = z.strictObject({
  userName: z.string().min(1, "User name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long")
})

export type AuthInput = z.infer<typeof authSchema>;