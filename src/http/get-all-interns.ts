import {  InternWithAddress } from '../@types/intern'

export async function GetAllInterns(): Promise<InternWithAddress[]> {
  const response = await fetch('http://localhost:3333/interns', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data.interns
}
