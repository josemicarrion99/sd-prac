export interface Coche{
    modelo: String
    matricula: String
    precio: Number
    disponible: Boolean
    _id: String
    reservadoDesde?: Date
    reservadoHasta?: Date
}