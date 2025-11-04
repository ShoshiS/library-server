//import users from '../users.js'
import { Router } from 'express'
import {getAllUser,sign_in,sign_up} from '../controllers/user.controller.js'
const router = Router();

//show all users
router.get('/',getAllUser)

//sign in
router.get('/:username/:password',sign_in)

//sign up
router.post('/sign-up',sign_up)

export default router;
