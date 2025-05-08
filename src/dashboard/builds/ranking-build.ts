import { InternWithAddress } from "../../@types/intern";
import { activity } from "../../@types/activity";
import { calculateAttendance } from "../../utils/calculate-attendance";
import { GetInternActivities } from "../../http/get-intern-activites";

export async function buildRanking(
  interns: InternWithAddress[]
): Promise<void> {
  const infoDiv = document.createElement("div");
  infoDiv.className = "info";

  const dashboard = document.querySelector(".dashboard");
  if (!dashboard) return;

  dashboard.innerHTML = "";
  dashboard.appendChild(infoDiv);

  const rankingDiv = document.createElement("div");
  rankingDiv.className = "ranking";

  const header = document.createElement("header");
  const title = document.createElement("h2");
  title.textContent = "/Ranking";
  header.appendChild(title);

  const filterWrap = document.createElement("div");
  filterWrap.className = "wrap";

  const scoreBtn = document.createElement("button");
  scoreBtn.textContent = "Filtrar por nota";
  scoreBtn.addEventListener("click", () => renderRanking("score"));

  const freqBtn = document.createElement("button");
  freqBtn.textContent = "Filtrar por frequência";
  freqBtn.addEventListener("click", () => renderRanking("attendance"));

  filterWrap.appendChild(scoreBtn);
  filterWrap.appendChild(freqBtn);

  rankingDiv.appendChild(header);
  rankingDiv.appendChild(filterWrap);

  const listContainer = document.createElement("div");
  listContainer.className = "interns";
  rankingDiv.appendChild(listContainer);

  infoDiv.appendChild(rankingDiv);

  renderRanking("score");

  async function renderRanking(criteria: "score" | "attendance") {
    listContainer.innerHTML = "";

    const internWithValues = await Promise.all(
      interns.map(async (item) => {
        const internActivities = await GetInternActivities(item.intern.id);
        const value =
          criteria === "score"
            ? await averageScore(internActivities, item.intern.id)
            : calculateAttendance(item.intern);

        return { intern: item, value, internActivities };
      })
    );

    const sorted = internWithValues.sort((a, b) => b.value - a.value);

    sorted.forEach(async (item, index) => {
      console.log(item);
      const card = document.createElement("div");
      card.className = "intern";

      const pos = document.createElement("span");
      pos.textContent = `${index + 1}º`;
      pos.style.fontWeight = "bold";

      const name = document.createElement("h3");
      name.textContent = item.intern.intern.name;

      const scoreOrFreq = document.createElement("p");
      scoreOrFreq.innerHTML =
        criteria === "score"
          ? `<strong>Média de notas:</strong> ${await averageScore(item.internActivities, item.intern.intern.id)}`
          : `<strong>Frequência:</strong> ${calculateAttendance(item.intern.intern)}%`;

      card.appendChild(pos);
      card.appendChild(name);
      card.appendChild(scoreOrFreq);

      listContainer.appendChild(card);
    });
  }
}
export async function averageScore(
  activities: activity[],
  internId: string
): Promise<number> {
  const allScores = activities.flatMap((activity) =>
    activity.internsIdScore.filter((item) => item.id === internId)
  );

  if (!allScores.length) return 0;

  const total = allScores.reduce((sum, s) => sum + s.score, 0);
  const weight = Math.log2(allScores.length + 1); 
  let result = total / weight;
  result = Number(result.toFixed(2))
  return result
}