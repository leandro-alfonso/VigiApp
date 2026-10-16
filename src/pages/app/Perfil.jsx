import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Card from '../../components/Card.jsx'
import Campo from '../../components/Campo.jsx'
import Modal from '../../components/Modal.jsx'
import IncidentCard from '../../components/IncidentCard.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { COMUNIDAD_MOCK, INCIDENCIAS_MOCK } from '../../data/mock.js'

const CLAVES_VACIAS = { actual: '', nueva: '', repetir: '' }

export default function Perfil() {
  const { usuario, esAdmin, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const [claveAbierta, setClaveAbierta] = useState(false)
  const [claves, setClaves] = useState(CLAVES_VACIAS)
  const [errores, setErrores] = useState({})
  const [claveOk, setClaveOk] = useState(false)

  const misReportes = INCIDENCIAS_MOCK.filter((i) => i.esMia)
  const iniciales = `${usuario?.nombre?.[0] ?? ''}${usuario?.apellido?.[0] ?? ''}`

  function abrirClave() { setClaves(CLAVES_VACIAS); setErrores({}); setClaveOk(false); setClaveAbierta(true) }

  function guardarClave(e) {
    e.preventDefault()
    const nuevos = {}
    if (!claves.actual) nuevos.actual = 'Ingresá tu contraseña actual.'
    if (claves.nueva.length < 8) nuevos.nueva = 'La nueva contraseña debe tener al menos 8 caracteres.'
    if (claves.repetir !== claves.nueva) nuevos.repetir = 'Las contraseñas no coinciden.'
    setErrores(nuevos)
    const primero = Object.keys(nuevos)[0]
    if (primero) return document.getElementById(`clave-${primero}`)?.focus()
    setClaveOk(true) // simulado
  }

  function salir() { cerrarSesion(); navigate('/') }

  const campoClave = (campo, etiqueta, autoComplete) => (
    <Campo id={`clave-${campo}`} etiqueta={etiqueta} error={errores[campo]}>
      <input id={`clave-${campo}`} className="input" type="password" autoComplete={autoComplete}
        value={claves[campo]} aria-invalid={!!errores[campo]}
        aria-describedby={errores[campo] ? `clave-${campo}-error` : undefined}
        onChange={(e) => setClaves({ ...claves, [campo]: e.target.value })} />
    </Campo>
  )

  return (
    <>
      <div className="perfil-head">
        <span className="avatar" aria-hidden="true">{iniciales}</span>
        <div>
          <h2>{usuario?.nombre} {usuario?.apellido}</h2>
          <p>{esAdmin ? 'Administrador' : 'Vecino'} · {COMUNIDAD_MOCK.nombre}</p>
        </div>
      </div>

      <div className="perfil-grid">
        <Card as="section" aria-labelledby="p-datos">
          <h3 id="p-datos">Mis datos</h3>
          <dl className="datos">
            <dt>Nombre</dt><dd>{usuario?.nombre}</dd>
            <dt>Apellido</dt><dd>{usuario?.apellido}</dd>
            <dt>Email</dt><dd>{usuario?.email}</dd>
          </dl>
          <button type="button" className="btn btn-outline" onClick={abrirClave}>Cambiar contraseña</button>
        </Card>

        <Card as="section" aria-labelledby="p-comunidad">
          <h3 id="p-comunidad">Mi comunidad</h3>
          <dl className="datos">
            <dt>Nombre</dt><dd>{COMUNIDAD_MOCK.nombre}</dd>
            <dt>Zona</dt><dd>{COMUNIDAD_MOCK.zona}</dd>
            <dt>Vecinos</dt><dd>{COMUNIDAD_MOCK.vecinos}</dd>
          </dl>
        </Card>
      </div>

      <section className="bloque" aria-labelledby="p-reportes">
        <div className="bloque__head"><h2 id="p-reportes">Mis reportes</h2></div>
        {misReportes.length === 0 ? (
          <EmptyState icono="📝" titulo="Todavía no reportaste nada" texto="Cuando reportes una incidencia, la vas a ver acá.">
            <Link to="/app/reportar" className="btn btn-primary">Reportar incidencia</Link>
          </EmptyState>
        ) : (
          <div className="stack-list">{misReportes.map((i) => <IncidentCard key={i.id} incidencia={i} />)}</div>
        )}
      </section>

      <nav className="lista-acciones" aria-label="Más opciones">
        {esAdmin && <Link to="/admin">⚙️ Panel de administración</Link>}
        <Link to="/contacto">✉️ Contacto</Link>
        <button type="button" onClick={salir}>↩︎ Cerrar sesión</button>
      </nav>

      <Modal abierto={claveAbierta} onCerrar={() => setClaveAbierta(false)} titulo="Cambiar contraseña">
        {claveOk ? (
          <div className="ayuda-ok" role="status">
            <span className="ayuda-ok__icon" aria-hidden="true">✅</span>
            <h3>Contraseña actualizada</h3>
            <p>(Simulado: todavía no hay backend.)</p>
            <button type="button" className="btn btn-primary" onClick={() => setClaveAbierta(false)}>Listo</button>
          </div>
        ) : (
          <form onSubmit={guardarClave} noValidate>
            {campoClave('actual', 'Contraseña actual', 'current-password')}
            {campoClave('nueva', 'Nueva contraseña', 'new-password')}
            {campoClave('repetir', 'Repetir nueva contraseña', 'new-password')}
            <button type="submit" className="btn btn-primary btn-ancho">Guardar contraseña</button>
          </form>
        )}
      </Modal>
    </>
  )
}
