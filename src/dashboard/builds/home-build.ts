import { VerifyStatus, StatusData } from "../../utils/VerifyStatus";
import { GetAllInterns } from "../../http/get-all-interns";
import { Intern } from "../../@types/intern";

export async function buildHome(): Promise<void> {

  const data: Intern[] = await GetAllInterns();

  const Dashboard: HTMLElement | null = document.querySelector('.dashboard');
  if (!Dashboard) {
    console.error("Elemento .dashboard não encontrado!");
    return;
  }
  Dashboard.innerHTML = ''; 

  const homeDiv: HTMLDivElement = document.createElement("div");
  homeDiv.className = "home";

  const header: HTMLElement = document.createElement("header");
  const headerTitle: HTMLHeadingElement = document.createElement("h2");
  headerTitle.textContent = "/Home";
  header.appendChild(headerTitle);

  const searchDiv: HTMLDivElement = document.createElement("div");
  searchDiv.className = "search";

  const searchIcon: HTMLElement = document.createElement("i");
  searchIcon.className = "fa-solid fa-magnifying-glass";
  searchDiv.appendChild(searchIcon);

  const searchInput: HTMLInputElement = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Pesquisar estagiário...";
  searchDiv.appendChild(searchInput);

  header.appendChild(searchDiv);
  homeDiv.appendChild(header);

  const internsDiv: HTMLDivElement = document.createElement("div");
  internsDiv.className = "interns";

  
  if (!data || data.length === 0) {
    internsDiv.style.color = '#fff'
    internsDiv.innerText = "Nenhum estagiário cadastrado!";
  } else {
  
    data.forEach((intern: Intern) => {
      const internDiv: HTMLDivElement = document.createElement("div");
      internDiv.className = "intern";

      const userDiv: HTMLDivElement = document.createElement("div");
      userDiv.className = "user";

      const userIcon: HTMLElement = document.createElement("i");
      userIcon.className = "fa-solid fa-user";
      userDiv.appendChild(userIcon);

      const userName: HTMLHeadingElement = document.createElement("h3");
      userName.textContent = intern.name;
      userDiv.appendChild(userName);

      internDiv.appendChild(userDiv);

      const infosDiv1: HTMLDivElement = document.createElement("div");
      infosDiv1.className = "infos";

      const functionLabel: HTMLParagraphElement = document.createElement("p");
      functionLabel.textContent = "Função:";
      infosDiv1.appendChild(functionLabel);

      const functionValue: HTMLSpanElement = document.createElement("span");
      functionValue.textContent = intern.role;
      infosDiv1.appendChild(functionValue);

      internDiv.appendChild(infosDiv1);

      const infosDiv2: HTMLDivElement = document.createElement("div");
      infosDiv2.className = "infos";

      const statusLabel: HTMLParagraphElement = document.createElement("p");
      statusLabel.textContent = "Status:";
      infosDiv2.appendChild(statusLabel);

      const statusData: StatusData = VerifyStatus({
        status: intern.on_work,
        getIn: intern.getIn_hour,
        getOut: intern.getOut_hour
      });

      const statusIcon: HTMLElement = document.createElement("i");
      statusIcon.className = statusData.icon;
      infosDiv2.appendChild(statusIcon);

      const statusValue: HTMLSpanElement = document.createElement("span");
      statusValue.textContent = ` ${statusData.situation}`;
      infosDiv2.appendChild(statusValue);

      internDiv.appendChild(infosDiv2);

      const eyeIcon: HTMLElement = document.createElement("i");
      eyeIcon.className = "fa-solid fa-eye";
      // eyeIcon.addEventListener('click', ()=>{
      //   InternProfile(intern.intern_id)
      // })
      internDiv.appendChild(eyeIcon);

      internsDiv.appendChild(internDiv);
    });
  }

  homeDiv.appendChild(internsDiv);

  Dashboard.appendChild(homeDiv);
}