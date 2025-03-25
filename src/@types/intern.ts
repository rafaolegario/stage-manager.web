export interface Intern {
  intern_id: string
  name: string
  age: number
  cpf: string
  phone: string
  email: string
  course: string
  university: string
  salary: number
  role: string
  on_work: boolean
  getIn_hour: string
  getOut_hour: string
  start_date: string
  end_date: string
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
  getIn_hour: string
  getOut_hour: string
  start_date: string
  end_date: string
}