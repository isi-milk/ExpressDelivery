import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/AdminLayout'
import { RutaProtegida } from './components/RutaProtegida'
import { TiendaLayout } from './components/TiendaLayout'
import { Blogs } from './pages/Blogs'
import { BlogDetalle } from './pages/BlogDetalle'
import { Carrito } from './pages/Carrito'
import { Contacto } from './pages/Contacto'
import { DetalleProducto } from './pages/DetalleProducto'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NoEncontrado } from './pages/NoEncontrado'
import { Nosotros } from './pages/Nosotros'
import { Productos } from './pages/Productos'
import { Registro } from './pages/Registro'
import { Dashboard } from './pages/admin/Dashboard'
import { ProductoEditar, ProductoNuevo } from './pages/admin/ProductoForm'
import { ProductosAdmin } from './pages/admin/ProductosAdmin'
import { UsuarioEditar, UsuarioNuevo } from './pages/admin/UsuarioForm'
import { UsuariosAdmin } from './pages/admin/UsuariosAdmin'

function App() {
  return (
    <Routes>
      <Route element={<TiendaLayout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:codigo" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<BlogDetalle />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      <Route
        path="admin"
        element={
          <RutaProtegida roles={['Administrador', 'Vendedor']}>
            <AdminLayout />
          </RutaProtegida>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="productos/:codigo" element={<ProductoEditar />} />
        <Route
          path="productos/nuevo"
          element={
            <RutaProtegida roles={['Administrador']}>
              <ProductoNuevo />
            </RutaProtegida>
          }
        />
        <Route
          path="usuarios"
          element={
            <RutaProtegida roles={['Administrador']}>
              <UsuariosAdmin />
            </RutaProtegida>
          }
        />
        <Route
          path="usuarios/nuevo"
          element={
            <RutaProtegida roles={['Administrador']}>
              <UsuarioNuevo />
            </RutaProtegida>
          }
        />
        <Route
          path="usuarios/:run"
          element={
            <RutaProtegida roles={['Administrador']}>
              <UsuarioEditar />
            </RutaProtegida>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
