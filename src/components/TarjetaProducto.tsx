import { Link } from 'react-router-dom'
import { CATEGORIAS } from '../data/datos'
import { useCarrito } from '../hooks/useContextos'
import type { Producto } from '../types'
import { formatearPrecio } from '../utils/formato'
import { ImagenProducto } from './ImagenProducto'

export function TarjetaProducto({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito()
  const categoria = CATEGORIAS.find((c) => c.codigo === producto.categoria)
  const enCritico = producto.stockCritico > 0 && producto.stock <= producto.stockCritico
  const ruta = '/productos/' + producto.codigo

  return (
    <article className="card-producto">
      <Link to={ruta}>
        <ImagenProducto src={producto.imagen} alt={'Imagen del servicio ' + producto.nombre} />
      </Link>
      <div className="p-3 d-flex flex-column" style={{ height: 'calc(100% - 180px)' }}>
        <span className="categoria">{categoria ? categoria.nombre : producto.categoria}</span>
        <h3 className="h6 mt-1 mb-2">
          <Link to={ruta} className="text-decoration-none text-dark">
            {producto.nombre}
          </Link>
        </h3>
        <p className="small text-muted flex-grow-1">{producto.descripcion.substring(0, 70)}...</p>
        <p className="precio mb-1">{formatearPrecio(producto.precio)}</p>
        <p className="mb-2">
          {producto.stock === 0 ? (
            <span className="stock-agotado">Sin stock</span>
          ) : enCritico ? (
            <span className="stock-critico">Ultimas {producto.stock} unidades</span>
          ) : (
            <span className="small text-muted">Stock disponible: {producto.stock}</span>
          )}
        </p>
        {producto.stock === 0 ? (
          <button className="btn btn-ed w-100" disabled>
            Sin stock
          </button>
        ) : (
          <button className="btn btn-ed w-100" onClick={() => agregar(producto.codigo, 1)}>
            Anadir al carrito
          </button>
        )}
      </div>
    </article>
  )
}
