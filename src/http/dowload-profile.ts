import { activity } from '../@types/activity'
import { InternWithAddress } from '../@types/intern'
import { url } from './url'

export async function downloadProfile(
  Intern: InternWithAddress,
  Act: activity[],
) {
  const data = {
    intern: Intern.intern,
    Activity: Act,
  }

  try {
    const response = await fetch(`${url}/interns/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Erro ao baixar o relatório')
    }

    const blob = await response.blob()
    const downloadUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = 'relatorio_estagiario.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('Erro no download:', error)
  }
}
