import { InternDataInput } from '../@types/intern'
import { interns } from '../FakeDatabase'

export async function CreateIntern(data: InternDataInput) {
  
  interns.push({
    internId: (Math.random() * 200).toString(),
    ...data,
    onWork: false,
    delayed: 0,
    absent: 0,
  })
}
