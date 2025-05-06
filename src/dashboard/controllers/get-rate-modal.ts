import { z, ZodError } from "zod"
import { SetScoreHttp } from "../../http/set-actvity-score"
import { sendFieldsErrorNotification } from "../../utils/send-fields-error-notification"
import { ToastfyPopUp } from "../../utils/toastfy-popup"
import { viewInternInfos } from "../builds/view-intern-infos-build"
import { InternWithAddress } from "../../@types/intern"

export async function RateModalController(score: number, intern: InternWithAddress, activityId:string){
  try{
      const RoundScore = Math.round(score)
  
      const ActivityScoreFieldSchema = z.object({
        score: z.coerce.number().max(10).min(0)
      })
    
    const validateData = ActivityScoreFieldSchema.parse({score: RoundScore})

    await SetScoreHttp(validateData, intern.intern.id, activityId)
    ToastfyPopUp('Atividade avalidada com sucesso!', 'green')
    viewInternInfos(intern)

  }catch(error){
    if (error instanceof ZodError) {
      sendFieldsErrorNotification(error)
    } else if (error instanceof Error) {
      ToastfyPopUp(error.message, 'blue')
    }
  }
}