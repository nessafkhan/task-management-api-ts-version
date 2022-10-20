import TasksControlller from "@/controllers/tasks.controller";
import { MulterRequest } from "@/interfaces/multer.interface";
import { Routes } from "@/interfaces/routes.interface";
import validateCSVFile from "@/middlewares/validateCSV.middleware";
import validateTask from "@/middlewares/validatetask.middleware";
import validateUpdateTask from "@/middlewares/validateUpdateTask.middleware";
import { Response, Router } from "express";
import multer from 'multer';

class TasksRoute implements Routes{
    public path = '/tasks';
    public router= Router();
    public upload = multer({ dest: 'uploads/csv/' });
    private taskController = new TasksControlller();

    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`,validateTask, this.taskController.addTask);
        this.router.post(`${this.path}/upload-csv`,this.upload.single('file'), validateCSVFile, this.taskController.addTasks)
        this.router.get(`${this.path}`, this.taskController.getTasks);
        this.router.get(`${this.path}/:id`, this.taskController.getTask);
        this.router.put(`${this.path}/:id`,validateUpdateTask, this.taskController.updateTask);
        this.router.delete(`${this.path}/:id`, this.taskController.deleteTask);
    }
}

export default TasksRoute;