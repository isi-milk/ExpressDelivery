import { Contacto } from './Contacto'
import { fireEvent, renderConApp, screen } from '../test/utils'

const enviar = () => fireEvent.submit(document.getElementById('form-contacto')!)
const escribir = (etiqueta: RegExp, valor: string) =>
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } })

describe('Contacto', () => {
  it('muestra errores si se envia vacio', () => {
    renderConApp(<Contacto />)
    enviar()
    expect(screen.getByText('El campo nombre es obligatorio.')).toBeTruthy()
    expect(screen.getByText('El campo comentario es obligatorio.')).toBeTruthy()
    expect(screen.getByText(/Faltan datos/)).toBeTruthy()
  })

  it('el correo es opcional pero, si se escribe, debe tener un dominio permitido', () => {
    renderConApp(<Contacto />)
    escribir(/Correo/, 'x@hotmail.com')
    expect(screen.getByText(/Solo se aceptan correos/)).toBeTruthy()
    escribir(/Correo/, '')
    expect(screen.queryByText(/Solo se aceptan correos/)).toBeNull()
  })

  it('actualiza el contador de caracteres mientras se escribe', () => {
    renderConApp(<Contacto />)
    escribir(/Comentario/, 'Hola')
    expect(screen.getByText('4 / 500 caracteres')).toBeTruthy()
  })

  it('con datos validos confirma el envio y limpia el formulario', () => {
    renderConApp(<Contacto />)
    escribir(/Nombre completo/, 'Ana Perez')
    escribir(/Comentario/, 'Quiero cotizar un plan')
    enviar()
    expect(screen.getByText(/Tu mensaje fue enviado/)).toBeTruthy()
    expect((screen.getByLabelText(/Nombre completo/) as HTMLInputElement).value).toBe('')
  })
})
