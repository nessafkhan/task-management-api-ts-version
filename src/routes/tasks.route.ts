import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

class TasksRoute implements Routes{
    public path = '/tasks';
    public router= Router();


    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(`${this.path}`, async (req:Request, res:Response) => {
            console.log(`req in ${this.path}`);
            res.status(200).json({message: 'Success'})
        })
    }
}

export default TasksRoute;