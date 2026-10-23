import { fireEvent, render, screen } from '@testing-library/react'
import { ImagenProducto } from './ImagenProducto'

describe('ImagenProducto', () => {
  it('usa el src y alt recibidos por props', () => {
    render(<ImagenProducto src="/assets/img/sobre.png" alt="Sobre" />)
    expect(screen.getByAltText('Sobre').getAttribute('src')).toBe('/assets/img/sobre.png')
  })
  it('cae a la imagen generica si la imagen falla al cargar', () => {
    render(<ImagenProducto src="/no-existe.png" alt="Roto" />)
    const img = screen.getByAltText('Roto') as HTMLImageElement
    fireEvent.error(img)
    expect(img.src).toContain('/assets/img/generico.png')
  })
})
