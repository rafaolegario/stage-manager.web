import dayjs from 'dayjs'

interface ValidateDateParms {
  startDate: string
  endDate: string
}

export function ValidateDate({ startDate, endDate }: ValidateDateParms) {
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  if (end.isBefore(start)) {
    throw new Error('A data de conclusão deve ser maior que a data ínicio')
  }
}
