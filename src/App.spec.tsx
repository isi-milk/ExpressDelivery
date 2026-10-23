import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { AvisosProvider } from './context/AvisosProvider'
import { CarritoProvider } from './context/CarritoProvider'
import { ProductosProvider } from './context/ProductosProvider'
import { UsuariosProvider } from './context/UsuariosProvider'
import { screen, SESION_ADMIN, SESION_CLIENTE, SESION_VENDEDOR } from './test/utils'
import type { Sesion } from './types'

function irA(ruta: string, sesion?: Sesion) {
  localStorage.clear()
  if (sesion) localStorage.setItem('ed_sesion', JSON.stringify(sesion))
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AvisosProvider>
        <ProductosProvider>
          <UsuariosProvider>
            <AuthProvider>
              <CarritoProvider>
                <App />
              </CarritoProvider>
            </AuthProvider>
          </UsuariosProvider>
        </ProductosProvider>
      </AvisosProvider>
    </MemoryRouter>,
  )
}

describe('App (rutas)', () => {
  it('"/" muestra la portada de la tienda', () => {
    irA('/')
    expect(screen.getByRole('heading', { level: 1, name: /sin perder el rastro/ })).toBeTruthy()
  })

  it('"/productos/:codigo" muestra el detalle', () => {
    irA('/productos/SE003')
    expect(screen.getByRole('heading', { level: 1, name: 'Envio urgente' })).toBeTruthy()
  })

  it('una ruta desconocida muestra la pagina 404', () => {
    irA('/no-existe')
    expect(screen.getByText('No encontramos esa pagina')).toBeTruthy()
  })

  it('"/admin" sin sesion lleva al login con un aviso', () => {
    irA('/admin')
    expect(screen.getByText('Inicio de sesion')).toBeTruthy()
    expect(screen.getByText(/Debes iniciar sesion/)).toBeTruthy()
  })

  it('"/admin" con administrador muestra el dashboard', () => {
    irA('/admin', SESION_ADMIN)
    expect(screen.getByText('Hola, administrador')).toBeTruthy()
  })

  it('un cliente no puede entrar a /admin', () => {
    irA('/admin', SESION_CLIENTE)
    expect(screen.getByText(/no tiene permisos/)).toBeTruthy()
  })

  it('un vendedor no puede entrar a /admin/usuarios', () => {
    irA('/admin/usuarios', SESION_VENDEDOR)
    expect(screen.getByText(/no tiene permisos/)).toBeTruthy()
  })

  it('el administrador entra a /admin/usuarios', () => {
    irA('/admin/usuarios', SESION_ADMIN)
    expect(screen.getByText('5 usuarios')).toBeTruthy()
  })
})
