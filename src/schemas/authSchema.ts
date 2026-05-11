import z from "zod";

export const authSchema = z.strictObject({
  userName: z.string().min(1, "User name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  biometria: z.string().min(1, "Biometric data is required") // <-- NUEVO CAMPO OBLIGATORIO
})

export type AuthInput = z.infer<typeof authSchema>;