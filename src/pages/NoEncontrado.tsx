import { Link } from 'react-router-dom'

export function NoEncontrado() {
  return (
    <section className="text-center py-5">
      <title>Pagina no encontrada | ExpressDelivery</title>
      <h1 className="h3">No encontramos esa pagina</h1>
      <p className="text-muted">La direccion que buscas no existe o fue movida.</p>
      <Link to="/" className="btn btn-ed">Volver al inicio</Link>
    </section>
  )
}
