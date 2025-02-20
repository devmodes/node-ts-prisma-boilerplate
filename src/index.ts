import express, { Express } from "express";
import router from "./routes";
import { errorMiddleware } from "@middlewares/errors.middleware";
import config from "@utils/config";

const app: Express = express();

const PORT = config("app.port");

app.use(express.json());
app.use(router);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
