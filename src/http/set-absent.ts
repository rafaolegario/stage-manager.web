import { url } from './url'

export async function SetAbsent(id: string) {
   await fetch(`${url}/interns/absent/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
}
