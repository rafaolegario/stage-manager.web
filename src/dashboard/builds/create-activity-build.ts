import {  InternWithAddress } from "../../@types/intern";
import { GetFormDataToCreateActivity } from "../controllers/get-form-data-to-create-activity";

export async function createActivityBuild(interns: InternWithAddress[]) {
  const dash: any = document.querySelector('.dashboard')

  dash.innerHTML = ''

  const InfoDiv = document.createElement('div')

  InfoDiv.className = 'info'

  dash.append(InfoDiv)

  const Dashboard: any = document.querySelector('.info')

  Dashboard.innerHTML = ''
  const createDiv = document.createElement('div');
  createDiv.className = 'create-activity';

  const header = document.createElement('header');
  const title = document.createElement('h2');
  title.textContent = '/Criar atividade';
  header.appendChild(title);
  createDiv.appendChild(header);

  const inputFields = document.createElement('div');
  inputFields.className = 'input_fields';

  const form = document.createElement('form');
  form.id = 'create-form';
  form.className = 'form-style';

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const labelTitle = document.createElement('label');
  labelTitle.htmlFor = 'title';
  labelTitle.textContent = 'Título:';

  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.name = 'title';
  inputTitle.placeholder = 'Título da atividade';
  inputTitle.required = true;

  labelTitle.appendChild(inputTitle);
  wrap.appendChild(labelTitle);

  const labelDate = document.createElement('label');
  labelDate.htmlFor = 'due_date';
  labelDate.textContent = 'Data de entrega:';

  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.name = 'due_date';
  inputDate.required = true;

  labelDate.appendChild(inputDate);
  wrap.appendChild(labelDate);

  form.appendChild(wrap);

  const labelDesc = document.createElement('label');
  labelDesc.htmlFor = 'description';
  labelDesc.textContent = 'Descrição:';

  const textarea = document.createElement('textarea');
  textarea.name = 'description';
  textarea.rows = 4;
  textarea.placeholder = 'Descrição da atividade';
  textarea.required = true;

  labelDesc.appendChild(textarea);
  form.appendChild(labelDesc);

  const internsChoose = document.createElement('div');
  internsChoose.className = 'interns_choose';

  const internsTitle = document.createElement('h3');
  internsTitle.textContent = 'Selecionar estagiários:';
  internsChoose.appendChild(internsTitle);

  const internsCheckbox = document.createElement('div');
  internsCheckbox.className = 'interns_checkbox';

  if(interns === undefined || interns.length === 0) {
     const internBox = document.createElement('div');
    internBox.className = 'intern_box';

    const paragraph = document.createElement('p');
    paragraph.innerText = 'Cadastre estagiários para criar atividades';
    paragraph.style.color = 'white';
    internBox.appendChild(paragraph);


    internsCheckbox.appendChild(internBox);
  }else{

  interns.forEach((item) => {
    const intern = item.intern;
    const internBox = document.createElement('div');
    internBox.className = 'intern_box';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = `interns`;
    checkbox.value = intern.id;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = intern.name;

    internBox.appendChild(checkbox);
    internBox.appendChild(label);

    internsCheckbox.appendChild(internBox);
  });
  }
  internsChoose.appendChild(internsCheckbox);
  form.appendChild(internsChoose);

  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'submit-button';
  button.textContent = 'Criar';

  form.appendChild(button);
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    GetFormDataToCreateActivity()
  })

  inputFields.appendChild(form);
  createDiv.appendChild(inputFields);
  Dashboard.appendChild(createDiv);
}
