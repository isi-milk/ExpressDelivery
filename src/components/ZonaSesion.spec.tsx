import { fireEvent, renderConApp, screen, SESION_ADMIN, SESION_CLIENTE } from '../test/utils'
import { ZonaSesion } from './ZonaSesion'

describe('ZonaSesion', () => {
  beforeEach(() => localStorage.clear())

  it('sin sesion ofrece iniciar sesion y registrarse', () => {
    renderConApp(<ZonaSesion />)
    expect(screen.getByRole('link', { name: 'Iniciar sesion' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Registrar usuario' })).toBeTruthy()
  })

  it('un cliente ve su saludo pero no el panel', () => {
    renderConApp(<ZonaSesion />, { sesion: SESION_CLIENTE })
    expect(screen.getByText('Isidora')).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Panel de administracion' })).toBeNull()
  })

  it('un administrador ve el enlace al panel', () => {
    renderConApp(<ZonaSesion />, { sesion: SESION_ADMIN })
    expect(screen.getByRole('link', { name: 'Panel de administracion' })).toBeTruthy()
  })

  it('"Cerrar sesion" borra la sesion de localStorage y del estado', () => {
    renderConApp(<ZonaSesion />, { sesion: SESION_ADMIN })
    fireEvent.click(screen.getByText('Cerrar sesion'))
    expect(localStorage.getItem('ed_sesion')).toBeNull()
    expect(screen.getByRole('link', { name: 'Iniciar sesion' })).toBeTruthy()
  })
})
