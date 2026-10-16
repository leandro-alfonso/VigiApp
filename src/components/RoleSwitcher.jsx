import { useNavigate } from 'react-router-dom'
import { useAuth, ROLES } from '../context/AuthContext.jsx'

// Herramienta de desarrollo: permite cambiar el rol para probar las rutas y menús.
// Se quita cuando haya login real con backend.
export default function RoleSwitcher() {
  const { rol, cambiarRol } = useAuth()
  const navigate = useNavigate()

  function alCambiar(e) {
    const nuevoRol = e.target.value
    cambiarRol(nuevoRol)
    // Lleva a la pantalla inicial del rol elegido
    if (nuevoRol === ROLES.VISITANTE) navigate('/')
    else if (nuevoRol === ROLES.ADMINISTRADOR) navigate('/admin')
    else navigate('/app')
  }

  return (
    <div className="role-switcher">
      <label htmlFor="rol-prueba">Rol de prueba</label>
      <select id="rol-prueba" value={rol} onChange={alCambiar}>
        <option value={ROLES.VISITANTE}>Visitante</option>
        <option value={ROLES.VECINO}>Vecino</option>
        <option value={ROLES.ADMINISTRADOR}>Administrador</option>
      </select>
    </div>
  )
}
