import { useState } from 'react'

const card = 'rounded-2xl bg-white shadow-[0_4px_24px_rgba(31,73,125,0.08)]'
const btnPrimary =
  'inline-flex items-center justify-center rounded-xl bg-uc-red px-6 py-3.5 font-semibold text-white transition hover:bg-[#b8050f] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uc'
const btnOutline =
  'inline-flex items-center justify-center rounded-xl border-2 border-uc px-6 py-3 font-semibold text-uc transition hover:bg-uc hover:text-white active:scale-[0.98]'

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
  hospital: 'M4 21V6l8-3 8 3v15zM12 8v6M9 11h6M10 21v-4h4v4',
  chev: 'M6 9l6 6 6-6',
  down: 'M12 4v12M7 11l5 5 5-5M5 20h14',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  check: 'M5 12l5 5 9-10',
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-10 place-items-center rounded-xl bg-uc font-display text-lg font-bold text-white">
        C<span className="text-uc-red">·</span>
      </div>
      <div className="leading-tight">
        <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-uc">Universidad Continental</p>
        <p className="font-display text-base font-bold text-[#14263d]">Conoce tu CAP</p>
      </div>
    </div>
  )
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const emailOk = /^[^\s@]+@continental\.edu\.pe$/i.test(email)
  const field =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-uc focus:ring-4 focus:ring-uc/15'
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0b1d33]/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal className="pop relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-slate-500 hover:bg-mist">
          <Icon d={ic.x} className="size-5" />
        </button>
        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon d={ic.check} className="size-8" />
            </div>
            <h3 className="text-2xl font-bold text-uc">¡Cita solicitada!</h3>
            <p className="mt-2 text-slate-600">Te enviaremos la confirmación a tu correo institucional.</p>
            <button onClick={onClose} className={`${btnPrimary} mt-6 w-full`}>Entendido</button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (emailOk) setSent(true)
            }}
            className="space-y-4"
          >
            <h3 className="pr-8 text-2xl font-bold text-uc">Reserva tu cita en menos de 1 minuto</h3>
            <label className="block">
              <span className="mb-1.5 block font-medium">Nombres y Apellidos</span>
              <input required className={field} placeholder="Ej. Lucía Quispe Rojas" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-medium">Código Estudiantil</span>
              <input required inputMode="numeric" pattern="[0-9]{8,10}" title="8 a 10 dígitos" className={field} placeholder="74561234" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-medium">Correo Institucional</span>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} ${email && !emailOk ? 'border-uc-red' : ''}`} placeholder="usuario@continental.edu.pe" />
              {email && !emailOk && <span className="mt-1 block text-xs text-uc-red">Usa tu correo @continental.edu.pe</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block font-medium">Modalidad y Horario Preferido</span>
              <select required defaultValue="" className={field}>
                <option value="" disabled>Selecciona una opción</option>
                <option>Presencial en campus · Mañana</option>
                <option>Presencial en campus · Tarde</option>
                <option>Virtual por Google Meet · Mañana</option>
                <option>Virtual por Google Meet · Tarde</option>
              </select>
            </label>
            <button className={`${btnPrimary} w-full`}>Confirmar Cita Privada</button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
              <Icon d={ic.lock} className="size-3.5 shrink-0" /> Tus datos están protegidos bajo estricta confidencialidad profesional
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

const steps = [
  { icon: ic.chat, t: 'Orientación en el CAP', d: 'Atención preventiva inicial en el campus.' },
  { icon: ic.doc, t: 'Ficha de Derivación', d: 'Evaluación profesional sin trámites complejos.' },
  { icon: ic.hospital, t: 'Terapia Continuada en el Policlínico', d: 'Acceso a sesiones especializadas 100% gratuitas bajo convenio UC.' },
]

const questions = [
  '¿Sientes que tus tareas y exámenes te sobrepasan?',
  '¿Te cuesta dormir o concentrarte por preocupaciones académicas?',
  '¿Has sentido ganas de aislarte de tus amigos o familia?',
]
const options = ['Nunca', 'A veces', 'Frecuentemente']

function Semaforo() {
  const [ans, setAns] = useState<number[]>([])
  const done = ans.length === 3
  const score = ans.reduce((a, b) => a + b, 0)
  const res =
    score <= 2
      ? { c: 'bg-emerald-500', t: 'Verde: vas bien', d: 'Mantén tus hábitos. Prueba la técnica 5-4-3-2-1 en semanas de exámenes.' }
      : score <= 4
        ? { c: 'bg-amber-400', t: 'Amarillo: atención', d: 'Tu estrés va en aumento. Una orientación breve en el CAP puede ayudarte.' }
        : { c: 'bg-uc-red', t: 'Rojo: te queremos escuchar', d: 'Te recomendamos agendar una cita pronto. No tienes que pasar esto solo/a.' }
  const q = ans.length
  return (
    <div className={`${card} p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-uc">Semáforo Emocional</h3>
          <p className="mt-1 text-slate-600">3 preguntas rápidas. Anónimo y sin registro.</p>
        </div>
        <div className="flex flex-col gap-1.5 rounded-full bg-[#14263d] p-2">
          {['bg-uc-red', 'bg-amber-400', 'bg-emerald-500'].map((c) => (
            <span key={c} className={`size-4 rounded-full ${c} ${done && res.c !== c ? 'opacity-20' : ''}`} />
          ))}
        </div>
      </div>
      {!done ? (
        <div className="pop mt-5" key={q}>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pregunta {q + 1} de 3</p>
          <p className="mt-1 font-semibold">{questions[q]}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {options.map((o, i) => (
              <button key={o} onClick={() => setAns([...ans, i])} className="rounded-xl border border-slate-300 px-3 py-3 font-medium transition hover:border-uc hover:bg-uc/5 active:scale-95">
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="pop mt-5 rounded-xl bg-mist p-4">
          <p className="flex items-center gap-2 font-display font-semibold"><span className={`size-3 rounded-full ${res.c}`} />{res.t}</p>
          <p className="mt-1 text-slate-600">{res.d}</p>
          <button onClick={() => setAns([])} className="mt-3 font-semibold text-uc underline">Repetir autochequeo</button>
        </div>
      )}
    </div>
  )
}

const faqs = [
  ['¿Aparece algún cobro en mi boleta de pago?', 'No. La atención en el CAP y las sesiones derivadas al Policlínico están 100% cubiertas.'],
  ['¿Mis profesores o padres se enterarán?', 'No. Rige el secreto profesional: tu información no se comparte con docentes ni familiares.'],
  ['¿Qué hago si tengo una urgencia emocional?', 'Comunícate de inmediato con la línea de atención directa. Es prioritaria y está disponible para ti.'],
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={`${card} divide-y divide-slate-100 px-5`}>
      {faqs.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold">
            {q}
            <Icon d={ic.chev} className={`size-5 shrink-0 text-uc transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <div className="pb-4 text-slate-600">
              {a}
              {i === 2 && (
                <a href="tel:+51964000000" className="mt-3 flex w-fit items-center gap-2 rounded-xl bg-uc-red px-4 py-2.5 font-semibold text-white">
                  <Icon d={ic.phone} className="size-4" /> Línea de atención directa
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function QrBanner({ onBook }: { onBook: () => void }) {
  const n = 21
  const cells: boolean[] = []
  let s = 7
  for (let i = 0; i < n * n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    cells.push((s >> 8) % 2 === 0)
  }
  const finder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)
  const finderOn = (x: number, y: number) => {
    const fx = x > 12 ? x - 14 : x
    const fy = y > 12 ? y - 14 : y
    if (fx === 7 || fy === 7 || fx < 0 || fy < 0) return false
    const d = Math.max(Math.abs(fx - 3), Math.abs(fy - 3))
    return d !== 2
  }
  return (
    <div className="relative overflow-hidden rounded-3xl bg-uc p-6 text-white sm:p-10">
      <div className="absolute -right-16 -top-16 size-64 rounded-full bg-uc-red/30 blur-2xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-white/70">Universidad Continental · Huancayo</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Escanea con tu cámara y agenda tu cita en 1 clic</h2>
          <p className="mt-3 max-w-md text-white/80">Compártelo en Canvas y redes: atención psicológica gratuita y confidencial.</p>
          <button onClick={onBook} className="mt-5 rounded-xl bg-white px-5 py-3 font-semibold text-uc transition hover:bg-mist">Probar el formulario</button>
        </div>
        <div className="mx-auto w-fit rounded-2xl bg-white p-4 shadow-xl">
          <div className="relative">
            <svg viewBox={`0 0 ${n} ${n}`} className="size-44 text-[#14263d] sm:size-52" shapeRendering="crispEdges">
              {cells.map((on, i) => {
                const x = i % n, y = Math.floor(i / n)
                const show = finder(x, y) ? finderOn(x, y) : on
                return show ? <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
              })}
            </svg>
            <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border-4 border-white bg-uc font-display text-xl font-bold text-white">
              C<span className="text-uc-red">·</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [modal, setModal] = useState(false)
  const [menu, setMenu] = useState(false)
  const go = (id: string) => {
    setMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-7 font-medium md:flex">
            <button onClick={() => go('ruta')} className="hover:text-uc">Ruta Policlínico</button>
            <button onClick={() => go('autochequeo')} className="hover:text-uc">Autochequeo</button>
            <button onClick={() => go('faq')} className="hover:text-uc">Preguntas</button>
            <button onClick={() => setModal(true)} className="rounded-xl bg-uc px-4 py-2 font-semibold text-white hover:bg-[#163a63]">Agenda tu cita</button>
          </nav>
          <button onClick={() => setMenu(!menu)} aria-label="Menú" className="grid size-10 place-items-center rounded-xl hover:bg-mist md:hidden">
            <Icon d={menu ? ic.x : ic.menu} />
          </button>
        </div>
        {menu && (
          <div className="pop flex flex-col border-t border-slate-100 bg-white px-5 py-2 font-medium md:hidden">
            {[['ruta', 'Ruta Policlínico'], ['autochequeo', 'Autochequeo'], ['faq', 'Preguntas frecuentes'], ['recursos', 'Recursos']].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="py-3 text-left">{l}</button>
            ))}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-5 pb-16 pt-8 md:space-y-24 md:pt-14">
        <section className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <span className="inline-block rounded-full bg-uc/10 px-3 py-1 font-display text-xs font-semibold text-uc">Centro de Atención Psicológica · Huancayo</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-uc md:text-6xl">Salud emocional universitaria <span className="text-uc-red">sin barreras</span></h1>
            <p className="mt-4 max-w-md text-base text-slate-600 md:text-lg">Un espacio seguro, confidencial y 100% gratuito pensado para ti.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setModal(true)} className={btnPrimary}>Agenda tu cita discreta</button>
              <button onClick={() => go('ruta')} className={btnOutline}>Conoce la Ruta Policlínico</button>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=700&fit=crop&auto=format" alt="Equipo de psicólogos conversando y riendo juntos" className="aspect-[4/3] w-full rounded-3xl bg-uc/20 object-cover" />
            <div className={`${card} absolute -bottom-6 left-4 right-4 flex items-center gap-3 p-4 md:left-[-2rem] md:right-auto md:max-w-xs`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-uc-red/10 text-uc-red"><Icon d={ic.chat} className="size-5" /></span>
              <p className="font-display font-semibold leading-snug text-uc">Estamos aquí para escucharte sin prejuicios</p>
            </div>
          </div>
        </section>

        <section id="ruta" className="scroll-mt-24 pt-4">
          <div className="flex flex-col items-start gap-4 rounded-2xl border-2 border-dashed border-uc/30 bg-white p-5 sm:flex-row sm:items-center">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-uc text-white"><Icon d={ic.shield} className="size-7" /></span>
            <p className="font-display text-base font-semibold text-uc md:text-lg">Garantía de Atención 100% Gratuita, Confidencial y sin cobros en tu boleta de pago</p>
          </div>
          <h2 className="mt-12 text-2xl font-bold text-uc md:text-3xl">Tu ruta al Policlínico, en 3 pasos</h2>
          <ol className="relative mt-8 grid gap-5 md:grid-cols-3">
            <div className="absolute left-[2.15rem] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-uc/20 md:block" />
            {steps.map((s, i) => (
              <li key={s.t} className={`${card} group relative p-6 transition hover:-translate-y-1`}>
                <div className="relative flex items-center gap-3">
                  <span className="grid size-14 place-items-center rounded-2xl bg-uc text-white transition group-hover:bg-uc-red"><Icon d={s.icon} className="size-7" /></span>
                  <span className="font-display text-5xl font-bold text-uc/10">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-uc">{s.t}</h3>
                <p className="mt-1 text-slate-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="autochequeo" className="grid scroll-mt-24 items-start gap-6 md:grid-cols-2">
          <Semaforo />
          <div id="recursos" className="scroll-mt-24 space-y-4">
            <div className={`${card} p-6`}>
              <h3 className="text-xl font-bold text-uc">Recursos descargables</h3>
              <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 flex items-center gap-4 rounded-xl bg-mist p-4 transition hover:bg-uc/10">
                <span className="grid size-11 place-items-center rounded-xl bg-white text-uc-red"><Icon d={ic.down} /></span>
                <span><span className="block font-semibold">Técnica de Autorregulación 5-4-3-2-1</span><span className="text-xs text-slate-500">PDF · 1 página</span></span>
              </a>
              <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-4 rounded-xl bg-[#14263d] p-4 text-white transition hover:bg-[#1c3556]">
                <span className="grid size-11 place-items-center rounded-xl bg-emerald-500"><Icon d={ic.music} /></span>
                <span><span className="block font-semibold">Playlist "Concentración UC"</span><span className="text-xs text-white/70">Abrir en Spotify</span></span>
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="grid scroll-mt-24 gap-6 md:grid-cols-[1fr_1.4fr] md:gap-14">
          <div>
            <h2 className="text-2xl font-bold text-uc md:text-3xl">Preguntas frecuentes</h2>
            <p className="mt-2 text-slate-600">Lo que más nos preguntan antes de dar el primer paso.</p>
          </div>
          <Faq />
        </section>

        <QrBanner onBook={() => setModal(true)} />
      </main>

      <footer className="bg-uc py-6 text-center text-xs text-white/80">Universidad Continental · Sede Huancayo · Conoce tu CAP</footer>
      {modal && <BookingModal onClose={() => setModal(false)} />}
    </div>
  )
}
