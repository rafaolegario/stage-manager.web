export interface Intern {
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
  onWork: boolean
  getInHour: string
  getOutHour: string
  startDate: Date
  endDate: Date
  delayed: number
  absent: number
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
}
