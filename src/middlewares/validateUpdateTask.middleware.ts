import { Task } from "@/interfaces/tasks.interface";
import { NextFunction, Request, Response } from "express";

const validateUpdateTask = (req:Request, res:Response, next:NextFunction):any => {
    console.log(req.body);
    const updateTaskPayload = req.body;
    const {description,taskPoints,status}:Task = updateTaskPayload;
    /**Checkinng for empty fields */
    const statusEnums:string[] = ['Started', 'in Progress', 'Completed'];
    if(description.length < 1 || taskPoints.length < 1 || taskPoints.includes(undefined)){
        return res.status(401).json({message: 'All fields are required'});
    }
    if(!statusEnums.includes(status)){
        return res.status(401).json({message: 'Invalid status update'});
    }
    return next();
}

export default validateUpdateTask;