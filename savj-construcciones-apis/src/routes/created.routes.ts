import { Router } from "express";
import CreatedController from "../controllers/created.controller";

const route = Router();

route.get( "/constructoras", CreatedController.getConstructoras );
route.post( "/constructora", CreatedController.createConstructora );

route.get( "/proyectos", CreatedController.getProyectos );
route.post( "/proyecto", CreatedController.createProyecto );


route.post( "/tracking", CreatedController.createTracking );

route.get( "/users", CreatedController.getUsers );

route.get( "/apartamento", CreatedController.createApartament );

route.get( "/venta", CreatedController.createVenta );
route.get( "/rol", CreatedController.createRol );
route.get( "/cartera", CreatedController.createCartera );
route.get( "/cuota", CreatedController.createCuota );

export default route;
