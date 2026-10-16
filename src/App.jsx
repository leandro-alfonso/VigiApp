import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth, ROLES } from './context/AuthContext.jsx'

import PublicLayout from './layouts/PublicLayout.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import Landing from './pages/public/Landing.jsx'
import Registro from './pages/public/Registro.jsx'
import Login from './pages/public/Login.jsx'
import Contacto from './pages/public/Contacto.jsx'

import Inicio from './pages/app/Inicio.jsx'
import Mapa from './pages/app/Mapa.jsx'
import DetalleIncidencia from './pages/app/DetalleIncidencia.jsx'
import Reportar from './pages/app/Reportar.jsx'
import Alertas from './pages/app/Alertas.jsx'
import Perfil from './pages/app/Perfil.jsx'

import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminIncidencias from './pages/admin/AdminIncidencias.jsx'
import AdminCategorias from './pages/admin/AdminCategorias.jsx'
import AdminAvisos from './pages/admin/AdminAvisos.jsx'
import AdminAlertas from './pages/admin/AdminAlertas.jsx'
import AdminContactos from './pages/admin/AdminContactos.jsx'

// Protege rutas: sin sesión → /login. Con soloAdmin, un vecino vuelve a /app.
function RutaPrivada({ soloAdmin = false, children }) {
  const { rol, esAdmin } = useAuth()
  if (rol === ROLES.VISITANTE) return <Navigate to="/login" replace />
  if (soloAdmin && !esAdmin) return <Navigate to="/app" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>

      {/* Vecino (y administrador) */}
      <Route path="/app" element={<RutaPrivada><AppLayout /></RutaPrivada>}>
        <Route index element={<Inicio />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="incidencias/:id" element={<DetalleIncidencia />} />
        <Route path="reportar" element={<Reportar />} />
        <Route path="alertas" element={<Alertas />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>

      {/* Administrador */}
      <Route path="/admin" element={<RutaPrivada soloAdmin><AppLayout /></RutaPrivada>}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="incidencias" element={<AdminIncidencias />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="avisos" element={<AdminAvisos />} />
          <Route path="alertas" element={<AdminAlertas />} />
          <Route path="contactos" element={<AdminContactos />} />
        </Route>
      </Route>

      {/* Cualquier otra ruta vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
