import express from 'express';
import RoleController from '../Controller/Role.js'


const routes = express.Router();

routes.post("/AddRole", RoleController.AddRole);
routes.get("/GetAllRole", RoleController.GetAllRoles);


export default routes