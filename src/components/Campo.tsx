import type { ReactNode } from 'react'

export interface OpcionSelect {
  valor: string
  etiqueta: string
}

interface CampoProps {
  id: string
  etiqueta: string
  valor: string
  onChange: (valor: string) => void
  onBlur?: () => void
  tipo?: 'text' | 'email' | 'password' | 'date' | 'number' | 'textarea' | 'select'
  error?: string

  validado?: boolean
  obligatorio?: boolean
  ayuda?: ReactNode

  contador?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
  rows?: number
  min?: number
  step?: number | string
  opciones?: OpcionSelect[]
  textoOpcionVacia?: string
  deshabilitado?: boolean

  col?: string
}

export function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  onBlur,
  tipo = 'text',
  error = '',
  validado = false,
  obligatorio = false,
  ayuda,
  contador = false,
  maxLength,
  placeholder,
  autoComplete,
  rows,
  min,
  step,
  opciones,
  textoOpcionVacia,
  deshabilitado = false,
  col = 'mb-3',
}: CampoProps) {
  const estado = error ? ' campo-invalido' : validado ? ' campo-valido' : ''
  const comunes = {
    id,
    name: id,
    value: valor,
    disabled: deshabilitado,
    onBlur,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': 'error-' + id,
  }

  let control: ReactNode
  if (tipo === 'textarea') {
    control = (
      <textarea
        {...comunes}
        className={'form-control' + estado}
        rows={rows}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  } else if (tipo === 'select') {
    control = (
      <select
        {...comunes}
        className={'form-select' + estado}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{textoOpcionVacia}</option>
        {opciones?.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.etiqueta}
          </option>
        ))}
      </select>
    )
  } else {
    control = (
      <input
        {...comunes}
        type={tipo}
        className={'form-control' + estado}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        step={step}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  const usados = valor.length
  return (
    <div className={col}>
      <label className="form-label" htmlFor={id}>
        {etiqueta} {obligatorio && <span aria-hidden="true">*</span>}
      </label>
      {control}
      {ayuda && <span className="mensaje-ayuda">{ayuda}</span>}
      {contador && maxLength !== undefined && (
        <span className="contador-caracteres" style={usados > maxLength ? { color: '#dc2626' } : undefined}>
          {usados} / {maxLength} caracteres
        </span>
      )}
      <span className="mensaje-error" id={'error-' + id}>
        {error}
      </span>
    </div>
  )
}
