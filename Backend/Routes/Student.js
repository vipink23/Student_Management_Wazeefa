import express from 'express';
import StudentController from '../Controller/Student.js'
import verifyToken from '../Middleware/AuthMiddleware.js';
import CheckPermission from '../Middleware/RoleMiddleware.js';


const routes = express.Router();

routes.post("/AddStudent",CheckPermission("Create"),StudentController.AddStudent);
routes.get("/GetAllStudent",verifyToken, StudentController.GetAllStudentsbyStaffID);
routes.post("/GetStudentById",verifyToken,CheckPermission("Update"), StudentController.GetStudentById);
routes.put("/UpdateStudent/:id", StudentController.UpdateStudent);
routes.post("/DeleteStudent",CheckPermission("Delete"), StudentController.DeleteStudent);




// routes.post("/Login", AuthController.Login);

export default routes