export interface Resultado {
  tipo: 'exito' | 'error'
  mensaje: string
}

export function ResultadoForm({ resultado }: { resultado: Resultado | null }) {
  return (
    <div id="resultado-form" role="status" aria-live="polite">
      {resultado?.tipo === 'exito' && (
        <div className="alert alert-success mt-3">
          <strong>Listo.</strong> {resultado.mensaje}
        </div>
      )}
      {resultado?.tipo === 'error' && (
        <div className="alert alert-danger mt-3">
          <strong>Revisa el formulario.</strong> {resultado.mensaje}
        </div>
      )}
    </div>
  )
}
