export interface IDog {
    id?: number,
    breed: string,
    image: {
        type: string,
        data: any
    },
    description: string
}