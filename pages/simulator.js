import { challenges, evaluateChallengeSubmission } from "../services/simulatorService.js";
import { showToast } from "../components/ui.js";

export function renderSimulator(container) {
  container.innerHTML = `
    <p class="muted">Entrena con retos prácticos y recibe retroalimentación inmediata.</p>
    <label>Selecciona un reto
      <select id="challengeSelect">
        ${challenges.map((c) => `<option value="${c.id}">${c.title}</option>`).join("")}
      </select>
    </label>
    <article class="card" id="challengeStatement"></article>
    <label>Tu prompt
      <textarea id="challengePrompt" placeholder="Escribe tu propuesta de prompt..."></textarea>
    </label>
    <div class="actions"><button class="action" id="btnChallengeEvaluate">Evaluar reto</button></div>
    <div id="challengeResult"></div>
  `;

  const statement = container.querySelector("#challengeStatement");
  const select = container.querySelector("#challengeSelect");
  const updateStatement = () => {
    statement.innerHTML = `<strong>Reto:</strong> ${challenges.find((c) => c.id === select.value).prompt}`;
  };
  updateStatement();
  select.addEventListener("change", updateStatement);

  container.querySelector("#btnChallengeEvaluate").addEventListener("click", () => {
    const result = evaluateChallengeSubmission(container.querySelector("#challengePrompt").value);
    container.querySelector("#challengeResult").innerHTML = `
      <article class="card"><strong>Puntaje:</strong> ${result.score}/100</article>
      <article class="card"><strong>Feedback:</strong> ${result.feedback}</article>
      <article class="card"><strong>Sugerencias:</strong><ul>${result.recommendations.map((r) => `<li>${r}</li>`).join("")}</ul></article>
    `;
    showToast("Retroalimentación generada");
  });
}
