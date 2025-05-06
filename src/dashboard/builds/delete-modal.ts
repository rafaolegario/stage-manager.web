import { activity } from "../../@types/activity"
import { InternWithAddress } from "../../@types/intern"
import { deleteActivityController } from "../controllers/delete-activity-controller"

    export function DeleteModal(activity: activity, intern:InternWithAddress) {
        if (document.querySelector('.rate-modal')) return
      
        const modal = document.createElement('div')
        modal.className = 'rate-modal'
      
        const modalContent = document.createElement('div')
        modalContent.className = 'modal-content'
      
        const title = document.createElement('h3')
        title.textContent = 'Excluir atividade'
      
        const activityTitle = document.createElement('p')
        const activityStrong = document.createElement('strong')
        activityStrong.textContent = activity.title
        activityTitle.appendChild(activityStrong)
      
      
        const actions = document.createElement('div')
        actions.className = 'modal-actions'
      
        const submitBtn = document.createElement('button')
        submitBtn.id = 'submitRating'
        submitBtn.textContent = 'Confirmar'
      
        const cancelBtn = document.createElement('button')
        cancelBtn.id = 'cancelRating'
        cancelBtn.textContent = 'Cancelar'
        cancelBtn.style.backgroundColor = 'red'
      
        cancelBtn.addEventListener('click', () => {
          modal.remove()
          deleteActivityController(activity.id, intern, false )
        })
      
        submitBtn.addEventListener('click', () => {
          modal.remove()
          deleteActivityController(activity.id, intern, true )
        })
      
        actions.appendChild(submitBtn)
        actions.appendChild(cancelBtn)
      
        modalContent.appendChild(title)
        modalContent.appendChild(activityTitle)
        modalContent.appendChild(actions)
      
        modal.appendChild(modalContent)
        document.body.appendChild(modal)
      }
  
      