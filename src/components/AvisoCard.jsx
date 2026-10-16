import Badge from './Badge.jsx'
import { tiempoRelativo, fechaLarga } from '../utils/formato.js'

// Aviso de la comunidad (azul), con prioridad NORMAL o IMPORTANTE.
export default function AvisoCard({ aviso: a }) {
  return (
    <article className="alerta-card nivel-aviso">
      <p className="alerta-card__tag">Aviso · <Badge tipo={a.prioridad} /></p>
      <h3>{a.titulo}</h3>
      <p>{a.cuerpo}</p>
      <p className="alerta-card__meta">
        <span>{tiempoRelativo(a.fecha)}</span>
        {a.vence && <span>Vence el {fechaLarga(a.vence)}</span>}
      </p>
    </article>
  )
}
