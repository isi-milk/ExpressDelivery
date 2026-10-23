import { PRODUCTOS } from '../data/datos'
import { fireEvent, renderConApp, screen } from '../test/utils'
import { TarjetaProducto } from './TarjetaProducto'
import { Navbar } from './Navbar'

const normal = PRODUCTOS.find((p) => p.codigo === 'SE001')!
const critico = PRODUCTOS.find((p) => p.codigo === 'EMB011')!
const agotado = PRODUCTOS.find((p) => p.codigo === 'EMB012')!
const gratis = PRODUCTOS.find((p) => p.codigo === 'PLN030')!

describe('TarjetaProducto', () => {
  beforeEach(() => localStorage.clear())

  it('muestra nombre, categoria, precio formateado y stock', () => {
    renderConApp(<TarjetaProducto producto={normal} />)
    expect(screen.getByText('Envio estandar')).toBeTruthy()
    expect(screen.getByText('Servicios de envio')).toBeTruthy()
    expect(screen.getByText('$5.000')).toBeTruthy()
    expect(screen.getByText('Stock disponible: 120')).toBeTruthy()
  })

  it('enlaza al detalle del producto', () => {
    renderConApp(<TarjetaProducto producto={normal} />)
    const enlaces = screen.getAllByRole('link') as HTMLAnchorElement[]
    expect(enlaces.every((a) => a.getAttribute('href') === '/productos/SE001')).toBe(true)
  })

  it('avisa "Ultimas N unidades" cuando el stock esta en nivel critico', () => {
    renderConApp(<TarjetaProducto producto={critico} />)
    expect(screen.getByText('Ultimas 12 unidades')).toBeTruthy()
  })

  it('con stock 0 muestra "Sin stock" y deshabilita el boton', () => {
    renderConApp(<TarjetaProducto producto={agotado} />)
    const boton = screen.getByRole('button', { name: 'Sin stock' }) as HTMLButtonElement
    expect(boton.disabled).toBe(true)
  })

  it('muestra GRATIS si el precio es 0', () => {
    renderConApp(<TarjetaProducto producto={gratis} />)
    expect(screen.getByText('GRATIS')).toBeTruthy()
  })

  it('"Anadir al carrito" agrega 1 unidad (se ve en el contador del navbar) y avisa', () => {
    renderConApp(
      <>
        <Navbar />
        <TarjetaProducto producto={normal} />
      </>,
    )
    expect(document.querySelector('.contador-carrito')?.textContent).toBe('0')
    fireEvent.click(screen.getByRole('button', { name: 'Anadir al carrito' }))
    expect(document.querySelector('.contador-carrito')?.textContent).toBe('1')
    expect(screen.getByText('Envio estandar se agrego al carrito.')).toBeTruthy()
  })
})
