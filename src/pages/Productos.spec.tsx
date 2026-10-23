import { Productos } from './Productos'
import { fireEvent, renderConApp, screen } from '../test/utils'

describe('Productos (catalogo)', () => {
  beforeEach(() => localStorage.clear())

  it('muestra los 12 productos por defecto', () => {
    renderConApp(<Productos />, { ruta: '/productos' })
    expect(document.querySelectorAll('.card-producto').length).toBe(12)
  })

  it('filtra por categoria y resalta el boton activo', () => {
    renderConApp(<Productos />, { ruta: '/productos' })
    const boton = screen.getByRole('button', { name: 'Seguros y coberturas' })
    fireEvent.click(boton)
    expect(document.querySelectorAll('.card-producto').length).toBe(2)
    expect(boton.className).toContain('btn-ed')
    expect(boton.className).not.toContain('btn-ed-outline')
    fireEvent.click(screen.getByRole('button', { name: 'Todas' }))
    expect(document.querySelectorAll('.card-producto').length).toBe(12)
  })

  it('usa la grilla responsiva de Bootstrap (1 / 2 / 4 columnas)', () => {
    renderConApp(<Productos />, { ruta: '/productos' })
    const col = document.querySelector('.card-producto')!.parentElement!
    expect(col.className).toContain('col-12')
    expect(col.className).toContain('col-sm-6')
    expect(col.className).toContain('col-lg-3')
  })

  it('muestra un mensaje si la categoria no tiene productos', () => {
    localStorage.setItem('ed_productos', JSON.stringify([]))
    renderConApp(<Productos />, { ruta: '/productos' })
    expect(screen.getByText('No hay productos en esta categoria.')).toBeTruthy()
  })
})
