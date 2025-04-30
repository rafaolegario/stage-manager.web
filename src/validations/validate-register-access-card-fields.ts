import { z } from 'zod'

export function ValidateRegisterAccessCardFields(data: FormData) {
  const dataFormat = {
    internId: data.get('intern'),
    cardId: data.get('cardId'),
  }

  const InternFieldsSchema = z.object({
    internId: z.string(),
    cardId: z.string()
  })

  const validateData = InternFieldsSchema.parse(dataFormat)

  return validateData
}
