
import { Router } from 'express'
import { printCurrentDate } from '../middlewares/date.middlewares.js';
import {getAllUser,login,register,update} from '../controllers/user.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js';
const router = Router();

router.get('/',printCurrentDate, auth, isAdmin, getAllUser)

router.post('/login',login)

router.post('/register',register)

router.put('/',update)

export default router;
