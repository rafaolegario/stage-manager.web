import dayjs from 'dayjs'

interface StatusIcons {
  green: string
  yellow: string
  gray: string
}

interface StatusSituation {
  inService: string
  delayed: string
  absent: string
}

interface VerifyStatusResult {
  icon: string
  situation: string
}

interface VerifyStatusParams {
  status: number
  getIn: string
  getOut: string
}

export interface StatusData {
  icon: string
  situation: string
}

const statusIcons: StatusIcons = {
  green: 'fa-solid fa-circle green',
  yellow: 'fa-solid fa-circle yellow',
  gray: 'fa-solid fa-circle gray',
}

const statusSituation: StatusSituation = {
  inService: 'Em serviço',
  delayed: 'Atrasado',
  absent: 'Ausente',
}

export function VerifyStatus({
  status,
  getIn,
  getOut,
}: VerifyStatusParams): VerifyStatusResult {
  // const today = dayjs();
  // const formattedDate = today.toISOString().split("T")[0]; // Obtém YYYY-MM-DD

  const formattedDate = '2025-03-23'

  const GetInHour = dayjs(`${formattedDate} ${getIn}`)

  const GetOutHour = dayjs(`${formattedDate} ${getOut}`)

  const now = dayjs('2025-03-23 08:00:00 GMT-0300')

  const delayMinutes = now.diff(GetInHour, 'minute')

  if (status === 0 && delayMinutes > 5 && delayMinutes <= 20) {
    return {
      icon: statusIcons.yellow,
      situation: statusSituation.delayed,
    }
  }

  // Verifica se deve remover o ponto (1 hora após o horário de saída)
  const removedLimit = GetOutHour.add(1, 'hour')
  if (now.isAfter(removedLimit)) {
    return {
      icon: statusIcons.gray,
      situation: statusSituation.absent,
    }
  }

  if (status === 0) {
    return {
      icon: statusIcons.gray,
      situation: statusSituation.absent,
    }
  }

  return {
    icon: statusIcons.green,
    situation: statusSituation.inService,
  }
}
