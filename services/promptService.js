export const templateLibrary = [
  {
    category: "Plan de clase",
    data: {
      role: "Diseñador instruccional universitario",
      task: "Diseña un plan de clase de 90 minutos",
      context: "Curso de [asignatura], semana [número], con enfoque por competencias",
      audience: "Estudiantes universitarios de pregrado",
      resourceType: "Plan de clase",
      outputFormat: "Tabla por momentos (inicio, desarrollo, cierre)",
      detailLevel: "Alto",
      constraints: "Tiempo máximo 90 minutos, incluir actividad activa",
      successCriteria: "Objetivos medibles, secuencia lógica y evaluación formativa",
      example: "Incluye objetivos, actividades, recursos y evidencias de aprendizaje"
    }
  },
  {
    category: "Guía didáctica",
    data: {
      role: "Docente experto en metodología activa",
      task: "Elabora una guía didáctica",
      context: "Tema: [tema], modalidad híbrida",
      audience: "Estudiantes de educación superior",
      resourceType: "Guía didáctica",
      outputFormat: "Pasos numerados",
      detailLevel: "Medio",
      constraints: "Lenguaje claro y orientado a la acción",
      successCriteria: "Instrucciones precisas y actividades aplicables",
      example: "Debe contener objetivos, contenido, práctica y cierre"
    }
  },
  {
    category: "Banco de preguntas",
    data: {
      role: "Especialista en evaluación universitaria",
      task: "Genera un banco de 20 preguntas",
      context: "Unidad temática: [unidad]",
      audience: "Estudiantes de [nivel]",
      resourceType: "Banco de preguntas",
      outputFormat: "Tabla con columnas: pregunta, respuesta, dificultad",
      detailLevel: "Alto",
      constraints: "Incluir preguntas de comprensión, aplicación y análisis",
      successCriteria: "Cobertura equilibrada y coherencia con resultados de aprendizaje",
      example: "10 opción múltiple, 5 verdadero/falso, 5 abiertas"
    }
  },
  { category: "Cuestionario tipo examen", data: { role: "Diseñador de instrumentos de evaluación", task: "Construye un cuestionario tipo examen", context: "Curso universitario: [curso]", audience: "Estudiantes de [semestre]", resourceType: "Cuestionario", outputFormat: "Secciones y puntaje por pregunta", detailLevel: "Alto", constraints: "Duración 45 minutos", successCriteria: "Validez de contenido y dificultad progresiva", example: "Incluir clave de respuestas" } },
  { category: "Rúbrica de evaluación", data: { role: "Asesor pedagógico", task: "Crea una rúbrica analítica", context: "Actividad: [actividad]", audience: "Docentes y estudiantes", resourceType: "Rúbrica", outputFormat: "Tabla con criterios y niveles", detailLevel: "Alto", constraints: "4 niveles de desempeño", successCriteria: "Descriptores observables y claros", example: "Escala: Inicial, Básico, Competente, Sobresaliente" } },
  { category: "Proyecto o actividad práctica", data: { role: "Tutor académico", task: "Propón una actividad práctica evaluable", context: "Tema central: [tema]", audience: "Estudiantes universitarios", resourceType: "Actividad evaluativa", outputFormat: "Lista paso a paso", detailLevel: "Medio", constraints: "Trabajo en equipo de 3-4 estudiantes", successCriteria: "Producto final verificable y rúbrica sugerida", example: "Incluye cronograma y entregables" } },
  { category: "Anuncio académico", data: { role: "Coordinador docente", task: "Redacta un anuncio académico", context: "Comunicación institucional", audience: "Estudiantes de la asignatura", resourceType: "Anuncio", outputFormat: "Texto académico breve", detailLevel: "Bajo", constraints: "Máximo 180 palabras", successCriteria: "Mensaje claro con fechas y acciones", example: "Recordatorio de entrega y criterios" } },
  { category: "Presentación profesional", data: { role: "Consultor académico", task: "Diseña la estructura de una presentación profesional", context: "Tema: [tema], audiencia mixta", audience: "Comunidad universitaria", resourceType: "Presentación", outputFormat: "Estructura de diapositivas", detailLevel: "Medio", constraints: "10 diapositivas máximo", successCriteria: "Hilo narrativo claro y cierre con llamada a la acción", example: "Incluye apertura, desarrollo y conclusiones" } }
];

export function buildPrompt(fields) {
  const lines = [
    `Actúa como ${fields.role || "un experto docente universitario"}.`,
    `Objetivo/Tarea: ${fields.task || "No especificada"}.`,
    `Contexto: ${fields.context || "No especificado"}.`,
    `Audiencia: ${fields.audience || "No especificada"}.`,
    `Tipo de recurso: ${fields.resourceType || "Material educativo"}.`,
    `Formato de salida: ${fields.outputFormat || "Respuesta estructurada"}.`,
    `Nivel de detalle: ${fields.detailLevel || "Medio"}.`
  ];

  if (fields.constraints) lines.push(`Restricciones: ${fields.constraints}.`);
  if (fields.successCriteria) lines.push(`Criterios de éxito: ${fields.successCriteria}.`);
  if (fields.example) lines.push(`Ejemplo de referencia: ${fields.example}.`);

  lines.push("Antes de responder, identifica vacíos críticos y formula hasta 2 preguntas de aclaración si es necesario.");
  lines.push("Luego entrega una versión final lista para uso docente, con tono profesional y lenguaje claro.");

  return lines.join("\n");
}
