export interface Hotel{
    direccion: string
    personasHabitacion: string
    precio: number

    disponible: boolean
    correoComprador: string
    _id: string
    reservadoDesde?: Date
    reservadoHasta?: Date
}