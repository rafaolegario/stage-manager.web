import { activity } from "../../@types/activity"

    export function RateModal(activity: activity) {
        if (document.querySelector('.rate-modal')) return
      
        const modal = document.createElement('div')
        modal.className = 'rate-modal'
      
        const modalContent = document.createElement('div')
        modalContent.className = 'modal-content'
      
        const title = document.createElement('h3')
        title.textContent = 'Avaliar Atividade'
      
        const activityTitle = document.createElement('p')
        const activityStrong = document.createElement('strong')
        activityStrong.textContent = activity.title
        activityTitle.appendChild(activityStrong)
      
        const dueDate = document.createElement('p')
        dueDate.textContent = `Entrega: ${new Date(activity.dueDate).toLocaleDateString()}`
      
        const status = document.createElement('p')
        status.textContent = `Status: ${activity.internsIdScore[0].status === 'unfinished' ? 'Pendente' : 'Concluída'}`
      
        const labelScore = document.createElement('label')
        labelScore.htmlFor = 'score'
        labelScore.textContent = 'Nota (0 a 10):'
      
        const inputScore = document.createElement('input')
        inputScore.type = 'number'
        inputScore.id = 'score'
        inputScore.min = '0'
        inputScore.max = '10'
      
        const actions = document.createElement('div')
        actions.className = 'modal-actions'
      
        const submitBtn = document.createElement('button')
        submitBtn.id = 'submitRating'
        submitBtn.textContent = 'Salvar'
      
        const cancelBtn = document.createElement('button')
        cancelBtn.id = 'cancelRating'
        cancelBtn.textContent = 'Cancelar'
        cancelBtn.style.backgroundColor = 'red'
      
        cancelBtn.addEventListener('click', () => {
          modal.remove()
        })
      
        submitBtn.addEventListener('click', () => {
          const scoreValue = inputScore.value
          console.log(`Nota: ${scoreValue} para atividade: ${activity.title}`)
          modal.remove()
        })
      
        actions.appendChild(submitBtn)
        actions.appendChild(cancelBtn)
      
        modalContent.appendChild(title)
        modalContent.appendChild(activityTitle)
        modalContent.appendChild(dueDate)
        modalContent.appendChild(status)
        modalContent.appendChild(labelScore)
        modalContent.appendChild(inputScore)
        modalContent.appendChild(actions)
      
        modal.appendChild(modalContent)
        document.body.appendChild(modal)
      }
  
      