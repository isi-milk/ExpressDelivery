import { Home } from './Home'
import { renderConApp, screen } from '../test/utils'

describe('Home', () => {
  beforeEach(() => localStorage.clear())

  it('muestra el hero, las cifras y solo 8 productos destacados', () => {
    renderConApp(<Home />)
    expect(screen.getByRole('heading', { level: 1, name: /sin perder el rastro/ })).toBeTruthy()
    expect(screen.getByText('150')).toBeTruthy()
    expect(document.querySelectorAll('.card-producto').length).toBe(8)
  })

  it('explica los 5 estados de un envio', () => {
    renderConApp(<Home />)
    expect(document.querySelectorAll('.badge-estado').length).toBe(5)
  })
})
