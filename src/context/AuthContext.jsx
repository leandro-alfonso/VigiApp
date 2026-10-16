import { createContext, useContext, useState } from 'react'
import { USUARIOS_MOCK } from '../data/mock.js'

// Roles posibles de la app
export const ROLES = {
  VISITANTE: 'VISITANTE',
  VECINO: 'VECINO',
  ADMINISTRADOR: 'ADMINISTRADOR',
}

const CLAVE_GUARDADA = 'vecinal_rol_mock'
const AuthContext = createContext(null)

// Lee el rol guardado (así no se pierde al recargar mientras desarrollamos)
function leerRolGuardado() {
  try {
    return ROLES[localStorage.getItem(CLAVE_GUARDADA)] ?? ROLES.VISITANTE
  } catch {
    return ROLES.VISITANTE
  }
}

// Sesión SIMULADA: todavía no hay backend, solo se cambia el rol para probar la navegación.
export function AuthProvider({ children }) {
  const [rol, setRol] = useState(leerRolGuardado)

  function cambiarRol(nuevoRol) {
    setRol(nuevoRol)
    try { localStorage.setItem(CLAVE_GUARDADA, nuevoRol) } catch { /* sin almacenamiento: se ignora */ }
  }

  const valor = {
    rol,
    usuario: USUARIOS_MOCK[rol] ?? null, // null si es visitante
    estaLogueado: rol !== ROLES.VISITANTE,
    esAdmin: rol === ROLES.ADMINISTRADOR,
    cambiarRol,
    cerrarSesion: () => cambiarRol(ROLES.VISITANTE),
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
