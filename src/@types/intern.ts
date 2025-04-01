export interface Intern {
  internId: string
  name: string
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
  startDate: string
  endDate: string
  delayed: number
  absent: number
}

export interface InternDataInput {
  name: string
  age: number
  cpf: string
  phone: string
  email: string
  course: string
  university: string
  salary: number
  role: string
  getInHour: string
  getOutHour: string
  startDate: string
  endDate: string
}
