import { templateLibrary } from "../services/promptService.js";
import { showToast } from "../components/ui.js";

export function renderTemplates(container, appState) {
  container.innerHTML = `
    <p class="muted">Selecciona una plantilla y carga sus campos en el Prompt Builder.</p>
    <div class="template-grid">
      ${templateLibrary.map((tpl, i) => `
        <article class="card">
          <span class="badge">${tpl.category}</span>
          <p class="muted">${tpl.data.task}</p>
          <button class="action secondary" data-template="${i}">Usar plantilla</button>
        </article>
      `).join("")}
    </div>
  `;

  container.querySelectorAll("[data-template]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = templateLibrary[Number(btn.dataset.template)];
      appState.settings = selected.data;
      showToast(`Plantilla "${selected.category}" cargada`);
      appState.navigate("builder");
    });
  });
}
