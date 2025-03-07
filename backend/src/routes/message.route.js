import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUserForSideBar } from '../controllers/message.controller.js';
import {getMessage} from '../controllers/message.controller.js';
import {sendMessage} from '../controllers/message.controller.js';

const router=express.Router();

router.get('/users',protectRoute,getUserForSideBar);

router.get('/:id',protectRoute,getMessage);

router.post('/send/:id',protectRoute,sendMessage);

export default router;