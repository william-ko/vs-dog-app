import { IDog } from "../types/Dog";

const encodeImage = (dog: IDog) => {
    dog.image.data = Buffer.from(dog.image.data).toString('base64');
    return dog;
}

export const getAllDogs = async (): Promise<IDog[]> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DOG_API_URL}/api/dogs`);

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const dogs: IDog[] = await response.json();

        if (!dogs || !dogs.length) {
            return [];
        }

        return dogs.map((dog: IDog) => {
            return encodeImage(dog);
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getDogById = async (id: string): Promise<IDog[]> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DOG_API_URL}/api/dog/${id}`)

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const dogs: IDog[] = await response.json();

        if (!dogs || !dogs.length) {
            return [];
        }

        return dogs.map((dog: IDog) => {
            return encodeImage(dog);
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createDog = async (dog: IDog): Promise<IDog[]> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DOG_API_URL}/api/dog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(encodeImage(dog))
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const dogs: IDog[] = await response.json();

        if (!dogs || !dogs.length) {
            return [];
        }

        return dogs;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateDog = async (dog: IDog): Promise<IDog[]> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DOG_API_URL}/api/dog/${dog.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(encodeImage(dog))
        });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        const dogs: IDog[] = await response.json();

        if (!dogs || !dogs.length) {
            return [];
        }

        return dogs;
    } catch (error: any) {
        throw new Error(error.message);
    }
}


export const deleteDog = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DOG_API_URL}/api/dog/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            throw Error(response.statusText);
        }

        return true;
    } catch (error: any) {
        throw new Error(error.message);
    }
}