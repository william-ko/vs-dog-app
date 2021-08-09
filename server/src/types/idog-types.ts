export interface IDog {
    id?: number,
    breed: string,
    image: {
        type: string,
        data: ArrayBuffer
    },
    description: string
}

export interface IDogPayload {
    id?: string | number,
    dog?: IDog
}