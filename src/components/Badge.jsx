// Etiqueta de estado. El color sigue el sistema visual (ver variables.css).
const BADGES = {
  REPORTADO: ['Reportado', 'badge--incidencia'],
  EN_SEGUIMIENTO: ['En seguimiento', 'badge--seguimiento'],
  RESUELTO: ['Resuelto', 'badge--resuelto'],
  DESCARTADO: ['Descartado', 'badge--muted'],
  ACTIVA: ['Activa', 'badge--alerta'],
  CERRADA: ['Cerrada', 'badge--resuelto'],
  IMPORTANTE: ['Importante', 'badge--aviso'],
  NORMAL: ['Normal', 'badge--muted'],
}

export default function Badge({ tipo }) {
  const [texto, clase] = BADGES[tipo] ?? [tipo, 'badge--muted']
  return <span className={`badge ${clase}`}>{texto}</span>
}
