import { url } from "./url"

export async function deleteActivity(internId: string ,actId: string){
    const response = await fetch(`${url}/activities/${internId}/${actId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    })

     
  return response
      
}