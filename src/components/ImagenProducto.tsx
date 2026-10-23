import type { ImgHTMLAttributes } from 'react'

const IMAGEN_GENERICA = '/assets/img/generico.png'

export function ImagenProducto({ src, alt, ...resto }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget
        if (!img.src.endsWith(IMAGEN_GENERICA)) img.src = IMAGEN_GENERICA
      }}
      {...resto}
    />
  )
}
