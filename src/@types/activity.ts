export interface activity {
  id: string
  title: string
  dueDate: Date
  status:  'finished' | 'unfinished'
  description: string
  internsIdScore: {
    id: string
    score: number
  }[]
}

export interface activityInput {
  title: string
  dueDate: Date
  description: string
  internIds: string[]
}