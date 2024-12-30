import express from 'express';
import { createTodo, deleteTodo, getAllTodo, updateTodo } from '../controllers/todo.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
console.log(isAuthenticated); 
const router = express.Router();

router.route("/createTodo").post(isAuthenticated,createTodo);
router.route("/getallTodo").get(getAllTodo);
router.route("/:todoId").put(isAuthenticated,updateTodo);
router.route("/delete/:id").delete(isAuthenticated,deleteTodo);

export default router;