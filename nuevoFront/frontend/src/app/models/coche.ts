export interface Coche{
    modelo: string
    matricula: string
    precio: number
    disponible: boolean
    _id: string
    reservadoDesde?: Date
    reservadoHasta?: Date
    correoComprador: string
}