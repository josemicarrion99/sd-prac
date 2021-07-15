export interface Avion{
    salida: string
    destino: string
    precio: number
    soloIda: boolean

    disponible: Boolean
    _id: string
    reservadoDesde?: Date
    reservadoHasta?: Date
}