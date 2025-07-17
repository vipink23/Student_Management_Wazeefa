import express from 'express';
import StudentController from '../Controller/Student.js'
import verifyToken from '../Middleware/AuthMiddleware.js';
import AutherisedRoles from '../Middleware/RoleMiddleware.js';
import CheckPermission from '../Middleware/RoleMiddleware.js';


const routes = express.Router();

routes.post("/AddStudent",StudentController.AddStudent);
routes.get("/GetAllStudent", StudentController.GetAllStudents);
routes.get("/GetStudentById/:id", StudentController.GetStudentById);
routes.put("/UpdateStudent/:id", StudentController.UpdateStudent);
routes.delete("/DeleteStudent/:id", StudentController.DeleteStudent);




// routes.post("/Login", AuthController.Login);

export default routes