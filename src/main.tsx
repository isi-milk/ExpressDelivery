import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/estilos.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { AvisosProvider } from './context/AvisosProvider.tsx'
import { CarritoProvider } from './context/CarritoProvider.tsx'
import { ProductosProvider } from './context/ProductosProvider.tsx'
import { UsuariosProvider } from './context/UsuariosProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>,
)
