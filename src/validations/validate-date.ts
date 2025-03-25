import dayjs from "dayjs"

interface ValidateDateParms{
    start_date: any,
    end_date: any
}

export function ValidateDate({ start_date, end_date } : ValidateDateParms){
    const start = dayjs(start_date);
    const end = dayjs(end_date);

    if (end.isBefore(start)) {
      throw new Error("A data de conclusão deve ser maior que a data ínicio")
    }
  
}