//import users from '../users.js'
import { Router } from 'express'
import { printCurrentDate } from '../middlewares/date.middlewares.js';
import {getAllUser,login,register} from '../controllers/user.controller.js'
const router = Router();

//show all users
router.get('/',printCurrentDate,getAllUser)

//sign in
router.post('/',login)

//sign up
router.post('/register',register)

export default router;
