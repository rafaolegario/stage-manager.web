import { InternDataInput } from "../@types/intern";
import { interns } from "../FakeDatabase";

export async function CreateIntern(data: InternDataInput) {
    interns.push({
        intern_id : (Math.random() * 200).toString(),
        ...data,
        on_work: false,
        delayed: 0,
        absent: 0
    })
   
}