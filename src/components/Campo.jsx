// Campo de formulario: label + control + ayuda + mensaje de error.
// El control (children) debe tener el mismo id y aria-describedby apuntando a `${id}-error` / `${id}-ayuda`.
export default function Campo({ id, etiqueta, error, ayuda, children }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {ayuda && <p id={`${id}-ayuda`} className="campo__ayuda">{ayuda}</p>}
      {error && <p id={`${id}-error`} className="campo__error" role="alert">{error}</p>}
    </div>
  )
}
