import { activity } from "../../@types/activity";
import { address } from "../../@types/address";
import { Intern } from "../../@types/intern";
import { GetAddress } from "../../http/get-address";
import { GetInternActivities } from "../../http/get-intern-activites";
import { deleteActivityController } from "../controllers/delete-activity-controller";

export async function viewInternInfos(intern: Intern){
  const activities : activity[] = await GetInternActivities(intern.id)
  const dash: any = document.querySelector('.dashboard')

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

  const createCard = (title: string, fields: { label: string, value: string }[]) => {
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

  internSection.appendChild(createCard('Dados Pessoais', [
    { label: 'Nome', value: intern.name },
    { label: 'Idade', value: String(intern.age) },
    { label: 'Gênero', value: intern.gender }, 
    { label: 'CPF', value: intern.cpf },
    { label: 'Telefone', value: intern.phone }
  ]))

  const Address : address = await GetAddress(intern.id)

  internSection.appendChild(createCard('Endereço', [
    { label: 'Rua', value: Address.street },
    { label: 'Bairro', value: Address.neighborhood },
    { label: 'Cidade', value: Address.city },
    { label: 'CEP', value: Address.cep },
    { label: 'Número', value: Address.houseNumber }
  ]))

  internSection.appendChild(createCard('Empresa', [
    { label: 'Função', value: intern.role },
    { label: 'Início', value: intern.startDate.toLocaleDateString('pt-BR') },
    { label: 'Término', value: intern.endDate.toLocaleDateString('pt-BR') },
    { label: 'Entrada', value: intern.getInHour },
    { label: 'Saída', value: intern.getOutHour },
    { label: 'Salário', value: `R$${intern.salary.toFixed(2)}` }
  ]))

  internSection.appendChild(createCard('Status', [
    { label: 'Atrasos', value: String(intern.delayed) },
    { label: 'Faltas', value: String(intern.absent) },
    { label: 'Atividades pendentes', value: '2' },
    { label: 'Concluídas', value: '5' }
  ]))

  internSection.appendChild(createCard('Curso', [
    { label: 'Curso', value: intern.course },
    { label: 'Universidade', value: intern.university }
  ]))

  const activityCard = document.createElement('div')
  activityCard.className = 'card'

  const activitiesContainer = document.createElement('div')
  activitiesContainer.className = 'activities'

  const activitiesTitle = document.createElement('h3')
  activitiesTitle.textContent = 'Atividades'
  activitiesContainer.append(activitiesTitle)

  if(activities.length === 0){
    const activitiesInfo = document.createElement('p')
    activitiesTitle.textContent = 'Nenhuma atividade'
    activitiesContainer.append(activitiesInfo)
  }else{
    for (const act of activities) {
      const activityDiv = document.createElement('div')
      activityDiv.className = 'activity'
  
      const p1 = document.createElement('p')
      const p1Strong = document.createElement('strong')
      p1Strong.textContent = act.title
      p1.appendChild(p1Strong)
  
      const p2 = document.createElement('p')
      p2.textContent = `Entrega: ${act.dueDate.toLocaleDateString('pt-BR')}`
  
      const p3 = document.createElement('p')
      let status = ''
      if(act.status === 'unfinished'){
        status = 'Pendente'
      }else{
        status = 'Concluída'
      }
      p3.textContent = `Status: ${status}`
  
      const actions = document.createElement('div')
      actions.className = 'actions'
  
      const eyeIcon = document.createElement('i')
      eyeIcon.className = 'fa-solid fa-eye'
  
      const button = document.createElement('button')
      button.textContent = 'Avaliar'
      const trashBtn = document.createElement('button')
      trashBtn.textContent = 'Excluir'
      trashBtn.style.backgroundColor = "red"

      trashBtn.addEventListener('click', ()=>{
        deleteActivityController(act.id, intern)
      })
  
      actions.appendChild(eyeIcon)
      actions.appendChild(button)
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
  graphTitle.textContent = 'Análise de Frequência'
  graphDiv.appendChild(graphTitle)

  extraSection.appendChild(graphDiv)
  viewDiv.appendChild(extraSection)

  dashboard.appendChild(viewDiv)
}