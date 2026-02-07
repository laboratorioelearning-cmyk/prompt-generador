const criteria = [
  { key: "claridad", label: "Claridad", weight: 15, test: (t) => t.length > 80 },
  { key: "contexto", label: "Contexto", weight: 15, test: (t) => /contexto|tema|curso|unidad/i.test(t) },
  { key: "especificidad", label: "Especificidad", weight: 15, test: (t) => /objetivo|tarea|debe|incluye/i.test(t) },
  { key: "formato", label: "Formato solicitado", weight: 15, test: (t) => /formato|tabla|lista|pasos|estructura/i.test(t) },
  { key: "restricciones", label: "Restricciones", weight: 15, test: (t) => /restric|máximo|limita|no/i.test(t) },
  { key: "exito", label: "Criterios de éxito", weight: 15, test: (t) => /criterio|éxito|evalu|rubric/i.test(t) },
  { key: "ambiguedad", label: "Ambigüedad", weight: 10, test: (t) => !/algo|etc|lo que puedas|como sea/i.test(t) }
];

export function evaluatePrompt(prompt) {
  const text = prompt.trim();
  if (!text) {
    return { score: 0, items: [], recommendations: ["Pega un prompt para iniciar la evaluación."], improvedPrompt: "" };
  }

  const items = criteria.map((c) => ({ ...c, ok: c.test(text), points: c.test(text) ? c.weight : Math.round(c.weight * 0.35) }));
  const score = items.reduce((acc, item) => acc + item.points, 0);

  const recommendations = items
    .filter((i) => !i.ok)
    .map((i) => `Mejora ${i.label.toLowerCase()}: agrega una instrucción explícita relacionada.`);

  if (!recommendations.length) recommendations.push("Excelente base. Puedes añadir un ejemplo concreto para robustecer aún más el resultado.");

  const improvedPrompt = [
    text,
    !/formato/i.test(text) ? "Formato de salida esperado: presenta la respuesta en una estructura clara y reutilizable." : "",
    !/criterio|éxito/i.test(text) ? "Criterios de éxito: precisión conceptual, aplicabilidad en aula y lenguaje profesional." : "",
    !/restric|máximo|limita/i.test(text) ? "Restricciones: evita generalidades, usa lenguaje técnico accesible y extensión de 250-400 palabras." : ""
  ].filter(Boolean).join("\n");

  return { score: Math.min(100, score), items, recommendations, improvedPrompt };
}
