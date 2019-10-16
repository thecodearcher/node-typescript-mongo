import { globalMiddlewares, errorHandler } from "./middleware";
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./api/User";
import { BASE_PATH, MONGODB_URI } from "./config";
import { logger } from "./utils/logger";

class App {
    public express = express();
    public basePath = BASE_PATH || "";
    constructor() {
        this.boot();
    }

    private boot() {
        this.initializeDb();
        this.registerMiddlewares();
        this.mountRoutes();
        this.handleUncaughtErrorEvents();

    }

    private mountRoutes() {
        this.express.use(`${this.basePath}/users`, userRouter);
    }

    private registerMiddlewares() {
        globalMiddlewares(this.express);
    }

    private initializeDb() {
        // stop ensureIndex deprecation warning
        mongoose.set("useCreateIndex", true);

        // Connect to our Database and handle any bad connections
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            logger.info("Database connection established");
        }).catch((err) => {
            logger.error(`Error connecting to the database: ${err.message}`);
        });
    }

    // Error handlers
    private handleUncaughtErrorEvents() {
        process.on("unhandledRejection", (reason, promise) => {
            throw reason;
        });

        process.on("uncaughtException", (error) => {
            logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
            process.exit(1);
        });

        process.on("SIGINT", () => {
            logger.info(" Alright! Bye bye!");
            process.exit();
        });

        this.express.use(errorHandler);

    }
}

const app = new App().express;
export default app;
