import { SearchIntern } from '../controllers/search-interns'

export function BuildSearchHeader(text: string) {
  const header: HTMLElement = document.createElement('header')
  const headerTitle: HTMLHeadingElement = document.createElement('h2')
  headerTitle.textContent =
    '/' + text.charAt(0).toLocaleUpperCase() + text.slice(1)
  header.appendChild(headerTitle)

  const searchDiv: HTMLDivElement = document.createElement('div')
  searchDiv.className = 'search'

  const searchIcon: HTMLElement = document.createElement('i')
  searchIcon.className = 'fa-solid fa-magnifying-glass'
  searchDiv.appendChild(searchIcon)

  const searchInput: HTMLInputElement = document.createElement('input')
  searchInput.type = 'text'
  searchInput.placeholder = 'Pesquisar estagiário...'
  searchDiv.appendChild(searchInput)

  searchInput.addEventListener('input', () => {
    SearchIntern(searchInput.value)
  })

  header.appendChild(searchDiv)

  document.querySelector('.dashboard')?.append(header)
}
