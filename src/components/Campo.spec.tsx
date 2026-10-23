import { fireEvent, render, screen } from '@testing-library/react'
import { Campo } from './Campo'

describe('Campo', () => {
  const base = { id: 'nombre', etiqueta: 'Nombre', valor: '', onChange: () => {} }

  it('asocia la etiqueta con el input y marca el asterisco si es obligatorio', () => {
    render(<Campo {...base} obligatorio />)
    expect(screen.getByLabelText(/Nombre/)).toBeTruthy()
    expect(screen.getByText('*')).toBeTruthy()
  })

  it('llama a onChange con el texto escrito y a onBlur al salir', () => {
    const onChange = vi.fn()
    const onBlur = vi.fn()
    render(<Campo {...base} onChange={onChange} onBlur={onBlur} />)
    const input = screen.getByLabelText(/Nombre/)
    fireEvent.change(input, { target: { value: 'Ana' } })
    fireEvent.blur(input)
    expect(onChange).toHaveBeenCalledExactlyOnceWith('Ana')
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('muestra el error y aplica la clase de campo invalido', () => {
    render(<Campo {...base} error="Falta el nombre" />)
    const input = screen.getByLabelText(/Nombre/)
    expect(input.className).toContain('campo-invalido')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByText('Falta el nombre')).toBeTruthy()
  })

  it('aplica la clase valido cuando el campo esta validado sin errores', () => {
    render(<Campo {...base} valor="Ana" validado />)
    expect(screen.getByLabelText(/Nombre/).className).toContain('campo-valido')
  })

  it('contador: muestra "n / max" y se pone rojo al pasarse', () => {
    const { rerender } = render(<Campo {...base} valor="Ana" maxLength={5} contador />)
    expect(screen.getByText('3 / 5 caracteres').getAttribute('style')).toBeNull()
    rerender(<Campo {...base} valor="Anastasia" maxLength={5} contador />)
    expect(screen.getByText('9 / 5 caracteres').getAttribute('style')).toContain('color')
  })

  it('renderiza un textarea', () => {
    render(<Campo {...base} tipo="textarea" rows={3} />)
    expect(screen.getByLabelText(/Nombre/).tagName).toBe('TEXTAREA')
  })

  it('renderiza un select con sus opciones y notifica la seleccion', () => {
    const onChange = vi.fn()
    render(
      <Campo
        {...base}
        tipo="select"
        textoOpcionVacia="-- Elige --"
        opciones={[{ valor: 'a', etiqueta: 'Opcion A' }, { valor: 'b', etiqueta: 'Opcion B' }]}
        onChange={onChange}
      />,
    )
    const select = screen.getByLabelText(/Nombre/) as HTMLSelectElement
    expect(select.options.length).toBe(3)
    fireEvent.change(select, { target: { value: 'b' } })
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('puede deshabilitarse y mostrar texto de ayuda', () => {
    render(<Campo {...base} deshabilitado ayuda="Solo letras" />)
    expect((screen.getByLabelText(/Nombre/) as HTMLInputElement).disabled).toBe(true)
    expect(screen.getByText('Solo letras')).toBeTruthy()
  })
})
