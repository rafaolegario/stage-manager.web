import { z } from 'zod'
import { InternDataInput } from '../@types/intern'

export function ValidateInternFields(data: FormData): InternDataInput {
  const dataFormat = {
    name: data.get('name'),
    age: data.get('age'),
    cpf: data.get('cpf'),
    phone: data.get('phone'),
    email: data.get('email'),
    course: data.get('course'),
    university: data.get('universty'),
    salary: data.get('salary'),
    role: data.get('role'),
    getInHour: data.get('getIn_hour'),
    getOutHour: data.get('getOut_hour'),
    startDate: data.get('start_date'),
    endDate: data.get('end_date'),
    city: data.get('city'),
    cep: data.get('cep'),
    street: data.get('street'),
    neighborhood: data.get('neighborhood'),
    gender: data.get('gender'),
    houseNumber: data.get('house_number'),
  }

  const InternFieldsSchema = z.object({
    name: z.string().min(3),
    age: z.coerce.number().min(16).max(120),
    cpf: z.string().min(14).max(14),
    phone: z.string().min(14).max(14),
    email: z.string().email(),
    course: z.string().min(2),
    university: z.string().min(2),
    salary: z.coerce.number(),
    role: z.string().min(2),
    getInHour: z.string(),
    getOutHour: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    city: z.string().min(2),
    cep: z.string().min(9).max(9),
    street: z.string().min(3),
    neighborhood: z.string().min(3),
    gender: z.string(),
    houseNumber: z.coerce.number().min(1),
  })

  const validateData = InternFieldsSchema.parse(dataFormat)

  return validateData
}
