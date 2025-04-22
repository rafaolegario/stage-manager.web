import dayjs from 'dayjs'

interface ValidateDateParms {
  startDate: string
  endDate: string
}

export async function ValidateDate({ startDate, endDate }: ValidateDateParms) {
  const start = dayjs(startDate)
  const dayBefore = start.subtract(1, 'day');
  const end = dayjs(endDate)

  console.log('to aq')
  if (end.isBefore(dayBefore)) {
    console.log('to aq2')
    throw new Error('A data de conclusão deve ser maior que a data ínicio')
  }
}
