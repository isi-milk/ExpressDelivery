import { Link } from 'react-router-dom'
import { TarjetaProducto } from '../components/TarjetaProducto'
import { useProductos } from '../hooks/useContextos'

const CIFRAS = [
  { valor: '150', etiqueta: 'Entregas diarias' },
  { valor: '18', etiqueta: 'Vehiculos en flota' },
  { valor: '22', etiqueta: 'Repartidores' },
  { valor: '10+', etiqueta: 'Anos de experiencia' },
]

const ESTADOS = [
  { clase: 'solicitado', estado: 'Solicitado', significa: 'Hemos recibido tu solicitud de envio.', accion: 'Ver el detalle del envio.' },
  { clase: 'ruta', estado: 'En ruta', significa: 'Tu envio esta en proceso de entrega.', accion: 'Ver la ubicacion en tiempo real.' },
  { clase: 'entregado', estado: 'Entregado', significa: 'Tu envio fue entregado exitosamente.', accion: 'Descargar el comprobante de entrega.' },
  { clase: 'retrasado', estado: 'Retrasado', significa: 'Tu envio presenta un retraso.', accion: 'Ver el motivo y el nuevo tiempo estimado.' },
  { clase: 'cancelado', estado: 'Cancelado', significa: 'El envio fue cancelado.', accion: 'Solicitar un nuevo envio.' },
]

export function Home() {
  const { productos } = useProductos()

  return (
    <>
      <title>Inicio | ExpressDelivery</title>

      <section className="hero" aria-labelledby="titulo-hero">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 id="titulo-hero">Tu envio, sin perder el rastro</h1>
            <p>
              Contrata en linea el servicio de envio que necesitas y sigue tu paquete en tiempo
              real. Entregas en 24 horas, 4 horas o 1 hora en toda la Region Metropolitana, con
              comprobante digital de entrega.
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <Link to="/productos" className="btn btn-ed">Ver productos</Link>
              <Link to="/contacto" className="btn btn-ed-outline">Cotizar plan empresa</Link>
            </div>
          </div>
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img src="/assets/img/hero.png" alt="Ilustracion de la flota de reparto de ExpressDelivery" />
          </div>
        </div>
      </section>

      <section className="mb-5" aria-labelledby="titulo-cifras">
        <h2 id="titulo-cifras" className="titulo-seccion h4">ExpressDelivery en numeros</h2>
        <div className="row g-3">
          {CIFRAS.map((cifra) => (
            <div className="col-6 col-lg-3" key={cifra.etiqueta}>
              <div className="tarjeta-kpi">
                <div className="valor">{cifra.valor}</div>
                <div className="etiqueta">{cifra.etiqueta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5" aria-labelledby="titulo-productos">
        <h2 id="titulo-productos" className="titulo-seccion h4">Nuestros servicios y productos</h2>
        <div className="row">
          {productos.slice(0, 8).map((producto) => (
            <div className="col-12 col-sm-6 col-lg-3 mb-4" key={producto.codigo}>
              <TarjetaProducto producto={producto} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/productos" className="btn btn-ed-outline">Ver el catalogo completo</Link>
        </div>
      </section>

      <section className="mb-5" aria-labelledby="titulo-estados">
        <h2 id="titulo-estados" className="titulo-seccion h4">Como sigues tu envio</h2>
        <div className="table-responsive">
          <table className="table table-bordered bg-white align-middle">
            <caption className="small">Flujo de estados de un envio en ExpressDelivery.</caption>
            <thead>
              <tr>
                <th scope="col">Estado</th>
                <th scope="col">Que significa</th>
                <th scope="col">Que puedes hacer</th>
              </tr>
            </thead>
            <tbody>
              {ESTADOS.map((e) => (
                <tr key={e.estado}>
                  <td><span className={'badge-estado ' + e.clase}>{e.estado}</span></td>
                  <td>{e.significa}</td>
                  <td>{e.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
