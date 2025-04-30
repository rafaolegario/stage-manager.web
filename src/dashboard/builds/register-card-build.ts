import { InternWithAddress } from '../../@types/intern'
import { GetFormDataToRegisterAccessCard } from '../controllers/get-form-data-to-register-access-card'

export function buildRegisterAccessCard(interns: InternWithAddress[]) {
  const dash = document.querySelector('.dashboard')
  if (!dash) return

  dash.innerHTML = ''

  const infoDiv = document.createElement('div')
  infoDiv.className = 'info'
  dash.appendChild(infoDiv)

  const dashboard = document.querySelector('.info')
  if (!dashboard) return
  dashboard.innerHTML = ''

  const header = document.createElement('header')
  const title = document.createElement('h2')
  title.textContent = '/Registrar cartão de acesso'
  header.appendChild(title)

  const form = document.createElement('form')
  form.classList.add('form-style')
  form.id = "register_card"
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    GetFormDataToRegisterAccessCard()
  })

  const createInputField = (
    type: string,
    name: string,
    labelText: string,
    placeholder: string,
    required = false
  ): HTMLLabelElement => {
    const label = document.createElement('label')
    label.htmlFor = name
    label.textContent = `${labelText}:`

    const input = document.createElement('input')
    input.type = type
    input.name = name
    input.id = name
    input.placeholder = placeholder
    if (required) input.required = true

    label.appendChild(input)
    return label
  }

  const createSelectField = (
    name: string,
    labelText: string,
    options: { id: string; name: string }[]
  ): HTMLLabelElement => {
    const label = document.createElement('label')
    label.htmlFor = name
    label.textContent = `${labelText}:`

    const select = document.createElement('select')
    select.name = name
    select.id = name

    for (const opt of options) {
      const option = document.createElement('option')
      option.value = opt.id
      option.textContent = opt.name
      select.appendChild(option)
    }

    label.appendChild(select)
    return label
  }

  const createWrap = (...elements: HTMLElement[]): HTMLDivElement => {
    const wrap = document.createElement('div')
    wrap.classList.add('wrap')
    elements.forEach(el => wrap.appendChild(el))
    return wrap
  }

  // Filtra apenas estagiários sem RFID
  const availableInterns = interns
    .filter(intern => !intern.intern.rfIdCard || intern.intern.rfIdCard.trim() === '')
    .map(intern => ({
      id: intern.intern.id.toString(),
      name: intern.intern.name
    }))
 
  const selectIntern = createSelectField('intern', 'Estagiário', availableInterns)
  const cardIdInput = createInputField('text', 'cardId', 'ID do Cartão', 'Ex: 12345678', true)

  const wrap = createWrap(selectIntern, cardIdInput)

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.classList.add('submit-button')
  submitButton.textContent = 'Registrar'

  form.appendChild(wrap)
  form.appendChild(submitButton)

  dashboard.appendChild(header)
  dashboard.appendChild(form)
}
