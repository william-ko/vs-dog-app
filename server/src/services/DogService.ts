import { PoolClient } from 'pg';
import pool from '../db/connect'
import { HttpMethod } from '../types/http-method';
import { IDog, IDogPayload } from '../types/idog-types';

/**
 * Class DogService
 */
export class DogService {

    /**
     * Uses the HTTPMethod to determine which SQL qeury to execute
     * @param {HttpMethod} HTTPMethod get, put, post, delete
     * @param {IDogPayload} payload Dog to execute query on
     * @returns {Promise<IDog[]>}
     */
    public async  executeQuery(HTTPMethod: HttpMethod, payload: IDogPayload): Promise<IDog[]> {
        let dogs: IDog[] = [];
        const { id = null, dog = {} as IDog } = payload;

        const client: PoolClient = await pool.connect();

        try {
            switch(HTTPMethod) {
                case HttpMethod.GET:
                    dogs = id ? await this._getDogById(id, client) : await this._getAllDogs(client);
                break;
                case HttpMethod.POST:
                    dogs = await this._insertDog(dog, client);
                break;
                case HttpMethod.PUT:
                    dogs = await this._updateDog(dog, client);
                break;
                case HttpMethod.DELETE:
                    dogs = id ? await this._deleteDog(id, client) : [];
                break;
            }
    
            client.release();
    
            return dogs
        } catch (error: any) {
            client.release();
            throw new Error(error.message);
        }
    }

    /**
     * Fetch all dogs in DB
     * @param {PoolClient} client Connection to DB pool
     * @returns {Promise<IDog[]>}
     */
    private async _getAllDogs(client: PoolClient): Promise<IDog[]> {
        try {
            const sql: string = "SELECT breed, image, id, description FROM dogs";
            const result = await client.query(sql);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Insert a dog in DB
     * @param {IDog} dog Dog to be inserted
     * @param {PoolClient} client Connection to DB pool
     * @returns {Promise<IDog[]>}
     */
    private async _insertDog(dog: IDog, client: PoolClient): Promise<IDog[]> {
        try {
            const query = {
                text: 'INSERT INTO dogs(breed, image, description, created_on) VALUES($1,  decode($2, \'base64\'), $3,  NOW()) RETURNING *;',
                values: [dog.breed, dog.image.data, dog.description],
            };

            const result = await client.query(query);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        } 
    }

    /**
     * Fetch a dog by its ID
     * @param {string | number} id Id of dog by which to fetch
     * @param {PoolClient} client Connection to DB pool
     * @returns {Promise<IDog[]>}
     */
    private async _getDogById(id: string | number, client: PoolClient): Promise<IDog[]> {
        try {
            const sql: string = `SELECT breed, image, id, description FROM dogs WHERE id=${id}`;
            const result = await client.query(sql);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update a dog in DB
     * @param {IDog} dog Dog to be updated
     * @param {PoolClient} client Connection to DB pool
     * @returns {Promise<IDog[]>}
     */
    private async _updateDog(dog: IDog, client: PoolClient): Promise<IDog[]> {
        try {
            const query = {
                text: `UPDATE dogs SET description=$1 WHERE id=$2 RETURNING *;`,
                values: [dog.description, dog.id],
              }
            
            const result = await client.query(query);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Fetch a dog by its ID
     * @param {string | number} id Id of dog by which to delete
     * @param {PoolClient} client Connection to DB pool
     * @returns {Promise<IDog[]>}
     */
    private async _deleteDog(id: string | number, client: PoolClient): Promise<IDog[]> {
        try {
            const sql: string = `DELETE FROM dogs WHERE id=${id} RETURNING *`;
            const result = await client.query(sql);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
