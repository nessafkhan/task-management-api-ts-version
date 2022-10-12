import { Task } from "@/interfaces/tasks.interface";
import TaskService from "@/services/tasks.service";
import { NextFunction, Request, Response } from "express";

class TasksControlller{
    private TaskService = new TaskService();


    /**
     * Create task controller
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */


    public addTask = async (req:Request,res:Response, next:NextFunction) => {
        try{
            const {name, description, taskPoints} = req.body;
            const createdTask:Task = await this.TaskService.createTask(name, description,taskPoints);
            res.status(201).json(createdTask);
        } catch (error) {
            next(error)
        }
    }

    /**
     * Get tasks controller
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    public getTasks = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const page_no:number = parseInt(req.query.page_no.toString());
            const page_size:number = parseInt(req.query.page_size.toString());
            const allTasks:Task[] = await this.TaskService.findTasks(page_no, page_size);
            res.status(200).json({
                allTasks,
                meta: {
                    next_page: page_no + 1,
                    page_size: page_size,
                    has_more: allTasks.length === page_size,
                },
            });
        } catch (error) {
            next(error)
        }
    };


    /**
     * Get task controller
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    public getTask = async (req:Request,res:Response, next:NextFunction) => {
        try{
            let fields:string = '_id sr_no';
            if(req.query.fields){
                fields = req.query.fields.toString().split(',').join(' ');
            }
            const id:string = req.params.id;
            /** TODO: Store to redis */
            const queriedTask:Task = await this.TaskService.findTask(id,fields);
            res.status(200).json(queriedTask);
        }catch (error) {
            next(error)
        }
    }


    /**
     * Update task controller
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    public updateTask = async (req:Request, res:Response,  next:NextFunction) => {
        try{
            const id:string = req.params.id;
            const { description, taskPoints, status } = req.body;
            /** TODO: Invalidate cache */
            const updatedTask:Task = await this.TaskService.updateTask(id,description,taskPoints,status);
            res.status(200).json(updatedTask);
        } catch (error){
            next(error)
        }
    }


    /**
     * Delete task controller
     * @param req 
     * @param res 
     * @param next 
     */
    public deleteTask = async (req:Request,res:Response, next:NextFunction) => {
        try{
            const id:string = req.params.id;
            await this.TaskService.deleteTask(id);
            res.status(200).json({ message: 'Task deleted succesfully' });
        }catch(error){
            next(error)
        }
    }
}

export default TasksControlller;