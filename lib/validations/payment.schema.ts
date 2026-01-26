import { z } from 'zod'

export const createCheckoutSchema = z.object({
  resumeId: z.string().min(1, 'ID du CV requis'),
})

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>
