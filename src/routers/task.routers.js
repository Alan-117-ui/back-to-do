import { Router } from "express";
import { auth } from "../middleware/auth.js";
// Importamos las funciones que arreglamos en tu controlador
import { create, list, update, remove,bulksync } from "../controllers/task.controller.js"; 

const router = Router();

// Aplica el middleware de autenticación a todas las rutas de abajo
router.use(auth);

// Cambiamos los mensajes de prueba por las funciones reales de tu controlador
router.get("/", list);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.post('/bulksync', bulksync);
export default router;