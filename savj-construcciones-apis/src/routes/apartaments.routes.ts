import { Router } from "express";
import ApartamentsController from "../controllers/apartaments.controller";

const route = Router();

route.get( "/:id", ApartamentsController.getAllApartaments );
route.get("/count", ApartamentsController.countApartaments ); 
route.get("/:id", ApartamentsController.getApartamentsById );

route.post("/create", ApartamentsController.postApartaments );
route.post("/bulk", ApartamentsController.bulkApartaments );
route.post("/inserOrUpdateBulk", ApartamentsController.insertOrUpdateBulkApartaments );

route.put("/:id", ApartamentsController.putApartaments );
route.patch("/:id", ApartamentsController.patchApartaments );

route.delete("/:id", ApartamentsController.deleteApartaments );

export default route;
