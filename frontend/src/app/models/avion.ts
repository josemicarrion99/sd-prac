export interface Avion{
    salida: string
    destino: string
    precio: number

    disponible: Boolean
    _id: String
    reservadoDesde?: Date
    reservadoHasta?: Date
}