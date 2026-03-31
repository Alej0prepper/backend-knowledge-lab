"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Language = "en" | "es";

const STORAGE_KEY = "site-language";

const PHRASE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/¿/g, ""],
  [/1 leccion al dia • aprendizaje visible • criterio real/gi, "1 lesson per day • visible learning • real engineering judgment"],
  [/Navegacion/gi, "Navigation"],
  [/Archivo/gi, "Archive"],
  [/Sobre mi/gi, "About me"],
  [/Nivel:\s*Intermedio/gi, "Level: Intermediate"],
  [/Tag:\s*Integracion/gi, "Tag: Integration"],
  [/Tag:\s*Asincronia/gi, "Tag: Asynchrony"],
  [/Tag:\s*Resiliencia/gi, "Tag: Resilience"],
  [/Leccion pendiente de publicacion/gi, "Lesson pending publication"],
  [/Leccion(?:es)? cortas diarias\./gi, "Short daily lessons."],
  [/Haz click en una card para abrirla\./gi, "Click any card to open it."],
  [/Volver al Home/gi, "Back to Home"],
  [/Ver Archivo Daily/gi, "View Daily Archive"],
  [/Ver Daily/gi, "View Daily"],
  [/Clase anterior/gi, "Previous lesson"],
  [/Resumen rapido/gi, "Quick summary"],
  [/Ejemplo mental facil/gi, "Easy mental example"],
  [/Ejemplo mental/gi, "Mental example"],
  [/Ejemplo realista/gi, "Realistic example"],
  [/Ejemplo real/gi, "Real example"],
  [/Ejemplo simple/gi, "Simple example"],
  [/Ejemplo completo/gi, "Complete example"],
  [/Ejemplo minimo/gi, "Minimal example"],
  [/Ejemplo rapido/gi, "Quick example"],
  [/Ejemplo/gi, "Example"],
  [/Objetivo/gi, "Goal"],
  [/Conceptos/gi, "Concepts"],
  [/Leccion/gi, "Lesson"],
  [/leccion/gi, "lesson"],
  [/Lecciones/gi, "Lessons"],
  [/Dia\s+(\d+)/gi, "Day $1"],
  [/\bDia\b/gi, "Day"],
  [/\bdiario\b/gi, "daily"],
  [/Compartir Conocimiento/gi, "Knowledge Sharing"],
  [/Background Jobs: no todo debe hacerse en la request/gi, "Background Jobs: not everything should happen in the request"],
  [/Separar tareas criticas de tareas secundarias hace el backend mas rapido para el usuario y mas robusto para el sistema\./gi, "Separating critical tasks from secondary tasks makes the backend faster for the user and more robust for the system."],
  [/No todo debe ejecutarse durante la request principal\./gi, "Not everything should run during the main request."],
  [/Background job = tarea en segundo plano fuera del flujo sincrono del endpoint\./gi, "Background job = a task running in the background outside the endpoint's synchronous flow."],
  [/Registro de usuario con tareas secundarias\./gi, "User registration with secondary tasks."],
  [/Sin background jobs: crear usuario \+ email \+ reporte \+ analitica en la misma request\./gi, "Without background jobs: create user + email + report + analytics in the same request."],
  [/Con background jobs: crear usuario y responder rapido; email y analitica van a cola\./gi, "With background jobs: create user and respond quickly; email and analytics go to a queue."],
  [/El usuario no espera tareas que no son criticas para confirmar la accion\./gi, "The user does not wait for tasks that are not critical to confirm the action."],
  [/Request -> guardar datos -> encolar tarea -> responder OK/gi, "Request -> save data -> enqueue task -> respond OK"],
  [/Como piensa un backend developer/gi, "How a backend developer thinks"],
  [/Decide que debe ser sincrono y que debe delegarse\./gi, "Decides what must be synchronous and what should be delegated."],
  [/Esto es critico para responder al usuario\?/gi, "Is this critical to respond to the user?"],
  [/El usuario necesita esperar esta tarea\?/gi, "Does the user need to wait for this task?"],
  [/Si falla esta parte, rompe la operacion principal\?/gi, "If this part fails, does it break the main operation?"],
  [/Critico: sincrono\./gi, "Critical: synchronous."],
  [/Secundario: asincrono por job\./gi, "Secondary: asynchronous via job."],
  [/Como se ve en \.NET/gi, "How it looks in .NET"],
  [/Tareas de fondo con workers, colas y herramientas de scheduling\./gi, "Background tasks with workers, queues, and scheduling tools."],
  [/IHostedService para workers internos\./gi, "IHostedService for internal workers."],
  [/Colas como RabbitMQ o Azure Queue para desacoplar trabajo\./gi, "Queues such as RabbitMQ or Azure Queue to decouple work."],
  [/Herramientas como Hangfire para jobs programados y reintentos\./gi, "Tools like Hangfire for scheduled jobs and retries."],
  [/Como lo detectas como tester/gi, "How you detect it as a tester"],
  [/Buscar resultados diferidos y validar recuperacion ante fallos\./gi, "Look for deferred results and validate recovery from failures."],
  [/Acciones que terminan despues de responder el endpoint\./gi, "Actions that finish after the endpoint responds."],
  [/Emails que llegan con algunos segundos de retraso\./gi, "Emails that arrive a few seconds later."],
  [/Datos que aparecen con delay por procesamiento de fondo\./gi, "Data that appears with delay due to background processing."],
  [/Validar respuesta rapida del endpoint principal/gi, "Validate fast response from the main endpoint"],
  [/Verificar ejecucion diferida de jobs secundarios/gi, "Verify deferred execution of secondary jobs"],
  [/Simular fallo del job y comprobar reintentos/gi, "Simulate job failure and verify retries"],
  [/Confirmar que fallo del job no rompa la operacion principal/gi, "Confirm job failure does not break the main operation"],
  [/Idea que te llevas hoy/gi, "Today's takeaway"],
  [/Backend profesional separa lo urgente de lo importante\./gi, "A professional backend separates what is urgent from what is important."],
  [/No todo debe ser inmediato para el usuario; algunas tareas deben delegarse al sistema\./gi, "Not everything should be immediate for the user; some tasks should be delegated to the system."],
  [/Mini-proyecto \(5-10 min\)/gi, "Mini-project (5-10 min)"],
  [/Simular cola de jobs para entender asincronia en backend\./gi, "Simulate a job queue to understand backend asynchrony."],
  [/Objetivo: identificar que va sincrono y que va asincrono\./gi, "Goal: identify what should be synchronous and what should be asynchronous."],
  [/Ejercicio para `POST \/register`:/gi, "Exercise for `POST /register`:"],
  [/Sincrono: crear usuario\./gi, "Synchronous: create user."],
  [/Asincrono: enviar email y registrar analitica\./gi, "Asynchronous: send email and register analytics."],
  [/Si el email falla, definir politica de reintentos\./gi, "If email fails, define a retry policy."],
  [/Elegir maximo de intentos y estrategia de backoff\./gi, "Choose a maximum number of attempts and a backoff strategy."],
  [/Ver archivo/gi, "View archive"],
  [/Dia 34 en una vista\./gi, "Day 34 at a glance."],
  [/Idea clave:/gi, "Key idea:"],
  [/solo lo critico va en la request; lo demas se delega\./gi, "only critical work belongs in the request; the rest is delegated."],
  [/Practica:/gi, "Practice:"],
  [/simular `jobsQueue` y un worker en 5-10 min\./gi, "simulate `jobsQueue` and a worker in 5-10 min."],
  [/Riesgo evitado:/gi, "Risk avoided:"],
  [/endpoints lentos y fragiles por hacer todo sincrono\./gi, "slow and fragile endpoints caused by doing everything synchronously."],
  [/Colas \(Queues\): desacoplar sistemas/gi, "Queues: decoupling systems"],
  [/Las colas permiten desacoplar componentes para que un fallo externo no derribe el flujo principal\./gi, "Queues decouple components so an external failure does not bring down the main flow."],
  [/En vez de ejecutar directo, dejas un mensaje para procesar despues\./gi, "Instead of executing directly, you leave a message to be processed later."],
  [/Con colas, el backend no depende de que todos los sistemas esten disponibles en tiempo real\./gi, "With queues, the backend does not depend on every system being available in real time."],
  [/Enviar email al crear pedido\./gi, "Send email when creating an order."],
  [/Sin cola: API llama directo al email; si falla, puede fallar todo\./gi, "Without a queue: the API calls email directly; if it fails, everything can fail."],
  [/Con cola: API publica mensaje y responde; worker envia email luego\./gi, "With a queue: the API publishes a message and responds; a worker sends the email later."],
  [/El endpoint principal queda rapido y resistente a caidas externas\./gi, "The main endpoint stays fast and resilient to external outages."],
  [/API -> publica mensaje -> cola -> worker procesa/gi, "API -> publish message -> queue -> worker processes"],
  [/Prefiere desacoplar cuando no necesita respuesta inmediata\./gi, "Prefers decoupling when an immediate response is not required."],
  [/Debo depender del otro sistema en tiempo real\?/gi, "Do I need to depend on the other system in real time?"],
  [/Que pasa si el servicio externo esta caido\?/gi, "What happens if the external service is down?"],
  [/Puedo transformar una llamada directa en mensaje asincrono\?/gi, "Can I turn a direct call into an asynchronous message?"],
  [/Integraciones tipicas con brokers o buses de mensajes\./gi, "Typical integrations with brokers or message buses."],
  [/RabbitMQ para colas clasicas de trabajo\./gi, "RabbitMQ for classic work queues."],
  [/Azure Service Bus en entornos cloud\./gi, "Azure Service Bus in cloud environments."],
  [/Kafka para flujos\/eventos de mayor escala\./gi, "Kafka for higher-scale streams/events."],
  [/Validas que el sistema principal siga estable aunque falle un externo\./gi, "You validate that the main system stays stable even if an external system fails."],
  [/Acciones que no se completan instantaneamente\./gi, "Actions that are not completed instantly."],
  [/Procesos que continúan incluso cuando un servicio falla\./gi, "Processes that continue even when a service fails."],
  [/Reintentos automaticos del worker sobre mensajes pendientes\./gi, "Automatic worker retries on pending messages."],
  [/Apagar servicio externo y verificar que la API principal responda/gi, "Shut down external service and verify the main API still responds"],
  [/Confirmar que mensajes pendientes se procesen luego/gi, "Confirm pending messages are processed later"],
  [/Validar reintentos automaticos del worker/gi, "Validate worker automatic retries"],
  [/Revisar que no se pierdan mensajes/gi, "Check that messages are not lost"],
  [/Backend profesional desacopla para resistir fallos\./gi, "A professional backend decouples to resist failures."],
  [/Un backend maduro no conecta todo directo: usa colas para tolerar caidas y seguir operando\./gi, "A mature backend does not connect everything directly: it uses queues to tolerate outages and keep operating."],
  [/Simular desacoplamiento con una cola en memoria\./gi, "Simulate decoupling with an in-memory queue."],
  [/Objetivo: ver el cambio mental entre llamada directa y mensaje en cola\./gi, "Goal: see the mindset shift between a direct call and a queue message."],
  [/Ejercicio para `POST \/order`:/gi, "Exercise for `POST /order`:"],
  [/Sin cola: crear pedido \+ enviar email directo\./gi, "Without queue: create order + send email directly."],
  [/Con cola: crear pedido \+ publicar mensaje \+ responder OK\./gi, "With queue: create order + publish message + respond OK."],
  [/Si worker cae, como reanudas sin perder mensajes\?/gi, "If the worker goes down, how do you resume without losing messages?"],
  [/Donde persistes cola: memoria, broker o base de datos\?/gi, "Where do you persist the queue: memory, broker, or database?"],
  [/Dia 35 en una vista\./gi, "Day 35 at a glance."],
  [/cola desacopla para evitar dependencia en tiempo real\./gi, "a queue decouples to avoid real-time dependency."],
  [/simular `queue` y `worker` para interiorizar el patron\./gi, "simulate `queue` and `worker` to internalize the pattern."],
  [/caida de servicio externo rompiendo la operacion principal\./gi, "external service outage breaking the main operation."],
  [/que es/gi, "what is"],
  [/por que/gi, "why"],
  [/para que/gi, "what for"],
  [/en una vista/gi, "at a glance"],
  [/sin romper/gi, "without breaking"],
  [/casos reales/gi, "real-world cases"],
  [/en lugar de/gi, "instead of"],
  [/fuente de verdad/gi, "source of truth"],
  [/segundo plano/gi, "background"],
  [/concurrencia/gi, "concurrency"],
  [/consistencia/gi, "consistency"],
  [/disponibilidad/gi, "availability"],
  [/acoplamiento/gi, "coupling"],
  [/cohesion/gi, "cohesion"],
  [/orquestacion/gi, "orchestration"],
  [/paginacion/gi, "pagination"],
  [/ordenamiento/gi, "sorting"],
  [/filtrado y busqueda/gi, "filtering and search"],
  [/filtrado/gi, "filtering"],
  [/busqueda/gi, "search"],
  [/fallar rapido/gi, "fail fast"],
  [/fallos/gi, "failures"],
  [/despliegue/gi, "deployment"],
  [/peticiones/gi, "requests"],
  [/respuesta/gi, "response"],
  [/errores/gi, "errors"],
  [/error de validacion/gi, "validation error"],
  [/rendimiento/gi, "performance"],
  [/estabilidad/gi, "stability"],
  [/observabilidad/gi, "observability"],
  [/colas/gi, "queues"],
  [/cache/gi, "cache"],
];

const WORD_REPLACEMENTS: Record<string, string> = {
  soy: "i am",
  licenciado: "bachelor",
  ciencia: "science",
  computacion: "computer science",
  actualmente: "currently",
  trabajo: "work",
  como: "as",
  desarrollador: "developer",
  lenguaje: "language",
  esta: "this",
  pagina: "page",
  donde: "where",
  puedo: "i can",
  plasmar: "document",
  conocimiento: "knowledge",
  compartir: "share",
  comunidad: "community",
  anterior: "previous",
  siguiente: "next",
  corto: "short",
  corta: "short",
  cortas: "short",
  diario: "daily",
  diaria: "daily",
  diarias: "daily",
  rapido: "quick",
  simple: "simple",
  real: "real",
  facil: "easy",
  basico: "basic",
  completa: "complete",
  completo: "complete",
  minimo: "minimal",
  minima: "minimal",
  consistente: "consistent",
  consistentes: "consistent",
  objetivo: "goal",
  resumen: "summary",
  diagnostico: "diagnosis",
  diferencia: "difference",
  diferencias: "differences",
  protege: "protects",
  proteger: "protect",
  recursos: "resources",
  compartidos: "shared",
  datos: "data",
  servicio: "service",
  servicios: "services",
  cliente: "client",
  clientes: "clients",
  endpoint: "endpoint",
  endpoints: "endpoints",
  consulta: "query",
  consultas: "queries",
  lista: "list",
  listas: "lists",
  contrato: "contract",
  contratos: "contracts",
  entidades: "entities",
  entidad: "entity",
  modelo: "model",
  modelos: "models",
  controlador: "controller",
  controladores: "controllers",
  dependencias: "dependencies",
  dependencia: "dependency",
  transiciones: "transitions",
  estados: "states",
  maquina: "machine",
  prueba: "test",
  pruebas: "tests",
  utiles: "useful",
  realista: "realistic",
};

const EN_TO_ES_PHRASE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/1 lesson per day • visible learning • real engineering judgment/gi, "1 leccion al dia • aprendizaje visible • criterio real"],
  [/Navigation/gi, "Navegacion"],
  [/Archive/gi, "Archivo"],
  [/About me/gi, "Sobre mi"],
  [/Previous lesson/gi, "Clase anterior"],
  [/Level:\s*Beginner/gi, "Nivel: Principiante"],
  [/Level:\s*Intermediate/gi, "Nivel: Intermedio"],
  [/Tag:\s*Resilience/gi, "Tag: Resiliencia"],
  [/Tag:\s*Scalability/gi, "Tag: Escalabilidad"],
  [/Tag:\s*Asynchrony/gi, "Tag: Asincronia"],
  [/Tag:\s*Integration/gi, "Tag: Integracion"],
  [/The key idea/gi, "La idea clave"],
  [/Simple example/gi, "Ejemplo simple"],
  [/How a backend developer thinks and how you detect it as a tester/gi, "Como piensa un backend developer y como lo detectas como tester"],
  [/How a backend developer thinks/gi, "Como piensa un backend developer"],
  [/How it looks in \.NET/gi, "Como se ve en .NET"],
  [/How you detect it as a tester/gi, "Como lo detectas como tester"],
  [/Today's takeaway/gi, "Idea que te llevas hoy"],
  [/Closing/gi, "Cierre"],
  [/Practice/gi, "Practica"],
  [/Concept/gi, "Concepto"],
  [/Scenario/gi, "Escenario"],
  [/Mindset/gi, "Mentalidad"],
  [/Implementation/gi, "Implementacion"],
  [/View archive/gi, "Ver archivo"],
  [/Quick summary/gi, "Resumen rapido"],
  [/Day\s+31 at a glance\./gi, "Dia 31 en una vista."],
  [/Day\s+32 at a glance\./gi, "Dia 32 en una vista."],
  [/Day\s+33 at a glance\./gi, "Dia 33 en una vista."],
  [/Day\s+34 at a glance\./gi, "Dia 34 en una vista."],
  [/Day\s+35 at a glance\./gi, "Dia 35 en una vista."],
  [/Key idea:/gi, "Idea clave:"],
  [/Risk avoided:/gi, "Riesgo evitado:"],
  [/Level 2:/gi, "Nivel 2:"],
];

const EN_WORD_REPLACEMENTS: Record<string, string> = Object.entries(WORD_REPLACEMENTS).reduce(
  (acc, [esWord, enWord]) => {
    if (!enWord.includes(" ")) {
      acc[enWord.toLowerCase()] = esWord;
    }
    return acc;
  },
  {} as Record<string, string>
);

function translateWordByWord(input: string, replacements: Record<string, string>): string {
  return input.replace(/[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+/g, (rawWord) => {
    const normalized = rawWord
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const translated = replacements[normalized];
    if (!translated) return rawWord;

    const isUpperCase = rawWord === rawWord.toUpperCase();
    if (isUpperCase) return translated.toUpperCase();

    const isCapitalized = rawWord[0] === rawWord[0]?.toUpperCase();
    if (isCapitalized) {
      return translated.charAt(0).toUpperCase() + translated.slice(1);
    }

    return translated;
  });
}

const ORIGINAL_TEXT_BY_NODE = new WeakMap<Text, string>();

function translateToEnglish(input: string): string {
  let output = input;
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    output = output.replace(pattern, replacement);
  }
  output = translateWordByWord(output, WORD_REPLACEMENTS);
  return output;
}

function translateToSpanish(input: string): string {
  let output = input;
  for (const [pattern, replacement] of EN_TO_ES_PHRASE_REPLACEMENTS) {
    output = output.replace(pattern, replacement);
  }
  output = translateWordByWord(output, EN_WORD_REPLACEMENTS);
  return output;
}

function shouldSkipTextNode(node: Text): boolean {
  const parent = node.parentElement;
  if (!parent) return true;
  if (!node.textContent || node.textContent.trim().length === 0) return true;

  if (parent.closest('[data-no-translate="true"]')) return true;

  const blockedTags = new Set([
    "CODE",
    "PRE",
    "KBD",
    "SCRIPT",
    "STYLE",
    "TEXTAREA",
    "INPUT",
    "SVG",
    "BUTTON",
  ]);

  let current: HTMLElement | null = parent;
  while (current) {
    if (blockedTags.has(current.tagName)) return true;
    current = current.parentElement;
  }

  return false;
}

function processTextNode(node: Text, language: Language) {
  if (shouldSkipTextNode(node)) return;

  const currentText = node.textContent ?? "";
  const originalText = ORIGINAL_TEXT_BY_NODE.get(node) ?? currentText;

  if (!ORIGINAL_TEXT_BY_NODE.has(node)) {
    ORIGINAL_TEXT_BY_NODE.set(node, currentText);
  }

  if (language === "es") {
    const englishFromOriginal = translateToEnglish(originalText);
    const looksLikeSpanishSource = englishFromOriginal !== originalText;
    const nextText = looksLikeSpanishSource ? originalText : translateToSpanish(originalText);
    if (currentText !== nextText) {
      node.textContent = nextText;
    }
    return;
  }

  const translatedText = translateToEnglish(originalText);
  if (currentText !== translatedText) {
    node.textContent = translatedText;
  }
}

function processTree(root: Node, language: Language) {
  if (root.nodeType === Node.TEXT_NODE) {
    processTextNode(root as Text, language);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    processTextNode(current as Text, language);
    current = walker.nextNode();
  }
}

function readStoredLanguage(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "es" ? "es" : "en";
}

function writeLanguage(language: Language) {
  window.localStorage.setItem(STORAGE_KEY, language);
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  window.dispatchEvent(
    new CustomEvent("site-language-change", {
      detail: { language },
    })
  );
}

export default function LanguageToggleClient() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>("en");
  const languageRef = useRef<Language>("en");

  useEffect(() => {
    const initialLanguage = readStoredLanguage();
    setLanguage(initialLanguage);
    languageRef.current = initialLanguage;
    writeLanguage(initialLanguage);
    processTree(document.body, initialLanguage);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    processTree(document.body, languageRef.current);
  }, [pathname]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const activeLanguage = languageRef.current;

      for (const mutation of mutations) {
        if (mutation.type === "characterData" && mutation.target.nodeType === Node.TEXT_NODE) {
          processTextNode(mutation.target as Text, activeLanguage);
        }

        for (const addedNode of mutation.addedNodes) {
          processTree(addedNode, activeLanguage);
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  function switchLanguage(nextLanguage: Language) {
    languageRef.current = nextLanguage;
    setLanguage(nextLanguage);
    writeLanguage(nextLanguage);
    processTree(document.body, nextLanguage);
  }

  return (
    <div className="globalLanguageSwitch" data-no-translate="true">
      <span>{language === "en" ? "Language" : "Idioma"}</span>
      <div className="globalLanguageActions">
        <button
          type="button"
          onClick={() => switchLanguage("en")}
          aria-pressed={language === "en"}
          className={language === "en" ? "active" : ""}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => switchLanguage("es")}
          aria-pressed={language === "es"}
          className={language === "es" ? "active" : ""}
        >
          ES
        </button>
      </div>
    </div>
  );
}
