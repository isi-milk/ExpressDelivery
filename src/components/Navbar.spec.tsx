import { fireEvent, renderConApp, screen } from '../test/utils'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  beforeEach(() => localStorage.clear())

  it('muestra los enlaces principales y el carrito en 0', () => {
    renderConApp(<Navbar />)
    for (const texto of ['Home', 'Productos', 'Nosotros', 'Blogs', 'Contacto']) {
      expect(screen.getByRole('link', { name: texto })).toBeTruthy()
    }
    expect(document.querySelector('.contador-carrito')?.textContent).toBe('0')
  })

  it('marca como activo el enlace de la ruta actual', () => {
    renderConApp(<Navbar />, { ruta: '/productos' })
    expect(screen.getByRole('link', { name: 'Productos' }).className).toContain('activo')
    expect(screen.getByRole('link', { name: 'Home' }).className).not.toContain('activo')
  })

  it('el boton hamburguesa abre y cierra el menu (responsivo)', () => {
    renderConApp(<Navbar />)
    const menu = document.getElementById('menuPrincipal')!
    const boton = screen.getByRole('button', { name: /Abrir o cerrar el menu/ })
    expect(menu.className).not.toContain('show')
    expect(boton.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(boton)
    expect(menu.className).toContain('show')
    expect(boton.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(boton)
    expect(menu.className).not.toContain('show')
  })

  it('cierra el menu al elegir un enlace', () => {
    renderConApp(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /Abrir o cerrar el menu/ }))
    fireEvent.click(screen.getByRole('link', { name: 'Blogs' }))
    expect(document.getElementById('menuPrincipal')!.className).not.toContain('show')
  })
})
