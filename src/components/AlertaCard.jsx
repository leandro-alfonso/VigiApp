import Badge from './Badge.jsx'
import { tiempoRelativo, textoConfirmaciones } from '../utils/formato.js'

// Alerta de seguridad: rojo = emergencia activa, naranja = alerta activa, verde = cerrada.
export default function AlertaCard({ alerta: a }) {
  const cerrada = a.estado === 'CERRADA'
  const clase = cerrada ? 'nivel-resuelto' : a.nivel === 'EMERGENCIA' ? 'nivel-emergencia' : 'nivel-alerta'
  return (
    <article className={`alerta-card ${clase}`}>
      <p className="alerta-card__tag">{a.nivel === 'EMERGENCIA' ? 'Emergencia' : 'Alerta'} · {a.tipo}</p>
      <h3>{a.ubicacion}</h3>
      <p>{a.descripcion}</p>
      <p className="alerta-card__meta">
        <span>{tiempoRelativo(a.creada)}</span>
        <span>{textoConfirmaciones(a.confirmaciones)}</span>
        {cerrada && <Badge tipo="CERRADA" />}
        {cerrada && <span>{a.cierre}</span>}
      </p>
    </article>
  )
}
