import { Link, useParams } from 'react-router-dom'
import { ARTICULOS } from '../data/blogs'

export function BlogDetalle() {
  const { id } = useParams()
  const articulo = ARTICULOS.find((a) => String(a.id) === id)

  if (!articulo) {
    return (
      <div className="alert alert-warning">
        No encontramos ese articulo. <Link to="/blogs">Volver a los blogs</Link>.
      </div>
    )
  }

  const otro = ARTICULOS.find((a) => a.id !== articulo.id)!
  const esPrimero = articulo.id === ARTICULOS[0].id

  return (
    <article aria-labelledby="titulo-articulo">
      <title>{articulo.titulo + ' | ExpressDelivery'}</title>

      <nav aria-label="Ruta de navegacion" className="mb-3">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{articulo.etiqueta}</li>
        </ol>
      </nav>

      <header className="mb-4">
        <span className="categoria">{articulo.etiqueta}</span>
        <h1 id="titulo-articulo" className="h2 mt-1">{articulo.titulo}</h1>
        <p className="text-muted small">Publicado por {articulo.autor} de ExpressDelivery.</p>
      </header>

      <img src={articulo.imagen} alt={articulo.altImagen} className="img-fluid rounded mb-4" />

      <section>
        {articulo.contenido.map((bloque, i) => {
          switch (bloque.tipo) {
            case 'p':
              return <p key={i}>{bloque.texto}</p>
            case 'h':
              return <h2 key={i} className="h5 mt-4">{bloque.texto}</h2>
            case 'ul':
              return (
                <ul key={i}>
                  {bloque.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )
            case 'ol':
              return (
                <ol key={i}>
                  {bloque.items.map((item) => (
                    <li key={item.fuerte}><strong>{item.fuerte}</strong> {item.texto}</li>
                  ))}
                </ol>
              )
          }
        })}
      </section>

      <footer className="mt-4 pt-3 border-top">
        <Link to="/blogs" className="btn btn-ed-outline me-2">Volver a los blogs</Link>
        <Link to={'/blogs/' + otro.id} className="btn btn-ed">
          {esPrimero ? 'Leer el siguiente caso' : 'Leer el caso anterior'}
        </Link>
      </footer>
    </article>
  )
}
