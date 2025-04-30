import { ZodError } from 'zod'
import { sendFieldsErrorNotification } from '../../utils/send-fields-error-notification'
import { ToastfyPopUp } from '../../utils/toastfy-popup'
import { RegisterAccessCard } from '../../http/register-access-card'
import { ValidateRegisterAccessCardFields } from '../../validations/validate-register-access-card-fields'

export async function GetFormDataToRegisterAccessCard() {
  try {
    const form: HTMLFormElement | null = document.querySelector('#register_card')

    if (!form) {
      return
    }

    const formData = new FormData(form)
    const data = ValidateRegisterAccessCardFields(formData)
    const internId = data.internId
    const cardId = data.cardId
    await RegisterAccessCard(internId, cardId)
    ToastfyPopUp('Cartão registrado com sucesso!', 'green')
    form.reset()
  } catch (error) {
    if (error instanceof ZodError) {
      sendFieldsErrorNotification(error)
    } else if (error instanceof Error) {
      ToastfyPopUp(error.message, 'blue')
    }
  }
}
