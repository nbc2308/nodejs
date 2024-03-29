import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routers/auth";
import { connectDB } from "./config/db";
import productRouter from "./routers/product";

const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//connect DB
connectDB(process.env.DB_URI);

//routers
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);

export const viteNodeApp = app;
