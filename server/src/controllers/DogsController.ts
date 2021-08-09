import { IDog } from '../types/idog-types';
import { Request, Response } from 'express';
import { HttpMethod } from '../types/http-method';
import { DogService } from '../services/DogService';

/**
 * Class DogController
 */
export class DogsController {
    dogService: DogService;

    constructor() {
        this.dogService = new DogService();
    }

    /**
     * Get all dogs and send them back to client
     * @param {Request} req Express request object
     * @param {Response} res Express respobnse object
     * @returns {Promise<void>}
     */
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const dogs: IDog[] = await this.dogService.executeQuery(HttpMethod.GET, {});

            if (dogs && !dogs.length) {
                res.statusCode = 404;
            }

            res.send(dogs);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * Get dog and send it back to client
     * @param {Request} req Express request object
     * @param {Response} res Express respobnse object
     * @returns {Promise<void>}
     */
    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const dogs: IDog[] = await this.dogService.executeQuery(HttpMethod.GET, { id: req.params.id });

            if (dogs && !dogs.length) {
                res.statusCode = 404;
            }

            res.send(dogs);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * Create dog and send it back to client
     * @param {Request} req Express request object
     * @param {Response} res Express respobnse object
     * @returns {Promise<void>}
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const dog: IDog = {
                breed: req.body.breed,
                image: req.body.image,
                description: req.body.description
            }

            const dogs: IDog[] = await this.dogService.executeQuery(HttpMethod.POST, { dog });

            res.send(dogs);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * Update dog and send it back to client
     * @param {Request} req Express request object
     * @param {Response} res Express respobnse object
     * @returns {Promise<void>}
     */
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const dog: IDog = {
                id: req.body.id,
                breed: req.body.breed,
                image: req.body.image,
                description: req.body.description
            }

            const dogs: IDog[] = await this.dogService.executeQuery(HttpMethod.PUT, { dog });

            res.send(dogs);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    /**
     * Delete dog and send confirmation back to client
     * @param {Request} req Express request object
     * @param {Response} res Express respobnse object
     * @returns {Promise<void>}
     */
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const dogs: IDog[] = await this.dogService.executeQuery(HttpMethod.DELETE, { id:req.params.id });
            res.send(dogs);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
