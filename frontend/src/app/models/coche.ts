export interface Coche{
    modelo: string
    matricula: string
    precio: number
    disponible: Boolean
    _id: string
    reservadoDesde?: Date
    reservadoHasta?: Date
}