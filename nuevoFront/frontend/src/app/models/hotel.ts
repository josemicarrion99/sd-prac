export interface Hotel{
    direccion: string
    personasHabitacion: string
    precio: number

    disponible: boolean
    _id: string
    reservadoDesde?: Date
    reservadoHasta?: Date
}