import { url } from './url'

export async function SetLateness(id: string) {
   await fetch(`${url}/interns/lateness/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
}
