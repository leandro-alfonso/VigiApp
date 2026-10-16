import { useState } from 'react'
import Tabs from '../../components/Tabs.jsx'
import AlertaCard from '../../components/AlertaCard.jsx'
import AvisoCard from '../../components/AvisoCard.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { ALERTAS_MOCK, AVISOS_MOCK } from '../../data/mock.js'

export default function Alertas() {
  const [pestana, setPestana] = useState('alertas')

  // Activas primero (emergencias arriba); las cerradas quedan como historial reciente
  const activas = ALERTAS_MOCK.filter((a) => a.estado === 'ACTIVA')
    .sort((a, b) => (b.nivel === 'EMERGENCIA') - (a.nivel === 'EMERGENCIA'))
  const cerradas = ALERTAS_MOCK.filter((a) => a.estado === 'CERRADA')
  // Avisos importantes primero
  const avisos = [...AVISOS_MOCK].sort((a, b) => (b.prioridad === 'IMPORTANTE') - (a.prioridad === 'IMPORTANTE'))

  return (
    <>
      <Tabs
        etiqueta="Alertas y avisos"
        activa={pestana}
        onCambiar={setPestana}
        pestanas={[
          { id: 'alertas', texto: `Alertas (${activas.length})` },
          { id: 'avisos', texto: `Avisos (${avisos.length})` },
        ]}
      />

      <div role="tabpanel" id={`panel-${pestana}`} aria-labelledby={`tab-${pestana}`} tabIndex={0} className="panel">
        {pestana === 'alertas' ? (
          <>
            {activas.length === 0 ? (
              <EmptyState icono="🌤️" titulo="Todo tranquilo por ahora" texto="No hay alertas activas en tu comunidad." />
            ) : (
              <div className="stack-list">{activas.map((a) => <AlertaCard key={a.id} alerta={a} />)}</div>
            )}
            {cerradas.length > 0 && (
              <>
                <h2 className="subtitulo">Cerradas recientemente</h2>
                <div className="stack-list">{cerradas.map((a) => <AlertaCard key={a.id} alerta={a} />)}</div>
              </>
            )}
          </>
        ) : (
          <div className="stack-list">{avisos.map((a) => <AvisoCard key={a.id} aviso={a} />)}</div>
        )}
      </div>
    </>
  )
}
