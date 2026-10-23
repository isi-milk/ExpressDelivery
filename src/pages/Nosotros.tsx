const PROPUESTAS = [
  { titulo: 'Para los clientes', texto: 'Solicitud de envios en linea y seguimiento del estado en tiempo real, con alertas automaticas cuando un envio presenta retrasos.' },
  { titulo: 'Para los supervisores de ruta', texto: 'Asignacion optimizada de vehiculos y repartidores, reduciendo tiempos y costos operativos.' },
  { titulo: 'Para los repartidores', texto: 'Rutas digitales en el telefono y reporte de entregas desde el mismo dispositivo, sin papeles.' },
  { titulo: 'Para la administracion', texto: 'Reportes automaticos de entregas, rutas, productividad y costos para apoyar la toma de decisiones.' },
]

const EQUIPO = [
  { nombre: 'Axel Contreras', foto: 'axel', rol: 'Estructura HTML y semantica', texto: 'Responsable del marcado semantico de las vistas, la navegacion entre paginas y la accesibilidad de los formularios.' },
  { nombre: 'Alexis Encalada', foto: 'alexis', rol: 'Diseno CSS y responsividad', texto: 'Responsable de la hoja de estilos externa, las variables de diseno, el uso de Bootstrap y las media queries para movil.' },
  { nombre: 'Isidora Carreno', foto: 'isidora', rol: 'JavaScript, validaciones y carrito', texto: 'Responsable de las validaciones de formularios, el carrito con localStorage y los mantenedores del administrador.' },
]

const TECNOLOGIAS = [
  ['React + TypeScript', 'Componentes, rutas y estado de las 18 vistas del sistema.'],
  ['Vite', 'Servidor de desarrollo y empaquetado del proyecto.'],
  ['React Router', 'Navegacion entre paginas y proteccion de las rutas del administrador.'],
  ['CSS3', 'Hoja de estilos con variables, flexbox y media queries.'],
  ['Bootstrap 5.3', 'Grilla responsiva, barra de navegacion, tablas y formularios.'],
  ['localStorage', 'Persistencia del carrito, productos, usuarios y sesion.'],
  ['Git y GitHub', 'Control de versiones y trabajo colaborativo del equipo.'],
  ['Visual Studio Code', 'Editor de codigo para el desarrollo del proyecto.'],
]

export function Nosotros() {
  return (
    <>
      <title>Nosotros | ExpressDelivery</title>

      <section className="mb-5" aria-labelledby="titulo-nosotros">
        <h1 id="titulo-nosotros" className="titulo-seccion h3">Sobre ExpressDelivery</h1>
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p>
              ExpressDelivery es una empresa de mensajeria y reparto expres que opera en la Region
              Metropolitana desde 2014. Cuenta con una flota de 18 vehiculos entre furgonetas, motos
              y camionetas, y con un equipo de 22 repartidores, 3 supervisores de ruta, 1 jefe de
              operaciones y 1 administrador.
            </p>
            <p>
              Realizamos un promedio de 150 entregas diarias para clientes de retail, farmacias y
              comercio electronico.
            </p>
          </div>
          <div className="col-lg-5">
            <img src="/assets/img/bodega.png" alt="Centro de distribucion de ExpressDelivery" className="img-fluid rounded" />
          </div>
        </div>
      </section>

      <section className="mb-5" aria-labelledby="titulo-problema">
        <h2 id="titulo-problema" className="titulo-seccion h4">El problema que resolvemos</h2>
        <p>
          En los ultimos dos anos la demanda de mensajeria expres crecio un 60 por ciento, lo que
          tensiono el sistema manual de gestion de flota basado en planillas Excel y llamadas
          telefonicas. Estos son los problemas concretos que detectamos:
        </p>
        <ul>
          <li><strong>Baja eficiencia en rutas:</strong> el 20 por ciento de las rutas presenta ineficiencias por falta de optimizacion.</li>
          <li><strong>Perdida de tiempo:</strong> los repartidores pierden el 15 por ciento de su jornada en desplazamientos innecesarios.</li>
          <li><strong>Clientes desinformados:</strong> la falta de seguimiento genera 50 llamadas diarias al call center.</li>
          <li><strong>Alta rotacion:</strong> el 25 por ciento de los repartidores renuncia cada ano.</li>
          <li><strong>Reportes manuales:</strong> no existen reportes automaticos de entregas, rutas ni productividad.</li>
        </ul>
      </section>

      <section className="mb-5" aria-labelledby="titulo-solucion">
        <h2 id="titulo-solucion" className="titulo-seccion h4">Nuestra propuesta</h2>
        <div className="row g-3">
          {PROPUESTAS.map((p) => (
            <div className="col-md-6" key={p.titulo}>
              <article className="panel-admin h-100">
                <h3 className="h6">{p.titulo}</h3>
                <p className="small mb-0">{p.texto}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5" aria-labelledby="titulo-equipo">
        <h2 id="titulo-equipo" className="titulo-seccion h4">Equipo de desarrollo</h2>
        <div className="row g-4 text-center">
          {EQUIPO.map((persona) => (
            <div className="col-12 col-md-4" key={persona.nombre}>
              <article className="panel-admin h-100">
                <img
                  src={'/assets/img/' + persona.foto + '.png'}
                  alt={'Foto de perfil de ' + persona.nombre}
                  className="rounded-circle mb-3"
                  width={110}
                  height={110}
                />
                <h3 className="h6 mb-1">{persona.nombre}</h3>
                <p className="small text-muted mb-2">{persona.rol}</p>
                <p className="small mb-0">{persona.texto}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5" aria-labelledby="titulo-tecnologias">
        <h2 id="titulo-tecnologias" className="titulo-seccion h4">Tecnologias utilizadas</h2>
        <div className="table-responsive">
          <table className="table table-striped bg-white">
            <caption className="small">Herramientas del proyecto (frontend).</caption>
            <thead>
              <tr>
                <th scope="col">Tecnologia</th>
                <th scope="col">Para que la usamos</th>
              </tr>
            </thead>
            <tbody>
              {TECNOLOGIAS.map(([tecnologia, uso]) => (
                <tr key={tecnologia}>
                  <td>{tecnologia}</td>
                  <td>{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
