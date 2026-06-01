/*
 * src/content.js  →  becomes src/content/site.ts in the Cursor handoff
 * ---------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for all copy. Every string has `en` + `es`.
 * Components read from window.useLanguage().t — no hardcoded strings in JSX.
 *
 * In the TS port this file is a typed object (interface SiteContent { ... })
 * and the i18n helpers below move into src/context/LanguageContext.tsx.
 */

export const CONTENT = {
  /* ===================== ENGLISH ===================== */
  en: {
    meta: { lang: "EN", other: "ES" },

    nav: {
      logo: "Jane Riveros.",
      links: [
        { id: "home", label: "Home", href: "#top" },
        { id: "work", label: "Work", href: "#builds" },
        { id: "book", label: "Book a call", href: "#contact" },
      ],
    },

    hero: {
      eyebrow: "// ENTERPRISE TRANSFORMATION → AGENTIC AI",
      name: "Jane Riveros",
      tagline: "Built Without a Blueprint.",
      accent: "Agent teams that ship the program.",
      proof: "Governed like I governed Fortune 100 transformations. They won’t get you sued.",
      lede: "Fifteen years running Fortune 100 transformation programs under federal regulators — where late wasn’t an option and a missing control was a fine, not a ticket. Now I build agent teams that execute the same way: fast, governed, and able to prove every move.",
      ctaPrimary: "See what I’ve built",
      ctaSecondary: "Book a call",
      scroll: "SCROLL",
      chip: { id: "MAVIS", live: "LIVE", speaking: "SPEAKING" },
      talk: "Talk to MAVIS",
      tryLine: "Try the live agent — then book a call.",
      status: { live: "LIVE", loc: "SANTIAGO, CL", sys: "ALL SYSTEMS NOMINAL", local: "LOCAL" },
    },

    architecture: {
      index: "01",
      kicker: "SYSTEM ARCHITECTURE",
      title: "A Living System.\nNot a Collection of Tools.",
      subtitle:
        "One person accountable. Specialist agent teams that execute. Every action scoped, logged, and provable. Hover a node to inspect it.",
      hint: "HOVER / TAP A NODE",
      center: {
        id: "JANE",
        role: "Governance layer · human in the loop",
        capabilities: [
          "Sets the boundaries every agent runs inside",
          "Owns the standard the fleet is measured against",
          "Final accountability never leaves a person",
        ],
      },
      nodes: [
        {
          id: "MAVIS",
          role: "Conversational operations agent",
          status: "LIVE",
          capabilities: [
            "Real-time voice + text, full transcript capture",
            "Every response logged, timestamped, attributable",
            "Scoped permissions — acts only inside approval",
            "Hands off to a human the moment confidence drops",
          ],
        },
        {
          id: "ATLAS",
          role: "Evidence & audit engine",
          status: "IN BUILD",
          capabilities: [
            "Maps every decision back to its source document",
            "Immutable audit trail across the agent fleet",
            "Continuous control monitoring against policy",
            "Generates regulator-ready reports on demand",
          ],
        },
        {
          id: "VICTORIA",
          role: "Policy & compliance reviewer",
          status: "TRAINING",
          capabilities: [
            "Reads new regulation, flags affected workflows",
            "Drafts control language for human sign-off",
            "Learns from every reviewer correction",
            "Supervised only — no autonomous actions yet",
          ],
        },
      ],
    },

    builds: {
      index: "02",
      kicker: "LIVE BUILDS",
      title: "Three systems. Three deployment states.",
      cards: [
        {
          id: "MAVIS",
          status: "LIVE",
          desc: "In production. Runs live work end to end — conversation, execution, orchestration — fully observable.",
          features: [
            "Voice + text interface",
            "Transcript audit trail",
            "Confidence-based human handoff",
            "Scoped, revocable permissions",
          ],
          cta: "VIEW",
        },
        {
          id: "ATLAS",
          status: "IN BUILD",
          desc: "Wiring the audit backbone the rest of the fleet reports into.",
          features: [
            "Source-linked decisions",
            "Immutable event log",
            "Continuous control monitoring",
            "Regulator-ready reporting",
          ],
          cta: "VIEW",
        },
        {
          id: "VICTORIA",
          status: "TRAINING",
          desc: "The regulatory specialist. Learning under supervision — no autonomous actions yet.",
          features: [
            "Regulation parsing",
            "Control-language drafting",
            "Reviewer feedback loop",
            "Supervised execution only",
          ],
          cta: "VIEW",
        },
      ],
    },

    mavis: {
      index: "03",
      kicker: "WHAT MAVIS DOES",
      title: "One agent. The whole desk.",
      subtitle: "She talks, remembers, executes, and directs the rest of the team — all on the record, all inside the boundaries I set.",
      channels: [
        { id: "CONVERSE", lines: [["TALK", "Live voice or text, English or Spanish, in real time"]] },
        { id: "REMEMBER", lines: [["RECALL", "Context, preferences, and past decisions across sessions"]] },
        { id: "EXECUTE", lines: [
          ["BUILD", "Builds automation flows"],
          ["TRANSACT", "Makes purchases"],
          ["PUBLISH", "Updates websites"],
          ["DELIVER", "Generates and delivers documents and files"],
        ] },
        { id: "ORCHESTRATE", lines: [
          ["DISPATCH", "Dispatches work to specialist agent pods"],
          ["CONSULT", "Consults specialists"],
          ["ASSEMBLE", "Assembles the team’s answer into one reply"],
        ] },
        { id: "INTEGRATE", lines: [
          ["SLACK", "Reads and posts to Slack"],
          ["INGEST", "Ingests PDFs, Word docs, and slides"],
          ["CONNECT", "Connects to your tools"],
        ] },
        { id: "GOVERN", authority: true, lines: [
          ["SCOPE", "Runs on scoped, revocable permissions"],
          ["HANDOFF", "Hands to a human below a confidence threshold"],
          ["LOG", "Logs every exchange to an immutable audit trail"],
          ["BOUND", "Never moves past the boundaries Jane sets"],
        ] },
      ],
      governNote: "Every EXECUTE capability operates under GOVERN’s authority.",
      hint: "HOVER / TAP A CHANNEL",
    },

    flow: {
      index: "04",
      kicker: "THE OPERATING FLOW",
      title: "Four flows. One chain of custody.",
      subtitle: "Mavis runs the desk. Novaxis runs the program office. Specialists draft under supervision. Nothing moves without a record — and nothing moves past the boundaries I set.",
      hint: "HOVER / TAP A STEP",
      tracks: [
        { id: "FLOW 01", actor: "MAVIS · the desk", status: "LIVE", steps: [
          ["RECEIVE", "Voice or text request comes in"],
          ["VERIFY SCOPE", "Check scoped, revocable permissions"],
          ["RECALL CONTEXT", "Pull relevant history from memory"],
          ["DECIDE", "Do it, delegate it, or escalate it"],
          ["ACT / DISPATCH", "Execute directly, or hand to a specialist pod"],
          ["CONFIDENCE GATE", "Below threshold → hand to a human"],
          ["RESPOND + LOG", "Reply, and write the full exchange to the audit trail"],
        ] },
        { id: "FLOW 02", actor: "NOVAXIS · the agent program office", status: "BACKBONE", steps: [
          ["INTAKE", "Receives routed work from Mavis"],
          ["ENFORCE POLICY", "Applies the boundaries Jane set"],
          ["ASSIGN POD", "Routes to the right specialist team (up to 10 pods, 3 agents each)"],
          ["READ / WRITE MEMORY", "Shared context across the fleet"],
          ["STREAM TO EVENT LOG", "Every action, immutably recorded"],
          ["MONITOR", "Continuous checks against the standard"],
          ["RETURN", "Result plus a complete audit record"],
        ] },
        { id: "FLOW 03", actor: "VICTORIA + MAVIS · the specialist consult", status: "TRAINING", steps: [
          ["HARD CALL", "Mavis hits something needing regulatory judgment"],
          ["CONSULT VICTORIA", "Routed through Novaxis"],
          ["PARSE REGULATION", "Victoria reads the relevant rules"],
          ["DRAFT IN CONTROL LANGUAGE", "Turns rules into controls"],
          ["REVIEWER FEEDBACK LOOP", "A human reviews before anything ships"],
          ["RETURN WITH CITATIONS", "Every claim linked to its source"],
          ["MAVIS DELIVERS + LOGS", "Victoria never acts alone"],
        ] },
      ],
      radial: {
        id: "FLOW 04",
        title: "Mavis orchestrates the fleet.",
        ring: "JANE — GOVERNANCE LAYER",
        ringNote: "Sets the boundaries. Holds final accountability.",
        center: "MAVIS",
        centerNote: "Orchestrator · single interface",
        spokes: [
          { id: "NOVAXIS", note: "Program office — routing, memory, execution" },
          { id: "PODS", label: "SPECIALIST PODS", note: "Up to 30 agents · teams of 3 · each a discipline" },
          { id: "VICTORIA", note: "Regulatory · supervised" },
          { id: "ATLAS", note: "Evidence + audit · logs everything" },
        ],
        returnPath: "Every action → audit trail → Jane",
        riskBranch: "Confidence / risk gate → human handoff",
        caption: "Mavis directs the work. Jane sets the boundaries. Nothing moves outside them.",
      },
      dial: {
        label: "AUTONOMY",
        left: "PERSONAL · FULL AUTONOMY",
        right: "ENTERPRISE · GOVERNED",
        caption: "I built this for myself first — at full autonomy: agents buying, building, publishing, running the company. You run the same engine, governed down to your risk tolerance. Jane’s layer sets the dial.",
        ends: ["FULL AUTONOMY", "GOVERNED"],
      },
    },

    before: {
      index: "05",
      kicker: "BEFORE THE AGENTS",
      title: "I didn’t learn delivery from a deck.",
      staccato: ["Banks.", "Regulators.", "Consulting firms."],
      body: [
        "Fifteen years inside the institutions that get audited for a living. I ran the transformation programs where a missing control wasn’t a bug — it was a finding, a fine, a name in front of a regulator.",
        "I learned that the systems people trust are the ones that can show their work. That delivery and accountability are the same discipline.",
        "That “move fast” means nothing if you can’t prove what moved, when, and why.",
      ],
      photoCaption: "JANE RIVEROS · ON SITE",
    },

    journey: {
      index: "06",
      kicker: "THE JOURNEY",
      title: "2002 → 2026",
      milestones: [
        { year: "2002", tag: "ENLISTED", body: "Military. Learned early that systems keep people alive — or fail them. No room for hand-waving." },
        { year: "2006", tag: "MEDICAL RETIREMENT", body: "An injury ended the plan I had. The blueprint was gone before I’d finished reading it." },
        { year: "2009", tag: "REBUILT", body: "Went back to school. Rewrote the trajectory by hand, one decision at a time." },
        { year: "2013", tag: "ENTERPRISE TRANSFORMATION", body: "Into consulting. Running change inside institutions where mistakes are public." },
        { year: "2017", tag: "FORTUNE 100", body: "Running transformation programs under federal regulators. Controls, audits, evidence." },
        { year: "2024", tag: "LEFT CORPORATE", body: "Walked away from the title to build the thing myself, on my own terms." },
        { year: "2026", tag: "BUILDING AI INFRASTRUCTURE", body: "Agent teams that execute — governed by default. Still building." },
      ],
    },

    principles: {
      index: "07",
      kicker: "OPERATING PRINCIPLES",
      title: "How I build.",
      items: [
        "Execution is the product. Governance is the proof.",
        "If you can’t prove what moved, when, and why — it didn’t ship safely.",
        "Autonomy is a dial, not a default. You set it.",
        "Accountability is a design constraint, not a press release.",
        "Small teams, tight scope. Three sharp agents beat thirty loose ones.",
      ],
    },

    building: {
      index: "08",
      kicker: "BUILDING IN PUBLIC",
      command: "$ status --live",
      entries: [
        { date: "2026-05-28", text: "MAVIS handoff-confidence threshold tuned to 0.82" },
        { date: "2026-05-26", text: "ATLAS audit-log schema v3 merged" },
        { date: "2026-05-22", text: "VICTORIA reviewed 1,200 control statements (supervised)" },
        { date: "2026-05-19", text: "Immutable timestamp signing rolled out across the fleet" },
        { date: "2026-05-15", text: "Published Q2 governance posture" },
      ],
      footerLine: "Real-time updates from Supabase. Last sync: today.",
    },

    closing: {
      index: "07",
      title: "Still Building.",
      sub: "Systems evolve. So do I.",
      cta: "START A CONVERSATION",
      note: "Built with intentionality. No hype. No funnels.",
    },

    bands: {
      boardroom: { tag: "// WHERE THE STANDARD CAME FROM", line: "Rooms where being wrong had consequences.", meta: "BANKS · REGULATORS · FORTUNE 100" },
      archive: { tag: "// CHAIN OF CUSTODY", line: "Every action, kept. Every decision, provable.", meta: "IMMUTABLE AUDIT TRAIL" },
    },

    footer: {
      copyright: "© 2026 Jane Riveros",
      links: [
        { id: "li", label: "LinkedIn", href: "#" },
        { id: "yt", label: "YouTube", href: "#" },
      ],
      version: "v1.0 — built without a blueprint",
    },
  },

  /* ===================== ESPAÑOL ===================== */
  es: {
    meta: { lang: "ES", other: "EN" },

    nav: {
      logo: "Jane Riveros.",
      links: [
        { id: "home", label: "Inicio", href: "#top" },
        { id: "work", label: "Proyectos", href: "#builds" },
        { id: "book", label: "Agendar llamada", href: "#contact" },
      ],
    },

    hero: {
      eyebrow: "// TRANSFORMACIÓN EMPRESARIAL → IA AGÉNTICA",
      name: "Jane Riveros",
      tagline: "Construido Sin Plano.",
      accent: "Equipos de agentes que entregan el programa.",
      proof: "Gobernados como goberné transformaciones Fortune 100. No te llevarán a juicio.",
      lede: "Quince años dirigiendo programas de transformación Fortune 100 bajo reguladores federales — donde llegar tarde no era opción y un control faltante era una multa, no una advertencia. Hoy construyo equipos de agentes que ejecutan igual: rápidos, gobernados y capaces de probar cada movimiento.",
      ctaPrimary: "Ver lo que he construido",
      ctaSecondary: "Agendar llamada",
      scroll: "DESLIZA",
      chip: { id: "MAVIS", live: "EN VIVO", speaking: "HABLANDO" },
      talk: "Habla con MAVIS",
      tryLine: "Prueba el agente en vivo — luego agenda una llamada.",
      status: { live: "EN VIVO", loc: "SANTIAGO, CL", sys: "SISTEMAS NOMINALES", local: "LOCAL" },
    },

    architecture: {
      index: "01",
      kicker: "ARQUITECTURA DEL SISTEMA",
      title: "Un Sistema Vivo.\nNo una Colección de Herramientas.",
      subtitle:
        "Una persona responsable. Equipos de agentes especialistas que ejecutan. Cada acción acotada, registrada y demostrable. Pasa el cursor sobre un nodo para inspeccionarlo.",
      hint: "PASA EL CURSOR / TOCA UN NODO",
      center: {
        id: "JANE",
        role: "Capa de gobernanza · humano en el circuito",
        capabilities: [
          "Define los límites dentro de los que opera cada agente",
          "Es dueña del estándar con el que se mide la flota",
          "La responsabilidad final nunca deja de ser de una persona",
        ],
      },
      nodes: [
        {
          id: "MAVIS",
          role: "Agente conversacional de operaciones",
          status: "EN VIVO",
          capabilities: [
            "Voz + texto en tiempo real, transcripción completa",
            "Cada respuesta registrada, fechada y atribuible",
            "Permisos acotados — actúa solo dentro de lo aprobado",
            "Cede a un humano en cuanto baja la confianza",
          ],
        },
        {
          id: "ATLAS",
          role: "Motor de evidencia y auditoría",
          status: "EN CONSTRUCCIÓN",
          capabilities: [
            "Conecta cada decisión con su documento de origen",
            "Registro de auditoría inmutable en toda la flota",
            "Monitoreo continuo de controles contra la política",
            "Genera informes listos para el regulador",
          ],
        },
        {
          id: "VICTORIA",
          role: "Revisora de política y cumplimiento",
          status: "ENTRENANDO",
          capabilities: [
            "Lee nueva regulación y marca flujos afectados",
            "Redacta lenguaje de control para firma humana",
            "Aprende de cada corrección del revisor",
            "Solo supervisada — sin acciones autónomas aún",
          ],
        },
      ],
    },

    builds: {
      index: "02",
      kicker: "PROYECTOS EN VIVO",
      title: "Tres sistemas. Tres estados de despliegue.",
      cards: [
        {
          id: "MAVIS",
          status: "EN VIVO",
          desc: "En producción. Ejecuta el trabajo en vivo de extremo a extremo — conversación, ejecución, orquestación — con total observabilidad.",
          features: [
            "Interfaz de voz + texto",
            "Trazabilidad de transcripciones",
            "Cesión a humano por confianza",
            "Permisos acotados y revocables",
          ],
          cta: "VER",
        },
        {
          id: "ATLAS",
          status: "EN CONSTRUCCIÓN",
          desc: "Cableando la columna de auditoría a la que reporta el resto de la flota.",
          features: [
            "Decisiones vinculadas a su origen",
            "Registro de eventos inmutable",
            "Monitoreo continuo de controles",
            "Informes listos para el regulador",
          ],
          cta: "VER",
        },
        {
          id: "VICTORIA",
          status: "ENTRENANDO",
          desc: "La especialista regulatoria. Aprendiendo bajo supervisión — sin acciones autónomas aún.",
          features: [
            "Análisis de regulación",
            "Redacción de controles",
            "Ciclo de retroalimentación del revisor",
            "Ejecución solo supervisada",
          ],
          cta: "VER",
        },
      ],
    },

    mavis: {
      index: "03",
      kicker: "QUÉ HACE MAVIS",
      title: "Un agente. Toda la operación.",
      subtitle: "Habla, recuerda, ejecuta y dirige al resto del equipo — todo registrado, todo dentro de los límites que yo fijo.",
      channels: [
        { id: "CONVERSAR", lines: [["HABLA", "Voz o texto en vivo, en inglés o español, en tiempo real"]] },
        { id: "RECORDAR", lines: [["RECUERDA", "Contexto, preferencias y decisiones pasadas entre sesiones"]] },
        { id: "EJECUTAR", lines: [
          ["CONSTRUYE", "Crea flujos de automatización"],
          ["COMPRA", "Realiza compras"],
          ["PUBLICA", "Actualiza sitios web"],
          ["ENTREGA", "Genera y entrega documentos y archivos"],
        ] },
        { id: "ORQUESTAR", lines: [
          ["DESPACHA", "Asigna trabajo a pods de agentes especialistas"],
          ["CONSULTA", "Consulta a especialistas"],
          ["ENSAMBLA", "Reúne la respuesta del equipo en una sola"],
        ] },
        { id: "INTEGRAR", lines: [
          ["SLACK", "Lee y publica en Slack"],
          ["INGIERE", "Procesa PDFs, documentos Word y presentaciones"],
          ["CONECTA", "Se conecta a tus herramientas"],
        ] },
        { id: "GOBERNAR", authority: true, lines: [
          ["ALCANCE", "Opera con permisos acotados y revocables"],
          ["CESIÓN", "Cede a un humano bajo un umbral de confianza"],
          ["REGISTRO", "Registra cada intercambio en una auditoría inmutable"],
          ["LÍMITE", "Nunca cruza los límites que fija Jane"],
        ] },
      ],
      governNote: "Cada capacidad de EJECUTAR opera bajo la autoridad de GOBERNAR.",
      hint: "PASA EL CURSOR / TOCA UN CANAL",
    },

    flow: {
      index: "04",
      kicker: "EL FLUJO OPERATIVO",
      title: "Cuatro flujos. Una cadena de custodia.",
      subtitle: "Mavis lleva la operación. Novaxis lleva la oficina del programa. Los especialistas redactan bajo supervisión. Nada se mueve sin registro — y nada cruza los límites que yo fijo.",
      hint: "PASA EL CURSOR / TOCA UN PASO",
      tracks: [
        { id: "FLUJO 01", actor: "MAVIS · la operación", status: "EN VIVO", steps: [
          ["RECIBE", "Llega una solicitud por voz o texto"],
          ["VERIFICA ALCANCE", "Revisa permisos acotados y revocables"],
          ["RECUERDA CONTEXTO", "Trae el historial relevante de la memoria"],
          ["DECIDE", "Hacerlo, delegarlo o escalarlo"],
          ["ACTÚA / DESPACHA", "Ejecuta directo, o cede a un pod especialista"],
          ["UMBRAL DE CONFIANZA", "Bajo el umbral → cede a un humano"],
          ["RESPONDE + REGISTRA", "Responde y escribe el intercambio en la auditoría"],
        ] },
        { id: "FLUJO 02", actor: "NOVAXIS · la oficina del programa", status: "COLUMNA", steps: [
          ["INGRESO", "Recibe el trabajo enrutado por Mavis"],
          ["APLICA POLÍTICA", "Aplica los límites que fijó Jane"],
          ["ASIGNA POD", "Enruta al equipo especialista correcto (hasta 10 pods, 3 agentes c/u)"],
          ["LEE / ESCRIBE MEMORIA", "Contexto compartido en toda la flota"],
          ["TRANSMITE AL REGISTRO", "Cada acción, registrada de forma inmutable"],
          ["MONITOREA", "Chequeos continuos contra el estándar"],
          ["DEVUELVE", "Resultado más un registro de auditoría completo"],
        ] },
        { id: "FLUJO 03", actor: "VICTORIA + MAVIS · la consulta especialista", status: "ENTRENANDO", steps: [
          ["CASO DIFÍCIL", "Mavis encuentra algo que requiere juicio regulatorio"],
          ["CONSULTA A VICTORIA", "Enrutado a través de Novaxis"],
          ["ANALIZA REGULACIÓN", "Victoria lee las reglas relevantes"],
          ["REDACTA EN CONTROLES", "Convierte reglas en lenguaje de control"],
          ["CICLO DE REVISIÓN", "Un humano revisa antes de que algo se envíe"],
          ["DEVUELVE CON CITAS", "Cada afirmación enlazada a su origen"],
          ["MAVIS ENTREGA + REGISTRA", "Victoria nunca actúa sola"],
        ] },
      ],
      radial: {
        id: "FLUJO 04",
        title: "Mavis orquesta la flota.",
        ring: "JANE — CAPA DE GOBERNANZA",
        ringNote: "Fija los límites. Mantiene la responsabilidad final.",
        center: "MAVIS",
        centerNote: "Orquestadora · interfaz única",
        spokes: [
          { id: "NOVAXIS", note: "Oficina del programa — enrutamiento, memoria, ejecución" },
          { id: "PODS", label: "PODS ESPECIALISTAS", note: "Hasta 30 agentes · equipos de 3 · cada uno una disciplina" },
          { id: "VICTORIA", note: "Regulatorio · supervisado" },
          { id: "ATLAS", note: "Evidencia + auditoría · registra todo" },
        ],
        returnPath: "Cada acción → auditoría → Jane",
        riskBranch: "Umbral de confianza / riesgo → cesión a humano",
        caption: "Mavis dirige el trabajo. Jane fija los límites. Nada se mueve fuera de ellos.",
      },
      dial: {
        label: "AUTONOMÍA",
        left: "PERSONAL · AUTONOMÍA TOTAL",
        right: "EMPRESA · GOBERNADO",
        caption: "Lo construí primero para mí — con autonomía total: agentes comprando, construyendo, publicando, llevando la empresa. Tú corres el mismo motor, gobernado según tu tolerancia al riesgo. La capa de Jane fija el dial.",
        ends: ["AUTONOMÍA TOTAL", "GOBERNADO"],
      },
    },

    before: {
      index: "05",
      kicker: "ANTES DE LOS AGENTES",
      title: "No aprendí a entregar con una presentación.",
      staccato: ["Bancos.", "Reguladores.", "Consultoras."],
      body: [
        "Quince años dentro de las instituciones que se auditan para vivir. Dirigí los programas de transformación donde un control faltante no era un bug — era un hallazgo, una multa, un nombre frente a un regulador.",
        "Aprendí que los sistemas en los que la gente confía son los que pueden mostrar su trabajo. Que entregar y rendir cuentas son la misma disciplina.",
        "Que “moverse rápido” no significa nada si no puedes probar qué se movió, cuándo y por qué.",
      ],
      photoCaption: "JANE RIVEROS · EN EL LUGAR",
    },

    journey: {
      index: "06",
      kicker: "LA TRAYECTORIA",
      title: "2002 → 2026",
      milestones: [
        { year: "2002", tag: "ALISTAMIENTO", body: "Militar. Aprendí pronto que los sistemas mantienen viva a la gente — o la fallan. Sin lugar para divagar." },
        { year: "2006", tag: "RETIRO MÉDICO", body: "Una lesión terminó el plan que tenía. El plano desapareció antes de terminar de leerlo." },
        { year: "2009", tag: "RECONSTRUCCIÓN", body: "Volví a estudiar. Reescribí la trayectoria a mano, una decisión a la vez." },
        { year: "2013", tag: "TRANSFORMACIÓN EMPRESARIAL", body: "A la consultoría. Dirigiendo el cambio en instituciones donde los errores son públicos." },
        { year: "2017", tag: "FORTUNE 100", body: "Dirigiendo programas de transformación bajo reguladores federales. Controles, auditorías, evidencia." },
        { year: "2024", tag: "DEJÉ EL CORPORATIVO", body: "Dejé el título para construir la cosa yo misma, en mis propios términos." },
        { year: "2026", tag: "CONSTRUYENDO INFRAESTRUCTURA DE IA", body: "Equipos de agentes que ejecutan — gobernados por defecto. Aún construyendo." },
      ],
    },

    principles: {
      index: "07",
      kicker: "PRINCIPIOS OPERATIVOS",
      title: "Cómo construyo.",
      items: [
        "La ejecución es el producto. La gobernanza es la prueba.",
        "Si no puedes probar qué se movió, cuándo y por qué — no se entregó de forma segura.",
        "La autonomía es un dial, no un valor por defecto. Tú lo ajustas.",
        "La responsabilidad es una restricción de diseño, no un comunicado de prensa.",
        "Equipos pequeños, alcance ajustado. Tres agentes afilados superan a treinta sueltos.",
      ],
    },

    building: {
      index: "08",
      kicker: "CONSTRUYENDO EN PÚBLICO",
      command: "$ status --live",
      entries: [
        { date: "2026-05-28", text: "Umbral de confianza de cesión de MAVIS ajustado a 0.82" },
        { date: "2026-05-26", text: "Esquema de registro de auditoría v3 de ATLAS integrado" },
        { date: "2026-05-22", text: "VICTORIA revisó 1.200 declaraciones de control (supervisada)" },
        { date: "2026-05-19", text: "Firma inmutable de marca temporal desplegada en la flota" },
        { date: "2026-05-15", text: "Publicada la postura de gobernanza del Q2" },
      ],
      footerLine: "Actualizaciones en tiempo real desde Supabase. Última sincronización: hoy.",
    },

    closing: {
      index: "07",
      title: "Aún Construyendo.",
      sub: "Los sistemas evolucionan. Yo también.",
      cta: "INICIAR UNA CONVERSACIÓN",
      note: "Construido con intención. Sin hype. Sin embudos.",
    },

    bands: {
      boardroom: { tag: "// DE DÓNDE VINO EL ESTÁNDAR", line: "Salas donde equivocarse tenía consecuencias.", meta: "BANCOS · REGULADORES · FORTUNE 100" },
      archive: { tag: "// CADENA DE CUSTODIA", line: "Cada acción, guardada. Cada decisión, demostrable.", meta: "AUDITORÍA INMUTABLE" },
    },

    footer: {
      copyright: "© 2026 Jane Riveros",
      links: [
        { id: "li", label: "LinkedIn", href: "#" },
        { id: "yt", label: "YouTube", href: "#" },
      ],
      version: "v1.0 — construido sin plano",
    },
  },
};

export type Lang = keyof typeof CONTENT;
export type SiteContent = (typeof CONTENT)['en'];
