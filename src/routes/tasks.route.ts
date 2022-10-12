import TasksControlller from "@/controllers/tasks.controller";
import { Routes } from "@/interfaces/routes.interface";
import validateTask from "@/middlewares/validate.middleware";
import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

class TasksRoute implements Routes{
    public path = '/tasks';
    public router= Router();
    private TaskController = new TasksControlller();

    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,validateTask, this.TaskController.addTask);
        this.router.get(`${this.path}`, this.TaskController.getTasks);
        this.router.get(`${this.path}/:id`, this.TaskController.getTask);
        this.router.put(`${this.path}/:id`, this.TaskController.updateTask);
        this.router.delete(`${this.path}/:id`, this.TaskController.deleteTask);
    }
}

export default TasksRoute;