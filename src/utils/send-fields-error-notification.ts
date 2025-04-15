import { ZodError } from "zod";
import { ToastfyPopUp } from "./toastfy-popup";

const parseData : { [key: string]: string } = {
    name: 'Nome ',  
    age: 'Idade',  
    cpf: 'Cpf',  
    phone: 'Telefone',  
    email: 'Email',  
    course: 'Curso', 
    university: 'Universidade',  
    salary: 'Salário', 
    role: 'Cargo',  
    getInHour: 'Horário de Entrada', 
    getOutHour: 'Horário de Saída',  
    startDate: 'Data de Início',  
    endDate: 'Data de Término',  
    city: 'Cidade',  
    cep: 'Cep',  
    street: 'Rua', 
    neighborhood: 'Bairro', 
    gender: 'Gênero', 
    houseNumber: 'Número da Casa',
    title: 'Título',
    due_date: 'Data de Entrega',
    description: 'Descrição',
    internIds: 'Estagiários',
  };

export function sendFieldsErrorNotification(error: ZodError){
    error.errors.forEach(erro => {
        const input = document.getElementsByName(`${erro.path[0]}`);
        const label  = document.querySelector(`label[for="${erro.path[0]}"]`);

        if (label && label instanceof HTMLElement) {
            label.style.color = 'red';
    
            setTimeout(() => {
                label.style.color = '#fff'; 
            }, 3000);
        }


        input.forEach(item => {
            item.style.borderColor = 'red';
            item.style.borderWidth = '2px'

            setTimeout(()=>{
            item.style.borderColor = '#fff';
            item.style.borderWidth = '1px'
            },3000)
        });

        const fieldName = parseData[erro.path[0]] 

        ToastfyPopUp(`Campo ${fieldName} inválido!`, 'red');
    })
}