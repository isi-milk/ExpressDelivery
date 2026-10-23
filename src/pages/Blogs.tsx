import { Link } from 'react-router-dom'
import { BLOGS } from '../data/blogs'

export function Blogs() {
  return (
    <section aria-labelledby="titulo-blogs">
      <title>Blogs | ExpressDelivery</title>
      <h1 id="titulo-blogs" className="titulo-seccion h3 text-center">Noticias importantes</h1>

      {BLOGS.map((blog) => (
        <article className="card-blog" key={blog.id}>
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2">
              <img src={blog.imagen} alt={blog.altImagen} />
            </div>
            <div className="col-lg-6 cuerpo-blog order-lg-1">
              <span className="categoria">{blog.etiqueta}</span>
              <h2 className="h4 mt-1">{blog.titulo}</h2>
              <p>{blog.resumen}</p>
              <Link to={'/blogs/' + blog.detalle} className="btn btn-ed-outline">Ver caso</Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
