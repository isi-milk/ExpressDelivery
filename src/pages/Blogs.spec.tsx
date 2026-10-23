import { BlogDetalle } from './BlogDetalle'
import { Blogs } from './Blogs'
import { Nosotros } from './Nosotros'
import { NoEncontrado } from './NoEncontrado'
import { renderConApp, screen } from '../test/utils'

describe('Blogs', () => {
  it('lista las 3 noticias con enlace "Ver caso"', () => {
    renderConApp(<Blogs />)
    expect(screen.getAllByRole('link', { name: 'Ver caso' }).length).toBe(3)
  })
})

describe('BlogDetalle', () => {
  const ver = (id: string) => renderConApp(<BlogDetalle />, { ruta: '/blogs/' + id, patron: '/blogs/:id' })

  it('renderiza los bloques del articulo (parrafos, titulos y listas)', () => {
    ver('2')
    expect(screen.getByRole('heading', { level: 1, name: /50 llamadas diarias/ })).toBeTruthy()
    expect(document.querySelectorAll('section ol li').length).toBe(5)
    expect(document.querySelectorAll('section h2').length).toBe(3)
  })

  it('ofrece navegar al otro caso', () => {
    ver('1')
    expect(screen.getByRole('link', { name: 'Leer el siguiente caso' }).getAttribute('href')).toBe('/blogs/2')
  })

  it('articulo inexistente: mensaje y enlace de regreso', () => {
    ver('99')
    expect(screen.getByText(/No encontramos ese articulo/)).toBeTruthy()
  })
})

describe('Nosotros / NoEncontrado', () => {
  it('Nosotros muestra al equipo de 3 personas y la tabla de tecnologias', () => {
    renderConApp(<Nosotros />)
    expect(document.querySelectorAll('img.rounded-circle').length).toBe(3)
    expect(screen.getByText('React + TypeScript')).toBeTruthy()
  })
  it('NoEncontrado ofrece volver al inicio', () => {
    renderConApp(<NoEncontrado />)
    expect(screen.getByRole('link', { name: 'Volver al inicio' }).getAttribute('href')).toBe('/')
  })
})
