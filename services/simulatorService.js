import { evaluatePrompt } from "./evaluatorService.js";

export const challenges = [
  {
    id: "c1",
    title: "Banco de preguntas por competencias",
    prompt: "Cree un prompt para generar un banco de preguntas sobre pensamiento crítico en Metodología de la Investigación."
  },
  {
    id: "c2",
    title: "Rúbrica para proyecto práctico",
    prompt: "Redacte un prompt que solicite una rúbrica para evaluar una presentación final de estudiantes de ingeniería."
  },
  {
    id: "c3",
    title: "Anuncio académico efectivo",
    prompt: "Cree un prompt para escribir un anuncio formal recordando fecha de examen y criterios de evaluación."
  }
];

export function evaluateChallengeSubmission(text) {
  const result = evaluatePrompt(text);
  const feedback = result.score >= 80
    ? "¡Muy buen trabajo! Tu prompt está listo para uso real con ajustes mínimos."
    : "Tu prompt tiene potencial; fortalece criterios, formato y contexto para mayor precisión.";

  return { ...result, feedback };
}
