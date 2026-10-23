import { AdminLayout } from './AdminLayout'
import { fireEvent, renderConApp, screen, SESION_ADMIN, SESION_VENDEDOR } from '../test/utils'

describe('AdminLayout', () => {
  beforeEach(() => localStorage.clear())

  it('el administrador ve todo el menu', () => {
    renderConApp(<AdminLayout />, { ruta: '/admin', sesion: SESION_ADMIN })
    for (const t of ['Dashboard', 'Productos', 'Nuevo producto', 'Usuarios', 'Nuevo usuario']) {
      expect(screen.getByRole('link', { name: t })).toBeTruthy()
    }
    expect(screen.getByText('Perfil: Administrador')).toBeTruthy()
  })

  it('el vendedor no ve usuarios ni creacion de productos', () => {
    renderConApp(<AdminLayout />, { ruta: '/admin', sesion: SESION_VENDEDOR })
    expect(screen.queryByRole('link', { name: 'Usuarios' })).toBeNull()
    expect(screen.queryByRole('link', { name: 'Nuevo producto' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy()
  })

  it('marca el item activo segun la ruta (Productos activo al editar, no en "nuevo")', () => {
    const { unmount } = renderConApp(<AdminLayout />, { ruta: '/admin/productos/SE001', sesion: SESION_ADMIN })
    expect(screen.getByRole('link', { name: 'Productos' }).className).toContain('activo')
    unmount()
    renderConApp(<AdminLayout />, { ruta: '/admin/productos/nuevo', sesion: SESION_ADMIN })
    expect(screen.getByRole('link', { name: 'Productos' }).className).not.toContain('activo')
    expect(screen.getByRole('link', { name: 'Nuevo producto' }).className).toContain('activo')
  })

  it('agrega la clase "admin" al body mientras esta montado', () => {
    const { unmount } = renderConApp(<AdminLayout />, { ruta: '/admin', sesion: SESION_ADMIN })
    expect(document.body.classList.contains('admin')).toBe(true)
    unmount()
    expect(document.body.classList.contains('admin')).toBe(false)
  })

  it('"Cerrar sesion" borra la sesion y vuelve a la tienda', () => {
    renderConApp(<AdminLayout />, { ruta: '/admin', sesion: SESION_ADMIN })
    fireEvent.click(screen.getByText('Cerrar sesion'))
    expect(localStorage.getItem('ed_sesion')).toBeNull()
    expect(screen.getByTestId('ubicacion').textContent).toBe('/')
  })
})
