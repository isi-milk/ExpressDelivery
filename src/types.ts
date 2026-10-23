export type CodigoCategoria = 'SERVICIO' | 'EMBALAJE' | 'SEGURO' | 'PLAN'

export interface Categoria {
  codigo: CodigoCategoria
  nombre: string
}

export interface Producto {
  codigo: string
  nombre: string
  descripcion: string
  precio: number
  stock: number
  stockCritico: number
  categoria: CodigoCategoria
  imagen: string
}

export type TipoUsuario = 'Administrador' | 'Vendedor' | 'Cliente'

export interface Usuario {
  run: string
  nombre: string
  apellidos: string
  correo: string
  fechaNacimiento: string
  tipoUsuario: TipoUsuario
  region: string
  comuna: string
  direccion: string
  password: string
}

export interface Sesion {
  run: string
  nombre: string
  apellidos: string
  correo: string
  tipoUsuario: TipoUsuario
}

export interface Region {
  nombre: string
  comunas: string[]
}

export interface Vehiculo {
  patente: string
  tipo: string
  marca: string
  capacidad: number
  estado: string
}

export interface EstadoEnvio {
  estado: string
  clase: string
  descripcion: string
}

export interface Cupon {
  codigo: string
  descuento: number
  descripcion: string
}

export interface ItemCarrito {
  codigo: string
  cantidad: number
}

export interface LineaCarrito extends Producto {
  cantidad: number
  subtotal: number
}

export type TipoAviso = 'success' | 'danger' | 'warning'
