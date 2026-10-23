import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer-ed">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <h5>ExpressDelivery</h5>
            <p className="small">
              Mensajeria y reparto expres en la Region Metropolitana desde 2014. 18 vehiculos, 22
              repartidores y un promedio de 150 entregas diarias.
            </p>
          </div>

          <div className="col-6 col-md-2 mb-4">
            <h5>Tienda</h5>
            <Link to="/productos">Productos</Link>
            <Link to="/carrito">Mi carrito</Link>
            <Link to="/registro">Registrarme</Link>
            <Link to="/login">Iniciar sesion</Link>
          </div>

          <div className="col-6 col-md-2 mb-4">
            <h5>Empresa</h5>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/contacto">Contacto</Link>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5>Contacto</h5>
            <address className="small mb-2">
              Av. Libertador Bernardo O'Higgins 1234, Santiago
              <br />
              Telefono: +56 2 2345 6789
              <br />
              Correo: contacto@expressdelivery.cl
            </address>
            <p className="small mb-0">Lunes a sabado, 08:00 a 20:00 horas.</p>
          </div>
        </div>

        <div className="creditos text-center">
          <p className="mb-1">
            Proyecto academico DSY1104 Desarrollo Fullstack II - Duoc UC - Evaluacion Parcial 1.
          </p>
          <p className="mb-0">Desarrollado por Axel Contreras, Alexis Encalada e Isidora Carreno.</p>
        </div>
      </div>
    </footer>
  )
}
