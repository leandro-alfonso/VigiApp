// Tarjeta con borde suave y sombra sutil. "as" permite cambiar la etiqueta (article, section...).
export default function Card({ as: Etiqueta = 'div', className = '', children, ...resto }) {
  return <Etiqueta className={`card ${className}`} {...resto}>{children}</Etiqueta>
}
