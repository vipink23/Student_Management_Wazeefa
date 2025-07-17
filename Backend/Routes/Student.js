import express from 'express';
import StudentController from '../Controller/Student.js'
import verifyToken from '../Middleware/AuthMiddleware.js';
import CheckPermission from '../Middleware/RoleMiddleware.js';


const routes = express.Router();

routes.post("/AddStudent",StudentController.AddStudent);
routes.get("/GetAllStudent", StudentController.GetAllStudentsbyStaffID);
routes.post("/GetStudentById",CheckPermission("Update"), StudentController.GetStudentById);
routes.put("/UpdateStudent/:id", StudentController.UpdateStudent);
routes.post("/DeleteStudent",CheckPermission("Delete"), StudentController.DeleteStudent);




// routes.post("/Login", AuthController.Login);

export default routes