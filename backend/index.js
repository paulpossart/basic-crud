import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import todosRouter from './routers/todosRouter.js'

const PORT = process.env.PORT;
const app = express();
const allowedOrigin = process.env.ALLOWED_URL;

app.use(cors({ origin: allowedOrigin, credentials: true}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//======================================
app.get('/', (req, res) => {
    res.json({info: 'backend running'});
});
//======================================

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todosRouter)

app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).json({
        name: err.name || 'Error',
        message: err.message || 'An unexpected error occured',
        stack: process.env.NODE_ENV === 'development' ? err.stack : 'No details availiable'
    });
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
