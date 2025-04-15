import { InternDataInput } from '../@types/intern'
import { Address, interns } from '../FakeDatabase'

export async function CreateIntern(data: InternDataInput) {
  const id = (Math.random() * 200).toString()
  interns.push({
    id,
    ...data,
    onWork: false,
    delayed: 0,
    absent: 0,
  })

  Address.push({
    id: (Math.random() * 660).toString(),
    city: data.city,
    cep: data.cep,
    street: data.street,
    neighborhood: data.neighborhood,
    houseNumber: data.houseNumber,
    internId: [id],})
}
