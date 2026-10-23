import { DetalleProducto } from './DetalleProducto'
import { fireEvent, renderConApp, screen, within } from '../test/utils'

const detalle = () => within(document.getElementById('detalle-producto') as HTMLElement)
const ver = (codigo: string) =>
  renderConApp(<DetalleProducto />, { ruta: '/productos/' + codigo, patron: '/productos/:codigo' })

describe('DetalleProducto', () => {
  beforeEach(() => localStorage.clear())

  it('lee el codigo de la URL y muestra el producto', () => {
    ver('SE002')
    expect(screen.getByRole('heading', { level: 1, name: 'Envio expres' })).toBeTruthy()
    expect(screen.getByText('$10.000')).toBeTruthy()
    expect(screen.getByText('Codigo: SE002')).toBeTruthy()
  })

  it('muestra productos relacionados de la misma categoria (sin el actual)', () => {
    ver('SE002')
    const relacionados = document.querySelectorAll('section.mt-5 .card-producto')
    expect(relacionados.length).toBe(4)
    const nombres = Array.from(relacionados).map((c) => c.querySelector('h3')!.textContent)
    expect(nombres).not.toContain('Envio expres')
  })

  it('mensaje amigable si el producto no existe', () => {
    ver('NOPE')
    expect(screen.getByText(/No encontramos ese producto/)).toBeTruthy()
  })

  it('agrega la cantidad indicada al carrito', () => {
    ver('SE001')
    fireEvent.change(screen.getByLabelText('Cantidad'), { target: { value: '3' } })
    fireEvent.click(detalle().getByRole('button', { name: 'Anadir al carrito' }))
    expect(JSON.parse(localStorage.getItem('ed_carrito')!)).toEqual([{ codigo: 'SE001', cantidad: 3 }])
  })

  it('sin stock ofrece "Consultar disponibilidad" en vez de comprar', () => {
    ver('EMB012')
    expect(screen.getByText('Producto sin stock por el momento.')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Consultar disponibilidad' })).toBeTruthy()
    expect(detalle().queryByRole('button', { name: 'Anadir al carrito' })).toBeNull()
  })

  it('con stock critico avisa cuantas unidades quedan', () => {
    ver('EMB011')
    expect(screen.getByText('Quedan solo 12 unidades.')).toBeTruthy()
  })
})
