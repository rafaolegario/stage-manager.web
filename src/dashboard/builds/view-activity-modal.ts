import { activity } from "../../@types/activity";

export function ViewModal(activity: activity) {
  if (document.querySelector(".rate-modal")) return;

  const modal = document.createElement("div");
  modal.className = "rate-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const title = document.createElement("h3");
  title.textContent = "Visualizar atividade";

  const activityTitle = document.createElement("p");
  const activityStrong = document.createElement("strong");
  activityStrong.textContent = `Título: ${activity.title}`;
  activityTitle.appendChild(activityStrong);

  const description = document.createElement("p");
  const descLabel = document.createElement("strong");
  descLabel.textContent = "Descrição: ";
  description.appendChild(descLabel);
  description.append(activity.description);

  const dueDate = document.createElement("p");
  const dueDateLabel = document.createElement("strong");
  dueDateLabel.textContent = "Entrega: ";
  dueDate.appendChild(dueDateLabel);
  dueDate.append(new Date(activity.dueDate).toLocaleDateString());

  const status = document.createElement("p");
  const statusLabel = document.createElement("strong");
  statusLabel.textContent = "Status: ";
  status.appendChild(statusLabel);
  status.append(
    activity.internsIdScore[0].status === "unfinished" ? "Pendente" : "Concluída"
  );

  const score = document.createElement("p");
  const scoreLabel = document.createElement("strong");
  scoreLabel.textContent = "Nota: ";
  score.appendChild(scoreLabel);
  score.append(activity.internsIdScore[0].score.toString());

  const actions = document.createElement("div");
  actions.className = "modal-actions";

  const cancelBtn = document.createElement("button");
  cancelBtn.id = "cancelRating";
  cancelBtn.textContent = "Fechar";
  cancelBtn.style.backgroundColor = "red";

  cancelBtn.addEventListener("click", () => {
    modal.remove();
  });

  actions.appendChild(cancelBtn);

  modalContent.appendChild(title);
  modalContent.appendChild(activityTitle);
  modalContent.appendChild(description);
  modalContent.appendChild(dueDate);
  modalContent.appendChild(status);
  modalContent.appendChild(score);
  modalContent.appendChild(actions);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}
