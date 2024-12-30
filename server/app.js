import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './db/database.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOptions));


// app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);
// http://localhost:8000/api/v1/user;
// http://localhost:8000/api/v1/todo;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER listen at port ${PORT}`)
});
