/* Spanish industry content — structurally parallel to lib/industries.ts. Slugs/keys unchanged. */
const PRODUCT_TAGLINE = "IA donde tiene sentido. Personas donde importan. Automatización como base de ambas."

/* ============================================================================
   CAROS industry landing-page content model.

   Product-identical sections (capture, operating-system pillars, customer
   experience, scaling) are generated from trade-specific vocabulary tokens so
   they read in the trade's language. The high-signal, differentiating sections
   (hero, revenue problem, revenue leaks, the revenue journey, the signature
   recurring-revenue theme, dashboard metrics, business questions, and FAQ) are
   authored bespoke per trade below.
   ========================================================================== */

export type Emphasized = { text: string; gold: string }
export type Metric = { value: string; label: string; highlight?: boolean }
export type Capability = { title: string; body: string }
export type Pillar = { label: string; question: string; items: string[] }
export type QA = { q: string; a: string }
export type IndustryVisualTheme = "clinical" | "competitive" | "luxury" | "discreet"

export interface IndustryContent {
  slug: string
  name: string
  // Hero
  heroEyebrow: string
  heroTitle: string
  heroTitleSerif: string
  heroSub: string
  visualTheme?: IndustryVisualTheme
  trustRow: string[]
  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string[]
  // 1. Revenue problem
  problemTitle: string
  problemTitleSerif: string
  problemIntro: string
  mattersWhen: { label: string; detail: string }[]
  problemClose: Emphasized
  // 2. Revenue leaks
  leaksIntro: string
  leaks: string[]
  leaksClose: string
  // 3. Revenue journey
  journeyIntro: string
  journey: string[]
  journeyEndLabel: string
  // 4. Capture (built)
  captureTitle: string
  captureTitleSerif: string
  captureIntro: string
  captureCapabilities: Capability[]
  // 5. Signature recurring-revenue theme (bespoke)
  signatureEyebrow: string
  signatureTitle: string
  signatureTitleSerif: string
  signatureBody: string[]
  signatureListLabel: string
  signatureUseCases: string[]
  // 6. Revenue intelligence
  metrics: Metric[]
  questions: string[]
  recoveredText: string
  // 7. Customer experience (built)
  experienceTitle: string
  experienceTitleSerif: string
  experienceIntro: string[]
  experiencePoints: string[]
  // 8. Operating system (built)
  pillars: Pillar[]
  // 9. Scaling with less (built, carries the tagline)
  scalingTitle: string
  scalingTitleSerif: string
  scalingBody: string[]
  scalingPoints: string[]
  // FAQ
  faq: QA[]
  // CTA
  ctaHeadline: string
  ctaSub: string
  // Optional per-industry hero CTA overrides (labels + hrefs)
  heroCtas?: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }
  // Nonprofits use a sales-led pricing/consultation flow instead of standard CTAs
  salesLedPricing?: boolean
}

/* --------------------------------------------------------------------------
   Trade vocabulary tokens — drive the product-constant sections so they read
   in each trade's real language rather than generic "customer/job" wording.
   -------------------------------------------------------------------------- */

interface Tokens {
  trade: string
  /** Optional display name for nav/grid/schema when it differs from the grammatical `trade`. */
  label?: string
  slug: string
  customers: string // plural, e.g. "homeowners"
  customer: string // singular
  job: string // "job" | "project"
  jobs: string
  estimate: string // "estimate" | "quote" | "inspection" | "bid"
  estimates: string
  tech: string // "crew" | "technician" | "electrician"
  techs: string
  site: string // "job site" | "property" | "home"
  callWord: string // "service call" | "call" | "inquiry"
  bookLabel: string // "booked jobs" | "signed projects"
}

/* --------------------------------------------------------------------------
   Builders for the product-constant sections.
   -------------------------------------------------------------------------- */

function buildCapture(t: Tokens): Capability[] {
  return [
    {
      title: "Todos los prospectos en un solo lugar",
      body: `Llamadas, formularios web, chat, prospectos de Google y Facebook y recomendaciones llegan a una sola bandeja, identificados por su origen: ninguna oportunidad de contacto se pierde en un buzón de voz lleno o un correo sin leer.`,
    },
    {
      title: "Primera respuesta inmediata",
      body: `Cada contacto nuevo de ${t.customers} recibe una respuesta inmediata y profesional por mensaje de texto y correo electrónico, para que ganes oportunidades de ${t.jobs} que suelen quedarse con quien responde primero, en lugar de perderlas ante la siguiente empresa de la lista.`,
    },
    {
      title: "Respuesta por SMS a llamadas perdidas",
      body: `Si una llamada queda sin contestar durante el trabajo o fuera de horario, CAROS responde automáticamente por mensaje de texto para que esa oportunidad no se pierda para siempre.`,
    },
    {
      title: "Atención humana en nombre de tu empresa",
      body: `Personas reales atienden, califican y canalizan las consultas de ${t.customers} en nombre de tu empresa cuando tu equipo está trabajando: agendan la cita en lugar de solo tomar un mensaje.`,
    },
    {
      title: `Seguimiento de ${t.estimates}`,
      body: `Todas las propuestas y solicitudes de ${t.estimate} quedan registradas y reciben seguimiento automático con recordatorios respetuosos hasta que la persona interesada decida: las cotizaciones dejan de quedar en el olvido.`,
    },
    {
      title: "Reservas y programación en línea",
      body: `Quienes buscan tus servicios pueden reservar según tu disponibilidad real, con confirmaciones y recordatorios que reducen las ausencias y mantienen la agenda llena.`,
    },
    {
      title: "Visibilidad del proceso comercial",
      body: `Consulta de un vistazo el estado de cada oportunidad: nuevo prospecto, envío de ${t.estimate}, cita programada o ${t.bookLabel}, sin revisar libretas ni mensajes.`,
    },
    {
      title: "Atribución por origen",
      body: `Identifica qué anuncios, campañas y fuentes de recomendaciones generaron cada consulta, hasta llegar a ${t.bookLabel} y a los ingresos.`,
    },
  ]
}

function buildExperience(t: Tokens): { intro: string[]; points: string[] } {
  return {
    intro: [
      `Quienes buscan tus servicios eligen una empresa en la que confían para cumplir y hacer un buen trabajo. CAROS protege esa confianza con respuestas oportunas, recordatorios y organización que demuestran que pueden contar contigo, mientras tu equipo de ${t.techs} se concentra en el trabajo.`,
      `CAROS nunca reemplaza a tu gente. Elimina las tareas administrativas que rodean el trabajo para que tu equipo dedique tiempo a lo importante: atender a ${t.customers} y brindar el servicio.`,
    ],
    points: [
      `Respuestas rápidas y profesionales para que ${t.customers} reciban una buena atención desde el primer contacto.`,
      "Cada mensaje se envía con el nombre, la marca y la voz de tu empresa.",
      `Recordatorios respetuosos que mantienen al día las citas y el seguimiento de ${t.estimates}.`,
      "Un estado claro para cada contacto, para que nada se olvide durante la temporada de mayor actividad.",
      "Atención humana y canalización a la persona adecuada de tu equipo.",
    ],
  }
}

function buildPillars(t: Tokens, acquisitionItems: string[]): Pillar[] {
  return [
    {
      label: "Captación de clientes",
      question: "¿De dónde vienen nuestros clientes?",
      items: acquisitionItems,
    },
    {
      label: "Operaciones de ingresos",
      question: "¿Qué sucede después de que nos contactan?",
      items: [
        `Seguimiento y recordatorios de ${t.estimates}`,
        "Flujos de trabajo para agendar citas",
        "Seguimiento automatizado de prospectos",
        "Cotizaciones digitales, firmas y facturación",
      ],
    },
    {
      label: "Éxito del cliente",
      question: "¿Qué sucede después de completar el trabajo?",
      items: [
        "Solicitudes de reseñas y respuestas",
        "Campañas de recomendaciones después de cada trabajo",
        "Recordatorios para repetir el servicio",
        "Reactivación de clientes inactivos",
      ],
    },
    {
      label: "Inteligencia de negocios",
      question: "¿Todo esto está generando ingresos?",
      items: [
        "Atribución del origen de los prospectos",
        "Informes de ingresos de trabajos confirmados",
        "Retorno de inversión de marketing por campaña",
        "Informes semanales de resultados",
      ],
    },
    {
      label: "Integraciones",
      question: "¿Cómo se integra con lo que usamos?",
      items: [
        "Teléfono, correo electrónico y SMS",
        "Calendarios y programación de citas",
        "Sitio web y fuentes de publicidad",
        "Pagos y herramientas compatibles para trabajo en campo",
      ],
    },
  ]
}

function buildScaling(t: Tokens): { body: string[]; points: string[] } {
  return {
    body: [
      `La pregunta más difícil al hacer crecer un negocio del sector de ${t.trade.toLowerCase()} no es si conviene crecer, sino cuándo sumar personal y cuándo dejar que los sistemas absorban la carga. Contrata demasiado pronto y la nómina se come el margen. Contrata demasiado tarde y pierdes oportunidades con ${t.customers} mientras todo el equipo está saturado.`,
      `CAROS se basa en un principio sencillo: ${PRODUCT_TAGLINE} Captas más consultas, das seguimiento a cada propuesta de ${t.estimate} y mantienes el avance de las oportunidades con ${t.customers}, sin sumar una persona de oficina por cada aumento de volumen. Cuando realmente llegue el momento de contratar, tendrás los números para saberlo.`,
    ],
    points: [
      "Atiende más consultas sin ampliar el personal de atención antes de tiempo.",
      "La automatización se encarga del seguimiento y los recordatorios para los que tu equipo no tiene tiempo.",
      "Las personas se concentran en las conversaciones de alto valor que realmente cierran negocios.",
      "Los números claros te indican cuándo sumar personal: ni demasiado pronto ni demasiado tarde.",
    ],
  }
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/* --------------------------------------------------------------------------
   Assemble a full IndustryContent from bespoke content + built sections.
   -------------------------------------------------------------------------- */

type Bespoke = Omit<
  IndustryContent,
  | "slug"
  | "name"
  | "captureTitle"
  | "captureTitleSerif"
  | "captureIntro"
  | "captureCapabilities"
  | "experienceIntro"
  | "experiencePoints"
  | "pillars"
  | "scalingTitle"
  | "scalingTitleSerif"
  | "scalingBody"
  | "scalingPoints"
> & {
  acquisitionItems: string[]
  /* Optional overrides — default to the field-service wording when omitted, so
     non-field trades (real estate, travel, events) can supply natural titles. */
  captureTitle?: string
  captureTitleSerif?: string
  captureIntro?: string
  scalingTitle?: string
  scalingTitleSerif?: string
  /* Optional full-section overrides for verticals where the field-service
     builders don't fit at all (e.g. religious institutions). */
  captureCapabilities?: Capability[]
  experienceIntro?: string[]
  experiencePoints?: string[]
  pillars?: Pillar[]
  scalingBody?: string[]
  scalingPoints?: string[]
}

function make(t: Tokens, b: Bespoke): IndustryContent {
  const exp = buildExperience(t)
  const scaling = buildScaling(t)
  const {
    acquisitionItems,
    captureTitle,
    captureTitleSerif,
    captureIntro,
    scalingTitle,
    scalingTitleSerif,
    captureCapabilities,
    experienceIntro,
    experiencePoints,
    pillars,
    scalingBody,
    scalingPoints,
    ...rest
  } = b
  return {
    slug: t.slug,
    name: t.label ?? t.trade,
    ...rest,
    captureTitle: captureTitle ?? "Capta cada prospecto y conviértelo en un",
    captureTitleSerif: captureTitleSerif ?? "trabajo confirmado.",
    captureIntro:
      captureIntro ??
      `En el sector de ${t.trade.toLowerCase()}, gran parte de los ingresos se gana o se pierde en los primeros minutos y en los primeros intentos de seguimiento. CAROS se asegura de registrar cada consulta, formulario y recomendación, responder rápido y acercarlos al objetivo de ${t.bookLabel}, de forma automática.`,
    captureCapabilities: captureCapabilities ?? buildCapture(t),
    experienceIntro: experienceIntro ?? exp.intro,
    experiencePoints: experiencePoints ?? exp.points,
    pillars: pillars ?? buildPillars(t, acquisitionItems),
    scalingTitle: scalingTitle ?? "Aumenta tus ingresos sin aumentar",
    scalingTitleSerif: scalingTitleSerif ?? "el caos.",
    scalingBody: scalingBody ?? scaling.body,
    scalingPoints: scalingPoints ?? scaling.points,
  }
}

const coachingProfessionalServices = make(
  { trade: "Coaching y servicios profesionales", label: "Coaching y servicios profesionales", slug: "coaching-professional-services", customers: "clientes potenciales", customer: "cliente potencial", job: "contrato", jobs: "contratos", estimate: "propuesta", estimates: "propuestas", tech: "asesor", techs: "asesores", site: "consultoría", callWord: "consulta", bookLabel: "contratos firmados" },
  {
    heroEyebrow: "Solución por industria — Coaching y servicios profesionales",
    heroTitle: "Convierte más de tu experiencia en",
    heroTitleSerif: "ingresos predecibles.",
    heroSub: "CAROS ayuda a coaches, consultores, agencias y empresas de servicios profesionales a captar oportunidades, dar seguimiento constante, entender qué acciones de marketing generan ingresos y construir un camino más visible y repetible desde el primer contacto hasta la conversión en cliente.",
    trustRow: ["Profesionales de coaching", "Consultores", "Agencias", "Directivos de tiempo parcial", "Firmas de asesoría"],
    metaTitle: "CAROS para coaching y servicios profesionales | Convierte tu experiencia en ingresos",
    metaDescription: "CAROS ayuda a coaches, consultores, agencias y empresas de servicios profesionales a captar oportunidades, dar seguimiento constante y vincular el marketing con los ingresos de sus clientes.",
    keywords: ["seguimiento de clientes potenciales para coaches", "ROI de marketing para consultores", "proceso de ventas para agencias", "ingresos de servicios profesionales"],
    problemTitle: "Quizás el problema no sea tu experiencia.", problemTitleSerif: "Sino tu proceso de generación de ingresos.",
    problemIntro: "Las empresas basadas en conocimientos especializados pierden impulso entre la consulta, la llamada inicial, la propuesta y la firma del contrato. Cuando el proceso depende de la memoria, las oportunidades valiosas desaparecen sin que nadie lo note.",
    mattersWhen: ["Los clientes potenciales llegan por varios canales sin una visión unificada de los ingresos.", "Se agendan llamadas iniciales, pero los clientes potenciales no asisten.", "Se envían propuestas sin un seguimiento sistemático.", "Los ciclos de venta largos y las recomendaciones sin seguimiento ocultan las mejores oportunidades.", "No se mantiene una relación constante con los clientes actuales para generar renovaciones, ventas adicionales o recomendaciones."].map((detail) => ({ label: detail.split(" ").slice(0, 3).join(" "), detail })),
    problemClose: { text: "CAROS hace que el camino desde tu experiencia hasta el cliente sea", gold: "visible y repetible." },
    leaksIntro: "Los ingresos se pierden por consultas sin responder, respuestas lentas, inasistencias, propuestas olvidadas, clientes potenciales sin una próxima acción, renovaciones deficientes, recomendaciones sin seguimiento y poca claridad sobre el ROI de marketing.",
    leaks: ["Consultas sin responder", "Respuesta lenta a clientes potenciales", "Inasistencias a llamadas iniciales", "Seguimiento irregular de propuestas", "Clientes potenciales anteriores olvidados", "Procesos de renovación deficientes", "Recomendaciones sin seguimiento", "Poca visibilidad del ROI de marketing"],
    leaksClose: "Una agenda llena hoy no garantiza un flujo saludable de oportunidades de venta mañana.",
    journeyIntro: "Visualiza todo el recorrido desde el interés inicial hasta los ingresos y descubre dónde espera la próxima oportunidad.",
    journey: ["Inversión en marketing", "Cliente potencial", "Llamada inicial", "Propuesta", "Cliente", "Ingresos", "Renovación / Venta adicional / Recomendación"], journeyEndLabel: "Ingresos y crecimiento de clientes",
    signatureEyebrow: "Atribución de marketing y crecimiento de clientes", signatureTitle: "Deja de preguntar qué canal generó más clientes potenciales.", signatureTitleSerif: "Pregunta cuál generó los clientes más valiosos.",
    signatureBody: ["Los clics, los formularios enviados, las descargas y las llamadas agendadas solo cuentan una parte de la historia. CAROS conecta las acciones de marketing con las conversaciones, las propuestas, los clientes y los ingresos.", "Con un único proceso visible, puedes ver qué ofertas, campañas, canales y fuentes de recomendaciones generan clientes que vale la pena conservar."], signatureListLabel: "Dónde CAROS impulsa los ingresos de los servicios profesionales", signatureUseCases: ["Captación de clientes potenciales en múltiples canales", "Recordatorios de llamadas iniciales", "Seguimiento de propuestas", "Seguimiento de recomendaciones", "Comunicación para renovar contratos con clientes", "Campañas de venta adicional y reactivación", "Atribución de marketing"],
    metrics: [{ value: "100%", label: "de las oportunidades visibles", highlight: true }, { value: "1", label: "recorrido del cliente potencial al cliente" }, { value: "24/7", label: "cobertura de seguimiento" }], questions: ["¿Qué canal genera nuestros mejores clientes?", "¿Dónde se estancan las propuestas?", "¿Quién necesita una próxima acción?", "¿Qué clientes están listos para renovar o recomendarnos?"], recoveredText: "Cada oportunidad recuperada le da a tu experiencia otra posibilidad de convertirse en ingresos.",
    experienceTitle: "Ofrece una experiencia al cliente tan cuidada como tu trabajo profesional.", experienceTitleSerif: "Desde el primer contacto hasta la renovación.",
    faq: [{ q: "¿Para quién está diseñado?", a: "CAROS está diseñado para coaches, consultores, agencias, directivos de tiempo parcial y otras empresas de servicios profesionales basadas en conocimientos especializados." }, { q: "¿CAROS reemplaza nuestro CRM?", a: "CAROS puede organizar y fortalecer el proceso de generación de ingresos en torno a las herramientas que tu equipo ya utiliza." }],
    ctaHeadline: "Descubre dónde podrías estar perdiendo ingresos en tu proceso de ventas.", ctaSub: "Una auditoría de ingresos de CAROS te muestra dónde se estancan las oportunidades y qué necesitas para construir un camino más predecible desde el primer contacto hasta la conversión en cliente.", acquisitionItems: ["Captación desde el sitio web, redes sociales y recomendaciones", "Conversión de llamadas iniciales", "Atribución de ofertas y campañas", "Informes sobre el origen de los clientes potenciales"],
  },
)

/* ==========================================================================
   ROOFING
   ========================================================================== */

const roofing = make(
  {
    trade: "Servicios de techado",
    slug: "roofing",
    customers: "propietarios de viviendas",
    customer: "propietario de vivienda",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "presupuesto",
    estimates: "presupuestos",
    tech: "cuadrilla",
    techs: "cuadrillas",
    site: "techo",
    callWord: "llamada por daños de tormenta",
    bookLabel: "trabajos contratados",
  },
  {
    heroEyebrow: "Solución por industria — Servicios de techado",
    heroTitle: "Cuando llega la tormenta, los ingresos son para quien",
    heroTitleSerif: "responde primero.",
    heroSub:
      "Los ingresos por servicios de techado se ganan en las horas posteriores a una tormenta y se pierden en las semanas que siguen al envío de un presupuesto. CAROS se asegura de que se responda cada llamada, se agende cada inspección y se dé seguimiento a cada presupuesto, para que los clientes potenciales no se vayan con la cuadrilla que llegó antes a su puerta.",
    trustRow: ["Atención tras tormentas", "Clientes particulares y seguros", "Reemplazo de techos residenciales", "Reparaciones", "Sector comercial"],
    metaTitle: "CAROS para empresas de techado | Atiende llamadas por tormentas y da seguimiento a presupuestos",
    metaDescription:
      "CAROS ayuda a los contratistas de techado a responder cada llamada por tormentas, agendar más inspecciones, dar seguimiento a cada presupuesto y rastrear qué fuentes de clientes potenciales generan trabajos contratados: el sistema operativo de ingresos diseñado para especialistas en techado.",
    keywords: [
      "gestión de clientes potenciales para techado",
      "seguimiento de presupuestos de techado",
      "software de techado para atención tras tormentas",
      "CRM para techado",
      "marketing para contratistas de techado",
      "clientes potenciales de techado por reclamos de seguros",
      "agendamiento de citas de techado",
      "respuesta por mensaje de texto a llamadas perdidas de techado",
      "proceso de ventas de techado",
      "ROI de marketing para techado",
    ],
    problemTitle: "No necesitas más clientes potenciales tras una tormenta. Necesitas",
    problemTitleSerif: "dejar de perderlos.",
    problemIntro:
      "Después de una granizada o un episodio de vientos fuertes, los teléfonos suenan para todos. El especialista en techado que gana no es quien tiene más clientes potenciales, sino quien responde, inspecciona, cotiza y da seguimiento antes de que el propietario contrate a otra empresa. Esa carrera es donde realmente se deciden los ingresos por techado.",
    mattersWhen: [
      { label: "Llamadas por tormentas", detail: "importan cuando alguien las responde antes de que el propietario llame al siguiente especialista en techado." },
      { label: "Inspecciones", detail: "importan cuando realmente se agendan, en lugar de prometerse y olvidarse." },
      { label: "Presupuestos", detail: "importan cuando se les da seguimiento hasta que el propietario toma una decisión." },
      { label: "Inversión publicitaria", detail: "importa cuando puedes ver qué campañas generan contratos de techado firmados." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la tormenta hasta la firma, en torno a",
      gold: "ingresos medibles por contratos de techado firmados.",
    },
    leaksIntro:
      "Nada de esto es una falla de los buenos especialistas en techado. Son fallas de proceso: los vacíos silenciosos donde un propietario listo para comprar simplemente deja de avanzar hacia tu empresa.",
    leaks: [
      "Las llamadas por tormentas llegan al buzón de voz mientras tus cuadrillas están sobre un techo.",
      "Los clientes potenciales del sitio web esperan horas antes de recibir una llamada, y el propietario ya agendó una inspección con otra empresa.",
      "Las inspecciones se prometen por teléfono, pero nunca llegan a la agenda.",
      "Se envían los presupuestos y el propietario deja de responder, sin que nadie dé seguimiento.",
      "Los trabajos cubiertos por seguros se estancan por documentos pendientes que nadie gestiona.",
      "Los clientes de reparaciones no vuelven a recibir noticias tuyas sobre el reemplazo completo del techo que terminarán necesitando.",
      "Los clientes potenciales por recomendación y visitas puerta a puerta nunca se registran ni reciben seguimiento.",
      "Los antiguos clientes olvidan tu nombre cuando llega la siguiente tormenta.",
    ],
    leaksClose:
      "Suma las llamadas perdidas y los presupuestos abandonados de una temporada de tormentas y, muchas veces, representan más ingresos de los que generaría una camioneta y una cuadrilla nuevas, sin que ningún informe lo muestre.",
    journeyIntro:
      "Cada trabajo de techado sigue el mismo recorrido desde la primera llamada hasta la factura final. CAROS hace que ese recorrido sea constante y visible, para que puedas ver dónde avanzan los propietarios y dónde se estancan.",
    journey: ["Llamada por tormenta", "Inspección", "Presupuesto", "Seguro / Aprobación", "Trabajo contratado", "Instalación", "Reseñas y recomendaciones"],
    journeyEndLabel: "Contratos de techado e ingresos recurrentes",
    signatureEyebrow: "Ingresos por tormentas y seguros",
    signatureTitle: "Los ingresos después de la tormenta",
    signatureTitleSerif: "pueden ser tuyos.",
    signatureBody: [
      "Una sola tormenta puede generar trabajo para toda una temporada, pero solo si puedes absorber el aumento de demanda sin dejar llamadas sin responder, perder presupuestos ni permitir que se estanquen los trabajos cubiertos por seguros. La mayoría de los especialistas en techado simplemente no puede responder con suficiente rapidez cuando más importa.",
      "CAROS te ayuda a manejar el aumento de demanda: responde cada llamada por tormenta, agenda inspecciones, da seguimiento a presupuestos y mantiene en marcha la aprobación de los trabajos cubiertos por seguros. Cuando llega el siguiente evento, eres la empresa que está lista, no la que intenta ponerse al día.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos por techado",
    signatureUseCases: [
      "Recepción de llamadas por tormentas",
      "Agendamiento de inspecciones gratuitas",
      "Seguimiento de presupuestos",
      "Coordinación de reclamos de seguros",
      "Seguimiento de ajustadores y aprobaciones",
      "Seguimiento de reparaciones para ofrecer reemplazos",
      "Seguimiento de financiamiento",
      "Recordatorios de garantía y mantenimiento",
      "Campañas por vecindario y recomendaciones",
      "Generación de reseñas después de la instalación",
      "Reactivación de antiguos clientes",
      "Proceso de ventas de reemplazos de techos comerciales",
    ],
    metrics: [
      { value: "61", label: "Llamadas por tormentas" },
      { value: "42", label: "Inspecciones agendadas" },
      { value: "28", label: "Presupuestos enviados" },
      { value: "17", label: "Trabajos contratados" },
      { value: "$318,000", label: "Ingresos contratados" },
      { value: "7.4x", label: "ROI de marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas publicitarias generan contratos de techado firmados?",
      "¿Qué tan rápido respondemos las llamadas por tormentas?",
      "¿Cuántos presupuestos siguen esperando seguimiento?",
      "¿Qué trabajos cubiertos por seguros están detenidos en la aprobación?",
      "¿Cuántas inspecciones se convirtieron en trabajos contratados?",
      "¿Qué vecindarios generaron más trabajo esta temporada?",
      "¿Cuántos antiguos clientes necesitan reemplazar su techo?",
      "¿Dónde perdemos ingresos entre la llamada y el contrato?",
    ],
    recoveredText:
      "Llamadas por tormentas que habrían llegado al buzón de voz y presupuestos que se habrían perdido en el silencio: atendidos, con seguimiento y convertidos en contratos de techado firmados.",
    experienceTitle: "Tecnología que mantiene a tus cuadrillas",
    experienceTitleSerif: "sobre el techo.",
    faq: [
      {
        q: "¿CAROS es un software de presupuestos o mediciones para techado?",
        a: "No. CAROS es un sistema de adquisición de clientes y operaciones de ingresos. Capta clientes potenciales, agenda inspecciones, da seguimiento a presupuestos y rastrea qué fuentes generan trabajos contratados. Funciona junto con las herramientas de presupuestos y medición que ya utilizas.",
      },
      {
        q: "¿Cómo ayuda CAROS durante el aumento de demanda tras una tormenta?",
        a: "CAROS responde cada llamada entrante y envía respuestas por mensaje de texto, agenda inspecciones según tu disponibilidad real y da seguimiento automático a los presupuestos, para que un aumento repentino de la demanda no se convierta en una pila de llamadas perdidas y cotizaciones abandonadas.",
      },
      {
        q: "¿CAROS puede ayudar con los trabajos cubiertos por seguros?",
        a: "Sí. CAROS mantiene en marcha los trabajos relacionados con reclamos de seguros al rastrear el estado de cada uno e impulsar el seguimiento necesario durante la inspección, la aprobación del ajustador y la programación, para que no se estanquen esperando una llamada que nadie hizo.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS atiende el exceso de llamadas y las que llegan fuera del horario laboral, y automatiza el seguimiento para el que tu equipo no tiene tiempo, de modo que tu personal pueda concentrarse en vender y ejecutar trabajos. Te ayuda a crecer sin ampliar demasiado pronto el personal administrativo.",
      },
      {
        q: "¿CAROS funciona con mi CRM y sistema telefónico actuales?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y trabajo en campo, y puede servir como tu sistema central o funcionar junto con lo que ya tienes. Configuramos las integraciones por ti durante la implementación.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de techado?",
        a: "Revisamos cómo se responden tus llamadas, qué tan rápido reciben respuesta los clientes potenciales, cómo se da seguimiento a los presupuestos y dónde se estancan los trabajos. Luego te mostramos exactamente dónde se pierden ingresos entre la primera llamada por tormenta y el contrato firmado.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos por techado.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se están perdiendo llamadas por tormentas, inspecciones y presupuestos, y qué necesitas para recuperarlos antes de la próxima tormenta.",
    acquisitionItems: ["Recepción de llamadas por tormentas y servicios", "Captación de clientes potenciales de Google y Facebook", "Registro de visitas puerta a puerta y recomendaciones", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   HVAC
   ========================================================================== */

const hvac = make(
  {
    trade: "Calefacción, ventilación y aire acondicionado",
    slug: "hvac",
    customers: "propietarios de viviendas",
    customer: "propietario de vivienda",
    job: "llamada",
    jobs: "llamadas",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "técnico",
    techs: "técnicos",
    site: "vivienda",
    callWord: "llamada de servicio",
    bookLabel: "servicios agendados",
  },
  {
    heroEyebrow: "Solución por industria — Calefacción, ventilación y aire acondicionado",
    heroTitle: "Tu temporada de mayor actividad también es cuando",
    heroTitleSerif: "más ingresos pierdes.",
    heroSub:
      "Cuando llega la primera ola de calor, las llamadas entran más rápido de lo que cualquiera puede responder. CAROS atiende cada llamada de servicio, agenda más servicios de mantenimiento preventivo, da seguimiento a cada cotización de reemplazo y mantiene al día las renovaciones de los planes de mantenimiento, para que la temporada alta llene tu agenda y no tu buzón de voz.",
    trustRow: ["Servicio y reparación", "Reemplazos", "Planes de mantenimiento", "Sector residencial", "Pequeños comercios"],
    metaTitle: "CAROS para contratistas de climatización | Atiende llamadas y amplía tus planes de mantenimiento",
    metaDescription:
      "CAROS ayuda a las empresas de calefacción, ventilación y aire acondicionado a responder cada llamada de servicio, agendar más mantenimientos preventivos, dar seguimiento a cotizaciones de reemplazo y renovar contratos de mantenimiento: el sistema operativo de ingresos diseñado para contratistas de climatización.",
    keywords: [
      "gestión de clientes potenciales de climatización",
      "software de planes de mantenimiento de climatización",
      "agendamiento de servicios de climatización",
      "seguimiento de cotizaciones de reemplazo de climatización",
      "CRM para climatización",
      "ROI de marketing para climatización",
      "respuesta por mensaje de texto a llamadas perdidas de climatización",
      "campaña de mantenimiento preventivo de climatización",
      "programación de asignaciones de técnicos de climatización",
      "renovaciones de contratos de servicio de climatización",
    ],
    problemTitle: "No necesitas más llamadas en julio. Necesitas",
    problemTitleSerif: "responder las que recibes.",
    problemIntro:
      "En temporada alta, el problema no es la demanda, sino la capacidad. Las llamadas que llegan al buzón de voz, los mantenimientos preventivos que nunca se agendan y las cotizaciones de reemplazo que nunca reciben seguimiento son ingresos perdidos, y se acumulan justo cuando estás demasiado ocupado para notarlo.",
    mattersWhen: [
      { label: "Llamadas de servicio", detail: "importan cuando una persona responde antes de que el propietario llame a la siguiente empresa." },
      { label: "Mantenimientos preventivos", detail: "importan cuando se agendan y se recuerdan, en lugar de perderse en una semana ajetreada." },
      { label: "Cotizaciones de reemplazo", detail: "importan cuando se les da seguimiento hasta que el propietario toma una decisión." },
      { label: "Planes de mantenimiento", detail: "importan cuando se renuevan a tiempo, en lugar de vencer sin que nadie lo note." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la llamada hasta el confort, en torno a",
      gold: "ingresos medibles y recurrentes.",
    },
    leaksIntro:
      "Nada de esto es una falla de los buenos técnicos. Son fallas de proceso: los vacíos donde un cliente listo para contratar deja de avanzar antes de que se agende el trabajo.",
    leaks: [
      "Las llamadas de servicio llegan al buzón de voz mientras todos los técnicos están trabajando fuera de la oficina.",
      "Las llamadas de emergencia fuera del horario laboral terminan con un competidor que tiene una línea 24/7.",
      "Las solicitudes de mantenimiento preventivo se prometen por teléfono y nunca se agendan.",
      "Se envían cotizaciones de reemplazo y el propietario deja de responder.",
      "Los contratos de mantenimiento vencen porque nadie envió la renovación.",
      "A los clientes de reparaciones nunca se les ofrece el plan que los haría volver.",
      "Los sistemas antiguos que atendiste hace años nunca reciben seguimiento para un reemplazo.",
      "Los antiguos clientes olvidan tu nombre para el siguiente cambio de temporada.",
    ],
    leaksClose:
      "Suma las llamadas perdidas, los planes vencidos y las cotizaciones abandonadas de una temporada de calor y, por lo general, su valor supera ampliamente el costo del sistema que habría permitido recuperarlos.",
    journeyIntro:
      "Cada cliente de climatización sigue el mismo recorrido desde la primera llamada hasta la renovación del plan. CAROS hace que ese recorrido sea constante y visible, para que puedas ver dónde avanzan los propietarios y dónde abandonan el proceso.",
    journey: ["Llamada de servicio", "Asignación / Agendamiento", "Diagnóstico", "Reparación o cotización", "Reemplazo", "Plan de mantenimiento", "Renovaciones y recomendaciones"],
    journeyEndLabel: "Trabajos agendados e ingresos recurrentes",
    signatureEyebrow: "Planes de mantenimiento y demanda estacional",
    signatureTitle: "Ingresos recurrentes que te sostienen durante",
    signatureTitleSerif: "los meses de baja demanda.",
    signatureBody: [
      "Los contratos de mantenimiento marcan la diferencia entre una empresa de climatización que improvisa cada temporada y una que comienza cada mes con ingresos ya contratados. Pero los planes solo funcionan si se venden de forma constante, se renuevan a tiempo y se cumplen con recordatorios de mantenimiento preventivo que realmente se envían.",
      "CAROS mantiene en marcha todo el motor de ingresos recurrentes: ofrece planes en el momento adecuado, envía automáticamente recordatorios de renovación y mantenimiento preventivo, y vuelve a contactar a los clientes cuyos planes vencieron, para que los ingresos recurrentes crezcan en lugar de perderse entre temporadas.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos por climatización",
    signatureUseCases: [
      "Recepción de llamadas fuera del horario laboral",
      "Agendamiento de mantenimiento preventivo",
      "Seguimiento de cotizaciones de reemplazo",
      "Inscripción en planes de mantenimiento",
      "Recordatorios de renovación de planes",
      "Campañas estacionales de mantenimiento preventivo",
      "Seguimiento de financiamiento",
      "Seguimiento para reemplazar sistemas antiguos",
      "Conversión de reparaciones en planes",
      "Generación de reseñas",
      "Reactivación de planes vencidos",
      "Proceso de ventas para pequeños comercios",
    ],
    metrics: [
      { value: "88", label: "Llamadas de servicio" },
      { value: "63", label: "Servicios agendados" },
      { value: "21", label: "Cotizaciones de reemplazo" },
      { value: "34", label: "Planes renovados" },
      { value: "$247,000", label: "Ingresos contratados" },
      { value: "6.8x", label: "ROI de marketing", highlight: true },
    ],
    questions: [
      "¿Cuántas llamadas llegaron al buzón de voz esta semana?",
      "¿Qué campañas generan servicios agendados y no solo clics?",
      "¿Cuántas cotizaciones de reemplazo esperan seguimiento?",
      "¿Cuántos planes de mantenimiento están por renovarse?",
      "¿Cuántos planes vencidos podríamos recuperar?",
      "¿Las cotizaciones de qué técnicos tienen la mejor tasa de conversión?",
      "¿Cuántos sistemas antiguos requieren contactar al cliente para ofrecer un reemplazo?",
      "¿Dónde perdemos ingresos entre la llamada y el trabajo agendado?",
    ],
    recoveredText:
      "Llamadas fuera del horario laboral que habrían terminado con un competidor y planes de mantenimiento que habrían vencido sin que nadie lo notara: atendidos, renovados y convertidos en ingresos recurrentes.",
    experienceTitle: "Tecnología que mantiene a tus técnicos",
    experienceTitleSerif: "en campo.",
    faq: [
      {
        q: "¿CAROS es un software de asignación de técnicos o de servicio en campo para climatización?",
        a: "No. CAROS es un sistema de adquisición de clientes y operaciones de ingresos. Atiende llamadas, agenda citas, da seguimiento a cotizaciones y amplía los planes de mantenimiento. Funciona junto con las herramientas de asignación de técnicos y servicio en campo que ya utilizas.",
      },
      {
        q: "¿Cómo ayuda CAROS durante la temporada alta?",
        a: "CAROS responde cada llamada y envía respuestas por mensaje de texto, agenda citas según tu disponibilidad real y automatiza el seguimiento de cotizaciones, para que el aumento de llamadas de julio llene tu agenda y no tu buzón de voz.",
      },
      {
        q: "¿CAROS puede aumentar nuestros ingresos por planes de mantenimiento?",
        a: "Sí. CAROS ofrece planes en los momentos adecuados, envía automáticamente recordatorios de renovación y mantenimiento preventivo, y vuelve a contactar a los miembros cuyos planes vencieron, convirtiendo los contratos de mantenimiento en ingresos recurrentes confiables.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo o de asignación de técnicos?",
        a: "No. CAROS atiende el exceso de llamadas y las que llegan fuera del horario laboral, y automatiza el seguimiento que tu equipo no alcanza a hacer, para que tu personal se concentre en agendar y realizar servicios. Te permite crecer sin ampliar demasiado pronto el personal administrativo.",
      },
      {
        q: "¿CAROS se integra con nuestros sistemas actuales?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y servicio en campo, y puede ser tu sistema central o complementar lo que ya utilizas. Nos encargamos de las integraciones durante la implementación.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de climatización?",
        a: "Revisamos cómo se responden las llamadas, qué tan rápido reciben respuesta los clientes potenciales, cómo se da seguimiento a las cotizaciones y los planes, y dónde se estancan los trabajos. Luego te mostramos exactamente dónde se pierden ingresos a lo largo de la temporada.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos por climatización.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se están perdiendo llamadas, cotizaciones y planes de mantenimiento, y qué necesitas para recuperarlos antes de tu próxima temporada alta.",
    acquisitionItems: ["Recepción de llamadas de servicio y emergencia", "Captación de clientes potenciales de Google y Facebook", "Campañas estacionales de mantenimiento preventivo", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   PLUMBING
   ========================================================================== */

const plumbing = make(
  {
    trade: "Plomería",
    slug: "plumbing",
    customers: "propietarios de viviendas",
    customer: "propietario de vivienda",
    job: "llamada",
    jobs: "llamadas",
    estimate: "presupuesto",
    estimates: "presupuestos",
    tech: "técnico",
    techs: "técnicos",
    site: "vivienda",
    callWord: "llamada de servicio",
    bookLabel: "servicios agendados",
  },
  {
    heroEyebrow: "Solución por industria — Plomería",
    heroTitle: "Cuando se rompe una tubería, llaman a quien",
    heroTitleSerif: "responde primero.",
    heroSub:
      "Las emergencias de plomería no esperan, y los clientes tampoco. CAROS atiende cada llamada de servicio, responde al instante por mensaje de texto las llamadas perdidas, agenda más trabajos y convierte las reparaciones puntuales en servicios recurrentes, para que las llamadas urgentes se conviertan en trabajo agendado y no en ingresos perdidos.",
    trustRow: ["Servicio de emergencia", "Drenajes y alcantarillado", "Reparación y reemplazo de tuberías", "Calentadores de agua", "Contratos de servicio"],
    metaTitle: "CAROS para empresas de plomería | Atiende llamadas de emergencia y agenda más trabajos",
    metaDescription:
      "CAROS ayuda a los contratistas de plomería a responder cada llamada de emergencia, contestar las llamadas perdidas por mensaje de texto, agendar más servicios, dar seguimiento a presupuestos y ampliar los contratos de servicio: el sistema operativo de ingresos diseñado para plomeros.",
    keywords: [
      "gestión de clientes potenciales de plomería",
      "agendamiento de servicios de plomería",
      "clientes potenciales de emergencias de plomería",
      "CRM para plomería",
      "seguimiento de presupuestos de plomería",
      "ROI de marketing para plomería",
      "respuesta por mensaje de texto a llamadas perdidas de plomería",
      "contrato de servicio de plomería",
      "programación de asignaciones de técnicos de plomería",
      "marketing para plomeros",
    ],
    problemTitle: "No necesitas más emergencias. Necesitas",
    problemTitleSerif: "atender cada llamada.",
    problemIntro:
      "Una emergencia de plomería es la venta más fácil que harás, si respondes. Los ingresos que pierdes no están en tus precios ni en tu trabajo, sino en las llamadas que llegan al buzón de voz, los presupuestos que nunca reciben seguimiento y los clientes a los que nunca vuelves a contactar.",
    mattersWhen: [
      { label: "Llamadas de emergencia", detail: "importan cuando se responden en vivo y no se envían al buzón de voz." },
      { label: "Llamadas perdidas", detail: "importan cuando quien llama recibe un mensaje de texto antes de marcar al siguiente plomero." },
      { label: "Presupuestos", detail: "importan cuando se les da seguimiento hasta que el propietario toma una decisión." },
      { label: "Contratos de servicio", detail: "importan cuando convierten una reparación en años de trabajo." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la llamada hasta la finalización del trabajo, en torno a",
      gold: "ingresos medibles y contratados.",
    },
    leaksIntro:
      "Nada de esto es una falla de los plomeros capacitados. Son fallas de proceso: los vacíos donde un cliente con una urgencia se rinde y llama al siguiente número.",
    leaks: [
      "Las llamadas de emergencia llegan al buzón de voz mientras tus técnicos están debajo de un fregadero.",
      "Las llamadas fuera del horario laboral van directamente a la línea 24/7 de un competidor.",
      "Las llamadas perdidas nunca se devuelven ni reciben respuesta por mensaje de texto.",
      "Los presupuestos de reemplazo de tuberías y calentadores de agua se envían y quedan en el olvido.",
      "A los clientes de reparaciones puntuales nunca se les ofrece un contrato de servicio.",
      "Los clientes de limpieza de drenajes nunca reciben información sobre los trabajos de alcantarillado que terminarán necesitando.",
      "Nunca se identifica la fuente de las llamadas por recomendación o de clientes recurrentes.",
      "Los antiguos clientes olvidan tu nombre hasta la siguiente emergencia y buscan otro plomero en Google.",
    ],
    leaksClose:
      "Suma las llamadas perdidas fuera del horario laboral y los presupuestos abandonados de un año y, con frecuencia, representan más ingresos de los que generaría un vehículo de servicio y un técnico nuevos, sin ningún informe que lo muestre.",
    journeyIntro:
      "Cada cliente de plomería sigue el mismo recorrido desde la primera llamada hasta el trabajo terminado. CAROS hace que ese recorrido sea constante y visible, para que puedas ver dónde agendan los propietarios y dónde se pierden.",
    journey: ["Llamada de servicio", "Respuesta por mensaje / Agendamiento", "Asignación de técnico", "Diagnóstico", "Presupuesto", "Trabajo terminado", "Contrato y recomendaciones"],
    journeyEndLabel: "Trabajos agendados y servicio recurrente",
    signatureEyebrow: "Llamadas de emergencia y contratos de servicio",
    signatureTitle: "Convierte una emergencia en",
    signatureTitleSerif: "años de servicio.",
    signatureBody: [
      "El plomero que responde la llamada de las 2 a.m. gana el trabajo, pero el que da seguimiento gana al cliente. La mayoría de los clientes de reparaciones se quedaría con gusto con una sola empresa, pero se aleja simplemente porque nadie mantuvo el contacto ni les ofreció una razón para volver.",
      "CAROS atiende cada llamada de emergencia y fuera del horario laboral, responde por mensaje de texto las que pierdes y convierte las reparaciones puntuales en contratos de servicio y trabajo recurrente, para que el cliente que ganas esta noche siga contigo la próxima vez que algo se rompa.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos por plomería",
    signatureUseCases: [
      "Recepción de llamadas de emergencia 24/7",
      "Respuesta por mensaje de texto a llamadas perdidas",
      "Agendamiento de trabajos y asignación de técnicos",
      "Seguimiento de presupuestos",
      "Inscripción en contratos de servicio",
      "Seguimiento para reemplazo de calentadores de agua",
      "Seguimiento de drenajes y alcantarillado",
      "Seguimiento de financiamiento",
      "Generación de reseñas",
      "Recordatorios de servicios recurrentes",
      "Reactivación de antiguos clientes",
      "Proceso de ventas de servicios comerciales",
    ],
    metrics: [
      { value: "94", label: "Llamadas de servicio" },
      { value: "71", label: "Servicios agendados" },
      { value: "26", label: "Presupuestos enviados" },
      { value: "22", label: "Contratos vendidos" },
      { value: "$196,000", label: "Ingresos contratados" },
      { value: "6.5x", label: "ROI de marketing", highlight: true },
    ],
    questions: [
      "¿Cuántas llamadas quedaron sin responder esta semana?",
      "¿Qué campañas generan trabajos agendados?",
      "¿Qué tan rápido respondemos por mensaje de texto las llamadas perdidas?",
      "¿Cuántos presupuestos esperan seguimiento?",
      "¿Cuántas reparaciones se convirtieron en contratos de servicio?",
      "¿Cuántos antiguos clientes llevan un año sin saber de nosotros?",
      "¿Los presupuestos de qué técnicos tienen la mejor tasa de conversión?",
      "¿Dónde perdemos ingresos entre la llamada y el trabajo terminado?",
    ],
    recoveredText:
      "Llamadas fuera del horario laboral que habrían llegado al buzón de voz y clientes de reparaciones que se habrían alejado: atendidos, con seguimiento y convertidos en trabajos agendados y contratos.",
    experienceTitle: "Tecnología que mantiene a tus técnicos",
    experienceTitleSerif: "trabajando.",
    faq: [
      {
        q: "¿CAROS es un software de asignación de técnicos de plomería?",
        a: "No. CAROS es un sistema de adquisición de clientes y operaciones de ingresos. Atiende llamadas, responde las llamadas perdidas por mensaje de texto, agenda trabajos, da seguimiento a presupuestos y amplía los contratos de servicio. Funciona junto con tus herramientas de asignación de técnicos y trabajo en campo.",
      },
      {
        q: "¿Cómo maneja CAROS las llamadas de emergencia y fuera del horario laboral?",
        a: "CAROS responde en vivo en nombre de tu empresa y contesta al instante por mensaje de texto cualquier llamada que pierdas, para que el cliente reciba una respuesta antes de llamar al siguiente plomero. Las llamadas fuera del horario laboral se atienden y se convierten en servicios agendados en lugar de perderse.",
      },
      {
        q: "¿CAROS puede ayudar a ampliar los contratos de servicio?",
        a: "Sí. CAROS ofrece contratos en el momento adecuado, automatiza las renovaciones y los recordatorios de servicios recurrentes, y vuelve a contactar a antiguos clientes, convirtiendo las reparaciones puntuales en ingresos recurrentes.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS atiende el exceso de llamadas y las que llegan fuera del horario laboral, y automatiza el seguimiento, para que tu equipo se concentre en agendar y ejecutar trabajos. Te permite crecer sin contratar personal administrativo demasiado pronto.",
      },
      {
        q: "¿CAROS funciona con nuestros sistemas actuales?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y trabajo en campo, y puede ser tu sistema central o complementar lo que utilizas. Configuramos las integraciones durante la implementación.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de plomería?",
        a: "Revisamos cómo se responden las llamadas, qué tan rápido se contestan por mensaje de texto las llamadas perdidas, cómo se da seguimiento a los presupuestos y dónde se estancan los trabajos. Luego te mostramos exactamente dónde se pierden ingresos.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos por plomería.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se están perdiendo llamadas, presupuestos y clientes recurrentes, y qué necesitas para recuperarlos.",
    acquisitionItems: ["Recepción de llamadas de emergencia y servicio", "Captación de clientes potenciales de Google y Facebook", "Respuesta por mensaje de texto a llamadas perdidas", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   ELECTRICAL
   ========================================================================== */

const electrical = make(
  {
    trade: "Servicios eléctricos",
    slug: "electrical",
    customers: "propietarios de viviendas",
    customer: "propietario de vivienda",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "electricista",
    techs: "electricistas",
    site: "vivienda",
    callWord: "llamada de servicio",
    bookLabel: "trabajos agendados",
  },
  {
    heroEyebrow: "Solución por industria — Servicios eléctricos",
    heroTitle: "Cada modernización de tablero eléctrico que cotizas",
    heroTitleSerif: "sin darle seguimiento es dinero que dejas escapar.",
    heroSub:
      "El trabajo eléctrico abarca desde visitas de servicio rápidas hasta proyectos de tableros y recableado de cinco cifras, y cuanto mayor es el trabajo, más seguimiento necesita. CAROS atiende cada llamada, agenda más visitas de servicio y da seguimiento a cada cotización hasta que el propietario toma una decisión.",
    trustRow: ["Servicio y reparación", "Modernización de tableros eléctricos", "Recableado", "Cargadores de vehículos eléctricos", "Contratos de servicio"],
    metaTitle: "CAROS para contratistas eléctricos | Atiende llamadas y da seguimiento a cotizaciones",
    metaDescription:
      "CAROS ayuda a los electricistas a responder cada llamada de servicio, agendar más visitas, dar seguimiento a cotizaciones de modernización de tableros y proyectos, y ampliar los contratos de servicio: el sistema operativo de ingresos diseñado para contratistas eléctricos.",
    keywords: [
      "gestión de clientes potenciales de servicios eléctricos",
      "CRM para electricistas",
      "clientes potenciales de modernización de tableros eléctricos",
      "seguimiento de cotizaciones eléctricas",
      "marketing para contratistas eléctricos",
      "clientes potenciales de instalación de cargadores de vehículos eléctricos",
      "contrato de servicio eléctrico",
      "agendamiento de servicios de electricistas",
      "ROI de marketing para servicios eléctricos",
      "respuesta por mensaje de texto a llamadas perdidas de servicios eléctricos",
    ],
    problemTitle: "No necesitas enviar más cotizaciones. Necesitas",
    problemTitleSerif: "cerrar más ventas con ellas.",
    problemIntro:
      "Los clientes de servicios eléctricos rara vez dicen que no: dejan de responder. Una modernización de tablero o un recableado es una compra que se evalúa con cuidado, y el propietario te compara con otros dos electricistas. Quien da seguimiento profesional, responde preguntas y se mantiene presente es quien consigue el trabajo.",
    mattersWhen: [
      { label: "Llamadas de servicio", detail: "importan cuando alguien responde y agenda el servicio, no cuando solo toma un mensaje." },
      { label: "Cotizaciones de proyectos", detail: "importan cuando se les da seguimiento hasta que el propietario toma una decisión." },
      { label: "Trabajos de normativa y seguridad", detail: "importan cuando retomas el contacto sobre las reparaciones que identificaste." },
      { label: "Contratos de servicio", detail: "importan cuando convierten un trabajo puntual en trabajo continuo." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la llamada hasta el cierre de la venta, en torno a",
      gold: "ingresos medibles y contratados.",
    },
    leaksIntro:
      "Nada de esto es una falla de los buenos electricistas. Son fallas de proceso: los vacíos donde un comprador que evalúa sus opciones elige en silencio a alguien que sí mantuvo el contacto.",
    leaks: [
      "Las llamadas de servicio llegan al buzón de voz mientras tus electricistas están trabajando.",
      "Los clientes potenciales del sitio web esperan horas antes de que alguien les dé seguimiento.",
      "Se envían cotizaciones de modernización de tableros y recableado, y nunca hay un segundo contacto.",
      "Los problemas de seguridad y cumplimiento normativo que identificaste nunca reciben seguimiento.",
      "Las consultas sobre cargadores de vehículos eléctricos y generadores se pierden sin que nadie devuelva la llamada.",
      "A los clientes de servicios puntuales nunca se les ofrece un contrato.",
      "Nunca se identifica la fuente de los trabajos por recomendación o de clientes recurrentes.",
      "Los antiguos clientes olvidan tu nombre antes de su próximo proyecto.",
    ],
    leaksClose:
      "Unas cuantas modernizaciones de tableros y trabajos de recableado sin cerrar al mes representan una pérdida de seis cifras al año, y la mayoría de las empresas de servicios eléctricos no tiene un informe que lo muestre.",
    journeyIntro:
      "Cada cliente de servicios eléctricos sigue el mismo recorrido desde la primera llamada hasta el proyecto terminado. CAROS hace que ese recorrido sea constante y visible, para que puedas ver dónde avanzan los propietarios y dónde se estancan.",
    journey: ["Llamada de servicio", "Agendamiento", "Diagnóstico en sitio", "Cotización", "Seguimiento", "Proyecto agendado", "Contrato y recomendaciones"],
    journeyEndLabel: "Proyectos agendados y trabajo recurrente",
    signatureEyebrow: "Cotizaciones de proyectos y contratos de servicio",
    signatureTitle: "Los grandes proyectos se ganan con",
    signatureTitleSerif: "el seguimiento.",
    signatureBody: [
      "Las modernizaciones de tableros, los recableados, los generadores y los cargadores de vehículos eléctricos son trabajos de alto valor con plazos de decisión largos. El propietario no está listo el día que cotizas: está evaluando el costo, el financiamiento y a dos competidores. Sin un seguimiento constante y profesional, tu cotización simplemente se olvida.",
      "CAROS mantiene activa cada cotización de proyecto: seguimiento automatizado y respetuoso hasta que el propietario decida, además de contratos de servicio y recordatorios de trabajos recurrentes que convierten un solo proyecto en una relación continua. Tus mejores cotizaciones dejan de perderse en el silencio.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos por servicios eléctricos",
    signatureUseCases: [
      "Recepción de llamadas de servicio",
      "Seguimiento de cotizaciones de proyectos",
      "Proceso de ventas de modernización de tableros",
      "Seguimiento de consultas sobre cargadores de vehículos eléctricos",
      "Seguimiento de cotizaciones de generadores",
      "Seguimiento de financiamiento",
      "Seguimiento de normativa y seguridad",
      "Inscripción en contratos de servicio",
      "Generación de reseñas",
      "Recordatorios de servicios recurrentes",
      "Reactivación de antiguos clientes",
      "Proceso de ventas de proyectos comerciales",
    ],
    metrics: [
      { value: "57", label: "Llamadas de servicio" },
      { value: "39", label: "Trabajos agendados" },
      { value: "31", label: "Cotizaciones de proyectos" },
      { value: "14", label: "Proyectos ganados" },
      { value: "$228,000", label: "Ingresos contratados" },
      { value: "6.9x", label: "ROI de marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan trabajos agendados?",
      "¿Cuántas cotizaciones de proyectos esperan seguimiento?",
      "¿Cuál es nuestra tasa de cierre en modernizaciones de tableros?",
      "¿Qué tan rápido respondemos a los nuevos clientes potenciales?",
      "¿Cuántos problemas de seguridad identificados quedaron sin seguimiento?",
      "¿A cuántos antiguos clientes debemos volver a contactar?",
      "¿Las cotizaciones de qué electricistas tienen la mejor tasa de conversión?",
      "¿Dónde perdemos ingresos entre la cotización y el proyecto agendado?",
    ],
    recoveredText:
      "Cotizaciones de proyectos que se habrían perdido en el silencio y llamadas de servicio que habrían llegado al buzón de voz: atendidas, con seguimiento y convertidas en trabajo agendado.",
    experienceTitle: "Tecnología que mantiene a tus electricistas",
    experienceTitleSerif: "manos a la obra.",
    faq: [
      {
        q: "¿CAROS es un software de presupuestos eléctricos?",
        a: "No. CAROS es un sistema de adquisición de clientes y operaciones de ingresos. Atiende llamadas, agenda visitas, da seguimiento a cotizaciones y amplía los contratos. Funciona junto con las herramientas de presupuestos que ya utilizas.",
      },
      {
        q: "¿Cómo ayuda CAROS a cerrar más modernizaciones de tableros y proyectos?",
        a: "CAROS da seguimiento automático y profesional a cada cotización de proyecto hasta que el propietario toma una decisión, manteniéndote presente durante un plazo de decisión largo en lugar de dejar que la cotización pierda vigencia.",
      },
      {
        q: "¿CAROS puede ayudar con cargadores de vehículos eléctricos y generadores?",
        a: "Sí. CAROS capta esas consultas, responde al instante y da seguimiento hasta que el cliente agenda el trabajo, para que los trabajos de alto valor y gran interés no se pierdan sin que nadie devuelva la llamada.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS atiende el exceso de llamadas y automatiza el seguimiento, para que tu equipo se concentre en cotizar y ejecutar trabajos. Te permite crecer sin ampliar demasiado pronto el personal administrativo.",
      },
      {
        q: "¿CAROS se integra con nuestros sistemas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y trabajo en campo, y puede ser tu sistema central o complementar lo que ya tienes. Nos encargamos de las integraciones durante la implementación.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de servicios eléctricos?",
        a: "Revisamos cómo se responden las llamadas, cómo se atiende a los clientes potenciales, cómo se da seguimiento a las cotizaciones y dónde se estancan los proyectos. Luego te mostramos exactamente dónde se pierden ingresos entre la cotización y el trabajo agendado.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos por servicios eléctricos.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se están perdiendo llamadas y cotizaciones de proyectos, y qué necesitas para cerrar más ventas.",
    acquisitionItems: ["Recepción de llamadas de servicio y proyectos", "Captación de clientes potenciales de Google y Facebook", "Captación de consultas sobre vehículos eléctricos y generadores", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   CLEANING
   ========================================================================== */

const cleaning = make(
  {
    trade: "Limpieza",
    slug: "cleaning",
    customers: "clientes",
    customer: "cliente",
    job: "limpieza",
    jobs: "limpiezas",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "equipo",
    techs: "equipos",
    site: "propiedad",
    callWord: "consulta",
    bookLabel: "limpiezas agendadas",
  },
  {
    heroEyebrow: "Solución por sector — Limpieza",
    heroTitle: "Las limpiezas únicas pagan una vez. Los clientes recurrentes",
    heroTitleSerif: "pagan cada semana.",
    heroSub:
      "La rentabilidad de la limpieza no está en el primer trabajo, sino en el cliente que se queda por años. CAROS capta cada consulta, agenda más limpiezas iniciales y convierte los trabajos únicos en contratos recurrentes, para que tu ruta se llene de ingresos constantes y confiables.",
    trustRow: ["Residencial", "Comercial", "Contratos recurrentes", "Limpieza de entrada / salida por mudanza", "Limpieza de instalaciones"],
    metaTitle: "CAROS para empresas de limpieza | Agenda más limpiezas y consigue más clientes recurrentes",
    metaDescription:
      "CAROS ayuda a las empresas de limpieza a responder cada consulta, agendar más limpiezas iniciales, convertir trabajos únicos en contratos recurrentes y reducir cancelaciones: el sistema operativo de ingresos creado para empresas de limpieza.",
    keywords: [
      "gestión de clientes potenciales para empresas de limpieza",
      "CRM para empresas de limpieza",
      "contratos de limpieza recurrente",
      "software para agendar servicios de limpieza del hogar",
      "clientes potenciales de limpieza comercial",
      "seguimiento de cotizaciones de limpieza",
      "marketing para empresas de limpieza",
      "retorno de inversión en marketing de limpieza",
      "embudo de ventas de limpieza de instalaciones",
      "respuesta por mensaje de texto a llamadas perdidas de limpieza",
    ],
    problemTitle: "No necesitas más consultas. Necesitas",
    problemTitleSerif: "clientes que se queden.",
    problemIntro:
      "Una empresa de limpieza depende de sus ingresos recurrentes. Una limpieza única está bien; un cliente con un plan semanal o quincenal sostiene un negocio. La mayoría de las empresas de limpieza pierden dinero no por no conseguir el primer trabajo, sino por no convertirlo en un contrato y mantenerlo en la agenda.",
    mattersWhen: [
      { label: "Las consultas", detail: "importan cuando reciben una respuesta rápida y profesional y se convierten en limpiezas agendadas." },
      { label: "Las limpiezas iniciales", detail: "importan cuando se convierten en planes recurrentes, no en servicios únicos." },
      { label: "Los clientes recurrentes", detail: "importan cuando se detectan las cancelaciones y se logra retenerlos." },
      { label: "Las propuestas comerciales", detail: "importan cuando reciben seguimiento hasta que el cliente firma." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la consulta hasta el contrato, en torno a",
      gold: "ingresos recurrentes y medibles.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de buenos profesionales de limpieza. Son fallas del proceso: los vacíos por los que un cliente listo para contratar nunca agenda o cancela sin decir nada.",
    leaks: [
      "Las consultas pasan horas sin respuesta y el cliente agenda con la empresa que sí respondió.",
      "Las solicitudes de cotización nunca reciben seguimiento.",
      "A los clientes de limpiezas iniciales nunca se les ofrece un plan recurrente.",
      "Las cancelaciones ocurren sin intentar retener al cliente o reprogramar el servicio.",
      "Se envían propuestas comerciales y nunca se les da seguimiento.",
      "A los clientes satisfechos nunca se les pide una reseña ni una recomendación.",
      "Nunca se reactiva a los clientes inactivos.",
      "Nadie mide qué anuncios o recomendaciones generan clientes recurrentes.",
    ],
    leaksClose:
      "Perder unos pocos clientes recurrentes cada mes, o no llegar a convertirlos, se acumula en una pérdida considerable de ingresos al año, porque cada uno representaba meses de limpiezas.",
    journeyIntro:
      "Cada cliente de limpieza sigue el mismo camino desde la primera consulta hasta una cita fija. CAROS hace que ese camino sea consistente y visible, para que veas quién agenda, quién se convierte en recurrente y quién se pierde.",
    journey: ["Consulta", "Cotización / Visita de evaluación", "Limpieza inicial", "Plan recurrente", "Agenda fija", "Recuperación y retención", "Reseñas y recomendaciones"],
    journeyEndLabel: "Clientes recurrentes e ingresos constantes",
    signatureEyebrow: "Contratos recurrentes y retención",
    signatureTitle: "Construye un negocio con clientes que",
    signatureTitleSerif: "nunca cancelen.",
    signatureBody: [
      "Lo más valioso que puede hacer una empresa de limpieza es convertir una limpieza inicial en una cita fija y conservarla. Cada cliente recurrente representa decenas de limpiezas, pero la mayoría se pierde por un seguimiento que no se hizo, un plan que no se ofreció o una cancelación que nadie intentó evitar.",
      "CAROS construye y protege tu base de clientes recurrentes: convierte limpiezas iniciales en contratos, detecta cancelaciones antes de que sean definitivas y vuelve a contactar a clientes inactivos, para que tu ruta sea más predecible cada mes en lugar de empezar de nuevo cada semana.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha tus ingresos de limpieza",
    signatureUseCases: [
      "Captación de consultas y respuesta rápida",
      "Seguimiento de cotizaciones y visitas de evaluación",
      "Agendamiento de limpiezas iniciales",
      "Conversión a planes recurrentes",
      "Flujos para evitar cancelaciones",
      "Recordatorios de citas fijas",
      "Seguimiento de propuestas comerciales",
      "Generación de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes inactivos",
      "Ofertas de membresías / servicios adicionales",
      "Embudo de cuentas de limpieza de instalaciones",
    ],
    metrics: [
      { value: "76", label: "Consultas" },
      { value: "48", label: "Limpiezas iniciales agendadas" },
      { value: "29", label: "Conversiones a planes recurrentes" },
      { value: "12", label: "Cancelaciones evitadas" },
      { value: "$164,000", label: "Ingresos de servicios agendados" },
      { value: "6.2x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan clientes recurrentes y no solo servicios únicos?",
      "¿Qué tan rápido respondemos a las nuevas consultas?",
      "¿Cuál es nuestra tasa de conversión de limpieza inicial a plan recurrente?",
      "¿Cuántas cancelaciones evitamos este mes?",
      "¿Cuántas propuestas comerciales están pendientes de seguimiento?",
      "¿Cuántos clientes inactivos podríamos recuperar?",
      "¿A qué clientes les corresponde un servicio adicional?",
      "¿Dónde perdemos ingresos entre la consulta y la agenda fija?",
    ],
    recoveredText:
      "Limpiezas iniciales que habrían quedado como servicios únicos y clientes que habrían cancelado sin decir nada: convertidos, retenidos y transformados en ingresos recurrentes.",
    experienceTitle: "Tecnología que mantiene a tus equipos",
    experienceTitleSerif: "limpiando, no persiguiendo clientes.",
    faq: [
      {
        q: "¿CAROS es un software para programar limpiezas?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, agenda limpiezas, convierte trabajos únicos en contratos recurrentes y evita cancelaciones. Funciona junto con tus herramientas de programación.",
      },
      {
        q: "¿Cómo aumenta CAROS los ingresos recurrentes?",
        a: "CAROS da seguimiento a las cotizaciones, ofrece planes recurrentes en el momento adecuado, detecta cancelaciones mediante flujos de retención y vuelve a contactar a clientes inactivos, para ampliar de forma constante tu base de citas fijas.",
      },
      {
        q: "¿CAROS puede gestionar tanto servicios residenciales como comerciales?",
        a: "Sí. CAROS gestiona la respuesta rápida y el agendamiento residencial, así como el seguimiento de propuestas comerciales y los embudos de cuentas, para mantener organizadas ambas áreas de tu negocio.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS se encarga de responder rápido y automatiza el seguimiento, para que tu equipo se concentre en el servicio y las ventas. Te permite crecer sin contratar personal administrativo antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestras herramientas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y pagos, y puede ser tu sistema central o complementar lo que ya usas. Configuramos las integraciones durante la puesta en marcha.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de limpieza?",
        a: "Revisamos cómo se responden las consultas, cómo se da seguimiento a las cotizaciones, cómo las limpiezas iniciales se convierten en planes recurrentes y en qué punto cancelan los clientes. Luego te mostramos exactamente dónde se pierden ingresos recurrentes.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos de limpieza.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden consultas, limpiezas iniciales y clientes recurrentes, y qué se necesitaría para conservarlos.",
    acquisitionItems: ["Captación de consultas y llamadas", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de agendamiento", "Atribución de origen"],
  },
)

/* ==========================================================================
   LANDSCAPING
   ========================================================================== */

const landscaping = make(
  {
    trade: "Paisajismo",
    slug: "landscaping",
    customers: "clientes",
    customer: "cliente",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "presupuesto",
    estimates: "presupuestos",
    tech: "equipo",
    techs: "equipos",
    site: "propiedad",
    callWord: "consulta",
    bookLabel: "trabajos agendados",
  },
  {
    heroEyebrow: "Solución por sector — Paisajismo",
    heroTitle: "La demanda de primavera llena tu buzón de voz más rápido de lo que",
    heroTitleSerif: "llena tu agenda.",
    heroSub:
      "La demanda de paisajismo se dispara en unas pocas semanas y desaparece con la misma rapidez. CAROS capta cada consulta durante la temporada alta, da seguimiento a cada presupuesto y asegura contratos de mantenimiento estacional, para que tengas toda la temporada reservada en lugar de una agenda dispersa.",
    trustRow: ["Mantenimiento", "Diseño y construcción", "Contratos estacionales", "Construcción de elementos de exterior", "Áreas verdes comerciales"],
    metaTitle: "CAROS para empresas de paisajismo | Capta clientes en primavera y asegura contratos",
    metaDescription:
      "CAROS ayuda a las empresas de paisajismo a gestionar la demanda de primavera, dar seguimiento a cada presupuesto, asegurar contratos de mantenimiento recurrente y medir el retorno de inversión en marketing: el sistema operativo de ingresos creado para paisajistas.",
    keywords: [
      "gestión de clientes potenciales de paisajismo",
      "CRM de paisajismo",
      "contratos de cuidado de césped",
      "seguimiento de presupuestos de paisajismo",
      "contratos de mantenimiento estacional",
      "marketing para empresas de paisajismo",
      "retorno de inversión en marketing de paisajismo",
      "software de agendamiento de paisajismo",
      "embudo de ventas de diseño y construcción",
      "respuesta por mensaje de texto a llamadas perdidas de paisajismo",
    ],
    problemTitle: "No necesitas más clientes potenciales en primavera. Necesitas",
    problemTitleSerif: "agendar los que ya tienes.",
    problemIntro:
      "El paisajismo es una carrera contra una temporada corta. Cuando mejora el clima, todos llaman a la vez, y los presupuestos que no alcanzas a preparar, los seguimientos que no haces y los contratos de mantenimiento que no aseguras se pierden hasta el próximo año.",
    mattersWhen: [
      { label: "Las consultas de primavera", detail: "importan cuando se responden rápido durante las pocas semanas en que llegan en masa." },
      { label: "Los presupuestos", detail: "importan cuando reciben seguimiento antes de que el cliente contrate a alguien más." },
      { label: "Los contratos de mantenimiento", detail: "importan cuando convierten un trabajo en un compromiso para toda la temporada." },
      { label: "Los clientes potenciales de diseño y construcción", detail: "importan cuando los proyectos de alto valor reciben el seguimiento que merecen." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la consulta hasta el contrato, en torno a",
      gold: "ingresos medibles durante toda la temporada.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de equipos talentosos. Son fallas del proceso: los vacíos por los que un cliente listo para contratar deja de avanzar antes de agendar el trabajo.",
    leaks: [
      "Las consultas van al buzón de voz durante la demanda de primavera mientras los equipos están trabajando en campo.",
      "Las solicitudes de presupuesto se acumulan más rápido de lo que se pueden enviar.",
      "Se envían presupuestos y nunca se les da seguimiento.",
      "Los trabajos únicos nunca se convierten en mantenimiento estacional.",
      "Se pierden clientes potenciales de diseño, construcción y elementos de exterior por falta de un segundo contacto.",
      "Nunca se renuevan para esta temporada los contratos de los clientes de la anterior.",
      "Nunca se identifica el origen de los trabajos por recomendación o de clientes que vuelven a contratar.",
      "Se envían propuestas para áreas verdes comerciales y no vuelve a haber comunicación.",
    ],
    leaksClose:
      "Unos pocos contratos de mantenimiento y trabajos de diseño y construcción perdidos cada primavera equivalen a los ingresos de toda una temporada, y la mayoría de los paisajistas nunca llega a ver esa cifra.",
    journeyIntro:
      "Cada cliente de paisajismo sigue el mismo camino desde la primera consulta hasta la renovación del contrato. CAROS hace que ese camino sea consistente y visible, para que veas quién agenda, quién firma y quién se pierde.",
    journey: ["Consulta", "Presupuesto / Visita de evaluación", "Seguimiento", "Trabajo agendado", "Contrato de mantenimiento", "Renovación estacional", "Reseñas y recomendaciones"],
    journeyEndLabel: "Contratos para toda la temporada e ingresos constantes",
    signatureEyebrow: "Contratos estacionales y mantenimiento",
    signatureTitle: "Convierte un trabajo de primavera en un",
    signatureTitleSerif: "contrato para todo el año.",
    signatureBody: [
      "La diferencia entre un paisajista que trabaja a las carreras y uno que prospera es el mantenimiento recurrente. Un contrato estacional convierte un solo proyecto en ingresos predecibles desde la limpieza de primavera hasta el otoño, pero solo si se ofrece, se le da seguimiento y se renueva cada año.",
      "CAROS asegura el lado recurrente de tu negocio: convierte trabajos únicos en contratos de mantenimiento, envía recordatorios de renovación antes de cada temporada y renueva los contratos de los clientes del año pasado antes que la competencia, para que cada primavera comience con ingresos ya asegurados.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha tus ingresos de paisajismo",
    signatureUseCases: [
      "Captación de consultas durante la demanda de primavera",
      "Seguimiento de presupuestos",
      "Conversión a contratos de mantenimiento",
      "Recordatorios de renovación estacional",
      "Seguimiento de proyectos de diseño y construcción",
      "Embudo de construcción de elementos de exterior e instalaciones",
      "Ventas adicionales de servicios de nieve y fuera de temporada",
      "Seguimiento de financiamiento",
      "Generación de reseñas",
      "Campañas de recomendaciones",
      "Renovación de contratos de clientes anteriores",
      "Embudo de áreas verdes comerciales",
    ],
    metrics: [
      { value: "83", label: "Consultas de primavera" },
      { value: "51", label: "Presupuestos enviados" },
      { value: "33", label: "Trabajos agendados" },
      { value: "26", label: "Contratos firmados" },
      { value: "$212,000", label: "Ingresos de servicios agendados" },
      { value: "6.6x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan contratos firmados?",
      "¿Qué tan rápido respondemos a las consultas de primavera?",
      "¿Cuántos presupuestos están pendientes de seguimiento?",
      "¿Cuál es nuestra tasa de conversión de presupuesto a contrato?",
      "¿Cuántos clientes de la temporada pasada no han renovado su contrato?",
      "¿Cuántas oportunidades de diseño y construcción siguen abiertas?",
      "¿Los trabajos de qué equipos generan más servicios adicionales?",
      "¿Dónde perdemos ingresos entre la consulta y el contrato?",
    ],
    recoveredText:
      "Consultas de primavera que habrían llegado al buzón de voz y trabajos únicos que no habrían pasado de ahí: captados, con seguimiento y convertidos en contratos para toda la temporada.",
    experienceTitle: "Tecnología que mantiene a tus equipos",
    experienceTitleSerif: "en el campo.",
    faq: [
      {
        q: "¿CAROS es un software de rutas o programación para paisajismo?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, da seguimiento a presupuestos, convierte trabajos en contratos de mantenimiento y gestiona renovaciones. Funciona junto con tus herramientas de rutas y programación.",
      },
      {
        q: "¿Cómo ayuda CAROS durante la demanda de primavera?",
        a: "CAROS responde a cada consulta, también por mensaje de texto, organiza las solicitudes de presupuesto y automatiza el seguimiento, para que la avalancha de demanda de primavera se convierta en trabajos agendados en lugar de un buzón de voz lleno.",
      },
      {
        q: "¿CAROS puede aumentar nuestros ingresos de mantenimiento recurrente?",
        a: "Sí. CAROS convierte trabajos únicos en contratos estacionales, envía recordatorios de renovación antes de cada temporada y renueva los contratos de clientes anteriores, para generar ingresos recurrentes y predecibles.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS gestiona la demanda y automatiza el seguimiento, para que tu equipo se concentre en preparar presupuestos y dirigir a los equipos de trabajo. Te permite crecer sin contratar personal administrativo antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestras herramientas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y pagos, y puede ser tu sistema central o complementar lo que ya usas. Nos encargamos de las integraciones durante la puesta en marcha.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de paisajismo?",
        a: "Revisamos cómo se responden las consultas, cómo se da seguimiento a los presupuestos, cómo los trabajos se convierten en contratos y en qué punto se pierden los clientes. Luego te mostramos exactamente dónde se pierden ingresos estacionales.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos de paisajismo.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden consultas de primavera, presupuestos y contratos, y qué se necesitaría para concretarlos.",
    acquisitionItems: ["Captación de consultas estacionales", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de presupuesto", "Atribución de origen"],
  },
)

/* ==========================================================================
   PAINTING
   ========================================================================== */

const painting = make(
  {
    trade: "Pintura",
    slug: "painting",
    customers: "propietarios",
    customer: "propietario",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "presupuesto",
    estimates: "presupuestos",
    tech: "equipo",
    techs: "equipos",
    site: "propiedad",
    callWord: "consulta",
    bookLabel: "trabajos agendados",
  },
  {
    heroEyebrow: "Solución por sector — Pintura",
    heroTitle: "Preparas excelentes presupuestos. Lo que no haces es",
    heroTitleSerif: "darles seguimiento.",
    heroSub:
      "La pintura es un negocio de presupuestos, y la mayoría de los pintores pierde más ingresos por cotizaciones sin seguimiento que por cualquier otra causa. CAROS capta cada consulta, agenda más visitas de presupuesto y da seguimiento a cada cotización hasta que el propietario elige un color y una fecha.",
    trustRow: ["Interior", "Exterior", "Residencial", "Comercial", "Gabinetes y trabajos especializados"],
    metaTitle: "CAROS para empresas de pintura | Agenda más presupuestos y cierra más cotizaciones",
    metaDescription:
      "CAROS ayuda a los contratistas de pintura a responder cada consulta, agendar más visitas de presupuesto, dar seguimiento a cada cotización e identificar qué fuentes generan trabajos agendados: el sistema operativo de ingresos creado para pintores.",
    keywords: [
      "gestión de clientes potenciales de pintura",
      "CRM para contratistas de pintura",
      "seguimiento de presupuestos de pintura",
      "software de cotizaciones de pintura",
      "marketing para pintores",
      "retorno de inversión en marketing de pintura",
      "software de agendamiento de pintura",
      "embudo de ventas de pintura",
      "clientes potenciales de pintura comercial",
      "respuesta por mensaje de texto a llamadas perdidas de pintura",
    ],
    problemTitle: "No necesitas enviar más presupuestos. Necesitas",
    problemTitleSerif: "cerrar más de los que envías.",
    problemIntro:
      "Los clientes de pintura piden tres cotizaciones y se toman su tiempo. El pintor que gana no siempre es el más barato: es quien responde rápido, se presenta con profesionalismo y da seguimiento hasta que el propietario está listo. La mayoría de los pintores hace las dos primeras cosas y se olvida por completo de la tercera.",
    mattersWhen: [
      { label: "Las consultas", detail: "importan cuando reciben una respuesta rápida y se convierten en visitas de presupuesto agendadas." },
      { label: "Los presupuestos", detail: "importan cuando reciben seguimiento hasta que el propietario decide." },
      { label: "Las preguntas sobre colores y alcance", detail: "importan cuando alguien las responde antes de que el cliente busque otra opción." },
      { label: "Los trabajos recurrentes y por recomendación", detail: "importan cuando de verdad vuelves a contactar a tus clientes anteriores." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la consulta hasta el trabajo agendado, en torno a",
      gold: "ingresos medibles de trabajos agendados.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de pintores capacitados. Son fallas del proceso: los vacíos por los que un propietario que compara opciones termina eligiendo, sin avisar, a quien le dio seguimiento.",
    leaks: [
      "Las consultas quedan sin respuesta mientras los equipos están trabajando, y el propietario agenda con quien devolvió la llamada primero.",
      "Las solicitudes de presupuesto nunca se agendan.",
      "Se envían cotizaciones y nunca se les da seguimiento.",
      "Los propietarios dejan de responder y nadie vuelve a contactarlos.",
      "A los clientes de pintura interior nunca se les ofrecen trabajos de exterior, ni viceversa.",
      "A los clientes satisfechos nunca se les pide una reseña ni una recomendación.",
      "Nunca se contacta a los clientes anteriores para su próximo proyecto.",
      "Nadie mide qué anuncios generan trabajos agendados.",
    ],
    leaksClose:
      "Unos pocos trabajos de repintado exterior que no se cierran cada mes suman, en un año, los ingresos de toda una temporada de pintura, y la mayoría de las empresas no tiene un informe que lo muestre.",
    journeyIntro:
      "Cada cliente de pintura sigue el mismo camino desde la primera consulta hasta las paredes terminadas. CAROS hace que ese camino sea consistente y visible, para que veas quién agenda, quién contrata y quién se pierde.",
    journey: ["Consulta", "Visita de presupuesto agendada", "Cotización enviada", "Seguimiento", "Trabajo agendado", "Trabajo terminado", "Reseñas y recomendaciones"],
    journeyEndLabel: "Trabajos agendados e ingresos constantes",
    signatureEyebrow: "Seguimiento de presupuestos y embudo de proyectos",
    signatureTitle: "Tus mejores cotizaciones se están perdiendo",
    signatureTitleSerif: "en silencio.",
    signatureBody: [
      "La mayor fuga de ingresos de una empresa de pintura es el presupuesto que nunca recibe un segundo contacto. Los propietarios comparan cotizaciones y esperan sentirse seguros; el pintor que da seguimiento, responde preguntas y se mantiene presente es quien termina con la brocha en la mano.",
      "CAROS mantiene activa cada cotización con un seguimiento automatizado y profesional hasta que el propietario decide. Después mantiene la relación con contactos para futuros proyectos y recomendaciones, para que tu embudo siga lleno y tus mejores presupuestos dejen de enfriarse.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha tus ingresos de pintura",
    signatureUseCases: [
      "Captación de consultas y respuesta rápida",
      "Agendamiento de visitas de presupuesto",
      "Seguimiento de cotizaciones",
      "Atención de preguntas sobre colores / alcance",
      "Venta adicional de pintura exterior a clientes de interior",
      "Seguimiento de financiamiento",
      "Generación de reseñas",
      "Campañas de recomendaciones",
      "Recordatorios de nuevos proyectos",
      "Reactivación de clientes anteriores",
      "Embudo de gabinetes y trabajos especializados",
      "Embudo de proyectos comerciales",
    ],
    metrics: [
      { value: "72", label: "Consultas" },
      { value: "47", label: "Visitas de presupuesto agendadas" },
      { value: "41", label: "Cotizaciones enviadas" },
      { value: "19", label: "Trabajos ganados" },
      { value: "$158,000", label: "Ingresos de servicios agendados" },
      { value: "6.4x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan trabajos agendados?",
      "¿Qué tan rápido respondemos a las nuevas consultas?",
      "¿Cuántas cotizaciones están pendientes de seguimiento?",
      "¿Cuál es nuestra tasa de cierre de presupuesto a trabajo agendado?",
      "¿A cuántos clientes anteriores ya les corresponde volver a pintar?",
      "¿Cuántas cotizaciones se enfriaron sin un segundo contacto?",
      "¿Los trabajos de qué equipos generan más recomendaciones?",
      "¿Dónde perdemos ingresos entre la cotización y el trabajo agendado?",
    ],
    recoveredText:
      "Cotizaciones que se habrían perdido en silencio y consultas que habrían llegado al buzón de voz: captadas, con seguimiento y convertidas en trabajos agendados.",
    experienceTitle: "Tecnología que mantiene a tus equipos",
    experienceTitleSerif: "en la escalera.",
    faq: [
      {
        q: "¿CAROS es un software de presupuestos de pintura?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, agenda visitas de presupuesto, da seguimiento a cotizaciones e impulsa nuevos trabajos con los mismos clientes. Funciona junto con las herramientas de presupuestos que ya usas.",
      },
      {
        q: "¿Cómo me ayuda CAROS a cerrar más presupuestos?",
        a: "CAROS da seguimiento a cada cotización de forma automática y profesional hasta que el propietario decide, para mantenerte presente mientras compara opciones en lugar de dejar que la cotización se enfríe.",
      },
      {
        q: "¿CAROS puede ayudar tanto con trabajos de interior como de exterior?",
        a: "Sí. CAROS capta oportunidades y da seguimiento a ambos tipos, e impulsa la venta de trabajos de exterior a clientes de interior y nuevos proyectos, para que cada cliente genere más valor con el tiempo.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS se encarga de responder rápido y automatiza el seguimiento, para que tu equipo se concentre en preparar presupuestos y pintar. Te permite crecer sin contratar personal administrativo antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestras herramientas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y pagos, y puede ser tu sistema central o complementar lo que ya usas. Configuramos las integraciones durante la puesta en marcha.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de pintura?",
        a: "Revisamos cómo se responden las consultas, cómo se agendan las visitas de presupuesto, cómo se da seguimiento a las cotizaciones y en qué punto se estancan los trabajos. Luego te mostramos exactamente dónde se pierden ingresos entre la cotización y el trabajo agendado.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos de pintura.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden consultas y presupuestos, y qué se necesitaría para cerrar más.",
    acquisitionItems: ["Captación de consultas y llamadas", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de presupuesto", "Atribución de origen"],
  },
)

/* ==========================================================================
   PEST CONTROL
   ========================================================================== */

const pestControl = make(
  {
    trade: "Control de plagas",
    slug: "pest-control",
    customers: "clientes",
    customer: "cliente",
    job: "servicio",
    jobs: "servicios",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "técnico",
    techs: "técnicos",
    site: "propiedad",
    callWord: "llamada de servicio",
    bookLabel: "servicios agendados",
  },
  {
    heroEyebrow: "Solución por sector — Control de plagas",
    heroTitle: "Los tratamientos únicos terminan. Las rutas recurrentes",
    heroTitleSerif: "generan ingresos todo el año.",
    heroSub:
      "El control de plagas es un negocio de ingresos recurrentes que comienza con una llamada de servicio. CAROS capta cada llamada, agenda más tratamientos iniciales y convierte trabajos únicos en planes trimestrales y mensuales, para que tus rutas se mantengan llenas y tus ingresos se repitan.",
    trustRow: ["Residencial", "Comercial", "Planes recurrentes", "Termitas y organismos que dañan la madera", "Fauna silvestre"],
    metaTitle: "CAROS para control de plagas | Agenda servicios y amplía tus rutas recurrentes",
    metaDescription:
      "CAROS ayuda a las empresas de control de plagas a responder cada llamada, agendar más tratamientos iniciales, convertir trabajos únicos en planes recurrentes y reducir cancelaciones: el sistema operativo de ingresos creado para el control de plagas.",
    keywords: [
      "gestión de clientes potenciales de control de plagas",
      "CRM de control de plagas",
      "planes recurrentes de control de plagas",
      "software de agendamiento de control de plagas",
      "seguimiento de cotizaciones de control de plagas",
      "marketing de control de plagas",
      "retorno de inversión en marketing de control de plagas",
      "seguimiento de clientes potenciales de control de termitas",
      "ingresos de rutas de control de plagas",
      "respuesta por mensaje de texto a llamadas perdidas de control de plagas",
    ],
    problemTitle: "No necesitas más llamadas. Necesitas",
    problemTitleSerif: "clientes con un plan.",
    problemIntro:
      "La economía del control de plagas es sencilla: un tratamiento único paga una vez; un plan recurrente paga por años. Los ingresos que pierdes no están en la primera llamada, sino en los planes que nunca ofreces, los seguimientos que no haces y los clientes que se van sin decir nada.",
    mattersWhen: [
      { label: "Las llamadas de servicio", detail: "importan cuando se responden y generan citas, no cuando van al buzón de voz." },
      { label: "Los tratamientos iniciales", detail: "importan cuando se convierten en planes recurrentes." },
      { label: "Las rutas recurrentes", detail: "importan cuando se detectan las cancelaciones y se logra retener a los clientes." },
      { label: "Las cotizaciones de termitas y organismos que dañan la madera", detail: "importan cuando los trabajos de alto valor reciben seguimiento." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la llamada hasta el plan, en torno a",
      gold: "ingresos recurrentes y medibles.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de buenos técnicos. Son fallas del proceso: los vacíos por los que los ingresos recurrentes desaparecen de la ruta sin que lo notes.",
    leaks: [
      "Las llamadas de servicio van al buzón de voz mientras los técnicos están en ruta.",
      "Los clientes potenciales de la web pasan horas sin recibir respuesta.",
      "A los clientes de tratamientos iniciales nunca se les ofrece un plan recurrente.",
      "Los clientes con plan cancelan sin que nadie intente retenerlos.",
      "Se envían cotizaciones de termitas y organismos que dañan la madera y no vuelve a haber comunicación.",
      "Nunca se vuelve a contactar a los clientes de servicios únicos.",
      "Nunca se solicitan reseñas ni recomendaciones.",
      "Nadie mide qué anuncios generan clientes recurrentes.",
    ],
    leaksClose:
      "Perder unos pocos planes recurrentes cada mes, o no llegar a convertirlos, se acumula rápidamente, porque cada uno representaba años de servicios programados.",
    journeyIntro:
      "Cada cliente de control de plagas sigue el mismo camino desde la primera llamada hasta una ruta fija. CAROS hace que ese camino sea consistente y visible, para que veas quién agenda, quién contrata un plan y quién deja de ser cliente.",
    journey: ["Llamada de servicio", "Agendamiento", "Tratamiento inicial", "Plan recurrente", "Programación de ruta", "Recuperación y retención", "Reseñas y recomendaciones"],
    journeyEndLabel: "Rutas recurrentes e ingresos constantes",
    signatureEyebrow: "Rutas recurrentes y planes de servicio",
    signatureTitle: "Cada tratamiento debería convertirse en una",
    signatureTitleSerif: "ruta fija.",
    signatureBody: [
      "Las empresas de control de plagas más sólidas no son las que reciben más llamadas, sino las que tienen las rutas más llenas. Un plan recurrente convierte un solo tratamiento en ingresos trimestrales o mensuales, pero solo si se ofrece siempre, se renueva a tiempo y se protege de las cancelaciones.",
      "CAROS construye y protege tu base recurrente: convierte tratamientos iniciales en planes, mantiene las rutas al día con recordatorios, detecta cancelaciones antes de que sean definitivas y reactiva a clientes inactivos, para que los ingresos de tus rutas se acumulen temporada tras temporada.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha tus ingresos de control de plagas",
    signatureUseCases: [
      "Captación de llamadas de servicio",
      "Agendamiento de tratamientos iniciales",
      "Conversión a planes recurrentes",
      "Recordatorios de ruta",
      "Flujos para evitar cancelaciones",
      "Seguimiento de cotizaciones de termitas / organismos que dañan la madera",
      "Seguimiento de fauna silvestre y servicios especializados",
      "Generación de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes inactivos",
      "Ofertas de servicios adicionales",
      "Embudo de cuentas comerciales",
    ],
    metrics: [
      { value: "97", label: "Llamadas de servicio" },
      { value: "64", label: "Servicios agendados" },
      { value: "38", label: "Conversiones a planes" },
      { value: "13", label: "Cancelaciones evitadas" },
      { value: "$178,000", label: "Ingresos de servicios agendados" },
      { value: "6.7x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan clientes recurrentes?",
      "¿Qué tan rápido respondemos a las nuevas llamadas?",
      "¿Cuál es nuestra tasa de conversión de tratamiento inicial a plan?",
      "¿Cuántas cancelaciones evitamos este mes?",
      "¿Cuántas cotizaciones de termitas y organismos que dañan la madera siguen abiertas?",
      "¿Cuántos clientes inactivos podríamos reactivar?",
      "¿Qué rutas tienen espacio para más visitas?",
      "¿Dónde perdemos ingresos entre la llamada y la ruta fija?",
    ],
    recoveredText:
      "Tratamientos iniciales que habrían quedado como servicios únicos y clientes con plan que se habrían ido: convertidos, retenidos y transformados en ingresos de rutas recurrentes.",
    experienceTitle: "Tecnología que mantiene a tus técnicos",
    experienceTitleSerif: "en la ruta.",
    faq: [
      {
        q: "¿CAROS es un software de rutas para control de plagas?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta llamadas, agenda tratamientos, convierte trabajos en planes recurrentes y evita cancelaciones. Funciona junto con tus herramientas de rutas y trabajo en campo.",
      },
      {
        q: "¿Cómo aumenta CAROS los ingresos de las rutas recurrentes?",
        a: "CAROS ofrece planes en el momento adecuado, da seguimiento a cotizaciones, mantiene las rutas al día con recordatorios, detecta cancelaciones y reactiva a clientes inactivos, para ampliar de forma constante tu base recurrente.",
      },
      {
        q: "¿CAROS puede ayudar con trabajos de termitas y servicios especializados?",
        a: "Sí. CAROS capta y da seguimiento a cotizaciones de mayor valor para termitas, organismos que dañan la madera y fauna silvestre, para que esos trabajos no se pierdan por falta de un segundo contacto.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS atiende las llamadas que tu equipo no alcanza a responder y automatiza el seguimiento, para que tu equipo se concentre en agendar y prestar servicios. Te permite crecer sin contratar personal administrativo antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestros sistemas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y pagos, y puede ser tu sistema central o complementar lo que ya usas. Nos encargamos de las integraciones durante la puesta en marcha.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de control de plagas?",
        a: "Revisamos cómo se responden las llamadas, cómo los tratamientos iniciales se convierten en planes, cómo se da seguimiento a las cotizaciones y en qué punto se pierden los clientes. Luego te mostramos exactamente dónde se pierden ingresos recurrentes.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos de control de plagas.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden llamadas, tratamientos iniciales y planes recurrentes, y qué se necesitaría para conservarlos en la ruta.",
    acquisitionItems: ["Captación de llamadas de servicio", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de agendamiento", "Atribución de origen"],
  },
)

/* ==========================================================================
   PRESSURE WASHING
   ========================================================================== */

const pressureWashing = make(
  {
    trade: "Lavado a presión",
    slug: "pressure-washing",
    customers: "clientes",
    customer: "cliente",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "equipo",
    techs: "equipos",
    site: "propiedad",
    callWord: "consulta",
    bookLabel: "trabajos agendados",
  },
  {
    heroEyebrow: "Solución por sector — Lavado a presión",
    heroTitle: "Las cotizaciones rápidas ganan el trabajo. El seguimiento gana al",
    heroTitleSerif: "cliente por años.",
    heroSub:
      "El lavado a presión se cotiza rápido y se repite fácilmente, si tienes un sistema. CAROS capta cada consulta, envía cotizaciones rápidas, da seguimiento hasta que el cliente agenda y convierte lavados únicos en mantenimiento recurrente para que tu temporada se mantenga llena.",
    trustRow: ["Residencial", "Comercial", "Flotas y concreto", "Techos y lavado de baja presión", "Mantenimiento recurrente"],
    metaTitle: "CAROS para lavado a presión | Cotiza rápido, da seguimiento y consigue nuevas contrataciones",
    metaDescription:
      "CAROS ayuda a las empresas de lavado a presión a responder cada consulta, enviar cotizaciones rápidas, dar seguimiento hasta que el cliente agenda y convertir lavados únicos en mantenimiento recurrente: el sistema operativo de ingresos creado para el lavado a presión.",
    keywords: [
      "gestión de clientes potenciales de lavado a presión",
      "CRM de lavado a presión",
      "seguimiento de cotizaciones de lavado a presión",
      "software de agendamiento de lavado a presión",
      "clientes potenciales de lavado de baja presión",
      "marketing de lavado a presión",
      "retorno de inversión en marketing de lavado a presión",
      "lavado a presión recurrente",
      "clientes potenciales de lavado a presión comercial",
      "respuesta por mensaje de texto a llamadas perdidas de lavado a presión",
    ],
    problemTitle: "No necesitas más consultas. Necesitas",
    problemTitleSerif: "cotizar rápido y dar seguimiento.",
    problemIntro:
      "Los clientes de lavado a presión quieren un precio rápido y agendan con quien se los da primero. Los ingresos que pierdes están en las cotizaciones lentas, los presupuestos sin seguimiento y los clientes de una sola vez que volverían a contratar con gusto cada año si alguien se lo recordara.",
    mattersWhen: [
      { label: "Las consultas", detail: "importan cuando reciben una cotización rápida antes de que el cliente llame a alguien más." },
      { label: "Las cotizaciones", detail: "importan cuando reciben seguimiento hasta que el cliente agenda." },
      { label: "Los lavados únicos", detail: "importan cuando se convierten en mantenimiento recurrente." },
      { label: "Las cuentas comerciales", detail: "importan cuando las propuestas reciben el seguimiento que merecen." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la consulta hasta la siguiente contratación, en torno a",
      gold: "ingresos constantes y medibles.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de buenos equipos. Son fallas del proceso: los vacíos por los que un cliente listo para contratar agenda con quien cotizó más rápido y dio seguimiento.",
    leaks: [
      "Las consultas pasan horas esperando una cotización, y el cliente ya contrató a alguien más.",
      "Las cotizaciones se envían una vez y nunca reciben seguimiento.",
      "Las llamadas perdidas nunca se devuelven ni se responden por mensaje de texto.",
      "A los clientes de lavados únicos nunca se les ofrece un plan de mantenimiento.",
      "A los clientes del año pasado nunca se les recuerda que vuelvan a agendar.",
      "Las propuestas comerciales y de flotas quedan en silencio sin un segundo contacto.",
      "Nunca se solicitan reseñas ni recomendaciones.",
      "Nadie mide qué anuncios generan trabajos agendados.",
    ],
    leaksClose:
      "Una temporada de cotizaciones lentas y clientes que no vuelven a agendar deja una gran brecha invisible de ingresos, porque cada cliente que regresaba representaba años de lavados.",
    journeyIntro:
      "Cada cliente de lavado a presión sigue el mismo camino desde la primera consulta hasta volver a agendar un lavado. CAROS hace que ese camino sea consistente y visible, para que veas quién agenda, quién vuelve y quién se pierde.",
    journey: ["Consulta", "Cotización rápida", "Seguimiento", "Trabajo agendado", "Lavado terminado", "Mantenimiento recurrente", "Reseñas y recomendaciones"],
    journeyEndLabel: "Clientes que vuelven e ingresos recurrentes",
    signatureEyebrow: "Demanda estacional y mantenimiento recurrente",
    signatureTitle: "Convierte un lavado único en una",
    signatureTitleSerif: "cita anual.",
    signatureBody: [
      "La mayoría de los ingresos de lavado a presión se pierde después de un solo trabajo, no porque los clientes estén insatisfechos, sino porque nadie ofreció un plan de mantenimiento ni les recordó volver a agendar la próxima temporada. El trabajo se repite de forma natural; el seguimiento, por lo general, no.",
      "CAROS crea el motor de las nuevas contrataciones: convierte lavados únicos en mantenimiento anual o estacional, recuerda a clientes anteriores que vuelvan a agendar antes de que regrese la suciedad y da seguimiento a propuestas comerciales, para que tu calendario se llene solo en lugar de empezar desde cero cada temporada.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha tus ingresos de lavado a presión",
    signatureUseCases: [
      "Captación de consultas y cotizaciones rápidas",
      "Seguimiento de cotizaciones",
      "Respuesta por mensaje de texto a llamadas perdidas",
      "Conversión a mantenimiento recurrente",
      "Recordatorios para volver a agendar cada temporada",
      "Seguimiento de lavado de baja presión y techos",
      "Seguimiento de propuestas comerciales y de flotas",
      "Ofertas de financiamiento / paquetes",
      "Generación de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes anteriores",
      "Embudo de servicios comerciales recurrentes",
    ],
    metrics: [
      { value: "68", label: "Consultas" },
      { value: "52", label: "Cotizaciones enviadas" },
      { value: "34", label: "Trabajos agendados" },
      { value: "18", label: "Con plan de mantenimiento" },
      { value: "$121,000", label: "Ingresos de servicios agendados" },
      { value: "6.3x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan trabajos agendados?",
      "¿Qué tan rápido enviamos las cotizaciones?",
      "¿Cuántas cotizaciones están pendientes de seguimiento?",
      "¿Cuántos clientes de servicios únicos tienen un plan de mantenimiento?",
      "¿A cuántos clientes anteriores les corresponde volver a agendar?",
      "¿Cuántas propuestas comerciales siguen abiertas?",
      "¿Cuál es nuestra tasa de conversión de cotización a trabajo agendado?",
      "¿Dónde perdemos ingresos entre la consulta y la siguiente contratación?",
    ],
    recoveredText:
      "Consultas que se habrían perdido ante una cotización más rápida y clientes que nunca habrían vuelto a agendar: captados, con seguimiento y convertidos en ingresos recurrentes.",
    experienceTitle: "Tecnología que mantiene a tus equipos",
    experienceTitleSerif: "con la lanza en la mano.",
    faq: [
      {
        q: "¿CAROS es un software de programación para lavado a presión?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, envía cotizaciones y les da seguimiento, agenda trabajos e impulsa nuevas contrataciones. Funciona junto con tus herramientas de programación.",
      },
      {
        q: "¿Cómo me ayuda CAROS a cotizar más rápido?",
        a: "CAROS responde a cada consulta al instante y mantiene las cotizaciones en marcha con seguimiento automatizado, para que ganes a los clientes que agendan con quien responde primero.",
      },
      {
        q: "¿CAROS puede generar ingresos recurrentes para una empresa de lavado a presión?",
        a: "Sí. CAROS convierte lavados únicos en planes de mantenimiento y recuerda a clientes anteriores que vuelvan a agendar cada temporada, para transformar un servicio de una sola vez en ingresos constantes.",
      },
      {
        q: "¿Esto reemplazará a mi personal administrativo?",
        a: "No. CAROS se encarga de responder rápido y automatiza el seguimiento, para que tu equipo se concentre en cotizar y lavar. Te permite crecer sin contratar personal administrativo antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestras herramientas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitios web y pagos, y puede ser tu sistema central o complementar lo que ya usas. Configuramos las integraciones durante la puesta en marcha.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de lavado a presión?",
        a: "Revisamos cómo se responden las consultas, qué tan rápido se envían las cotizaciones, cómo se les da seguimiento y cómo los clientes vuelven a agendar. Luego te mostramos exactamente dónde se pierden ingresos.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos de lavado a presión.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden consultas, cotizaciones y clientes que podrían volver, y qué se necesitaría para que sigan agendando.",
    acquisitionItems: ["Captación de consultas y llamadas", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de cotización", "Atribución de origen"],
  },
)

/* ==========================================================================
   HANDYMAN
   ========================================================================== */

const handyman = make(
  {
    trade: "Reparaciones y mantenimiento del hogar",
    slug: "handyman",
    customers: "propietarios",
    customer: "propietario",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "técnico",
    techs: "técnicos",
    site: "hogar",
    callWord: "llamada de servicio",
    bookLabel: "trabajos agendados",
  },
  {
    heroEyebrow: "Solución por sector — Reparaciones y mantenimiento del hogar",
    heroTitle: "Los trabajos pequeños se acumulan rápido cuando logras",
    heroTitleSerif: "agendarlos todos.",
    heroSub:
      "Las reparaciones y el mantenimiento del hogar generan un flujo constante de trabajos pequeños de clientes recurrentes, pero solo si respondes, cotizas y das seguimiento a cada uno. CAROS capta cada llamada, agenda más trabajos y hace que los clientes vuelvan para resolver el siguiente pendiente de su lista.",
    trustRow: ["Reparaciones", "Instalaciones", "Listas de pendientes", "Administradores de propiedades", "Clientes recurrentes"],
    metaTitle: "CAROS para negocios de reparaciones del hogar | Agenda más trabajos y fideliza clientes",
    metaDescription:
      "CAROS ayuda a los negocios de reparaciones del hogar a responder cada llamada, agendar más trabajos pequeños, dar seguimiento a cotizaciones y convertir clientes ocasionales en recurrentes: el sistema operativo de ingresos diseñado para servicios de reparaciones y mantenimiento del hogar.",
    keywords: [
      "gestión de clientes potenciales para reparaciones del hogar",
      "crm para reparaciones del hogar",
      "software para agendar reparaciones del hogar",
      "seguimiento de cotizaciones de reparaciones del hogar",
      "marketing para negocios de reparaciones del hogar",
      "retorno de inversión en marketing para reparaciones del hogar",
      "clientes potenciales de administradores de propiedades para reparaciones del hogar",
      "clientes recurrentes de reparaciones del hogar",
      "programación de reparaciones del hogar",
      "respuesta por mensaje a llamadas perdidas de reparaciones del hogar",
    ],
    problemTitle: "No necesitas trabajos más grandes. Necesitas",
    problemTitleSerif: "captar cada trabajo pequeño.",
    problemIntro:
      "Los ingresos de un negocio de reparaciones del hogar dependen del volumen: muchos trabajos pequeños, varios de los mismos clientes, que casi siempre se deciden por quién contesta y se presenta. El dinero que pierdes está en las llamadas sin responder, las cotizaciones sin seguimiento y los clientes que se olvidaron de ti antes de su siguiente lista de pendientes del hogar.",
    mattersWhen: [
      { label: "Las llamadas de servicio", detail: "importan cuando alguien las responde y agenda el trabajo en lugar de tomar un mensaje." },
      { label: "Las cotizaciones", detail: "importan cuando reciben seguimiento hasta que el propietario agenda el trabajo." },
      { label: "Los clientes recurrentes", detail: "importan cuando siempre te llaman primero para el siguiente trabajo." },
      { label: "Los administradores de propiedades", detail: "importan cuando las cuentas habituales reciben un servicio constante y confiable." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la llamada hasta el cliente recurrente, en torno a",
      gold: "ingresos constantes y medibles.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de habilidad de un buen técnico. Son fallas del proceso: los vacíos por los que un trabajo pequeño y sencillo nunca llega a agendarse.",
    leaks: [
      "Las llamadas llegan al buzón de voz mientras estás trabajando, y el propietario llama al siguiente técnico.",
      "Las cotizaciones y las llamadas por devolver se pierden en un teléfono lleno de mensajes.",
      "Se envían presupuestos que nunca reciben seguimiento.",
      "Los clientes ocasionales nunca vuelven a saber de ti.",
      "Los clientes recurrentes no recuerdan tu número cuando te necesitan.",
      "Las cuentas de administradores de propiedades se alejan porque las respuestas se volvieron lentas.",
      "Nunca se piden reseñas ni recomendaciones.",
      "Nadie registra qué fuentes realmente generan trabajos agendados.",
    ],
    leaksClose:
      "Unos cuantos trabajos perdidos por semana son miles de dólares al mes que se escapan, y nunca aparecen en ningún informe.",
    journeyIntro:
      "Cada cliente de reparaciones del hogar recorre el mismo camino, desde la primera llamada hasta el siguiente trabajo de su lista. CAROS hace que ese recorrido sea uniforme y visible para que puedas ver quién agenda, quién vuelve y quién se pierde.",
    journey: ["Llamada de servicio", "Respuesta por mensaje / Agendamiento", "Cotización", "Trabajo agendado", "Trabajo terminado", "Nuevo trabajo del mismo cliente", "Reseñas y recomendaciones"],
    journeyEndLabel: "Clientes recurrentes e ingresos constantes",
    signatureEyebrow: "Trabajos pequeños, clientes recurrentes",
    signatureTitle: "El verdadero ingreso está en el cliente que",
    signatureTitleSerif: "sigue llamando.",
    signatureBody: [
      "Un solo trabajo de reparación del hogar es pequeño. Un cliente que te llama durante años para cada reparación, instalación y pendiente es un negocio. La mayoría de los técnicos nunca construyen esa base de clientes recurrentes, no porque los clientes estén insatisfechos, sino porque nadie mantuvo sus datos organizados ni siguió en contacto.",
      "CAROS te convierte en el técnico al que siempre llaman: capta cada llamada y responde por mensaje, da seguimiento a las cotizaciones y recuerda a los clientes anteriores que estás a un mensaje de distancia. Así, un flujo constante de trabajos pequeños se convierte en ingresos confiables y recurrentes.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos de reparaciones del hogar",
    signatureUseCases: [
      "Captación de llamadas de servicio",
      "Respuesta por mensaje a llamadas perdidas",
      "Seguimiento de cotizaciones",
      "Agendamiento y programación de trabajos",
      "Recordatorios para clientes recurrentes",
      "Cuentas de administradores de propiedades",
      "Seguimiento de listas de pendientes",
      "Ofertas de financiamiento / paquetes",
      "Obtención de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes anteriores",
      "Ofertas de mantenimiento recurrente",
    ],
    metrics: [
      { value: "91", label: "Llamadas de servicio" },
      { value: "67", label: "Trabajos agendados" },
      { value: "23", label: "Cotizaciones enviadas" },
      { value: "44", label: "Clientes recurrentes" },
      { value: "$96,000", label: "Ingresos de trabajos agendados" },
      { value: "6.1x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué fuentes generan trabajos agendados?",
      "¿Cuántas llamadas llegaron al buzón de voz esta semana?",
      "¿Qué tan rápido respondemos por mensaje a las llamadas perdidas?",
      "¿Cuántas cotizaciones están pendientes de seguimiento?",
      "¿Cuántos clientes son recurrentes y cuántos ocasionales?",
      "¿Cuántos clientes anteriores no han llamado en seis meses?",
      "¿Qué cuentas de administradores de propiedades estamos perdiendo?",
      "¿Dónde perdemos ingresos entre la llamada y el trabajo agendado?",
    ],
    recoveredText:
      "Llamadas que habrían llegado al buzón de voz y clientes que habrían olvidado tu número: captados, con seguimiento y convertidos en trabajos recurrentes.",
    experienceTitle: "Tecnología que te permite seguir",
    experienceTitleSerif: "trabajando con tus herramientas.",
    faq: [
      {
        q: "¿CAROS es un software para programar reparaciones del hogar?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta llamadas, responde por mensaje a las llamadas perdidas, da seguimiento a las cotizaciones e impulsa la recurrencia de los clientes. Funciona junto con tus herramientas de programación.",
      },
      {
        q: "¿Cómo ayuda CAROS a un pequeño negocio de reparaciones del hogar?",
        a: "CAROS atiende cada llamada y responde por mensaje, mantiene el avance de las cotizaciones y recuerda a los clientes anteriores que estás a un mensaje de distancia, para que se agenden más trabajos pequeños y más clientes sigan volviendo.",
      },
      {
        q: "¿CAROS puede gestionar cuentas de administradores de propiedades?",
        a: "Sí. CAROS mantiene organizadas las cuentas habituales con respuestas rápidas y constantes y un estado claro de cada trabajo, para que no pierdas trabajos recurrentes y confiables por fallas de seguimiento.",
      },
      {
        q: "¿Esto sustituye la contratación de personal de apoyo?",
        a: "No. CAROS se ocupa de las llamadas y el seguimiento que no puedes atender mientras trabajas, para que puedas aceptar más trabajos antes de necesitar contratar y sepas cuándo finalmente es el momento de hacerlo.",
      },
      {
        q: "¿CAROS se integra con mi teléfono y calendario?",
        a: "Sí. CAROS se conecta con herramientas habituales de telefonía, calendario, sitio web y pagos, y puede ser tu sistema central o complementar lo que usas. Nos encargamos de la configuración por ti.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para un negocio de reparaciones del hogar?",
        a: "Revisamos cómo se atienden las llamadas, cómo se responde por mensaje a las llamadas perdidas, cómo se da seguimiento a las cotizaciones y cómo vuelven los clientes. Luego te mostramos exactamente dónde se están perdiendo ingresos.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden los ingresos de tu negocio de reparaciones del hogar.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden llamadas, cotizaciones y clientes recurrentes, y qué se necesita para recuperarlos.",
    acquisitionItems: ["Captación de llamadas de servicio", "Captación de clientes potenciales de Google y Facebook", "Respuesta por mensaje a llamadas perdidas", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   FLOORING
   ========================================================================== */

const flooring = make(
  {
    trade: "Instalación de pisos",
    slug: "flooring",
    customers: "clientes",
    customer: "cliente",
    job: "proyecto",
    jobs: "proyectos",
    estimate: "presupuesto",
    estimates: "presupuestos",
    tech: "cuadrilla",
    techs: "cuadrillas",
    site: "hogar",
    callWord: "consulta",
    bookLabel: "proyectos agendados",
  },
  {
    heroEyebrow: "Solución por sector — Instalación de pisos",
    heroTitle: "Entre la sala de exhibición y la instalación es",
    heroTitleSerif: "donde se pierde la venta.",
    heroSub:
      "La compra de pisos requiere tiempo para decidir: muestras, mediciones, cotizaciones y comparaciones. CAROS capta cada consulta, agenda más visitas para presupuestos a domicilio y da seguimiento durante la selección de materiales hasta que el proyecto queda programado.",
    trustRow: ["Madera y tablones vinílicos de lujo (LVP)", "Baldosas", "Alfombras", "Presupuestos a domicilio", "Comercial"],
    metaTitle: "CAROS para empresas de pisos | Agenda presupuestos y cierra más proyectos",
    metaDescription:
      "CAROS ayuda a los negocios de pisos a responder cada consulta, agendar más presupuestos a domicilio, dar seguimiento durante la selección de materiales y medir el retorno de inversión en marketing: el sistema operativo de ingresos diseñado para empresas de pisos.",
    keywords: [
      "gestión de clientes potenciales para pisos",
      "crm para empresas de pisos",
      "seguimiento de presupuestos de pisos",
      "presupuestos de pisos a domicilio",
      "clientes potenciales de salas de exhibición de pisos",
      "marketing para negocios de pisos",
      "retorno de inversión en marketing para pisos",
      "proceso de ventas de pisos",
      "clientes potenciales de pisos comerciales",
      "respuesta por mensaje a llamadas perdidas de empresas de pisos",
    ],
    problemTitle: "No necesitas más visitas a tu local. Necesitas",
    problemTitleSerif: "cerrar las cotizaciones que entregas.",
    problemIntro:
      "Un cliente de pisos visita la sala de exhibición, solicita una medición, se lleva muestras a casa y desaparece para pensarlo. La empresa que da seguimiento durante esa larga decisión —responde preguntas, compara opciones y sigue presente— es la que agenda la instalación. La mayoría de los negocios de pisos dejan que la cotización pierda impulso.",
    mattersWhen: [
      { label: "Las consultas", detail: "importan cuando reciben una respuesta rápida y se convierten en visitas agendadas para presupuestos." },
      { label: "Los presupuestos a domicilio", detail: "importan cuando reciben seguimiento durante la selección de materiales." },
      { label: "Las muestras y las preguntas", detail: "importan cuando alguien atiende las dudas antes de que el cliente busque otra opción." },
      { label: "Las propuestas comerciales", detail: "importan cuando reciben el seguimiento que merece un proyecto grande." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la consulta hasta la instalación, en torno a",
      gold: "ingresos medibles de proyectos agendados.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de habilidad de buenos instaladores. Son fallas del proceso: los vacíos por los que un cliente que compara opciones elige discretamente a quien se mantuvo en contacto.",
    leaks: [
      "Las consultas y los clientes potenciales de la sala de exhibición nunca reciben seguimiento a tiempo.",
      "Las solicitudes de presupuestos a domicilio no se agendan con rapidez.",
      "Se envían cotizaciones y el cliente desaparece para 'pensarlo'.",
      "Las preguntas sobre muestras y materiales quedan sin respuesta.",
      "Nunca se da seguimiento a las opciones de financiamiento.",
      "Nunca se contacta a los clientes anteriores para la siguiente habitación o para pedir recomendaciones.",
      "Las propuestas comerciales y para constructores quedan sin respuesta.",
      "Nadie registra qué fuentes generan proyectos agendados.",
    ],
    leaksClose:
      "Unos cuantos proyectos de pisos sin cerrar cada mes representan una pérdida anual de seis cifras, y la mayoría de los negocios no tienen un informe que muestre dónde se perdió ese dinero.",
    journeyIntro:
      "Cada cliente de pisos recorre el mismo camino, desde la primera consulta hasta la instalación terminada. CAROS hace que ese recorrido sea uniforme y visible para que puedas ver quién agenda, quién cierra y quién se pierde.",
    journey: ["Consulta", "Presupuesto a domicilio", "Cotización y muestras", "Seguimiento", "Proyecto agendado", "Instalación", "Reseñas y recomendaciones"],
    journeyEndLabel: "Proyectos agendados e ingresos recurrentes",
    signatureEyebrow: "Presupuestos a domicilio y cartera de proyectos",
    signatureTitle: "Las decisiones largas se ganan al",
    signatureTitleSerif: "mantener el contacto.",
    signatureBody: [
      "Los pisos rara vez se compran en la primera visita. El cliente evalúa materiales, presupuesto y dos competidores durante días o semanas. Sin un seguimiento profesional durante ese período, incluso un excelente presupuesto pierde relevancia, y la instalación se la queda quien mantuvo viva la conversación.",
      "CAROS mantiene el avance de cada proyecto de pisos: agenda presupuestos a domicilio, da seguimiento durante la selección de materiales y el financiamiento, y sigue presente hasta que se programa el trabajo. Luego impulsa las recomendaciones y el proyecto de la siguiente habitación. Tus mejores cotizaciones dejan de perder impulso.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos de tu negocio de pisos",
    signatureUseCases: [
      "Captación de consultas y clientes potenciales de la sala de exhibición",
      "Agendamiento de presupuestos a domicilio",
      "Seguimiento de cotizaciones y muestras",
      "Seguimiento de la selección de materiales",
      "Seguimiento del financiamiento",
      "Contacto para la siguiente habitación / nuevos proyectos",
      "Seguimiento de propuestas para constructores y proyectos comerciales",
      "Obtención de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes anteriores",
      "Recordatorios de garantía y cuidado",
      "Cartera de proyectos comerciales",
    ],
    metrics: [
      { value: "64", label: "Consultas" },
      { value: "43", label: "Presupuestos agendados" },
      { value: "37", label: "Cotizaciones enviadas" },
      { value: "16", label: "Proyectos ganados" },
      { value: "$241,000", label: "Ingresos de proyectos agendados" },
      { value: "6.6x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan proyectos agendados?",
      "¿Qué tan rápido respondemos a las consultas?",
      "¿Cuántas cotizaciones están pendientes de seguimiento?",
      "¿Cuál es nuestra tasa de conversión de presupuesto a proyecto?",
      "¿Cuántos clientes anteriores podrían renovar otra habitación?",
      "¿Cuántas cotizaciones perdieron impulso por falta de seguimiento?",
      "¿Cuántas propuestas comerciales siguen abiertas?",
      "¿Dónde perdemos ingresos entre la cotización y la instalación?",
    ],
    recoveredText:
      "Cotizaciones que habrían perdido impulso y presupuestos que nunca recibieron seguimiento: captados, atendidos y convertidos en proyectos agendados.",
    experienceTitle: "Tecnología que mantiene a tus cuadrillas",
    experienceTitleSerif: "instalando, no persiguiendo clientes.",
    faq: [
      {
        q: "¿CAROS es un software para elaborar presupuestos de pisos?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, agenda presupuestos, da seguimiento durante la selección de materiales e impulsa nuevos trabajos de clientes anteriores. Funciona junto con tus herramientas de presupuestos y medición.",
      },
      {
        q: "¿Cómo ayuda CAROS a cerrar más proyectos de pisos?",
        a: "CAROS da seguimiento durante todo el período de decisión —preguntas, muestras y financiamiento— para mantenerte presente hasta que el cliente agenda, en lugar de dejar que la cotización pierda relevancia.",
      },
      {
        q: "¿CAROS puede gestionar tanto proyectos residenciales como comerciales?",
        a: "Sí. CAROS gestiona la respuesta rápida a clientes residenciales y los presupuestos a domicilio, así como el seguimiento de propuestas para constructores y proyectos comerciales, para mantener organizadas ambas áreas del negocio.",
      },
      {
        q: "¿Esto reemplazará al personal de mi sala de exhibición u oficina?",
        a: "No. CAROS se ocupa de las respuestas y automatiza el seguimiento para que tu equipo se enfoque en vender e instalar. Te permite crecer sin ampliar el personal de oficina antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestras herramientas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitio web y pagos, y puede ser tu sistema central o complementar lo que usas. Nos encargamos de las integraciones durante la configuración.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de pisos?",
        a: "Revisamos cómo se responden las consultas, cómo se agendan los presupuestos, cómo se da seguimiento a las cotizaciones durante la selección y dónde se estancan los proyectos. Luego te mostramos exactamente dónde se están perdiendo ingresos.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden los ingresos de tu negocio de pisos.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden consultas, presupuestos y proyectos, y qué se necesita para cerrar más de ellos.",
    acquisitionItems: ["Captación de consultas y clientes potenciales de la sala de exhibición", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de presupuestos", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   GENERAL CONTRACTING
   ========================================================================== */

const generalContracting = make(
  {
    trade: "Contratación general de obras",
    slug: "general-contracting",
    customers: "clientes",
    customer: "cliente",
    job: "proyecto",
    jobs: "proyectos",
    estimate: "propuesta",
    estimates: "propuestas",
    tech: "cuadrilla",
    techs: "cuadrillas",
    site: "obra",
    callWord: "consulta",
    bookLabel: "proyectos con contrato firmado",
  },
  {
    heroEyebrow: "Solución por sector — Contratación general de obras",
    heroTitle: "Los ciclos de venta largos acaban con los acuerdos que",
    heroTitleSerif: "nadie siguió de cerca.",
    heroSub:
      "Las remodelaciones y construcciones son proyectos de alto valor con decisiones largas y complejas. CAROS capta cada consulta, mantiene el avance de cada propuesta durante la decisión y organiza toda tu cartera de oportunidades, para que tus mejores proyectos no se estanquen entre la primera llamada y la firma del contrato.",
    trustRow: ["Remodelaciones", "Ampliaciones", "Obras nuevas", "Diseño y construcción", "Comercial"],
    metaTitle: "CAROS para contratistas generales | Gestiona propuestas y gana más proyectos",
    metaDescription:
      "CAROS ayuda a los contratistas generales a captar cada consulta, dar seguimiento a cada propuesta, gestionar una cartera de proyectos de ciclo largo y medir el retorno de inversión en marketing: el sistema operativo de ingresos diseñado para la contratación general de obras.",
    keywords: [
      "gestión de clientes potenciales para contratistas generales",
      "crm para contratistas generales",
      "seguimiento de propuestas de construcción",
      "proceso de ventas de remodelaciones",
      "cartera de proyectos para contratistas",
      "marketing para contratación general de obras",
      "retorno de inversión en marketing para contratistas",
      "clientes potenciales de diseño y construcción",
      "clientes potenciales de construcción comercial",
      "respuesta por mensaje a llamadas perdidas de contratistas",
    ],
    problemTitle: "No necesitas enviar más propuestas. Necesitas",
    problemTitleSerif: "que más terminen en una firma.",
    problemIntro:
      "Una remodelación o construcción es una decisión importante y de alto valor que puede tomar semanas o meses. El cliente compara propuestas, aclara el alcance y consigue financiamiento. El contratista que se mantiene organizado y da seguimiento profesional gana, mientras los demás reciben un cortés 'elegimos otra opción'.",
    mattersWhen: [
      { label: "Las consultas", detail: "importan cuando reciben una respuesta rápida y profesional y una asesoría agendada." },
      { label: "Las propuestas", detail: "importan cuando reciben seguimiento durante un largo período de decisión." },
      { label: "Las preguntas sobre el alcance y los cambios", detail: "importan cuando se responden con rapidez y claridad." },
      { label: "Las recomendaciones y los clientes recurrentes", detail: "importan cuando los clientes anteriores siguen conectados para el próximo proyecto." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la consulta hasta el contrato, en torno a",
      gold: "ingresos medibles de proyectos con contrato firmado.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de habilidad de buenos constructores. Son fallas del proceso: los vacíos por los que un cliente de alto valor elige discretamente a quien estuvo pendiente.",
    leaks: [
      "Las consultas quedan sin respuesta mientras diriges una obra.",
      "Las solicitudes de asesoría nunca se agendan.",
      "Se envían propuestas que nunca reciben seguimiento durante la decisión.",
      "Los clientes dejan de responder y nadie retoma el contacto.",
      "Las preguntas sobre el alcance y los cambios reciben respuestas lentas y dispersas.",
      "Nunca se contacta a los clientes anteriores para su siguiente proyecto o para pedir recomendaciones.",
      "Las oportunidades comerciales y de diseño y construcción se pierden sin un segundo contacto.",
      "Nadie registra qué fuentes generan proyectos con contrato firmado.",
    ],
    leaksClose:
      "Una sola remodelación sin contrato firmado suele representar decenas de miles de dólares. Perder varias al año es un golpe real a los ingresos que ningún informe revela.",
    journeyIntro:
      "Cada cliente de un contratista recorre el mismo camino, desde la primera consulta hasta el contrato firmado. CAROS hace que ese recorrido sea uniforme y visible para que puedas ver qué proyectos avanzan y cuáles se estancan.",
    journey: ["Consulta", "Asesoría", "Oferta / Propuesta", "Seguimiento", "Contrato firmado", "Construcción", "Recomendaciones y nuevos trabajos"],
    journeyEndLabel: "Proyectos con contrato firmado e ingresos recurrentes",
    signatureEyebrow: "Propuestas y cartera de proyectos",
    signatureTitle: "La solidez de tu cartera de oportunidades depende de tu",
    signatureTitleSerif: "seguimiento.",
    signatureBody: [
      "La contratación general de obras depende de una cartera de proyectos de alto valor y ciclo largo, y la mayor pérdida de ingresos está en la propuesta que queda sin respuesta ni seguimiento. Los clientes no están diciendo que no: están decidiendo con calma, y el contratista que se mantiene presente y organizado es el que consigue la firma.",
      "CAROS gestiona tu cartera de oportunidades contigo: capta cada consulta, agenda asesorías, da seguimiento a cada propuesta durante la decisión y mantiene el contacto con los clientes anteriores para el siguiente proyecto. Así, tus mejores oportunidades se convierten en contratos en lugar de desaparecer sin que lo notes.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos de contratación de obras",
    signatureUseCases: [
      "Captación de consultas y respuesta rápida",
      "Agendamiento de asesorías",
      "Seguimiento de ofertas y propuestas",
      "Seguimiento de oportunidades de ciclo largo",
      "Comunicación sobre el alcance y los cambios",
      "Seguimiento del financiamiento",
      "Seguimiento de proyectos de diseño y construcción",
      "Obtención de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes anteriores",
      "Organización de garantías y visitas de revisión",
      "Cartera de proyectos comerciales",
    ],
    metrics: [
      { value: "46", label: "Consultas" },
      { value: "31", label: "Asesorías realizadas" },
      { value: "24", label: "Propuestas enviadas" },
      { value: "9", label: "Proyectos con contrato firmado" },
      { value: "$486,000", label: "Ingresos de proyectos contratados" },
      { value: "7.1x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué fuentes generan proyectos con contrato firmado?",
      "¿Qué tan rápido respondemos a las nuevas consultas?",
      "¿Cuántas propuestas están pendientes de seguimiento?",
      "¿Cuál es nuestra tasa de conversión de propuesta a contrato firmado?",
      "¿Qué tipos de proyectos resultan más rentables de buscar?",
      "¿A cuántos clientes anteriores debemos volver a contactar?",
      "¿Cuántas propuestas quedaron sin respuesta ni seguimiento?",
      "¿Dónde perdemos ingresos entre la propuesta y el contrato firmado?",
    ],
    recoveredText:
      "Propuestas que habrían quedado sin respuesta y consultas que nunca se agendaron: captadas, con seguimiento y convertidas en proyectos con contrato firmado.",
    experienceTitle: "Tecnología que te permite seguir",
    experienceTitleSerif: "en la obra.",
    faq: [
      {
        q: "¿CAROS es un software de gestión de proyectos de construcción?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, agenda asesorías, da seguimiento a las propuestas y gestiona tu cartera de oportunidades de venta. Funciona junto con las herramientas de gestión de proyectos que ya usas.",
      },
      {
        q: "¿Cómo ayuda CAROS con los ciclos de venta largos?",
        a: "CAROS mantiene el avance de cada propuesta con un seguimiento profesional y automatizado durante una decisión que puede tomar semanas, para que los proyectos de alto valor no se estanquen simplemente porque nadie mantuvo el contacto.",
      },
      {
        q: "¿CAROS puede gestionar tanto trabajos residenciales como comerciales?",
        a: "Sí. CAROS gestiona carteras de remodelaciones residenciales, así como el seguimiento de propuestas comerciales y de diseño y construcción, para mantener cada oportunidad organizada en un solo lugar.",
      },
      {
        q: "¿Esto reemplazará a mi personal de oficina?",
        a: "No. CAROS se ocupa de las respuestas y automatiza el seguimiento para que tu equipo se enfoque en presupuestar y construir. Te permite crecer sin ampliar el personal de oficina antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestros sistemas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitio web y pagos, y puede ser tu sistema central o complementar lo que usas. Nos encargamos de las integraciones durante la configuración.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para un contratista general?",
        a: "Revisamos cómo se responden las consultas, cómo se agendan las asesorías, cómo se da seguimiento a las propuestas y dónde se estancan los proyectos. Luego te mostramos exactamente dónde se están perdiendo ingresos en toda tu cartera de oportunidades.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden los ingresos de tu negocio de contratación de obras.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden consultas, propuestas y proyectos, y qué se necesita para conseguir más contratos firmados.",
    acquisitionItems: ["Captación de consultas y llamadas", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de asesoría", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   POOL SERVICES
   ========================================================================== */

const poolServices = make(
  {
    trade: "Servicios para piscinas",
    slug: "pool-services",
    customers: "clientes",
    customer: "cliente",
    job: "servicio",
    jobs: "servicios",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "técnico",
    techs: "técnicos",
    site: "propiedad",
    callWord: "llamada de servicio",
    bookLabel: "servicios agendados",
  },
  {
    heroEyebrow: "Solución por sector — Servicios para piscinas",
    heroTitle: "Aperturas, cierres y rutas recurrentes,",
    heroTitleSerif: "si logras captarlos todos.",
    heroSub:
      "Los servicios para piscinas dependen de los picos de temporada y el mantenimiento recurrente. CAROS capta cada llamada durante la alta demanda de aperturas y cierres, da seguimiento a cada cotización de reparación y consolida rutas de servicio recurrente, para llenar tu agenda de temporada y generar ingresos que se repiten.",
    trustRow: ["Rutas de mantenimiento", "Aperturas y cierres", "Reparaciones", "Recuperación de agua verde", "Comercial"],
    metaTitle: "CAROS para servicios de piscinas | Capta llamadas de temporada y amplía tus rutas recurrentes",
    metaDescription:
      "CAROS ayuda a las empresas de servicios para piscinas a atender la alta demanda de temporada, dar seguimiento a cotizaciones de reparación, consolidar rutas de mantenimiento recurrente y medir el retorno de inversión en marketing: el sistema operativo de ingresos diseñado para servicios de piscinas.",
    keywords: [
      "gestión de clientes potenciales para servicios de piscinas",
      "crm para servicios de piscinas",
      "rutas de mantenimiento de piscinas",
      "programación de aperturas y cierres de piscinas",
      "seguimiento de cotizaciones de reparación de piscinas",
      "marketing para servicios de piscinas",
      "retorno de inversión en marketing para servicios de piscinas",
      "servicio recurrente de piscinas",
      "clientes potenciales de servicios para piscinas comerciales",
      "respuesta por mensaje a llamadas perdidas de servicios de piscinas",
    ],
    problemTitle: "No necesitas más llamadas de temporada. Necesitas",
    problemTitleSerif: "conservar esos clientes todo el año.",
    problemIntro:
      "Los servicios para piscinas tienen grandes picos durante las aperturas y los cierres, y luego se estabilizan con el mantenimiento recurrente. Los ingresos que pierdes están en las llamadas que no puedes atender durante la alta demanda, las cotizaciones de reparación sin seguimiento y los clientes de temporada que nunca conviertes en una ruta de servicio para todo el año.",
    mattersWhen: [
      { label: "Las llamadas de temporada", detail: "importan cuando se atienden rápido durante la alta demanda de aperturas y cierres." },
      { label: "Las cotizaciones de reparación", detail: "importan cuando reciben seguimiento hasta que el cliente las aprueba." },
      { label: "Los servicios puntuales", detail: "importan cuando se convierten en rutas de mantenimiento recurrente." },
      { label: "Las cuentas comerciales", detail: "importan cuando las cuentas estables y de alto valor reciben un servicio confiable." },
    ],
    problemClose: {
      text: "CAROS conecta todo tu proceso, desde la llamada hasta la ruta de servicio, en torno a",
      gold: "ingresos recurrentes y medibles.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de habilidad de buenos técnicos. Son fallas del proceso: los vacíos por los que se pierden silenciosamente la demanda de temporada y los ingresos recurrentes.",
    leaks: [
      "Las llamadas de aperturas y cierres llegan al buzón de voz durante la alta demanda de temporada.",
      "Los clientes potenciales del sitio web esperan horas antes de que alguien responda.",
      "Se envían cotizaciones de reparación y equipos que quedan sin respuesta.",
      "Nunca se ofrece una ruta recurrente a los clientes de servicios puntuales.",
      "Los clientes de rutas cancelan sin que nadie intente retenerlos.",
      "Los trabajos de recuperación de agua verde y los servicios especializados se pierden por falta de seguimiento.",
      "Nunca se piden reseñas ni recomendaciones.",
      "Nadie registra qué fuentes generan clientes recurrentes.",
    ],
    leaksClose:
      "Perder unas cuantas rutas recurrentes o no convertirlas cada temporada tiene un efecto acumulativo rápido, porque cada una representaba un año completo de servicio programado.",
    journeyIntro:
      "Cada cliente de piscinas recorre el mismo camino, desde la primera llamada hasta una ruta fija. CAROS hace que ese recorrido sea uniforme y visible para que puedas ver quién agenda, quién se convierte en recurrente y quién deja de contratarte.",
    journey: ["Llamada de servicio", "Agendamiento", "Apertura / Servicio", "Cotización de reparación", "Ruta recurrente", "Recuperación y retención", "Reseñas y recomendaciones"],
    journeyEndLabel: "Rutas recurrentes e ingresos que se repiten",
    signatureEyebrow: "Servicio de temporada y rutas recurrentes",
    signatureTitle: "Convierte una apertura de primavera en una",
    signatureTitleSerif: "ruta para todo el año.",
    signatureBody: [
      "Los mejores negocios de piscinas equilibran los picos de temporada con mantenimiento recurrente. Una sola apertura o reparación puede convertirse en una ruta semanal fija, pero solo si se ofrece, se programa y se protege contra las cancelaciones que reducen tus rutas silenciosamente cada año.",
      "CAROS construye y protege tu base de clientes recurrentes: capta la alta demanda de temporada, convierte servicios puntuales en rutas, da seguimiento a las cotizaciones de reparación y evita cancelaciones antes de que se concreten, para que los ingresos de tus rutas sean más estables cada temporada.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos de tu negocio de piscinas",
    signatureUseCases: [
      "Captación de llamadas de temporada",
      "Programación de aperturas y cierres",
      "Seguimiento de cotizaciones de reparación",
      "Conversión a rutas recurrentes",
      "Recordatorios de rutas",
      "Flujos de retención ante cancelaciones",
      "Seguimiento de recuperación de agua verde",
      "Seguimiento de renovación de equipos",
      "Obtención de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de clientes inactivos",
      "Cartera de oportunidades de cuentas comerciales",
    ],
    metrics: [
      { value: "79", label: "Llamadas de servicio" },
      { value: "54", label: "Servicios agendados" },
      { value: "31", label: "Convertidos a rutas" },
      { value: "11", label: "Cancelaciones evitadas" },
      { value: "$147,000", label: "Ingresos de servicios agendados" },
      { value: "6.5x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas generan clientes recurrentes?",
      "¿Qué tan rápido atendemos las llamadas de temporada?",
      "¿Cuántas cotizaciones de reparación están pendientes de seguimiento?",
      "¿Cuál es nuestra tasa de conversión de servicio puntual a ruta?",
      "¿Cuántas cancelaciones evitamos esta temporada?",
      "¿Cuántos clientes inactivos podríamos recuperar?",
      "¿Qué rutas tienen capacidad para más visitas?",
      "¿Dónde perdemos ingresos entre la llamada y la ruta fija?",
    ],
    recoveredText:
      "Llamadas de temporada que habrían llegado al buzón de voz y servicios puntuales que no habrían pasado de una sola visita: captados, con seguimiento y convertidos en rutas recurrentes.",
    experienceTitle: "Tecnología que mantiene a tus técnicos",
    experienceTitleSerif: "en la ruta.",
    faq: [
      {
        q: "¿CAROS es un software de rutas para servicios de piscinas?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta llamadas, agenda servicios, convierte trabajos en rutas recurrentes, da seguimiento a cotizaciones de reparación y evita cancelaciones. Funciona junto con tus herramientas de rutas.",
      },
      {
        q: "¿Cómo ayuda CAROS durante la alta demanda de temporada?",
        a: "CAROS atiende cada llamada y responde por mensaje, agenda aperturas y cierres según tu disponibilidad real y automatiza el seguimiento, para que la alta demanda de primavera y otoño llene tu agenda en lugar de tu buzón de voz.",
      },
      {
        q: "¿CAROS puede aumentar los ingresos de las rutas recurrentes?",
        a: "Sí. CAROS convierte servicios puntuales en rutas recurrentes, mantiene su programación, evita cancelaciones y reactiva clientes inactivos para generar ingresos predecibles y recurrentes.",
      },
      {
        q: "¿Esto reemplazará a mi personal de oficina?",
        a: "No. CAROS atiende las llamadas que tu equipo no alcanza a responder y automatiza el seguimiento para que se enfoque en agendar y prestar servicios. Te permite crecer sin ampliar el personal de oficina antes de tiempo.",
      },
      {
        q: "¿CAROS se integra con nuestros sistemas?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitio web y pagos, y puede ser tu sistema central o complementar lo que usas. Nos encargamos de las integraciones durante la configuración.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS para una empresa de servicios de piscinas?",
        a: "Revisamos cómo se atienden las llamadas, cómo se da seguimiento a las cotizaciones de reparación, cómo los servicios se convierten en rutas y dónde los clientes dejan de contratarte. Luego te mostramos exactamente dónde se están perdiendo ingresos recurrentes.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden los ingresos de tu negocio de servicios para piscinas.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden llamadas de temporada, cotizaciones de reparación y rutas recurrentes, y qué se necesita para conservarlas.",
    acquisitionItems: ["Captación de llamadas de temporada", "Captación de clientes potenciales de Google y Facebook", "Sitio web y formularios de agendamiento", "Atribución de fuentes"],
  },
)

/* ==========================================================================
   HOME SERVICES (general umbrella)
   ========================================================================== */

const homeServices = make(
  {
    trade: "Servicios para el hogar",
    slug: "home-services",
    customers: "propietarios",
    customer: "propietario",
    job: "trabajo",
    jobs: "trabajos",
    estimate: "presupuesto",
    estimates: "presupuestos",
    tech: "cuadrilla",
    techs: "cuadrillas",
    site: "obra",
    callWord: "llamada de servicio",
    bookLabel: "trabajos agendados",
  },
  {
    heroEyebrow: "Solución por sector — Servicios para el hogar",
    heroTitle: "Cada llamada de servicio representa ingresos. CAROS se asegura de que nada",
    heroTitleSerif: "se pierda.",
    heroSub:
      "Ya sea que ofrezcas una especialidad o varias, los ingresos de los servicios para el hogar se ganan por teléfono y se pierden en el seguimiento. CAROS capta cada llamada, agenda más trabajos, da seguimiento a cada presupuesto y te muestra qué acciones de marketing realmente generan trabajos agendados.",
    trustRow: ["Residencial", "Comercial", "Servicio de emergencia", "Mantenimiento recurrente", "Múltiples especialidades"],
    metaTitle: "CAROS para servicios del hogar | Capta cada llamada y agenda más trabajos",
    metaDescription:
      "CAROS es el sistema de captación de clientes y operaciones de ingresos para negocios de servicios del hogar: responde cada llamada, agenda más trabajos, da seguimiento a cada presupuesto y mide qué acciones de marketing generan ingresos de trabajos agendados.",
    keywords: [
      "gestión de clientes potenciales para servicios del hogar",
      "crm para servicios del hogar",
      "software de gestión de clientes potenciales para contratistas",
      "seguimiento de presupuestos de servicios del hogar",
      "respuesta por mensaje a llamadas perdidas de servicios del hogar",
      "agendamiento de citas de servicios del hogar",
      "retorno de inversión en marketing para servicios del hogar",
      "software para negocios de oficios",
      "proceso de ventas de servicios del hogar",
      "automatización de negocios de servicios",
    ],
    problemTitle: "No necesitas más clientes potenciales. Necesitas dejar de",
    problemTitleSerif: "perder los que ya tienes.",
    problemIntro:
      "A la mayoría de los dueños de negocios de servicios para el hogar les dicen que la solución siempre es conseguir más clientes potenciales. Pero cuando revisas lo que ya llega —las llamadas al buzón de voz, los presupuestos sin respuesta, los clientes anteriores que olvidan tu nombre—, los ingresos por los que ya pagaste para generar oportunidades se escapan más rápido de lo que llegan nuevos clientes potenciales.",
    mattersWhen: [
      { label: "Las llamadas", detail: "importan cuando alguien las atiende antes de que el propietario llame a la siguiente empresa." },
      { label: "Los presupuestos", detail: "importan cuando reciben seguimiento hasta que el propietario realmente toma una decisión." },
      { label: "Las citas", detail: "importan cuando se confirman y se cumplen, en lugar de terminar en ausencias sin aviso." },
      { label: "La inversión publicitaria", detail: "importa cuando puedes ver qué campañas generan trabajos agendados." },
    ],
    problemClose: {
      text: "CAROS conecta toda tu operación en torno a una sola cosa:",
      gold: "ingresos medibles de trabajos agendados.",
    },
    leaksIntro:
      "Nada de esto se debe a la falta de habilidad de buenos profesionales. Son fallas del proceso: los vacíos silenciosos por los que un propietario listo para contratar simplemente deja de acercarse a tu negocio.",
    leaks: [
      "Las llamadas llegan al buzón de voz mientras tus cuadrillas están en una obra.",
      "Los clientes potenciales del sitio web y los formularios esperan horas antes de que alguien responda.",
      "Se envían presupuestos y el propietario deja de responder, sin que nadie dé seguimiento.",
      "Las citas se agendan pero nunca se confirman, y las ausencias se acumulan.",
      "Las llamadas fuera de horario y de los fines de semana se pierden por completo.",
      "Los clientes ocasionales nunca vuelven a saber de ti sobre el siguiente trabajo que necesitarán.",
      "Las recomendaciones llegan de forma verbal y nunca se registran ni se les da seguimiento.",
      "No puedes identificar qué anuncios y campañas realmente generaron trabajos pagados.",
    ],
    leaksClose:
      "Suma las llamadas perdidas y los presupuestos sin respuesta de un solo mes y a menudo representan más ingresos de los que generaría otra campaña de marketing, pero ningún informe te lo muestra.",
    journeyIntro:
      "Cada trabajo recorre el mismo camino, desde el primer contacto hasta la factura final. CAROS hace que ese recorrido sea uniforme y visible para que puedas ver exactamente dónde avanzan los propietarios y dónde se estancan.",
    journey: ["Llamada / Consulta", "Primera respuesta", "Presupuesto", "Trabajo programado", "Trabajo terminado", "Factura y pago", "Reseñas y recomendaciones"],
    journeyEndLabel: "Trabajos agendados e ingresos recurrentes",
    signatureEyebrow: "Un sistema, todas las especialidades",
    signatureTitle: "Un sistema operativo para todo el",
    signatureTitleSerif: "negocio.",
    signatureBody: [
      "La mayoría de los dueños de negocios de servicios para el hogar administran su empresa entre un buzón de voz, un calendario en papel, una hoja de cálculo y su propia memoria. Los clientes potenciales se pierden entre esos sistemas, no por descuido, sino porque no hay un solo lugar que reúna todo el recorrido del cliente.",
      "CAROS conecta la captación de clientes, el seguimiento, la programación, las reseñas y los informes en un solo sistema. Así, ya sea que te dediques a techos, climatización, plomería, limpieza o todo lo anterior, cada cliente potencial queda registrado y cada dólar se contabiliza en un solo lugar.",
    ],
    signatureListLabel: "Dónde CAROS impulsa los ingresos de servicios para el hogar",
    signatureUseCases: [
      "Respuesta por mensaje a llamadas perdidas",
      "Atención fuera de horario",
      "Respuesta inmediata a clientes potenciales",
      "Seguimiento de presupuestos",
      "Agendamiento en línea",
      "Recordatorios de citas",
      "Obtención de reseñas",
      "Campañas de recomendaciones",
      "Recordatorios de mantenimiento",
      "Reactivación de clientes anteriores",
      "Atribución de fuentes de clientes potenciales",
      "Informes de retorno de inversión en marketing",
    ],
    metrics: [
      { value: "84", label: "Llamadas y clientes potenciales" },
      { value: "56", label: "Trabajos agendados" },
      { value: "39", label: "Presupuestos enviados" },
      { value: "27", label: "Trabajos ganados" },
      { value: "$142,000", label: "Ingresos de trabajos agendados" },
      { value: "6.8x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué campañas publicitarias realmente generan trabajos agendados?",
      "¿Cuántas llamadas perdimos la semana pasada?",
      "¿Cuántos presupuestos siguen pendientes de seguimiento?",
      "¿Cuál es nuestra tasa de conversión de cliente potencial a trabajo agendado?",
      "¿Cuántos clientes anteriores ya necesitan otro servicio?",
      "¿Qué fuentes de clientes potenciales nos dan el mejor retorno?",
      "¿Qué tan rápido respondemos a los nuevos clientes potenciales?",
      "¿Dónde perdemos ingresos entre la llamada y el trabajo terminado?",
    ],
    recoveredText:
      "Llamadas que habrían llegado al buzón de voz y presupuestos que habrían quedado en el olvido: captados, con seguimiento y convertidos en trabajos agendados.",
    experienceTitle: "Tecnología que mantiene a tus cuadrillas",
    experienceTitleSerif: "en el trabajo.",
    faq: [
      {
        q: "Ofrezco más de una especialidad. ¿CAROS también se adapta a mi negocio?",
        a: "Sí, para eso está diseñado. CAROS capta clientes potenciales, agenda trabajos y da seguimiento a los presupuestos de la misma manera en todos los servicios que ofreces, para que un negocio de múltiples especialidades funcione con un solo sistema en lugar de herramientas desconectadas.",
      },
      {
        q: "¿CAROS es un software de servicio en campo o de asignación de personal?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta clientes potenciales, agenda citas, da seguimiento a presupuestos y registra qué fuentes generan trabajos agendados. Funciona junto con las herramientas de campo o de asignación de personal que ya usas.",
      },
      {
        q: "¿Esto reemplazará a mi personal de oficina?",
        a: "No. CAROS atiende las llamadas que tu equipo no alcanza a responder, las consultas fuera de horario y el seguimiento para el que no tiene tiempo, para que tu personal se enfoque en vender y ejecutar trabajos. Te ayuda a crecer sin ampliar el personal de oficina antes de tiempo.",
      },
      {
        q: "¿Qué tan rápido pueden recibir una respuesta los clientes potenciales con CAROS?",
        a: "Al instante. Los nuevos clientes potenciales reciben una respuesta profesional automática por mensaje de texto y correo electrónico en cuanto llegan, y las llamadas perdidas activan una respuesta automática por mensaje, para que ganes los trabajos que se quedan con quien responde primero.",
      },
      {
        q: "¿CAROS funciona con mi teléfono y mis herramientas actuales?",
        a: "CAROS se conecta con herramientas habituales de telefonía, calendario, sitio web y pagos, y puede funcionar como tu sistema central o junto con lo que ya tienes. Configuramos las integraciones por ti durante la puesta en marcha.",
      },
      {
        q: "¿En qué consiste una auditoría de ingresos de CAROS?",
        a: "Revisamos cómo se atienden tus llamadas, qué tan rápido reciben respuesta los clientes potenciales, cómo se da seguimiento a los presupuestos y dónde se estancan los trabajos. Luego te mostramos exactamente dónde se están perdiendo ingresos entre la primera llamada y el trabajo terminado.",
      },
    ],
    ctaHeadline: "Descubre dónde se pierden tus ingresos.",
    ctaSub:
      "Una auditoría de ingresos de CAROS te muestra exactamente dónde se pierden llamadas, presupuestos y trabajos recurrentes, y qué se necesita para recuperarlos.",
    acquisitionItems: ["Captación de llamadas y solicitudes de servicio", "Captación de clientes potenciales de Google y Facebook", "Clientes potenciales del sitio web y formularios", "Registro y atribución de recomendaciones"],
  },
)

/* ==========================================================================
   EVENTS & RETREATS
   ========================================================================== */

const eventsRetreats = make(
  {
    trade: "Eventos y retiros",
    slug: "events-retreats",
    customers: "clientes",
    customer: "cliente",
    job: "evento",
    jobs: "eventos",
    estimate: "propuesta",
    estimates: "propuestas",
    tech: "coordinador",
    techs: "coordinadores",
    site: "retiro",
    callWord: "llamada de consulta",
    bookLabel: "eventos reservados",
  },
  {
    captureTitleSerif: "evento reservado.",
    captureIntro:
      "Los ingresos por eventos y retiros se ganan con la primera respuesta y se pierden durante el largo silencio que viene después. CAROS se asegura de que cada consulta reciba una respuesta inmediata, cada propuesta tenga seguimiento y cada fecha siga avanzando durante los meses que toma decidir — para que las reservas no terminen con el organizador que respondió más rápido.",
    heroEyebrow: "Solución por sector — Eventos y retiros",
    heroTitle: "La reserva se la lleva quien responde primero y",
    heroTitleSerif: "mantiene el seguimiento por más tiempo.",
    heroSub:
      "Los clientes de eventos y retiros investigan durante semanas y se toman su tiempo para reservar. CAROS responde cada consulta al instante, mantiene vigentes las propuestas durante la larga decisión y da seguimiento a cada fecha de tu calendario — para que llenes el año en lugar de perseguir reservas.",
    trustRow: ["Retiros corporativos", "Retiros de bienestar", "Bodas", "Conferencias", "Eventos privados"],
    metaTitle: "CAROS para eventos y retiros | Capta consultas y llena tu calendario",
    metaDescription:
      "CAROS ayuda a organizadores de eventos y anfitriones de retiros a responder cada consulta al instante, dar seguimiento a las propuestas y acompañar las reservas durante un largo ciclo de decisión — el sistema operativo de ingresos para el sector de eventos.",
    keywords: [
      "gestión de prospectos para organizadores de eventos",
      "software de reservas de retiros",
      "seguimiento de propuestas de eventos",
      "crm para organización de eventos",
      "seguimiento de prospectos para organizadores de bodas",
      "reservas de retiros corporativos",
      "respuesta a consultas sobre eventos",
      "embudo de reservas de espacios para eventos",
      "retorno de inversión en marketing para organizadores de eventos",
      "crm para centros de retiros",
    ],
    problemTitle: "No pierdes reservas por el precio. Las pierdes por el",
    problemTitleSerif: "silencio.",
    problemIntro:
      "Cuando un cliente consulta sobre un evento o retiro, normalmente ya contactó a varios organizadores. Quien consigue la reserva rara vez es el más barato — es quien respondió primero, envió una propuesta bien pensada y mantuvo activa la conversación durante semanas de deliberación. Los demás se pierden en la bandeja de entrada del cliente.",
    mattersWhen: [
      { label: "Consultas", detail: "importan cuando reciben una respuesta real antes de que el cliente tenga noticias de tres competidores." },
      { label: "Propuestas", detail: "importan cuando reciben seguimiento en lugar de dejar que el cliente decida en silencio." },
      { label: "Fechas", detail: "importan cuando las reservas provisionales reciben seguimiento hasta convertirse en contratos firmados." },
      { label: "Recomendaciones", detail: "importan cuando se les pide a los clientes anteriores, en el momento adecuado, que recomienden al siguiente." },
    ],
    problemClose: {
      text: "CAROS mantiene cada consulta, propuesta y fecha apartada avanzando hacia",
      gold: "un evento reservado con contrato firmado.",
    },
    leaksIntro:
      "Nada de esto refleja una falta de talento del organizador. Son fallas del proceso — vacíos silenciosos en los que un cliente entusiasmado pierde poco a poco el interés y reserva en otro lugar.",
    leaks: [
      "Las consultas esperan un día mientras el cliente contrata a un organizador que respondió en una hora.",
      "Se envían propuestas y el cliente deja de responder, sin un seguimiento estructurado.",
      "Las reservas provisionales de fechas vencen porque nadie les dio seguimiento hasta la firma del contrato.",
      "Las llamadas iniciales se agendan, pero nunca se confirman, y las ausencias desperdician tu semana.",
      "Los clientes anteriores planean otro evento y nunca se les ocurre llamarte.",
      "Llegan recomendaciones de proveedores y espacios para eventos, pero nunca se registran.",
      "Los anticipos y contratos quedan pendientes de un recordatorio que nadie envió.",
      "No puedes saber qué canales — anuncios, recomendaciones, directorios — realmente generan eventos reservados.",
    ],
    leaksClose:
      "Perder un solo retiro corporativo o una boda puede representar decenas de miles en ingresos — y la mayoría de los organizadores nunca ve cuántas oportunidades se perdieron silenciosamente entre la primera consulta y el contrato firmado.",
    journeyIntro:
      "Cada evento recorre el mismo camino desde la primera consulta hasta el agradecimiento final. CAROS hace que ese camino sea constante y visible — para que veas dónde avanzan los clientes y dónde se detienen.",
    journey: ["Consulta", "Respuesta inmediata", "Llamada inicial", "Propuesta", "Seguimiento y apartado de fecha", "Contrato firmado", "Día del evento", "Reseñas y recomendaciones"],
    journeyEndLabel: "Eventos reservados y clientes recurrentes",
    signatureEyebrow: "El largo ciclo de decisión",
    signatureTitle: "Mantente presente durante la",
    signatureTitleSerif: "larga decisión.",
    signatureBody: [
      "Los eventos y retiros no son compras impulsivas. Un cliente puede consultar en enero sobre un retiro en octubre y tardar meses en comprometerse. En ese largo período se ganan o pierden la mayoría de las reservas — y es precisamente cuando los organizadores ocupados se quedan sin tiempo para dar seguimiento.",
      "CAROS acompaña al cliente durante ese período por ti: respuestas inmediatas, seguimiento cuidadoso de propuestas, recordatorios amables sobre fechas apartadas y avisos para cada anticipo y etapa clave. Mantienes tu presencia y profesionalismo durante toda la decisión — sin vivir pendiente de tu bandeja de entrada.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos por eventos",
    signatureUseCases: [
      "Respuesta inmediata a consultas",
      "Reserva de llamadas iniciales",
      "Seguimiento de propuestas",
      "Seguimiento de fechas apartadas",
      "Recordatorios de anticipos y contratos",
      "Seguimiento de etapas clave",
      "Recordatorios de coordinación con proveedores",
      "Solicitudes de reseñas después del evento",
      "Reactivación para nuevos eventos",
      "Campañas de recomendaciones",
      "Campañas de temporada para cubrir fechas disponibles",
      "Atribución de origen",
    ],
    metrics: [
      { value: "48", label: "Consultas" },
      { value: "31", label: "Llamadas iniciales" },
      { value: "22", label: "Propuestas enviadas" },
      { value: "11", label: "Eventos reservados" },
      { value: "$268,000", label: "Ingresos por reservas" },
      { value: "9.1x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué canales realmente generan eventos reservados?",
      "¿Qué tan rápido respondemos las nuevas consultas?",
      "¿Cuántas propuestas siguen pendientes de seguimiento?",
      "¿Qué fechas apartadas están por vencer?",
      "¿Cuál es nuestra tasa de conversión de consultas en reservas?",
      "¿Cuántos clientes anteriores están listos para otro evento?",
      "¿Qué temporadas y períodos tienen pocas reservas?",
      "¿Dónde perdemos reservas entre la consulta y el contrato?",
    ],
    recoveredText:
      "Consultas que habrían perdido impulso y propuestas que habrían quedado en el olvido — atendidas, acompañadas y convertidas en eventos reservados con contratos firmados.",
    experienceTitle: "Tecnología que te permite enfocarte en la",
    experienceTitleSerif: "experiencia.",
    faq: [
      {
        q: "¿CAROS es un software de gestión de eventos o de producción para el día del evento?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, agenda llamadas iniciales, da seguimiento a propuestas y acompaña las fechas hasta la firma de los contratos. Funciona junto con las herramientas de planificación y producción que usas para realizar el evento.",
      },
      {
        q: "Nuestro ciclo de ventas dura meses. ¿CAROS puede manejarlo?",
        a: "Es precisamente donde más ayuda. CAROS mantiene el interés de los clientes durante una decisión larga con seguimiento automático de propuestas, avisos sobre fechas apartadas y recordatorios de etapas clave — para que las reservas no se pierdan solo porque la decisión toma tiempo.",
      },
      {
        q: "¿CAROS hará que nuestra comunicación parezca automatizada o impersonal?",
        a: "No. Cada mensaje se envía con tu nombre y tu tono, y personas reales pueden intervenir en cualquier conversación. CAROS se encarga de los tiempos y la constancia; tu equipo mantiene el trato personal.",
      },
      {
        q: "¿Puede manejar tanto retiros corporativos como eventos privados?",
        a: "Sí. Puedes gestionar distintos tipos de consultas, propuestas y secuencias de seguimiento para retiros corporativos, bodas, conferencias y eventos privados — todo en un solo embudo con informes claros.",
      },
      {
        q: "¿CAROS funciona con nuestro calendario y los formularios de nuestro sitio web?",
        a: "CAROS se conecta con herramientas habituales de calendario, correo electrónico, sitios web y pagos, y puede ser tu sistema central o funcionar junto con lo que ya tienes. Configuramos las integraciones durante la implementación.",
      },
      {
        q: "¿Qué incluye una Auditoría de Ingresos de CAROS para un negocio de eventos?",
        a: "Revisamos qué tan rápido se responden las consultas, cómo se da seguimiento a las propuestas y a las fechas apartadas, y dónde se estancan las reservas — luego te mostramos exactamente dónde se están perdiendo ingresos en tu calendario.",
      },
    ],
    ctaHeadline: "Descubre dónde se están perdiendo tus reservas de eventos.",
    ctaSub:
      "Una Auditoría de Ingresos de CAROS te muestra exactamente dónde se están perdiendo consultas, propuestas y fechas apartadas — y qué haría falta para llenar tu calendario.",
    acquisitionItems: ["Captación de consultas y respuesta inmediata", "Captación de prospectos de Google y Facebook", "Formularios del sitio web y directorios", "Registro y atribución de recomendaciones"],
  },
)

/* ==========================================================================
   ALQUILERES PARA FIESTAS Y EVENTOS
   ========================================================================== */

const partyRentals = make(
  {
    trade: "Alquileres para fiestas y eventos",
    slug: "party-event-rentals",
    customers: "clientes",
    customer: "cliente",
    job: "alquiler",
    jobs: "alquileres",
    estimate: "cotización",
    estimates: "cotizaciones",
    tech: "equipo",
    techs: "equipos",
    site: "montaje",
    callWord: "solicitud de alquiler",
    bookLabel: "alquileres reservados",
  },
  {
    captureTitleSerif: "alquiler reservado.",
    captureIntro:
      "Los ingresos por alquileres se ganan con la primera cotización y se pierden en cuanto el cliente tiene que esperar. CAROS responde rápido cada solicitud de alquiler, cotiza según la disponibilidad mientras el interés sigue alto y da seguimiento hasta que el pedido esté confirmado — para que las reservas no se vayan con la empresa que respondió primero.",
    heroEyebrow: "Solución por sector — Alquileres para fiestas y eventos",
    heroTitle: "Cuando alguien necesita una carpa este fin de semana, reserva con quien",
    heroTitleSerif: "responde ahora.",
    heroSub:
      "Los clientes de alquileres comparan rápido y reservan rápido. CAROS capta cada solicitud, cotiza según la disponibilidad al instante y da seguimiento a cada apartado — para que tu inventario se mantenga reservado en lugar de perder pedidos ante la siguiente empresa de la lista.",
    trustRow: ["Carpas y estructuras", "Mesas y asientos", "Juegos inflables", "Escenarios y equipo audiovisual", "Mantelería y decoración"],
    metaTitle: "CAROS para alquileres de fiestas y eventos | Capta solicitudes y consigue más pedidos",
    metaDescription:
      "CAROS ayuda a empresas de alquiler para fiestas y eventos a responder rápido cada solicitud, cotizar según la disponibilidad al instante, dar seguimiento a los apartados y mantener el inventario reservado — el sistema operativo de ingresos para el sector de alquileres.",
    keywords: [
      "gestión de prospectos para alquileres de fiestas",
      "software de reservas de alquileres para eventos",
      "seguimiento de cotizaciones de alquiler",
      "crm para alquileres de fiestas",
      "software de alquiler de juegos inflables",
      "reservas de alquiler de carpas",
      "respuesta a consultas de alquileres para eventos",
      "cotización de alquileres según disponibilidad",
      "retorno de inversión en marketing para alquileres de fiestas",
      "embudo de alquiler de equipos",
    ],
    problemTitle: "No pierdes pedidos por tu inventario. Los pierdes por el",
    problemTitleSerif: "tiempo de respuesta.",
    problemIntro:
      "Un cliente que planea una fiesta o un evento suele escribir a varias empresas de alquiler a la vez. Quien confirma primero la disponibilidad y el precio casi siempre se lleva el pedido. Si una solicitud pasa unas horas en el buzón de voz o sin leer en la bandeja de entrada, la carpa, las mesas o el juego inflable ya se reservaron con otra empresa.",
    mattersWhen: [
      { label: "Solicitudes", detail: "importan cuando alguien las cotiza antes de que el cliente reserve con otra empresa." },
      { label: "Cotizaciones", detail: "importan cuando reciben seguimiento en lugar de quedar sin respuesta." },
      { label: "Apartados", detail: "importan cuando las reservas provisionales se confirman y se pagan antes de vencer." },
      { label: "Entrega", detail: "importa cuando se confirman los montajes y las recolecciones para que nada falle el día del evento." },
    ],
    problemClose: {
      text: "CAROS mantiene cada solicitud, cotización y apartado avanzando hacia",
      gold: "un alquiler confirmado y pagado.",
    },
    leaksIntro:
      "Nada de esto refleja una mala operación de alquileres. Son fallas del proceso — vacíos silenciosos en los que un cliente listo para reservar se va con la empresa que respondió más rápido.",
    leaks: [
      "Las solicitudes llegan al buzón de voz mientras tus equipos están realizando un montaje.",
      "Se envían cotizaciones y el cliente deja de responder, sin que nadie dé seguimiento.",
      "Los apartados provisionales vencen porque nadie confirmó el anticipo.",
      "Las solicitudes fuera de horario y los fines de semana — cuando más reservas se hacen — se pierden por completo.",
      "No se confirman los horarios de entrega y recolección, lo que provoca caos el día del evento.",
      "Los clientes recurrentes de temporada nunca reciben un recordatorio para volver a reservar.",
      "Las recomendaciones de organizadores y espacios para eventos nunca se registran ni se les da seguimiento.",
      "No puedes saber qué anuncios o publicaciones en directorios realmente generaron pedidos pagados.",
    ],
    leaksClose:
      "En temporada alta, unas cuantas solicitudes perdidas cada fin de semana pueden representar más ingresos perdidos que lo que generaría una nueva compra de inventario — y nada en tu calendario lo muestra.",
    journeyIntro:
      "Cada alquiler recorre el mismo camino desde la primera solicitud hasta la devolución del inventario. CAROS hace que ese camino sea constante y visible — para que veas dónde reservan los clientes y dónde se pierden.",
    journey: ["Solicitud de alquiler", "Disponibilidad y cotización", "Seguimiento", "Anticipo y apartado", "Pedido confirmado", "Entrega y montaje", "Recolección y reseñas"],
    journeyEndLabel: "Alquileres reservados y pedidos recurrentes",
    signatureEyebrow: "Demanda de temporada alta",
    signatureTitle: "Aprovecha la alta demanda sin perder",
    signatureTitleSerif: "un solo pedido.",
    signatureBody: [
      "La demanda de alquileres aumenta con fuerza los fines de semana, los días festivos y las temporadas de eventos. Es cuando llegan solicitudes sin parar — y cuando un equipo pequeño no puede cotizar, dar seguimiento y confirmar con suficiente rapidez. Cada solicitud perdida durante ese pico es inventario inactivo que debería estar generando ingresos.",
      "CAROS te ayuda a absorber el aumento: responde cada solicitud, también por mensaje de texto, cotiza según la disponibilidad al instante, da seguimiento a los apartados y confirma los horarios de entrega — para que tu inventario se mantenga reservado durante los fines de semana más ocupados en lugar de perder pedidos por una respuesta tardía.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos por alquileres",
    signatureUseCases: [
      "Respuesta inmediata a solicitudes",
      "Respuesta por mensaje de texto a llamadas perdidas",
      "Cotizaciones según disponibilidad",
      "Seguimiento de cotizaciones",
      "Recordatorios de anticipos y apartados",
      "Confirmaciones de entrega y recolección",
      "Formularios de reserva en línea",
      "Campañas de nuevas reservas por temporada",
      "Generación de reseñas",
      "Seguimiento de recomendaciones de organizadores y espacios para eventos",
      "Reactivación de clientes anteriores",
      "Atribución de origen",
    ],
    metrics: [
      { value: "97", label: "Solicitudes de alquiler" },
      { value: "64", label: "Cotizaciones enviadas" },
      { value: "43", label: "Pedidos confirmados" },
      { value: "38", label: "Entregas reservadas" },
      { value: "$88,000", label: "Ingresos por reservas" },
      { value: "7.9x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué anuncios y publicaciones en directorios realmente generan pedidos pagados?",
      "¿Qué tan rápido cotizamos las nuevas solicitudes?",
      "¿Cuántas cotizaciones siguen pendientes de seguimiento?",
      "¿Qué apartados están por vencer sin pagar?",
      "¿Cuál es nuestra tasa de conversión de solicitudes en pedidos?",
      "¿Cuántos clientes de temporada no han vuelto a reservar?",
      "¿Qué fines de semana tienen pocas reservas en este momento?",
      "¿Dónde perdemos pedidos entre la solicitud y la confirmación?",
    ],
    recoveredText:
      "Solicitudes que habrían terminado en el buzón de voz y cotizaciones que habrían quedado en el olvido — atendidas, con seguimiento y convertidas en alquileres confirmados y pagados.",
    experienceTitle: "Tecnología que mantiene a tus equipos",
    experienceTitleSerif: "en ruta.",
    faq: [
      {
        q: "¿CAROS es un software de inventario o logística de alquileres?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta solicitudes, cotiza según la disponibilidad, da seguimiento a los apartados y confirma pedidos. Funciona junto con las herramientas de inventario y despacho que usas para gestionar las existencias y las entregas.",
      },
      {
        q: "¿Cómo ayuda CAROS durante los fines de semana de temporada alta?",
        a: "CAROS responde cada solicitud entrante, también por mensaje de texto, envía cotizaciones rápido y da seguimiento a los apartados automáticamente — para que la gran cantidad de solicitudes de fin de semana y fuera de horario se convierta en pedidos confirmados, no en llamadas perdidas.",
      },
      {
        q: "¿Puede gestionar confirmaciones de entrega y recolección?",
        a: "Sí. CAROS envía confirmaciones y recordatorios automáticos de los horarios de entrega y recolección, reduciendo la confusión del día del evento que provoca clientes insatisfechos y viajes innecesarios de los equipos.",
      },
      {
        q: "¿Esto reemplazará a mi personal de oficina?",
        a: "No. CAROS atiende las solicitudes que exceden la capacidad del equipo y las que llegan fuera de horario, y automatiza el seguimiento para el que tu equipo no tiene tiempo, de modo que tu personal se concentre en cotizar pedidos grandes y realizar entregas. Te ayuda a crecer durante la temporada alta sin contratar de más.",
      },
      {
        q: "¿CAROS funciona con mi sitio web y mis formularios de reserva?",
        a: "CAROS se conecta con herramientas habituales de sitios web, calendario, telefonía y pagos, y puede ser tu sistema central o funcionar junto con lo que ya tienes. Configuramos las integraciones durante la implementación.",
      },
      {
        q: "¿Qué incluye una Auditoría de Ingresos de CAROS para un negocio de alquileres?",
        a: "Revisamos qué tan rápido se cotizan las solicitudes, cómo se da seguimiento a las cotizaciones, cómo se confirman los apartados y dónde se pierden los pedidos — luego te mostramos exactamente dónde se están perdiendo ingresos en tu calendario de reservas.",
      },
    ],
    ctaHeadline: "Descubre dónde se están perdiendo tus pedidos de alquiler.",
    ctaSub:
      "Una Auditoría de Ingresos de CAROS te muestra exactamente dónde se están perdiendo solicitudes, cotizaciones y apartados — y qué haría falta para mantener tu inventario reservado.",
    acquisitionItems: ["Captación de solicitudes y respuesta inmediata", "Captación de prospectos de Google y Facebook", "Formularios del sitio web y de reservas", "Registro y atribución de recomendaciones"],
  },
)

/* ==========================================================================
   BIENES RAÍCES
   ========================================================================== */

const realEstate = make(
  {
    trade: "Bienes raíces",
    slug: "real-estate",
    customers: "clientes",
    customer: "cliente",
    job: "operación",
    jobs: "operaciones",
    estimate: "consulta",
    estimates: "consultas",
    tech: "agente",
    techs: "agentes",
    site: "visita a una propiedad",
    callWord: "llamada de un nuevo cliente",
    bookLabel: "clientes con contrato firmado",
  },
  {
    captureTitleSerif: "cliente con contrato firmado.",
    captureIntro:
      "En bienes raíces se gana con la rapidez de respuesta a los prospectos y se pierde durante el seguimiento a largo plazo. CAROS responde en segundos cada consulta de compradores y vendedores, agenda la consulta y mantiene el contacto durante meses de decisión — para que los prospectos por los que ya pagaste no firmen con el agente que devolvió la llamada primero.",
    heroEyebrow: "Solución por sector — Bienes raíces",
    heroTitle: "El prospecto firma con el agente que devolvió la llamada",
    heroTitleSerif: "en cinco minutos.",
    heroSub:
      "En bienes raíces, la rapidez de respuesta al prospecto decide quién se queda con el cliente. CAROS responde cada consulta en segundos, agenda consultas automáticamente y acompaña a compradores y vendedores durante una larga decisión — para que los prospectos por los que pagaste no se vayan con quien respondió primero.",
    trustRow: ["Agentes de compradores", "Agentes de vendedores", "Equipos e inmobiliarias", "Construcción nueva", "Administración de propiedades"],
    metaTitle: "CAROS para bienes raíces | Respuesta rápida y seguimiento de clientes a largo plazo",
    metaDescription:
      "CAROS ayuda a agentes y equipos inmobiliarios a responder a cada prospecto en segundos, agendar consultas y acompañar a compradores y vendedores durante un largo ciclo de decisión — el sistema operativo de ingresos para bienes raíces.",
    keywords: [
      "gestión de prospectos inmobiliarios",
      "rapidez de respuesta a prospectos inmobiliarios",
      "crm inmobiliario",
      "seguimiento de prospectos para agentes inmobiliarios",
      "desarrollo de prospectos inmobiliarios",
      "respuesta a prospectos compradores y vendedores",
      "embudo para equipos inmobiliarios",
      "retorno de inversión en marketing inmobiliario",
      "reserva de citas inmobiliarias",
      "conversión de prospectos para agentes inmobiliarios",
    ],
    problemTitle: "No necesitas más prospectos. Necesitas responder a los que",
    problemTitleSerif: "ya estás comprando.",
    problemIntro:
      "Los agentes gastan una fortuna en portales, anuncios y fuentes de prospectos — y luego pierden a la mayoría por un seguimiento lento. Desde hace años, los estudios muestran que el agente que responde en minutos gana al cliente, pero el prospecto promedio en línea espera horas por una primera respuesta, si es que llega. La pérdida no está en el volumen de prospectos, sino en la respuesta y el seguimiento.",
    mattersWhen: [
      { label: "Consultas", detail: "importan cuando reciben respuesta en minutos, no en horas, mientras el cliente sigue buscando." },
      { label: "Citas de consulta", detail: "importan cuando realmente se agendan en lugar de quedar como promesas olvidadas." },
      { label: "Seguimiento", detail: "importa cuando mantiene durante meses el interés de compradores y vendedores que aún no están listos." },
      { label: "Inversión en prospectos", detail: "importa cuando puedes ver qué fuentes generan clientes con contrato firmado." },
    ],
    problemClose: {
      text: "CAROS convierte los prospectos por los que ya pagas en",
      gold: "citas agendadas y clientes con contrato firmado.",
    },
    leaksIntro:
      "Nada de esto refleja una falta de capacidad del agente. Son fallas del proceso — vacíos silenciosos en los que un prospecto costoso pierde el interés antes de que alguien establezca una relación.",
    leaks: [
      "Los prospectos de portales y anuncios esperan horas por una primera respuesta — y firman con un agente más rápido.",
      "Las consultas llegan fuera de horario o durante visitas a propiedades y nunca reciben respuesta.",
      "Los compradores y vendedores que aún no están listos reciben una llamada y luego pasan meses sin contacto.",
      "Las citas de consulta se agendan, pero nunca se confirman, y las ausencias desperdician tu día.",
      "Los clientes anteriores vuelven a mudarse y recurren a otro agente porque perdiste el contacto.",
      "Los contactos de tu red y los recomendados nunca reciben un seguimiento sistemático.",
      "Los prospectos dispersos entre portales, correos y mensajes de texto quedan desatendidos.",
      "No puedes saber qué fuentes de prospectos realmente generan operaciones cerradas.",
    ],
    leaksClose:
      "Perder una sola operación puede representar miles en comisiones — y la mayoría de los agentes nunca ve cuántos prospectos costosos perdieron silenciosamente el interés entre la primera consulta y el acuerdo firmado.",
    journeyIntro:
      "Cada cliente recorre el mismo camino desde la primera consulta hasta el cierre y más allá. CAROS hace que ese camino sea constante y visible — para que veas dónde avanzan los clientes y dónde se detienen.",
    journey: ["Consulta", "Respuesta inmediata", "Cita de consulta", "Búsqueda activa / Publicación de propiedad", "Oferta y negociación", "Bajo contrato", "Cierre", "Contacto continuo y recomendaciones"],
    journeyEndLabel: "Clientes con contrato firmado y recomendaciones recurrentes",
    signatureEyebrow: "Respuesta rápida y seguimiento a largo plazo",
    signatureTitle: "Responde en segundos, mantén el contacto durante",
    signatureTitleSerif: "años.",
    signatureBody: [
      "El sector inmobiliario enfrenta dos problemas de ingresos a la vez: los prospectos que necesitan una respuesta inmediata y los que no harán una operación hasta dentro de seis, doce o dieciocho meses. Si fallas en lo primero, pierdes al cliente hoy; si descuidas lo segundo, lo pierdes ante quien mantuvo el contacto.",
      "CAROS se encarga de ambos. Responde las nuevas consultas en segundos y agenda la cita; después mantiene el interés de compradores y vendedores que aún no están listos con un seguimiento constante y de trato personal hasta que decidan dar el paso. Tu base de datos deja de ser un cementerio de contactos y se convierte en un embudo de ventas.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos inmobiliarios",
    signatureUseCases: [
      "Respuesta inmediata a prospectos",
      "Respuesta por mensaje de texto a llamadas perdidas",
      "Reserva de consultas",
      "Seguimiento de compradores a largo plazo",
      "Seguimiento de prospectos vendedores",
      "Contacto continuo con clientes anteriores",
      "Campañas para tu red de contactos y recomendaciones",
      "Mensajes de aniversario de compra y novedades del mercado",
      "Generación de reseñas después del cierre",
      "Reactivación de la base de datos",
      "Atribución del origen de prospectos",
      "Asignación de prospectos al equipo",
    ],
    metrics: [
      { value: "112", label: "Prospectos" },
      { value: "58", label: "Consultas agendadas" },
      { value: "24", label: "Clientes activos" },
      { value: "9", label: "Operaciones cerradas" },
      { value: "$4.2M", label: "Volumen de operaciones cerradas" },
      { value: "8.6x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué fuentes de prospectos realmente generan operaciones cerradas?",
      "¿Qué tan rápido respondemos a los nuevos prospectos?",
      "¿Cuántos prospectos están sin seguimiento?",
      "¿Con cuántos clientes anteriores estamos perdiendo el contacto?",
      "¿Cuál es nuestra tasa de conversión de prospectos en consultas?",
      "¿Qué acciones de seguimiento están reactivando a los prospectos que perdieron el interés?",
      "¿Cómo da seguimiento cada agente del equipo?",
      "¿Dónde perdemos clientes entre la consulta y el acuerdo firmado?",
    ],
    recoveredText:
      "Prospectos costosos de portales y anuncios que habrían perdido el interés — atendidos en segundos, acompañados durante meses y convertidos en consultas agendadas y clientes con contrato firmado.",
    experienceTitle: "Tecnología que te permite enfocarte en",
    experienceTitleSerif: "los clientes, no en la administración.",
    faq: [
      {
        q: "¿CAROS es una plataforma de gestión de operaciones o un MLS?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta y responde a prospectos, agenda consultas y acompaña a compradores y vendedores a lo largo del tiempo. Funciona junto con tu MLS y tus herramientas de operaciones e inmobiliaria.",
      },
      {
        q: "¿Cómo mejora CAROS la rapidez de respuesta a los prospectos?",
        a: "Los nuevos prospectos de cualquier fuente reciben una respuesta automática y personalizada en segundos por mensaje de texto y correo electrónico, y las llamadas perdidas activan una respuesta inmediata por mensaje de texto — para que contactes a los clientes mientras siguen buscando, no horas después.",
      },
      {
        q: "¿CAROS puede dar seguimiento a prospectos que no comprarán ni venderán durante meses?",
        a: "Sí — es una de sus mayores ventajas. CAROS mantiene el interés de compradores y vendedores que aún no están listos con un seguimiento constante, de trato personal y en los momentos adecuados, para que tu base de datos se convierta en una fuente estable de futuras operaciones en lugar de perder vigencia.",
      },
      {
        q: "¿Funciona para un equipo con varios agentes?",
        a: "Sí. CAROS asigna los prospectos al agente adecuado, registra cómo da seguimiento cada persona y ofrece a los líderes del equipo una visión clara de los tiempos de respuesta y del embudo — para que ningún prospecto quede desatendido entre agentes.",
      },
      {
        q: "¿CAROS se integra con mis portales y mi CRM actual?",
        a: "CAROS se conecta con fuentes de prospectos y herramientas habituales de telefonía, calendario y sitios web, y puede ser tu sistema central o funcionar junto con lo que ya tienes. Configuramos las integraciones durante la implementación.",
      },
      {
        q: "¿Qué incluye una Auditoría de Ingresos de CAROS para bienes raíces?",
        a: "Revisamos qué tan rápido reciben respuesta los prospectos, cómo se agendan las consultas, cómo se maneja el seguimiento a largo plazo y dónde pierden el interés los clientes — luego te mostramos exactamente dónde se están perdiendo comisiones en tu embudo.",
      },
    ],
    ctaHeadline: "Descubre dónde se están perdiendo tus ingresos inmobiliarios.",
    ctaSub:
      "Una Auditoría de Ingresos de CAROS te muestra exactamente dónde se están perdiendo prospectos, consultas y clientes anteriores — y qué haría falta para convertir a los prospectos por los que ya pagas.",
    acquisitionItems: ["Captación de prospectos y respuesta inmediata", "Prospectos de portales, Google y Facebook", "Formularios del sitio web y páginas de destino", "Atribución de tu red de contactos y recomendaciones"],
  },
)

/* ==========================================================================
   AGENTES DE VIAJES
   ========================================================================== */

const travelAgents = make(
  {
    trade: "Viajes",
    label: "Agentes de viajes",
    slug: "travel-agents",
    customers: "viajeros",
    customer: "viajero",
    job: "viaje",
    jobs: "viajes",
    estimate: "itinerario",
    estimates: "itinerarios",
    tech: "asesor",
    techs: "asesores",
    site: "viaje",
    callWord: "llamada de planificación",
    bookLabel: "viajes reservados",
  },
  {
    captureTitleSerif: "viaje reservado.",
    captureIntro:
      "Los ingresos por viajes se ganan con la primera respuesta y se pierden mientras el viajero compara opciones. CAROS responde rápido cada consulta de planificación, mantiene vigentes los itinerarios propuestos durante la decisión y acompaña a los viajeros anteriores hacia su próximo viaje — para que las reservas no terminen con el agente que respondió primero.",
    heroEyebrow: "Solución por sector — Agentes de viajes",
    heroTitle: "El viaje se reserva con quien responde mientras el",
    heroTitleSerif: "sueño sigue vivo.",
    heroSub:
      "Los viajeros planean con emoción y reservan cuando sienten el impulso. CAROS responde rápido cada consulta, mantiene vigentes los itinerarios propuestos durante la decisión y hace que los viajeros anteriores regresen para su próximo viaje — para que consigas más reservas sin vivir pendiente de tu bandeja de entrada.",
    trustRow: ["Viajes de lujo", "Lunas de miel", "Viajes grupales y corporativos", "Cruceros", "Bodas de destino"],
    metaTitle: "CAROS para agentes de viajes | Capta consultas y reserva más viajes",
    metaDescription:
      "CAROS ayuda a asesores de viajes a responder rápido cada consulta, dar seguimiento a itinerarios y recuperar a viajeros anteriores para su próximo viaje — el sistema operativo de ingresos para agencias de viajes.",
    keywords: [
      "gestión de prospectos para agentes de viajes",
      "crm para asesores de viajes",
      "seguimiento de itinerarios de viaje",
      "respuesta a prospectos de agencias de viajes",
      "software de reservas para agentes de viajes",
      "seguimiento de prospectos de viajes",
      "prospectos de viajes de luna de miel",
      "retorno de inversión en marketing para agencias de viajes",
      "embudo para asesores de viajes",
      "campañas para viajeros recurrentes",
    ],
    problemTitle: "No pierdes reservas por el precio. Las pierdes por",
    problemTitleSerif: "la respuesta tardía.",
    problemIntro:
      "Un viajero que sueña con un viaje está más dispuesto a reservar justo cuando te contacta. Pero suele escribir a varios asesores y consultar opciones en línea a la vez, y el entusiasmo se desvanece rápido. El asesor que responde mientras el sueño sigue vivo — y mantiene el itinerario en marcha — gana la reserva. Los demás reciben un 'decidimos reservar en línea'.",
    mattersWhen: [
      { label: "Consultas", detail: "importan cuando reciben respuesta mientras el viajero sigue entusiasmado, no dos días después." },
      { label: "Itinerarios", detail: "importan cuando reciben seguimiento en lugar de dejar que el viajero decida en silencio." },
      { label: "Anticipos", detail: "importan cuando los viajeros reciben recordatorios amables antes de que cambie la tarifa o la habitación disponible." },
      { label: "Viajeros anteriores", detail: "importan cuando regresan para su próximo viaje en lugar de quedar en el olvido." },
    ],
    problemClose: {
      text: "CAROS mantiene cada consulta, itinerario y viajero anterior avanzando hacia",
      gold: "un viaje reservado y pagado.",
    },
    leaksIntro:
      "Nada de esto refleja una falta de capacidad de un gran asesor. Son fallas del proceso — vacíos silenciosos en los que un viajero entusiasmado pierde el interés y reserva sin ti.",
    leaks: [
      "Las consultas esperan un día mientras el entusiasmo del viajero se desvanece — o reserva en línea.",
      "Se envían los itinerarios propuestos y el viajero deja de responder, sin que nadie dé seguimiento.",
      "Las cotizaciones vencen porque nadie avisó al viajero antes de que cambiaran los precios.",
      "Las consultas fuera de horario — a menudo cuando la gente sueña y planea — se pierden por completo.",
      "Los viajeros anteriores planean su próximo viaje y nunca se les ocurre llamarte.",
      "Las recomendaciones de clientes satisfechos nunca se registran ni se solicitan.",
      "Los anticipos y pagos finales quedan pendientes de un recordatorio que nadie envió.",
      "No puedes saber qué anuncios, recomendaciones o canales realmente generan viajes reservados.",
    ],
    leaksClose:
      "Perder una sola luna de miel o un viaje grupal de lujo puede representar miles en comisiones — y la mayoría de las agencias nunca ve cuántos viajeros entusiasmados reservaron silenciosamente en otro lugar.",
    journeyIntro:
      "Cada viaje recorre el mismo camino desde el primer sueño hasta la bienvenida a casa. CAROS hace que ese camino sea constante y visible — para que veas dónde reservan los viajeros y dónde se alejan.",
    journey: ["Consulta", "Respuesta rápida", "Llamada de planificación", "Itinerario y cotización", "Seguimiento", "Anticipo y reserva", "El viaje", "Bienvenida a casa y recomendaciones"],
    journeyEndLabel: "Viajes reservados y viajeros recurrentes",
    signatureEyebrow: "Viajes recurrentes y por recomendación",
    signatureTitle: "El próximo viaje siempre debería volver",
    signatureTitleSerif: "a ti.",
    signatureBody: [
      "Ganar a un viajero por primera vez es difícil y costoso. La verdadera rentabilidad está en el segundo, tercer y quinto viaje — y en los amigos que recomienda. Sin embargo, la mayoría de los asesores está tan ocupada con las reservas activas que los viajeros anteriores se alejan y vuelven a reservar silenciosamente en línea o con quien les escribió primero.",
      "CAROS automatiza los viajes recurrentes y por recomendación: mensajes de bienvenida a casa, recordatorios de viajes de aniversario, ofertas de temporada adaptadas al estilo del viajero y solicitudes sencillas de recomendaciones en el momento de mayor satisfacción — justo después de un gran viaje. Tu lista de clientes se convierte en un motor de reservas en lugar de un archivo de contactos.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos por viajes",
    signatureUseCases: [
      "Respuesta rápida a consultas",
      "Reserva de llamadas de planificación",
      "Seguimiento de itinerarios",
      "Recordatorios de anticipos y pagos",
      "Avisos sobre cambios de precio",
      "Mensajes de bienvenida a casa",
      "Campañas de viajes de aniversario",
      "Ofertas de temporada y por destino",
      "Generación de reseñas",
      "Campañas de recomendaciones",
      "Reactivación de viajeros anteriores",
      "Atribución de origen",
    ],
    metrics: [
      { value: "73", label: "Consultas" },
      { value: "46", label: "Llamadas de planificación" },
      { value: "34", label: "Itinerarios enviados" },
      { value: "21", label: "Viajes reservados" },
      { value: "$196,000", label: "Valor de viajes reservados" },
      { value: "8.2x", label: "Retorno de inversión en marketing", highlight: true },
    ],
    questions: [
      "¿Qué canales realmente generan viajes reservados?",
      "¿Qué tan rápido respondemos las nuevas consultas?",
      "¿Cuántos itinerarios siguen pendientes de seguimiento?",
      "¿Qué cotizaciones están por perder la vigencia de sus precios?",
      "¿Cuál es nuestra tasa de conversión de consultas en reservas?",
      "¿Cuántos viajeros anteriores están listos para su próximo viaje?",
      "¿Qué destinos y temporadas tienen pocas reservas?",
      "¿Dónde perdemos reservas entre la consulta y el anticipo?",
    ],
    recoveredText:
      "Consultas que habrían perdido impulso e itinerarios que habrían quedado en el olvido — atendidos, con seguimiento y convertidos en viajes reservados y pagados.",
    experienceTitle: "Tecnología que te permite enfocarte en el",
    experienceTitleSerif: "viaje.",
    faq: [
      {
        q: "¿CAROS es una plataforma de reservas o un GDS?",
        a: "No. CAROS es un sistema de captación de clientes y operaciones de ingresos. Capta consultas, agenda llamadas de planificación, da seguimiento a itinerarios y hace que regresen los viajeros anteriores. Funciona junto con los motores de reserva y las herramientas de proveedores que ya usas.",
      },
      {
        q: "¿Cómo me ayuda CAROS a convertir más prospectos en reservas?",
        a: "Responde rápido cada consulta mientras el viajero sigue entusiasmado, agenda la llamada de planificación y da seguimiento automático a los itinerarios propuestos — para que menos personas se alejen y reserven su viaje soñado en línea o con un asesor más rápido.",
      },
      {
        q: "¿CAROS puede hacer que regresen los viajeros anteriores?",
        a: "Sí — es una de sus mayores ventajas. CAROS automatiza los mensajes de bienvenida a casa, los recordatorios de viajes de aniversario y las ofertas de temporada adaptadas a cada viajero, convirtiendo tu lista de clientes anteriores en una fuente constante de reservas recurrentes y por recomendación.",
      },
      {
        q: "¿Mi comunicación seguirá sintiéndose personal?",
        a: "Sí. Cada mensaje se envía con tu nombre y tu tono, y puedes intervenir en cualquier conversación en cualquier momento. CAROS se encarga de los tiempos y la constancia; tú mantienes el trato personal.",
      },
      {
        q: "¿CAROS funciona con mi calendario, correo electrónico y sitio web?",
        a: "CAROS se conecta con herramientas habituales de calendario, correo electrónico, sitios web y pagos, y puede ser tu sistema central o funcionar junto con lo que ya tienes. Configuramos las integraciones durante la implementación.",
      },
      {
        q: "¿Qué incluye una Auditoría de Ingresos de CAROS para una agencia de viajes?",
        a: "Revisamos qué tan rápido se responden las consultas, cómo se da seguimiento a los itinerarios, cómo se reactiva a los viajeros anteriores y dónde se estancan las reservas — luego te mostramos exactamente dónde se están perdiendo comisiones en tu embudo.",
      },
    ],
    ctaHeadline: "Descubre dónde se están perdiendo tus reservas de viajes.",
    ctaSub:
      "Una Auditoría de Ingresos de CAROS te muestra exactamente dónde se están perdiendo consultas, itinerarios y viajeros anteriores — y qué haría falta para conseguir más reservas.",
    acquisitionItems: ["Captación de consultas y respuesta rápida", "Captación de prospectos de Google y Facebook", "Formularios del sitio web y páginas de destino", "Registro y atribución de recomendaciones"],
  },
)

/* ==========================================================================
   SPAS DE BIENESTAR
   ========================================================================== */

const wellnessSpas = make(
  {
    trade: "Spas de bienestar", slug: "wellness-spas", customers: "visitantes", customer: "visitante",
    job: "cita", jobs: "citas", estimate: "consulta", estimates: "consultas",
    tech: "especialista", techs: "especialistas", site: "spa", callWord: "consulta", bookLabel: "citas reservadas",
  },
  {
    heroEyebrow: "Solución por sector — Spas de bienestar",
    heroTitle: "La experiencia del visitante comienza antes de que",
    heroTitleSerif: "entre al spa.",
    heroSub: "CAROS ofrece a cada visitante un recorrido fluido y cuidado desde el descubrimiento hasta su próxima reserva — protegiendo la experiencia de calma y calidad superior que hace que valga la pena volver a tu spa.",
    visualTheme: "luxury",
    trustRow: ["Spas de día", "Spas médicos", "Membresías", "Piel y cuerpo", "Recuperación"],
    metaTitle: "CAROS para spas y bienestar | Recuperación de reservas y retención de miembros",
    metaDescription: "Llena las cabinas de tratamiento vacías, recupera cancelaciones y retén a los miembros con la automatización de ingresos de CAROS para spas.",
    keywords: ["software para spas de bienestar", "seguimiento de citas de spa", "gestión de prospectos para spas médicos", "retención de membresías de spa", "retorno de inversión en marketing para spas"],
    problemTitle: "Una cabina de tratamiento ocupada aún no garantiza",
    problemTitleSerif: "ingresos saludables.",
    problemIntro: "Los spas pierden ingresos en el espacio entre una consulta, una primera cita, un plan recomendado y la siguiente visita. CAROS mantiene en marcha ese recorrido del visitante con un seguimiento oportuno y personal.",
    mattersWhen: [
      { label: "11:00 — El ritual de las dos", detail: "Un visitante cancela un tratamiento facial exclusivo con el tiempo justo para recuperar la cita. CAROS ofrece el horario a un visitante compatible de la lista de espera sin hacer que la experiencia se sienta como una simple transacción." },
      { label: "Después del tratamiento — La venta adicional discreta", detail: "Un visitante sale radiante después de un servicio de $120. Una recomendación cuidadosa de productos y un ritual de cuidado convierten el resultado en una visita de $180 sin presionar para vender al momento de pagar." },
      { label: "Día 30 — El miembro que dejó de venir", detail: "Un miembro no ha reservado desde que se inscribió. CAROS identifica la necesidad de retomar la relación antes de que cancele su membresía y lo invita a regresar con una recomendación que se siente personal." },
      { label: "La tarjeta de regalo que se convirtió en un ritual", detail: "Un visitante nuevo canjea una tarjeta de regalo un sábado. Una bienvenida cálida y una invitación a volver a reservar en el momento perfecto convierten una visita prepagada en una nueva rutina." },
    ],
    problemClose: { text: "CAROS conecta el recorrido del visitante para generar", gold: "ingresos recurrentes de bienestar." },
    leaksIntro: "Las pérdidas más costosas suelen ser silenciosas: una consulta que espera, un paquete al que nunca se da seguimiento o un visitante que simplemente olvida volver.",
    leaks: ["Las consultas web esperan hasta que recepción tenga un momento libre.", "Las recomendaciones de las consultas no se convierten en tratamientos reservados.", "Los interesados en membresías se van sin recibir seguimiento oportuno.", "No se vuelve a agendar a los visitantes que faltaron a su cita con un trato personal.", "Los visitantes anteriores no reciben mensajes de temporada ni por ocasiones especiales.", "Es fácil pasar por alto los saldos de los paquetes y las fechas de renovación.", "Las oportunidades por recomendación no se atribuyen al visitante o especialista correcto."],
    leaksClose: "Unas cuantas reservas de seguimiento perdidas cada semana pueden superar silenciosamente el costo de todas las campañas nuevas que lanzas.",
    journeyIntro: "CAROS hace visible y constante el camino de la curiosidad al bienestar recurrente.",
    journey: ["Reserva", "Tratamiento", "Recomendación de productos", "Nueva reserva", "Membresía", "Canje de tarjeta de regalo", "Recomendación"],
    journeyEndLabel: "Flujo del día en el spa: cabinas llenas y miembros que regresan",
    signatureEyebrow: "Ingresos por retención de visitantes",
    signatureTitle: "El mejor marketing para un spa es el visitante que",
    signatureTitleSerif: "regresa.",
    signatureBody: ["Una primera visita es una oportunidad, no la meta final. El seguimiento adecuado ayuda al visitante a entender cuál es el siguiente paso y hace que volver se sienta natural.", "CAROS evita que las nuevas reservas, membresías, paquetes y recomendaciones dependan solo de la memoria, mientras tu equipo se mantiene enfocado en el cuidado."],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos del spa",
    signatureUseCases: ["Respuesta a consultas", "Seguimiento de consultas", "Recordatorios del plan de tratamiento", "Seguimiento de interesados en membresías", "Recuperación de citas no atendidas", "Avisos de renovación de paquetes", "Campañas de cumpleaños y ocasiones especiales", "Solicitudes de reseñas", "Atribución de recomendaciones", "Reactivación de visitantes inactivos"],
    metrics: [{ value: "$500+", label: "Ingresos protegidos / Cancelación recuperada" }, { value: "$1,200", label: "Valor anual / Miembro retenido" }, { value: "47%", label: "Reservas después de las 6 PM" }, { value: "60%", label: "Ausencias: visitantes nuevos" }, { value: "34%", label: "Aumento del gasto en productos con seguimiento" }, { value: "Primer mes", label: "Potencial de recuperación de la inversión", highlight: true }],
    questions: ["¿Qué campañas generan primeras visitas?", "¿Cuántas consultas nunca se convierten en planes de tratamiento?", "¿Qué visitantes ya deberían volver a reservar?", "¿Cuál es nuestra tasa de conversión a membresías?", "¿Dónde se pierden las oportunidades de recuperar a quienes faltan a sus citas?", "¿Qué especialistas generan visitas recurrentes?"],
    recoveredText: "Visitantes que se habrían alejado — con nuevas reservas, renovaciones y recomendaciones gracias a una experiencia constante.",
    experienceTitle: "Tecnología que protege el",
    experienceTitleSerif: "trato humano.",
    faq: [
      { q: "¿CAROS es un sistema de reservas para spas?", a: "CAROS funciona junto con tus herramientas de reservas y pagos. Se enfoca en la capa de ingresos que las rodea: consultas, seguimiento, nuevas reservas, membresías y las relaciones con visitantes que generan visitas recurrentes." },
      { q: "¿Puede trabajar con membresías y paquetes?", a: "Sí. CAROS puede organizar los momentos de renovación, uso y seguimiento para que los visitantes reciban comunicaciones relevantes sin que tu equipo tenga que mantener otra lista manual." },
      { q: "¿Los mensajes se sentirán automatizados?", a: "Los mensajes se configuran según el tono de tu marca y la experiencia del visitante. CAROS se encarga de la constancia y los tiempos, mientras tu equipo puede intervenir en cualquier conversación." },
      { q: "¿Qué revisa una Auditoría de Ingresos para un spa de bienestar?", a: "Revisamos la rapidez de respuesta, la conversión de consultas, las nuevas reservas, el seguimiento de membresías, la recuperación de citas no atendidas y la reactivación de visitantes anteriores para mostrar dónde se están dejando de generar ingresos." },
    ],
    ctaHeadline: "Descubre dónde se están perdiendo los ingresos de tu spa",
    ctaSub: "Agenda una revisión de ingresos para ver cómo las cancelaciones, la venta de productos, las membresías y las tarjetas de regalo pueden proteger más ingresos.",
    acquisitionItems: ["Captación de consultas en el sitio web", "Captación de prospectos de Google y redes sociales", "Registro de recomendaciones", "Atribución del origen de campañas"],
  },
)

/* ==========================================================================
   CONSULTORIOS MÉDICOS
   ========================================================================== */
const medicalPractices = make(
  {
    trade: "Consultorios médicos", slug: "medical-practices", customers: "pacientes", customer: "paciente",
    job: "cita", jobs: "citas", estimate: "consulta", estimates: "consultas",
    tech: "integrante del equipo de atención", techs: "integrantes del equipo de atención", site: "consultorio", callWord: "consulta de paciente", bookLabel: "visitas agendadas",
  },
  {
    heroEyebrow: "Solución por sector — Consultorios médicos",
    heroTitle: "Una llamada perdida es un paciente perdido. Un paciente perdido es",
    heroTitleSerif: "atención que no se brinda.",
    heroSub: "Mientras tu recepción prioriza la atención en una sala de espera llena, CAROS responde al siguiente paciente, recopila el contexto clínico que tu equipo necesita y encamina la visita hacia un siguiente paso seguro y agendado.",
    visualTheme: "clinical",
    trustRow: ["Atención primaria", "Atención especializada", "Odontología", "Medicina del bienestar", "Múltiples sedes"],
    metaTitle: "CAROS para consultorios médicos | Captación y retención de pacientes",
    metaDescription: "Deja de perder pacientes por el buzón de voz. CAROS registra llamadas, reduce las inasistencias y automatiza el seguimiento para consultorios médicos y odontológicos.",
    keywords: ["sistema de crecimiento para consultorios médicos", "seguimiento de citas de pacientes", "gestión de contactos potenciales en salud", "retorno de inversión en marketing para consultorios médicos", "reactivación de pacientes"],
    problemTitle: "Una mayor demanda no ayuda si los pacientes no encuentran",
    problemTitleSerif: "el siguiente paso.",
    problemIntro: "El crecimiento de un consultorio depende del acceso: de la rapidez con que un posible paciente recibe una respuesta, de la constancia del seguimiento de una derivación y de si una cita disponible se convierte en una visita realizada.",
    mattersWhen: [
      { label: "08:45 — Dolor en el pecho, una llamada", detail: "Un paciente llama antes de que abra el consultorio. El personal de enfermería está preparando a otra persona para su consulta, la llamada pasa al buzón de voz y el paciente busca otro consultorio con disponibilidad para ese mismo día. CAROS registra la solicitud, deja constancia de la urgencia para que el personal la revise y asegura el seguimiento de la devolución de llamada." },
      { label: "12:10 — La sala de consulta vacía", detail: "Una inasistencia deja a un profesional y una sala sin actividad durante el almuerzo. CAROS ya había enviado la secuencia de recordatorios y señala el espacio libre para que se ocupe ese mismo día, en lugar de dejar que se pierda capacidad de atención." },
      { label: "18:40 — Registro fuera de horario", detail: "Un padre o una madre envía información sobre síntomas y seguro médico después del cierre. CAROS confirma la recepción, comunica qué esperar y deja preparado el seguimiento adecuado para el equipo de la mañana." },
      { label: "Viernes — La derivación sin responsable", detail: "Una derivación a un especialista llega a una bandeja compartida sin una transferencia clara. CAROS asigna el siguiente paso, da seguimiento a la programación y evita que el paciente quede olvidado en un fax." },
    ],
    problemClose: { text: "CAROS ayuda a tu consultorio a convertir el acceso en", gold: "un crecimiento medible de pacientes." },
    leaksIntro: "Las fugas de ingresos de un consultorio suelen ser operativas, no clínicas: la llamada que no se devuelve, la derivación sin responsable y el paciente que nunca recibe un recordatorio.",
    leaks: ["Las llamadas de pacientes nuevos llegan al buzón de voz durante las horas de mayor actividad.", "Los registros de derivaciones quedan sin seguimiento para agendar una cita.", "Los formularios en línea no reciben una respuesta oportuna.", "Los pacientes posponen su atención y nunca se les invita a regresar.", "Las listas de pacientes que deben volver a consulta dependen del trabajo manual y de una asignación irregular de responsables.", "Las inasistencias no se recuperan mediante nuevas citas.", "Los informes de marketing muestran contactos potenciales, pero no visitas realizadas."],
    leaksClose: "Cuando el acceso genera incertidumbre, los pacientes eligen el consultorio que facilita más el siguiente paso.",
    journeyIntro: "CAROS hace visible el recorrido de acceso del paciente sin reemplazar los sistemas clínicos ni el criterio clínico.",
    journey: ["Búsqueda en línea", "Llamada atendida por CAROS", "Cita agendada", "Recordatorio enviado", "Visita realizada", "Reseña solicitada", "Recordatorio para volver a agendar"],
    journeyEndLabel: "Recorrido del paciente: visitas realizadas y atención recurrente",
    signatureEyebrow: "Ingresos vinculados al acceso de pacientes",
    signatureTitle: "La atención que los pacientes completan es la base sobre la que tu consultorio",
    signatureTitleSerif: "puede crecer.",
    signatureBody: ["Quien no logra comunicarse con el consultorio quizá nunca se convierta en paciente. Un paciente que se va sin una ruta clara de seguimiento quizá no regrese.", "CAROS coordina la comunicación y la asignación de responsabilidades relacionadas con el acceso para que tu personal pueda dedicar más tiempo a los pacientes que tiene enfrente."],
    signatureListLabel: "Dónde CAROS impulsa el crecimiento del consultorio",
    signatureUseCases: ["Respuesta a pacientes nuevos", "Seguimiento de derivaciones", "Recordatorios de citas", "Recuperación de inasistencias", "Campañas para pacientes que deben volver a consulta", "Siguientes pasos del plan de atención", "Solicitudes de reseñas", "Derivación por sede", "Atribución de origen", "Reactivación de pacientes inactivos"],
    metrics: [{ value: "$1,200+", label: "Valor anual / Paciente nuevo" }, { value: "2", label: "Pacientes adicionales / Mes" }, { value: "40%", label: "Reducción de inasistencias" }, { value: "24h", label: "Plazo para solicitar una reseña" }, { value: "$250", label: "Ganancia / Sillón disponible" }, { value: "Se paga solo", label: "Con dos pacientes adicionales", highlight: true }],
    questions: ["¿Con qué rapidez reciben una respuesta los pacientes nuevos?", "¿Qué fuentes de derivación generan visitas realizadas?", "¿Cuántas inasistencias se recuperan?", "¿Qué profesionales o sedes necesitan más demanda?", "¿Cuántas oportunidades de volver a consulta siguen pendientes?", "¿Dónde se estanca el recorrido del paciente?"],
    recoveredText: "Consultas de pacientes, derivaciones, convocatorias para volver a consulta y citas que se habrían estancado: asignadas, con seguimiento y completadas.",
    experienceTitle: "Tecnología que hace que el acceso se sienta",
    experienceTitleSerif: "humano.",
    faq: [
      { q: "¿CAROS reemplaza nuestro expediente clínico electrónico o sistema de gestión del consultorio?", a: "No. CAROS trabaja en torno a los sistemas que ya usas y organiza la comunicación, el seguimiento, la atribución y los flujos de acceso que esos sistemas quizá no gestionen de principio a fin." },
      { q: "¿CAROS puede manejar información sensible de pacientes?", a: "La implementación debe configurarse según tus requisitos de cumplimiento normativo y tus sistemas aprobados. CAROS está diseñado para apoyar la comunicación operativa, no para reemplazar la documentación clínica ni la orientación médica." },
      { q: "¿Puede ayudar con las derivaciones y los llamados para volver a consulta?", a: "Sí. CAROS puede asignar un responsable, un siguiente paso y una frecuencia de seguimiento a cada derivación u oportunidad de volver a consulta, para que menos pacientes se pierdan entre la intención y la cita." },
      { q: "¿Qué revisa una auditoría de ingresos para consultorios médicos?", a: "Revisamos la rapidez de acceso, la gestión de derivaciones, la conversión en citas, la recuperación de inasistencias, los flujos para volver a consulta y la atribución de origen para identificar dónde se pierde crecimiento del consultorio." },
    ],
    ctaHeadline: "Consulta tu informe de pérdida de pacientes",
    ctaSub: "Agenda una auditoría del consultorio para descubrir dónde las llamadas, los espacios libres en la agenda, las inasistencias y las reseñas le están costando ingresos a tu consultorio.",
    acquisitionItems: ["Captación desde el sitio web y consultas de pacientes", "Seguimiento de fuentes de derivación", "Atribución de Google y campañas", "Derivación por sede y profesional"],
  },
)

/* ==========================================================================
   SERVICIOS FINANCIEROS
   ========================================================================== */

const financialServices = make(
  {
    trade: "Servicios financieros", slug: "financial-services", customers: "clientes potenciales", customer: "cliente potencial",
    job: "conversación", jobs: "conversaciones", estimate: "propuesta", estimates: "propuestas",
    tech: "asesor", techs: "asesores", site: "firma", callWord: "consulta", bookLabel: "contrataciones calificadas",
  },
  {
    heroEyebrow: "Solución por sector — Servicios financieros",
    heroTitle: "El cliente más valioso de la sala nunca debería sentirse",
    heroTitleSerif: "apresurado.",
    heroSub: "CAROS prepara discretamente la información adecuada, cuida cada seguimiento y le da a tu equipo de asesores más espacio para brindar la atención que esperan las relaciones de alto valor.",
    visualTheme: "discreet",
    trustRow: ["Gestión patrimonial", "Planificación financiera", "Créditos", "Asesoría fiscal", "Seguros y riesgos"],
    metaTitle: "CAROS para asesores financieros | Calificación e incorporación de clientes potenciales",
    metaDescription: "Califica al instante a clientes potenciales de alto patrimonio, recopila documentos más rápido y no pierdas ninguna llamada de diagnóstico con CAROS.",
    keywords: ["seguimiento de clientes potenciales para asesores financieros", "CRM de servicios financieros", "gestión de clientes potenciales en gestión patrimonial", "retorno de inversión en marketing para asesores", "captación de clientes de planificación financiera"],
    problemTitle: "Tus clientes potenciales están decidiendo sobre",
    problemTitleSerif: "la confianza antes que el precio.",
    problemIntro: "Las decisiones financieras llevan tiempo, pero un seguimiento lento o poco claro genera dudas. CAROS ayuda a las firmas a mantener su presencia entre la primera consulta y la contratación firmada, sin convertir la construcción de relaciones en un ejercicio de hojas de cálculo.",
    mattersWhen: [
      { label: "La consulta discreta de $2M", detail: "Un alto ejecutivo envía una consulta discreta desde un dispositivo personal. CAROS confirma su recepción sin llamar la atención, recopila solo el contexto adecuado y canaliza una respuesta bien considerada hacia el asesor correspondiente." },
      { label: "La reunión que se siente preparada", detail: "Antes de la llamada de diagnóstico, los documentos solicitados llegan en una secuencia privada y ordenada. El asesor llega con contexto, en lugar de pedirle al cliente que repita su historia." },
      { label: "La reserva de agenda que protege la confianza", detail: "Un cliente potencial con alta intención no puede asistir en el primer horario ofrecido. CAROS preserva la relación con una secuencia discreta, en lugar de dejar que se pierda una conversación de alto valor." },
      { label: "La presentación hecha con cuidado", detail: "Un cliente menciona a un colega durante una revisión de un hito importante. CAROS ayuda al asesor a dar seguimiento con la discreción adecuada, preservando el carácter personal de la recomendación." },
    ],
    problemClose: { text: "CAROS convierte la actividad dispersa de los clientes potenciales en", gold: "avances visibles en las relaciones." },
    leaksIntro: "En los servicios financieros, la fuga de ingresos rara vez se debe a un solo clic perdido. Es la acumulación de preguntas sin respuesta y siguientes pasos sin definir.",
    leaks: ["Una consulta de alta intención espera a que el asesor esté disponible.", "Las notas de diagnóstico no generan un plan de seguimiento con responsables.", "Se envía una propuesta sin una ruta estructurada de decisión.", "Los clientes potenciales reciben un acompañamiento desigual entre asesores.", "Las recomendaciones se reconocen tarde o no se atribuyen.", "No se contacta a los clientes actuales en torno a hitos de planificación.", "Se informa sobre la actividad de marketing sin vincularla con relaciones que se concretan."],
    leaksClose: "Cuando la experiencia genera incertidumbre, los clientes potenciales posponen su decisión, y otra firma puede aprovechar fácilmente esas decisiones pendientes.",
    journeyIntro: "CAROS le da al recorrido de la relación un ritmo operativo confiable, mientras deja el asesoramiento y el criterio en manos de tus asesores.",
    journey: ["Consulta recibida", "CAROS califica en <60s", "Llamada de diagnóstico agendada", "Documentos recopilados", "Propuesta entregada", "Incorporación completada", "Secuencia de revisión trimestral", "Solicitud de recomendación"],
    journeyEndLabel: "Recorrido patrimonial: hogares que contratan e ingresos por activos bajo gestión",
    signatureEyebrow: "Ingresos por crecimiento de relaciones",
    signatureTitle: "El próximo cliente a menudo ya está en tu",
    signatureTitleSerif: "red de contactos.",
    signatureBody: ["La confianza se construye con los detalles: recordar la recomendación, dar seguimiento después de una propuesta y contactar antes de que una necesidad de planificación se vuelva urgente.", "CAROS genera los avisos, la asignación de responsables y la visibilidad que ayudan a los asesores a cuidar esos detalles a escala."],
    signatureListLabel: "Dónde CAROS impulsa el crecimiento de la asesoría",
    signatureUseCases: ["Confirmación de recepción de consultas", "Seguimiento del diagnóstico", "Acompañamiento de propuestas", "Atribución de recomendaciones", "Contacto por hitos del cliente", "Recordatorios de revisión anual", "Reactivación de clientes potenciales inactivos", "Seguimiento de eventos", "Atribución de origen", "Visibilidad de la carga de trabajo de los asesores"],
    metrics: [{ value: "$50,000", label: "Valor de activos bajo gestión / Hogar calificado" }, { value: "12+", label: "Documentos / Cliente nuevo" }, { value: "<60s", label: "Calificación de clientes potenciales" }, { value: "$2M", label: "Activos en una consulta de 'solo estoy viendo'" }, { value: "$15k–$50k", label: "Ingresos anuales / Hogar" }, { value: "La más económica", label: "Póliza de seguro que contratarás", highlight: true }],
    questions: ["¿Qué fuentes generan clientes potenciales calificados?", "¿Con qué rapidez recibe cada consulta una respuesta personal?", "¿Qué propuestas esperan un siguiente paso?", "¿Dónde pierden confianza los clientes potenciales?", "¿A qué clientes les corresponde una conversación de planificación?", "¿Cuánto crecimiento proviene de las recomendaciones?"],
    recoveredText: "Clientes potenciales y recomendaciones que habrían perdido interés: atendidos, acompañados y encaminados a la conversación con el asesor adecuado.",
    experienceTitle: "Tecnología que refuerza",
    experienceTitleSerif: "la confianza ganada.",
    faq: [
      { q: "¿CAROS es un sistema de planificación financiera o de gestión de portafolios?", a: "No. CAROS es la capa operativa de ingresos que rodea tu proceso de asesoría. Ayuda a gestionar las respuestas a consultas, el seguimiento, el avance de las propuestas, las recomendaciones y la reactivación de clientes, mientras tus sistemas existentes se ocupan del trabajo financiero." },
      { q: "¿Las comunicaciones cumplirán la normativa y estarán aprobadas por los asesores?", a: "Tu equipo define los mensajes aprobados, los flujos de trabajo y los puntos de revisión. CAROS puede automatizar los tiempos y la asignación de tareas, pero las firmas siguen siendo responsables del cumplimiento normativo, la supervisión y el asesoramiento que brindan." },
      { q: "¿Puede funcionar con varios asesores?", a: "Sí. CAROS puede canalizar consultas, recomendaciones y seguimientos según el asesor, la línea de servicio, la ubicación o la fuente, de modo que cada cliente potencial tenga un responsable claro." },
      { q: "¿Qué revisa una auditoría de ingresos para servicios financieros?", a: "Revisamos las respuestas a consultas, la conversión de llamadas de diagnóstico, el seguimiento de propuestas, la gestión de recomendaciones, la asignación de asesores y la atribución de origen para revelar dónde pierden impulso las relaciones." },
    ],
    ctaHeadline: "Audita la experiencia de tus clientes potenciales",
    ctaSub: "Agenda una revisión de tu firma para descubrir dónde los clientes potenciales calificados, los documentos, las llamadas de diagnóstico y las recomendaciones están perdiendo impulso.",
    acquisitionItems: ["Captación desde el sitio web y consultas", "Registro de fuentes de recomendación", "Atribución de campañas y eventos", "Derivación por asesor y línea de servicio"],
  },
)

/* ==========================================================================
   CORRETAJE DE SEGUROS
   ========================================================================== */

const insuranceBrokerage = make(
  {
    trade: "Corretaje de seguros", slug: "insurance-brokerage", customers: "titulares de pólizas", customer: "titular de póliza",
    job: "conversación", jobs: "conversaciones", estimate: "cotización", estimates: "cotizaciones",
    tech: "agente de seguros", techs: "agentes de seguros", site: "oficina", callWord: "consulta de cobertura", bookLabel: "pólizas contratadas",
  },
  {
    heroEyebrow: "Solución por sector — Corretaje de seguros",
    heroTitle: "Cada cotización tiene un ganador. Asegúrate de que",
    heroTitleSerif: "no sea el otro corredor.",
    heroSub: "CAROS responde antes de que comience la comparación de opciones, mantiene cada propuesta en movimiento y les da a tus agentes la ventaja de seguimiento más sólida del mercado.",
    visualTheme: "competitive",
    trustRow: ["Seguros personales", "Seguros comerciales", "Beneficios", "Vida y salud", "Agencias independientes"],
    metaTitle: "CAROS para corredores de seguros | Seguimiento de cotizaciones y renovaciones",
    metaDescription: "Los clientes potenciales de seguros pierden interés rápidamente. CAROS responde al instante, da seguimiento a las cotizaciones y protege tu cartera de renovaciones.",
    keywords: ["gestión de clientes potenciales para corredores de seguros", "seguimiento de cotizaciones de seguros", "retención de renovaciones de agencias", "CRM para agentes de seguros", "retorno de inversión en marketing de seguros"],
    problemTitle: "Una cotización competitiva no gana sin",
    problemTitleSerif: "un seguimiento constante.",
    problemIntro: "Los ingresos por seguros dependen del momento oportuno y la confianza: responder una pregunta de cobertura, explicar la cotización, dar seguimiento antes del vencimiento y mantener la presencia después de que se contrate la póliza.",
    mattersWhen: [
      { label: "19:42 — La cotización de cobertura adicional", detail: "Un propietario solicita una cobertura adicional de responsabilidad civil después de cenar. Tu agente la ve a la mañana siguiente; un competidor responde en cuatro minutos con una comparación clara y se queda con la conversación." },
      { label: "Día 60 — La carrera por la renovación", detail: "Una cuenta comercial entra en el período de renovación mientras tu equipo está saturado de endosos. CAROS inicia la revisión antes de que mantener al proveedor actual se convierta en una invitación a buscar otras opciones." },
      { label: "La brecha de cobertura que encontró tu competidor", detail: "Un vehículo nuevo y un negocio en crecimiento crean dos oportunidades de venta cruzada. Sin un aviso, otro corredor las descubre primero durante una revisión de rutina." },
      { label: "La recomendación que merecía una respuesta inmediata", detail: "Un titular de póliza importante presenta a un colega por mensaje de texto. CAROS canaliza la recomendación al instante, reconoce la fuente y mantiene la primera respuesta a la altura de la presentación." },
    ],
    problemClose: { text: "CAROS ayuda a las corredurías a proteger el valor total de", gold: "cada relación vinculada a una póliza." },
    leaksIntro: "Las fugas en una correduría ocurren en las transferencias: un cliente potencial entre marketing y un agente, una cotización entre el correo y la decisión, o una renovación entre atención y ventas.",
    leaks: ["Las consultas de cobertura esperan mientras los agentes están con clientes.", "El seguimiento de cotizaciones depende de la memoria de cada persona.", "Las solicitudes comerciales pierden impulso entre pedidos de información de ida y vuelta.", "Las conversaciones de renovación empiezan demasiado tarde para proteger la relación.", "Las oportunidades de venta cruzada quedan enterradas en los registros de las pólizas.", "No se rastrean las fuentes de recomendación desde la presentación hasta la contratación de la póliza.", "Los informes de marketing muestran consultas, pero no comisiones retenidas."],
    leaksClose: "Una póliza no renovada no es solo una transacción perdida: es una relación y una vía de futuras recomendaciones que pueden desaparecer durante años.",
    journeyIntro: "CAROS da a cada oportunidad un siguiente paso visible, desde la primera pregunta de cobertura hasta la renovación y la recomendación.",
    journey: ["Cotización solicitada", "CAROS responde en <60s", "Evaluación de necesidades agendada", "Propuesta enviada", "Secuencia de seguimiento activa", "Póliza contratada", "Inicio de la secuencia de renovación", "Solicitud de recomendación enviada"],
    journeyEndLabel: "Ciclo de vida de la póliza: ingresos por comisiones retenidas",
    signatureEyebrow: "Ingresos por renovación y retención",
    signatureTitle: "La póliza más valiosa es la que",
    signatureTitleSerif: "se queda contigo.",
    signatureBody: ["Los negocios nuevos son visibles. Los ingresos por renovación a menudo se protegen discretamente, mediante conversaciones anticipadas, revisiones útiles y recordatorios oportunos.", "CAROS mantiene a los agentes y a los equipos de atención alineados en los momentos que preservan la confianza, descubren necesidades y generan presentaciones."],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos de la correduría",
    signatureUseCases: ["Respuesta a consultas de cobertura", "Seguimiento de cotizaciones", "Recordatorios del estado de solicitudes", "Campañas de renovación", "Avisos para revisar pólizas", "Oportunidades de venta cruzada", "Atribución de recomendaciones", "Reactivación de pólizas vencidas", "Solicitudes de reseñas", "Visibilidad de la carga de trabajo de los agentes"],
    metrics: [{ value: "$3k–$15k", label: "Comisión / Renovación comercial" }, { value: "5 min", label: "Plazo antes de que el cliente potencial pierda interés" }, { value: "60 días", label: "Anticipación de la conversación de renovación" }, { value: "4x", label: "Probabilidad de cierre por recomendación" }, { value: "$0", label: "Valor del seguimiento omitido" }, { value: "Protegidos", label: "Los ingresos que te has ganado", highlight: true }],
    questions: ["¿Qué fuentes generan pólizas contratadas?", "¿Con qué rapidez se canalizan las consultas de cobertura?", "¿Qué cotizaciones esperan seguimiento?", "¿Qué renovaciones requieren atención este mes?", "¿Dónde se están perdiendo oportunidades de venta cruzada?", "¿Cuántos ingresos retenidos provienen de recomendaciones?"],
    recoveredText: "Cotizaciones, renovaciones y recomendaciones que habrían quedado en silencio: asignadas, con seguimiento y protegidas antes de que venza la relación.",
    experienceTitle: "Tecnología que ayuda a los agentes a",
    experienceTitleSerif: "mantener su presencia.",
    faq: [
      { q: "¿CAROS es un sistema de gestión de agencias?", a: "No. CAROS agrega una capa operativa de ingresos en torno a los sistemas que tu correduría ya usa. Ayuda con las respuestas a consultas, el seguimiento de cotizaciones, el contacto para renovaciones, las recomendaciones y la atribución." },
      { q: "¿Puede apoyar los seguros personales y comerciales?", a: "Sí. Los flujos de trabajo pueden adaptarse a las diferentes necesidades de tiempos, derivación y seguimiento de las oportunidades de seguros personales, comerciales, de beneficios, de vida y de salud." },
      { q: "¿CAROS puede ayudar a proteger las renovaciones?", a: "Sí. Puede organizar recordatorios anticipados de renovación, avisos para revisar pólizas y transferencias del equipo de atención a los agentes, para que las conversaciones de renovación no comiencen a último momento." },
      { q: "¿Qué revisa una auditoría de ingresos para corredurías de seguros?", a: "Revisamos las respuestas a consultas, el seguimiento de cotizaciones, la asignación de agentes, los plazos de renovación, la atribución de recomendaciones y la visibilidad de las comisiones retenidas para mostrar dónde se están fugando los ingresos de la correduría." },
    ],
    ctaHeadline: "Encuentra las pólizas que estás por perder",
    ctaSub: "Obtén tu auditoría de retención para descubrir dónde se están perdiendo el seguimiento de cotizaciones, las renovaciones, las oportunidades de venta cruzada y las recomendaciones.",
    acquisitionItems: ["Captación desde el sitio web y consultas de cobertura", "Registro de fuentes de recomendación", "Atribución de campañas", "Derivación por agente y ramo de seguros"],
  },
)

/* ==========================================================================
   INSTITUCIONES RELIGIOSAS
   ========================================================================== */

const religiousInstitutions = make(
  {
    trade: "Instituciones religiosas", label: "Instituciones religiosas", slug: "religious-institutions", customers: "visitantes", customer: "visitante",
    job: "visita", jobs: "visitas", estimate: "seguimiento", estimates: "seguimientos",
    tech: "integrante del personal", techs: "personal y voluntarios", site: "sede", callWord: "consulta", bookLabel: "miembros vinculados",
  },
  {
    heroEyebrow: "Solución por sector — Instituciones religiosas",
    heroTitle: "Haz crecer tu comunidad.",
    heroTitleSerif: "Fortalece cada conexión.",
    heroSub: "Tu misión son las personas. CAROS ayuda a tu institución a gestionar la comunicación, la participación, los eventos, los voluntarios y las relaciones comunitarias, mientras le da a tu equipo más tiempo para enfocarse en las personas a las que sirve.",
    visualTheme: "discreet",
    trustRow: ["Iglesias y parroquias", "Sinagogas", "Mezquitas y centros islámicos", "Templos y gurdwaras", "Ministerios y comunidades de fe"],
    metaTitle: "CAROS para instituciones religiosas | Participación y comunicación comunitaria",
    metaDescription: "CAROS ayuda a iglesias, mezquitas, sinagogas, templos y ministerios a recibir visitantes, coordinar eventos y voluntarios, mantener la participación de sus miembros y dar a sus líderes una visión operativa clara, en todas las tradiciones de fe.",
    keywords: ["seguimiento de visitantes de iglesias", "sistema de comunicación para instituciones religiosas", "participación de comunidades de fe", "coordinación de voluntarios de iglesias", "gestión comunitaria de mezquitas", "participación de miembros de sinagogas", "inscripción a eventos de templos", "software de operaciones para ministerios", "comunicación de congregaciones", "administración de organizaciones religiosas"],
    problemTitle: "La mayoría de las congregaciones no tiene un problema de asistencia.",
    problemTitleSerif: "Tiene un problema de seguimiento.",
    problemIntro: "Las personas siguen cruzando tus puertas, viendo tus transmisiones en vivo y llamando a tu oficina. Lo que falla es todo lo que viene después: la tarjeta de visitante a la que nadie da seguimiento, el anuncio que nunca llegó a quienes lo necesitaban, la consulta sobre un evento que terminó en el buzón de voz. Cada caso es una relación que necesitaba un contacto más y no lo recibió.",
    mattersWhen: [
      { label: "Domingo 12:15 — La tarjeta de visitante en la canasta", detail: "Una familia joven asiste por primera vez y llena una tarjeta. La tarjeta queda sobre un escritorio hasta el jueves. Para entonces, ya buscaron otro lugar. CAROS envía una cálida bienvenida en tu nombre esa misma tarde y asigna a una persona real para dar seguimiento." },
      { label: "Martes 2:40 — La llamada al buzón de voz", detail: "Una familia nueva llama con una pregunta sobre programas para sus hijos. La oficina funciona a tiempo parcial, la llamada pasa al buzón de voz y la familia se comunica con una comunidad que sí respondió. CAROS responde por mensaje de texto en minutos, registra la consulta y la canaliza a la persona adecuada." },
      { label: "Semana del evento — La inscripción sin recordatorio", detail: "Cuarenta personas se inscribieron a la cena comunitaria o al grupo de estudio. Sin recordatorios, la mitad se olvida y la otra mitad nunca se entera de la siguiente actividad. CAROS envía automáticamente confirmaciones, recordatorios e invitaciones de seguimiento." },
      { label: "Mes 3 — La familia que dejó de participar", detail: "Una familia que asistía regularmente deja de aparecer. Nadie lo nota hasta que se ha ido. CAROS señala la pérdida de participación a tiempo para que alguien pueda acercarse de forma genuina y personal." },
    ],
    problemClose: { text: "CAROS convierte las buenas intenciones en", gold: "un sistema confiable para crear vínculos." },
    leaksIntro: "En las comunidades de fe, las brechas casi nunca tienen que ver con la fe o el esfuerzo. Surgen de equipos pequeños, transferencias entre voluntarios y sistemas que dependen de que alguien recuerde qué hacer.",
    leaks: [
      "Los visitantes nuevos no reciben un seguimiento personal dentro de las primeras 48 horas.",
      "Las llamadas a la oficina terminan en el buzón de voz durante los horarios de atención parcial.",
      "Los anuncios solo llegan a las personas que ya estaban prestando atención.",
      "Las inscripciones a eventos y clases no reciben confirmaciones, recordatorios ni seguimiento.",
      "Los turnos de voluntarios se organizan mediante mensajes de texto y la memoria de cada persona.",
      "Los registros de miembros y visitantes están dispersos entre listas y hojas de cálculo.",
      "Los miembros se alejan y nadie los contacta hasta que ya se han ido.",
      "Los líderes no tienen una visión clara de las tendencias de vinculación y participación.",
    ],
    leaksClose: "Una familia que se aleja no representa solo un asiento vacío. Son relaciones, amistades y una comunidad que perdió contacto con personas a las que quería cuidar.",
    journeyIntro: "CAROS le da a cada persona un siguiente paso claro, desde la primera visita hasta convertirse en un miembro vinculado y activo de la comunidad, mientras tus líderes religiosos y tu personal se enfocan en las personas, no en el papeleo.",
    journey: ["Primera visita", "Bienvenida el mismo día", "Invitación a regresar", "Vinculación con un grupo", "Participación continua", "Seguimiento de la participación", "Servicio e invitación a otras personas"],
    journeyEndLabel: "Recorrido comunitario: miembros vinculados y participativos",
    signatureEyebrow: "Comunicación, participación y cuidado comunitario",
    signatureTitle: "Más tiempo para el servicio religioso.",
    signatureTitleSerif: "Menos tiempo gestionando sistemas.",
    signatureBody: [
      "Todas las comunidades dependen del mismo recurso escaso: un equipo pequeño con un gran corazón. Demasiado tiempo se va en buscar listas de contactos, perseguir confirmaciones de voluntarios y recordar manualmente los eventos, tareas que nunca deberían haber consumido horas de trabajo humano.",
      "CAROS reúne el seguimiento de visitantes, la comunicación con miembros, los eventos, los voluntarios y los informes de participación en un solo sistema, para que las tareas repetitivas se hagan solas y el tiempo de tu equipo vuelva a las personas a las que sirve.",
    ],
    signatureListLabel: "Dónde CAROS mantiene conectada a tu comunidad",
    signatureUseCases: [
      "Bienvenida y seguimiento de visitantes",
      "Participación y comunicación con miembros",
      "Inscripción y registro de llegada a eventos",
      "Tendencias de asistencia e informes de participación",
      "Coordinación de voluntarios",
      "Programas comunitarios y gestión de grupos",
      "Anuncios y recordatorios automáticos",
      "Flujos de aportaciones y donaciones, cuando sean compatibles",
      "Paneles para líderes e información operativa",
    ],
    metrics: [
      { value: "48 horas", label: "Plazo para dar seguimiento a un visitante nuevo" },
      { value: "El mismo día", label: "Mensaje de bienvenida para cada visitante nuevo" },
      { value: "1", label: "Registro por cada miembro, visitante y voluntario" },
      { value: "Tiempo", label: "Devuelto a las personas, no al papeleo", highlight: true },
    ],
    questions: ["¿Cuántos visitantes nuevos regresaron para una segunda visita?", "¿Qué eventos y programas atraen a personas que mantienen el vínculo?", "¿Quién participa como voluntario y a quién le corresponde un contacto de seguimiento?", "¿Nuestros anuncios están llegando realmente a la comunidad?", "¿Qué grupos y programas están creciendo y cuáles se reducen sin que se note?", "¿Qué miembros se han alejado sin llamar la atención y podrían necesitar una visita?"],
    recoveredText: "Visitantes que se habrían alejado, voluntarios que se habrían agotado y vínculos que se habrían apagado: recibidos, con seguimiento y convertidos en una comunidad más fuerte. Las cifras anteriores son datos de ejemplo que se muestran con fines demostrativos.",
    experienceTitle: "Tecnología que hace que las personas de tu congregación se sientan",
    experienceTitleSerif: "reconocidas, no tramitadas.",
    experienceIntro: [
      "Las personas se unen a una comunidad donde se sienten vistas. CAROS se encarga de las bienvenidas oportunas, los recordatorios y la organización que hacen que tu iglesia se sienta atenta, para que tus líderes religiosos, tu personal y tus voluntarios dediquen su tiempo a las personas en lugar de a las hojas de cálculo.",
      "CAROS nunca reemplaza el cuidado pastoral. Elimina las tareas repetitivas que lo rodean, y cada mensaje se envía con tu voz, aprobado por tu equipo y en nombre de tu congregación.",
    ],
    experiencePoints: [
      "Bienvenidas cálidas y oportunas que hacen que los visitantes nuevos se sientan esperados.",
      "Cada mensaje se envía en nombre de tu congregación y con la aprobación de tu personal.",
      "Recordatorios respetuosos de aportaciones y compromisos de donación que nunca parecen un discurso de ventas.",
      "Visibilidad clara de quién necesita una llamada, una visita o un agradecimiento.",
      "Llamadas pastorales urgentes dirigidas a una persona real, no a una cola de espera.",
    ],
    pillars: [
      {
        label: "Captación de visitantes",
        question: "¿Dónde nos encuentran las personas nuevas?",
        items: ["Captación desde el sitio web, transmisiones en vivo y redes sociales", "Tarjetas de visitantes y códigos QR", "Atribución de eventos y actividades de acercamiento", "Derivación por sede y ministerio"],
      },
      {
        label: "Operaciones de vinculación",
        question: "¿Qué pasa después de la visita?",
        items: ["Bienvenida al visitante el mismo día", "Invitaciones a una segunda visita y a grupos", "Reservas de clases, eventos y alquileres", "Respuesta por mensaje de texto a llamadas perdidas"],
      },
      {
        label: "Cuidado y retención de miembros",
        question: "¿Quién se está alejando?",
        items: ["Contacto con miembros inactivos", "Contactos por hitos y aniversarios", "Seguimiento de voluntarios", "Reseñas e invitaciones de boca en boca"],
      },
      {
        label: "Análisis de participación",
        question: "¿Nuestra comunidad realmente está creando vínculos?",
        items: ["Tendencias de asistencia y participación", "Informes de participación en grupos y programas", "Seguimiento de la participación de voluntarios", "Informe mensual para líderes"],
      },
      {
        label: "Integraciones",
        question: "¿Cómo se adapta a lo que usamos?",
        items: ["Teléfono, correo electrónico y SMS", "Calendarios y programación de salas", "Fuentes del sitio web y transmisiones en vivo", "Herramientas compatibles de aportaciones y comunidad"],
      },
    ],
    scalingTitle: "Haz crecer tu comunidad sin agotar a",
    scalingTitleSerif: "tu equipo.",
    scalingBody: [
      "La mayoría de las comunidades funciona con poco personal remunerado y muchos voluntarios generosos. Eso funciona hasta que llega el crecimiento: entonces se pierde el seguimiento, la oficina se ahoga en llamadas y las personas más comprometidas se agotan.",
      `CAROS se basa en un principio sencillo: ${PRODUCT_TAGLINE} Cada visitante recibe una bienvenida, cada anuncio llega a las personas indicadas y cada consulta obtiene respuesta, sin contratar a un administrador por cada programa nuevo. Cuando sea momento de sumar personal, los números te lo dirán.`,
    ],
    scalingPoints: [
      "Responde cada llamada y consulta sin ampliar el horario de recepción.",
      "La automatización se encarga de las bienvenidas, los recordatorios y los anuncios.",
      "Los líderes religiosos, el personal y los voluntarios se mantienen en las conversaciones que más importan.",
      "Las tendencias claras de participación muestran cuándo el presupuesto permite sumar personal.",
    ],
    faq: [
      { q: "¿Para quién es CAROS?", a: "Para iglesias, mezquitas, sinagogas, templos, ministerios y otras instituciones de fe que buscan un seguimiento constante de visitantes, eventos y voluntarios organizados, y una visión más clara de la participación comunitaria, cualquiera que sea su tradición." },
      { q: "¿CAROS reemplaza nuestro software de gestión de la iglesia o de aportaciones?", a: "No. CAROS trabaja en torno a las herramientas de gestión, aportaciones y calendario que ya usas, y agrega el seguimiento, la comunicación y los informes que esos sistemas a menudo no gestionan de principio a fin." },
      { q: "¿Los mensajes se sentirán impersonales o insistentes?", a: "No. Tu equipo redacta y aprueba cada mensaje, y todo se envía en nombre de tu comunidad y con su voz. Toda comunicación se basa en el consentimiento y permite dejar de recibirla fácilmente." },
      { q: "¿CAROS reemplaza el cuidado pastoral?", a: "Nunca. CAROS se encarga de los recordatorios, la derivación y la organización para que tus líderes religiosos y tu equipo de cuidado sepan quién necesita atención. Las llamadas pastorales urgentes se dirigen a una persona real de tu equipo." },
      { q: "¿Cómo se maneja la información sensible de los miembros?", a: "La implementación se configura según tus políticas de privacidad y tus sistemas aprobados, con acceso basado en roles para que la información de membresía y afiliación religiosa solo sea visible para las personas autorizadas por tus líderes." },
      { q: "¿CAROS considera la asistencia una medida de la fe?", a: "No. CAROS trata la asistencia y la participación únicamente como información operativa, útil para notar quién podría necesitar una visita o una invitación, nunca como una medida de la fe de alguien. Esa distinción forma parte de cómo configuramos los informes para instituciones religiosas." },
      { q: "¿CAROS puede ayudar con eventos, grupos y voluntarios?", a: "Sí. Las inscripciones a eventos y programas reciben confirmaciones y recordatorios automáticos, los turnos de voluntarios se organizan en un solo lugar y los grupos comunitarios pueden gestionarse con listas y comunicación claras." },
      { q: "¿Qué revisa una auditoría de ingresos CAROS para una institución religiosa?", a: "Revisamos el seguimiento de visitantes, el alcance de la comunicación, la participación en eventos y programas, la coordinación de voluntarios y la carga administrativa para mostrar dónde se están perdiendo los vínculos y los ingresos que los sostienen." },
    ],
    ctaHeadline: "Dale a tu comunidad el seguimiento que merece.",
    ctaSub: "Una auditoría de ingresos CAROS gratuita muestra dónde están fallando el seguimiento de visitantes, los anuncios, los eventos y la coordinación de voluntarios, y qué haría falta para fortalecer cada conexión.",
    captureTitle: "Dale la bienvenida a cada visitante y convierte una primera visita en una",
    captureTitleSerif: "segunda.",
    captureIntro: "Ya sea que alguien te encuentre mediante una búsqueda, una transmisión en vivo, una amistad o un servicio del domingo, las primeras 48 horas determinan si regresa. CAROS se asegura de que cada visitante, llamada y consulta quede registrado, reciba una bienvenida y tenga un siguiente paso claro, automáticamente.",
    captureCapabilities: [
      { title: "Cada conexión en un solo lugar", body: "Las tarjetas de visitantes, los formularios web, los mensajes de texto, las llamadas, los registros de transmisiones en vivo y las inscripciones a eventos llegan a una sola bandeja etiquetados según su origen: ningún visitante se pierde sobre un escritorio o en el teléfono de un voluntario." },
      { title: "Bienvenida al visitante el mismo día", body: "Los visitantes nuevos reciben el mismo día una bienvenida cálida y personal por mensaje de texto y correo electrónico, con tu voz y un siguiente paso sencillo para regresar." },
      { title: "Respuesta por mensaje de texto a llamadas perdidas", body: "Cuando la oficina está cerrada o la línea está ocupada, CAROS responde por mensaje de texto a quien llamó para que la consulta sobre una boda, la pregunta de una familia nueva o la petición de oración no quede sin respuesta." },
      { title: "Atención humana en tu nombre", body: "Personas reales responden, ayudan y canalizan las llamadas en nombre de tu congregación cuando tu personal está en servicios religiosos, reuniones o visitas a miembros." },
      { title: "Seguimiento de instalaciones y eventos", body: "Las consultas sobre alquileres, bodas, eventos y clases se registran y reciben seguimiento hasta que se concreta la reserva, para que esos ingresos no se queden en un buzón de voz." },
      { title: "Programación en línea", body: "Los visitantes y miembros pueden reservar una reunión con un pastor, un recorrido por la sede o una clase según la disponibilidad real, con confirmaciones y recordatorios." },
      { title: "Visibilidad del proceso de vinculación", body: "Consulta de un vistazo en qué etapa está cada persona —primera visita, segunda visita, vinculación con un grupo, miembro, donante— sin buscar entre tarjetas y hojas de cálculo." },
      { title: "Atribución de actividades de acercamiento", body: "Conoce qué eventos, anuncios y actividades de acercamiento atrajeron a personas que se quedaron, se vincularon y aportaron, no solo a quienes asistieron una vez." },
    ],
    acquisitionItems: [],
  },
)

/* ==========================================================================
   CREADORES E INFLUENCERS
   ========================================================================== */

const creatorsInfluencers = make(
  {
    trade: "Creadores e influencers",
    label: "Creadores e influencers",
    slug: "creators-influencers",
    customers: "seguidores",
    customer: "seguidor",
    job: "lanzamiento",
    jobs: "lanzamientos",
    estimate: "oferta",
    estimates: "ofertas",
    tech: "colaborador",
    techs: "equipo y socios",
    site: "negocio",
    callWord: "consulta",
    bookLabel: "clientes de pago",
  },
  {
    heroEyebrow: "Solución por sector — Creadores e influencers",
    heroTitle: "Tus seguidores son una audiencia.",
    heroTitleSerif: "Convirtámosla en una empresa.",
    heroSub: "Ya construiste tu influencia. Ahora construye el negocio que la respalda. CAROS reúne tu audiencia, tus relaciones con clientes, tus ventas, tus alianzas y tus operaciones para que tu negocio pueda crecer más allá del algoritmo.",
    trustRow: ["Creadores de contenido", "Influencers", "Creadores de pódcast", "Coaches y educadores", "Marcas personales"],
    metaTitle: "CAROS para creadores e influencers | Controla tu audiencia, construye tu negocio",
    metaDescription: "CAROS ayuda a creadores, influencers, creadores de pódcast y coaches a convertir seguidores en relaciones directas con clientes, con páginas de destino, ofertas, campañas de acompañamiento, procesos de alianzas e informes de ingresos en un solo lugar.",
    keywords: ["software de negocios para creadores", "monetización de audiencias de influencers", "convertir seguidores en clientes", "CRM para creadores", "proceso de alianzas con marcas", "embudo de ventas de cursos y membresías", "datos propios de audiencia"],
    problemTitle: "Construiste la audiencia.",
    problemTitleSerif: "Pero no tienes el control sobre ella.",
    problemIntro: "Tu alcance vive en la plataforma de alguien más. Un número de seguidores no es una lista de clientes, una bandeja de mensajes directos no es un proceso de ventas y un cambio de algoritmo puede recortar tus ingresos de un día para otro. Los creadores que perduran tienen el control de la relación, no solo de la audiencia.",
    mattersWhen: [
      { label: "Un alcance que no controlas", detail: "Cuando la plataforma cambia su algoritmo, tus visualizaciones, reservas e ingresos cambian con él. CAROS lleva a tu audiencia a canales que controlas: correo electrónico, SMS y tu propio sitio." },
      { label: "Seguidores, no clientes", detail: "Millones de impresiones no te dicen quién está listo para comprar, quién ya compró o cuál es su valor a lo largo del tiempo. CAROS convierte seguidores anónimos en registros de clientes identificados con un historial real." },
      { label: "Patrocinios en los mensajes directos", detail: "Los acuerdos con marcas, las solicitudes de colaboración y las consultas de prensa viven en cinco bandejas de entrada. CAROS canaliza cada consulta de alianza a un solo proceso con etapas, responsables y seguimiento hasta que se firma." },
      { label: "Ingresos que van a saltos", detail: "Picos de lanzamiento y meses sin movimiento. CAROS muestra el valor del cliente a lo largo del tiempo, las compras recurrentes y qué contenido realmente genera clientes, para que puedas planificar en lugar de dejarte llevar por la ola." },
    ],
    problemClose: { text: "CAROS convierte una audiencia alquilada en", gold: "un negocio propio." },
    leaksIntro: "Para los creadores, las fugas no tienen que ver con el esfuerzo. Surgen de construir un negocio en plataformas que nunca se diseñaron para sostener relaciones con clientes.",
    leaks: [
      "Los seguidores nuevos nunca se convierten en contactos identificados.",
      "Las consultas de colaboración y patrocinio quedan sin respuesta en los mensajes directos.",
      "Las listas de correo y de cursos están en herramientas separadas de las ventas.",
      "Los anuncios de lanzamiento se envían sin una secuencia de seguimiento.",
      "Los compradores recurrentes reciben el trato de desconocidos.",
      "No hay visibilidad de qué contenido genera ingresos.",
      "Los datos de clientes están dispersos entre plataformas y hojas de cálculo.",
      "Se mide el crecimiento de la audiencia, pero no el valor del cliente.",
    ],
    leaksClose: "Una audiencia que no puedes identificar ni contactar directamente no es un activo. Es un alquiler, y las plataformas suben la renta.",
    journeyIntro: "CAROS le da a cada seguidor una ruta clara desde el descubrimiento hasta una relación directa, desde una publicación en redes hasta un cliente al que puedes contactar en cualquier momento.",
    journey: ["Descubrimiento en redes sociales", "Visita a la página de destino", "Registro con consentimiento / Recurso de captación", "Acompañamiento por correo electrónico y SMS", "Compra o membresía", "Cliente recurrente", "Análisis de ingresos"],
    journeyEndLabel: "Recorrido del creador: audiencia propia e ingresos recurrentes",
    signatureEyebrow: "De creador de contenido a dueño de un negocio",
    signatureTitle: "La diferencia entre una audiencia y",
    signatureTitleSerif: "un negocio es el sistema que los conecta.",
    signatureBody: [
      "Los creadores más grandes no tienen mejor contenido: tienen mejor infraestructura. Cada pieza de contenido dirige a una página propia, cada página capta un contacto que conservan y cada contacto avanza por ofertas, acompañamiento y comunidad sin que nadie tenga que acordarse de dar seguimiento.",
      "CAROS es esa infraestructura: captación, embudos, cursos y membresías, procesos de alianzas, campañas e informes de ingresos en un solo sistema operativo, para que el negocio crezca incluso cuando no estás publicando.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha los ingresos de los creadores",
    signatureUseCases: [
      "Captación de audiencia y relaciones directas",
      "Sitios web, páginas de destino y embudos",
      "Cursos, membresías y productos digitales",
      "Suscripciones y ofertas recurrentes",
      "Procesos de consultas de alianzas con marcas",
      "Seguimiento y control de colaboraciones",
      "Inscripción y reservas de eventos",
      "Campañas de acompañamiento por correo electrónico y SMS",
      "Secuencias de lanzamiento y promociones",
      "Campañas de compras recurrentes",
      "Informes del valor del cliente a lo largo del tiempo",
      "Atribución de ingresos por contenido y canal",
    ],
    metrics: [
      { value: "1.ª", label: "Parte: datos propios de cada fan que da su consentimiento", highlight: true },
      { value: "Minutos", label: "Desde la nueva suscripción hasta el primer mensaje de bienvenida" },
      { value: "1", label: "Proceso para cada consulta de alianza con marcas" },
      { value: "24/7", label: "Cobertura de embudos, acompañamiento y reservas" },
    ],
    questions: [
      "¿Cuántos seguidores nuevos se suscribieron al correo esta semana?",
      "¿Qué pieza de contenido realmente generó clientes?",
      "¿Qué consultas de alianzas siguen esperando una respuesta?",
      "¿Cuál es el valor a lo largo del tiempo de un cliente de cada plataforma?",
      "¿Cuántos miembros renovaron este mes y quiénes dejaron vencer su membresía?",
      "¿Qué oferta convierte mejor con cada audiencia?",
    ],
    recoveredText: "Seguidores que habrían pasado de largo y alianzas que habrían quedado olvidadas en los mensajes directos: captados, acompañados y convertidos en relaciones directas con clientes. Las cifras anteriores son datos de ejemplo que se muestran con fines demostrativos.",
    captureTitle: "Convierte a un seguidor en un contacto y a un contacto en un",
    captureTitleSerif: "cliente.",
    captureIntro: "El contenido atrae la atención, pero el negocio funciona con relaciones propias. CAROS conecta tu contenido con páginas, registros con consentimiento, ofertas y seguimiento, para que la atención tenga adónde llegar y algo que comprar.",
    captureCapabilities: [
      { title: "Captación de audiencia y datos propios", body: "Las páginas de enlace en la biografía, los formularios con consentimiento, los recursos de captación y los códigos QR convierten el alcance en redes en contactos propios de correo electrónico y SMS, etiquetados por plataforma, contenido e interés." },
      { title: "Sitios web, páginas de destino y embudos", body: "Crea páginas de lanzamiento, embudos permanentes y páginas de venta de cursos que se conectan directamente con tu CRM, sin unir cinco herramientas a la fuerza." },
      { title: "Cursos, membresías y productos digitales", body: "Vende y entrega ofertas digitales con acceso, incorporación y recordatorios de renovación automáticos: ingresos recurrentes sin administración manual." },
      { title: "Procesos de alianzas con marcas", body: "Cada consulta de patrocinio, colaboración y prensa llega a un solo proceso con etapas y seguimiento, para que los acuerdos avancen en lugar de quedar olvidados en mensajes directos." },
      { title: "Inscripción y reservas de eventos", body: "Talleres, eventos en vivo y sesiones de coaching 1:1 reservados según la disponibilidad real, con confirmaciones y recordatorios que reducen las inasistencias." },
      { title: "Acompañamiento por correo electrónico y SMS", body: "Secuencias de bienvenida, campañas de lanzamiento y flujos de recuperación de clientes que funcionan automáticamente, escritos por ti y enviados con tu voz." },
      { title: "Informes y atribución de ingresos", body: "Descubre qué plataformas, publicaciones y campañas generan clientes e ingresos, no solo visualizaciones y me gusta." },
    ],
    experienceTitle: "Tus fans reciben la experiencia.",
    experienceTitleSerif: "Tú recibes el sistema.",
    experienceIntro: [
      "Los fans compran a creadores con quienes sienten una conexión. CAROS mantiene cada mensaje con tu voz, cada oferta alineada con tu marca y cada interacción personal, mientras la automatización se encarga discretamente de la entrega, los recordatorios y el seguimiento.",
      "Tú sigues frente a la cámara y creando. El sistema hace funcionar el negocio por detrás.",
    ],
    experiencePoints: [
      "Cada mensaje se envía bajo tu marca y con tu voz.",
      "Bienvenidas y entregas instantáneas: ningún fan se queda esperando.",
      "Historial de comunidad, cursos y compras en un solo registro de cliente.",
      "Consultas de alianzas respondidas en minutos, no en días.",
      "Tú ves todo el negocio; tus fans solo ven una gran experiencia.",
    ],
    pillars: [
      {
        label: "Captación de audiencia",
        question: "¿De dónde viene la atención?",
        items: ["Captación desde redes sociales y plataformas de video", "Enlace en la biografía y páginas de destino", "Pódcast y participaciones como invitado", "Seguimiento de recomendaciones y contenido compartido"],
      },
      {
        label: "Operaciones de ingresos",
        question: "¿Qué pasa después de que te siguen?",
        items: ["Secuencias de registro con consentimiento y bienvenida", "Ventas de cursos y membresías", "Flujos de lanzamiento y promoción", "Recuperación de carritos y ventas de mayor valor"],
      },
      {
        label: "Retención de fans",
        question: "¿Quién sigue participando?",
        items: ["Campañas de renovación de membresías", "Flujos de compras recurrentes", "Acompañamiento de comunidades y segmentos", "Secuencias de recuperación de clientes"],
      },
      {
        label: "Inteligencia de negocios",
        question: "¿El contenido genera ingresos?",
        items: ["Informes del valor del cliente a lo largo del tiempo", "Atribución de ingresos por plataforma", "Valor de las alianzas en proceso", "Informes semanales de rendimiento"],
      },
      {
        label: "Integraciones",
        question: "¿Cómo se adapta a lo que usamos?",
        items: ["Correo electrónico y SMS", "Calendarios y reservas", "Herramientas de pago y cursos", "Fuentes del sitio web y redes sociales"],
      },
    ],
    scalingTitle: "Crece más allá del algoritmo",
    scalingTitleSerif: "sin aumentar los gastos operativos.",
    scalingBody: [
      "Cada hora que dedicas a copiar y pegar mensajes directos, reconstruir embudos o suplicarle al algoritmo es una hora que no dedicas a crear. Y cada mes que tu audiencia permanece en terreno alquilado es un mes de riesgo que no puedes controlar.",
      `CAROS se basa en un principio sencillo: ${PRODUCT_TAGLINE} Tus embudos, campañas y alianzas funcionan con automatización; el toque humano va a donde impulsa el negocio: el contenido, la comunidad, los acuerdos. Cuando sea momento de contratar, los números te lo dirán.`,
    ],
    scalingPoints: [
      "Gestiona lanzamientos y campañas sin una persona de operaciones a tiempo completo.",
      "Cada consulta de alianza recibe primero una respuesta automática.",
      "La automatización se encarga de la entrega, los recordatorios y el seguimiento.",
      "Las listas propias de correo electrónico y SMS reducen la dependencia de las plataformas.",
    ],
    faq: [
      { q: "¿Para quién es CAROS?", a: "Para creadores de contenido, influencers, creadores de pódcast, coaches, educadores, marcas personales y negocios liderados por creadores que quieren convertir una audiencia en un negocio propio que genere ingresos." },
      { q: "¿CAROS reemplaza mi herramienta de correo, mi plataforma de cursos o mi enlace en la biografía?", a: "CAROS consolida la captación, las páginas, los embudos, las campañas, los procesos y los informes en un solo sistema. Durante la configuración, identificamos lo que ya usas y adaptamos el sistema a las herramientas que quieres conservar." },
      { q: "Soy creador, no una empresa. ¿Esto es demasiado para mí?", a: "Está diseñado precisamente para ti. La idea es que el lado del negocio —captación, ofertas, seguimiento e informes— funcione automáticamente para que puedas seguir enfocado en crear." },
      { q: "¿CAROS puede ayudarme a salir de la montaña rusa del algoritmo?", a: "No puede cambiar el algoritmo de ninguna plataforma. Lo que hace es construir una capa propia —listas de correo electrónico y SMS, páginas propias y registros de clientes— para que tus ingresos no suban y bajen con el alcance de una sola plataforma." },
      { q: "¿Los mensajes automáticos se sentirán impersonales para mi audiencia?", a: "No. Tú redactas y apruebas las secuencias, y todo se envía en tu nombre y con tu voz. La automatización se encarga de los tiempos y la entrega; las palabras siguen siendo tuyas." },
      { q: "¿Qué revisa una auditoría de ingresos CAROS para un creador?", a: "Revisamos cómo la atención de la audiencia se convierte en contactos, cómo funcionan las ofertas y los lanzamientos, dónde se estancan las consultas de alianzas y colaboraciones, y qué proporción de tus ingresos controlas realmente frente a la que depende de plataformas ajenas." },
    ],
    ctaHeadline: "Descubre cuánto vale tu audiencia como negocio.",
    ctaSub: "Una auditoría de ingresos CAROS gratuita muestra dónde se están perdiendo seguidores, ofertas y alianzas, y qué haría falta para convertir la atención en ingresos propios.",
    heroCtas: { primaryLabel: "Ve CAROS en acción", primaryHref: "https://free-revenue-audit.getcarosai.com", secondaryLabel: "Agenda una demostración", secondaryHref: "https://links.getcaros.com/widget/booking/9gAyyAFYYodUmthJicbD" },
    acquisitionItems: ["Captación desde redes sociales y plataformas de video", "Páginas de destino y recursos de captación", "Fuentes de pódcast y colaboraciones", "Atribución de recomendaciones y contenido compartido"],
  },
)

/* ==========================================================================
   ORGANIZACIONES SIN FINES DE LUCRO
   ========================================================================== */

const nonprofits = make(
  {
    trade: "Organizaciones sin fines de lucro",
    label: "Organizaciones sin fines de lucro",
    slug: "nonprofits",
    customers: "colaboradores",
    customer: "colaborador",
    job: "programa",
    jobs: "programas",
    estimate: "solicitud",
    estimates: "solicitudes",
    tech: "coordinador",
    techs: "personal y voluntarios",
    site: "organización",
    callWord: "consulta",
    bookLabel: "colaboradores comprometidos",
  },
  {
    heroEyebrow: "Solución por sector — Organizaciones sin fines de lucro",
    heroTitle: "Más impacto.",
    heroTitleSerif: "Menos carga administrativa.",
    heroSub: "Tus recursos deberían destinarse a tu misión, no a sistemas desconectados y tareas administrativas repetitivas. CAROS ayuda a las organizaciones sin fines de lucro a coordinar colaboradores, programas, comunicaciones y operaciones en un solo lugar.",
    trustRow: ["Organizaciones sin fines de lucro y benéficas", "Fundaciones", "Organizaciones comunitarias", "Grupos de defensa de causas", "Equipos orientados a una misión"],
    metaTitle: "CAROS para organizaciones sin fines de lucro | Gestión de colaboradores, voluntarios y programas en un solo lugar",
    metaDescription: "CAROS ayuda a organizaciones sin fines de lucro, benéficas y comunitarias a coordinar colaboradores, voluntarios, flujos de recaudación, programas y actividades de acercamiento, para que los equipos reducidos dediquen más tiempo a la misión y menos a la administración.",
    keywords: ["alternativa de CRM para organizaciones sin fines de lucro", "coordinación de voluntarios para organizaciones sin fines de lucro", "gestión de colaboradores para organizaciones sin fines de lucro", "flujos de comunicación con donantes", "inscripción a programas de organizaciones sin fines de lucro", "software de operaciones para organizaciones sin fines de lucro", "gestión de organizaciones comunitarias"],
    problemTitle: "Equipos reducidos. Grandes misiones.",
    problemTitleSerif: "Sistemas desconectados.",
    problemIntro: "La mayoría de las organizaciones sin fines de lucro funciona con una mezcla de hojas de cálculo, bandejas de entrada, herramientas de eventos y buena voluntad. Los donantes, los voluntarios y los participantes de programas están en lugares distintos, el seguimiento depende de quien lo recuerde y los informes requieren días que nadie tiene. La misión paga el precio en horas.",
    mattersWhen: [
      { label: "El donante que nunca recibió respuesta", detail: "Un colaborador muestra interés en un evento o a través del sitio web. El seguimiento depende de una nota adhesiva. CAROS canaliza cada consulta a un solo proceso con una siguiente acción y un responsable." },
      { label: "El caos de los voluntarios", detail: "Turnos gestionados en un chat grupal, inasistencias sin plan de respaldo e incorporación que varía según el coordinador. CAROS organiza la captación, la programación y los recordatorios en un solo lugar." },
      { label: "Inscripción a programas mediante hojas de cálculo", detail: "Las solicitudes llegan por correo, los criterios de elegibilidad están en la cabeza de alguien y los participantes pasan semanas sin noticias. CAROS convierte la inscripción en un flujo de trabajo con seguimiento y comunicación automática." },
      { label: "Temporada de informes", detail: "Cuando una entidad financiadora pide cifras, el personal se sumerge en hojas de cálculo durante una semana. CAROS mantiene actualizados los datos de actividad y participación como resultado del trabajo diario." },
    ],
    problemClose: { text: "CAROS convierte el esfuerzo disperso en", gold: "impacto coordinado." },
    leaksIntro: "Las pérdidas de las organizaciones sin fines de lucro no se miden solo en dólares: también se miden en colaboradores perdidos, voluntarios agotados, cupos de programas vacíos y horas del personal que deberían haberse dedicado a la misión.",
    leaks: [
      "Las consultas de colaboradores y donantes nunca reciben seguimiento.",
      "Las inscripciones de voluntarios quedan en mensajes de texto y hojas dispersas.",
      "La inscripción a programas es manual y la comunicación es lenta.",
      "Los procesos de recaudación y eventos no comparten datos.",
      "La elaboración de informes de impacto y actividad lleva días.",
      "Hay múltiples suscripciones de software con funciones superpuestas.",
      "Los colaboradores nuevos reciben un correo de bienvenida y luego solo silencio.",
      "No existe una vista única de quién participa y cómo.",
    ],
    leaksClose: "Cada seguimiento omitido no es solo una donación perdida. Es una relación perdida que un equipo reducido se esforzó mucho por iniciar.",
    journeyIntro: "CAROS le da a cada colaborador una ruta clara desde el primer contacto hasta una participación sostenida, visible para todo tu equipo.",
    journey: ["Descubrimiento de la organización", "Consulta / Interés en donar", "Desarrollo de la relación", "Participación en un evento o programa", "Participación continua", "Informes de actividad e impacto"],
    journeyEndLabel: "Recorrido del colaborador: participación sostenida e impacto medible",
    signatureEyebrow: "Cada recurso al servicio de la misión",
    signatureTitle: "Haz que cada recurso rinda más",
    signatureTitleSerif: "para tu misión.",
    signatureBody: [
      "Las organizaciones sin fines de lucro suelen tener más un problema de fragmentación que de tecnología: cinco herramientas que no se comunican, cada una con su suscripción y su curva de aprendizaje. El trabajo de coordinación se multiplica mientras el trabajo de la misión espera.",
      "CAROS consolida las relaciones con colaboradores, la coordinación de voluntarios, los flujos de recaudación, la inscripción a programas y las actividades de acercamiento en un solo sistema operativo. Una base de datos, una capa de comunicación y un lugar donde los informes son un resultado del trabajo, no un proyecto aparte.",
    ],
    signatureListLabel: "Dónde CAROS mantiene en marcha las operaciones de las organizaciones sin fines de lucro",
    signatureUseCases: [
      "Gestión de relaciones con colaboradores y donantes",
      "Captación y coordinación de voluntarios",
      "Flujos de campañas de recaudación",
      "Inscripción a eventos y actividades de acercamiento",
      "Inscripción a programas y comunicación con participantes",
      "Seguimientos automáticos y acompañamiento de colaboradores",
      "Campañas de acercamiento y gestión de la comunicación",
      "Paneles e informes operativos",
      "Seguimiento de oportunidades de subvención y etapas de relaciones, cuando sea compatible",
    ],
    metrics: [
      { value: "100%", label: "de las consultas de colaboradores registradas con una siguiente acción", highlight: true },
      { value: "1", label: "sistema en lugar de una pila de suscripciones" },
      { value: "24/7", label: "cobertura de seguimiento automático" },
      { value: "Horas", label: "De elaboración de informes devueltas a la misión" },
    ],
    questions: [
      "¿Cuántas consultas de colaboradores recibieron respuesta esta semana y con qué rapidez?",
      "¿Qué voluntarios están activos y a quién le corresponde un contacto de seguimiento?",
      "¿Qué campañas de recaudación realmente generaron colaboradores comprometidos?",
      "¿Qué tan completos están nuestros programas y quién está en la lista de espera?",
      "¿Qué haría falta para elaborar hoy el informe para nuestra entidad financiadora?",
      "¿Qué suscripciones de software tienen funciones superpuestas?",
    ],
    recoveredText: "Colaboradores que se habrían alejado, voluntarios que se habrían agotado y días de elaboración de informes perdidos en hojas de cálculo: recuperados, coordinados y devueltos a la misión. Las cifras anteriores son datos de ejemplo que se muestran con fines demostrativos.",
    captureTitle: "Cada consulta de colaboradores registrada, cada relación",
    captureTitleSerif: "con seguimiento.",
    captureIntro: "Los colaboradores llegan a ti a través de sitios web, eventos, recomendaciones y redes sociales. CAROS los registra a todos en una sola base de datos con atribución de origen, para que ninguna consulta, inscripción o muestra de interés en donar se pierda en una bandeja sin revisar.",
    captureCapabilities: [
      { title: "Gestión de relaciones con colaboradores y donantes", body: "Un registro por colaborador con historial de contacto, interés en donar, asistencia a eventos y participación en programas, visible para cada integrante autorizado del equipo." },
      { title: "Captación y coordinación de voluntarios", body: "Solicitudes, programación, recordatorios y registro de horas en un solo flujo de trabajo, para que los turnos estén cubiertos y los voluntarios se sientan organizados en lugar de perseguidos." },
      { title: "Flujos de campañas de recaudación", body: "Planifica campañas, registra las actividades de acercamiento y el seguimiento, y mide qué actividades generaron apoyo, sin una herramienta distinta para cada campaña." },
      { title: "Inscripción a eventos y acercamiento comunitario", body: "La inscripción, las confirmaciones, los recordatorios y el seguimiento posterior al evento funcionan automáticamente, y cada asistente se convierte en una relación con seguimiento." },
      { title: "Inscripción a programas y comunicación", body: "Solicitudes, pasos de elegibilidad y mensajes a participantes en un flujo de trabajo con seguimiento: quienes presentan una solicitud siempre saben en qué etapa están." },
      { title: "Seguimientos automáticos y acompañamiento", body: "Las secuencias de bienvenida, los agradecimientos y las campañas de reactivación funcionan por sí solos, con la voz de tu organización y opciones integradas para dejar de recibir comunicaciones." },
      { title: "Paneles e informes operativos", body: "Vinculación, participación y rendimiento de campañas visibles en cualquier momento, no recopilados una vez por trimestre." },
    ],
    experienceTitle: "Tecnología que respeta el recurso más limitado de tu equipo:",
    experienceTitleSerif: "el tiempo.",
    experienceIntro: [
      "El personal de las organizaciones sin fines de lucro cumple muchas funciones. CAROS está diseñado para que la persona más ocupada del equipo pueda ver de un vistazo qué necesita atención, mientras la automatización se encarga discretamente del resto.",
      "No se le suma trabajo a nadie. El sistema asume las tareas repetitivas para que tus personas puedan llevar adelante la misión.",
    ],
    experiencePoints: [
      "Vistas sencillas diseñadas para coordinadores, no para administradores de bases de datos.",
      "Confirmaciones y recordatorios automáticos en los que tus participantes pueden confiar.",
      "Cada comunicación se envía en nombre de tu organización y con su voz.",
      "Acceso basado en permisos para que los registros sensibles queden limitados a los roles adecuados.",
      "Informes siempre actualizados porque son un resultado del flujo de trabajo.",
    ],
    pillars: [
      {
        label: "Captación de colaboradores",
        question: "¿Dónde nos encuentran los colaboradores?",
        items: ["Captación desde el sitio web y formularios", "Atribución de eventos y actividades de acercamiento", "Registro de recomendaciones y socios", "Fuentes de redes sociales y campañas"],
      },
      {
        label: "Operaciones de vinculación",
        question: "¿Qué pasa después de que nos contactan?",
        items: ["Derivación y seguimiento de consultas", "Flujos de interés en donar", "Secuencias de bienvenida y acompañamiento", "Inscripción a eventos y recordatorios"],
      },
      {
        label: "Operaciones de programas",
        question: "¿Cómo funcionan los programas?",
        items: ["Flujos de inscripción", "Comunicación con participantes", "Programación de voluntarios y recordatorios", "Registros de asistencia y participación"],
      },
      {
        label: "Análisis de impacto",
        question: "¿Está funcionando?",
        items: ["Paneles de vinculación", "Informes de rendimiento de campañas", "Tendencias de participación y retención", "Resúmenes de actividad listos para entidades financiadoras"],
      },
      {
        label: "Integraciones",
        question: "¿Cómo se adapta a lo que usamos?",
        items: ["Correo electrónico y SMS", "Calendarios y programación", "Fuentes del sitio web y eventos", "Pagos y herramientas compatibles de recaudación"],
      },
    ],
    scalingTitle: "Haz crecer tu impacto sin aumentar",
    scalingTitleSerif: "tus gastos operativos.",
    scalingBody: [
      "Toda organización sin fines de lucro acaba encontrando el mismo límite: más programas, más colaboradores, más informes y el mismo equipo reducido. Contratar más no es una solución escalable en este sector, como tampoco lo es agregar otra herramienta a la fuerza.",
      `CAROS se basa en un principio sencillo: ${PRODUCT_TAGLINE} La coordinación funciona con automatización, las personas se enfocan en las relaciones y el criterio, y los líderes ven las cifras sin pedirle a nadie que prepare un informe.`,
    ],
    scalingPoints: [
      "Coordina más voluntarios y programas sin sumar coordinadores.",
      "La automatización se encarga de las confirmaciones, los recordatorios y los seguimientos.",
      "El tiempo del personal pasa de la administración al cumplimiento de la misión.",
      "Un solo sistema reemplaza las suscripciones superpuestas y sus costos.",
    ],
    faq: [
      { q: "¿Para quién es CAROS?", a: "Para organizaciones sin fines de lucro, entidades benéficas, fundaciones, organizaciones comunitarias, grupos de defensa de causas, organizaciones educativas sin fines de lucro, programas de desarrollo laboral y otras organizaciones orientadas a una misión que necesitan coordinar colaboradores, voluntarios, programas y comunicación con equipos reducidos." },
      { q: "¿CAROS reemplaza nuestra base de datos de donantes?", a: "CAROS organiza las relaciones con colaboradores, la comunicación, los flujos de trabajo y los informes en torno a las herramientas que tu organización ya usa. Si tienes una plataforma especializada de recaudación o donantes que quieres conservar, adaptamos la configuración a ella." },
      { q: "No tenemos personal técnico. ¿Qué tan difícil es usarlo?", a: "CAROS se configura para ti durante la implementación. En el día a día, tu equipo trabaja con vistas sencillas —consultas por responder, turnos por cubrir, participantes a quienes escribir—, no con administración de bases de datos." },
      { q: "¿Cómo se protege la información de colaboradores y participantes?", a: "La implementación se configura según tus políticas de privacidad, con comunicación basada en el consentimiento y acceso basado en roles, para que los registros solo sean visibles para las personas que tus líderes autoricen." },
      { q: "Somos una organización pequeña. ¿CAROS es accesible para organizaciones como la nuestra?", a: "Los precios para organizaciones sin fines de lucro son personalizados y se establecen mediante una conversación con nuestro equipo de ventas, según las necesidades operativas de tu organización. No hay un precio de contratación de autoservicio para organizaciones sin fines de lucro: contacta a nuestro equipo para explorar la configuración y la estructura de precios adecuadas para ti." },
      { q: "¿CAROS puede dar seguimiento a oportunidades de subvención?", a: "Cuando sea compatible, CAROS puede dar seguimiento a relaciones vinculadas con subvenciones y a las etapas del proceso, del mismo modo que da seguimiento a campañas de recaudación. Durante tu consulta confirmaremos qué permite tu configuración." },
    ],
    ctaHeadline: "Descubre lo que unas operaciones coordinadas podrían devolverle a tu misión.",
    ctaSub: "Contacta a nuestro equipo para explorar la configuración de CAROS adecuada para tu organización y una estructura de precios basada en tus necesidades operativas.",
    heroCtas: { primaryLabel: "Habla con ventas", primaryHref: "/industries/nonprofits#nonprofit-consultation", secondaryLabel: "Solicita una demostración", secondaryHref: "https://links.getcaros.com/widget/booking/9gAyyAFYYodUmthJicbD" },
    salesLedPricing: true,
    acquisitionItems: ["Captación desde el sitio web y formularios", "Eventos y acercamiento comunitario", "Fuentes de recomendaciones y socios", "Atribución de redes sociales y campañas"],
  },
)
/* ==========================================================================
   Registry
   ========================================================================== */

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  "coaching-professional-services": coachingProfessionalServices,
  "home-services": homeServices,
  roofing,
  hvac,
  plumbing,
  electrical,
  cleaning,
  landscaping,
  painting,
  "pest-control": pestControl,
  "pressure-washing": pressureWashing,
  handyman,
  flooring,
  "general-contracting": generalContracting,
  "pool-services": poolServices,
  "events-retreats": eventsRetreats,
  "party-event-rentals": partyRentals,
  "real-estate": realEstate,
  "travel-agents": travelAgents,
  "wellness-spas": wellnessSpas,
  "medical-practices": medicalPractices,
  "financial-services": financialServices,
  "insurance-brokerage": insuranceBrokerage,
  "religious-institutions": religiousInstitutions,
  "creators-influencers": creatorsInfluencers,
  nonprofits,
}

