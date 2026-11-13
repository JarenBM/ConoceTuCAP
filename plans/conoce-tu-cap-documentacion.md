# "Conoce tu CAP" – Documento de contexto completo del prototipo

Documento pensado para pasarlo tal cual a otra IA y que reconstruya la web app con el mismo comportamiento, contenido y aspecto. Todo lo descrito está tomado del código actual (`src/App.tsx`, `src/index.css`). Donde algo es **de muestra (placeholder)** o **no está implementado**, se indica de forma explícita, junto con una recomendación.

---

## 1. Resumen

- **Nombre:** Conoce tu CAP
- **Cliente:** Universidad Continental, sede Huancayo (Centro de Atención Psicológica, CAP)
- **Público:** estudiantes de 16 a 26 años
- **Objetivo:** reducir la barrera y el estigma para pedir ayuda psicológica. Explica cómo funciona el servicio, da una autoevaluación anónima y lleva al estudiante a agendar una cita.
- **Tono:** juvenil, cercano, sin tecnicismos clínicos, con énfasis en confidencialidad y gratuidad.
- **Formato:** una sola página (landing) con scroll, Mobile-First. No hay rutas ni páginas separadas.
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4. No usa librerías de UI ni de íconos (los íconos son SVG propios). No tiene backend.

## 2. Sistema de diseño

**Colores**
| Token | Valor | Uso |
|---|---|---|
| `uc` (Azul UC) | `#1F497D` | Títulos, logo, botones secundarios, footer, banner QR |
| `uc-red` (Rojo UC) | `#E30613` | CTA principal, acentos, errores, nivel "rojo" del semáforo |
| Blanco | `#FFFFFF` | Tarjetas, navbar, modal |
| `mist` (Gris claro) | `#F4F6F9` | Fondo de la página y de bloques internos |
| Texto base | `#14263D` | Azul muy oscuro para texto y para el cuerpo del semáforo |
| Semáforo | emerald-500 (verde), amber-400 (amarillo) | Resultados del autochequeo |

**Tipografía:** Poppins (500/600/700) para títulos, logo, etiquetas y textos destacados. Inter (400/500/600) para texto corrido. Tamaño base 14px en móvil; los H1 pasan de 36px (móvil) a 60px (escritorio).

**Forma y sombra:** tarjetas `rounded-2xl` (16px), botones y campos `rounded-xl` (12px), banner y foto hero `rounded-3xl`. Sombra suave azulada: `0 4px 24px rgba(31,73,125,0.08)`.

**Botones**
- Primario: fondo rojo, texto blanco, hover rojo más oscuro (`#b8050f`), se reduce ligeramente al presionar.
- Outline: borde azul 2px, texto azul; al pasar el cursor se rellena de azul.

**Animaciones:** animación `pop` de 0.25s (aparece desde abajo con leve escala) en el modal, menú móvil, preguntas del semáforo y resultado. `scroll-behavior: smooth` global. Elevación al hover en tarjetas de pasos.

**Navbar:** fija arriba (sticky), fondo blanco translúcido con blur y borde inferior.

## 3. Estructura de la página (de arriba abajo)

### 3.1 Navbar (sticky)
- **Logo:** cuadrado azul con "C·" (el punto en rojo) + texto "Universidad Continental" y "Conoce tu CAP".
- **Escritorio:** enlaces "Ruta Policlínico", "Autochequeo", "Preguntas" y botón azul "Agenda tu cita".
- **Móvil:** botón hamburguesa. Despliega: Ruta Policlínico, Autochequeo, Preguntas frecuentes, Recursos. El menú se cierra al elegir una opción.
- **Comportamiento de cada elemento**
  - Ruta Policlínico → scroll suave a la sección `#ruta`
  - Autochequeo → scroll suave a `#autochequeo`
  - Preguntas / Preguntas frecuentes → scroll suave a `#faq`
  - Recursos (solo móvil) → scroll suave a `#recursos`
  - Agenda tu cita (solo escritorio) → abre el modal de agendamiento
  - Observación: en móvil el menú no incluye "Agenda tu cita"; ese acceso se hace desde el CTA del Hero.

### 3.2 Hero
- Etiqueta: "Centro de Atención Psicológica · Huancayo"
- H1: "Salud emocional universitaria **sin barreras**" ("sin barreras" en rojo)
- Subtítulo: "Un espacio seguro, confidencial y 100% gratuito pensado para ti."
- **Botón rojo "Agenda tu cita discreta"** → abre el modal de agendamiento.
- **Botón outline "Conoce la Ruta Policlínico"** → scroll suave a `#ruta`.
- **Imagen:** foto de stock de Unsplash (personas conversando y riendo), proporción 4:3. **Pendiente:** reemplazar por la foto real del equipo del CAP.
- **Tarjeta flotante** sobre la foto: ícono de chat + "Estamos aquí para escucharte sin prejuicios". Es solo decorativa.
- Móvil: columnas apiladas (texto y luego foto). Escritorio: dos columnas.

### 3.3 Garantía + Ruta de derivación al Policlínico (`#ruta`)

**Banner de garantía** (borde azul punteado, ícono de escudo): "Garantía de Atención 100% Gratuita, Confidencial y sin cobros en tu boleta de pago". Es informativo, no tiene acción.

**Título:** "Tu ruta al Policlínico, en 3 pasos". Es un roadmap informativo con 3 tarjetas numeradas 01, 02, 03 (en escritorio, unidas por una línea horizontal; en móvil, apiladas).

| Paso | Título | Texto | Qué significa en la práctica |
|---|---|---|---|
| 01 | Orientación en el CAP | "Atención preventiva inicial en el campus." | El estudiante tiene una primera conversación breve con un psicólogo del CAP. Se escucha su situación y se evalúa si basta con orientación o si necesita atención especializada. |
| 02 | Ficha de Derivación | "Evaluación profesional sin trámites complejos." | Si el psicólogo detecta que hace falta tratamiento, emite una ficha o documento interno que lo refiere al Policlínico. El estudiante no hace trámites ni pagos. |
| 03 | Terapia Continuada en el Policlínico | "Acceso a sesiones especializadas 100% gratuitas bajo convenio UC." | El estudiante asiste a sesiones de terapia en el Policlínico asociado (psicología o psiquiatría, según el caso), cubiertas por la universidad. |

**Interacción actual:** las tarjetas **no son botones**. Solo tienen efecto visual (al pasar el cursor se elevan y el ícono pasa de azul a rojo). No hay clic ni navegación.

**Aclaración importante:** el texto de la descripción de cada paso es contenido de ejemplo. El proceso real (quién emite la ficha, qué documento es, si hay límite de sesiones, dónde queda el Policlínico, qué convenio aplica) **debe confirmarlo el CAP**. Se recomienda validar esa información antes de publicar.

### 3.4 Modal de agendamiento
**Cómo se abre:** botón "Agenda tu cita" de la navbar (escritorio), CTA del Hero, o botón "Probar el formulario" del banner QR.
**Cómo se cierra:** botón X, clic en el fondo oscuro (overlay con blur) o botón "Entendido" tras confirmar.

**Título:** "Reserva tu cita en menos de 1 minuto"

**Campos (los 4 son obligatorios)**
1. **Nombres y Apellidos:** texto libre. Placeholder "Ej. Lucía Quispe Rojas".
2. **Código Estudiantil:** solo números, de 8 a 10 dígitos (validación `pattern`). Placeholder "74561234".
3. **Correo Institucional:** debe terminar en `@continental.edu.pe` (regex `^[^\s@]+@continental\.edu\.pe$`, sin distinguir mayúsculas). Si el usuario escribió algo y no cumple, el borde se pone rojo y aparece "Usa tu correo @continental.edu.pe". El envío se bloquea mientras no sea válido.
4. **Modalidad y Horario Preferido:** desplegable con 4 opciones:
   - Presencial en campus · Mañana
   - Presencial en campus · Tarde
   - Virtual por Google Meet · Mañana
   - Virtual por Google Meet · Tarde

**Botón:** "Confirmar Cita Privada" (rojo). Debajo, un candado con "Tus datos están protegidos bajo estricta confidencialidad profesional".

**Al enviar:** el modal pasa a una tarjeta de confirmación con check verde, "¡Cita solicitada!" y "Te enviaremos la confirmación a tu correo institucional", más botón "Entendido".

**Limitación importante:** hoy el formulario **no guarda ni envía nada**. Solo simula la confirmación en pantalla. Para que sea real hace falta un destino (ver sección 6).

### 3.5 Módulo de Autochequeo (`#autochequeo`)
Se muestra en dos columnas en escritorio (Semáforo a la izquierda, Recursos a la derecha) y apilado en móvil.

#### Semáforo Emocional
- **Para qué sirve:** es una autoevaluación rápida, anónima y sin registro, de 3 preguntas. Da al estudiante una señal orientativa sobre cómo está y qué hacer. **No es un diagnóstico clínico**; es una herramienta de sensibilización que busca derivar a quien lo necesite hacia el CAP.
- Indicador visual: un semáforo vertical (rojo, amarillo, verde) a la derecha del título. Al terminar, solo queda encendido el color del resultado y los otros se atenúan.

**Preguntas** (se muestran una a una, con "Pregunta X de 3"):
1. ¿Sientes que tus tareas y exámenes te sobrepasan?
2. ¿Te cuesta dormir o concentrarte por preocupaciones académicas?
3. ¿Has sentido ganas de aislarte de tus amigos o familia?

**Opciones de respuesta (3 botones por pregunta):** Nunca = 0 puntos, A veces = 1, Frecuentemente = 2. Al pulsar una, avanza automáticamente a la siguiente.

**Puntaje total (0 a 6) y resultado**
| Puntaje | Color | Título | Mensaje | Qué se espera que haga el estudiante |
|---|---|---|---|---|
| 0–2 | Verde | "Verde: vas bien" | "Mantén tus hábitos. Prueba la técnica 5-4-3-2-1 en semanas de exámenes." | Seguir con sus hábitos y usar los recursos de autocuidado. |
| 3–4 | Amarillo | "Amarillo: atención" | "Tu estrés va en aumento. Una orientación breve en el CAP puede ayudarte." | Considerar una orientación breve en el CAP. |
| 5–6 | Rojo | "Rojo: te queremos escuchar" | "Te recomendamos agendar una cita pronto. No tienes que pasar esto solo/a." | Agendar una cita pronto. |

- Botón "Repetir autochequeo": reinicia las respuestas.
- **Los datos no se guardan ni se envían.** Es 100% anónimo porque ocurre solo en el navegador.
- **Observación:** el resultado amarillo y rojo hoy **no tiene un botón de "Agendar cita"**; solo muestra el mensaje. Sería una mejora natural añadir un botón que abra el modal.
- **Pendiente de validar:** las preguntas, los umbrales y los mensajes son ejemplos. Deben ser revisados por los psicólogos del CAP. Si quieren una escala validada, existen opciones como PHQ-4 o GAD-2, que requieren criterio profesional.

#### Recursos descargables
Tarjeta con dos enlaces:

1. **"Técnica de Autorregulación 5-4-3-2-1"** (PDF de 1 página)
   - **Qué es:** un ejercicio de *grounding* (anclaje al presente) para calmar la ansiedad o el estrés. La persona nombra 5 cosas que ve, 4 que puede tocar, 3 que escucha, 2 que huele y 1 que saborea. Es una técnica breve y conocida; **no es un libro de autoayuda**, es una guía práctica de una hoja.
   - **Estado actual:** el enlace es de muestra (`href="#"`) y no hace nada. **Pendiente:** el CAP debe proporcionar el PDF real y su URL (Drive, Canvas o la web institucional).
2. **Playlist "Concentración UC"** (botón oscuro con ícono de música en verde)
   - **Estado actual:** abre `https://open.spotify.com` (página principal de Spotify, no una playlist real) en una pestaña nueva.
   - **Pendiente:** el CAP debe crear o elegir una playlist real (música para concentrarse, relajarse o motivarse) y dar su enlace `https://open.spotify.com/playlist/...`. Se recomienda que sea pública y que se llame igual que el botón.

### 3.6 Preguntas frecuentes (`#faq`)
Acordeón de 3 preguntas. Solo una abierta a la vez; la primera inicia abierta. Al hacer clic se abre o cierra y la flecha gira.

| Pregunta | Respuesta |
|---|---|
| ¿Aparece algún cobro en mi boleta de pago? | "No. La atención en el CAP y las sesiones derivadas al Policlínico están 100% cubiertas." |
| ¿Mis profesores o padres se enterarán? | "No. Rige el secreto profesional: tu información no se comparte con docentes ni familiares." |
| ¿Qué hago si tengo una urgencia emocional? | "Comunícate de inmediato con la línea de atención directa. Es prioritaria y está disponible para ti." + botón rojo **"Línea de atención directa"** |

- **Relación con el resto de la app:** las dos primeras respuestas refuerzan la garantía del banner (gratuidad y confidencialidad). La tercera es el único punto de contacto de urgencia.
- **Botón "Línea de atención directa":** es un enlace `tel:+51964000000`. **Ese número es de ejemplo.** Pendiente: poner el número real. En móvil inicia la llamada; en computadora puede no hacer nada.
- **Aclaración legal a validar:** la promesa de que "profesores o padres no se enterarán" depende de la política real del CAP. Hay excepciones habituales (riesgo de vida, menores de edad). Conviene que el CAP revise ese texto.
- **Mejora recomendada:** incluir también la Línea 113 opción 5 del MINSA (salud mental, Perú) como respaldo, si el CAP lo aprueba.

### 3.7 Banner con código QR
- Bloque azul con un círculo rojo difuminado decorativo.
- Texto: "Universidad Continental · Huancayo", H2 "Escanea con tu cámara y agenda tu cita en 1 clic" y "Compártelo en Canvas y redes: atención psicológica gratuita y confidencial."
- **Botón blanco "Probar el formulario"** → abre el modal de agendamiento.
- **QR:** es **solo decorativo y no escaneable**. Está dibujado con SVG a partir de puntos aleatorios, tres cuadros de esquina y el logo "C·" al centro. No contiene ningún enlace.
- **A dónde debe llevar el QR real:** a la URL pública donde se agenda la cita. Según lo que defina la universidad, puede ser (a) esta misma web app desplegada (idealmente con `#agenda` o un parámetro que abra el modal), o (b) un Google Forms, Calendly o el sistema oficial de citas de la UC. Es lo que confirmaste: debe apuntar a la página oficial o al agendamiento.
- **Recomendación técnica:** generar el QR con una librería (por ejemplo `qrcode.react`) con corrección de errores nivel H, para poder dejar el logo al centro, y colores azul oscuro sobre blanco para mantener el contraste. Se puede añadir un botón "Descargar QR (PNG/SVG)" para imprimir en afiches.

### 3.8 Footer
Franja azul con "Universidad Continental · Sede Huancayo · Conoce tu CAP".

## 4. Flujos de usuario

1. **Quiere ayuda ya:** Hero → "Agenda tu cita discreta" → modal → llena 4 campos → "Confirmar Cita Privada" → confirmación.
2. **Duda de si lo necesita:** Navbar → Autochequeo → responde 3 preguntas → recibe color → si es amarillo o rojo, debería agendar (hoy debe subir manualmente o usar el navbar).
3. **Quiere entender el proceso:** Hero → "Conoce la Ruta Policlínico" → lee los 3 pasos → CTA.
4. **Tiene miedo a costos o a que se sepa:** FAQ preguntas 1 y 2, y banner de garantía.
5. **Urgencia:** FAQ pregunta 3 → "Línea de atención directa" → llamada.
6. **Llega por QR (afiche, Canvas):** escanea → abre la web (o el formulario oficial) → agenda.
7. **Necesita calmarse ahora:** Recursos → PDF 5-4-3-2-1 o playlist.

## 5. Responsive
- **Móvil (por defecto):** una columna, menú hamburguesa, botones del Hero apilados y a ancho completo, pasos apilados, semáforo y recursos apilados.
- **Tablet y escritorio (≥768px):** Hero en dos columnas, navbar con enlaces, roadmap de 3 columnas con línea conectora, Semáforo y Recursos lado a lado, FAQ en dos columnas, banner QR con texto a la izquierda y QR a la derecha.
- Ancho máximo de contenido: 1152px (`max-w-6xl`).

## 6. Pendientes y decisiones abiertas

| # | Pendiente | Quién lo aporta | Dónde se cambia |
|---|---|---|---|
| 1 | Foto real del equipo del CAP | CAP | `<img>` del Hero |
| 2 | PDF real de la técnica 5-4-3-2-1 | CAP | enlace con `href="#"` |
| 3 | Playlist real de Spotify | CAP | enlace a `open.spotify.com` |
| 4 | Teléfono real de urgencia | CAP | `tel:+51964000000` |
| 5 | URL final del QR y QR funcional | UC / TI | componente `QrBanner` |
| 6 | Destino real del formulario (correo, Google Sheets/Forms, API, agenda del CAP) | UC / TI | `BookingModal` (hoy solo simula) |
| 7 | Validar textos de pasos, preguntas, umbrales y FAQ | Psicólogos del CAP | `steps`, `questions`, `faqs`, `Semaforo` |
| 8 | Política de privacidad / consentimiento de datos (Ley 29733, Perú) | UC legal | pie del modal / footer |
| 9 | Añadir CTA de "Agendar" a los resultados amarillo y rojo | Desarrollo | `Semaforo` |
| 10 | Probar en navegador (móvil y escritorio): nunca se ha probado | Desarrollo | todo |

**Aclaración sobre el formulario:** si el correo de confirmación prometido ("Te enviaremos la confirmación a tu correo institucional") va a existir, se necesita un backend o un servicio externo que lo envíe. Hoy el mensaje es solo texto.

## 7. Prompt sugerido para pasar a otra IA

> Construye una landing page single-page, Mobile-First, en React + Tailwind para "Conoce tu CAP" (Centro de Atención Psicológica, Universidad Continental, sede Huancayo), dirigida a estudiantes de 16 a 26 años, con tono juvenil y desestigmatizado. Usa Azul `#1F497D`, Rojo `#E30613`, Blanco y Gris `#F4F6F9`; fuentes Poppins (títulos) e Inter (texto); bordes de 12/16px y sombras suaves. Secciones en orden: (1) Navbar sticky con scroll suave y botón "Agenda tu cita"; (2) Hero con H1, subtítulo, dos CTA (agendar y ver ruta) y foto con tarjeta flotante; (3) Banner de garantía gratuita/confidencial y roadmap de 3 pasos (Orientación en el CAP, Ficha de Derivación, Terapia en el Policlínico); (4) Modal de agendamiento con overlay y 4 campos (nombre, código estudiantil de 8-10 dígitos, correo que termine en @continental.edu.pe, modalidad y horario) y tarjeta de confirmación; (5) Semáforo emocional de 3 preguntas con respuestas 0/1/2 (verde 0-2, amarillo 3-4, rojo 5-6), recursos (PDF 5-4-3-2-1 y playlist de Spotify) y FAQ en acordeón de 3 preguntas, con botón de línea de urgencia; (6) Banner azul con código QR funcional que apunta a la URL de agendamiento. Usa las URLs reales que te daré para PDF, Spotify, teléfono y QR.

Para más precisión, esta IA puede recibir también el archivo `src/App.tsx` y `src/index.css` como referencia directa.
