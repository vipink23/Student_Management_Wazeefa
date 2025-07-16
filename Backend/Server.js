import express from 'express'
import bodyParser from 'body-parser';
import connection from './DB_Config/dbConnection.js';
import cors from 'cors'
const app = express();
import dotenv from 'dotenv';

import AuthRoutes from './Routes/Auth.js'
import StudentRoutes from './Routes/Student.js'
import RoleRoutes from './Routes/Role.js'
import PermissionRoutes from './Routes/Permission.js'
import StaffRoutes from './Routes/Staff.js'







app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
dotenv.config()
connection()

const port = process.env.PORT || 3001;
app.use("/",AuthRoutes)
app.use("/",StudentRoutes)
app.use("/",RoleRoutes)
app.use("/",PermissionRoutes)
app.use("/",StaffRoutes)





app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});