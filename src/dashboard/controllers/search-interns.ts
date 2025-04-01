import { Intern } from '../../@types/intern'
import { GetSearchInterns } from '../../http/get-search-interns'
import { buildHome } from '../builds/home-build'

export async function SearchIntern(query: string) {
  const data: Intern[] = await GetSearchInterns(query)
  buildHome(data, true)
}
