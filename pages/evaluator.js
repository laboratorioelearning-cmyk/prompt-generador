import { evaluatePrompt } from "../services/evaluatorService.js";
import { showToast } from "../components/ui.js";

export function renderEvaluator(container) {
  container.innerHTML = `
    <label>Pega aquí el prompt a evaluar
      <textarea id="promptToEvaluate" placeholder="Pega tu prompt..."></textarea>
    </label>
    <div class="actions"><button class="action" id="btnEvaluate">Evaluar</button></div>
    <div id="evaluationResult"></div>
  `;

  container.querySelector("#btnEvaluate").addEventListener("click", () => {
    const value = container.querySelector("#promptToEvaluate").value;
    const result = evaluatePrompt(value);

    container.querySelector("#evaluationResult").innerHTML = `
      <article class="card">
        <p class="muted">Puntaje total</p>
        <p class="score">${result.score}/100</p>
      </article>
      <article class="card">
        <strong>Rúbrica</strong>
        <ul>${result.items.map((i) => `<li>${i.label}: ${i.points}/${i.weight} ${i.ok ? "✅" : "⚠️"}</li>`).join("")}</ul>
      </article>
      <article class="card">
        <strong>Recomendaciones</strong>
        <ul>${result.recommendations.map((r) => `<li>${r}</li>`).join("")}</ul>
      </article>
      <label>Versión mejorada sugerida
        <textarea readonly>${result.improvedPrompt}</textarea>
      </label>
    `;
    showToast("Evaluación completada");
  });
}
