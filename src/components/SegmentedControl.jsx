// Selector segmentado (ej. Mapa | Lista).
export default function SegmentedControl({ etiqueta, opciones, valor, onCambiar }) {
  return (
    <div className="segmented" role="group" aria-label={etiqueta}>
      {opciones.map((o) => (
        <button
          key={o.valor}
          type="button"
          className={`segmented__btn ${o.valor === valor ? 'is-active' : ''}`}
          aria-pressed={o.valor === valor}
          onClick={() => onCambiar(o.valor)}
        >
          {o.icono && <span aria-hidden="true">{o.icono}</span>}
          {o.texto}
        </button>
      ))}
    </div>
  )
}
