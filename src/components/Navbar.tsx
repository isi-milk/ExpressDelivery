import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCarrito } from '../hooks/useContextos'

const ENLACES = [
  { ruta: '/', texto: 'Home' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blogs', texto: 'Blogs' },
  { ruta: '/contacto', texto: 'Contacto' },
]

export function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { unidades } = useCarrito()

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-ed fixed-top" aria-label="Menu principal">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/assets/img/logo.png" alt="Logotipo de ExpressDelivery" className="logo-ed" />
            Express<span>Delivery</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menuPrincipal"
            aria-expanded={abierto}
            aria-label="Abrir o cerrar el menu"
            onClick={() => setAbierto(!abierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={'collapse navbar-collapse' + (abierto ? ' show' : '')} id="menuPrincipal">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {ENLACES.map((enlace) => (
                <li className="nav-item" key={enlace.ruta}>
                  <NavLink
                    to={enlace.ruta}
                    end={enlace.ruta === '/'}
                    className={({ isActive }) => 'nav-link' + (isActive ? ' activo' : '')}
                    onClick={() => setAbierto(false)}
                  >
                    {enlace.texto}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link to="/carrito" className="btn-carrito text-decoration-none" onClick={() => setAbierto(false)}>
              Carrito (<span className="contador-carrito">{unidades}</span>)
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
