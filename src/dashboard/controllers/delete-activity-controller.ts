import { InternWithAddress } from "../../@types/intern";
import { deleteActivity } from "../../http/delete-activity";
import { ToastfyPopUp } from "../../utils/toastfy-popup";
import { viewInternInfos } from "../builds/view-intern-infos-build";

export async function deleteActivityController(activityId: string, Intern: InternWithAddress) {
    try {
        await deleteActivity(Intern.intern.id , activityId)
        ToastfyPopUp('Atividade excluida com sucesso!', 'green')
        viewInternInfos(Intern)
    } catch (error) {
        ToastfyPopUp('Erro ao excluir atividade!, tente novamente mais tarde.', 'red')
    }
}