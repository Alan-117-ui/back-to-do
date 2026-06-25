import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


import authRoutes from './routers/auth.routes.js';
import taskRoutes from './routers/task.routers.js';
import mongoose from 'mongoose';
import { error } from 'node:console';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ok: true, name: 'Todo API'}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const {PORT = 4000, MONGODB_URI} = process.env;

mongoose.connect(MONGODB_URI)
    .then(() => {

        app.listen(PORT, () => console.log(`Api corriendo correctamente en el puerto ${PORT}`));
    })

    .catch(err => {
        setError(err.response?.data?.message || `Error de Red/Servidor: ${err.message}`);

    });
