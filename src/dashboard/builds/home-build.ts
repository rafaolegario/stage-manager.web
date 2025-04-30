import { VerifyStatus, StatusData } from '../../utils/VerifyStatus'
import { InternWithAddress } from '../../@types/intern'
import { viewInternInfos } from './view-intern-infos-build'

export async function buildHome(
  data: InternWithAddress[],
  search?: boolean,
): Promise<void> {
  search = search ?? false

  const InfoDiv = document.createElement('div')

  InfoDiv.className = 'info'

  document.querySelector('.dashboard')?.append(InfoDiv)

  const Dashboard: HTMLElement | null = document.querySelector('.info')

  if (!Dashboard) {
    return
  }

  Dashboard.innerHTML = ''

  const homeDiv: HTMLDivElement = document.createElement('div')
  homeDiv.className = 'home'

  const internsDiv: HTMLDivElement = document.createElement('div')
  internsDiv.className = 'interns'

  if (!data || (data.length === 0 && search)) {
    internsDiv.style.color = '#fff'
    const p = document.createElement('p')
    const i = document.createElement('i')
    p.innerText = 'Nenhum estagiário encontrado!'
    i.className = 'fa-solid fa-file-excel'
    i.style.fontSize = '45px'
    internsDiv.append(p, i)
  }

  if (!data || (data.length === 0 && !search)) {
    internsDiv.style.color = '#fff'
    internsDiv.innerText = 'Nenhum estagiário cadastrado!'
  } else {
    data.forEach((item) => {
      const intern = item.intern
      const internDiv: HTMLDivElement = document.createElement('div')
      internDiv.className = 'intern'

      const userDiv: HTMLDivElement = document.createElement('div')
      userDiv.className = 'user'

      const userIcon: HTMLElement = document.createElement('i')
      userIcon.className = 'fa-solid fa-user'
      userDiv.appendChild(userIcon)

      const userName: HTMLHeadingElement = document.createElement('h3')
      userName.textContent = intern.name
      userDiv.appendChild(userName)

      internDiv.appendChild(userDiv)

      const infosDiv1: HTMLDivElement = document.createElement('div')
      infosDiv1.className = 'infos'

      const functionLabel: HTMLParagraphElement = document.createElement('p')
      functionLabel.textContent = 'Função:'
      infosDiv1.appendChild(functionLabel)

      const functionValue: HTMLSpanElement = document.createElement('span')
      functionValue.textContent = intern.role
      infosDiv1.appendChild(functionValue)

      internDiv.appendChild(infosDiv1)

      const infosDiv2: HTMLDivElement = document.createElement('div')
      infosDiv2.className = 'infos'

      const statusLabel: HTMLParagraphElement = document.createElement('p')
      statusLabel.textContent = 'Status:'
      infosDiv2.appendChild(statusLabel)

      const statusData: StatusData = VerifyStatus({
        status: intern.onWork,
        getIn: intern.getInHour,
        getOut: intern.getOutHour,
      }, intern.id)

      const statusIcon: HTMLElement = document.createElement('i')
      statusIcon.className = statusData.icon
      infosDiv2.appendChild(statusIcon)

      const statusValue: HTMLSpanElement = document.createElement('span')
      statusValue.textContent = ` ${statusData.situation}`
      infosDiv2.appendChild(statusValue)

      internDiv.appendChild(infosDiv2)

      const eyeIcon: HTMLElement = document.createElement('i')
      eyeIcon.className = 'fa-solid fa-eye'
      eyeIcon.addEventListener('click', () => {
        viewInternInfos(item)
      })
      internDiv.appendChild(eyeIcon)

      internsDiv.appendChild(internDiv)
    })
  }

  homeDiv.appendChild(internsDiv)

  Dashboard.appendChild(homeDiv)
}
