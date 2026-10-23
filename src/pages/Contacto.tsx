import { useState, type FormEvent } from 'react'
import { Campo } from '../components/Campo'
import { ResultadoForm, type Resultado } from '../components/ResultadoForm'
import { useFormulario } from '../hooks/useFormulario'
import { validarCorreo, validarTexto } from '../utils/validaciones'

const INICIAL = { nombre: '', correo: '', comentario: '' }

export function Contacto() {
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const f = useFormulario(INICIAL, {
    nombre: (v) => validarTexto(v, 'nombre', true, 0, 100),
    correo: (v) => validarCorreo(v, false),
    comentario: (v) => validarTexto(v, 'comentario', true, 0, 500),
  })

  function enviar(evento: FormEvent) {
    evento.preventDefault()
    if (f.validarTodo()) {
      setResultado({
        tipo: 'exito',
        mensaje: 'Tu mensaje fue enviado. Un ejecutivo de ExpressDelivery te respondera dentro de 24 horas habiles.',
      })
      f.reiniciar()
    } else {
      setResultado({ tipo: 'error', mensaje: 'Faltan datos o hay errores en el formulario.' })
    }
  }

  return (
    <section aria-labelledby="titulo-contacto">
      <title>Contacto | ExpressDelivery</title>
      <div className="text-center mb-4">
        <img src="/assets/img/logo.png" alt="Logotipo de ExpressDelivery" width={80} height={80} />
        <h1 id="titulo-contacto" className="h3 mt-3">ExpressDelivery</h1>
        <p className="text-muted">Respondemos dentro de 24 horas habiles.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <div className="caja-formulario">
            <div className="encabezado-form">Formulario de contacto</div>

            <form id="form-contacto" noValidate onSubmit={enviar}>
              <Campo
                id="nombre"
                etiqueta="Nombre completo"
                obligatorio
                maxLength={100}
                contador
                autoComplete="name"
                valor={f.valores.nombre}
                error={f.errores.nombre}
                validado={f.validados.nombre}
                onChange={(v) => f.cambiar('nombre', v)}
                onBlur={() => f.tocar('nombre')}
              />
              <Campo
                id="correo"
                tipo="email"
                etiqueta="Correo"
                placeholder="nombre@gmail.com"
                maxLength={100}
                contador
                autoComplete="email"
                ayuda="Opcional, pero si lo dejas te respondemos por ahi. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com"
                valor={f.valores.correo}
                error={f.errores.correo}
                validado={f.validados.correo}
                onChange={(v) => f.cambiar('correo', v)}
                onBlur={() => f.tocar('correo')}
              />
              <Campo
                id="comentario"
                tipo="textarea"
                etiqueta="Comentario"
                obligatorio
                rows={5}
                maxLength={500}
                contador
                valor={f.valores.comentario}
                error={f.errores.comentario}
                validado={f.validados.comentario}
                onChange={(v) => f.cambiar('comentario', v)}
                onBlur={() => f.tocar('comentario')}
              />

              <div className="d-grid">
                <button type="submit" className="btn btn-ed">Enviar mensaje</button>
              </div>
              <ResultadoForm resultado={resultado} />
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-4 mt-4 mt-lg-0">
          <aside className="panel-admin" aria-labelledby="titulo-datos">
            <h2 id="titulo-datos" className="h6">Otros canales</h2>
            <hr />
            <p className="small mb-2"><strong>Telefono</strong><br />+56 2 2345 6789</p>
            <p className="small mb-2"><strong>Correo</strong><br />contacto@expressdelivery.cl</p>
            <p className="small mb-2"><strong>Direccion</strong><br />Av. Libertador Bernardo O'Higgins 1234, Santiago</p>
            <p className="small mb-0"><strong>Horario</strong><br />Lunes a sabado, 08:00 a 20:00 horas.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
