import { Intern } from '../@types/intern'
import { interns } from '../FakeDatabase'

export async function GetAllInterns(): Promise<Intern[]> {
  // conexão HTTP
  return interns
}
