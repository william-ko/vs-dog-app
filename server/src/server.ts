import cors from 'cors';
import { Server as NodeServer } from 'http';
import express, { Application } from 'express';
import dogImageRouter from './routers/DogsRouter';

/**
 * Class Server
 */
export class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routingConfig();
    }

     /**
     * Appends middleware to server instance
     * @returns {void}
     */
    private middleware(): void {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    }

    /**
     * Appends routes to server instance
     * @returns {void}
     */
    private routingConfig(): void {
        this.app.use(dogImageRouter);
    }

    /**
     * Starts the server
     * @returns {Promise<NodeServer>}
     */
    public start = async (port: number | string): Promise<NodeServer> => this.app.listen(port);
}
