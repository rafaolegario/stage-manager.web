import dayjs from 'dayjs'
import { SetLateness } from '../http/set-lateness'
import { SetAbsent } from '../http/set-absent'

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

// Cada usuário terá seu próprio status de "já trabalhou no dia"
const workInDayMap: Record<string, number> = {}

export function VerifyStatus({
  status,
  getIn = "08:00", // Definindo 8:00 AM para teste
  getOut = "18:00" // Definindo 18:00 PM para teste
}: VerifyStatusParams, id: string): VerifyStatusResult {
  
  // Mockando o horário atual para 8:00 AM
  const today = dayjs("2025-04-30T07:38:00"); // Definindo um horário fixo, ex: 30 de abril de 2025 às 8:00 AM
  const formattedDate = today.format("YYYY-MM-DD");

  const GetInHour = dayjs(`${formattedDate} ${getIn}`)
  const GetOutHour = dayjs(`${formattedDate} ${getOut}`)

  const delayMinutes = today.diff(GetInHour, 'minute')

  // Verificar se já registramos um atraso hoje usando localStorage
  const lastDelayDate = localStorage.getItem(`${id}_delayDate`);
  
  // Se já foi marcado um atraso no mesmo dia, não faz nada
  if (lastDelayDate === formattedDate) {
    return {
      icon: statusIcons.yellow,
      situation: statusSituation.delayed,
    }
  }

  // Se está atrasado entre 6 e 20 minutos
  if (status === 0 && delayMinutes > 5 && delayMinutes <= 20) {
    SetLateness(id)
    
    // Armazenar que o atraso foi registrado para o dia de hoje
    localStorage.setItem(`${id}_delayDate`, formattedDate);
    
    return {
      icon: statusIcons.yellow,
      situation: statusSituation.delayed,
    }
  }

  // Se ainda não trabalhou e passou do horário de saída
  if (today.isAfter(GetOutHour) && !workInDayMap[id]) {
    SetAbsent(id)
  }

  // Se status for 0, está ausente
  if (status === 0) {
    workInDayMap[id] = 0
    return {
      icon: statusIcons.gray,
      situation: statusSituation.absent,
    }
  }

  // Se chegou até aqui, está em serviço
  workInDayMap[id] = 1

  return {
    icon: statusIcons.green,
    situation: statusSituation.inService,
  }
}
