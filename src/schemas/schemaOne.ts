import * as z from 'zod';

export const schemaOne = z.strictObject({
  name: z.string().min(1, "Name is required"),
  mail: z.email("Invalid email address"),
  pass: z.string().min(8, "Password must be at least 8 characters long")
})
