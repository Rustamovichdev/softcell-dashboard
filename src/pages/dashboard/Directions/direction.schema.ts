
import { z } from "zod";

export const directionSchema = z.object({
  name: z
    .string()
    .min(2, "Nomi kamida 2 ta belgidan iborat bo'lishi kerak")
    .max(100, "Nomi 100 ta belgidan oshmasin"),
  description: z
    .string()
    .min(5, "Tavsif kamida 5 ta belgidan iborat bo'lishi kerak")
    .max(500, "Tavsif 500 ta belgidan oshmasin"),
  status: z.enum(["active", "inactive"]),
});

export type DirectionFormValues = z.infer<typeof directionSchema>;
