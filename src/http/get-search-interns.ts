import { Intern } from '../@types/intern'
import { interns } from '../FakeDatabase'

export async function GetSearchInterns(query: string): Promise<Intern[]> {
  // conexão HTTP
  const data = interns.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  )
  return data
}
