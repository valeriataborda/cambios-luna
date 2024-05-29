import { connection } from "../config/database/mysql";
import { Request, Response, Router } from "express";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const [ db ] = await connection.query("SELECT * FROM ROLES");
  res.status(200).json({ data: db })
});



export default route;
