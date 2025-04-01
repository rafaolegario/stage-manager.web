import { InternDataInput } from '../../@types/intern'
import { CreateIntern } from '../../http/create-intern'
import { ToastfyPopUp } from '../../utils/toastfy-popup'
import { ValidateDate } from '../../validations/validate-date'
import { ValidateInternFields } from '../../validations/validate-intern-fields'

export async function GetFormDataToCreateIntern() {
  try {
    const form: HTMLFormElement | null =
      document.querySelector('#register_form')

    if (!form) {
      return
    }

    const formData = new FormData(form)

    const data: InternDataInput = ValidateInternFields(formData)
    ValidateDate({ startDate: data.startDate, endDate: data.endDate })

    await CreateIntern(data)
    ToastfyPopUp('Estagiário criado com sucesso!', 'green')
    form.reset()
  } catch (error) {
    ToastfyPopUp('Campos ínvalidos', 'red')
  }
}
