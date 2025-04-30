import { addressDTO } from "./address"

export interface InternDTO {
  id: string
  name: string
  gender: string
  age: number
  cpf: string
  phone: string
  email: string
  course: string
  university: string
  salary: number
  role: string
  onWork: number
  getInHour: string
  getOutHour: string
  startDate: Date
  endDate: Date
  lateness: number
  absent: number
  rfIdCard: string
}

export interface InternDataInput {
  name: string
  age: number
  gender: string
  cpf: string
  phone: string
  email: string
  course: string
  university: string
  salary: number
  role: string
  getInHour: string
  getOutHour: string
  startDate: Date
  endDate: Date
  city: string
  cep: string
  street: string
  neighborhood: string
  houseNumber: string
}

export interface InternWithAddress {
  intern: InternDTO
  internAddress: addressDTO 
}