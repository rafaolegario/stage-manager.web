import dayjs from 'dayjs'

interface ValidateDateParms {
  startDate: string
  endDate: string
}

export async function ValidateDate({ startDate, endDate }: ValidateDateParms) {
  const start = dayjs(startDate)
  const dayBefore = start.subtract(1, 'day')
  const end = dayjs(endDate)

  if (end.isBefore(dayBefore)) {
    throw new Error('A data de conclusão deve ser maior que a data ínicio')
  }
}
