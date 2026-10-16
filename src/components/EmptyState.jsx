// Estado vacío: un ícono grande, qué pasó y qué hacer (children = botones de acción).
export default function EmptyState({ icono = '🔍', titulo, texto, children }) {
  return (
    <div className="empty">
      <span className="empty__icon" aria-hidden="true">{icono}</span>
      <h3>{titulo}</h3>
      {texto && <p>{texto}</p>}
      {children && <div className="empty__actions">{children}</div>}
    </div>
  )
}
