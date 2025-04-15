import { z } from 'zod'
import { activityInput } from '../@types/activity'

export function ValidateActivityFields(data: FormData): activityInput {
  const dataFormat = {
    title: data.get('title'),
    dueDate: data.get('due_date'),
    description: data.get('description'),
    internIds: data.getAll('interns'),
  }

  const InternFieldsSchema = z.object({
    title: z.string().min(3),
    dueDate: z.string().transform((val) => new Date(val)),
    description: z.string(),
    internIds: z.array(z.string()).min(1),
  })

  const validateData = InternFieldsSchema.parse(dataFormat)

  return validateData
}
