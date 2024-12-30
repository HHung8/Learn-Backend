import { Todo } from "../models/todo.js";

export const createTodo = async(req,res) => {
    try {
        const {title, description} = req.body;
        if(!title, !description) {
            return res.status(400).json({
                success:false,
                message: "All file is required"
            })
        };
        const todo = new Todo({title, description});
        await todo.save();
        res.status(201).json({
            success:true,
            message:"Todo created successfully",
            todo,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Initial Server"
        })
    }
}

export const getAllTodo = async(req,res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({
            success:true,
            message:"Get All Data Success",
            todos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"InitialServer"
        })
    }
}

export const updateTodo = async(req,res) => {
    try {
        const todoId = req?.params.todoId;
        const {title} = req.body;
        console.log(title)
        const todo = await Todo.findByIdAndUpdate(todoId, {title}, {new:true});
        return res.status(200).json({
            success:true,
            todo,
            message:"Todo update Success",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Initial Server"
        })
    }
}

export const deleteTodo = async(req,res) => {
    try {
        const todoId = req.params.id;
        await Todo.findByIdAndDelete(todoId);
        return res.status(200).json({
            success:true,
            message:"Delete Todo Success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"InnitalServer"
        })
    }
}
