import { render, screen } from '@testing-library/react'
import { ResultadoForm } from './ResultadoForm'

describe('ResultadoForm', () => {
  it('no muestra alertas sin resultado', () => {
    const { container } = render(<ResultadoForm resultado={null} />)
    expect(container.querySelector('.alert')).toBeNull()
  })
  it('muestra una alerta verde en caso de exito', () => {
    render(<ResultadoForm resultado={{ tipo: 'exito', mensaje: 'Guardado' }} />)
    expect(screen.getByText('Listo.')).toBeTruthy()
    expect(document.querySelector('.alert-success')?.textContent).toContain('Guardado')
  })
  it('muestra una alerta roja en caso de error', () => {
    render(<ResultadoForm resultado={{ tipo: 'error', mensaje: 'Corrige' }} />)
    expect(document.querySelector('.alert-danger')?.textContent).toContain('Corrige')
  })
})
