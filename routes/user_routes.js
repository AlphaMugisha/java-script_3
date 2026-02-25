import express from "express";
import { getAllUsers, getUser, updateUser, createUser } from "../controllers/user_controllers";

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);

export default router;