import { InternDataInput } from '../@types/intern'
import { url } from './url'

export async function CreateIntern(data: InternDataInput) {
  const response = await fetch(`${url}/interns/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('Cpf ou email já cadastrados.')
    }
    throw new Error('Erro ao criar estagiário, tente mais tarde!')
  }
  return result
}
