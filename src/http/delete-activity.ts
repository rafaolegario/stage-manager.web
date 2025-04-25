
export async function deleteActivity(internId: string ,actId: string){
    const response = await fetch(`http://localhost:3333/activities/${internId}/${actId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    })

     
  return response
      
}