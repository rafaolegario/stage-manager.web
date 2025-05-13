import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { activity } from '../../@types/activity'
import { InternWithAddress } from '../../@types/intern'
import { GetInternActivities } from '../../http/get-intern-activites'
import { DeleteModal } from './delete-modal'
import { RateModal } from './rate-modal'
import { ViewModal } from './view-activity-modal'

export async function viewInternInfos(Intern: InternWithAddress) {
  const FetchActivities: activity[] = await GetInternActivities(
    Intern.intern.id,
  )
  const dash: any = document.querySelector('.dashboard')
  const intern = Intern.intern
  const Address = Intern.internAddress
  dash.innerHTML = ''

  const InfoDiv = document.createElement('div')

  InfoDiv.className = 'info'

  dash.append(InfoDiv)

  const dashboard: any = document.querySelector('.info')

  dashboard.innerHTML = ''
  const viewDiv = document.createElement('div')
  viewDiv.className = 'view-intern'

  const header = document.createElement('header')
  const title = document.createElement('h2')
  title.textContent = '/Visualizar estagiário'
  header.appendChild(title)
  viewDiv.appendChild(header)

  const internSection = document.createElement('section')
  internSection.className = 'intern-details'

  const createCard = (
    title: string,
    fields: { label: string; value: string }[],
  ) => {
    const card = document.createElement('div')
    card.className = 'card'

    const h3 = document.createElement('h3')
    h3.textContent = title
    card.appendChild(h3)

    for (const field of fields) {
      const p = document.createElement('p')
      const strong = document.createElement('strong')
      strong.textContent = `${field.label}: `
      p.appendChild(strong)
      p.append(field.value)
      card.appendChild(p)
    }

    return card
  }

  internSection.appendChild(
    createCard('Dados Pessoais', [
      { label: 'Nome', value: intern.name },
      { label: 'Idade', value: String(intern.age) },
      { label: 'Gênero', value: intern.gender },
      { label: 'CPF', value: intern.cpf },
      { label: 'Telefone', value: intern.phone },
      { label: 'Email', value: intern.email },
    ]),
  )

  internSection.appendChild(
    createCard('Endereço', [
      { label: 'Rua', value: Address.street },
      { label: 'Bairro', value: Address.neighborhood },
      { label: 'Cidade', value: Address.city },
      { label: 'CEP', value: Address.cep },
      { label: 'Número', value: Address.houseNumber },
    ]),
  )

  internSection.appendChild(
    createCard('Empresa', [
      { label: 'Função', value: intern.role },
      {
        label: 'Início',
        value: new Date(intern.startDate).toLocaleDateString(),
      },
      {
        label: 'Término',
        value: new Date(intern.endDate).toLocaleDateString(),
      },
      { label: 'Entrada', value: intern.getInHour },
      { label: 'Saída', value: intern.getOutHour },
      { label: 'Salário', value: `R$${intern.salary.toFixed(2)}` },
      { label: 'Cartão de acesso', value: intern.rfIdCard },
    ]),
  )

  internSection.appendChild(
    createCard('Status', [
      { label: 'Atrasos', value: String(intern.lateness) },
      { label: 'Faltas', value: String(intern.absent) },
    ]),
  )

  internSection.appendChild(
    createCard('Curso', [
      { label: 'Curso', value: intern.course },
      { label: 'Universidade', value: intern.university },
    ]),
  )

  const activityCard = document.createElement('div')
  activityCard.className = 'card'

  const activitiesContainer = document.createElement('div')
  activitiesContainer.className = 'activities'

  const activitiesTitle = document.createElement('h3')
  activitiesTitle.textContent = 'Atividades'
  activitiesContainer.append(activitiesTitle)

  if (FetchActivities.length === 0) {
    const activitiesInfo = document.createElement('p')
    activitiesTitle.textContent = 'Nenhuma atividade'
    activitiesContainer.append(activitiesInfo)
  } else {
    for (const act of FetchActivities) {
      const activityDiv = document.createElement('div')
      activityDiv.className = 'activity'

      const p1 = document.createElement('p')
      const p1Strong = document.createElement('strong')
      p1Strong.textContent = act.title
      p1.appendChild(p1Strong)

      const p2 = document.createElement('p')
      p2.textContent = `Entrega: ${new Date(act.dueDate).toLocaleDateString()}`

      const p3 = document.createElement('p')
      let status = ''
      if (act.internsIdScore[0].status === 'unfinished') {
        status = 'Pendente'
      } else {
        status = 'Concluída'
      }
      p3.textContent = `Status: ${status}`

      const actions = document.createElement('div')
      actions.className = 'actions'

      const eyeIcon = document.createElement('i')
      eyeIcon.className = 'fa-solid fa-eye'
      eyeIcon.addEventListener('click', () => {
        ViewModal(act)
      })

      const button = document.createElement('button')
      button.textContent = 'Avaliar'
      button.addEventListener('click', () => {
        RateModal(act, Intern)
      })

      const trashBtn = document.createElement('button')
      trashBtn.textContent = 'Excluir'
      trashBtn.style.backgroundColor = 'red'

      trashBtn.addEventListener('click', () => {
        DeleteModal(act, Intern)
      })

      actions.appendChild(eyeIcon)
      if (act.internsIdScore[0].status === 'unfinished') {
        actions.appendChild(button)
      }
      actions.appendChild(trashBtn)

      activityDiv.appendChild(p1)
      activityDiv.appendChild(p2)
      activityDiv.appendChild(p3)
      activityDiv.appendChild(actions)

      activitiesContainer.appendChild(activityDiv)
    }
  }

  activityCard.appendChild(activitiesContainer)
  internSection.appendChild(activityCard)

  viewDiv.appendChild(internSection)

  const extraSection = document.createElement('section')
  extraSection.className = 'extra'

  const downloadBtn = document.createElement('a')
  downloadBtn.href = 'recebe-arquivo'
  downloadBtn.className = 'download-btn'
  downloadBtn.textContent = 'Baixar perfil '

  const downloadIcon = document.createElement('i')
  downloadIcon.className = 'fa-solid fa-download'
  downloadBtn.appendChild(downloadIcon)

  extraSection.appendChild(downloadBtn)

  const graphDiv = document.createElement('div')
  graphDiv.className = 'graph'

  const graphTitle = document.createElement('h3')
  graphTitle.textContent = 'Análise de notas'
  graphDiv.appendChild(graphTitle)

const scoreCanvas = document.createElement('canvas')
scoreCanvas.id = 'scoreChart'
graphDiv.appendChild(scoreCanvas)

Chart.register(
  CategoryScale,
  LinearScale,
  LineController, 
  LineElement, 
  PointElement, 
  Title,
  Tooltip,
  Legend
);
// Pega os títulos e notas das atividades
const activityTitles: string[] = []
const activityScores: number[] = []

FetchActivities.forEach(act => {
  console.log(act)
  const score = act.internsIdScore[0]?.score
  if (score !== undefined && score !== null) {
    activityTitles.push(act.title)
    activityScores.push(score)
  }
})

console.log(activityScores)

// Aguarda DOM carregar e cria o gráfico
setTimeout(() => {
  const ctx = document.getElementById('scoreChart') as HTMLCanvasElement
  if (!ctx || activityScores.length === 0) return alert()

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: activityTitles,
      datasets: [{
        label: 'Nota da Atividade',
        data: activityScores, // Notas
        fill: false, // Preenchimento abaixo da linha (false significa sem preenchimento)
        borderColor: 'rgba(255, 99, 132, 1)', // Cor da linha (mudada para vermelho)
        borderWidth: 3, // Tamanho da linha (espessura)
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Cor dos pontos de dados (azul)
        pointBorderColor: 'rgba(54, 162, 235, 1)', // Cor da borda dos pontos
        pointBorderWidth: 2, // Largura da borda dos pontos
        pointRadius: 6, // Tamanho dos pontos (aumentado)
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // Cor dos pontos ao passar o mouse (verde)
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Cor da borda ao passar o mouse
        pointHoverBorderWidth: 2, // Largura da borda ao passar o mouse
        pointHoverRadius: 8, // Tamanho do ponto ao passar o mouse
        tension: 0.1 // Suavização da linha
      }]
    },
    options: {
      responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10
        }
      }
    }
  })
}, 0)

  extraSection.appendChild(graphDiv)
  viewDiv.appendChild(extraSection)

  dashboard.appendChild(viewDiv)
}
