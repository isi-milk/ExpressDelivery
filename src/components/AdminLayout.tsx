import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useContextos'

interface ItemMenuProps {
  to: string
  children: string

  exacto?: boolean

  excluir?: string
}

function ItemMenu({ to, children, exacto = false, excluir }: ItemMenuProps) {
  const { pathname } = useLocation()
  const coincide = exacto ? pathname === to : pathname === to || pathname.startsWith(to + '/')
  const activo = coincide && !(excluir && pathname.startsWith(excluir))
  return (
    <Link to={to} className={'item-menu' + (activo ? ' activo' : '')}>
      {children}
    </Link>
  )
}

export function AdminLayout() {
  const { sesion, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const esAdmin = sesion?.tipoUsuario === 'Administrador'

  useEffect(() => {
    document.body.classList.add('admin')
    return () => document.body.classList.remove('admin')
  }, [])

  return (
    <div className="layout-admin">
      <aside className="barra-lateral">
        <Link to="/" className="marca">
          <img src="/assets/img/logo.png" alt="Logotipo de ExpressDelivery" className="logo-ed" />
          Express<span>Delivery</span>
        </Link>

        <nav aria-label="Menu del administrador">
          <p className="titulo-grupo">GENERAL</p>
          <ItemMenu to="/admin" exacto>Dashboard</ItemMenu>

          <p className="titulo-grupo">CATALOGO</p>
          <ItemMenu to="/admin/productos" excluir="/admin/productos/nuevo">Productos</ItemMenu>
          {esAdmin && <ItemMenu to="/admin/productos/nuevo">Nuevo producto</ItemMenu>}

          {esAdmin && (
            <>
              <p className="titulo-grupo">PERSONAS</p>
              <ItemMenu to="/admin/usuarios" excluir="/admin/usuarios/nuevo">Usuarios</ItemMenu>
              <ItemMenu to="/admin/usuarios/nuevo">Nuevo usuario</ItemMenu>
            </>
          )}

          <p className="titulo-grupo">SESION</p>
          <Link to="/" className="item-menu">
            Ir a la tienda
          </Link>
          <a
            href="#"
            className="item-menu"
            onClick={(e) => {
              e.preventDefault()
              cerrarSesion()
              navigate('/')
            }}
          >
            Cerrar sesion
          </a>
        </nav>

        <div className="mt-4 pt-3 border-top border-secondary">
          <p className="small mb-0">
            Hola {sesion?.nombre} {sesion?.apellidos}
          </p>
          <p className="small text-warning mb-0">Perfil: {sesion?.tipoUsuario}</p>
        </div>
      </aside>

      <main className="contenido-admin">
        <Outlet />
      </main>
    </div>
  )
}
