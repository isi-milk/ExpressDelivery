import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ZonaSesion } from './ZonaSesion'

export function TiendaLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <ZonaSesion />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
