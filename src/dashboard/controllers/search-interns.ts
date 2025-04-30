import { InternWithAddress } from "../../@types/intern"
import { GetAllInterns } from "../../http/get-all-interns"
import { GetSearchInterns } from "../../http/get-search-interns"
import { buildHome } from "../builds/home-build"


export async function SearchIntern(query: string) {

  let data: InternWithAddress[]= []
  if(query){
    data = await GetSearchInterns(query)
    buildHome(data, true)
  }else{
    data = await  GetAllInterns()
    buildHome(data)
  }
}
