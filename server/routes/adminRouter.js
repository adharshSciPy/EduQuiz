import { Router } from 'express';
import { registerAdmin, adminlogin, adminlogout } from '../controller/admincontroller.js'

const adminRouter = Router();

adminRouter.route('/register').post(registerAdmin)
adminRouter.route('/login').post(adminlogin)
adminRouter.route('/logout').post(adminlogout)


export default adminRouter