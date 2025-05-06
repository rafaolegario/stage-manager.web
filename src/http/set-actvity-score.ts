import { url } from "./url";

export async function SetScoreHttp(data: {score: number}, interId: string, activityId: string){
    const response = await fetch(`${url}/activities/rate/${interId}/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

  const result = await response.json()

  if (!response.ok) {
    throw new Error('Erro ao avaliar atividade, tente mais tarde!')
  }

  return result
}