
export async function GetInternActivities(id:string) {
  const response = await fetch(`http://localhost:3333/activities/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return data.Activities
}
