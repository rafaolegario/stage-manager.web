import { CepMask, CpfMask, PhoneMask } from '../../utils/masks'
import { GetFormDataToCreateIntern } from '../controllers/get-form-data-to-create-intern'

export function buildRegisterIntern() {
  const dash: any = document.querySelector('.dashboard')

  dash.innerHTML = ''

  const InfoDiv = document.createElement('div')

  InfoDiv.className = 'info'

  dash.append(InfoDiv)

  const Dashboard: any = document.querySelector('.info')

  Dashboard.innerHTML = ''

  const header = document.createElement('header')
  const title = document.createElement('h2')
  title.textContent = '/Cadastrar estagiário'
  header.appendChild(title)

  const form = document.createElement('form')
  form.id = 'register_form'
  form.classList.add('form-style')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    GetFormDataToCreateIntern()
  })

  const createInputField = (
    type: string,
    name: string,
    text: string,
    placeholder: string,
    required: boolean = false,
    MaxLenght?: number,
  ): HTMLLabelElement => {
    const label = document.createElement('label')
    label.htmlFor = name
    label.textContent = `${text.charAt(0).toUpperCase() + text.slice(1)}:`
    const input = document.createElement('input')
    input.value = ''
    input.type = type
    input.name = name
    input.placeholder = placeholder
    if (MaxLenght) {
      input.maxLength = MaxLenght
    }
    if (required) input.required = true
    label.appendChild(input)
    return label
  }

  const createSelectField = (
    name: string,
    text: string,
    options: string[],
  ): HTMLLabelElement => {
    const label = document.createElement('label')
    label.htmlFor = name
    label.textContent = `${text.charAt(0).toUpperCase() + text.slice(1)}:`
    const select = document.createElement('select')
    select.name = name
    options.forEach((optionText) => {
      const option = document.createElement('option')
      option.value = optionText.toLowerCase().replace(' ', '_')
      option.textContent = optionText
      select.appendChild(option)
    })
    label.appendChild(select)
    return label
  }

  const createWrap = (...elements: HTMLElement[]): HTMLDivElement => {
    const wrap = document.createElement('div')
    wrap.classList.add('wrap')
    elements.forEach((element) => wrap.appendChild(element))
    return wrap
  }

  const cpfField = createInputField(
    'text',
    'cpf',
    'Cpf',
    '123.456.789-00',
    true,
    14,
  )
  const CpfinputElement = cpfField.querySelector('input') as HTMLInputElement

  CpfinputElement.addEventListener('input', () => {
    CpfinputElement.value = CpfMask(CpfinputElement.value)
  })

  const genderField = createSelectField('gender', 'Gênero', [
    'Masculino',
    'Feminino',
    'Prefiro não responder',
  ])
  const ageField = createInputField('number', 'age', 'Idade', '18', true)
  form.appendChild(createWrap(cpfField, genderField, ageField))

  const nameField = createInputField(
    'text',
    'name',
    'Nome Completo',
    'João da silva carvalho',
    true,
  )
  const emailField = createInputField(
    'email',
    'email',
    'E-mail',
    'joaodasilva@exemplo.com',
    true,
  )
  form.appendChild(createWrap(nameField, emailField))

  const cepField = createInputField('text', 'cep', 'Cep', '12345-678', true, 9)
  const CepInputElement = cepField.querySelector('input') as HTMLInputElement
  CepInputElement.addEventListener('input', ()=>{
    CepInputElement.value = CepMask(CepInputElement.value)
  })
  const cityField = createInputField(
    'text',
    'city',
    'Cidade',
    'São Paulo',
    true,
  )
  form.appendChild(createWrap(cepField, cityField))

  const streetField = createInputField(
    'text',
    'street',
    'Rua',
    'Rua das colinas',
    true,
  )
  form.appendChild(streetField)

  const neighborhoodField = createInputField(
    'text',
    'neighborhood',
    'Bairro',
    'Bairro exemplo',
    true,
  )
  const numberField = createInputField(
    'number',
    'house_number',
    'Número',
    '1234',
  )
  form.appendChild(createWrap(neighborhoodField, numberField))

  const phoneField = createInputField(
    'text',
    'phone',
    'Telefone',
    '(11)12345-6789',
    true,
    14,
  )

  const PhoneInputElement = phoneField.querySelector('input') as HTMLInputElement
  PhoneInputElement.addEventListener('input', ()=>{
    PhoneInputElement.value = PhoneMask(PhoneInputElement.value)
  })

  const roleField = createInputField(
    'text',
    'role',
    'Função',
    'Administração',
    true,
  )
  form.appendChild(createWrap(phoneField, roleField))

  const startDateField = createInputField(
    'date',
    'start_date',
    'Data de início',
    '',
    true,
  )
  const endDateField = createInputField(
    'date',
    'end_date',
    'Data de Termino (previsão)',
    '',
    true,
  )
  const getInField = createInputField(
    'time',
    'getIn_hour',
    'Horário de entrada',
    '',
    true,
  )
  const getOutField = createInputField(
    'time',
    'getOut_hour',
    'Horário de saída',
    '',
    true,
  )
  form.appendChild(
    createWrap(startDateField, endDateField, getInField, getOutField),
  )

  const courseField = createInputField(
    'text',
    'course',
    'Curso',
    'Direito',
    true,
  )
  const universityField = createInputField(
    'text',
    'universty',
    'Universidade',
    'Faculdade federal example',
  )
  form.appendChild(createWrap(courseField, universityField))

  const salaryField = createInputField(
    'number',
    'salary',
    'Salário',
    'R$2000.00',
  )
  form.appendChild(salaryField)
  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.classList.add('submit-button')
  submitButton.textContent = 'Cadastrar'
  form.appendChild(submitButton)

  Dashboard.appendChild(header)
  Dashboard.appendChild(form)
}
