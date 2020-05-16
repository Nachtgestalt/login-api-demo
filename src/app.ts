import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {Connection, createConnection} from "typeorm";
import {SERVER_PORT} from "./environments/environment";
import UserController from "./controller/UserController";
import helmet from "helmet";

const controllers = [
    new UserController(),
];

export default class App {
    private static _instance: App;
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public app: express.Application;
    public port: number;
    public connection: Connection | undefined;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.initializeModels();
        this.initializeMiddlewares();
        this.initializeControllers();
    }

    private async initializeModels() {
        const connection = await createConnection();
        if (connection === undefined) {
            throw new Error('Error connecting to database');
        }
        await connection.synchronize();
        this.connection = connection;
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet())
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
    }

    private initializeControllers() {
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        });
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}