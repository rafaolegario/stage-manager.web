import { activityInput } from '../@types/activity'
import { activities} from '../FakeDatabase'

export async function CreateActivity(data: activityInput) {
  console.log('data', data)
  activities.push({
    id: (Math.random() * 200).toString(),
    ...data,
    score: 0,
    status: 'unfinished',
   
  })
}
