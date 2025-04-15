import { Intern } from "../../@types/intern";
import { deleteActivity } from "../../http/delete-activity";
import { ToastfyPopUp } from "../../utils/toastfy-popup";
import { viewInternInfos } from "../builds/view-intern-infos-build";

export async function deleteActivityController(activityId: string, intern: Intern) {
    try {
        const isConfirmed = confirm('Confirmar exclusão da atividade.')

        if(!isConfirmed){
            throw new Error()
        }
        await deleteActivity(activityId)
        ToastfyPopUp('Atividade excluida com sucesso!', 'green')
        viewInternInfos(intern)
    } catch (error) {
        ToastfyPopUp('Erro ao exluir atividade!, tente novamente mais tarde.', 'red')
    }
}