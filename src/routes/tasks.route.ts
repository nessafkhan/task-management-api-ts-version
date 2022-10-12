import TasksControlller from "@/controllers/tasks.controller";
import { MulterRequest } from "@/interfaces/multer.interface";
import { Routes } from "@/interfaces/routes.interface";
import validateCSVFile from "@/middlewares/validateCSV.middleware";
import validateTask from "@/middlewares/validatetask.middleware";
import { Response, Router } from "express";
import multer from 'multer';

class TasksRoute implements Routes{
    public path = '/tasks';
    public router= Router();
    public upload = multer({ dest: 'uploads/csv/' });
    private TaskController = new TasksControlller();

    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,validateTask, this.TaskController.addTask);
        this.router.post(`${this.path}/upload-csv`,this.upload.single('file'), validateCSVFile, this.TaskController.addTasks)
        this.router.get(`${this.path}`, this.TaskController.getTasks);
        this.router.get(`${this.path}/:id`, this.TaskController.getTask);
        this.router.put(`${this.path}/:id`, this.TaskController.updateTask);
        this.router.delete(`${this.path}/:id`, this.TaskController.deleteTask);
    }
}

export default TasksRoute;