export interface Coche{
    modelo: String
    matricula: String
    precio: number
    disponible: Boolean
    _id: String
    reservadoDesde?: Date
    reservadoHasta?: Date
}