import express from 'express';
import PermissionController from '../Controller/Permission.js'


const routes = express.Router();

routes.post("/AddPermission", PermissionController.AddPermission);
routes.get("/GetAllPermission", PermissionController.GetAllPermission);


export default routes