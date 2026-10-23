export type BloqueBlog =
  | { tipo: 'p'; texto: string }
  | { tipo: 'h'; texto: string }
  | { tipo: 'ul'; items: string[] }
  | { tipo: 'ol'; items: { fuerte: string; texto: string }[] }

export interface Blog {
  id: number
  etiqueta: string
  titulo: string
  resumen: string
  imagen: string
  altImagen: string

  detalle: number
}

export interface Articulo {
  id: number
  etiqueta: string
  titulo: string
  autor: string
  imagen: string
  altImagen: string
  contenido: BloqueBlog[]
}

export const BLOGS: Blog[] = [
  {
    id: 1,
    etiqueta: 'Caso curioso #1',
    titulo: 'Rutas mas inteligentes, repartidores menos cansados',
    resumen:
      'El 20 por ciento de nuestras rutas presentaba ineficiencias antes de digitalizar la asignacion. Te contamos que descubrimos al medir kilometro por kilometro lo que ocurre en la calle.',
    imagen: '/assets/img/blog-1.png',
    altImagen: 'Ilustracion sobre optimizacion de rutas',
    detalle: 1,
  },
  {
    id: 2,
    etiqueta: 'Caso curioso #2',
    titulo: '50 llamadas diarias que dejaron de existir',
    resumen:
      'Nuestro call center recibia 50 llamadas al dia con la misma pregunta: donde esta mi paquete. Asi cambio la operacion cuando el cliente pudo responderla solo.',
    imagen: '/assets/img/blog-2.png',
    altImagen: 'Ilustracion sobre seguimiento en tiempo real',
    detalle: 2,
  },
  {
    id: 3,
    etiqueta: 'Dato util',
    titulo: 'Como embalar para que tu paquete llegue entero',
    resumen:
      'Tres reglas simples de embalaje que reducen los reclamos por dano: elegir bien la caja, rellenar los espacios vacios y sellar en forma de H.',
    imagen: '/assets/img/blog-3.png',
    altImagen: 'Ilustracion sobre embalaje de paquetes',
    detalle: 1,
  },
]

export const ARTICULOS: Articulo[] = [
  {
    id: 1,
    etiqueta: 'Caso curioso #1',
    titulo: 'Rutas mas inteligentes, repartidores menos cansados',
    autor: 'el equipo de operaciones',
    imagen: '/assets/img/blog-1.png',
    altImagen: 'Ilustracion sobre optimizacion de rutas',
    contenido: [
      { tipo: 'p', texto: 'Durante anos la asignacion de rutas en ExpressDelivery funciono de la misma manera: el cliente llamaba, el supervisor anotaba la direccion en una planilla Excel y luego imprimia una hoja con el orden de las entregas. Ese papel viajaba en el bolsillo del repartidor durante toda la jornada.' },
      { tipo: 'h', texto: 'Lo que encontramos al medir' },
      { tipo: 'p', texto: 'Cuando registramos por primera vez los recorridos reales, aparecio un patron claro: uno de cada cinco recorridos incluia al menos un tramo que se podia evitar. En muchos casos el repartidor cruzaba la ciudad para volver despues a una comuna donde ya habia estado.' },
      { tipo: 'ul', items: [
        'El 20 por ciento de las rutas mostraba ineficiencias evidentes.',
        'Los repartidores perdian cerca del 15 por ciento de la jornada en traslados innecesarios.',
        'El orden de las entregas dependia del criterio de quien armaba la hoja ese dia.',
      ] },
      { tipo: 'h', texto: 'Que cambiamos' },
      { tipo: 'p', texto: 'La primera decision no fue tecnologica sino de proceso: agrupar las entregas por comuna antes de asignarlas. Recien despues llego el sistema, que hoy entrega la ruta directamente al telefono del repartidor y permite reordenarla cuando entra un envio urgente.' },
      { tipo: 'p', texto: 'El efecto secundario fue el mas interesante. Menos vueltas innecesarias significa jornadas mas cortas y menos desgaste, y eso ataca directamente el 25 por ciento de rotacion anual que teniamos en el equipo de reparto.' },
      { tipo: 'h', texto: 'Lo que viene' },
      { tipo: 'p', texto: 'El proximo paso es cruzar el historial de entregas con el tipo de vehiculo: una moto de 40 kilos y una furgoneta de 1.000 kilos no deberian recibir la misma clase de ruta.' },
    ],
  },
  {
    id: 2,
    etiqueta: 'Caso curioso #2',
    titulo: '50 llamadas diarias que dejaron de existir',
    autor: 'el equipo de atencion al cliente',
    imagen: '/assets/img/blog-2.png',
    altImagen: 'Ilustracion sobre seguimiento de envios',
    contenido: [
      { tipo: 'p', texto: 'Cincuenta. Ese era el numero promedio de llamadas que recibia el call center cada dia, y casi todas hacian la misma pregunta: donde esta mi paquete. La respuesta obligaba a llamar al supervisor de ruta, que a su vez llamaba al repartidor, que contestaba manejando o entre una entrega y otra.' },
      { tipo: 'h', texto: 'El costo escondido' },
      { tipo: 'p', texto: 'Cada consulta ocupaba a tres personas y podia tardar varios minutos. El problema no era solo el tiempo: la informacion llegaba desactualizada, porque el estado real del envio vivia en la memoria del repartidor y no en ningun sistema.' },
      { tipo: 'h', texto: 'Cinco estados y una pantalla' },
      { tipo: 'p', texto: 'La solucion fue definir un flujo simple y visible para el cliente, con cinco estados posibles:' },
      { tipo: 'ol', items: [
        { fuerte: 'Solicitado:', texto: 'recibimos la solicitud de envio.' },
        { fuerte: 'En ruta:', texto: 'el paquete va camino a su destino.' },
        { fuerte: 'Entregado:', texto: 'con comprobante digital firmado.' },
        { fuerte: 'Retrasado:', texto: 'con el motivo y un nuevo tiempo estimado.' },
        { fuerte: 'Cancelado:', texto: 'con la opcion de solicitar un nuevo envio.' },
      ] },
      { tipo: 'p', texto: 'El repartidor marca el cambio de estado desde su telefono y el cliente lo ve al instante. Sin llamadas intermedias.' },
      { tipo: 'h', texto: 'Lo que aprendimos' },
      { tipo: 'p', texto: 'Un cliente no llama porque tenga tiempo libre, llama porque no tiene informacion. Cuando la informacion esta disponible, la llamada deja de ser necesaria y el call center puede dedicarse a lo que si requiere una persona: los casos con retraso o con incidencias.' },
    ],
  },
]
