import { url } from './url'

export async function GetInternActivities(id: string) {
  const response = await fetch(`${url}/activities/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return data.Activities
}
