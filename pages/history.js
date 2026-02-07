import { clearHistory, loadHistory, removeHistoryItem } from "../services/storage.js";
import { downloadTextFile, escapeHtml, showToast } from "../components/ui.js";

export function renderHistory(container) {
  container.innerHTML = `
    <div class="grid-3">
      <label>Buscar
        <input id="historySearch" placeholder="Texto del prompt" />
      </label>
      <label>Filtrar por categoría
        <input id="historyCategory" placeholder="Ej: Rúbrica" />
      </label>
      <div class="actions" style="align-items:end">
        <button class="action secondary" id="btnExportAll">Exportar todo</button>
        <button class="action danger" id="btnClearHistory">Borrar historial</button>
      </div>
    </div>
    <ul class="list-clean" id="historyList" style="margin-top:.8rem"></ul>
  `;

  const historyList = container.querySelector("#historyList");
  const search = container.querySelector("#historySearch");
  const category = container.querySelector("#historyCategory");

  const paint = () => {
    const term = search.value.toLowerCase();
    const cat = category.value.toLowerCase();
    const items = loadHistory().filter((item) => item.content.toLowerCase().includes(term) && item.category.toLowerCase().includes(cat));

    historyList.innerHTML = items.length ? items.map((item) => `
      <li class="card">
        <div style="display:flex;justify-content:space-between;gap:.6rem;align-items:center;flex-wrap:wrap">
          <span class="badge">${escapeHtml(item.category)}</span>
          <small class="muted">${new Date(item.date).toLocaleString()}</small>
        </div>
        <p style="white-space:pre-wrap">${escapeHtml(item.content)}</p>
        <div class="actions">
          <button class="action secondary" data-copy="${item.id}">Copiar</button>
          <button class="action secondary" data-export="${item.id}">Exportar TXT</button>
          <button class="action danger" data-delete="${item.id}">Borrar</button>
        </div>
      </li>
    `).join("") : '<li class="card muted">No hay resultados en historial.</li>';

    historyList.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
      const item = loadHistory().find((x) => x.id === b.dataset.copy);
      await navigator.clipboard.writeText(item.content);
      showToast("Prompt copiado");
    }));
    historyList.querySelectorAll("[data-export]").forEach((b) => b.addEventListener("click", () => {
      const item = loadHistory().find((x) => x.id === b.dataset.export);
      downloadTextFile(`historial-${item.id}.txt`, item.content);
    }));
    historyList.querySelectorAll("[data-delete]").forEach((b) => b.addEventListener("click", () => {
      removeHistoryItem(b.dataset.delete);
      paint();
      showToast("Registro eliminado");
    }));
  };

  [search, category].forEach((el) => el.addEventListener("input", paint));

  container.querySelector("#btnExportAll").addEventListener("click", () => {
    const payload = loadHistory().map((item) => `[${item.date}] (${item.category})\n${item.content}`).join("\n\n---\n\n");
    downloadTextFile("historial-eduprompt.txt", payload || "Historial vacío");
  });

  container.querySelector("#btnClearHistory").addEventListener("click", () => {
    clearHistory();
    paint();
    showToast("Historial borrado");
  });

  paint();
  return paint;
}
