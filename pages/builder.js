import { buildPrompt } from "../services/promptService.js";
import { addHistoryItem, saveSettings } from "../services/storage.js";
import { downloadTextFile, showToast } from "../components/ui.js";

const fields = [
  ["role", "Rol"],
  ["task", "Objetivo / tarea"],
  ["context", "Contexto"],
  ["audience", "Audiencia"],
  ["resourceType", "Tipo de recurso"],
  ["outputFormat", "Formato de salida"],
  ["detailLevel", "Nivel de detalle"],
  ["constraints", "Restricciones"],
  ["successCriteria", "Criterios de éxito"],
  ["example", "Ejemplo opcional"]
];

export function renderBuilder(container, appState) {
  const settings = appState.settings || {};
  container.innerHTML = `
    <div class="grid">
      ${fields.map(([key, label]) => `<label>${label}<input id="f-${key}" value="${settings[key] || ""}" placeholder="${label}"/></label>`).join("")}
    </div>
    <label style="margin-top:.8rem">Prompt final
      <textarea id="builderOutput" readonly placeholder="Tu prompt profesional aparecerá aquí"></textarea>
    </label>
    <div class="actions">
      <button class="action" id="btnGenerate">Generar prompt</button>
      <button class="action secondary" id="btnCopy" disabled>Copiar</button>
      <button class="action secondary" id="btnSaveHistory" disabled>Guardar en historial</button>
      <button class="action secondary" id="btnExport" disabled>Exportar TXT</button>
      <button class="action danger" id="btnClear">Limpiar</button>
    </div>
  `;

  const output = container.querySelector("#builderOutput");
  const btnCopy = container.querySelector("#btnCopy");
  const btnSave = container.querySelector("#btnSaveHistory");
  const btnExport = container.querySelector("#btnExport");

  container.querySelector("#btnGenerate").addEventListener("click", () => {
    const data = Object.fromEntries(fields.map(([key]) => [key, container.querySelector(`#f-${key}`).value.trim()]));
    const prompt = buildPrompt(data);
    output.value = prompt;
    saveSettings(data);
    appState.settings = data;
    [btnCopy, btnSave, btnExport].forEach((btn) => (btn.disabled = false));
    showToast("Prompt generado con éxito");
  });

  btnCopy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(output.value);
    showToast("Prompt copiado");
  });

  btnSave.addEventListener("click", () => {
    const category = container.querySelector("#f-resourceType").value || "General";
    addHistoryItem({ id: crypto.randomUUID(), date: new Date().toISOString(), category, content: output.value });
    showToast("Guardado en historial");
    appState.refreshHistory?.();
  });

  btnExport.addEventListener("click", () => {
    downloadTextFile(`prompt-${Date.now()}.txt`, output.value);
    showToast("Archivo TXT descargado");
  });

  container.querySelector("#btnClear").addEventListener("click", () => {
    fields.forEach(([key]) => (container.querySelector(`#f-${key}`).value = ""));
    output.value = "";
    [btnCopy, btnSave, btnExport].forEach((btn) => (btn.disabled = true));
    showToast("Formulario limpiado");
  });
}
