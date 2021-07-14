export interface Hotel{
    direccion: string
    personasHabitacion: string
    precio: number

    disponible: boolean
    _id: String
    reservadoDesde?: Date
    reservadoHasta?: Date
}