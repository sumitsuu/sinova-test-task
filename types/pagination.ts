import z from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type Pagination = z.infer<typeof PaginationSchema>;
