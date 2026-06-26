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

const { PORT = 4000, MONGODB_URI } = process.env;

// 1. Conectamos a MongoDB de forma global
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB'))
    .catch(err => {
        console.error(`Error de conexión a MongoDB: ${err.message}`);
    });
    // 2. Condición para entorno local (Vercel no usa app.listen)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Api corriendo localmente en el puerto ${PORT}`));
}

// 3. Exportación requerida por Vercel para manejar las peticiones
export default app;