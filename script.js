import { loadSettings } from "./services/storage.js";
import { renderBuilder } from "./pages/builder.js";
import { renderTemplates } from "./pages/templates.js";
import { renderEvaluator } from "./pages/evaluator.js";
import { renderSimulator } from "./pages/simulator.js";
import { renderHistory } from "./pages/history.js";

const container = document.getElementById("viewContainer");
const title = document.getElementById("viewTitle");
const description = document.getElementById("viewDescription");
const nav = document.getElementById("navLinks");

const viewConfig = {
  builder: ["Prompt Builder", "Construye prompts profesionales para docencia universitaria en minutos."],
  templates: ["Biblioteca de Plantillas", "Usa plantillas predefinidas para acelerar tareas académicas frecuentes."],
  evaluator: ["Evaluador de Prompts", "Evalúa calidad, claridad y precisión con una rúbrica automatizada."],
  simulator: ["Simulador / Entrenamiento Docente", "Practica con retos de prompting y recibe retroalimentación inmediata."],
  history: ["Historial y Exportación", "Gestiona prompts guardados: filtra, copia, exporta y elimina registros."]
};

const appState = {
  settings: loadSettings(),
  navigate,
  refreshHistory: null
};

function navigate(view) {
  const [t, d] = viewConfig[view];
  title.textContent = t;
  description.textContent = d;

  [...nav.querySelectorAll("button")].forEach((b) => b.classList.toggle("active", b.dataset.view === view));

  if (view === "builder") renderBuilder(container, appState);
  if (view === "templates") renderTemplates(container, appState);
  if (view === "evaluator") renderEvaluator(container);
  if (view === "simulator") renderSimulator(container);
  if (view === "history") appState.refreshHistory = renderHistory(container);
}

nav.addEventListener("click", (event) => {
  if (event.target.matches("button[data-view]")) navigate(event.target.dataset.view);
});

navigate("builder");
