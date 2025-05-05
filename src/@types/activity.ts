export interface activity {
  id: string
  title: string
  dueDate: Date
  description: string
  internsIdScore: {
    id: string
    score: number
    status:  'finished' | 'unfinished'
  }[]
}

export interface activityInput {
  title: string
  dueDate: Date
  description: string
  internIds: string[]
}