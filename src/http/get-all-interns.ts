import { InternWithAddress } from '../@types/intern'
import { url } from './url'

export async function GetAllInterns(): Promise<InternWithAddress[]> {
  const response = await fetch(`${url}/interns`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data.interns
}
