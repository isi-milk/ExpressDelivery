import { useState } from 'react'
import { TarjetaProducto } from '../components/TarjetaProducto'
import { CATEGORIAS } from '../data/datos'
import { useProductos } from '../hooks/useContextos'

export function Productos() {
  const { productos } = useProductos()
  const [filtro, setFiltro] = useState<string>('TODAS')

  const visibles = filtro === 'TODAS' ? productos : productos.filter((p) => p.categoria === filtro)
  const filtros = [{ codigo: 'TODAS', nombre: 'Todas' }, ...CATEGORIAS]

  return (
    <section aria-labelledby="titulo-catalogo">
      <title>Productos | ExpressDelivery</title>
      <h1 id="titulo-catalogo" className="titulo-seccion h3">Productos</h1>
      <p className="text-muted">
        Elige el servicio que necesitas y agregalo al carrito. Haz clic sobre el nombre o la
        imagen de cualquier producto para ver su detalle completo.
      </p>

      <div id="filtros-categoria" className="mb-4">
        {filtros.map((cat) => (
          <button
            key={cat.codigo}
            className={'btn btn-sm me-2 mb-2 ' + (filtro === cat.codigo ? 'btn-ed' : 'btn-ed-outline')}
            onClick={() => setFiltro(cat.codigo)}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      <div className="row">
        {visibles.length === 0 ? (
          <p className="text-center py-4">No hay productos en esta categoria.</p>
        ) : (
          visibles.map((producto) => (
            <div className="col-12 col-sm-6 col-lg-3 mb-4" key={producto.codigo}>
              <TarjetaProducto producto={producto} />
            </div>
          ))
        )}
      </div>
    </section>
  )
}
