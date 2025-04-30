
import { url } from './url'

export async function RegisterAccessCard(internId: string, rfIdCard: string) {
  const response = await fetch(`${url}/interns/RFID/${internId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({rfIdCard}),
  })

  const result = await response.json()

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('Cartão já associado.')
    }
    throw new Error('Erro ao registrar cartão, tente mais tarde!')
  }

  return result
}
