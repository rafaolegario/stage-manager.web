import { activities } from "../FakeDatabase"



export async function GetInternActivities(id:string) {
  const InternActivities = activities.filter((item) =>
    item.internIds.includes(id),
  )
  return InternActivities
}
