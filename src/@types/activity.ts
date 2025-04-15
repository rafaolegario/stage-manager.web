export interface activity {
  id: string
  title: string
  dueDate: Date
  status:  'finished' | 'unfinished'
  description: string
  score: number
  internIds: string[]
}

export interface activityInput {
  title: string
  dueDate: Date
  description: string
  internIds: string[]
}