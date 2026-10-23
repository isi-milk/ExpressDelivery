import { TiendaLayout } from './TiendaLayout'
import { renderConApp, screen } from '../test/utils'

describe('TiendaLayout', () => {
  it('compone navbar, zona de sesion, contenido y footer', () => {
    renderConApp(<TiendaLayout />)
    expect(screen.getByRole('navigation', { name: 'Menu principal' })).toBeTruthy()
    expect(document.getElementById('zona-sesion')).toBeTruthy()
    expect(document.querySelector('footer.footer-ed')).toBeTruthy()
  })
})
