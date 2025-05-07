import { GetAllInterns } from '../http/get-all-interns'
import { BuildSearchHeader } from './builds/build-search-header'
import { createActivityBuild } from './builds/create-activity-build'
import { buildHome } from './builds/home-build'
import { buildRanking } from './builds/ranking-build'
import { buildRegisterAccessCard } from './builds/register-card-build'
import { buildRegisterIntern } from './builds/register-intern-build'

// Dashboard buttons
const homeButton: HTMLElement | null = document.getElementById('home')
const registerInternButton: HTMLElement | null = document.getElementById('intern-register')
const createActivityButton: HTMLElement | null = document.getElementById('create-activity');
const rankingButton: HTMLElement | null = document.getElementById('ranking');
const registerAccessCardButton: HTMLElement | null = document.getElementById('rfIdCard');


if (!homeButton || !registerInternButton || !createActivityButton || !registerAccessCardButton || !rankingButton) {
  throw new Error()
}

window.addEventListener('load', async () => {
  const data = await getData()
  BuildSearchHeader('Home')
  buildHome(data)
})

homeButton.addEventListener('click', async () => {
  const data = await getData()
  BuildSearchHeader('Home')
  buildHome(data)
})

registerInternButton.addEventListener('click', buildRegisterIntern)

createActivityButton.addEventListener('click', async () => {
  const data = await getData()
  BuildSearchHeader('Criar Atividade')
  createActivityBuild(data)
})

registerAccessCardButton.addEventListener('click', async()=>{
  const data = await getData()
  buildRegisterAccessCard(data)
})

rankingButton.addEventListener('click', async ()=>{
  const data = await getData()
  buildRanking(data)
})

async function getData() {
  const data = await GetAllInterns()
  return data
}
