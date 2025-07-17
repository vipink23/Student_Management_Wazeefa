import express from 'express';
import AuthController from '../Controller/Auth.js'
// import verifyToken from '../MiddleWare/AuthMiddleware.js';
// import AutherisedRoles from '../MiddleWare/RoleMiddleWare.js';

const routes = express.Router();

routes.post("/Register", AuthController.Register);
routes.post("/Login", AuthController.UnifiedLogin);
export default routes