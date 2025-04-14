export interface activity {
  id: string
  title: string
  dueDate: Date
  status: ['finished', 'delayed', 'unfinished']
  description: string
  score: number
}