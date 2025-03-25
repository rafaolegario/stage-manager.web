import { InternDataInput } from "../../@types/intern"
import { CreateIntern } from "../../http/create-intern"
import { ValidateDate } from "../../validations/validate-date"
import { ValidateInternFields } from "../../validations/validate-intern-fields"

export async function GetFormDataToCreateIntern() {
    try{
        const form : any = document.querySelector('#register_form')

        const formData = new FormData(form)

        const data : InternDataInput = ValidateInternFields(formData)
        ValidateDate({start_date: data.start_date, end_date: data.end_date})

        await CreateIntern(data)
        form.reset()


    }catch(error){
        
    }

}