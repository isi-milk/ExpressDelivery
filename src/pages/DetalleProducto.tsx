import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImagenProducto } from '../components/ImagenProducto'
import { TarjetaProducto } from '../components/TarjetaProducto'
import { CATEGORIAS } from '../data/datos'
import { useCarrito, useProductos } from '../hooks/useContextos'
import { formatearPrecio } from '../utils/formato'

export function DetalleProducto() {
  const { codigo = '' } = useParams()
  const { productos, buscarProducto } = useProductos()
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState('1')

  const producto = buscarProducto(codigo)

  if (!producto) {
    return (
      <section aria-label="Detalle del producto">
        <title>Producto no encontrado | ExpressDelivery</title>
        <div className="alert alert-warning">
          No encontramos ese producto. <Link to="/productos">Volver al listado</Link>.
        </div>
      </section>
    )
  }

  const categoria = CATEGORIAS.find((c) => c.codigo === producto.categoria)
  const enCritico = producto.stockCritico > 0 && producto.stock <= producto.stockCritico
  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.codigo !== producto.codigo)
    .slice(0, 4)

  return (
    <>
      <title>{producto.nombre + ' - ExpressDelivery'}</title>

      <section id="detalle-producto" aria-label="Detalle del producto">
        <nav aria-label="Ruta de navegacion" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>

        <div className="row g-4">
          <div className="col-lg-7">
            <ImagenProducto
              src={producto.imagen}
              alt={'Imagen de ' + producto.nombre}
              className="img-fluid rounded border bg-white p-3"
            />
          </div>
          <div className="col-lg-5">
            <span className="categoria">{categoria ? categoria.nombre : producto.categoria}</span>
            <h1 className="h3 mt-1">{producto.nombre}</h1>
            <p className="precio h4 text-dark">{formatearPrecio(producto.precio)}</p>
            <p className="small text-muted">Codigo: {producto.codigo}</p>
            <hr />
            <p>{producto.descripcion}</p>

            {producto.stock === 0 ? (
              <p className="stock-agotado">Producto sin stock por el momento.</p>
            ) : enCritico ? (
              <p className="stock-critico">Quedan solo {producto.stock} unidades.</p>
            ) : (
              <p className="small text-muted">Stock disponible: {producto.stock} unidades</p>
            )}

            {producto.stock === 0 ? (
              <Link to="/contacto" className="btn btn-ed-outline w-100">
                Consultar disponibilidad
              </Link>
            ) : (
              <div className="row g-2 align-items-end">
                <div className="col-4">
                  <label className="form-label" htmlFor="cantidad">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cantidad"
                    value={cantidad}
                    min={1}
                    max={producto.stock}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
                <div className="col-8">
                  <button className="btn btn-ed w-100" onClick={() => agregar(producto.codigo, Number(cantidad))}>
                    Anadir al carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="mt-5" aria-labelledby="titulo-relacionados">
          <h2 id="titulo-relacionados" className="titulo-seccion h5">Productos relacionados</h2>
          <div className="row">
            {relacionados.map((p) => (
              <div className="col-6 col-lg-3 mb-4" key={p.codigo}>
                <TarjetaProducto producto={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
