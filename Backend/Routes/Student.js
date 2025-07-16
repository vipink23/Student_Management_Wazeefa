import express from 'express';
import StudentController from '../Controller/Student.js'
import verifyToken from '../Middleware/AuthMiddleware.js';
import AutherisedRoles from '../Middleware/RoleMiddleware.js';
import CheckPermission from '../Middleware/RoleMiddleware.js';


const routes = express.Router();

routes.post("/AddStudent",verifyToken,AutherisedRoles("Super Admin"), StudentController.AddStudent);
routes.get("/GetAllStudent",verifyToken,AutherisedRoles("Super Admin"), StudentController.GetAllStudents);
routes.get("/GetStudentById/:id",verifyToken,CheckPermission("update"), StudentController.GetStudentById);
routes.put("/UpdateStudent/:id",verifyToken, StudentController.UpdateStudent);
routes.delete("/DeleteStudent/:id",verifyToken, CheckPermission("delete"), StudentController.DeleteStudent);




// routes.post("/Login", AuthController.Login);

export default routes