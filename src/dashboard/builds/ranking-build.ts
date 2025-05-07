import { InternWithAddress } from '../../@types/intern'
import { activity } from '../../@types/activity'
import { calculateAttendance } from '../../utils/calculate-attendance'
import { GetInternActivities } from '../../http/get-intern-activites'

export async function buildRanking(interns: InternWithAddress[]): Promise<void> {
    const infoDiv = document.createElement('div')
    infoDiv.className = 'info'
  
    const dashboard = document.querySelector('.dashboard')
    if (!dashboard) return
  
    dashboard.innerHTML = ''
    dashboard.appendChild(infoDiv)
  
    const rankingDiv = document.createElement('div')
    rankingDiv.className = 'ranking'
  
    const header = document.createElement('header')
    const title = document.createElement('h2')
    title.textContent = '/Ranking'
    header.appendChild(title)
  
    const filterWrap = document.createElement('div')
    filterWrap.className = 'wrap'
  
    const scoreBtn = document.createElement('button')
    scoreBtn.textContent = 'Filtrar por nota'
    scoreBtn.addEventListener('click', () => renderRanking('score'))
  
    const freqBtn = document.createElement('button')
    freqBtn.textContent = 'Filtrar por frequência'
    freqBtn.addEventListener('click', () => renderRanking('attendance'))
  
    filterWrap.appendChild(scoreBtn)
    filterWrap.appendChild(freqBtn)
  
    rankingDiv.appendChild(header)
    rankingDiv.appendChild(filterWrap)
  
    const listContainer = document.createElement('div')
    listContainer.className = 'interns'
    rankingDiv.appendChild(listContainer)
  
    infoDiv.appendChild(rankingDiv)
  
    renderRanking('score') // render padrão
  
    async function renderRanking(criteria: 'score' | 'attendance') {
        listContainer.innerHTML = ''
      
        const internWithValues = await Promise.all(
          interns.map(async (item) => {
            // Obtenha as atividades do estagiário
            const internActivities = await GetInternActivities(item.intern.id)
            console.log(internActivities)
      
            // Calcular a pontuação ou frequência com base no critério
            const value = criteria === 'score'
              ? await sumScores(internActivities, item.intern.id) // Calcular a média de notas
              : calculateAttendance(item.intern) // Calcular a frequência

            console.log(item)
            console.log(value)
      
            return { intern: item, value, internActivities }
            
          })
        )
      
        // Ordenando os estagiários com base nos valores calculados
        const sorted = internWithValues.sort((a, b) => b.value - a.value)
      
        // Exibindo os estagiários ordenados
        sorted.forEach(async (item, index) => {
            console.log(item)
          const card = document.createElement('div')
          card.className = 'intern'
      
          const pos = document.createElement('span')
          pos.textContent = `${index + 1}º`
          pos.style.fontWeight = 'bold'
      
          const name = document.createElement('h3')
          name.textContent = item.intern.intern.name
      
          const scoreOrFreq = document.createElement('p')
          scoreOrFreq.innerHTML = criteria === 'score'
            ? `<strong>Média de notas:</strong> ${await sumScores(item.internActivities, item.intern.intern.id)}`
            : `<strong>Frequência:</strong> ${calculateAttendance(item.intern.intern)}%`
      
          card.appendChild(pos)
          card.appendChild(name)
          card.appendChild(scoreOrFreq)
      
          listContainer.appendChild(card)
        })
      }
      
    }
  
    // Função que calcula a média das notas
    export async function sumScores(activities: activity[], internId: string): Promise<number> {
        // Vamos buscar as atividades que o estagiário participou
        const allScores = activities.flatMap((activity) => {
          // Aqui você vai consultar as pontuações dessa atividade para o estagiário
          return activity.internsIdScore.filter((item) => item.id === internId);
        });
      
        // Se não houver pontuação, retorna 0
        if (!allScores.length) return 0;
      
        // Somando as pontuações de todas as atividades
        const total = allScores.reduce((sum, s) => sum + s.score, 0);
        return total;
      }
      