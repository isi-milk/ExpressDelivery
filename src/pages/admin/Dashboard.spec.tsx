import { Dashboard } from './Dashboard'
import { renderConApp, screen, SESION_ADMIN, SESION_VENDEDOR } from '../../test/utils'

describe('Dashboard (admin)', () => {
  beforeEach(() => localStorage.clear())

  it('muestra los 4 KPIs con datos reales (productos, usuarios, critico, flota)', () => {
    renderConApp(<Dashboard />, { sesion: SESION_ADMIN })
    const kpis = Array.from(document.querySelectorAll('.tarjeta-kpi')).map((k) => k.textContent)
    expect(kpis).toEqual([
      '12Productos publicados',
      '5Usuarios registrados',
      '2Productos en stock critico',
      '4 / 5Vehiculos disponibles',
    ])
  })

  it('alerta cuales productos estan en stock critico', () => {
    renderConApp(<Dashboard />, { sesion: SESION_ADMIN })
    expect(screen.getByText(/alcanzaron el nivel de stock critico/).textContent).toContain('Rollo film burbuja')
  })

  it('lista la flota con su estado', () => {
    renderConApp(<Dashboard />, { sesion: SESION_ADMIN })
    expect(document.querySelectorAll('tbody tr').length).toBe(5)
    expect(screen.getByText('En taller').className).toContain('retrasado')
  })

  it('el vendedor no ve el acceso a usuarios', () => {
    renderConApp(<Dashboard />, { sesion: SESION_VENDEDOR })
    expect(screen.getByText('Hola, vendedor')).toBeTruthy()
    expect(screen.queryByText('Usuarios del sistema')).toBeNull()
  })

  it('el administrador si ve el acceso a usuarios', () => {
    renderConApp(<Dashboard />, { sesion: SESION_ADMIN })
    expect(screen.getByText('Usuarios del sistema')).toBeTruthy()
  })
})
