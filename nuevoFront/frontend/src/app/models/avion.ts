export interface Avion{
    salida: string
    destino: string
    precio: number
    soloIda: boolean

    disponible:boolean
    correoComprador: string
    _id: string
    reservadoDesde?: Date
    reservadoHasta?: Date
}