//import users from '../users.js'
import { Router } from 'express'
import { printCurrentDate } from '../middlewares/middlewaresDate.js';
import {getAllUser,sign_in,sign_up} from '../controllers/user.controller.js'
const router = Router();

//show all users
router.get('/',printCurrentDate,getAllUser)

//sign in
router.post('/',sign_in)

//sign up
router.post('/sign-up',sign_up)

export default router;
