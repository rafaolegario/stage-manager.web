import { activities } from "../FakeDatabase";

export async function deleteActivity(actId: string){
    const index = activities.findIndex(item => item.id == actId)
    activities.splice(index, 1)
}