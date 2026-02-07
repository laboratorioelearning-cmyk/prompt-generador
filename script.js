const $ = (id) => document.getElementById(id);

const tema = $("tema");
const objetivo = $("objetivo");
const audiencia = $("audiencia");
const formato = $("formato");
const restricciones = $("restricciones");
const salida = $("salida");
const msg = $("msg");

const btnGenerar = $("btnGenerar");
const btnCopiar = $("btnCopiar");
const btnLimpiar = $("btnLimpiar");

function formatoTexto(v) {
  const map = {
    pasos: "en pasos numerados",
    tabla: "en una tabla",
    bullet: "en viñetas",
    rubrica: "como una rúbrica con criterios y puntaje"
  };
  return map[v] || "de forma clara";
}

btnGenerar.addEventListener("click", () => {
  const t = tema.value.trim();
  const o = objetivo.value.trim();
  const a = audiencia.value.trim();
  const r = restricciones.value.trim();

  if (!t || !o || !a) {
    msg.textContent = "Completa al menos: Tema, Objetivo y Audiencia.";
    return;
  }

  const prompt =
`Actúa como un experto docente y diseñador instruccional.
Tema: ${t}
Objetivo: ${o}
Audiencia: ${a}

Entrega la respuesta ${formatoTexto(formato.value)}.
Incluye: explicación breve, 2-3 ejemplos y una mini actividad para evaluar comprensión.
${r ? `Restricciones: ${r}` : ""}

Antes de responder, si falta información crítica, haz 2 preguntas de aclaración.`;

  salida.value = prompt;
  btnCopiar.disabled = false;
  msg.textContent = "Prompt generado. Puedes copiarlo.";
});

btnCopiar.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(salida.value);
    msg.textContent = "Copiado al portapapeles ✅";
  } catch {
    msg.textContent = "No pude copiar automáticamente. Selecciona y copia manualmente.";
  }
});

btnLimpiar.addEventListener("click", () => {
  tema.value = "";
  objetivo.value = "";
  audiencia.value = "";
  restricciones.value = "";
  formato.value = "pasos";
  salida.value = "";
  btnCopiar.disabled = true;
  msg.textContent = "";
});
