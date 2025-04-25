import { ZodError } from 'zod'
import { sendFieldsErrorNotification } from '../../utils/send-fields-error-notification'
import { ToastfyPopUp } from '../../utils/toastfy-popup'
import { ValidateDate } from '../../validations/validate-date'
import { activityInput } from '../../@types/activity'
import { ValidateActivityFields } from '../../validations/validate-activity-fields'
import { CreateActivity } from '../../http/create-activity'

export async function GetFormDataToCreateActivity() {
  try {
    const form: HTMLFormElement | null = document.querySelector('#create-form')

    if (!form) {
      return
    }

    const formData = new FormData(form)

    const date = new Date().toISOString()
    const data: activityInput = ValidateActivityFields(formData)
    await ValidateDate({ startDate: date, endDate: data.dueDate.toISOString() })

    await CreateActivity(data)
    ToastfyPopUp('Atividade criada com sucesso!', 'green')
    form.reset()
  } catch (error) {
    if (error instanceof ZodError) {
      sendFieldsErrorNotification(error)
    } else if (error instanceof Error) {
      ToastfyPopUp(error.message, 'blue')
      // 'Erro ao criar atividade, tente mais tarde!'
    }
  }
}
