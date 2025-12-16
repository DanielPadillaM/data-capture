export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Acquisition */}

      <section className="px-4 py-16 text-center">
        <h1 className="text-3xl font-bold leading-tight mb-4">
          Convierte contactos en
          <span className="block text-indigo-300">
            oportunidades reales de venta
          </span>
        </h1>

        <p className="text-slate-300 mb-6">
          Captura, organiza y gestiona leads de forma rápida y profesional.
          Diseñada para equipos de ventas y marketing en eventos, reuniones y
          activaciones de marca.
        </p>

        <p className="text-slate-300 mb-8">
          Sin papel. Sin transcripciones. Sin pérdida de oportunidades.
        </p>

        <a
          href="/register"
          className="inline-block rounded-2xl bg-indigo-500 px-8 py-4 text-sm font-medium text-white shadow hover:bg-indigo-400 transition"
        >
          Empieza a captar leads hoy
        </a>
      </section>
      {/* Activation */}
      <section className="bg-slate-800 px-4 py-14">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          El problema que frena tus ventas
        </h2>
        <p className="text-slate-300 mb-3">
          En ferias y reuniones, los datos suelen anotarse en papel o notas
          improvisadas. Luego deben digitalizarse y organizarse.
        </p>
        <p className="text-slate-300 mb-3">
          Esto genera errores, retrasos y pérdida de oportunidades comerciales.
        </p>
        <p className="font-medium text-slate-200">
          Cada lead sin seguimiento es una venta potencial perdida.
        </p>
      </section>

      <section className="bg-slate-900 px-4 py-14">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          La solución: captación digital inmediata
        </h2>
        <p className="text-slate-300 mb-4">
          Registra leads en tiempo real desde cualquier dispositivo. La
          información se guarda automáticamente.
        </p>
        <p className="text-slate-300">
          Visualiza todos los contactos en tarjetas listas para seguimiento y
          análisis comercial.
        </p>
      </section>

      {/* Retention */}
      <section className="bg-slate-800 px-4 py-14">
        <h2 className="text-2xl font-bold mb-6 text-slate-100">Diseñada para el uso diario</h2>
        <ul className="grid gap-4">
          <li className="rounded-xl border border-slate-700 bg-slate-850 p-4">
            Eventos y ferias comerciales
          </li>
          <li className="rounded-xl border border-slate-700 bg-slate-850 p-4">Reuniones B2B y networking</li>
          <li className="rounded-xl border border-slate-700 bg-slate-850 p-4">Equipos de ventas en campo</li>
          <li className="rounded-xl border border-slate-700 bg-slate-850 p-4">
            Campañas y activaciones de marketing
          </li>
        </ul>
      </section>

      {/* Revenue */}
      <section className="bg-slate-900 px-4 py-14">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">Más tiempo vendiendo</h2>
        <p className="text-slate-300 mb-3">
          Elimina tareas manuales y permite que tu equipo se concentre en cerrar
          ventas.
        </p>
        <p className="text-slate-300">
          Leads organizados, seguimiento rápido y mejores decisiones
          comerciales.
        </p>
      </section>

      {/* Referral */}
      <section className="bg-slate-800 px-4 py-14">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          Una herramienta que tu equipo recomienda
        </h2>
        <p className="text-slate-300">
          Simple, rápida y profesional. Cuando captar leads deja de ser un
          problema, la herramienta se convierte en parte natural del proceso
          comercial.
        </p>
      </section>

      {/* CTA Final */}
      <section className="bg-indigo-600 px-4 py-20 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Empieza a captar leads hoy</h2>
        <p className="text-indigo-100 mb-8">
          Convierte cada contacto en una oportunidad real de negocio.
        </p>
        <a
          href="/register"
          className="inline-block rounded-2xl bg-white px-8 py-4 text-sm font-medium text-indigo-600 shadow hover:bg-slate-100 transition"
        >
          Registrarse ahora
        </a>
      </section>
    </div>
  );
}
