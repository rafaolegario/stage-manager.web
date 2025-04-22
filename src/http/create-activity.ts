import { activityInput } from '../@types/activity'

export async function CreateActivity(data: activityInput) {
  const response = await fetch('http://localhost:3333/activities/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error('Erro ao criar atividade, tente mais tarde!')
  }

  return result
}
