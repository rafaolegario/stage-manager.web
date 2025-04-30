import { url } from "./url"

export async function GetSearchInterns(query: string) {
  // conexão HTTP
  const response = await fetch(`${url}/interns/search/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return data.interns
}
