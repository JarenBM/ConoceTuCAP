import { useState } from 'react'

// Paleta Morada Institucional del CAP / UC
const card = 'rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(92,45,145,0.08)] border border-purple-100/60'
const btnPrimary =
  'inline-flex items-center justify-center rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-purple-800 active:scale-[0.98]'
const btnAccent =
  'inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-slate-900 shadow-md shadow-amber-200 transition hover:bg-amber-400 active:scale-[0.98]'
const btnOutline =
  'inline-flex items-center justify-center rounded-xl border-2 border-purple-700 px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-700 hover:text-white active:scale-[0.98]'

// Datos Oficiales del CAP - Sede Huancayo
const GOOGLE_FORMS_CAP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScRXyfCnI0dvraZgFj2kwmhGd9rSV3F9pKy_jXCuL1jgGwZVw/viewform' 
const CAP_EMAIL_HUANCAYO = 'mailto:centrodeatencionpsicologica@continental.edu.pe'
const WEB_URL = 'https://conoce-tu-cap.vercel.app/'
// Pega aquí el número OFICIAL de urgencias/WhatsApp del CAP (solo dígitos con código de país, ej. '51987654321').
// Si lo dejas vacío, el botón de llamada no se muestra.
const CAP_TELEFONO_URGENCIA = '970727579'
const CAP_HORARIO = 'Lunes a viernes: 9:00 a.m. a 1:00 p.m. y 3:00 p.m. a 7:00 p.m.'
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Av.+San+Carlos+1980+Huancayo'
const CAP_FOTO = '/cap-entrada.png' // sube tu foto a la carpeta public/ con este nombre
const CAP_PORTAL_OFICIAL = 'https://estudiantes.ucontinental.edu.pe/oficinas/bienestar-universitario/centro-de-atencion-psicologica/'

// Equipo Real de Psicólogos de la Sede Huancayo (C.Ps.P.)
const psychologistsHuancayo = [
  { name: 'Psic. Jorge Martin Contreras Guerrero', colegiatura: 'C.Ps.P. 19280' },
  { name: 'Psic. Almendra Bartra Tovar', colegiatura: 'C.Ps.P. 57040' },
  { name: 'Psic. Jhakileine Capcha Arroyo', colegiatura: 'C.Ps.P. 60974' },
  { name: 'Psic. Diana Procil Flores', colegiatura: 'C.Ps.P. 50483' },
]

// Playlists y Podcasts Reales en Spotify
const spotifyResources = {
  playlists: [
    {
      title: 'Peaceful Piano',
      desc: 'Música instrumental suave para reducir el estrés durante semanas de exámenes.',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
      badge: 'Relajación'
    },
    {
      title: 'Deep Focus',
      desc: 'Sonidos ambientales y música de enfoque profundo para sesiones de estudio.',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadARdKQ',
      badge: 'Concentración'
    },
    {
      title: 'Lo-Fi Chill Beats',
      desc: 'Ritmos tranquilos y constantes para acompañar tus lecturas universitarias.',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX8Ueb9X3V3R0',
      badge: 'Calma'
    }
  ],
  podcasts: [
    {
      title: 'Entiende Tu Mente',
      desc: 'Podcast de psicología clínica en episodios breves de 20 minutos.',
      url: 'https://open.spotify.com/search/Entiende%20Tu%20Mente',
      badge: 'Psicología'
    },
    {
      title: 'Psicología al Desnudo',
      desc: 'Herramientas prácticas sobre gestión de ansiedad y autorregulación emocional.',
      url: 'https://open.spotify.com/search/Psicologia%20al%20Desnudo',
      badge: 'Bienestar'
    },
    {
      title: 'Despertando Podcast',
      desc: 'Audios breves de 5 minutos para iniciar el día con mente clara y motivación.',
      url: 'https://open.spotify.com/search/Despertando%20Podcast',
      badge: 'Motivación'
    }
  ]
}

// Biblioteca de Guías y Libros en PDF
const pdfResources = [
  {
    title: 'En Tiempos de Estrés (OPS / OMS)',
    desc: 'Guía con ejercicios sencillos para manejar el estrés y la ansiedad.',
    url: 'https://www.who.int/es/publications/i/item/9789240003927',
    badge: 'Guía Oficial OMS',
    type: 'Guía ilustrada'
  },
  {
    title: 'Primeros Auxilios Psicológicos (OPS)',
    desc: 'Cómo apoyar a un compañero o familiar que está pasando un mal momento.',
    url: 'https://iris.paho.org/handle/10665.2/31081',
    badge: 'Manual OPS',
    type: 'Lectura práctica'
  },
  {
    title: 'Salud Mental y Bienestar (UNICEF)',
    desc: 'Consejos de autocuidado emocional pensados para jóvenes.',
    url: 'https://www.unicef.org/lac/informes/salud-mental-adolescentes-y-jovenes',
    badge: 'Informe UNICEF',
    type: 'Lectura'
  }
]

const Icon = ({ d, className = 'size-6' }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d={d} />
  </svg>
)

const ic = {
  lock: 'M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5zM12 15v2',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M6 6l12 12M18 6L6 18',
  chat: 'M4 5h16v11H9l-5 4zM8 10h8',
  doc: 'M7 3h8l4 4v14H7zM14 3v5h5M10 13h6M10 17h6',
  chev: 'M6 9l6 6 6-6',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z',
  mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm5 10a5 5 0 0 1-10 0M12 19v3',
  map: 'M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  external: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3'
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-10 place-items-center rounded-xl bg-purple-700 font-display text-lg font-bold text-white shadow-sm">
        C<span className="text-amber-400">·</span>
      </div>
      <div className="leading-tight">
        <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-purple-800">Universidad Continental</p>
        <p className="font-display text-base font-bold text-slate-900">Conoce tu CAP</p>
      </div>
    </div>
  )
}

const questions = [
  '¿Sientes que tus tareas y exámenes te sobrepasan últimamente?',
  '¿Te cuesta conciliar el sueño o concentrarte por angustia académica?',
  '¿Has sentido la necesidad de aislarte de tus compañeros o entorno?'
]
const options = ['Nunca', 'A veces', 'Frecuentemente']

function Semaforo() {
  const [ans, setAns] = useState<number[]>([])
  const done = ans.length === 3
  const score = ans.reduce((a, b) => a + b, 0)
  const res =
    score <= 2
      ? { c: 'bg-emerald-500', t: 'Semáforo Verde: Buen equilibrio', d: 'Tus niveles de tensión son manejables. Te invitamos a mantener tus hábitos y consultar nuestros recursos preventivos.' }
      : score <= 4
        ? { c: 'bg-amber-400', t: 'Semáforo Amarillo: Estrés moderado', d: 'Tu carga emocional está aumentando. Una orientación preventiva con los psicólogos del CAP te puede ayudar.' }
        : { c: 'bg-rose-500', t: 'Semáforo Rojo: Necesitas una pausa', d: 'Te recomendamos solicitar una cita en el CAP. Recuerda que la atención es 100% gratuita y confidencial.' }
  const q = ans.length

  return (
    <div className={card}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-purple-900">Semáforo Emocional Anónimo</h3>
          <p className="mt-1 text-sm text-slate-600">Autochequeo rápido en 3 preguntas. Sin registro ni almacenamiento de datos.</p>
        </div>
        <div className="flex flex-col gap-1.5 rounded-full bg-purple-950 p-2 shadow-inner">
          {['bg-rose-500', 'bg-amber-400', 'bg-emerald-500'].map((c) => (
            <span key={c} className={`size-3.5 rounded-full ${c} ${done && res.c !== c ? 'opacity-25' : ''}`} />
          ))}
        </div>
      </div>

      {!done ? (
        <div className="mt-5" key={q}>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">Pregunta {q + 1} de 3</p>
          <p className="mt-1.5 font-medium text-slate-800">{questions[q]}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {options.map((o, i) => (
              <button key={o} onClick={() => setAns([...ans, i])} className="rounded-xl border border-purple-200 bg-purple-50/40 px-3 py-2.5 font-medium text-purple-900 transition hover:border-purple-600 hover:bg-purple-100/50 active:scale-95">
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl bg-purple-50 p-4 border border-purple-100">
          <p className="flex items-center gap-2 font-display font-bold text-slate-900">
            <span className={`size-3.5 rounded-full ${res.c}`} />{res.t}
          </p>
          <p className="mt-1.5 text-sm text-slate-600">{res.d}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={GOOGLE_FORMS_CAP_URL} target="_blank" rel="noopener noreferrer" className={`${btnAccent} text-sm py-2 px-4`}>
              Solicitar Cita en el CAP
            </a>
            <button onClick={() => setAns([])} className="text-xs font-semibold text-purple-700 underline hover:text-purple-900">
              Repetir autochequeo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const faqs = [
  ['¿Aparece algún cobro en mi boleta de pago o pensión?', 'No. El servicio del Centro de Atención Psicológica (CAP) es 100% gratuito para todos los estudiantes matriculados en la Universidad Continental.'],
  ['¿Mis profesores, coordinadores o padres se enterarán?', 'No. Se aplica el principio de estricto secreto profesional. Las atenciones son totalmente confidenciales y no quedan registradas en tu historial académico.'],
  ['¿Cuál es el horario de atención?', 'Lunes a viernes, de 9:00 a.m. a 1:00 p.m. y de 3:00 p.m. a 7:00 p.m. Puedes enviar tu solicitud a cualquier hora y el CAP la atenderá en su horario.'],
  ['¿Cómo es la primera cita?', 'Es una conversación tranquila con un psicólogo del CAP donde cuentas cómo te sientes. No necesitas preparar nada ni llevar documentos especiales. Puedes elegir atención presencial o virtual.'],
  ['¿Qué pasa si necesito algo más que orientación?', 'Si el psicólogo considera que necesitas atención especializada, te deriva al Policlínico y te explica cómo continuar. Todo se coordina contigo desde el CAP.'],
  ['¿Qué hago si tengo una urgencia emocional?', 'Si sientes que no puedes esperar a una cita, mira la sección de Urgencias más abajo. Ahí encuentras a quién llamar ahora mismo.'],
  ['¿Quiénes atienden en el CAP y qué modalidad ofrecen?', 'El equipo está conformado por psicólogos profesionales colegiados de la universidad. La atención se ofrece en modalidad presencial en el campus Huancayo y virtual por Google Meet.'],
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={`${card} divide-y divide-purple-100 px-5`}>
      {faqs.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold text-purple-950">
            {q}
            <Icon d={ic.chev} className={`size-5 shrink-0 text-purple-700 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <div className="pb-4 text-sm leading-relaxed text-slate-600">
              {a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [spotifyTab, setSpotifyTab] = useState<'playlists' | 'podcasts'>('playlists')
  const [fotoOk, setFotoOk] = useState(true)

  return (
    <div className="min-h-screen bg-[#F9F6FC] text-slate-800 font-sans antialiased">
      {/* Navbar Superior */}
      <header className="sticky top-0 z-40 border-b border-purple-100/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Logo />
          
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#inicio" className="text-sm font-medium text-slate-600 transition hover:text-purple-800">Inicio</a>
            <a href="#ejes" className="text-sm font-medium text-slate-600 transition hover:text-purple-800">Ejes del CAP</a>
            <a href="#equipo" className="text-sm font-medium text-slate-600 transition hover:text-purple-800">Equipo Huancayo</a>
            <a href="#autochequeo" className="text-sm font-medium text-slate-600 transition hover:text-purple-800">Autochequeo</a>
            <a href="#recursos" className="text-sm font-medium text-slate-600 transition hover:text-purple-800">Biblioteca & Spotify</a>
            <a href={GOOGLE_FORMS_CAP_URL} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} py-2 px-4 text-xs uppercase tracking-wider`}>
              Agenda tu cita
            </a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl p-2 text-purple-800 hover:bg-purple-50 md:hidden" aria-label="Menú">
            <Icon d={menuOpen ? ic.x : ic.menu} className="size-6" />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-purple-100 bg-white p-4 space-y-3 md:hidden">
            <a href="#inicio" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-700 py-1">Inicio</a>
            <a href="#ejes" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-700 py-1">Ejes del CAP</a>
            <a href="#equipo" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-700 py-1">Equipo Huancayo</a>
            <a href="#autochequeo" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-700 py-1">Autochequeo Emocional</a>
            <a href="#recursos" onClick={() => setMenuOpen(false)} className="block font-medium text-slate-700 py-1">Biblioteca & Spotify</a>
            <a href={GOOGLE_FORMS_CAP_URL} target="_blank" rel="noopener noreferrer" className={`${btnAccent} w-full text-center py-3 mt-2 block`}>
              Agenda tu Cita Discreta
            </a>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-4 py-8 sm:py-12">
        {/* HERO SECTION */}
        <section id="inicio" className="grid gap-8 items-center lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 px-3.5 py-1.5 text-xs font-semibold text-purple-800">
              <Icon d={ic.shield} className="size-4 text-purple-700" />
              Servicio Gratuito y Confidencial · Sede Huancayo
            </div>
            
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-purple-950 sm:text-4xl lg:text-5xl leading-tight">
              Tu salud mental <br />
              <span className="text-purple-700">también es una prioridad</span>
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              El Centro de Atención Psicológica (CAP) brinda un espacio seguro de acompañamiento especializado para potenciar tu bienestar emocional y rendimiento académico.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href={GOOGLE_FORMS_CAP_URL} target="_blank" rel="noopener noreferrer" className={`${btnAccent} text-base`}>
                Agenda tu cita discreta <Icon d={ic.external} className="ml-2 size-4" />
              </a>
              <a href="#autochequeo" className={`${btnOutline} text-base`}>
                Hacer Autochequeo
              </a>
            </div>

            <div className="pt-3 flex items-center gap-6 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><Icon d={ic.lock} className="size-4 text-purple-700" /> 100% Confidencial</span>
              <span className="flex items-center gap-1.5"><Icon d={ic.doc} className="size-4 text-purple-700" /> Sin cobros en boleta</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className={`${card} p-6 bg-gradient-to-br from-purple-900 to-purple-800 text-white relative overflow-hidden`}>
              <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-purple-600/30 blur-2xl" />
              <h3 className="font-display text-xl font-bold">¿Cuándo acudir al CAP?</h3>
              <ul className="mt-4 space-y-3 text-sm text-purple-100">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span> Carga o agotamiento por trabajos y evaluaciones.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span> Dificultad para concentrarte o adaptarte a la universidad.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span> Situaciones personales o familiares que afectan tu tranquilidad.
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-purple-700/60 flex justify-between items-center text-xs text-purple-200">
                <span>Atención Presencial y Virtual</span>
                <span className="font-bold text-amber-300">UC Huancayo</span>
              </div>
            </div>
          </div>
        </section>

        {/* GARANTÍA */}
        <section className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-purple-400 bg-white p-5 text-center sm:flex-row sm:text-left">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-purple-700 text-white">
            <Icon d={ic.shield} className="size-6" />
          </div>
          <p className="text-base font-semibold text-purple-950">
            Tu atención es <span className="text-purple-700">gratuita</span>, <span className="text-purple-700">confidencial</span> y no aparece ningún cobro en tu boleta de pago.
          </p>
        </section>

        {/* PROCESO DE CITA */}
        <section id="proceso" className="scroll-mt-20 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="font-display text-2xl font-bold text-purple-950">¿Qué pasa después de pedir tu cita?</h2>
            <p className="text-sm text-slate-600">Así de simple es el camino, paso a paso.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['1', 'Llenas el formulario', 'Es corto y lo envías desde tu celular o computadora.'],
              ['2', 'El CAP te contacta', 'Revisan tu solicitud y se comunican contigo para coordinar día y hora.'],
              ['3', 'Tu primera orientación', 'Conversas con un psicólogo del CAP, en persona o virtual.'],
              ['4', 'Si hace falta, derivación', 'Si necesitas atención especializada, te derivan al Policlínico y te explican cómo seguir.']
            ].map(([n, t, d]) => (
              <div key={n} className={`${card} p-5`}>
                <span className="grid size-9 place-items-center rounded-full bg-purple-700 font-display text-sm font-bold text-white">{n}</span>
                <h3 className="mt-3 font-bold text-purple-950">{t}</h3>
                <p className="mt-1 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500">
            ¿Tienes dudas antes de empezar? Escríbenos a <a href={CAP_EMAIL_HUANCAYO} className="font-semibold text-purple-700 underline">centrodeatencionpsicologica@continental.edu.pe</a>
          </p>
        </section>

        {/* EJES OFICIALES DEL CAP */}
        <section id="ejes" className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-purple-950 sm:text-3xl">Nuestros Ejes de Atención</h2>
            <p className="text-sm text-slate-600">Estrategias integrales diseñadas por la Universidad Continental para cuidar tu salud mental.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className={card}>
              <div className="grid size-12 place-items-center rounded-xl bg-purple-100 text-purple-800 mb-4">
                <Icon d={ic.chat} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">1. Promoción</span>
              <h3 className="font-bold text-purple-900 text-base mt-1">Webinars y Campañas</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">Talleres dinámicos sobre manejo del estrés, gestión del tiempo, procrastinación y hábitos de estudio.</p>
            </div>

            <div className={card}>
              <div className="grid size-12 place-items-center rounded-xl bg-purple-100 text-purple-800 mb-4">
                <Icon d={ic.shield} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">2. Prevención</span>
              <h3 className="font-bold text-purple-900 text-base mt-1">Grupos GAM y PsicoKIT</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">Grupos de Apoyo Mutuo, Club Sin Fronteras para foráneos y módulos interactivos de entrenamiento emocional.</p>
            </div>

            <div className={card}>
              <div className="grid size-12 place-items-center rounded-xl bg-purple-100 text-purple-800 mb-4">
                <Icon d={ic.doc} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">3. Contención</span>
              <h3 className="font-bold text-purple-900 text-base mt-1">Consejería Individual</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">Soporte emocional individualizado, orientación vocacional y acompañamiento en momentos de crisis o malestar.</p>
            </div>
          </div>
        </section>

        {/* EQUIPO REAL DE PSICÓLOGOS DE SEDE HUANCAYO */}
        <section id="equipo" className={`${card} bg-gradient-to-br from-purple-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 space-y-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800/60 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Campus Huancayo</span>
              <h2 className="font-display text-2xl font-bold text-white mt-1">Conoce a tu Equipo de Psicólogos</h2>
              <p className="text-xs text-purple-200">Profesionales colegiados dedicados al acompañamiento de los estudiantes de la sede.</p>
            </div>
            <a href={CAP_PORTAL_OFICIAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white underline">
              Portal del Estudiante UC <Icon d={ic.external} className="size-3.5" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {psychologistsHuancayo.map((psi) => (
              <div key={psi.name} className="rounded-xl bg-purple-900/40 border border-purple-800/60 p-4 space-y-2">
                <div className="grid size-9 place-items-center rounded-lg bg-purple-800 text-amber-300">
                  <Icon d={ic.user} className="size-5" />
                </div>
                <h4 className="font-bold text-white text-sm leading-snug">{psi.name}</h4>
                <p className="text-[11px] font-medium text-amber-300">{psi.colegiatura}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AUTOCHEQUEO EMOCIONAL */}
        <section id="autochequeo" className="scroll-mt-20">
          <Semaforo />
        </section>

        {/* RECURSOS MULTIMEDIA, SPOTIFY Y BIBLIOTECA PDF */}
        <section id="recursos" className="scroll-mt-20 space-y-8">
          {/* Módulo Spotify */}
<div className="rounded-2xl bg-purple-950 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-purple-800">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800 pb-6">
    <div className="flex items-center gap-3">
      <div className="grid size-12 place-items-center rounded-2xl bg-emerald-500 text-slate-950">
        <Icon d={ic.music} className="size-6" />
      </div>
      <div>
        <h3 className="font-display font-bold text-xl text-white">Espacio Spotify CAP</h3>
        <p className="text-xs text-purple-200 font-medium">Música de concentración y podcasts de motivación</p>
      </div>
    </div>

    <div className="flex rounded-xl bg-purple-900 p-1 border border-purple-700">
      <button
        onClick={() => setSpotifyTab('playlists')}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
          spotifyTab === 'playlists' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-purple-200 hover:text-white'
        }`}
      >
        <Icon d={ic.music} className="size-4" /> Playlists
      </button>
      <button
        onClick={() => setSpotifyTab('podcasts')}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
          spotifyTab === 'podcasts' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-purple-200 hover:text-white'
        }`}
      >
        <Icon d={ic.mic} className="size-4" /> Podcasts
      </button>
    </div>
  </div>

  <div className="grid gap-4 sm:grid-cols-3">
    {spotifyResources[spotifyTab].map((item) => (
      <div key={item.title} className="flex flex-col justify-between rounded-xl bg-purple-900 p-5 border border-purple-700/80 hover:border-emerald-400 transition shadow-md">
        <div className="space-y-2">
          <span className="inline-block rounded-md bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
            {item.badge}
          </span>
          <h4 className="font-bold text-white text-base">{item.title}</h4>
          <p className="text-xs text-purple-100 leading-relaxed">{item.desc}</p>
        </div>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-95 shadow-sm"
        >
          Escuchar en Spotify <Icon d={ic.external} className="size-3.5" />
        </a>
      </div>
    ))}
  </div>
</div>

          {/* Biblioteca PDF */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-purple-700 text-white">
                <Icon d={ic.doc} className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-purple-950">Guías de Autocuidado</h3>
                <p className="text-xs text-slate-600">Lecturas cortas y gratuitas para cuidarte</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {pdfResources.map((doc) => (
                <div key={doc.title} className={`${card} bg-purple-50/50 border-purple-200/80 p-5 flex flex-col justify-between hover:border-purple-400 transition`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-purple-200/80 px-2 py-0.5 text-[11px] font-bold text-purple-900">
                        {doc.badge}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{doc.type}</span>
                    </div>
                    <h4 className="font-bold text-purple-950 text-sm leading-snug">{doc.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
                  </div>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-purple-800 active:scale-95"
                  >
                    Leer guía <Icon d={ic.external} className="size-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* URGENCIAS */}
        <section id="urgencias" className="scroll-mt-20 rounded-2xl border-2 border-rose-200 bg-rose-50 p-6 space-y-4">
          <h2 className="font-display text-2xl font-bold text-rose-900">¿Necesitas ayuda ahora mismo?</h2>
          <p className="text-sm text-rose-900/80">Si sientes que no puedes esperar a una cita, no estás solo/a. Puedes comunicarte hoy:</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {CAP_TELEFONO_URGENCIA && (
              <a href={`https://wa.me/${CAP_TELEFONO_URGENCIA}`} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} text-sm`}>
                Escribir al CAP por WhatsApp
              </a>
            )}
            <a href="tel:113" className={`${btnPrimary} text-sm`}>
              Llamar a la Línea 113 (opción 5 · salud mental)
            </a>
            <a href={CAP_EMAIL_HUANCAYO} className={`${btnOutline} text-sm`}>
              Escribir al correo del CAP
            </a>
          </div>
          <p className="text-xs text-rose-900/70">La Línea 113 del MINSA es gratuita y atiende todos los días. El CAP atiende en horario de oficina.</p>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section id="faq" className="space-y-4 scroll-mt-20">
          <h2 className="font-display text-2xl font-bold text-purple-950 text-center">Preguntas Frecuentes</h2>
          <Faq />
        </section>

        {/* UBICACIÓN Y CONTACTO DIRECTO CON IMAGEN */}
<section id="contacto" className="scroll-mt-20 rounded-2xl bg-purple-950 text-white p-6 sm:p-8 border border-purple-800 shadow-xl space-y-6">
  <div className="grid gap-8 lg:grid-cols-12 items-center">
    {/* Información de contacto */}
    <div className="lg:col-span-7 space-y-5">
      <div className="inline-flex items-center gap-2 rounded-full bg-purple-900 px-3.5 py-1 text-xs font-bold text-amber-300 border border-purple-700">
        <Icon d={ic.map} className="size-4 text-amber-400" />
        Sede Huancayo · Campus San Carlos
      </div>

      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
        ¿Dónde encuentras las oficinas del CAP?
      </h3>

      <div className="space-y-3 text-sm text-purple-100">
        <div className="flex items-start gap-3 rounded-xl bg-purple-900/80 p-3.5 border border-purple-700">
          <Icon d={ic.map} className="size-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="block text-white font-bold">Ubicación Campus:</strong>
            Av. San Carlos 1980, Huancayo, Junín (Pabellón de Bienestar Universitario).
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-purple-900/80 p-3.5 border border-purple-700">
          <Icon d={ic.doc} className="size-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="block text-white font-bold">Horario de atención:</strong>
            {CAP_HORARIO}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-purple-900/80 p-3.5 border border-purple-700">
          <Icon d={ic.mail} className="size-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="block text-white font-bold">Correo institucional directo:</strong>
            <a href={CAP_EMAIL_HUANCAYO} className="text-amber-300 font-semibold underline hover:text-amber-200">
              centrodeatencionpsicologica@continental.edu.pe
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border-2 border-purple-400 px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-purple-950 active:scale-95">
          <Icon d={ic.map} className="mr-2 size-4" /> Cómo llegar
        </a>
        <a href={CAP_EMAIL_HUANCAYO} className="inline-flex items-center justify-center rounded-xl border-2 border-purple-400 px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-purple-950 active:scale-95">
          <Icon d={ic.mail} className="mr-2 size-4" /> Enviar Correo Directo
        </a>
        <a href={GOOGLE_FORMS_CAP_URL} target="_blank" rel="noopener noreferrer" className={`${btnAccent} text-xs py-3 px-5`}>
          Solicitar Cita en Forms <Icon d={ic.external} className="ml-2 size-4" />
        </a>
      </div>
    </div>

    {/* Imagen y referencia visual de ubicación */}
    <div className="lg:col-span-5">
      <div className="relative rounded-2xl overflow-hidden border-2 border-purple-700 shadow-xl group">
        {fotoOk ? (
          <img
            src={CAP_FOTO}
            alt="Entrada de las oficinas del CAP, Sede Huancayo"
            onError={() => setFotoOk(false)}
            className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-gradient-to-br from-purple-800 to-purple-950 grid place-items-center">
            <Icon d={ic.map} className="size-16 text-purple-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/30 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-purple-950/90 backdrop-blur-md border border-purple-700 text-xs">
          <p className="font-bold text-amber-300 flex items-center gap-1.5">
            <Icon d={ic.map} className="size-4" /> Campus San Carlos — Huancayo
          </p>
          <p className="text-purple-100 mt-0.5 text-[11px]">La oficina está en el Pabellón de Bienestar Universitario. Atención presencial y virtual previa cita.</p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* QR */}
      <section id="qr" className="rounded-2xl bg-white border border-purple-100 p-6 sm:p-8 shadow-[0_4px_24px_rgba(92,45,145,0.08)]">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <img src="/qr-conoce-tu-cap.png" alt="Código QR de Conoce tu CAP" className="size-40 shrink-0 rounded-xl border border-purple-100" />
          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-purple-950">Escanea y comparte Conoce tu CAP</h2>
            <p className="text-sm text-slate-600">Apunta con la cámara de tu celular para entrar a esta página. Compártelo con tus compañeros.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              <a href="/qr-conoce-tu-cap.png" download="QR-Conoce-tu-CAP.png" className={`${btnPrimary} text-xs py-2.5 px-4`}>Descargar QR (PNG)</a>
              <a href="/qr-conoce-tu-cap.svg" download="QR-Conoce-tu-CAP.svg" className={`${btnOutline} text-xs py-2 px-4`}>Descargar QR (SVG)</a>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-purple-100 bg-white py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-5xl px-4 space-y-2">
          <p className="font-semibold text-purple-900">Universidad Continental · Centro de Atención Psicológica (CAP)</p>
          <p>Proyecto de Innovación Design Thinking — Sede Huancayo</p>
          <p className="text-[11px] text-slate-400 pt-2">© 2026 Universidad Continental. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
} 