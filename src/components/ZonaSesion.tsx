import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useContextos'

export function ZonaSesion() {
  const { sesion, cerrarSesion } = useAuth()

  return (
    <div className="container">
      <div className="text-end small py-2" id="zona-sesion">
        {!sesion ? (
          <>
            <Link to="/login" className="me-3">
              Iniciar sesion
            </Link>
            <Link to="/registro">Registrar usuario</Link>
          </>
        ) : (
          <>
            <span className="me-3">
              Hola, <strong>{sesion.nombre}</strong> ({sesion.tipoUsuario})
            </span>
            {sesion.tipoUsuario !== 'Cliente' && (
              <Link to="/admin" className="me-3">
                Panel de administracion
              </Link>
            )}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                cerrarSesion()
              }}
            >
              Cerrar sesion
            </a>
          </>
        )}
      </div>
    </div>
  )
}
