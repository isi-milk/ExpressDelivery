import { Link } from 'react-router-dom'
import { FLOTA } from '../../data/datos'
import { useAuth, useProductos, useUsuarios } from '../../hooks/useContextos'

export function Dashboard() {
  const { productos } = useProductos()
  const { usuarios } = useUsuarios()
  const { sesion } = useAuth()
  const esAdmin = sesion?.tipoUsuario === 'Administrador'

  const enCritico = productos.filter((p) => p.stockCritico > 0 && p.stock <= p.stockCritico)
  const disponibles = FLOTA.filter((v) => v.estado === 'Disponible')

  const kpis = [
    { valor: productos.length, etiqueta: 'Productos publicados' },
    { valor: usuarios.length, etiqueta: 'Usuarios registrados' },
    { valor: enCritico.length, etiqueta: 'Productos en stock critico' },
    { valor: disponibles.length + ' / ' + FLOTA.length, etiqueta: 'Vehiculos disponibles' },
  ]

  return (
    <>
      <title>Dashboard | Administrador ExpressDelivery</title>

      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Hola, {esAdmin ? 'administrador' : 'vendedor'}</h1>
        <span className="badge-estado entregado">Sistema operativo</span>
      </header>

      <div role="status" aria-live="polite">
        {enCritico.length > 0 && (
          <div className="alert alert-warning">
            <strong>Atencion:</strong> {enCritico.length} producto(s) alcanzaron el nivel de stock critico:{' '}
            {enCritico.map((p) => p.nombre).join(', ')}.
          </div>
        )}
      </div>

      <section aria-labelledby="titulo-kpi" className="mb-4">
        <h2 id="titulo-kpi" className="h5 titulo-seccion">Resumen general</h2>
        <div className="row">
          {kpis.map((kpi) => (
            <div className="col-6 col-lg-3 mb-3" key={kpi.etiqueta}>
              <div className="tarjeta-kpi">
                <div className="valor">{kpi.valor}</div>
                <div className="etiqueta">{kpi.etiqueta}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="titulo-flota" className="mb-4">
        <h2 id="titulo-flota" className="h5 titulo-seccion">Estado de la flota</h2>
        <div className="panel-admin">
          <div className="table-responsive">
            <table className="table tabla-admin mb-0">
              <caption className="small">Catalogo de vehiculos de ExpressDelivery.</caption>
              <thead>
                <tr>
                  <th scope="col">Patente</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Capacidad</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {FLOTA.map((v) => (
                  <tr key={v.patente}>
                    <td>{v.patente}</td>
                    <td>{v.tipo}</td>
                    <td>{v.marca}</td>
                    <td>{v.capacidad} kg</td>
                    <td>
                      <span className={'badge-estado ' + (v.estado === 'Disponible' ? 'entregado' : 'retrasado')}>
                        {v.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-accesos">
        <h2 id="titulo-accesos" className="h5 titulo-seccion">Accesos rapidos</h2>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <article className="panel-admin h-100">
              <h3 className="h6">Catalogo de productos</h3>
              <p className="small text-muted">Crear, editar y eliminar los servicios publicados en la tienda.</p>
              <Link to="/admin/productos" className="btn btn-sm btn-ed">Ir al mantenedor</Link>
            </article>
          </div>
          {esAdmin && (
            <div className="col-12 col-md-4">
              <article className="panel-admin h-100">
                <h3 className="h6">Usuarios del sistema</h3>
                <p className="small text-muted">Administrar clientes, vendedores y administradores.</p>
                <Link to="/admin/usuarios" className="btn btn-sm btn-ed">Ir al mantenedor</Link>
              </article>
            </div>
          )}
          <div className="col-12 col-md-4">
            <article className="panel-admin h-100">
              <h3 className="h6">Vista publica</h3>
              <p className="small text-muted">Revisar como se ve la tienda para los clientes.</p>
              <Link to="/" className="btn btn-sm btn-ed-outline">Abrir la tienda</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
