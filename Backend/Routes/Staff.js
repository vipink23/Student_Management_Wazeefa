import express from 'express';
import StaffController from '../Controller/Staff.js'
import verifyToken from '../Middleware/AuthMiddleware.js';


const routes = express.Router();

routes.post("/AddStaff", StaffController.AddStaff);
routes.get("/GetAllStaff",verifyToken, StaffController.GetAllStaff);
// routes.post("/StaffLogin", StaffController.StaffLogin);
routes.get("/StaffById/:id", StaffController.GetStaffbyId);

routes.put("/UpdateStaff/:id", StaffController.UpdateStaff);
routes.delete("/DeleteStaff/:id", StaffController.DeleteStaff);





export default routes